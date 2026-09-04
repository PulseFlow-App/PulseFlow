const LOCALE_STORAGE_KEY = "pulseflow_locale";

const LOCALES = ["en", "th", "my", "fr", "de", "es", "it", "he", "ar", "ru"];

const LOCALE_META = {
  en: { label: "English", native: "English", dir: "ltr" },
  th: { label: "Thai", native: "ไทย", dir: "ltr" },
  my: { label: "Burmese", native: "မြန်မာ", dir: "ltr" },
  fr: { label: "French", native: "Français", dir: "ltr" },
  de: { label: "German", native: "Deutsch", dir: "ltr" },
  es: { label: "Spanish", native: "Español", dir: "ltr" },
  it: { label: "Italian", native: "Italiano", dir: "ltr" },
  he: { label: "Hebrew", native: "עברית", dir: "rtl" },
  ar: { label: "Arabic", native: "العربية", dir: "rtl" },
  ru: { label: "Russian", native: "Русский", dir: "ltr" },
};

const dictCache = Object.create(null);
let currentLocale = "en";
let currentDict = null;
let demoApplyFns = [];

function lookup(dict, key) {
  if (!dict || !key) return undefined;
  return key.split(".").reduce((obj, part) => {
    if (obj == null || typeof obj !== "object") return undefined;
    return obj[part];
  }, dict);
}

function t(key, params) {
  let value = lookup(currentDict, key);
  if (typeof value !== "string") value = lookup(dictCache.en, key);
  if (typeof value !== "string") return key;
  if (params) {
    value = value.replace(/\{(\w+)\}/g, (_, name) =>
      params[name] != null ? String(params[name]) : `{${name}}`,
    );
  }
  return value;
}

const BRAND_NAME = "Pulse Flow";
const BRAND_ATTRS = `class="pf-brand-name" translate="no" dir="ltr"`;

function createBrandSpan() {
  const span = document.createElement("span");
  span.className = "pf-brand-name";
  span.setAttribute("translate", "no");
  span.setAttribute("dir", "ltr");
  span.textContent = BRAND_NAME;
  return span;
}

function wrapBrandName(html) {
  if (!html || !html.includes(BRAND_NAME) || html.includes("pf-brand-name")) {
    return html;
  }
  // Flex containers (.pf-btn-primary) collapse inter-element spaces, so keep
  // the gap inside the brand span when it follows another word.
  return html.replace(/Pulse Flow/g, (match, offset, full) => {
    const before = full.slice(0, offset).replace(/[ \t]+$/, "");
    const afterWord = before.length > 0 && /\S$/.test(before);
    const label = afterWord ? `\u00A0${BRAND_NAME}` : BRAND_NAME;
    return `<span ${BRAND_ATTRS}>${label}</span>`;
  });
}

function markBrandNames() {
  document.querySelectorAll(".pf-logo").forEach((logo) => {
    if (logo.querySelector(".pf-brand-name")) return;
    [...logo.childNodes].forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) node.remove();
    });
    logo.appendChild(createBrandSpan());
  });

  document.querySelectorAll(".pf-footer strong").forEach((el) => {
    el.textContent = "";
    el.appendChild(createBrandSpan());
  });

  document
    .querySelectorAll(
      "[data-i18n], .pf-btn-primary, .pf-cta",
    )
    .forEach((el) => {
      if (el.tagName === "TITLE") return;
      if (!el.textContent.includes(BRAND_NAME)) return;
      if (hasMarkup(el.innerHTML)) el.innerHTML = wrapBrandName(el.innerHTML);
      else el.innerHTML = wrapBrandName(el.textContent);
    });
}

function hasMarkup(value) {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

function applyTranslations(dict) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = lookup(dict, key);
    if (typeof value !== "string") return;
    if (el.tagName === "TITLE") {
      document.title = value;
      return;
    }
    if (hasMarkup(value)) el.innerHTML = wrapBrandName(value);
    else el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const raw = el.getAttribute("data-i18n-attr");
    if (!raw) return;
    raw.split(",").forEach((pair) => {
      const sep = pair.indexOf(":");
      if (sep < 1) return;
      const attr = pair.slice(0, sep).trim();
      const key = pair.slice(sep + 1).trim();
      const value = lookup(dict, key);
      if (typeof value !== "string") return;
      el.setAttribute(attr, value);
      if (attr === "content" && el.getAttribute("name") === "description") {
        /* already set */
      }
      if (attr === "content" && el.getAttribute("property") === "og:title") {
        /* already set */
      }
    });
  });

  markBrandNames();
}

