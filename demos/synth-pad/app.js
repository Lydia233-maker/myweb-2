const NOTES = {
  a: 220,
  s: 246.94,
  d: 261.63,
  f: 293.66,
  g: 329.63,
  h: 349.23,
  j: 392,
  k: 440,
};

let ctx = null;
let filter = null;
let delay = null;
let delayGain = null;
const active = new Map();

function ensure() {
  if (ctx) return;
  ctx = new AudioContext();
  filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 2400;
  delay = ctx.createDelay(0.5);
  delay.delayTime.value = 0.18;
  delayGain = ctx.createGain();
  delayGain.gain.value = 0.35;
  const master = ctx.createGain();
  master.gain.value = 0.2;
  filter.connect(delay);
  delay.connect(delayGain);
  delayGain.connect(delay);
  delayGain.connect(master);
  master.connect(ctx.destination);
}

function noteOn(freq) {
  ensure();
  if (ctx.state === 'suspended') ctx.resume();
  const t = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const g = ctx.createGain();
  osc1.type = 'sawtooth';
  osc2.type = 'triangle';
  osc1.frequency.value = freq;
  osc2.frequency.value = freq * 1.005;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.35, t + 0.02);
  osc1.connect(g);
  osc2.connect(g);
  g.connect(filter);
  osc1.start(t);
  osc2.start(t);
  const id = Math.random();
  active.set(id, { osc1, osc2, g, t });
  return id;
}

function noteOff(id) {
  const v = active.get(id);
  if (!v) return;
  const t = ctx.currentTime;
  v.g.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
  v.osc1.stop(t + 0.16);
  v.osc2.stop(t + 0.16);
  active.delete(id);
}

const keyMap = new Map();

document.getElementById('start').addEventListener('click', () => {
  ensure();
  ctx.resume();
});

document.getElementById('filter').addEventListener('input', (e) => {
  if (filter) filter.frequency.value = +e.target.value;
});
document.getElementById('delay').addEventListener('input', (e) => {
  if (delay) delay.delayTime.value = +e.target.value;
});

window.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if (!NOTES[k] || keyMap.has(k)) return;
  e.preventDefault();
  keyMap.set(k, noteOn(NOTES[k]));
});
window.addEventListener('keyup', (e) => {
  const k = e.key.toLowerCase();
  const id = keyMap.get(k);
  if (id != null) {
    noteOff(id);
    keyMap.delete(k);
  }
});
