#!/usr/bin/env python3
"""Offline SSR/CSS smoke-test of a built Portfolio (not hydrated React E2E)."""
from __future__ import annotations
import argparse
import json
import os
import re
import sys
import zipfile
from pathlib import Path
from playwright.sync_api import sync_playwright

LOCALES = ("en", "ar", "tr")
THEMES = ("light", "dark")
WIDTHS = (320, 768, 1440)
CSS_LINK = re.compile(r'<link\b(?=[^>]*\brel=[\'\"]stylesheet[\'\"])[^>]*\bhref=[\'\"]([^\'\"]+\.css)[\'\"][^>]*>', re.I)
SCRIPT = re.compile(r'<script\b[^>]*>.*?</script\s*>', re.I | re.S)

def build_html(read_asset, locale: str) -> str:
    file = "out/index.html" if locale == "en" else f"out/{locale}/index.html"
    html = read_asset(file).decode("utf-8")
    css_files = CSS_LINK.findall(html)
    if not css_files:
        raise ValueError(f"No compiled CSS linked in {file}")
    css = []
    for link in css_files:
        if not link.startswith("/_next/static/css/") or ".." in link:
            raise ValueError(f"Unexpected stylesheet URL: {link}")
        css.append(read_asset("out" + link).decode("utf-8"))
    html = SCRIPT.sub("", html)
    html = CSS_LINK.sub("", html)
    if "</head>" not in html:
        raise ValueError(f"No document head in {file}")
    return html.replace("</head>", "<style>" + "\n".join(css) + "</style></head>", 1)

def inspect(page, locale: str, theme: str, width: int) -> dict:
    data = page.evaluate("""() => {
      const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
      const broken = [...document.querySelectorAll('a[href^="#"]')]
        .map(a => a.getAttribute('href'))
        .filter(h => h.length > 1 && !document.getElementById(decodeURIComponent(h.slice(1))));
      const work = document.querySelector('#work');
      return {
        lang: document.documentElement.lang,
        dir: document.documentElement.dir,
        projects: document.querySelectorAll('#work article').length,
        search_present: !!document.querySelector('#project-search'),
        overflow_px: document.documentElement.scrollWidth - innerWidth,
        duplicate_ids: ids.length - new Set(ids).size,
        broken_internal_links: broken.length,
        theme: document.documentElement.getAttribute('data-theme'),
        gallery_width: work?.getBoundingClientRect().width ?? 0,
      };
    }""")
    # English without explicit dir is valid browser-default LTR; Arabic needs RTL.
    data["passed"] = (
        data["lang"] == locale
        and (data["dir"] == "rtl" if locale == "ar" else data["dir"] in ("", "ltr"))
        and data["projects"] == 22
        and data["search_present"]
        and data["overflow_px"] <= 2
        and data["duplicate_ids"] == 0
        and data["broken_internal_links"] == 0
        and data["theme"] == theme
        and data["gallery_width"] > 0
    )
    data["case"] = f"{locale}-{theme}-{width}"
    return data

def run(args) -> int:
    if args.zip:
        source = zipfile.ZipFile(args.zip)
        read_asset = source.read
    else:
        root = args.root.resolve()
        source = None
        read_asset = lambda path: (root / path).read_bytes()
    cases = []
    try:
        sites = {locale: build_html(read_asset, locale) for locale in LOCALES}
        with sync_playwright() as playwright:
            launch = {"headless": True, "args": ["--no-sandbox", "--disable-dev-shm-usage"]}
            if os.environ.get("ATLAS_BROWSER_EXECUTABLE"):
                launch["executable_path"] = os.environ["ATLAS_BROWSER_EXECUTABLE"]
            elif os.environ.get("ATLAS_BROWSER_CHANNEL"):
                launch["channel"] = os.environ["ATLAS_BROWSER_CHANNEL"]
            browser = playwright.chromium.launch(**launch)
            try:
                for locale in LOCALES:
                    for theme in THEMES:
                        for width in WIDTHS:
                            name = f"{locale}-{theme}-{width}"
                            ctx = browser.new_context(viewport={"width": width, "height": 900}, color_scheme=theme, reduced_motion="reduce")
                            page = ctx.new_page()
                            try:
                                # Static SSR only, no external navigation or hydration.
                                page.set_content(sites[locale], wait_until="domcontentloaded", timeout=25000)
                                page.evaluate("theme => document.documentElement.setAttribute('data-theme',theme)", theme)
                                item = inspect(page, locale, theme, width)
                                cases.append(item)
                                print(("PASS " if item["passed"] else "FAIL ") + name + f" overflow={item['overflow_px']}", flush=True)
                            except Exception as exc:
                                cases.append({"case": name, "passed": False, "error": str(exc)[:500]})
                                print("FAIL " + name + ": " + str(exc)[:200], file=sys.stderr, flush=True)
                            finally:
                                ctx.close()
            finally:
                browser.close()
    finally:
        if source is not None:
            source.close()
    report = {
        "scope": "OFFLINE SSR+CSS ONLY; NOT a React hydration / browser E2E validation",
        "cases": cases,
        "passed": sum(bool(x["passed"]) for x in cases),
        "failed": sum(not x["passed"] for x in cases),
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"SSR-only layout QA: {report['passed']}/{len(cases)} passed; saved {args.output}")
    return 0 if len(cases) == len(LOCALES) * len(THEMES) * len(WIDTHS) and report["failed"] == 0 else 1

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1], help="Project checkout containing out/")
    parser.add_argument("--zip", type=Path, help="Optional GitHub Actions static artifact ZIP, never contact server")
    parser.add_argument("--output", type=Path, default=Path(".qa/offline-ssr-report.json"))
    arguments = parser.parse_args()
    try:
        sys.exit(run(arguments))
    except Exception as error:
        print("SSR QA preflight failed: " + str(error), file=sys.stderr)
        sys.exit(1)
