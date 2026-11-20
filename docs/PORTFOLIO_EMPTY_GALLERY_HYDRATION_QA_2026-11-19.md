# Empty gallery hydration - browser regression QA (2026-11-19)

## Real failure evidence
[Public Atlas Browser QA run 44520433889](https://github.com/rahman-997/portfolio/actions/runs/44520433889), job `135547331649` at updated Next.js 16.4.6 on review commit `cc990d8ef843142f8554830b3b2f24b7c11771ed`:
- Atlas 4/4 PASS; multi-locale V5 browser QA PASS.
- **24/24 release browser cases PASS**, including the historical blocker `tr-dark-320`.
- Evolution scenarios EN/AR/TR mobile and desktop **6/6 PASS**.
- `clipboard-denied-and-query-validation` failed because the URL query selects no projects (`q=xxxxxxxx...`); `#project-grid[data-gallery-ready="true"]` was present but hidden, and Playwright's default `.wait_for()` requires visibility rather than presence in the DOM. Failure log: locator resolved 35 times to hidden div with `data-gallery-ready="true"`.

## Fix
- Use `wait_for(state="attached", timeout=15000)` on all six existing gallery hydration probes across `v4-browser-qa.py`, `release-browser-qa.py`, and `evolution-browser-qa.py`.
- This preserves the critical invariant that React signaled readiness (`data-gallery-ready="true"`) while correctly allowing a hidden empty gallery.
- Existing strict `to_have_count(1)` and empty result validation remain intact. No application source/behavior, DB, customer data, credentials or production deployments changed.
- Added a native Node test that parses all three browser suites and forbids another visibility-only readiness check.

## Retest requirements
The browser workflow must rerun on the new **exact branch SHA** and pass all suites, including Turkish 320px and clipboard denial. CodeQL/Semgrep and the complete public-repository CI must pass on the same SHA. Release stays Draft / NO-GO until verified.
