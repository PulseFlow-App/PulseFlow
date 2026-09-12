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

/** Plausible custom events (S5). No-ops until the domain is added in Plausible. */
function track(name, props) {
  try {
    if (typeof window.plausible === "function") {
      window.plausible(name, props ? { props } : undefined);
    }
  } catch (_) {
    /* ignore */
  }
}

function pageMeta() {
  const path = window.location.pathname || "/";
  const locale = localeFromPath() || currentLocale || "en";
  return { path, locale, page: path };
}

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
  const prevLocale = currentLocale;
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
  if (prevLocale && prevLocale !== next) {
    track("lang_switch", { from: prevLocale, to: next });
  }
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

/* Feature carousel */
{
  const carousel = document.querySelector("[data-feature-carousel]");
  const track = carousel?.querySelector("[data-feature-track]");
  const slides = track ? [...track.querySelectorAll("[data-feature-slide]")] : [];
  const dotsHost = carousel?.querySelector("[data-feature-dots]");
  const prevBtn = carousel?.querySelector("[data-feature-prev]");
  const nextBtn = carousel?.querySelector("[data-feature-next]");

  if (carousel && track && slides.length) {
    const dots = slides.map((_, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-feature-dot", String(i + 1));
      btn.setAttribute("aria-label", `Show feature ${i + 1}`);
      btn.addEventListener("click", () => goTo(i));
      dotsHost?.appendChild(btn);
      return btn;
    });

    let index = 0;

    const goTo = (i) => {
      index = Math.max(0, Math.min(slides.length - 1, i));
      const slide = slides[index];
      track.scrollTo({
        left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2,
        behavior: "smooth",
      });
      sync();
    };

    const sync = () => {
      const mid = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      slides.forEach((slide, i) => {
        const center = slide.offsetLeft + slide.offsetWidth / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      index = best;
      slides.forEach((slide, i) =>
        slide.classList.toggle("is-active", i === best),
      );
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === best));
    };

    const syncDotsLabel = () => {
      dots.forEach((dot, i) => {
        dot.setAttribute("aria-label", t("demo.feature_dot", { n: i + 1 }));
      });
    };
    demoApplyFns.push(syncDotsLabel);

    prevBtn?.addEventListener("click", () => goTo(index - 1));
    nextBtn?.addEventListener("click", () => goTo(index + 1));
    track.addEventListener(
      "scroll",
      () => window.requestAnimationFrame(sync),
      { passive: true },
    );
    window.addEventListener("resize", sync, { passive: true });
    sync();
  }
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
  const roleButtons = [
    ...section.querySelectorAll("button[data-demo-role], .pf-demo-role[data-demo-role]"),
  ];
  const roleCards = [...section.querySelectorAll(".pf-demo-card[data-demo-role]")];
  const links = [...section.querySelectorAll("[data-demo-link]")];
  const emailEl = section.querySelector("[data-demo-email]");
  const kickerEl = section.querySelector("[data-demo-kicker]");
  const qrImg = section.querySelector("[data-demo-qr]");
  const qrLink = qrImg?.closest("a[data-demo-link]") || null;
  let activeRole =
    roleButtons.find((btn) => btn.classList.contains("is-active"))?.getAttribute(
      "data-demo-role",
    ) ||
    roleCards[0]?.getAttribute("data-demo-role") ||
    "owner";

  const applyRole = (role, { syncCardLinks = false } = {}) => {
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
    roleCards.forEach((card) => {
      card.classList.toggle(
        "is-active",
        card.getAttribute("data-demo-role") === role,
      );
    });
    if (emailEl) emailEl.textContent = account.email;
    if (kickerEl) kickerEl.textContent = label;
    if (syncCardLinks || roleButtons.length) {
      links.forEach((link) => {
        link.setAttribute("href", loginUrl);
        if (
          link.hasAttribute("aria-label") ||
          link.getAttribute("data-i18n-attr")?.includes("aria-label")
        ) {
          link.setAttribute("aria-label", t("demo.open_login"));
        }
      });
    } else if (qrLink) {
      qrLink.setAttribute("href", loginUrl);
      qrLink.setAttribute("aria-label", t("demo.open_login"));
    }
    if (qrImg) {
      qrImg.src = `/assets/qr/demo-${encodeURIComponent(role)}.svg`;
      qrImg.alt = t("demo.qr_alt");
    }
  };

  roleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyRole(btn.getAttribute("data-demo-role") || "owner", {
        syncCardLinks: true,
      });
    });
  });

  roleCards.forEach((card) => {
    const role = card.getAttribute("data-demo-role") || "owner";
    const activate = () => applyRole(role);
    card.addEventListener("mouseenter", activate);
    card.addEventListener("focusin", activate);
  });

  demoApplyFns.push(() => applyRole(activeRole));
});

