#!/usr/bin/env python3
"""Acceptance checks against locally served static Next.js export."""
import json
import os
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = os.environ.get("ATLAS_BASE_URL", "http://127.0.0.1:4173")
OUTPUT = Path(os.environ.get("ATLAS_QA_OUTPUT", "atlas-qa-artifacts"))
OUTPUT.mkdir(parents=True, exist_ok=True)
REPORT = []
ISSUES = []
SIZES = [
    ("desktop", 1440, 900),
    ("tablet", 820, 1000),
    ("mobile", 390, 844),
    ("compact", 320, 700),
]

def check(condition, message):
    if not condition:
        raise AssertionError(message)

def overlaps(a, b, tolerance=2):
    return (a["x"] < b["x"] + b["width"] - tolerance and
            a["x"] + a["width"] > b["x"] + tolerance and
            a["y"] < b["y"] + b["height"] - tolerance and
            a["y"] + a["height"] > b["y"] + tolerance)

def audit_atlas(page, viewport, mode):
    """Run WCAG checks in the actual rendered browser, not just in source markup."""
    result = page.evaluate("""async () => {
        const root = document.querySelector('#ai-lab');
        const result = await window.axe.run(root, {
          runOnly: {type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']},
          rules: {'region': {enabled: false}},
        });
        return result.violations.map(v => ({
          id: v.id,
          impact: v.impact,
          description: v.help,
          nodes: v.nodes.map(n => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        }));
    }""")
    if result:
        (OUTPUT / f"{viewport}-{mode}-accessibility.json").write_text(
            json.dumps(result, indent=2))
    check(not result, f"{viewport}/{mode}: axe WCAG violations: {json.dumps(result)[:4500]}")

def assert_accessibility_names(page, viewport):
    session = page.context.new_cdp_session(page)
    tree = session.send("Accessibility.getFullAXTree")["nodes"]
    session.detach()
    available = {
        node.get("name", {}).get("value", "")
        for node in tree
        if not node.get("ignored") and node.get("name")
    }
    for expected in ("Explore Architecture", "Explore Interface", "Network",
                     "Neural portrait", "System flow", "Previous discipline",
                     "Next discipline"):
        check(expected in available, f"{viewport}: missing accessible name: {expected}")

def assert_in_visual(node, visual, label):
    check(node["x"] >= visual["x"] - 2, f"{label}: clips left")
    check(node["x"] + node["width"] <= visual["x"] + visual["width"] + 2, f"{label}: clips right")
    check(node["y"] >= visual["y"] - 2, f"{label}: clips top")
    check(node["y"] + node["height"] <= visual["y"] + visual["height"] + 2, f"{label}: clips bottom")

