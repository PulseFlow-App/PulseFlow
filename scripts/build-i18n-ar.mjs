/**
 * Fast parallel ar.json builder from en.json
 * Run: node scripts/build-i18n-ar.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const en = JSON.parse(fs.readFileSync(path.join(root, "i18n/en.json"), "utf8"));

const SKIP_EXACT = new Set([
  "Pulse Flow",
  "PulseFlow",
  "Wi-Fi",
  "WhatsApp",
  "LINE",
  "Stripe",
  "CSV",
  "Web Push",
  "@mentions",
]);

function shouldSkip(text) {
  if (!text || typeof text !== "string") return true;
  if (SKIP_EXACT.has(text)) return true;
  if (/^[\d\s฿$€£.,:+\-–—|·#@%&()<>/\\]+$/.test(text)) return true;
  if (text.startsWith("http") || text.includes("@pulseflow")) return true;
  return false;
}

async function translateOne(text) {
  const url = new URL("https://api.mymemory.translated.net/get");
  url.searchParams.set("q", text.slice(0, 480));
  url.searchParams.set("langpair", "en|ar");
  const res = await fetch(url);
  if (!res.ok) return text;
  const json = await res.json();
  let out = json.responseData?.translatedText ?? text;
  out = out.replace(/\[ترجمة المصطلح:\s*([^\]]+)\]/gi, "$1");
  return out;
}

async function translateHtml(text) {
  if (!text.includes("<")) return translateOne(text);
  const parts = text.split(/(<[^>]+>)/);
  const out = [];
  for (const part of parts) {
    if (part.startsWith("<") || !part.trim() || shouldSkip(part)) {
      out.push(part);
    } else {
      out.push(await translateOne(part));
    }
  }
  return out.join("");
}

function collectStrings(obj, path = [], out = []) {
  if (typeof obj === "string") {
    out.push({ path, value: obj });
    return out;
  }
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => collectStrings(v, [...path, i], out));
    return out;
  }
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      collectStrings(v, [...path, k], out);
    }
  }
  return out;
}

function setPath(obj, path, value) {
  let cur = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (cur[key] === undefined) cur[key] = typeof path[i + 1] === "number" ? [] : {};
    cur = cur[key];
  }
  cur[path[path.length - 1]] = value;
}

const items = collectStrings(en).filter(({ value }) => !shouldSkip(value));
const ar = JSON.parse(JSON.stringify(en));
const concurrency = 8;
let done = 0;

async function worker(queue) {
  while (queue.length) {
    const item = queue.shift();
    if (!item) break;
    try {
      const translated = item.value.includes("<")
        ? await translateHtml(item.value)
        : await translateOne(item.value);
      setPath(ar, item.path, translated);
    } catch {
      /* keep English */
    }
    done++;
    if (done % 25 === 0) process.stdout.write(` ${done}/${items.length}`);
    await new Promise((r) => setTimeout(r, 120));
  }
}

console.log(`Translating ${items.length} strings…`);
const queue = [...items];
await Promise.all(Array.from({ length: concurrency }, () => worker(queue)));

fs.writeFileSync(
  path.join(root, "i18n/ar.json"),
  JSON.stringify(ar, null, 2) + "\n",
);
console.log(`\nwrote ar.json (${done} strings)`);
