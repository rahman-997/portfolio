# Portfolio private-source link validation (2026-11-19)

Base: Draft PR #51 branch `security/portfolio-exact-upstream-url-20261119` at `7fd35795547b5f68888a5957685fdb10d490756a`.

## Finding
The existing static page verification checked raw text matching `https://github.com/rahman-997/<repo>` only. It could miss a clickable href to a private repository if the URL was protocol-relative or its owner/path used URL percent-encoding or HTML numeric entities.

## Changes
- Retained the original raw-text allowlist check to prevent regressions.
- Added a second check to the real parsed `<a href>` targets on every localized project page. Only the seven allowlisted public repositories may appear under the portfolio owner's GitHub account, and only through literal canonical HTTPS GitHub URLs.
- Checked userinfo, protocol-relative, encoded, case-variant, and lookalike-domain bypasses. No third-party runtime dependencies added.

## Local QA before commit
- Node v22.16 native `node --test scripts/tests/atlas-production-contract.test.mjs scripts/security.test.mjs`: **13/13 PASS**, including one new multi-case source-link regression.
- Real `node scripts/verify-project-pages.mjs` on 66 locally generated fictional EN/AR/TR pages: **PASS**.
- Modified one localized page at a time to test five malicious variants (protocol-relative private, URL-percent encoded private, HTML-numeric-entity private, mixed-case owner private, lookalike domain): **all five rejected**, while an allowed public link passed.
- Original upstream marker security fixture: **4/4 adversarial cases rejected**.
- End-to-end Next.js build/export, npm audit, CodeQL rerun and Playwright on the full app have **not** run. Draft / NO-GO.

## Safety
No main merge, no production change, no paid CI or services, no deletion or customer data access.

## Full gallery plus detail verification (executed)
- Extended the URL allowlist to all 3 localized **homepage galleries** as well as all 66 project-detail pages.
- Node v22.16 native test suite: **13/13 PASS** on the final exact GitHub helper and tests.
- Synthetic 66-page EN/AR/TR static export: **PASS** with unchanged `node scripts/verify-project-pages.mjs` entry point.
- Negative homepage cases: injected private GitHub URL using an HTML numeric entity and a protocol-relative URL into Turkish gallery; **both correctly rejected**. Valid public repository URL remained accepted.
- Negative project-detail cases: protocol-relative, percent-encoded, numeric-entity, mixed-case owner private URLs, and an evil lookalike GitHub hostname: **all five rejected**. Valid public link accepted.
- Original fork attribution regression fixture still rejects all four prior spoof scenarios.
- Verified GitHub blob SHA equals actual Node-tested local byte contents:
  - `scripts/project-link-security.mjs` — `2bdd499264d8ef8a5074d75b47d59e7c1f3687d6`
  - `scripts/verify-project-pages.mjs` — `a345fc54a860ea5c6d1dc8c05788f17955e5ea47`
  - `scripts/tests/atlas-production-contract.test.mjs` — `68432a3cdf323048a3b78466cf94f0e715e1eece`

Full Next.js build, exported production HTML, CodeQL scanner and 320px Playwright still **not executed on the new Commit**. The synthetic fixture is not proof of a production release. Keep Draft / NO-GO.
