"""Capture Mizan's real local app with its own bundled sample data, not a mockup."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path("mizan-review-evidence")
OUT.mkdir(exist_ok=True)
BASE = "http://127.0.0.1:4173"
results = []
with sync_playwright() as pw:
    browser = pw.chromium.launch(channel="chrome", headless=True)
    context = browser.new_context(viewport={"width":1440,"height":960},device_scale_factor=1,
                                  locale="en-US",color_scheme="light",reduced_motion="reduce",
                                  service_workers="block",accept_downloads=False)
    # No real profile, data import, external account or transaction changes.
    page = context.new_page()
    response = page.goto(BASE+"/",wait_until="domcontentloaded",timeout=60000)
    if not response or response.status != 200:
        raise RuntimeError("Local Mizan dashboard unavailable")
    page.locator(".dashboard-stack .metric-card").first.wait_for(state="visible",timeout=30000)
    page.evaluate("document.fonts.ready")
    page.wait_for_function("""() => {
      const paths = [...document.querySelectorAll('.chart-wrap .recharts-area-curve')];
      return paths.length >= 2 && paths.every(p => {
        const d = p.getAttribute('d') || '';
        const bounds = p.getBoundingClientRect();
        return d.length > 30 && !/NaN|Infinity/.test(d) && bounds.width > 100 && bounds.height > 5;
      });
    }""",timeout=30000)
    page.wait_for_timeout(1800)
    assert page.locator(".metric-card").count() == 4
    assert page.locator(".recent-item").count() >= 3
    assert "Monthly salary" in page.locator(".recent-grid").inner_text()
    path = OUT/"mizan-dashboard-review.png"
    page.screenshot(path=str(path),animations="disabled")
    results.append({"capture":path.name,"renderedChartCurves":page.locator(".chart-wrap .recharts-area-curve").count(),"metricCards":4})
    response = page.goto(BASE+"/budgets.html",wait_until="domcontentloaded",timeout=30000)
    if response and response.status == 200:
        page.locator(".budget-tile").first.wait_for(state="visible",timeout=15000)
        page.evaluate("document.fonts.ready")
        page.wait_for_timeout(1200)
        assert page.locator(".budget-tile").count() >= 4
        page.screenshot(path=str(OUT/"mizan-budgets-review.png"),animations="disabled")
        results.append({"capture":"mizan-budgets-review.png","budgetTiles":page.locator(".budget-tile").count()})
    context.close()
    browser.close()
(OUT/"capture.json").write_text(json.dumps({"sourceCommit":"8e33fededbdfc4144b22b6c2608cd066378e44ed","source":"public mizan-finance source; Next.js static export (Vinext production build verified separately)","scope":"Bundled demo data in new browser context; no real account or deployment","review":"Manual visual approval required","results":results},indent=2),encoding="utf-8")
