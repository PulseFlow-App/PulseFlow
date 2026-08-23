/**
 * Patch owners/employees/staff/subscription HTML with data-i18n + lang switcher.
 * Run: node scripts/patch-html-i18n.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const NAV_ACTIONS = `        <div class="pf-nav-actions">
          <label class="pf-lang">
            <span class="pf-visually-hidden" data-i18n="nav.language"
              >Language</span
            >
            <select
              class="pf-lang-select"
              data-locale-select
              data-i18n-attr="aria-label:nav.language"
              aria-label="Language"
            ></select>
          </label>
          <a
            class="pf-cta"
            href="https://app.pulseflow.site/login"
            data-i18n="nav.open_app"
            >Open app</a
          >
        </div>`;

const CTA_RE =
  /\s*<a class="pf-cta" href="https:\/\/app\.pulseflow\.site\/login">Open app<\/a>/;

function common(html) {
  if (!html.includes("data-locale-select")) {
    if (!CTA_RE.test(html)) throw new Error("Open app CTA not found");
    html = html.replace(CTA_RE, "\n" + NAV_ACTIONS);
  }
  html = html.replace(
    /<a class="skip" href="#main">Skip to content<\/a>/,
    '<a class="skip" href="#main" data-i18n="nav.skip">Skip to content</a>',
  );
  html = html
    .replace(/styles\.css\?v=\d+/g, "styles.css?v=18")
    .replace(/script\.js\?v=\d+/g, "script.js?v=8");
  html = html.replace(
    /<span>The pulse of your rental operations<\/span>/g,
    '<span data-i18n="footer.tagline">The pulse of your rental operations</span>',
  );
  html = html.replace(
    /<a href="\/">Home<\/a>/,
    '<a href="/" data-i18n="footer.home">Home</a>',
  );
  html = html.replace(
    /<a href="\/subscription">Plans<\/a>/g,
    '<a href="/subscription" data-i18n="footer.plans">Plans</a>',
  );
  html = html.replace(
    /<a href="\/terms">Terms<\/a>/g,
    '<a href="/terms" data-i18n="footer.terms">Terms</a>',
  );
  html = html.replace(
    /<a href="\/privacy">Privacy<\/a>/g,
    '<a href="/privacy" data-i18n="footer.privacy">Privacy</a>',
  );
  html = html.replace(
    /<a href="https:\/\/app\.pulseflow\.site">App<\/a>/g,
    '<a href="https://app.pulseflow.site" data-i18n="footer.app">App</a>',
  );
  return html;
}

function wrap(tagOpen, key, html) {
  // replace first exact text occurrence with tagged version - used carefully
  return html;
}

function patchOwners(html) {
  html = common(html);
  const reps = [
    [
      /<title>For property owners · Pulse Flow Ops<\/title>/,
      '<title data-i18n="owners.meta_title">For property owners · Pulse Flow Ops</title>',
    ],
    [
      /content="Know what's happening across your properties\. Tasks, staff, bills, maintenance, and check-ins in one place\."/,
      'content="Know what\'s happening across your properties. Tasks, staff, bills, maintenance, and check-ins in one place."\n      data-i18n-attr="content:owners.meta_description"',
    ],
    [
      /content="Pulse Flow Ops for property owners"/,
      'content="Pulse Flow Ops for property owners"\n      data-i18n-attr="content:owners.og_title"',
    ],
    [
      /content="Know what's happening across your properties\. Tasks, staff, bills, and check-ins in one place\."/,
      'content="Know what\'s happening across your properties. Tasks, staff, bills, and check-ins in one place."\n      data-i18n-attr="content:owners.og_description"',
    ],
    [
      /<p class="pf-owners-badge">For property owners<\/p>/,
      '<p class="pf-owners-badge" data-i18n="owners.badge">For property owners</p>',
    ],
    [
      /<h1 class="pf-headline">\s*Know what's happening across your properties\.\s*<\/h1>/,
      '<h1 class="pf-headline" data-i18n="owners.headline">\n            Know what\'s happening across your properties.\n          </h1>',
    ],
    [
      /<p class="pf-sub">\s*Tasks, staff, bills, maintenance, and check-ins in one place\.\s*<\/p>/,
      '<p class="pf-sub" data-i18n="owners.sub">\n            Tasks, staff, bills, maintenance, and check-ins in one place.\n          </p>',
    ],
    [
      />Start with Pulse Flow Ops<\/a/,
      ' data-i18n="owners.cta_start"\n              >Start with Pulse Flow Ops</a',
    ],
    [
      /<a class="pf-owners-link" href="#demo-now">Try the demo<\/a>/,
      '<a class="pf-owners-link" href="#demo-now" data-i18n="owners.cta_demo">Try the demo</a>',
    ],
    [
      /alt="Owner home with occupancy, urgent tasks, and check-ins"/,
      'alt="Owner home with occupancy, urgent tasks, and check-ins"\n              data-i18n-attr="alt:owners.hero_alt"',
    ],
  ];

  const topics = [
    ["01 · Overview", "owners.t1_num"],
    ["See everything at a glance", "owners.t1_title"],
    [
      "Occupancy, urgent tasks, and upcoming check-ins are updated live\n                by your on-site manager. Know what needs attention without\n                opening a chat.",
      "owners.t1_desc",
    ],
    ["Dashboard with ops readiness and property statuses", "owners.t1_alt1"],
    ["Urgent tasks and this week's check-ins", "owners.t1_alt2"],
    ["02 · Properties", "owners.t2_num"],
    ["Every property, status, and stay dates", "owners.t2_title"],
    [
      "Company inventory first, then your personal list. Each card shows\n                occupancy, check-in and check-out, and location—so you and your\n                manager share the same picture without a spreadsheet.",
      "owners.t2_desc",
    ],
    [
      "Properties list with status, check-in and check-out dates, and location",
      "owners.t2_alt",
    ],
    ["03 · Tasks", "owners.t3_num"],
    ["Every task has an owner", "owners.t3_title"],
    [
      "Every task has a property, deadline, and responsible person.\n                Filter by Mine or Urgent to see what needs attention now.",
      "owners.t3_desc",
    ],
    ["Tasks list with property, deadline, and assignee", "owners.t3_alt"],
    ["04 · Work orders", "owners.t4_num"],
    ["Send clear jobs. Track them.", "owners.t4_title"],
    [
      "Send the job details: what, where, and when. Contact anyone by\n                call, WhatsApp, or LINE, and see when they were contacted.",
      "owners.t4_desc",
    ],
    ["Contacts with Order, Call, and WhatsApp actions", "owners.t4_alt1"],
    ["Order form with what, where, and when", "owners.t4_alt2"],
    ["05 · Confirmations", "owners.t5_num"],
    ["Know what was seen and accepted", "owners.t5_title"],
    [
      "Staff confirm each job with Read &amp; Agreed before it becomes\n                assigned. Bills and job confirmations stay logged in\n                Notifications.",
      "owners.t5_desc",
    ],
    ["Team chat with a service order card", "owners.t5_alt1"],
    ["Notifications with bills and job confirmations", "owners.t5_alt2"],
    ["06 · Finances", "owners.t6_num"],
    ["See what you spend", "owners.t6_title"],
    [
      "Filter by period, property, or category. See total, paid, and\n                pending amounts. Approve bills in one tap.",
      "owners.t6_desc",
    ],
    ["Finances with total, paid, and pending", "owners.t6_alt1"],
    ["Pending bills with Mark paid", "owners.t6_alt2"],
    ["07 · Performance", "owners.t7_num"],
    ["Know who delivers", "owners.t7_title"],
    [
      "Rate staff and service providers weekly. Build a record of\n                performance and see who to keep, renew, or replace.",
      "owners.t7_desc",
    ],
    ["Weekly star ratings for the team", "owners.t7_alt1"],
    ["Company leaderboard by rating", "owners.t7_alt2"],
  ];

  for (const [from, to] of reps) {
    if (!from.test(html)) console.warn("owners miss:", from);
    else html = html.replace(from, to);
  }

  // nums / titles / descs / alts via precise helpers
  html = html.replace(
    /<p class="pf-owners-feature-num">([^<]+)<\/p>/g,
    (m, text) => {
      const map = {
        "01 · Overview": "owners.t1_num",
        "02 · Properties": "owners.t2_num",
        "03 · Tasks": "owners.t3_num",
        "04 · Work orders": "owners.t4_num",
        "05 · Confirmations": "owners.t5_num",
        "06 · Finances": "owners.t6_num",
        "07 · Performance": "owners.t7_num",
      };
      const key = map[text.trim()];
      return key
        ? `<p class="pf-owners-feature-num" data-i18n="${key}">${text}</p>`
        : m;
    },
  );

  const titleMap = {
    "See everything at a glance": "owners.t1_title",
    "Every property, status, and stay dates": "owners.t2_title",
    "Every task has an owner": "owners.t3_title",
    "Send clear jobs. Track them.": "owners.t4_title",
    "Know what was seen and accepted": "owners.t5_title",
    "See what you spend": "owners.t6_title",
    "Know who delivers": "owners.t7_title",
  };
  html = html.replace(
    /(<div class="pf-owners-topic-copy">[\s\S]*?<h2>)([^<]+)(<\/h2>)/g,
    (m, a, text, c) => {
      const key = titleMap[text.trim()];
      return key ? `${a.slice(0, -4)}<h2 data-i18n="${key}">${text}${c}` : m;
    },
  );

  // Fix the replace above - I made a mess. Let me do simpler h2 replace
  // Actually the regex may have broken. Let me re-read and fix differently.

  return html;
}

// Simpler approach: write complete patched files from templates in this script
console.log("Use full writers instead");