/* Subtle fade-in on scroll for landing sections */
{
  const nodes = [...document.querySelectorAll(".pf-fade")];
  if (nodes.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    nodes.forEach((el) => io.observe(el));
  } else {
    nodes.forEach((el) => el.classList.add("is-in"));
  }
}

/* Pain-section flip cards */
document.querySelectorAll("[data-flip-grid]").forEach((grid) => {
  const toggle = (card) => {
    const next = !card.classList.contains("is-flipped");
    card.classList.toggle("is-flipped", next);
    card.setAttribute("aria-pressed", next ? "true" : "false");
    grid.classList.add("has-flipped");
  };

  grid.querySelectorAll("[data-flip-card]").forEach((card) => {
    card.addEventListener("click", () => toggle(card));
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      toggle(card);
    });
  });
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

/* Analytics: page + role views, CTAs, demo, scroll, outbound (S5) */
{
  const meta = pageMeta();
  track("page_view", {
    path: meta.path,
    locale: meta.locale,
    referrer: document.referrer || "",
  });
  const roleMatch = meta.path.match(
    /\/(owners|managers|staff|guests)(?:\/|$)/,
  );
  if (roleMatch) {
    track("role_page_view", { role: roleMatch[1], locale: meta.locale });
  }

  const markCta = (el, id) => {
    if (!el || el.dataset.trackBound) return;
    el.dataset.trackBound = "1";
    el.addEventListener("click", () => {
      track("cta_click", { id, ...pageMeta() });
    });
  };

  markCta(document.querySelector('[data-i18n="home.cta"]'), "hero");
  markCta(document.querySelector('[data-i18n="home.close_cta"]'), "footer");
  markCta(document.querySelector('[data-i18n="home.plan_cta"]'), "plan");
  document.querySelectorAll(".pf-audience-card[href]").forEach((a) => {
    const href = a.getAttribute("href") || "";
    const id = href.includes("owner")
      ? "role_owners"
      : href.includes("manager")
        ? "role_managers"
        : href.includes("staff")
          ? "role_staff"
          : "role";
    markCta(a, id);
  });

  document.querySelectorAll("[data-demo-link]").forEach((a) => {
    a.addEventListener("click", () => {
      const role =
        document
          .querySelector("[data-demo-role].is-active")
          ?.getAttribute("data-demo-role") || "owner";
      track("demo_open", { role, ...pageMeta() });
      track("outbound_app", { target: "login", ...pageMeta() });
    });
  });

  document.querySelectorAll('a[href*="app.pulseflow.site"]').forEach((a) => {
    if (a.dataset.trackBound) return;
    a.dataset.trackBound = "1";
    a.addEventListener("click", () => {
      const href = a.getAttribute("href") || "";
      const target = href.includes("/register")
        ? "register"
        : href.includes("/login")
          ? "login"
          : "app";
      track("outbound_app", { target, ...pageMeta() });
    });
  });

  const depths = new Set();
  const onScroll = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    const pct = (window.scrollY / max) * 100;
    for (const mark of [50, 90]) {
      if (pct >= mark && !depths.has(mark)) {
        depths.add(mark);
        track("scroll_depth", { depth: mark, ...pageMeta() });
      }
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}
