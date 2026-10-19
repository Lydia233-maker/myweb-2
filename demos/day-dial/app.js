const BLOCKS = [
  { key: 'sleep', label: '睡眠', color: '#5c6b8a' },
  { key: 'work', label: '工作', color: '#1a1a17' },
  { key: 'deep', label: '深度', color: '#8b5a3c' },
  { key: 'move', label: '运动', color: '#3d7a5f' },
  { key: 'social', label: '社交', color: '#c45c8a' },
  { key: 'scroll', label: '碎片', color: '#9e9e98' },
];
const STORAGE = 'lidyapm-day-dial-v1';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (raw) return { ...defaultHours(), ...JSON.parse(raw) };
  } catch (_) {}
  return defaultHours();
}

function defaultHours() {
  return { sleep: 7.5, work: 8, deep: 2, move: 1, social: 2, scroll: 3.5 };
}

let hours = load();
const slidersEl = document.getElementById('sliders');
const dial = document.getElementById('dial');
const review = document.getElementById('review');

function save() {
  localStorage.setItem(STORAGE, JSON.stringify(hours));
  render();
}

function total() {
  return BLOCKS.reduce((s, b) => s + (hours[b.key] || 0), 0);
}

function renderSliders() {
  slidersEl.innerHTML = '';
  BLOCKS.forEach((b) => {
    const row = document.createElement('div');
    row.className = 'sl-row';
    row.innerHTML = `<span>${b.label}</span><input type="range" min="0" max="12" step="0.5" value="${hours[b.key]}" data-key="${b.key}"><span>${hours[b.key].toFixed(1)}h</span>`;
    const input = row.querySelector('input');
    input.addEventListener('input', () => {
      hours[b.key] = +input.value;
      row.querySelector('span:last-child').textContent = `${hours[b.key].toFixed(1)}h`;
      save();
    });
    slidersEl.appendChild(row);
  });
}

function renderDial() {
  const cx = 100;
  const cy = 100;
  const r = 78;
  let angle = -Math.PI / 2;
  const t = total() || 24;
  const parts = [];
  BLOCKS.forEach((b) => {
    const frac = (hours[b.key] || 0) / t;
    const a2 = angle + frac * Math.PI * 2;
    const x1 = cx + r * Math.cos(angle);
    const y1 = cy + r * Math.sin(angle);
    const x2 = cx + r * Math.cos(a2);
    const y2 = cy + r * Math.sin(a2);
    const large = frac > 0.5 ? 1 : 0;
    parts.push(
      `<path fill="${b.color}" d="M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z"/>`
    );
    angle = a2;
  });
  dial.innerHTML = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#26261f" stroke-width="1"/>` + parts.join('') +
    `<text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle" font-size="11" fill="#4e4e47" font-family="JetBrains Mono">${total().toFixed(1)}h</text>`;
}

function renderReview() {
  const t = total();
  const work = hours.work + hours.deep;
  const rest = hours.sleep + hours.move;
  let note = `今天模型里一共 ${t.toFixed(1)} 小时。\n`;
  if (work >= 9) note += '工作+深度偏多，留一点「无产出」缓冲会更稳。\n';
  if (hours.scroll >= 3) note += `碎片时间 ${hours.scroll}h，可以试「先记再刷」。\n`;
  if (rest >= 8) note += '休息和运动还行，别拿睡眠换深度工作。\n';
  if (t < 23.5 || t > 24.5) note += '（合计不是 24h，点「按比例缩放」对齐。）\n';
  review.textContent = note.trim();
}

function render() {
  renderSliders();
  renderDial();
  renderReview();
}

document.getElementById('normalize').addEventListener('click', () => {
  const t = total() || 1;
  const scale = 24 / t;
  BLOCKS.forEach((b) => {
    hours[b.key] = Math.round(hours[b.key] * scale * 2) / 2;
  });
  save();
});

document.getElementById('reset').addEventListener('click', () => {
  hours = defaultHours();
  save();
});

render();
