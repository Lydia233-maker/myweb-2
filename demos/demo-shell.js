/** Optional footer links back to the demo hub */
export function mountCredit(root) {
  const el = document.createElement('p');
  el.className = 'demo-credit';
  el.innerHTML =
    `<a href="../index.html">演示角</a> · <a href="../../projects.html">项目</a>`;
  root.appendChild(el);
}
