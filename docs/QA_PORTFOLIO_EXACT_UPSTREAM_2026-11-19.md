# CodeQL high finding: URL substring sanitization (Draft)
- Source: PR #47, CodeQL review on `scripts/verify-project-pages.mjs` line 29.
- Replaced two independent HTML substring checks with validation of an actual `a[data-upstream-credit="true"]` href.
- Requires URL() protocol HTTPS, exact hostname github.com, exact /Alishahryar1/free-claude-code path, no userinfo, query or fragment, exactly one attribution anchor.
- Unit regression in `scripts/tests/atlas-production-contract.test.mjs`, already covered by the existing CI Node test command.
- Isolated Node helper security cases pass (25 assertions, including host and userinfo spoof, data-href spoof, fake marker and duplicate credits); rerun full CodeQL, npm audit, browser QA, static export on exact reviewed commit.
- Existing npm dependency advisories and Turkish browser E2E remain blockers. No merge, no main edits, no production deploy or paid services. **NO-GO.**
