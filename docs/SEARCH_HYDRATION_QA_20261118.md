# Portfolio search hydration regression — 2026-11-18

Base: Draft PR #47, SHA `db70cec767c16222794f4f4220e5aea9c2b8bb4c`.

## Reproduction evidence
GitHub Atlas Browser QA run 43933499530 failed only `tr-dark-320`: search `HajarCare` expected 1 article but got 22. Screenshot `release/tr-dark-320-failure.png` from artifact 14258473485 shows the focused input back at its placeholder instead of the search text.

Downloaded the **same SHA** static export (CI artifact 14259207641) and inspected its SSR markup for EN, AR and TR. The search input was enabled before React hydration in all three outputs; early typing could be lost when React initializes controlled state. This is a plausible cause, not independently proven as the sole cause of the flaky browser failure.

## Change
Disable the `#project-search` input while its `ready` state is false. The existing `useEffect` reads URL search parameters and enables the field after initial client state is established.
Add `scripts/verify-search-hydration.py` to assert the SSR input is disabled in all locales; invoke it in `scripts/release-browser-qa.py`. The browser QA also verifies the text survives input, not only that the result count changes.

## QA
- RED against original static artifact: `python3 scripts/verify-search-hydration.py ../portfolio-static/out` failed with `en: search enabled before hydration` (expected baseline failure).
- PASS: Python script syntax compile, and uploaded script Git blob matches local tested bytes.
- NOT RUN GREEN: Next build and new SSR verification on new commit (full checkout + npm install not available in test environment).
- NOT RUN: Chromium regression; local browser navigation returned ERR_BLOCKED_BY_ADMINISTRATOR in the sandbox.

Reproduce in an authorized clean checkout:
```bash
npm ci
npm run lint
npm run typecheck
npm run build
python3 scripts/verify-search-hydration.py out
python3 -m http.server 4173 --bind 127.0.0.1 --directory out
# In another shell:
python3 scripts/release-browser-qa.py
```

Do not merge or publish this fix until the full browser suite passes on the exact branch head.
