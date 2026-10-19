const TARGETS = [
  { name: 'lidyapm.com', url: 'https://lidyapm.com/', mode: 'live' },
  { name: 'GitHub API', url: 'https://api.github.com/', mode: 'live' },
  { name: '内部 API（模拟）', url: 'https://example.invalid/api', mode: 'mock-down' },
  { name: '周报机器人', url: 'https://radar.lyihub.com/', mode: 'live' },
  { name: '对象存储', url: 'https://httpbin.org/status/503', mode: 'mock-down' },
];

async function probe(t) {
  if (t.mode === 'mock-down') {
    await new Promise((r) => setTimeout(r, 400 + Math.random() * 300));
    return { ok: false, ms: 420, detail: '模拟超时/5xx' };
  }
  const start = performance.now();
  try {
    const res = await fetch(t.url, { mode: 'no-cors', cache: 'no-store' });
    const ms = Math.round(performance.now() - start);
    return { ok: true, ms, detail: res.type === 'opaque' ? 'opaque（浏览器限制）' : res.status };
  } catch (e) {
    return { ok: false, ms: Math.round(performance.now() - start), detail: String(e.message || e) };
  }
}

function renderRow(t, r) {
  const cls = r.ok ? 'up' : 'down';
  return `<div class="status-row"><span><span class="dot ${cls}"></span>${t.name}<br><small style="color:var(--muted)">${t.url}</small></span><span>${r.ms} ms</span><span>${r.ok ? '正常' : '异常'}</span></div>`;
}

async function run() {
  const grid = document.getElementById('grid');
  const alerts = document.getElementById('alerts');
  const pub = document.getElementById('public');
  grid.innerHTML = '<p>检测中…</p>';
  const results = [];
  for (const t of TARGETS) {
    const r = await probe(t);
    results.push({ t, r });
  }
  grid.innerHTML = results.map(({ t, r }) => renderRow(t, r)).join('');
  const down = results.filter((x) => !x.r.ok);
  if (document.getElementById('notify').checked && down.length) {
    down.forEach(({ t }) => {
      alerts.textContent += `[告警] ${t.name} 不可用 → 已记录邮件/Telegram 示意（静态 demo 不真发）。\n`;
    });
  }
  const up = results.filter((x) => x.r.ok).length;
  pub.innerHTML = `<strong>公开状态页（示意）</strong><p style="margin:8px 0 0;font-size:14px">总体：${up}/${results.length} 服务正常 · 更新于 ${new Date().toLocaleString('zh-CN')}</p>`;
}

document.getElementById('check').addEventListener('click', run);
run();