function setDocumentLocale(locale) {
  const meta = LOCALE_META[locale] || LOCALE_META.en;
  document.documentElement.lang = locale;
  document.documentElement.dir = meta.dir;
}

async function loadDict(locale) {
  if (dictCache[locale]) return dictCache[locale];
  const res = await fetch(`/i18n/${locale}.json`);
  if (!res.ok) throw new Error(`Failed to load locale ${locale}`);
  const dict = await res.json();
  dictCache[locale] = dict;
  return dict;
}

function localeFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const raw = (params.get("lang") || params.get("locale") || "")
      .trim()
      .toLowerCase();
    if (raw && LOCALES.includes(raw)) return raw;
  } catch (_) {
    /* ignore */
  }
  return null;
}

function localeFromPath() {
  try {
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (parts.length && LOCALES.includes(parts[0])) return parts[0];
  } catch (_) {
    /* ignore */
  }
  return null;
}

function stripLocalePrefix(pathname) {
  const parts = (pathname || "/").split("/").filter(Boolean);
  if (parts.length && LOCALES.includes(parts[0])) {
    const rest = parts.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}

/** Path-based locale URLs: /ru/owners. EN stays unprefixed ( /en/... mirrors exist). */
function urlForLocale(locale) {
  const next = LOCALES.includes(locale) ? locale : "en";
  let base = stripLocalePrefix(window.location.pathname);
  if (base.length > 1 && base.endsWith("/")) base = base.slice(0, -1);
  const hash = window.location.hash || "";
  if (next === "en") {
    return `${base || "/"}${hash}`;
  }
  if (!base || base === "/") return `/${next}/${hash}`;
  return `/${next}${base}${hash}`;
}

function syncLocaleInUrl(locale) {
  try {
    const target = urlForLocale(locale);
    const next = new URL(target, window.location.origin);
    if (
      next.pathname !== window.location.pathname ||
      next.hash !== window.location.hash ||
      window.location.search
    ) {
      window.location.assign(next.pathname + next.search + next.hash);
    }
  } catch (_) {
    /* ignore */
  }
}

async function setLocale(locale, { persist = true, syncUrl = false } = {}) {
  const next = LOCALES.includes(locale) ? locale : "en";
  if (!dictCache.en) {
    try {
      await loadDict("en");
    } catch (_) {
      /* fall through */
    }
  }
  let dict;
  try {
    dict = await loadDict(next);
  } catch (_) {
    dict = dictCache.en || {};
  }
  currentLocale = next;
  currentDict = dict;
  if (persist) {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch (_) {
      /* ignore */
    }
  }
  if (syncUrl) syncLocaleInUrl(next);
  setDocumentLocale(next);
  applyTranslations(dict);
  document.querySelectorAll("[data-locale-select]").forEach((sel) => {
    sel.value = next;
  });
  demoApplyFns.forEach((fn) => fn());
}

function resolveInitialLocale() {
  const fromPath = localeFromPath();
  if (fromPath) return fromPath;
  const fromUrl = localeFromUrl();
  if (fromUrl) return fromUrl;
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && LOCALES.includes(stored)) return stored;
  } catch (_) {
    /* ignore */
  }
  const nav = (navigator.language || "en").toLowerCase();
  const short = nav.slice(0, 2);
  if (LOCALES.includes(short)) return short;
  if (nav.startsWith("my") || nav.startsWith("bur")) return "my";
  return "en";
}

