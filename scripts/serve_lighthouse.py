#!/usr/bin/env python3
"""Read-only local static server with cache headers matching render.yaml.

Used ONLY for Lighthouse's localhost lab. This does not deploy or change
production headers. It fixes the misleading "no browser cache" finding from
the generic Python http.server, which does not reproduce Render's rules.
"""
from __future__ import annotations

import argparse
import gzip
import io
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit


def cache_policy(path: str) -> str | None:
    """Return Render static-site caching rules for a decoded URL path."""
    if path.startswith("/_next/static/"):
        return "public, max-age=31536000, immutable"
    if path.startswith("/projects/"):
        return "public, max-age=3600, stale-while-revalidate=86400"
    if path.startswith("/icons/") or path == "/favicon.svg":
        return "public, max-age=86400"
    if path == "/manifest.webmanifest":
        return "public, max-age=0, must-revalidate"
    if path.startswith("/opengraph-image") or path.startswith("/twitter-image"):
        return "public, max-age=86400, stale-while-revalidate=86400"
    return None


def accepts_gzip(header: str) -> bool:
    """Respect explicit gzip quality, including q=0 overriding wildcard."""
    qualities = {}
    for entry in header.split(","):
        coding, *params = entry.strip().lower().split(";")
        if not coding:
            continue
        quality = 1.0
        for param in params:
            name, _, value = param.strip().partition("=")
            if name == "q":
                try:
                    quality = float(value)
                except ValueError:
                    quality = 0.0
        qualities[coding] = quality if 0 <= quality <= 1 else 0.0
    return qualities.get("gzip", qualities.get("*", 0.0)) > 0


class PortfolioLighthouseHandler(SimpleHTTPRequestHandler):
    """Static files only; no API, auth, data writes or external requests."""

    gzip_enabled = False

    def send_head(self):
        # A separate opt-in lab scenario. Never modify files on disk.
        if not self.gzip_enabled or not accepts_gzip(self.headers.get("Accept-Encoding", "")):
            return super().send_head()
        path = Path(self.translate_path(self.path))
        if path.is_dir():
            if not urlsplit(self.path).path.endswith("/"):
                return super().send_head()
            path = path / "index.html"
        if not path.is_file() or path.is_symlink():
            return super().send_head()
        content_type = self.guess_type(str(path))
        text_types = {"application/javascript", "application/json", "application/manifest+json",
                      "application/xml", "image/svg+xml"}
        if not (content_type.startswith("text/") or content_type in text_types):
            return super().send_head()
        size = path.stat().st_size
        if not 256 <= size <= 4 * 1024 * 1024:
            return super().send_head()
        raw = path.read_bytes()
        payload = gzip.compress(raw, compresslevel=6, mtime=0)
        if len(payload) >= len(raw):
            return super().send_head()
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Encoding", "gzip")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        return io.BytesIO(payload)

    def end_headers(self) -> None:
        if self.gzip_enabled:
            self.send_header("Vary", "Accept-Encoding")
        pathname = urlsplit(self.path).path
        cache = cache_policy(pathname)
        if cache:
            self.send_header("Cache-Control", cache)
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        super().end_headers()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--directory", default="out")
    parser.add_argument("--port", type=int, default=4196)
    parser.add_argument("--bind", choices=("127.0.0.1", "localhost"), default="127.0.0.1")
    parser.add_argument("--gzip", action="store_true", help="Opt-in compressed-transfer lab; not a verified production configuration")
    args = parser.parse_args()
    PortfolioLighthouseHandler.gzip_enabled = args.gzip
    handler = partial(PortfolioLighthouseHandler, directory=args.directory)
    with ThreadingHTTPServer((args.bind, args.port), handler) as server:
        print(f"Lighthouse static lab listening on {args.bind}:{server.server_port}", flush=True)
        server.serve_forever()


if __name__ == "__main__":
    main()
