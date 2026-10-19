#!/usr/bin/env python3
import re
from pathlib import Path

ROOT = Path("/workspace/articles")
pairs = [
    ("01-2023-chatgpt-fear.html", "01.html"),
    ("02-2024-not-just-chat.html", "02.html"),
    ("03-2025-fixing-ai-errors.html", "03.html"),
    ("04-2025-agent-prd.html", "04.html"),
    ("05-2026-ai-news-notes.html", "05.html"),
]
for html_name, body_name in pairs:
    html_path = ROOT / html_name
    body = (ROOT / "bodies" / body_name).read_text(encoding="utf-8").strip()
    text = html_path.read_text(encoding="utf-8")
    new_text, n = re.subn(
        r"(<div class=\"post__body\">).*?(</div>\s*<nav class=\"post-nav\")",
        lambda m: m.group(1) + "\n" + body + "\n      " + m.group(2),
        text,
        count=1,
        flags=re.DOTALL,
    )
    if n != 1:
        raise SystemExit(f"patch failed for {html_name}")
    html_path.write_text(new_text, encoding="utf-8")
    print("patched", html_name)
