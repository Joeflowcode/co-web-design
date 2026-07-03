#!/usr/bin/env python3
"""Export sales/one-pager.html to sales/one-pager.pdf"""
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).parent
html = (root / "one-pager.html").resolve().as_uri()
pdf = root / "one-pager.pdf"

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(html, wait_until="networkidle")
    page.pdf(
        path=str(pdf),
        format="Letter",
        print_background=True,
        margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
    )
    browser.close()

print(f"Wrote {pdf}")
