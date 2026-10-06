# 角色素材位置

首页正式角色图片预留为 `assets/character/selected.png`（或同目录下的其他图片路径）。

当前正式素材为 `selected.png`，来自已提供的独立单角色 PNG。它以原始 1254 × 1254 比例保存，包含透明背景、猫耳、银色长发和完整身体；首页不会对它进行裁剪、拉伸或叠加绘制。

确认后：

1. 将单角色图片放进本目录。
2. 打开项目根目录的 `content.js`。
3. 把 `character.src` 改成相对路径，例如 `assets/character/selected.png`。

`character.js` 只负责加载原图，不会绘制或叠加角色部件。
