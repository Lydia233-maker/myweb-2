# 角色素材位置

首页正式角色图片预留为 `assets/character/selected.png`（或同目录下的其他图片路径）。

当前原始素材为 `selected.png`，来自已提供的独立单角色 PNG。它以原始 1254 × 1254 比例保存，包含透明背景、猫耳、银色长发和完整身体；首页不会对它进行裁剪、拉伸或叠加绘制。

动画帧保存在同一目录：

- `neutral-tail.png`：中性表情与猫尾巴。
- `sway-wave.png`：轻微左右摆头与挥手。
- `wink-wave.png`：wink 与挥手。

角色动画只切换这些完整 PNG，不在图片上叠加新画的眼睛、嘴巴或 CSS 几何图形；开启“减少动态效果”时会停在第一帧。

替换素材时：

1. 将单角色图片放进本目录。
2. 打开项目根目录的 `content.js`。
3. 把 `character.src` 或 `character.frames` 中的路径改成相对路径，例如 `assets/character/selected.png`。

`character.js` 只负责加载和切换 PNG 原图帧，不会绘制或叠加角色部件。
