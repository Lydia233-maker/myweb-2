# radar.lyihub.com — 6 copyable prompts

Source board: https://radar.lyihub.com/

These are the full texts from each item’s「体检 + Prompt」dialog (button「复制开工提示词」). No login was required. The board has no per-item URL; `url` is the source link on the card.

All six are from the 好用 (utility) track, chosen as web product/tools rather than portfolio cosmetics.

## 1. 个人 AI 工作台

- Track: 好用 #1
- Source: Open WebUI
- Description: 统一聊天、文件问答、网页总结和日常工具调用。
- URL: https://github.com/open-webui/open-webui
- Board: https://radar.lyihub.com/

### Prompt

```text
请直接帮我把这个项目跑起来。
请直接操作并用简单中文说明，不要只给我计划。
项目：个人 AI 工作台
项目地址：https://github.com/open-webui/open-webui
先实现这个效果：先接一个模型，支持上传 PDF，回答时附来源片段。
匹配的 Skill（可选）：
- GitHub CLI：https://cli.github.com/
- OpenAI Cookbook：https://github.com/openai/openai-cookbook
请按这个顺序执行：
1. 先读 README、安装说明、示例和依赖文件，确认官方启动方式。
2. 检查当前环境；缺少账号、密钥、付费服务、硬件或必要权限时，告诉我具体缺什么。
3. 按官方最短路径运行原项目，优先保留原项目的核心效果，不要擅自重写或缩水。项目不在当前目录时放进独立目录，不覆盖我现有文件。
4. 遇到报错先看完整错误并修根因，不要反复重装或大面积改代码碰运气。
5. 涉及删除文件、全局安装、登录授权、上传数据、硬件烧录或公开部署时，先向我确认。
完成后告诉我：是否跑通、访问地址或生成结果、仍然卡在哪里。
```

## 2. 信息雷达 / 周报机器人

- Track: 好用 #3
- Source: agents-radar
- Description: 自动扫描 Product Hunt、HN、GitHub 和 RSS，整理成可发布周报。
- URL: https://github.com/duanyytop/agents-radar
- Board: https://radar.lyihub.com/

### Prompt

```text
请直接帮我把这个项目跑起来。
请直接操作并用简单中文说明，不要只给我计划。
项目：信息雷达 / 周报机器人
项目地址：https://github.com/duanyytop/agents-radar
先实现这个效果：每日抓 30 条链接，去重、打分、生成 5 条推荐。
匹配的 Skill（可选）：
- GitHub CLI：https://cli.github.com/
- Document Skills：https://github.com/anthropics/skills
请按这个顺序执行：
1. 先读 README、安装说明、示例和依赖文件，确认官方启动方式。
2. 检查当前环境；缺少账号、密钥、付费服务、硬件或必要权限时，告诉我具体缺什么。
3. 按官方最短路径运行原项目，优先保留原项目的核心效果，不要擅自重写或缩水。项目不在当前目录时放进独立目录，不覆盖我现有文件。
4. 遇到报错先看完整错误并修根因，不要反复重装或大面积改代码碰运气。
5. 涉及删除文件、全局安装、登录授权、上传数据、硬件烧录或公开部署时，先向我确认。
完成后告诉我：是否跑通、访问地址或生成结果、仍然卡在哪里。
```

## 3. 个人财务 / 订阅管理器

- Track: 好用 #7
- Source: Actual Budget
- Description: 看清每月钱去了哪里，自动提醒快到期的订阅。
- URL: https://github.com/actualbudget/actual
- Board: https://radar.lyihub.com/

### Prompt

```text
请直接帮我把这个项目跑起来。
请直接操作并用简单中文说明，不要只给我计划。
项目：个人财务 / 订阅管理器
项目地址：https://github.com/actualbudget/actual
先实现这个效果：导入账单 CSV，识别订阅，生成月度支出图。
匹配的 Skill（可选）：
- GitHub CLI：https://cli.github.com/
请按这个顺序执行：
1. 先读 README、安装说明、示例和依赖文件，确认官方启动方式。
2. 检查当前环境；缺少账号、密钥、付费服务、硬件或必要权限时，告诉我具体缺什么。
3. 按官方最短路径运行原项目，优先保留原项目的核心效果，不要擅自重写或缩水。项目不在当前目录时放进独立目录，不覆盖我现有文件。
4. 遇到报错先看完整错误并修根因，不要反复重装或大面积改代码碰运气。
5. 涉及删除文件、全局安装、登录授权、上传数据、硬件烧录或公开部署时，先向我确认。
完成后告诉我：是否跑通、访问地址或生成结果、仍然卡在哪里。
```

