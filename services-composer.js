/* Copyright (c) 2026 Anastasia Boltrushevich / Pulse Flow. All rights reserved. */
(function () {
  const ORIGIN = "https://services.pulseflow.site";

  const CATEGORIES = [
    {
      slug: "plumbing",
      name: { en: "Plumbing", ru: "Сантехника", th: "ประปา" },
      keys: ["leak", "pipe", "toilet", "drain", "water", "tap", "faucet", "протеч", "труб", "унитаз", "รั่ว", "ท่อ", "ชักโครก"],
    },
    {
      slug: "hvac",
      name: { en: "Air conditioning", ru: "Кондиционеры", th: "แอร์" },
      keys: ["ac", "aircon", "air con", "cooling", "hvac", "кондиц", "охлажд", "แอร์", "เย็น"],
    },
    {
      slug: "electrical",
      name: { en: "Electrical", ru: "Электрика", th: "ไฟฟ้า" },
      keys: ["electric", "power", "light", "socket", "wiring", "электр", "свет", "розет", "ไฟ", "ไฟดับ"],
    },
    {
      slug: "cleaning",
      name: { en: "Cleaning", ru: "Уборка", th: "ทำความสะอาด" },
      keys: ["clean", "maid", "housekeep", "уборк", "клининг", "ทำความสะอาด", "แม่บ้าน"],
    },
    {
      slug: "pool",
      name: { en: "Pool", ru: "Бассейн", th: "สระว่ายน้ำ" },
      keys: ["pool", "бассейн", "срес", "สระ"],
    },
    {
      slug: "handyman",
      name: { en: "Handyman", ru: "Мастер на час", th: "ช่างทั่วไป" },
      keys: ["fix", "handyman", "broken", "door", "shelf", "починить", "слом", "ซ่อม", "พัง"],
    },
    {
      slug: "pest",
      name: { en: "Pest control", ru: "Дезинсекция", th: "กำจัดแมลง" },
      keys: ["pest", "ant", "termite", "cockroach", "mosquito", "таракан", "мурав", "แมลง", "ปลวก"],
    },
    {
      slug: "appliance",
      name: { en: "Appliance repair", ru: "Ремонт техники", th: "ซ่อมเครื่องใช้" },
      keys: ["fridge", "washer", "dryer", "oven", "appliance", "холодильник", "стирал", "ตู้เย็น", "เครื่องซัก"],
    },
  ];

  const PROS = [
    {
      id: "p1",
      name: "Niran",
      trade: { en: "Plumber", ru: "Сантехник", th: "ช่างประปา" },
      area: "Thong Sala",
      langs: ["th", "en"],
      categories: ["plumbing", "water"],
    },
    {
      id: "p2",
      name: "Anya",
      trade: { en: "AC technician", ru: "Мастер по кондиционерам", th: "ช่างแอร์" },
      area: "Baan Tai",
      langs: ["ru", "en", "th"],
      categories: ["hvac", "electrical"],
    },
    {
      id: "p3",
      name: "Somchai",
      trade: { en: "Cleaner", ru: "Клинер", th: "แม่บ้าน" },
      area: "Haad Rin",
      langs: ["th", "en"],
      categories: ["cleaning", "deep-cleaning"],
    },
    {
      id: "p4",
      name: "Leo",
      trade: { en: "Electrician", ru: "Электрик", th: "ช่างไฟ" },
      area: "Chaloklum",
      langs: ["en", "th"],
      categories: ["electrical", "appliance"],
    },
    {
      id: "p5",
      name: "Mai",
      trade: { en: "Pool care", ru: "Уход за бассейном", th: "ดูแลสระ" },
      area: "Koh Phangan",
      langs: ["th", "en"],
      categories: ["pool"],
    },
    {
      id: "p5b",
      name: "Yuri",
      trade: { en: "Pool & filtration", ru: "Бассейн и фильтрация", th: "สระและระบบกรอง" },
      area: "Srithanu",
      langs: ["ru", "en"],
      categories: ["pool", "handyman"],
    },
    {
      id: "p6",
      name: "Pete",
      trade: { en: "Handyman", ru: "Мастер на час", th: "ช่างทั่วไป" },
      area: "Thong Sala",
      langs: ["en"],
      categories: ["handyman", "carpentry", "painting"],
    },
  ];

  function locale() {
    const htmlLang = (document.documentElement.lang || "en").slice(0, 2).toLowerCase();
    if (htmlLang === "ru" || htmlLang === "th") return htmlLang;
    const select = document.querySelector("[data-locale-select]");
    const v = select && select.value ? select.value.slice(0, 2).toLowerCase() : "en";
    return v === "ru" || v === "th" ? v : "en";
  }

  function tName(bag) {
    const lang = locale();
    return bag[lang] || bag.en;
  }

  function matchCategories(text) {
    const q = text.trim().toLowerCase();
    if (!q) return [];
    const scored = CATEGORIES.map((cat) => {
      let score = 0;
      for (const key of cat.keys) {
        if (q.includes(key.toLowerCase())) score += key.length;
      }
      if (tName(cat.name).toLowerCase().includes(q)) score += 8;
      return { cat, score };
    })
      .filter((row) => row.score > 0)
      .sort((a, b) => b.score - a.score);
    return scored.slice(0, 3).map((row) => row.cat);
  }

  function matchPros(cats) {
    if (!cats.length) return [];
    const slugs = new Set(cats.map((c) => c.slug));
    const hits = PROS.filter((pro) => pro.categories.some((c) => slugs.has(c)));
    return (hits.length ? hits : PROS).slice(0, 2);
  }

  function langLabel(codes) {
    const map = { en: "EN", ru: "RU", th: "TH" };
    return codes.map((c) => map[c] || c.toUpperCase()).join(" · ");
  }

  function render(text) {
    const matches = document.querySelector("[data-svc-matches]");
    const chips = document.querySelector("[data-svc-cats]");
    const prosEl = document.querySelector("[data-svc-pros]");
    const findBtn = document.querySelector("[data-svc-find]");
    if (!matches || !chips || !prosEl) return;

    const cats = matchCategories(text);
    const pros = matchPros(cats);
    const live = text.trim().length >= 2 || cats.length > 0;

    matches.classList.toggle("is-live", live);
    chips.innerHTML = "";
    prosEl.innerHTML = "";

    if (!live) {
      if (findBtn) findBtn.setAttribute("href", `${ORIGIN}/`);
      return;
    }

    const useCats = cats.length ? cats : CATEGORIES.slice(0, 2);
    useCats.forEach((cat) => {
      const a = document.createElement("a");
      a.className = "svc-cat-chip";
      a.href = `${ORIGIN}/c/${cat.slug}`;
      a.textContent = tName(cat.name);
      chips.appendChild(a);
    });

    matchPros(useCats).forEach((pro) => {
      const card = document.createElement("article");
      card.className = "svc-pro-card";
      card.innerHTML = `
        <div class="svc-pro-avatar" aria-hidden="true"></div>
        <div>
          <strong></strong>
          <span></span>
        </div>`;
      card.querySelector(".svc-pro-avatar").textContent = (pro.name || "?").slice(0, 1).toUpperCase();
      card.querySelector("strong").textContent = `${pro.name} · ${tName(pro.trade)}`;
      card.querySelector("span").textContent = `${pro.area} · ${langLabel(pro.langs)}`;
      prosEl.appendChild(card);
    });

    if (findBtn) {
      const primary = useCats[0];
      const q = encodeURIComponent(text.trim());
      findBtn.setAttribute(
        "href",
        primary ? `${ORIGIN}/c/${primary.slug}${q ? `?q=${q}` : ""}` : `${ORIGIN}/find?q=${q}`,
      );
    }
  }

  function init() {
    const input = document.querySelector("[data-svc-input]");
    const prompts = Array.from(document.querySelectorAll("[data-svc-prompt]"));
    if (!input) return;

    const run = () => render(input.value);
    input.addEventListener("input", run);

    prompts.forEach((btn) => {
      btn.addEventListener("click", () => {
        const value = btn.getAttribute("data-svc-prompt") || btn.textContent || "";
        input.value = value;
        prompts.forEach((p) => p.setAttribute("aria-pressed", p === btn ? "true" : "false"));
        input.focus();
        run();
      });
    });

    document.querySelector("[data-locale-select]")?.addEventListener("change", run);
    run();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
