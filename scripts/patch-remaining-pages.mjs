/**
 * Patch employees/staff/subscription HTML with data-i18n + language switcher.
 * Run: node scripts/patch-remaining-pages.mjs
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

function common(html) {
  if (!html.includes("data-locale-select")) {
    html = html.replace(
      /\s*<a class="pf-cta" href="https:\/\/app\.pulseflow\.site\/login">Open app<\/a>/,
      "\n" + NAV_ACTIONS,
    );
  }
  html = html.replace(
    /<a class="skip" href="#main">Skip to content<\/a>/,
    '<a class="skip" href="#main" data-i18n="nav.skip">Skip to content</a>',
  );
  html = html
    .replace(/styles\.css\?v=\d+/g, "styles.css?v=18")
    .replace(/script\.js\?v=\d+/g, "script.js?v=8");
  if (!html.includes('script.js')) {
    html = html.replace(
      "</body>",
      '    <script src="/script.js?v=8" defer></script>\n  </body>',
    );
  }
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

  // Shared demo block
  const demoMap = [
    ["Demo", "demo.eyebrow"],
    ["Try it yourself", "demo.title"],
    ["Choose a role. The login details are already filled in.", "demo.lead"],
    ["Owner", "demo.role_owner"],
    ["Manager", "demo.role_manager"],
    ["Employee", "demo.role_employee"],
    ["Owner demo login", "demo.kicker_owner"],
    ["Employee demo login", "demo.kicker_employee"],
    ["Email", "demo.email"],
    ["Password", "demo.password"],
    ["Open demo login", "demo.open"],
    ["Scan to sign in", "demo.scan"],
  ];
  for (const [text, key] of demoMap) {
    // attribute-safe replacements for common tags
    html = html.replace(
      new RegExp(`>(\\s*)${escapeRe(text)}(\\s*)<`, "g"),
      ` data-i18n="${key}">$1${text}$2<`,
    );
  }
  // fix double attributes if any from naive replace on already tagged
  html = html.replace(/ data-i18n="[^"]+" data-i18n="/g, ' data-i18n="');

  return html;
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function tagAttr(html, selectorHint, attr, key) {
  // noop helper placeholder
  return html;
}

function patchEmployees(html) {
  html = common(html);
  const reps = [
    [
      /<title>For property managers · Pulse Flow<\/title>/,
      '<title data-i18n="employees.meta_title">For property managers · Pulse Flow</title>',
    ],
    [
      /content="Run day-to-day rental ops from one pulse\. Properties, tasks, work orders, bills, and team performance in one place\."/,
      'content="Run day-to-day rental ops from one pulse. Properties, tasks, work orders, bills, and team performance in one place." data-i18n-attr="content:employees.meta_description"',
    ],
    [
      /content="Pulse Flow for property managers"/,
      'content="Pulse Flow for property managers" data-i18n-attr="content:employees.og_title"',
    ],
    [
      /content="Coordinate properties, jobs, vendors, and the team from one shared ops pulse\."/,
      'content="Coordinate properties, jobs, vendors, and the team from one shared ops pulse." data-i18n-attr="content:employees.og_description"',
    ],
    [
      /<p class="pf-owners-badge">For property managers<\/p>/,
      '<p class="pf-owners-badge" data-i18n="employees.badge">For property managers</p>',
    ],
    [
      /<h1 class="pf-headline">\s*Run the day without drowning in chat\.\s*<\/h1>/,
      '<h1 class="pf-headline" data-i18n="employees.headline">\n            Run the day without drowning in chat.\n          </h1>',
    ],
    [
      /<p class="pf-sub">\s*Occupancy, urgent work, check-ins, and bills — one pulse between you,\s*owners of property, and the field team\.\s*<\/p>/,
      '<p class="pf-sub" data-i18n="employees.sub">\n            Occupancy, urgent work, check-ins, and bills — one pulse between you,\n            owners of property, and the field team.\n          </p>',
    ],
    [
      />Start with Pulse Flow<\/a/,
      ' data-i18n="employees.cta_start">Start with Pulse Flow</a',
    ],
    [
      /<a class="pf-owners-link" href="#demo-now">Try the demo<\/a>/,
      '<a class="pf-owners-link" href="#demo-now" data-i18n="employees.cta_demo">Try the demo</a>',
    ],
    [
      /<h2>Open the app\. Run the day\.<\/h2>/,
      '<h2 data-i18n="employees.close">Open the app. Run the day.</h2>',
    ],
    [
      />Open Pulse Flow<\/a/,
      ' data-i18n="employees.close_cta">Open Pulse Flow</a',
    ],
  ];
  for (const [from, to] of reps) {
    if (!from.test(html)) console.warn("employees miss:", from);
    else html = html.replace(from, to);
  }

  const numMap = {
    "01 · Overview": "employees.t1_num",
    "02 · Properties": "employees.t2_num",
    "03 · Tasks": "employees.t3_num",
    "04 · Work orders": "employees.t4_num",
    "05 · Confirmations": "employees.t5_num",
    "06 · Finances": "employees.t6_num",
    "07 · Performance": "employees.t7_num",
  };
  html = html.replace(
    /<p class="pf-owners-feature-num">([^<]+)<\/p>/g,
    (m, text) => {
      const key = numMap[text.trim()];
      return key
        ? `<p class="pf-owners-feature-num" data-i18n="${key}">${text}</p>`
        : m;
    },
  );

  const titleMap = {
    "Everything hot today on one screen": "employees.t1_title",
    "Every villa, status, and stay dates in one list": "employees.t2_title",
    "Every task has an owner, a deadline, a property": "employees.t3_title",
    "Send the job once, in full": "employees.t4_title",
    "Staff see the job created, accept it in the app, and take it":
      "employees.t5_title",
    "Pending totals and Mark paid in one list": "employees.t6_title",
    "Weekly ratings build a real record": "employees.t7_title",
  };
  html = html.replace(/<h2>([^<]+)<\/h2>/g, (m, text) => {
    const key = titleMap[text.trim()];
    return key ? `<h2 data-i18n="${key}">${text}</h2>` : m;
  });

  const descMap = {
    "No rebuilding the plan in WhatsApp every morning.": "employees.t1_desc",
    "You and the owner see the same picture, no spreadsheet.": "employees.t2_desc",
    "Filter to Mine or Urgent and know what to do next.": "employees.t3_desc",
    "Call, WhatsApp, or LINE straight from the card, and see who was\n                actually reached—or add your staff to the app for the convenience.":
      "employees.t4_desc",
    "Every confirmation logged, nothing lost in chat.": "employees.t5_desc",
    "No digging through chat photos for a receipt.": "employees.t6_desc",
    "Know who to keep, renew, or replace.": "employees.t7_desc",
  };
  for (const [text, key] of Object.entries(descMap)) {
    const re = new RegExp(
      `(<div class="pf-owners-topic-copy">[\\s\\S]*?<p>)\\s*${escapeRe(text)}\\s*(</p>)`,
    );
    if (re.test(html)) {
      html = html.replace(re, `$1${text}$2`.replace("<p>", `<p data-i18n="${key}">`));
    } else {
      // simpler: replace paragraph content
      const re2 = new RegExp(`<p>\\s*${escapeRe(text)}\\s*</p>`);
      if (re2.test(html)) {
        html = html.replace(re2, `<p data-i18n="${key}">\n                ${text}\n              </p>`);
      } else {
        console.warn("employees desc miss:", key);
      }
    }
  }

  return html;
}

function patchStaff(html) {
  html = common(html);
  const reps = [
    [
      /<title>For field staff · Pulse Flow<\/title>/,
      '<title data-i18n="staff.meta_title">For field staff · Pulse Flow</title>',
    ],
    [
      /<p class="pf-owners-badge">For field staff<\/p>/,
      '<p class="pf-owners-badge" data-i18n="staff.badge">For field staff</p>',
    ],
  ];
  for (const [from, to] of reps) {
    if (!from.test(html)) console.warn("staff miss:", String(from).slice(0, 60));
    else html = html.replace(from, to);
  }
  // Tag all feature nums/titles generically for staff.tN_* if keys exist
  let i = 0;
  html = html.replace(
    /<p class="pf-owners-feature-num">([^<]+)<\/p>/g,
    (m, text) => {
      i += 1;
      return `<p class="pf-owners-feature-num" data-i18n="staff.t${i}_num">${text}</p>`;
    },
  );
  let j = 0;
  html = html.replace(
    /(<div class="pf-owners-topic-copy">\s*)<h2>([^<]+)<\/h2>/g,
    (m, a, text) => {
      j += 1;
      return `${a}<h2 data-i18n="staff.t${j}_title">${text}</h2>`;
    },
  );
  let k = 0;
  html = html.replace(
    /(<div class="pf-owners-topic-copy">[\s\S]*?<h2[^>]*>[^<]*<\/h2>\s*)<p>([\s\S]*?)<\/p>/g,
    (m, a, text) => {
      k += 1;
      return `${a}<p data-i18n="staff.t${k}_desc">${text}</p>`;
    },
  );
  html = html.replace(
    /<h1 class="pf-headline">([\s\S]*?)<\/h1>/,
    '<h1 class="pf-headline" data-i18n="staff.headline">$1</h1>',
  );
  html = html.replace(
    /<p class="pf-sub">([\s\S]*?)<\/p>/,
    '<p class="pf-sub" data-i18n="staff.sub">$1</p>',
  );
  return html;
}

function patchSubscription(html) {
  html = common(html);
  html = html.replace(
    /<title>Plans · Pulse Flow<\/title>/,
    '<title data-i18n="subscription.meta_title">Plans · Pulse Flow</title>',
  );
  html = html.replace(
    /<p class="pf-eyebrow">([\s\S]*?)<\/p>/,
    '<p class="pf-eyebrow" data-i18n="subscription.eyebrow">$1</p>',
  );
  html = html.replace(
    /<h1 class="pf-headline">([\s\S]*?)<\/h1>/,
    '<h1 class="pf-headline" data-i18n="subscription.headline">$1</h1>',
  );
  html = html.replace(
    /<p class="pf-sub">([\s\S]*?)<\/p>/,
    '<p class="pf-sub" data-i18n="subscription.sub">$1</p>',
  );
  return html;
}

const targets = [
  ["employees/index.html", patchEmployees],
  ["staff/index.html", patchStaff],
  ["subscription/index.html", patchSubscription],
];

for (const [rel, fn] of targets) {
  const file = path.join(root, rel);
  let html = fs.readFileSync(file, "utf8");
  html = fn(html);
  fs.writeFileSync(file, html);
  const count = (html.match(/data-i18n/g) || []).length;
  console.log("patched", rel, "data-i18n=", count);
}