function mountLanguageSwitchers() {
  document.querySelectorAll("[data-locale-select]").forEach((sel) => {
    if (sel.dataset.i18nReady === "1") return;
    sel.dataset.i18nReady = "1";
    if (!sel.options.length) {
      LOCALES.forEach((code) => {
        const opt = document.createElement("option");
        opt.value = code;
        opt.textContent = LOCALE_META[code].native;
        sel.appendChild(opt);
      });
    }
    sel.addEventListener("change", () => {
      setLocale(sel.value, { syncUrl: true });
    });
  });
}

/* Feature card rail */
const rail = document.querySelector(".pf-cards");
const dotsHost = document.querySelector(".pf-dots");

if (rail && dotsHost) {
  const cards = [...rail.querySelectorAll(".pf-card")];
  const dots = cards.map((_, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("data-feature-dot", String(i + 1));
    btn.setAttribute("aria-label", `Show feature ${i + 1}`);
    btn.addEventListener("click", () => {
      cards[i].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    });
    dotsHost.appendChild(btn);
    return btn;
  });

  const syncDotsLabel = () => {
    dots.forEach((dot, i) => {
      dot.setAttribute(
        "aria-label",
        t("demo.feature_dot", { n: i + 1 }),
      );
    });
  };
  demoApplyFns.push(syncDotsLabel);

  const sync = () => {
    const mid = rail.scrollLeft + rail.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const center = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(center - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === best));
  };

  rail.addEventListener(
    "scroll",
    () => window.requestAnimationFrame(sync),
    { passive: true },
  );
  window.addEventListener("resize", sync, { passive: true });
  sync();
}

const DEMO_ACCOUNTS = {
  owner: {
    email: "owner@pulseflow.site",
    labelKey: "demo.owner_login",
  },
  manager: {
    email: "manager@pulseflow.site",
    labelKey: "demo.manager_login",
  },
  staff: {
    email: "employee@pulseflow.site",
    labelKey: "demo.staff_login",
  },
  guest: {
    email: "guest@pulseflow.site",
    labelKey: "demo.guest_login",
  },
};

document.querySelectorAll("[data-demo-login]").forEach((section) => {
  const roleButtons = [...section.querySelectorAll("[data-demo-role]")];
  const links = [...section.querySelectorAll("[data-demo-link]")];
  const emailEl = section.querySelector("[data-demo-email]");
  const kickerEl = section.querySelector("[data-demo-kicker]");
  const qrImg = section.querySelector("[data-demo-qr]");
  let activeRole =
    roleButtons.find((btn) => btn.classList.contains("is-active"))?.getAttribute(
      "data-demo-role",
    ) || "owner";

  const applyRole = (role) => {
    const account = DEMO_ACCOUNTS[role];
    if (!account) return;
    activeRole = role;
    const loginUrl = `https://app.pulseflow.site/login?demo=${encodeURIComponent(role)}`;
    const label = t(account.labelKey);
    roleButtons.forEach((btn) => {
      btn.classList.toggle(
        "is-active",
        btn.getAttribute("data-demo-role") === role,
      );
    });
    if (emailEl) emailEl.textContent = account.email;
    if (kickerEl) kickerEl.textContent = label;
    links.forEach((link) => {
      link.setAttribute("href", loginUrl);
      if (link.hasAttribute("aria-label") || link.getAttribute("data-i18n-attr")?.includes("aria-label")) {
        link.setAttribute("aria-label", t("demo.open_login"));
      }
    });
    if (qrImg) {
      qrImg.src = `/assets/qr/demo-${encodeURIComponent(role)}.svg`;
      qrImg.alt = t("demo.qr_alt");
    }
  };

  roleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyRole(btn.getAttribute("data-demo-role") || "owner");
    });
  });

  demoApplyFns.push(() => applyRole(activeRole));
});

mountLanguageSwitchers();
{
  const fromQuery = localeFromUrl();
  const fromPath = localeFromPath();
  // Legacy ?lang=ru → /ru/... (client fallback; Vercel also 301s)
  if (fromQuery && fromQuery !== fromPath) {
    window.location.replace(urlForLocale(fromQuery));
  } else {
    setLocale(resolveInitialLocale(), {
      persist: true,
      syncUrl: false,
    }).catch(() => {
      setDocumentLocale(fromPath || "en");
    });
  }
}
