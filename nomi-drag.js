(function () {
  var STORAGE_KEY = 'lidyapm-nomi-pos';
  var DRAG_THRESHOLD = 7;
  var MARGIN = 10;

  function clamp(fab, left, top) {
    var w = fab.offsetWidth || 200;
    var h = fab.offsetHeight || 200;
    return {
      left: Math.max(MARGIN, Math.min(left, window.innerWidth - w - MARGIN)),
      top: Math.max(MARGIN, Math.min(top, window.innerHeight - h - MARGIN)),
    };
  }

  function place(fab, left, top) {
    var p = clamp(fab, left, top);
    fab.style.left = p.left + 'px';
    fab.style.top = p.top + 'px';
    fab.style.right = 'auto';
    fab.style.bottom = 'auto';
    fab.dataset.nomiPlaced = '1';
    return p;
  }

  function readSaved() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var p = JSON.parse(raw);
      if (typeof p.left !== 'number' || typeof p.top !== 'number') return null;
      return p;
    } catch (e) {
      return null;
    }
  }

  function save(fab) {
    var r = fab.getBoundingClientRect();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ left: r.left, top: r.top }));
    } catch (e) {}
  }

  function restore(fab) {
    var p = readSaved();
    if (!p) return;
    requestAnimationFrame(function () {
      place(fab, p.left, p.top);
    });
  }

  function bindFab(fab) {
    var pointerId = null;
    var startX = 0;
    var startY = 0;
    var originLeft = 0;
    var originTop = 0;
    var dragging = false;

    restore(fab);

    fab.addEventListener('click', function (e) {
      e.preventDefault();
    });

    fab.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      fab.dispatchEvent(new CustomEvent('nomi-open', { bubbles: true }));
    });

    fab.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      pointerId = e.pointerId;
      dragging = false;
      startX = e.clientX;
      startY = e.clientY;
      var rect = fab.getBoundingClientRect();
      originLeft = rect.left;
      originTop = rect.top;
      fab.classList.add('is-pressing');
      try {
        fab.setPointerCapture(e.pointerId);
      } catch (err) {}
    });

    fab.addEventListener('pointermove', function (e) {
      if (e.pointerId !== pointerId) return;
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      if (!dragging) {
        if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
        dragging = true;
        fab.classList.add('is-dragging');
        fab.classList.remove('is-pressing');
        var rect = fab.getBoundingClientRect();
        originLeft = rect.left;
        originTop = rect.top;
        startX = e.clientX;
        startY = e.clientY;
      }
      e.preventDefault();
      place(fab, originLeft + (e.clientX - startX), originTop + (e.clientY - startY));
    });

    function endPointer(e) {
      if (e.pointerId !== pointerId) return;
      try {
        fab.releasePointerCapture(e.pointerId);
      } catch (err) {}
      pointerId = null;
      fab.classList.remove('is-pressing', 'is-dragging');
      if (dragging) {
        save(fab);
      } else {
        fab.dispatchEvent(new CustomEvent('nomi-open', { bubbles: true }));
      }
      dragging = false;
    }

    fab.addEventListener('pointerup', endPointer);
    fab.addEventListener('pointercancel', endPointer);

    window.addEventListener('resize', function () {
      if (fab.dataset.nomiPlaced !== '1') return;
      var rect = fab.getBoundingClientRect();
      place(fab, rect.left, rect.top);
      save(fab);
    });
  }

  document.querySelectorAll('.nomi-fab').forEach(bindFab);
})();
