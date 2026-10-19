const KEY = 'lidyapm-flash-memos';
let memos = JSON.parse(localStorage.getItem(KEY) || '[]');
let activeTag = '';

function save() {
  localStorage.setItem(KEY, JSON.stringify(memos));
}

function allTags() {
  const s = new Set();
  memos.forEach((m) => m.tags.forEach((t) => s.add(t)));
  return [...s];
}

function render() {
  const q = document.getElementById('search').value.trim().toLowerCase();
  const list = document.getElementById('list');
  let rows = memos.slice().sort((a, b) => b.ts - a.ts);
  if (activeTag) rows = rows.filter((m) => m.tags.includes(activeTag));
  if (q) rows = rows.filter((m) => m.text.toLowerCase().includes(q));
  list.innerHTML = rows.length
    ? rows
        .map(
          (m) =>
            `<article class="memo-item"><time>${new Date(m.ts).toLocaleString('zh-CN')}</time><p style="margin:6px 0 0">${m.text}</p><div class="tags">${m.tags.map((t) => `<span class="tag-pill">${t}</span>`).join('')}</div></article>`
        )
        .join('')
    : '<p style="color:var(--muted);font-size:14px">暂无内容</p>';

  const tf = document.getElementById('tagFilter');
  const tags = allTags();
  tf.innerHTML =
    '<span class="tag-pill' +
    (activeTag === '' ? ' is-on' : '') +
    '" data-tag="">全部</span>' +
    tags
      .map((t) => `<span class="tag-pill${activeTag === t ? ' is-on' : ''}" data-tag="${t}">#${t}</span>`)
      .join('');
  tf.querySelectorAll('.tag-pill').forEach((el) => {
    el.addEventListener('click', () => {
      activeTag = el.getAttribute('data-tag') || '';
      render();
    });
  });

  const cal = document.getElementById('cal');
  const now = new Date();
  const y = now.getFullYear();
  const mo = now.getMonth();
  const days = new Date(y, mo + 1, 0).getDate();
  const counts = {};
  memos.forEach((m) => {
    const d = new Date(m.ts);
    if (d.getFullYear() === y && d.getMonth() === mo) counts[d.getDate()] = (counts[d.getDate()] || 0) + 1;
  });
  let html = '';
  for (let d = 1; d <= days; d++) {
    const has = counts[d];
    html += `<span class="${has ? 'has' : ''}" title="${has ? has + ' 条' : ''}">${d}</span>`;
  }
  cal.innerHTML = html;
}

document.getElementById('post').addEventListener('click', () => {
  const text = document.getElementById('text').value.trim();
  if (!text) return;
  const tags = document
    .getElementById('tags')
    .value.split(/[,，\s]+/)
    .map((t) => t.trim())
    .filter(Boolean);
  memos.push({ id: crypto.randomUUID(), text, tags, ts: Date.now() });
  document.getElementById('text').value = '';
  save();
  render();
});

document.getElementById('search').addEventListener('input', render);

if (!memos.length) {
  memos = [
    { id: '1', text: '演示先做 MVP，再谈部署。', tags: ['产品', '笔记'], ts: Date.now() - 86400000 },
    { id: '2', text: '评估集要会「认栽」。', tags: ['AI'], ts: Date.now() - 3600000 },
  ];
  save();
}
render();
