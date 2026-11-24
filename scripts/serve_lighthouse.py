#!/usr/bin/env python3
"""Read-only local static server with cache headers matching render.yaml.

Used ONLY for Lighthouse's localhost lab. This does not deploy or change
production headers. It fixes the misleading "no browser cache" finding from
the generic Python http.server, which does not reproduce Render's rules.
"""
from __future__ import annotations

import argparse
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


class PortfolioLighthouseHandler(SimpleHTTPRequestHandler):
    """Static files only; no API, auth, data writes or external requests."""

    def end_headers(self) -> None:
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
    args = parser.parse_args()
    handler = partial(PortfolioLighthouseHandler, directory=args.directory)
    with ThreadingHTTPServer((args.bind, args.port), handler) as server:
        print(f"Lighthouse static lab listening on {args.bind}:{server.server_port}", flush=True)
        server.serve_forever()


if __name__ == "__main__":
    main()
