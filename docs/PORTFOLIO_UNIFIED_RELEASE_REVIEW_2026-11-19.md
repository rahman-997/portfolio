# Portfolio Unified Release Candidate | 2026-11-19

## Origin and scope
- Base: security Draft PR #51 at `5f230486d07521f13daa629a40b05a86b50a029d`. Its base is Draft PR #47 (`review/all-portfolio-projects-20261116`).
- Cherry-pick equivalent via Git tree: all **nine** changes from gallery Draft PR #50 at `d7a721e686faa5aaf045e18a111ff532673b2935`, with disjoint file sets confirmed against #51.
- Reconcile Draft PR #48's case-study metric by deriving `PUBLIC_CASE_STUDY_COUNT` from published public projects; preserve the **22-project complete gallery count**.
- Security remains enabled: exact fork provenance URL, private source-link detector on project details and homepage, no weakening of existing CI, audit or Playwright assertions.

## Verification gates before any release
1. Commit includes both security patches and hydration fix; Git blob SHA checks and local Node tests plus static synthetic verification can be run independently and must be attached.
2. `npm ci` (pinned Node/npm toolchain), `npm run lint`, `npm run typecheck`, `node --test scripts/tests/*.test.mjs`, `npm run build`, `npm run verify:export`, `npm run audit`. No update to package.json without a verified lockfile.
3. CodeQL + Semgrep must scan the **same head SHA**, not the parent or branch-creation run. The CodeQL finding on PR #47 is source-patched, not proven cleared until scanned.
4. `scripts/v4-browser-qa.py`, `scripts/release-browser-qa.py`, `scripts/evolution-browser-qa.py` in browsers at AR/TR/EN 320/768/1440 light/dark. Preserve strict one-result Turkish search assertion.
5. Real links/screenshots and PDF/SEO, WCAG 2.2 AA, keyboard navigation, file/source privacy, screen readers, and the exact rendered deployment candidate.
6. No production deployment before separate explicit user approval. The existing Render site auto-deploys `main`.

## External advisory correction
GitHub **withdrew** `GHSA-fc5q-39xc-vjpf` (picomatch) on 18 November 2026: https://github.com/advisories/GHSA-fc5q-39xc-vjpf .
This does NOT automatically clear prior `npm audit` results; rerun audit online and investigate all still-active advisories. The pinned Next.js `16.4.3` remains below security release `16.4.5`, so resolve via actual npm lockfile regeneration when registry/Windows connection is available.

## Current environment limits
Windows Desktop Commander devices OFFLINE; this container cannot resolve github.com or registry.npmjs.org. No complete checkout, npm install, full build or Playwright against actual bundle was possible in this session. Tests of exact JS modules, isolated state harness and synthetic pages do not constitute a full product release test.

**NO-GO. Draft only; $0 additional costs, no main changes, no production deployment.**
