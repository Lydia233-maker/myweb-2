# lidyapm.com (myweb-2)

黎婷的个人小站 — 静态站点，部署到 GitHub Pages（`CNAME`: lidyapm.com）。

## 预览

```bash
cd /path/to/myweb-2
python3 -m http.server 8080
```

浏览器打开 `http://localhost:8080/`。

## 结构

- `index.html` — 编辑风首页（奶油色、folio 卡片、Nomi FAB）
- `articles.html` — 文章列表（含封面缩略图）
- `articles/*.html` — 五篇中文长文
- `about.html` / `projects.html` — 关于与项目
- `style.css` — 全站样式
- `site-home.js` / `nomi.js` — 首页交互与 Nomi 关键词闲聊
- `assets/covers/` — 文章封面图
- `assets/nomi-anim.webp` — Nomi 动画（WebP，非 base64）
