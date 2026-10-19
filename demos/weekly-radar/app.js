const SAMPLE = [
  { title: 'MCP 规范更新草案', url: 'https://modelcontextprotocol.io/', src: 'RSS', tags: ['agent'] },
  { title: 'HN: Local-first AI notes', url: 'https://news.ycombinator.com/', src: 'HN', tags: ['local'] },
  { title: 'Product Hunt — devtools 榜首', url: 'https://www.producthunt.com/', src: 'PH', tags: ['tools'] },
  { title: 'GitHub Trending: agents-radar', url: 'https://github.com/duanyytop/agents-radar', src: 'GitHub', tags: ['radar'] },
  { title: 'Open WebUI 发布说明', url: 'https://github.com/open-webui/open-webui', src: 'GitHub', tags: ['chat'] },
  { title: 'HN: RAG is not enough', url: 'https://news.ycombinator.com/item?id=111', src: 'HN', tags: ['rag'] },
  { title: '周报模板：产品向', url: 'https://lidyapm.com/articles.html', src: 'RSS', tags: ['pm'] },
  { title: 'Uptime Kuma 2.x 讨论', url: 'https://github.com/louislam/uptime-kuma', src: 'GitHub', tags: ['ops'] },
  { title: 'Stirling PDF 桌面版', url: 'https://github.com/Stirling-Tools/Stirling-PDF', src: 'GitHub', tags: ['pdf'] },
  { title: 'Memos 轻量笔记', url: 'https://github.com/usememos/memos', src: 'GitHub', tags: ['notes'] },
];

function expand30() {
  const out = [];
  for (let i = 0; i < 30; i++) {
    const base = SAMPLE[i % SAMPLE.length];
    out.push({ ...base, title: base.title + (i >= SAMPLE.length ? ` · ${i}` : ''), dup: i % 7 === 0 });
  }
  return out;
}

function host(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function run() {
  const log = document.getElementById('log');
  const top = document.getElementById('top');
  log.textContent = '';
  const raw = expand30();
  log.textContent += `抓取 ${raw.length} 条…\n`;
  const seen = new Set();
  const deduped = [];
  raw.forEach((item) => {
    const h = host(item.url);
    if (seen.has(h) && item.dup) return;
    seen.add(h);
    deduped.push(item);
  });
  log.textContent += `去重后 ${deduped.length} 条。\n`;
  const scored = deduped.map((item) => {
    let s = item.src === 'GitHub' ? 3 : item.src === 'HN' ? 2.5 : 2;
    if (item.tags.includes('agent') || item.tags.includes('radar')) s += 1.2;
    s += Math.random() * 0.8;
    return { ...item, score: s };
  });
  scored.sort((a, b) => b.score - a.score);
  const five = scored.slice(0, 5);
  log.textContent += `打分完成，输出 Top 5。\n`;
  top.innerHTML = five
    .map(
      (f) =>
        `<li><a href="${f.url}" target="_blank" rel="noopener" style="text-decoration:underline">${f.title}</a> <span style="color:var(--muted);font-size:12px">(${f.src} · ${f.score.toFixed(1)})</span></li>`
    )
    .join('');
}

document.getElementById('run').addEventListener('click', run);
run();
