const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');

const W = canvas.width;
const H = canvas.height;
let grav = 0.45;
let score = 0;
let timeLeft = 60;
let running = true;

const ball = { x: W / 2, y: H * 0.35, vx: 2.2, vy: 0, r: 8 };
const paddle = { w: 88, h: 10, x: W / 2 - 44 };
const bricks = [];
for (let row = 0; row < 4; row++) {
  for (let col = 0; col < 7; col++) {
    bricks.push({ x: 24 + col * 62, y: 48 + row * 28, w: 54, h: 18, alive: true });
  }
}

function resetGame() {
  score = 0;
  timeLeft = 60;
  running = true;
  ball.x = W / 2;
  ball.y = H * 0.35;
  ball.vx = (Math.random() > 0.5 ? 1 : -1) * 2.8;
  ball.vy = -1;
  bricks.forEach((b) => {
    b.alive = true;
  });
}

let lastSec = performance.now();
function tick(now) {
  if (running) {
    if (now - lastSec > 1000) {
      timeLeft -= 1;
      lastSec = now;
      if (timeLeft <= 0) running = false;
    }
    grav = +document.getElementById('grav').value;
    ball.vy += grav * 0.08;
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.x < ball.r || ball.x > W - ball.r) ball.vx *= -1;
    if (ball.y < ball.r) ball.vy *= -1;

    const py = H - 36;
    if (
      ball.y + ball.r >= py &&
      ball.y - ball.r <= py + paddle.h &&
      ball.x > paddle.x &&
      ball.x < paddle.x + paddle.w
    ) {
      ball.vy = -Math.abs(ball.vy) - 0.5;
      ball.vx += (ball.x - (paddle.x + paddle.w / 2)) * 0.06;
    }
    if (ball.y > H + 20) {
      ball.x = W / 2;
      ball.y = H * 0.3;
      ball.vy = -2;
      score = Math.max(0, score - 5);
    }

    bricks.forEach((b) => {
      if (!b.alive) return;
      if (
        ball.x + ball.r > b.x &&
        ball.x - ball.r < b.x + b.w &&
        ball.y + ball.r > b.y &&
        ball.y - ball.r < b.y + b.h
      ) {
        b.alive = false;
        ball.vy *= -1;
        score += 10;
      }
    });
  }

  ctx.fillStyle = '#faf9f6';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#1a1a17';
  bricks.forEach((b) => {
    if (!b.alive) return;
    ctx.fillRect(b.x, b.y, b.w, b.h);
  });
  ctx.fillStyle = '#8b5a3c';
  ctx.fillRect(paddle.x, H - 36, paddle.w, paddle.h);
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fill();

  scoreEl.textContent = running
    ? `得分 ${score} · ${timeLeft}s`
    : `时间到 · 得分 ${score}（点「再来 60s」）`;

  requestAnimationFrame(tick);
}

canvas.addEventListener('pointermove', (e) => {
  const r = canvas.getBoundingClientRect();
  paddle.x = ((e.clientX - r.left) / r.width) * W - paddle.w / 2;
  paddle.x = Math.max(8, Math.min(W - paddle.w - 8, paddle.x));
});

document.getElementById('again').addEventListener('click', resetGame);
resetGame();
requestAnimationFrame(tick);
