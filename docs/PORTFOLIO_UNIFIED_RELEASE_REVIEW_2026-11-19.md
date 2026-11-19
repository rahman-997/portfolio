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

## Audit fail-closed hardening (19 Nov 2026)
- The successful 18 Nov [CI run #44405606755](https://github.com/rahman-997/portfolio/actions/runs/44405606755), **on the old PR #47 base SHA**, logged **1 moderate Next.js advisory** but exited 0 because `npm audit --audit-level=high` only rejects high/critical. This is not a clean vulnerability-free bill of health.
- Changed the audit threshold on the unified review branch to `moderate` and removed the CI shell wrapper that treated some npm audit service outages as success. The existing audit retry script remains and **fails after bounded retry exhaustion**.
- New `scripts/tests/qa-security-gates.test.mjs` requires these properties, preventing accidental weakening in future review changes.
- Consequently the unified branch is intentionally **NO-GO** until the Next.js advisory is fixed with a consistent regenerated lockfile and the exact commit passes audit and all other gates.


## Exact GitHub Actions artifacts used for evidence
- **Old baseline only:** downloaded static release artifact #14472984552 from [successful CI run 44405606755](https://github.com/rahman-997/portfolio/actions/runs/44405606755), SHA \`db70cec767c16222794f4f4220e5aea9c2b8bb4c\`. It contains 517 entries, including full static output and 66 localized project detail pages.
- Ran the **security verifier code byte-identical to Draft PR #51** against this real static output: PASS for 66 pages, three locales, sitemap, RTL, project-source boundaries, fork provenance.
- Injected five malicious GitHub source-href cases into copies of the **real exported** pages (private canonical URL, protocol-relative private URL, numeric-entity-encoded private URL, percent-encoded private URL, and spoofed upstream credit) and re-ran the verifier: all five were rejected; original files restored and baseline PASS again.
- Read historical [Atlas Browser QA run 43933499530](https://github.com/rahman-997/portfolio/actions/runs/43933499530) release report and screenshot: 23 scenarios PASS; only \`tr-dark-320\` FAIL, expected one search result but found 22.
- Tried to run an actual local Playwright Chromium probe against the extracted static baseline, but this container blocks navigation to \`localhost\` **and** \`file://\` with \`ERR_BLOCKED_BY_ADMINISTRATOR\`. This is an environment policy blocker, not evidence that Portfolio succeeded or failed new mobile E2E.
- Read latest **old-baseline** audit log from CI run 44405606755: one **moderate** Next.js advisory remained. That CI marked audit PASS because the script originally used \`--audit-level=high\`. Our new integrated branch hardens the threshold to \`moderate\` and refuses to waive npm audit service failures. No newer audit on this branch has been run.

## Zero-cost reproduction on the user's isolated Windows checkout
The checked source contains no mandatory paid APIs; run these commands from a new **non-main** QA branch:
\`\`\`powershell
npm ci --no-audit --no-fund
node --test scripts/tests/*.test.mjs
npm run lint
npm run typecheck
npm run build
npm run verify:export
npm run audit
python -m http.server 4173 --bind 127.0.0.1 --directory out
\`\`\`
Run the three existing Playwright scripts in a separate terminal against \`ATLAS_BASE_URL=http://127.0.0.1:4173\` and require every case to pass. Separate hosted CodeQL/Semgrep checks must validate the **same** reviewed commit. Recreate the lockfile from supported secure Next.js package versions before release; do not hand-edit lock integrity metadata.

None of this happened on production; **NO-GO** until exact-commit validation and separate publication approval.
