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
    var idle = base + 'nomi-chibi-idle.png';
    var anim = base + 'nomi-anim.webp';
    function setIdle() {
      img.src = idle;
    }

    function playAnim() {
      if (reduce) return;
      img.src = anim + '?play=' + Date.now();
    }

    setIdle();

    fab.addEventListener('mouseenter', playAnim);
    fab.addEventListener('focus', playAnim);
    fab.addEventListener('mouseleave', setIdle);
    fab.addEventListener('blur', setIdle);
  }

  document.querySelectorAll('.nomi-fab').forEach(bindFab);

  document.querySelectorAll('.nomi-avatar img.nomi-face').forEach(function (img) {
    var base = assetBase(img);
    img.src = base + 'nomi-chibi-idle.png';
  });
})();
