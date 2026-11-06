/* Copyright (c) 2026 Anastasia Boltrushevich / Pulse Flow. All rights reserved. */
(function () {
  function initRoles() {
    const tabs = Array.from(document.querySelectorAll(".roles-tab"));
    const panels = Array.from(document.querySelectorAll(".roles-panel"));
    if (!tabs.length) return;

    function activate(tab) {
      tabs.forEach((btn) => {
        const on = btn === tab;
        btn.setAttribute("aria-selected", on ? "true" : "false");
        btn.tabIndex = on ? 0 : -1;
      });
      panels.forEach((panel) => {
        const on = panel.id === tab.getAttribute("aria-controls");
        panel.classList.toggle("is-active", on);
        if (on) panel.removeAttribute("hidden");
        else panel.setAttribute("hidden", "");
      });
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => activate(tab));
      tab.addEventListener("keydown", (event) => {
        const i = tabs.indexOf(tab);
        if (event.key === "ArrowRight") {
          event.preventDefault();
          const next = tabs[(i + 1) % tabs.length];
          next.focus();
          activate(next);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          const prev = tabs[(i - 1 + tabs.length) % tabs.length];
          prev.focus();
          activate(prev);
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRoles);
  } else {
    initRoles();
  }
})();