with sync_playwright() as playwright:
    # Playwright-managed Chromium is provisioned explicitly by CI.
    # A local system browser can be supplied with ATLAS_CHROMIUM_PATH.
    chromium_path = os.environ.get("ATLAS_CHROMIUM_PATH")
    launch_config = {"executable_path": chromium_path} if chromium_path else {}
    browser = playwright.chromium.launch(headless=True, **launch_config)
    for name, width, height in SIZES:
        page = browser.new_page(viewport={"width": width, "height": height},
            device_scale_factor=1,
            reduced_motion="reduce" if name == "compact" else "no-preference")
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        try:
            response = page.goto(BASE + "/", wait_until="networkidle", timeout=60000)
            check(response is not None and response.status == 200, f"{name}: homepage HTTP error")
            atlas = page.locator("#ai-lab")
            check(atlas.count() == 1, f"{name}: missing Atlas section")
            atlas.scroll_into_view_if_needed()
            # The keyboard-only skip link must be completely hidden until focused.
            skip = page.locator('a[href="#main"]').first
            check("inset(50%" in skip.evaluate("(el) => getComputedStyle(el).clipPath"),
                  f"{name}: skip link overlays the page when it is not focused")
            page.keyboard.press("Tab")
            check(skip.evaluate("(el) => el === document.activeElement"),
                  f"{name}: skip link is not first in keyboard tab order")
            check(skip.evaluate("(el) => getComputedStyle(el).clipPath") == "none",
                  f"{name}: focused skip link remains visually clipped")
            skip.evaluate("(el) => el.blur()")
            # Site search keyboard shortcut: a usable way to reach the many sections.
            page.keyboard.press("Control+k")
            palette = page.get_by_role("dialog", name="Search portfolio")
            palette.wait_for(state="visible")
            search_field = palette.get_by_role("combobox", name="Search sections and projects")
            search_field.fill("Redis booking")
            result = palette.locator('a[href="/work/eventify/"]')
            check(result.count() == 1, f"{name}: keyword search did not find Eventify")
            search_field.fill("unsupported-portfolio-search")
            check(palette.get_by_text("Nothing found").count() == 1, f"{name}: missing search empty state")
            page.keyboard.press("Escape")
            palette.wait_for(state="detached")
            atlas.scroll_into_view_if_needed()
            page.get_by_role("button", name="Neural portrait").wait_for(state="visible")
            page.add_script_tag(path="node_modules/axe-core/axe.min.js")
            audit_atlas(page, name, "network")
            assert_accessibility_names(page, name)
            # Check rendered text bounds, not only button boxes: small screens may
            # have non-overlapping buttons whose labels run into each other.
            tabs = page.get_by_role("group", name="Visualization mode").locator("button")
            for i in range(tabs.count()):
                label = tabs.nth(i).evaluate("""(el) => {
                    const node = document.createRange();
                    node.selectNodeContents(el);
                    const t = node.getBoundingClientRect();
                    const b = el.getBoundingClientRect();
                    return {textLeft:t.left,textRight:t.right,left:b.left,right:b.right};
                }""")
                check(label["textLeft"] >= label["left"] - 1 and
                      label["textRight"] <= label["right"] + 1,
                      f"{name}: mode {i} text spills out of its button")
            atlas.screenshot(path=str(OUTPUT / f"{name}-network.png"), animations="disabled")
            if name == "desktop":
                page.screenshot(path=str(OUTPUT / "desktop-full-page.png"), full_page=True,
                    animations="disabled")

            check(page.get_by_role("link", name="Explore AI Lab").count() == 1,
                  f"{name}: missing hero CTA")
            nodes = page.locator("#ai-lab button[aria-label^='Explore ']")
            check(nodes.count() == 8, f"{name}: expected 8 disciplines")
            network = page.locator("#ai-lab [role='group'][aria-label^='Select an engineering discipline']")
            rect = network.bounding_box()
            check(rect is not None, f"{name}: network geometry missing")
            boxes = []
            for i in range(8):
                box = nodes.nth(i).bounding_box()
                check(box is not None, f"{name}: node {i} has no geometry")
                assert_in_visual(box, rect, f"{name}: node {i}")
                boxes.append(box)
            for i in range(8):
                for j in range(i + 1, 8):
                    check(not overlaps(boxes[i], boxes[j]),
                          f"{name}: nodes {i} and {j} overlap")

            page.get_by_role("button", name="Explore Architecture").focus()
            page.keyboard.press("ArrowRight")
            check(page.get_by_role("heading", name="Interface", exact=True).count() == 1,
                  f"{name}: arrow key did not update inspector")
            check(page.get_by_role("button", name="Explore Interface").evaluate(
                "(node) => node === document.activeElement"),
                  f"{name}: keyboard did not transfer focus")
            page.get_by_role("button", name="Next discipline").click()
            check(page.get_by_role("heading", name="Backend", exact=True).count() == 1,
                  f"{name}: Next button did not update inspector")
            page.get_by_role("button", name="Previous discipline").click()
            check(page.get_by_role("heading", name="Interface", exact=True).count() == 1,
                  f"{name}: Previous button did not update inspector")

            page.get_by_role("button", name="System flow").click()
            check(page.get_by_label("Illustrative five-stage engineering flow").count() == 1,
                  f"{name}: missing system flow")
            check(page.get_by_role("button", name="01 / DEFINE").get_attribute("aria-pressed") == "true",
                  f"{name}: switching from Interface did not select a visible flow stage")
            page.get_by_role("button", name="03 / PERSIST").click()
            check(page.get_by_role("heading", name="Data", exact=True).count() == 1,
                  f"{name}: flow click did not select Data")
            page.get_by_role("button", name="Next discipline").click()
            check(page.get_by_role("heading", name="Async work", exact=True).count() == 1,
                  f"{name}: flow next should follow the five visible stages")
            audit_atlas(page, name, "flow")
            atlas.screenshot(path=str(OUTPUT / f"{name}-flow.png"), animations="disabled")

            page.get_by_role("button", name="Neural portrait").click()
            check(page.get_by_role("img", name="Abstract cyan and gold digital head made from contour lines; decorative visualization only").count() == 1,
                  f"{name}: missing digital portrait")
            audit_atlas(page, name, "portrait")
            atlas.screenshot(path=str(OUTPUT / f"{name}-portrait.png"), animations="disabled")
            page.get_by_role("button", name="Network").click()
            check(nodes.count() == 8, f"{name}: failed to return to network")

            # V9: exercise actual project filtering and decision disclosures in the browser.
            explorer = page.locator("#explorer")
            check(explorer.locator("article").count() == 4,
                  f"{name}: explorer should initially show four projects")
            explorer.get_by_role("button", name="Backend", exact=True).click()
            check(explorer.locator("article").count() == 3,
                  f"{name}: backend focus should show three projects")
            search = explorer.get_by_role("searchbox", name="Search projects")
            search.fill("BullMQ")
            check(explorer.locator("article").count() == 1 and
                  explorer.get_by_role("heading", name="Eventify").count() == 1,
                  f"{name}: combined category + search filter failed")
            search.fill("unmatchable-example-query")
            check(explorer.get_by_text("No matching projects").count() == 1,
                  f"{name}: no-results feedback missing")
            explorer.get_by_role("button", name="Clear filters").click()
            check(explorer.locator("article").count() == 4,
                  f"{name}: clearing filters did not restore four projects")
            decision_notes = page.locator("#decisions article")
            check(decision_notes.count() == 4,
                  f"{name}: decision shelf should contain four documented choices")
            decision_notes.first.locator("summary").click()
            check(decision_notes.first.locator("details").get_attribute("open") is not None,
                  f"{name}: decision disclosure did not open")
            check(page.locator("#start-here article").count() == 3,
                  f"{name}: missing guided visitor paths")
            if name in ("desktop", "mobile"):
                explorer.screenshot(path=str(OUTPUT / f"{name}-project-explorer.png"), animations="disabled")

            # V10: solution routes, evidence disclosures and client-only brief studio.
            solutions = page.locator("#solutions article")
            check(solutions.count() == 4,
                  f"{name}: solution routes should match the four real projects")
            for slug in ("eventify", "bookhaven", "fitflow", "venues-api"):
                check(page.locator(f'#solutions a[href="/work/{slug}/"]').count() == 1,
                      f"{name}: missing real case-study route for {slug}")
            quality_items = page.locator("#quality-lab details")
            check(quality_items.count() == 4,
                  f"{name}: quality lab must contain four evidence dossiers")
            quality_items.first.locator("summary").click()
            check(quality_items.first.get_attribute("open") is not None,
                  f"{name}: quality evidence disclosure did not open")
            check(quality_items.first.locator("li").count() == 4,
                  f"{name}: project evidence should be sourced from case-study records")
            studio = page.locator("#brief-studio")
            check(studio.locator("#brief-preview").count() == 1,
                  f"{name}: missing live brief preview")
            studio.locator("#brief-track").select_option("platform")
            studio.locator("#brief-stage").select_option("improve")
            studio.locator("#brief-priority").select_option("reliability")
            studio.locator("#brief-details").fill("API with retries")
            check("Platform or API" in studio.locator("#brief-preview").input_value() and
                  "Reliability and resilience" in studio.locator("#brief-preview").input_value() and
                  "API with retries" in studio.locator("#brief-preview").input_value(),
                  f"{name}: brief builder is not updating correctly")
            studio.get_by_role("button", name="Copy project brief").click()
            status = studio.get_by_role("status").inner_text()
            check("Copied." in status or "Text selected." in status,
                  f"{name}: copy control provided no user feedback")
            if name in ("desktop", "mobile"):
                solutions.first.screenshot(path=str(OUTPUT / f"{name}-solution-route.png"), animations="disabled")
                studio.screenshot(path=str(OUTPUT / f"{name}-brief-studio.png"), animations="disabled")
            if name == "desktop":
                more = page.locator('nav[aria-label="Primary navigation"] details')
                check(more.count() == 1, "desktop: missing navigation overflow disclosure")
                more.locator("summary").click()
                check(more.get_attribute("open") is not None,
                      "desktop: More navigation disclosure did not open")
                more.locator("summary").press("Escape")
                check(more.get_attribute("open") is None,
                      "desktop: Escape did not dismiss More navigation")
                more.locator("summary").click()
                more.locator('a[href="#compare"]').click()
                check(more.get_attribute("open") is None,
                      "desktop: selecting a link did not dismiss More navigation")
                more.locator("summary").click()
                page.mouse.click(3, height - 3)
                check(more.get_attribute("open") is None,
                      "desktop: clicking outside did not dismiss More navigation")

            # V11: compare real cases, select a technology, and test the isolated UI lab.
            comparison = page.locator("#compare")
            check(comparison.locator("article").count() == 2,
                  f"{name}: comparison desk should show two case studies")
            comparison.locator("#compare-left").select_option("fitflow")
            comparison.locator("#compare-right").select_option("venues-api")
            check(comparison.get_by_role("heading", name="FitFlow").count() == 1 and
                  comparison.get_by_role("heading", name="Venues API").count() == 1,
                  f"{name}: comparison selectors did not update the case cards")
            # Choosing the same case in both selectors must yield two different projects.
            comparison.locator("#compare-right").select_option("fitflow")
            selected = [comparison.locator("#compare-left").input_value(),
                        comparison.locator("#compare-right").input_value()]
            check(selected[0] != selected[1],
                  f"{name}: case comparison shows the same project twice")
            lens = page.locator("#stack-lens")
            lens.get_by_role("button", name="Redis").click()
            check(lens.get_by_role("button", name="Redis").get_attribute("aria-pressed") == "true",
                  f"{name}: stack lens selection not reflected in control state")
            check(lens.locator('a[href="/work/eventify/"]').count() == 1,
                  f"{name}: stack lens missing project connection")
            lab = page.locator("#interface-lab")
            lab.get_by_role("button", name="☾ Dark").click()
            lab.get_by_role("button", name="Compact", exact=True).click()
            check(lab.get_by_role("button", name="☾ Dark").get_attribute("aria-pressed") == "true" and
                  lab.get_by_role("button", name="Compact", exact=True).get_attribute("aria-pressed") == "true",
                  f"{name}: interface lab switches did not respond")
            lab.get_by_role("button", name="Show component notes").click()
            check(lab.get_by_text("This is a self-contained UI study.", exact=False).count() == 1,
                  f"{name}: interface disclosure failed to expand")
            if name in ("desktop", "mobile"):
                comparison.screenshot(path=str(OUTPUT / f"{name}-comparison-desk.png"), animations="disabled")
                lens.screenshot(path=str(OUTPUT / f"{name}-stack-lens.png"), animations="disabled")
                lab.screenshot(path=str(OUTPUT / f"{name}-interface-lab.png"), animations="disabled")

            overflow = page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
            check(overflow <= 2, f"{name}: page overflow by {overflow}px")
            if name == "compact":
                duration = page.locator("#ai-lab [aria-hidden='true']").first.evaluate(
                    "(node) => getComputedStyle(node).animationDuration")
                check(duration in ("0s", "0.00s"), f"reduced motion not applied: {duration}")
            check(not errors, f"{name}: browser errors: {errors}")

            if name == "desktop":
                detail = page.goto(BASE + "/work/eventify/", wait_until="networkidle", timeout=30000)
                check(detail is not None and detail.status == 200, "case study route unavailable")
                case_nav = page.get_by_role("navigation", name="Browse case studies")
                check(case_nav.locator('a[href="/work/bookhaven/"]').count() == 1,
                      "Eventify's next case-study link should lead to BookHaven")
                check(case_nav.locator('a[href="/work/venues-api/"]').count() == 1,
                      "Eventify's previous case-study link should lead to Venues API")
                check(not errors, f"{name}: browser errors in case study: {errors}")

            REPORT.append({"viewport": name, "width": width, "height": height,
                "nodes": 8, "overlap": 0, "overflow": overflow,
                "modes": "pass", "keyboard": "pass", "console": "clean"})
            print(f"PASS {name}: layout, interactions, keyboard, 3 modes, no console errors", flush=True)
        except Exception as exc:
            ISSUES.append({"viewport": name, "error": str(exc)})
            print(f"FAIL {name}: {exc}", file=sys.stderr, flush=True)
            try:
                page.screenshot(path=str(OUTPUT / f"{name}-failure.png"),
                    full_page=True, timeout=10000)
            except Exception:
                pass
        finally:
            page.close()
    browser.close()
(OUTPUT / "report.json").write_text(json.dumps({"pass": REPORT, "issues": ISSUES}, indent=2))
if ISSUES:
    sys.exit(1)
print("All Atlas browser QA checks passed.", flush=True)
