const { PDFDocument, rgb, StandardFonts } = PDFLib;
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const log = (m) => {
  document.getElementById('log').textContent += m + '\n';
};

async function readFiles(input) {
  const files = [...(input.files || [])];
  return await Promise.all(files.map(async (f) => ({ name: f.name, bytes: await f.arrayBuffer() })));
}

function download(blob, name) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
}

document.getElementById('merge').addEventListener('click', async () => {
  const parts = await readFiles(document.getElementById('files'));
  if (parts.length < 1) return alert('请选择 PDF');
  const out = await PDFDocument.create();
  for (const p of parts) {
    const doc = await PDFDocument.load(p.bytes);
    const pages = await out.copyPages(doc, doc.getPageIndices());
    pages.forEach((pg) => out.addPage(pg));
  }
  const bytes = await out.save();
  download(new Blob([bytes], { type: 'application/pdf' }), 'merged.pdf');
  log('已生成 merged.pdf');
});

document.getElementById('compress').addEventListener('click', async () => {
  const parts = await readFiles(document.getElementById('files'));
  if (!parts[0]) return;
  const doc = await PDFDocument.load(parts[0].bytes);
  const bytes = await doc.save({ useObjectStreams: true });
  log(`压缩示意：${parts[0].bytes.byteLength} → ${bytes.byteLength} bytes`);
  download(new Blob([bytes], { type: 'application/pdf' }), 'compressed.pdf');
});

document.getElementById('watermark').addEventListener('click', async () => {
  const parts = await readFiles(document.getElementById('files'));
  if (!parts[0]) return;
  const doc = await PDFDocument.load(parts[0].bytes);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  doc.getPages().forEach((page) => {
    const { width, height } = page.getSize();
    page.drawText('lidyapm.com DEMO', {
      x: width * 0.15,
      y: height * 0.55,
      size: 32,
      font,
      color: rgb(0.65, 0.65, 0.65),
      opacity: 0.4,
    });
  });
  const bytes = await doc.save();
  download(new Blob([bytes], { type: 'application/pdf' }), 'watermarked.pdf');
  log('已加水印 watermarked.pdf');
});

document.getElementById('toimg').addEventListener('click', async () => {
  const parts = await readFiles(document.getElementById('files'));
  if (!parts[0]) return;
  const pdf = await pdfjsLib.getDocument({ data: parts[0].bytes }).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 1.2 });
  const canvas = document.createElement('canvas');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
  document.getElementById('preview').innerHTML = '';
  document.getElementById('preview').appendChild(canvas);
  canvas.toBlob((b) => download(b, 'page1.png'));
  log('第 1 页已导出 page1.png');
});
