(() => {
  document.querySelectorAll(".year").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
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
