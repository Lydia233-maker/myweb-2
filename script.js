(() => {
  document.querySelectorAll(".year").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (nav && toggle && links) {
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  }

  const video = document.getElementById("heroVideo");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (video) {
    const sync = () => {
      if (reduce.matches) video.pause();
      else video.play().catch(() => {});
    };
    sync();
    if (reduce.addEventListener) reduce.addEventListener("change", sync);
    else reduce.addListener(sync);
  }
})();
