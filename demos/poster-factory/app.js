const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let seed = 42;

function rand() {
  seed = (seed * 16807 + 0) % 2147483647;
  return (seed - 1) / 2147483646;
}

function draw() {
  const hue = +document.getElementById('hue').value;
  const contrast = +document.getElementById('contrast').value / 100;
  const density = +document.getElementById('density').value;
  const title = document.getElementById('title').value || 'POSTER';
  const w = canvas.width;
  const h = canvas.height;

  ctx.fillStyle = `hsl(${hue} 42% ${18 + contrast * 22}%)`;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < density * 80; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const r = 2 + rand() * 28 * contrast;
    ctx.fillStyle = `hsla(${(hue + rand() * 80 - 40 + 360) % 360} 70% ${45 + rand() * 35}% / ${0.08 + rand() * 0.35})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = `hsla(${hue + 40} 60% 88% / 0.35)`;
  ctx.lineWidth = 1;
  for (let y = 0; y < h; y += 18) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  ctx.fillStyle = '#f4f2ed';
  ctx.font = '500 42px Figtree, system-ui, sans-serif';
  ctx.textAlign = 'left';
  const lines = title.split(/\s+/);
  let ty = h * 0.72;
  lines.forEach((line) => {
    ctx.fillText(line, 36, ty);
    ty += 48;
  });

  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(244,242,237,0.55)';
  ctx.fillText(`seed ${seed} · lidyapm.com/demos`, 36, h - 32);
}

document.getElementById('seed').addEventListener('click', () => {
  seed = Math.floor(Math.random() * 1e9);
  draw();
});
['hue', 'contrast', 'density', 'title'].forEach((id) => {
  document.getElementById(id).addEventListener('input', draw);
});
document.getElementById('export').addEventListener('click', () => {
  const a = document.createElement('a');
  a.download = `poster-${seed}.png`;
  a.href = canvas.toDataURL('image/png');
  a.click();
});

draw();
