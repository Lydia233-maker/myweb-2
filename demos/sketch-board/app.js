const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let drawing = false;
let panning = false;
let last = null;
let offset = { x: 0, y: 0 };
const strokes = [];

function resize() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(480 * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  redraw();
}
function redraw() {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(offset.x, offset.y);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  strokes.forEach((s) => {
    ctx.strokeStyle = s.color;
    ctx.lineWidth = s.size;
    ctx.beginPath();
    s.points.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.stroke();
  });
  ctx.restore();
}

function pt(e) {
  const r = canvas.getBoundingClientRect();
  const x = e.clientX - r.left - offset.x;
  const y = e.clientY - r.top - offset.y;
  return { x, y };
}

canvas.addEventListener('pointerdown', (e) => {
  canvas.setPointerCapture(e.pointerId);
  if (e.button === 1 || e.altKey) {
    panning = true;
    last = { x: e.clientX, y: e.clientY };
    return;
  }
  drawing = true;
  const p = pt(e);
  strokes.push({
    color: document.getElementById('color').value,
    size: +document.getElementById('size').value,
    points: [p],
  });
});
canvas.addEventListener('pointermove', (e) => {
  if (panning && last) {
    offset.x += e.clientX - last.x;
    offset.y += e.clientY - last.y;
    last = { x: e.clientX, y: e.clientY };
    redraw();
    return;
  }
  if (!drawing) return;
  strokes[strokes.length - 1].points.push(pt(e));
  redraw();
});
canvas.addEventListener('pointerup', () => {
  drawing = false;
  panning = false;
  last = null;
});

document.getElementById('clear').addEventListener('click', () => {
  strokes.length = 0;
  redraw();
});

window.addEventListener('resize', resize);
resize();
