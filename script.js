const LOCALE_STORAGE_KEY = "pulseflow_locale";

const LOCALES = ["en", "th", "my", "fr", "de", "es", "it", "he", "ru"];

const LOCALE_META = {
  en: { label: "English", native: "English", dir: "ltr" },
  th: { label: "Thai", native: "ไทย", dir: "ltr" },
  my: { label: "Burmese", native: "မြန်မာ", dir: "ltr" },
  fr: { label: "French", native: "Français", dir: "ltr" },
  de: { label: "German", native: "Deutsch", dir: "ltr" },
  es: { label: "Spanish", native: "Español", dir: "ltr" },
  it: { label: "Italian", native: "Italiano", dir: "ltr" },
  he: { label: "Hebrew", native: "עברית", dir: "rtl" },
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
    if (hasMarkup(value)) el.innerHTML = value;
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

async function setLocale(locale, { persist = true } = {}) {
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
  setDocumentLocale(next);
  applyTranslations(dict);
  document.querySelectorAll("[data-locale-select]").forEach((sel) => {
    sel.value = next;
  });
  demoApplyFns.forEach((fn) => fn());
}

function resolveInitialLocale() {
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
      setLocale(sel.value);
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
  employee: {
    email: "employee@pulseflow.site",
    labelKey: "demo.employee_login",
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
      const size = qrImg.getAttribute("width") || "220";
      qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(loginUrl)}`;
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
setLocale(resolveInitialLocale(), { persist: false }).catch(() => {
  setDocumentLocale("en");
});
