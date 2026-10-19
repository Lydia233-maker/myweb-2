(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const open = mobileMenu.hasAttribute("hidden");
      if (open) mobileMenu.removeAttribute("hidden");
      else mobileMenu.setAttribute("hidden", "");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.setAttribute("hidden", "");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  const bg = document.getElementById("heroBg");
  const video = document.getElementById("heroVideo");
  const hint = document.getElementById("heroHint");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (video) {
    video.addEventListener("error", () => video.remove());
    video.play().catch(() => {});
  }

  if (!bg || reduceMotion) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let hintHidden = false;

  const apply = () => {
    const tx = currentX * -42;
    const ty = currentY * -30;
    const rx = currentY * 5;
    const ry = currentX * -7;
    bg.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.08)`;
  };

  const tick = () => {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    apply();
    requestAnimationFrame(tick);
  };

  const setFromPoint = (clientX, clientY) => {
    targetX = Math.max(-1, Math.min(1, (clientX / window.innerWidth) * 2 - 1));
    targetY = Math.max(-1, Math.min(1, (clientY / window.innerHeight) * 2 - 1));
    if (!hintHidden && hint) {
      hintHidden = true;
      hint.classList.add("is-gone");
    }
  };

  window.addEventListener("mousemove", (e) => setFromPoint(e.clientX, e.clientY), { passive: true });
  window.addEventListener(
    "touchmove",
    (e) => {
      if (!e.touches[0]) return;
      setFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    },
    { passive: true }
  );

  requestAnimationFrame(tick);
})();
