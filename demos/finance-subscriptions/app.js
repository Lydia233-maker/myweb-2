const SAMPLE = `date,description,amount
2026-01-05,Netflix,-45
2026-01-08,Spotify,-15
2026-01-12,阿里云,-89
2026-02-05,Netflix,-45
2026-02-06,Spotify,-15
2026-02-14,Notion,-68
2026-03-05,Netflix,-45
2026-03-08,超市,-230
2026-03-10,Spotify,-15
2026-03-12,阿里云,-89`;

let chart;

function parseCsv(text) {
  const lines = text.trim().split(/\n/).slice(1);
  return lines.map((line) => {
    const [date, description, amount] = line.split(',');
    return { date, description, amount: parseFloat(amount) };
  });
}

function analyze(rows) {
  const byMonth = {};
  const merchants = {};
  rows.forEach((r) => {
    const m = r.date.slice(0, 7);
    byMonth[m] = (byMonth[m] || 0) + Math.abs(r.amount);
    const key = r.description.trim();
    merchants[key] = (merchants[key] || 0) + 1;
  });
  const subs = Object.entries(merchants)
    .filter(([, c]) => c >= 2)
    .map(([name, c]) => ({ name, months: c }));
  return { byMonth, subs };
}

function render(rows) {
  const { byMonth, subs } = analyze(rows);
  document.getElementById('subs').innerHTML = subs.length
    ? subs.map((s) => `<li>${s.name} <span style="color:var(--muted)">（${s.months} 次扣款）</span></li>`).join('')
    : '<li>未发现重复扣款模式</li>';
  const labels = Object.keys(byMonth).sort();
  const data = labels.map((k) => byMonth[k]);
  const ctx = document.getElementById('chart');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{ label: '月度支出（绝对值）', data, backgroundColor: '#4a6b52' }] },
    options: { responsive: true, plugins: { legend: { display: false } } },
  });
}

document.getElementById('sample').addEventListener('click', () => render(parseCsv(SAMPLE)));
document.getElementById('csv').addEventListener('change', async (e) => {
  const f = e.target.files?.[0];
  if (!f) return;
  render(parseCsv(await f.text()));
});
render(parseCsv(SAMPLE));
