const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const particles = [];
const max = 1200;

function spawn(x, y, vx, vy) {
  const ink = document.getElementById('ink').value;
  for (let i = 0; i < 6; i++) {
    if (particles.length >= max) particles.shift();
    particles.push({
      x,
      y,
      vx: vx * 0.4 + (Math.random() - 0.5) * 2,
      vy: vy * 0.4 + (Math.random() - 0.5) * 2,
      life: 1,
      color: ink,
    });
  }
}

let last = null;
function move(e) {
  const r = canvas.getBoundingClientRect();
  const x = ((e.clientX - r.left) / r.width) * canvas.width;
  const y = ((e.clientY - r.top) / r.height) * canvas.height;
  if (last) spawn(x, y, x - last.x, y - last.y);
  last = { x, y };
}
canvas.addEventListener('pointermove', move);
canvas.addEventListener('pointerdown', (e) => {
  canvas.setPointerCapture(e.pointerId);
  last = null;
  move(e);
});
canvas.addEventListener('pointerup', () => {
  last = null;
});

function tick() {
  ctx.fillStyle = 'rgba(250,249,246,0.12)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.96;
    p.vy *= 0.96;
    p.life -= 0.008;
    if (p.life <= 0) {
      particles.splice(i, 1);
      continue;
    }
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.life * 0.35;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.2 + p.life * 2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(tick);
}

document.getElementById('fade').addEventListener('click', () => {
  ctx.fillStyle = '#faf9f6';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.length = 0;
});
document.getElementById('shot').addEventListener('click', () => {
  const a = document.createElement('a');
  a.download = 'fluid.png';
  a.href = canvas.toDataURL('image/png');
  a.click();
});

ctx.fillStyle = '#faf9f6';
ctx.fillRect(0, 0, canvas.width, canvas.height);
tick();
