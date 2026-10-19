/** Shared footer credit for radar-sourced demos */
export function mountCredit(root, radarName) {
  const el = document.createElement('p');
  el.className = 'demo-credit';
  el.innerHTML =
    `雷达条目：<strong>${radarName}</strong> · 思路来自 ` +
    `<a href="https://radar.lyihub.com/" target="_blank" rel="noopener">Vibe Coding 雷达</a> · ` +
    `<a href="../index.html">演示角</a> · <a href="../../projects.html">项目</a>`;
  root.appendChild(el);
}
