const rail = document.querySelector(".pf-cards");
const dotsHost = document.querySelector(".pf-dots");

if (rail && dotsHost) {
  const cards = [...rail.querySelectorAll(".pf-card")];
  const dots = cards.map((_, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
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
    label: "Owner demo login",
    email: "owner@pulseflow.site",
  },
  employee: {
    label: "Employee demo login",
    email: "employee@pulseflow.site",
  },
};

document.querySelectorAll("[data-demo-login]").forEach((section) => {
  const roleButtons = [...section.querySelectorAll("[data-demo-role]")];
  const links = [...section.querySelectorAll("[data-demo-link]")];
  const emailEl = section.querySelector("[data-demo-email]");
  const kickerEl = section.querySelector("[data-demo-kicker]");
  const qrImg = section.querySelector("[data-demo-qr]");

  const applyRole = (role) => {
    const account = DEMO_ACCOUNTS[role];
    if (!account) return;
    const loginUrl = `https://app.pulseflow.site/login?demo=${encodeURIComponent(role)}`;
    roleButtons.forEach((btn) => {
      btn.classList.toggle(
        "is-active",
        btn.getAttribute("data-demo-role") === role,
      );
    });
    if (emailEl) emailEl.textContent = account.email;
    if (kickerEl) kickerEl.textContent = account.label;
    links.forEach((link) => {
      link.setAttribute("href", loginUrl);
    });
    if (qrImg) {
      qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(loginUrl)}`;
      qrImg.alt = `QR code for ${account.label}`;
    }
  };

  roleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyRole(btn.getAttribute("data-demo-role") || "owner");
    });
  });
});
