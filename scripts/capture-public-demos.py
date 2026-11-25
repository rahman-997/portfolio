#!/usr/bin/env python3
"""Review-only screenshots of the owner's public demo landing pages.

No authentication, form submissions, production writes, or external publication.
Captured images are unverified until inspected by a human.
"""
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

from playwright.sync_api import TimeoutError as BrowserTimeout, sync_playwright

SITES = {
    "bookhaven": "https://bookbookhaven-free.onrender.com/",
    "eventify": "https://eventify-web.onrender.com/",
}
OUT = Path("demo-health-evidence")
IMAGES = OUT / "screenshots"
EMAIL = re.compile(r"[\w.+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
PRIVATE = re.compile(
    r"(order history|my bookings|account settings|saved payment|"
    r"billing address|سجل الطلبات|حسابي|طلباتي|kişisel bilgilerim)",
    re.IGNORECASE,
)


def main():
    IMAGES.mkdir(parents=True, exist_ok=True)
    results = []
    with sync_playwright() as pw:
        browser = pw.chromium.launch(channel="chrome", headless=True)
        for slug, url in SITES.items():
            context = browser.new_context(
                viewport={"width": 1365, "height": 860},
                device_scale_factor=1,
                locale="en-US",
                color_scheme="light",
                reduced_motion="reduce",
                accept_downloads=False,
                service_workers="block",
            )
            page = context.new_page()
            record = {"project": slug, "requestedUrl": url, "status": "not-captured"}
            try:
                response = page.goto(url, wait_until="domcontentloaded", timeout=60000)
                host = urlparse(page.url).hostname
                record["httpStatus"] = response.status if response else None
                record["finalHost"] = host
                if not response or response.status != 200 or host != urlparse(url).hostname:
                    record["reason"] = "HTTP failure or redirect to a different host"
                else:
                    page.wait_for_timeout(1800)
                    text = page.locator("body").inner_text(timeout=12000).strip()
                    record["pageTitle"] = page.title()[:100]
                    record["visibleTextLength"] = len(text)
                    if len(text) < 70:
                        record["reason"] = "Rendered public page too sparse for a project preview"
                    elif EMAIL.search(text) or PRIVATE.search(text):
                        record["reason"] = "Possible personal/account content: screenshot withheld"
                    else:
                        path = IMAGES / f"{slug}-landing-unreviewed.png"
                        page.screenshot(path=str(path), full_page=False, animations="disabled")
                        record["screenshot"] = str(path)
                        record["status"] = "captured-unreviewed"
            except BrowserTimeout:
                record["reason"] = "Timeout"
            except Exception as error:
                record["reason"] = type(error).__name__
            finally:
                results.append(record)
                print(f"{slug}: {record['status']} ({record.get('reason', 'human review needed')})", flush=True)
                context.close()
        browser.close()
    (OUT / "capture-report.json").write_text(
        json.dumps({
            "checkedAt": datetime.now(timezone.utc).isoformat(),
            "purpose": "Read-only evidence. Screenshots must not be auto-published.",
            "results": results,
        }, indent=2) + "\n", encoding="utf-8"
    )


if __name__ == "__main__":
    main()
