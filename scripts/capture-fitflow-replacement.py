"""Capture replacement evidence from public product, no credentials or mutations."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path("replacement-evidence")
OUT.mkdir(exist_ok=True)
with sync_playwright() as pw:
    browser = pw.chromium.launch(channel="chrome", headless=True)
    context = browser.new_context(viewport={"width":1440,"height":960},device_scale_factor=1,
                                  reduced_motion="reduce",service_workers="block",accept_downloads=False)
    page = context.new_page()
    response = page.goto("https://fitflow-gym.onrender.com/",wait_until="networkidle",timeout=60000)
    if not response or response.status != 200 or not page.url.startswith("https://fitflow-gym.onrender.com/"):
        raise RuntimeError("Unexpected public FitFlow response")
    page.evaluate("document.fonts.ready")
    page.locator("#plan-builder").wait_for(state="visible",timeout=15000)
    # The earlier hero contains visibly incomplete photo data. Prefer the actual
    # training-plan UI, not a manipulated or reconstructed marketing screenshot.
    page.locator("#plan-builder").scroll_into_view_if_needed()
    page.evaluate("window.scrollTo(0,document.querySelector('#plan-builder').getBoundingClientRect().top + window.scrollY - 90)")
    page.wait_for_timeout(1800)
    page.screenshot(path=str(OUT/"fitflow-planner-review.png"),animations="disabled")
    page.locator("#flow-timer").scroll_into_view_if_needed()
    page.evaluate("window.scrollTo(0,document.querySelector('#flow-timer').getBoundingClientRect().top + window.scrollY - 90)")
    page.wait_for_timeout(1000)
    page.screenshot(path=str(OUT/"fitflow-timer-review.png"),animations="disabled")
    context.close()
    browser.close()
(OUT/"capture.json").write_text(json.dumps({"source":"https://fitflow-gym.onrender.com/","review":"Manual visual review required before any use","scope":"Unauthenticated landing sections; no user data, submissions, or source changes."},indent=2))
