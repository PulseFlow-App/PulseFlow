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
    () => {
      window.requestAnimationFrame(sync);
    },
    { passive: true },
  );
  sync();
}
