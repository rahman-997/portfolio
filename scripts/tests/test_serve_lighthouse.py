#!/usr/bin/env python3
"""Verify Lighthouse local server mirrors the static host cache contract."""
from __future__ import annotations

import tempfile
import threading
import unittest
from functools import partial
from http.server import ThreadingHTTPServer
from pathlib import Path
from urllib.request import urlopen

from scripts.serve_lighthouse import PortfolioLighthouseHandler, cache_policy


class CachePolicyTest(unittest.TestCase):
    def test_matched_render_rules(self):
        cases = {
            "/_next/static/chunks/123.js": "public, max-age=31536000, immutable",
            "/projects/sample.webp": "public, max-age=3600, stale-while-revalidate=86400",
            "/icons/icon-192.png": "public, max-age=86400",
            "/favicon.svg": "public, max-age=86400",
            "/manifest.webmanifest": "public, max-age=0, must-revalidate",
            "/opengraph-image.png": "public, max-age=86400, stale-while-revalidate=86400",
            "/twitter-image.png": "public, max-age=86400, stale-while-revalidate=86400",
        }
        for path, expected in cases.items():
            with self.subTest(path=path):
                self.assertEqual(cache_policy(path), expected)

    def test_home_document_is_not_claimed_immutable(self):
        self.assertIsNone(cache_policy("/"))
        self.assertIsNone(cache_policy("/ar/"))
        self.assertIsNone(cache_policy("/resume/"))

    def test_http_get_and_head_expose_cache_headers(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            for path in ("index.html", "projects/sample.webp", "_next/static/chunks/abc.js"):
                target = root / path
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes(b"test")
            handler = partial(PortfolioLighthouseHandler, directory=directory)
            server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
            worker = threading.Thread(target=server.serve_forever, daemon=True)
            worker.start()
            try:
                origin = f"http://127.0.0.1:{server.server_port}"
                with urlopen(origin + "/") as response:
                    self.assertEqual(response.status, 200)
                    self.assertIsNone(response.headers.get("Cache-Control"))
                    self.assertEqual(response.headers.get("X-Content-Type-Options"), "nosniff")
                with urlopen(origin + "/projects/sample.webp") as response:
                    self.assertIn("max-age=3600", response.headers.get("Cache-Control", ""))
                with urlopen(origin + "/_next/static/chunks/abc.js") as response:
                    self.assertIn("immutable", response.headers.get("Cache-Control", ""))
            finally:
                server.shutdown()
                server.server_close()
                worker.join(timeout=2)


if __name__ == "__main__":
    unittest.main()
