(function () {
  var reduce = false;
  try {
    reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {}

  function assetBase(el) {
    var src = (el && el.getAttribute('src')) || '';
    var m = src.match(/^(.*\/)assets\//);
    if (m) return m[1] + 'assets/';
    if (src.indexOf('../assets/') !== -1) return '../assets/';
    return 'assets/';
  }

  function bindFab(fab) {
    var img = fab.querySelector('img.nomi-face');
    if (!img) return;
    var base = assetBase(img);
    var idle = base + 'nomi-chibi-idle.png?v=face2';
    var anim = base + 'nomi-anim.webp?v=face2';
    function setIdle() {
      img.src = idle;
    }

    function playAnim() {
      if (reduce) return;
      img.src = anim + '&play=' + Date.now();
    }

    setIdle();

    function canHoverAnim() {
      return !fab.classList.contains('is-dragging') && !fab.classList.contains('is-pressing');
    }

    fab.addEventListener('mouseenter', function () {
      if (canHoverAnim()) playAnim();
    });
    fab.addEventListener('focus', function () {
      if (canHoverAnim()) playAnim();
    });
    fab.addEventListener('mouseleave', setIdle);
    fab.addEventListener('blur', setIdle);
  }

  document.querySelectorAll('.nomi-fab').forEach(bindFab);

  document.querySelectorAll('.nomi-avatar img.nomi-face').forEach(function (img) {
    var base = assetBase(img);
    img.src = base + 'nomi-chibi-idle.png?v=face2';
  });
})();
