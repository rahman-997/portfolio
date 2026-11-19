# CodeQL high finding: URL substring sanitization (Draft)
- Source: PR #47, CodeQL review on `scripts/verify-project-pages.mjs` line 29.
- Replaced two independent HTML substring checks with validation of an actual `a[data-upstream-credit="true"]` href.
- Requires URL() protocol HTTPS, exact hostname github.com, exact /Alishahryar1/free-claude-code path, no userinfo, query or fragment, exactly one attribution anchor.
- Unit regression in `scripts/tests/atlas-production-contract.test.mjs`, already covered by the existing CI Node test command.
- Isolated Node helper security cases pass (25 assertions, including host and userinfo spoof, data-href spoof, fake marker and duplicate credits); rerun full CodeQL, npm audit, browser QA, static export on exact reviewed commit.
- Existing npm dependency advisories and Turkish browser E2E remain blockers. No merge, no main edits, no production deploy or paid services. **NO-GO.**

## Actual local Node execution against byte-verified GitHub source (2026-11-19)
- Native `node --test` on a focused companion suite of the GitHub helper: **4/4 tests passed**. Test scenarios cover exact GitHub link, malicious/relative hosts, URL userinfo and path/query/fragment spoofing, duplicate/missing/fake markup.
- Native Node `--check` **PASS**.
- Exact helper and actual export-verifier source were reconstructed in an isolated scratch directory and matched Git blob SHAs:
  - `scripts/project-link-security.mjs`: `950cd802c0261f1e8c5023b20f20490dd2f26d7e`
  - `scripts/verify-project-pages.mjs`: `6cfb02900bc37d2e59a12b38b9c8d36d39b00ef7`
- Generated **66 fictional localized HTML pages** (22 project pages × 3 locales) with no customer data. Executed the actual export verifier on this fixture: **PASS**.
- Replaced one Arabic fork upstream URL with `https://evil.example/?next=https://github.com/Alishahryar1/free-claude-code`, reran the actual verifier: **correctly rejected**, with a nonzero exit and the expected fork provenance error.
- The fixture is synthetic. This does not replace a full Next.js build/export, a rerun of CodeQL, npm audit or live AR/TR/EN Playwright QA. Keep **NO-GO**.

## Exact repository test suite run under native Node.js
- Reconstructed the real repo's `scripts/atlas-production-contract.mjs` and `scripts/tests/atlas-production-contract.test.mjs` directly from GitHub content, and verified that local Git blob SHAs exactly match the connected repository:
  - Atlas implementation: `bd097361597261f59dc7f01c8dc8a5ce2705354e`
  - Committed Node suite: `2290ec3e33f4f58ee0eca5edd6e1e2f276d30a5e`
  - Security helper: `950cd802c0261f1e8c5023b20f20490dd2f26d7e`
- Executed **real `node --test scripts/tests/atlas-production-contract.test.mjs`** with those byte-identical source files and no mocks: **7/7 PASS** (six pre-existing Atlas contract checks and one new adversarial upstream URL check).
- Scope remains the exact linked Node test module. It is not a full dependency-backed Next.js build, scanner rerun, or app E2E.
