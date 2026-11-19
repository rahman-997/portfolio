# Portfolio gallery URL hydration hardening (Draft / review only)

Source branch: `review/all-portfolio-projects-20261116` at `db70cec767c16222794f4f4220e5aea9c2b8bb4c`.
New branch: `fix/portfolio-project-query-hydration-20261119`. Avoid main merge or deployment.

## Scope
- Harden initial client-side URL restoration to avoid a delayed animation-frame callback overwriting filter/search input that the visitor has already edited.
- Keep browser history `popstate` authoritative for back/forward navigation, while cancelling obsolete scheduled callbacks.
- Preserve bounded query input (120 characters), allowlisted project categories, AR/TR/EN content and public/private source-link rules.
- Extend existing CI unit tests to include the new Node built-in contract tests; do not skip the existing npm audit, CodeQL or full browser acceptance gates.

## Verification performed
- Local Node.js `node --test scripts/tests/project-explorer-query-hydration.test.mjs` using the same new helper and test content: **4/4 PASS**.
- Existing `v4-browser-qa.py` reported failure for `tr-dark-320` searching LUMERA on PR #47; this change addresses one possible initial hydration race. **Root cause and browser fix are NOT confirmed without reproducing full SSR/hydration.**

## Release blockers remain
- Current PR #47 CI found 14 high and one moderate npm audit warnings; CodeQL also reports an open high-severity alert. See issue #49.
- Two Next.js advisories specify patched 16.4.5, but npm registry/lockfile regeneration is unavailable in the working container; DO NOT make a package.json-only update, force install, or weaken audit.
- Full CI, Playwright AR/TR/EN, security audit and production release are **NO-GO** until actually executed on a complete isolated checkout.

## Browser readiness contract (2026-11-19)
- SSR renders `data-gallery-ready="false"` until the gallery's React state effect has run and committed. This is a QA synchronization signal, not a loading overlay or new network request.
- Existing Playwright scripts wait for `#project-grid[data-gallery-ready="true"]` before interacting. The strict count expectation (1 matching article) stays unchanged.
- Timeout on readiness distinguishes a hydration failure from a filter regression. Full Playwright rerun is still required.
