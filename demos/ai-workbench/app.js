pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let chunks = [];

async function loadPdf(file) {
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
  chunks = [];
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    const text = content.items.map((i) => i.str).join(' ');
    const parts = text.split(/(?<=[。！？.!?])\s+/).filter((s) => s.trim().length > 12);
    parts.forEach((s) => chunks.push({ page: p, text: s.trim() }));
  }
  document.getElementById('pdfMeta').textContent = `已索引 ${pdf.numPages} 页，${chunks.length} 个句子片段（仅存于本机内存）。`;
}

function score(q, text) {
  const keys = q.replace(/[？?]/g, '').split(/\s+/).filter(Boolean);
  let s = 0;
  keys.forEach((k) => {
    if (text.includes(k)) s += 2;
  });
  if (text.length < 120) s += 0.5;
  return s;
}

document.getElementById('pdf').addEventListener('change', (e) => {
  const f = e.target.files?.[0];
  if (f) loadPdf(f);
});

document.getElementById('ask').addEventListener('click', () => {
  const q = document.getElementById('q').value.trim();
  const answer = document.getElementById('answer');
  const cites = document.getElementById('cites');
  if (!chunks.length) {
    answer.textContent = '请先上传 PDF。';
    return;
  }
  if (!q) {
    answer.textContent = '请输入问题。';
    return;
  }
  const ranked = chunks
    .map((c) => ({ ...c, s: score(q, c.text) }))
    .filter((c) => c.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 3);
  if (!ranked.length) {
    answer.textContent = '未在文档中找到明显相关段落（演示用简单关键词匹配）。';
    cites.innerHTML = '';
    return;
  }
  answer.textContent = `根据文档，可能与「${q}」相关的结论是：${ranked[0].text.slice(0, 180)}…（以下为引用依据）`;
  cites.innerHTML = ranked
    .map(
      (c) =>
        `<blockquote style="margin:8px 0;padding:8px 12px;border-left:3px solid #8b5a3c;font-size:13px;background:#faf9f6"><small>第 ${c.page} 页</small><br>${c.text}</blockquote>`
    )
    .join('');
});
