#!/usr/bin/env python3
"""Generate cream editorial UI-mock demo covers (960x540)."""
from PIL import Image, ImageDraw, ImageFont

W, H = 960, 540
BG = "#efede8"
INK = "#1a1a17"
MUTED = "#6f6f68"
LINE = "#bdb9ae"
ACCENT = "#8b5a3c"
PANEL = "#f7f6f2"


def font(size, bold=False):
    try:
        return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", size)
    except OSError:
        return ImageFont.load_default()


def frame(draw, title):
    draw.rectangle([40, 36, W - 40, H - 36], outline=INK, width=2)
    draw.rectangle([40, 36, W - 40, 78], fill=PANEL, outline=INK, width=1)
    draw.text((56, 48), title, fill=INK, font=font(22))


def save(name, img):
    path = f"/workspace/assets/demos/{name}.jpg"
    img.save(path, quality=92)
    print("wrote", path)


def ai_workbench():
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    frame(d, "个人 AI 工作台")
    d.rectangle([56, 100, 420, H - 56], outline=LINE, width=1, fill="#faf9f6")
    d.text((72, 118), "PDF · 退货政策.pdf", fill=MUTED, font=font(14))
    d.rectangle([72, 150, 400, 220], outline=LINE)
    d.text((80, 160), "…七天无理由除外类目…", fill=INK, font=font(13))
    d.text((80, 188), "来源：第 3 页", fill=ACCENT, font=font(12))
    d.rectangle([440, 100, W - 56, H - 56], outline=LINE, width=1, fill=PANEL)
    d.text((460, 118), "问：特殊类目能退吗？", fill=INK, font=font(14))
    d.rounded_rectangle([460, 200, 720, 280], radius=8, fill="#e8e6e0")
    d.text((472, 218), "根据文档第 3 页…", fill=INK, font=font(13))
    save("ai-workbench", im)


def weekly_radar():
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    frame(d, "信息雷达 · 今日 Top 5")
    y = 100
    for i, (score, t) in enumerate(
        [
            (9.2, "MCP 规范更新"),
            (8.8, "agents-radar  trending"),
            (8.1, "HN: local-first AI"),
            (7.6, "Open WebUI 发布"),
            (7.2, "Stirling PDF 桌面"),
        ]
    ):
        d.rectangle([56, y, W - 56, y + 62], outline=LINE, fill=PANEL if i % 2 else "#faf9f6")
        d.text((72, y + 12), t, fill=INK, font=font(15))
        d.text((W - 120, y + 20), f"{score}", fill=ACCENT, font=font(16))
        y += 70
    d.text((56, H - 48), "抓取 30 → 去重 22 → 推荐 5", fill=MUTED, font=font(13))
    save("weekly-radar", im)


def finance():
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    frame(d, "订阅 · 月度支出")
    for i, h in enumerate([80, 140, 110, 170, 130, 155]):
        x = 80 + i * 120
        d.rectangle([x, H - 80 - h, x + 70, H - 80], fill="#4a6b52" if i % 2 else "#6a8a72", outline=INK)
    d.text((80, 100), "Netflix · Spotify · 阿里云 · Notion", fill=MUTED, font=font(13))
    d.rectangle([560, 100, W - 56, 280], outline=LINE, fill=PANEL)
    d.text((580, 120), "识别订阅", fill=INK, font=font(16))
    d.text((580, 155), "• Netflix  3 次", fill=INK, font=font(14))
    d.text((580, 180), "• Spotify  3 次", fill=INK, font=font(14))
    save("finance-subscriptions", im)


def pdf_toolbox():
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    frame(d, "PDF 万能工具箱")
    d.rectangle([56, 110, W - 56, 220], outline=LINE, fill="#faf9f6")
    d.text((W // 2 - 80, 155), "拖拽 PDF 到此处", fill=MUTED, font=font(16))
    bx, by = 56, 250
    for label in ["合并", "压缩", "水印", "转图片"]:
        d.rectangle([bx, by, bx + 180, by + 52], fill=INK)
        d.text((bx + 50, by + 16), label, fill="#f4f2ed", font=font(15))
        bx += 200
    save("pdf-toolbox", im)


def uptime():
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    frame(d, "服务状态")
    tiles = [("lidyapm.com", True), ("API", True), ("内部任务", False), ("雷达", True), ("对象存储", False)]
    x, y = 56, 110
    for i, (name, ok) in enumerate(tiles):
        col = "#4a6b52" if ok else "#b54a4a"
        d.rectangle([x, y, x + 250, y + 90], outline=INK, fill=PANEL)
        d.ellipse([x + 16, y + 34, x + 32, y + 50], fill=col)
        d.text((x + 44, y + 28), name, fill=INK, font=font(16))
        d.text((x + 44, y + 54), "正常" if ok else "异常", fill=MUTED, font=font(13))
        x += 270
        if i == 2:
            x, y = 56, 220
    d.rectangle([56, 340, W - 56, 420], outline=LINE, fill="#faf9f6")
    d.text((72, 368), "公开状态页：3/5 服务正常", fill=INK, font=font(15))
    save("uptime-monitor", im)


def flash_memos():
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    frame(d, "闪念")
    d.rectangle([56, 100, W - 56, 150], outline=LINE, fill=PANEL)
    d.text((72, 118), "写一条闪念…  #产品", fill=MUTED, font=font(15))
    y = 170
    for t, tag in [("雷达好用榜先做 MVP", "产品"), ("评估集要会认栽", "AI"), ("周二评审别只贴聊天框", "笔记")]:
        d.rectangle([56, y, W - 56, y + 72], outline=LINE, fill="#faf9f6")
        d.text((72, y + 14), t, fill=INK, font=font(15))
        d.text((72, y + 40), tag, fill=ACCENT, font=font(12))
        y += 88
    save("flash-memos", im)


if __name__ == "__main__":
    ai_workbench()
    weekly_radar()
    finance()
    pdf_toolbox()
    uptime()
    flash_memos()
