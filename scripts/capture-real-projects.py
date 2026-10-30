#!/usr/bin/env python3
"""Capture the actual public landing pages of portfolio projects.

Evidence only: never synthesize a screenshot, log in, seed data or modify
the external applications. If a site is unavailable, report that explicitly.
"""
import hashlib
import json
import os
import sys
import time
from datetime import datetime, timezone
from io import BytesIO
from pathlib import Path
from PIL import Image, ImageStat
from playwright.sync_api import sync_playwright

TARGETS = {
    "eventify": "https://eventify-web.onrender.com/",
    "bookbookhaven": "https://bookbookhaven-free.onrender.com/",
    "fitflow-gym": "https://fitflow-gym.onrender.com/",
}
ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "projects" / "live"
MANIFEST = ROOT / "app" / "experience" / "project-captures.json"
OUTPUT.mkdir(parents=True, exist_ok=True)
results = {"method": "Headless Chromium capture of public, unauthenticated project homepages",
           "screenshots": {}, "unavailable": {}}

def valid_page(page, response):
    if response is None or response.status >= 400:
        return False, "HTTP " + (str(response.status) if response is not None else "no response")
    title = page.title().strip()
    text = page.locator("body").inner_text(timeout=12000).strip()
    if len(text) < 90:
        return False, "Insufficient public page content"
    errors = ["this site can't be reached", "application failed to respond",
              "service unavailable", "502 bad gateway", "504 gateway timeout",
              "render service unavailable", "internal server error"]
    haystack = (title + "\n" + text[:2500]).lower()
    if any(error in haystack for error in errors):
        return False, "App or hosting error page"
    return True, title

with sync_playwright() as pw:
    browser = pw.chromium.launch(channel="chrome", headless=True, args=["--disable-dev-shm-usage"])
    for slug, url in TARGETS.items():
        last = "No attempt completed"
        for attempt in range(1, 4):
            context = browser.new_context(
                viewport={"width": 1440, "height": 900},
                device_scale_factor=1, locale="en-US",
                reduced_motion="reduce", color_scheme="light",
                service_workers="block")
            page = context.new_page()
            try:
                print(f"CAPTURE {slug}: attempt {attempt} {url}", flush=True)
                backend_http = None
                if slug == "eventify":
                    # Give Render's publicly documented API a chance to wake up.
                    # This is GET-only and never mutates bookings or demo state.
                    try:
                        backend_response = page.request.get(
                            "https://backend2-api.onrender.com/health",
                            timeout=75000,
                        )
                        backend_http = backend_response.status
                    except Exception:
                        backend_http = None
                response = page.goto(url, wait_until="domcontentloaded", timeout=85000)
                page.wait_for_timeout(3500)
                page.evaluate("document.fonts.ready")
                okay, message = valid_page(page, response)
                if not okay:
                    last = message
                    print(f"UNAVAILABLE {slug}: {message}", flush=True)
                    continue
                shot = page.screenshot(type="jpeg", quality=82, full_page=False,
                                       animations="disabled", timeout=35000)
                img = Image.open(BytesIO(shot)).convert("RGB")
                means = ImageStat.Stat(img.resize((64, 40))).stddev
                if len(shot) < 17000 or max(means) < 14:
                    last = "Screenshot did not show enough varied visual content"
                    continue
                path = OUTPUT / (slug + "-actual.jpg")
                path.write_bytes(shot)
                sha256 = hashlib.sha256(shot).hexdigest()
                visible_text = page.locator("body").inner_text(timeout=12000).lower()
                degraded = ("could not load events" in visible_text or
                            "temporarily degraded" in visible_text or
                            "is reconnecting" in visible_text)
                results["screenshots"][slug] = {
                    "src": "/projects/live/" + path.name,
                    "publicPageStatus": "degraded" if degraded else "landing-loaded",
                    "apiHealthHttp": backend_http,
                    "sourceUrl": url,
                    "finalUrl": page.url,
                    "capturedAt": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
                    "sha256": sha256,
                    "httpStatus": response.status,
                    "title": message[:180],
                    "viewport": "1440x900",
                    "verified": True,
                }
                print(f"CAPTURED {slug}: {len(shot)} bytes SHA256={sha256[:16]}", flush=True)
                break
            except Exception as ex:
                last = type(ex).__name__ + ": " + str(ex).splitlines()[0][:280]
                print(f"RETRY {slug}: {last}", flush=True)
            finally:
                context.close()
            time.sleep(2)
        if slug not in results["screenshots"]:
            results["unavailable"][slug] = {"sourceUrl": url, "reason": last}
            print(f"SKIPPED {slug}: {last}", flush=True)
    browser.close()

MANIFEST.write_text(json.dumps(results, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
(ROOT / "capture-report.json").write_text(
    json.dumps(results, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print("Verified captures:", len(results["screenshots"]), "out of", len(TARGETS), flush=True)
# Authenticity rule: unavailable is a legitimate result; do not create placeholders.
if not results["screenshots"]:
    print("No real screenshots captured; keep visual fallback transparent and truthful.", file=sys.stderr)
