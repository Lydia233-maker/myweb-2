(function () {
  const chain = [
    { file: '01-2023-chatgpt-fear.html', title: 'ChatGPT 那年，产品经理第一次认真害怕' },
    { file: '02-2024-not-just-chat.html', title: '别再把大模型当聊天框' },
    { file: '03-2025-fixing-ai-errors.html', title: 'AI 出了错怎么修' },
    { file: '04-2025-agent-prd.html', title: 'Agent 来了之后，需求文档还怎么写' },
    { file: '05-2026-ai-news-notes.html', title: '这一周的 AI 新闻，我只想记三件事' },
  ];
  const nav = document.querySelector('.post-nav');
  if (!nav) return;
  const file = location.pathname.split('/').pop() || '';
  const i = chain.findIndex((a) => a.file === file);
  if (i < 0) return;
  const prev = i > 0 ? chain[i - 1] : null;
  const next = i < chain.length - 1 ? chain[i + 1] : null;
  const parts = [];
  if (prev) {
    parts.push(
      `<a class="post-nav__link post-nav__prev" href="${prev.file}"><span>上一篇</span><strong>${prev.title}</strong></a>`
    );
  } else {
    parts.push('<span class="post-nav__spacer"></span>');
  }
  parts.push('<a class="post-nav__hub" href="../articles.html">全部笔记</a>');
  if (next) {
    parts.push(
      `<a class="post-nav__link post-nav__next" href="${next.file}"><span>下一篇</span><strong>${next.title}</strong></a>`
    );
  } else {
    parts.push('<span class="post-nav__spacer"></span>');
  }
  nav.innerHTML = parts.join('');
})();