## 4. PDF 万能工具箱

- Track: 好用 #8
- Source: Stirling PDF
- Description: 合并、压缩、签名、OCR、转图片，所有 PDF 小活都在本地跑。
- URL: https://github.com/Stirling-Tools/Stirling-PDF
- Board: https://radar.lyihub.com/

### Prompt

```text
请直接帮我把这个项目跑起来。
请直接操作并用简单中文说明，不要只给我计划。
项目：PDF 万能工具箱
项目地址：https://github.com/Stirling-Tools/Stirling-PDF
先实现这个效果：做一个上传区，支持合并、压缩、加水印和转图片四个按钮。
匹配的 Skill（可选）：
- GitHub CLI：https://cli.github.com/
- Document Skills：https://github.com/anthropics/skills
请按这个顺序执行：
1. 先读 README、安装说明、示例和依赖文件，确认官方启动方式。
2. 检查当前环境；缺少账号、密钥、付费服务、硬件或必要权限时，告诉我具体缺什么。
3. 按官方最短路径运行原项目，优先保留原项目的核心效果，不要擅自重写或缩水。项目不在当前目录时放进独立目录，不覆盖我现有文件。
4. 遇到报错先看完整错误并修根因，不要反复重装或大面积改代码碰运气。
5. 涉及删除文件、全局安装、登录授权、上传数据、硬件烧录或公开部署时，先向我确认。
完成后告诉我：是否跑通、访问地址或生成结果、仍然卡在哪里。
```

## 5. 服务健康监控面板

- Track: 好用 #9
- Source: Uptime Kuma
- Description: 把网站、接口、自动化脚本都放进一个会报警的状态页。
- URL: https://github.com/louislam/uptime-kuma
- Board: https://radar.lyihub.com/

### Prompt

```text
请直接帮我把这个项目跑起来。
请直接操作并用简单中文说明，不要只给我计划。
项目：服务健康监控面板
项目地址：https://github.com/louislam/uptime-kuma
先实现这个效果：监控 5 个 URL，失败时发邮件/Telegram，并生成公开状态页。
匹配的 Skill（可选）：
- GitHub CLI：https://cli.github.com/
- Sentry Agent Skills：https://github.com/getsentry/skills
请按这个顺序执行：
1. 先读 README、安装说明、示例和依赖文件，确认官方启动方式。
2. 检查当前环境；缺少账号、密钥、付费服务、硬件或必要权限时，告诉我具体缺什么。
3. 按官方最短路径运行原项目，优先保留原项目的核心效果，不要擅自重写或缩水。项目不在当前目录时放进独立目录，不覆盖我现有文件。
4. 遇到报错先看完整错误并修根因，不要反复重装或大面积改代码碰运气。
5. 涉及删除文件、全局安装、登录授权、上传数据、硬件烧录或公开部署时，先向我确认。
完成后告诉我：是否跑通、访问地址或生成结果、仍然卡在哪里。
```

## 6. 闪念备忘录 / 个人微博

- Track: 好用 #11
- Source: Memos
- Description: 像发微博一样记录想法、链接、截图和今日碎片。
- URL: https://github.com/usememos/memos
- Board: https://radar.lyihub.com/

### Prompt

```text
请直接帮我把这个项目跑起来。
请直接操作并用简单中文说明，不要只给我计划。
项目：闪念备忘录 / 个人微博
项目地址：https://github.com/usememos/memos
先实现这个效果：做快速输入、标签、日历视图和全文搜索。
匹配的 Skill（可选）：
- GitHub CLI：https://cli.github.com/
- Document Skills：https://github.com/anthropics/skills
请按这个顺序执行：
1. 先读 README、安装说明、示例和依赖文件，确认官方启动方式。
2. 检查当前环境；缺少账号、密钥、付费服务、硬件或必要权限时，告诉我具体缺什么。
3. 按官方最短路径运行原项目，优先保留原项目的核心效果，不要擅自重写或缩水。项目不在当前目录时放进独立目录，不覆盖我现有文件。
4. 遇到报错先看完整错误并修根因，不要反复重装或大面积改代码碰运气。
5. 涉及删除文件、全局安装、登录授权、上传数据、硬件烧录或公开部署时，先向我确认。
完成后告诉我：是否跑通、访问地址或生成结果、仍然卡在哪里。
```
