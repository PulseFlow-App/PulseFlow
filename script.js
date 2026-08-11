const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
  );

  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-in"));
}

const rail = document.querySelector(".feature-rail");
const dotsHost = document.querySelector(".feature-dots");

if (rail && dotsHost) {
  const cards = [...rail.querySelectorAll(".feature-card")];
  const dots = cards.map((_, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", `Show feature ${i + 1}`);
    btn.addEventListener("click", () => {
      cards[i].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
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

  rail.addEventListener("scroll", () => {
    window.requestAnimationFrame(sync);
  }, { passive: true });
  sync();
}
