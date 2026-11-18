#!/usr/bin/env python3
"""Assert search remains disabled in SSR HTML until React hydration takes control."""
import sys
from html.parser import HTMLParser
from pathlib import Path

class SearchInput(HTMLParser):
    def __init__(self):
        super().__init__()
        self.attrs = None

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "input" and values.get("id") == "project-search":
            self.attrs = values

def main(root: Path):
    for locale, document in (("en", root / "index.html"),
                             ("ar", root / "ar" / "index.html"),
                             ("tr", root / "tr" / "index.html")):
        parser = SearchInput()
        parser.feed(document.read_text(encoding="utf-8"))
        if parser.attrs is None:
            raise AssertionError(f"{locale}: project search missing in SSR output")
        if "disabled" not in parser.attrs:
            raise AssertionError(f"{locale}: search enabled before hydration; early input can be lost")
        print(f"PASS {locale} search SSR hydration gate", flush=True)

if __name__ == "__main__":
    main(Path(sys.argv[1]) if len(sys.argv) > 1 else Path("out"))
