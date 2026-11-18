# Additional source-validation bypass tests — November 19, 2026

## Reproduced before patch
Using the existing GitHub `scripts/project-link-security.mjs` blob `950cd802c0261f1e8c5023b20f20490dd2f26d7e` locally, the verifier returned true for fake `data-upstream-credit` inside a `title` attribute, a fake trusted `href` inside `title` despite an evil real href, and a trusted link inside an HTML comment.

The regression test was added first. Native `node --test` gave 7 PASS, 1 FAIL before the fix.

## Fix
Use a small, dependency-free scanner that skips HTML comments and script/style/textarea/title raw text and respects quotes when parsing anchor attributes. A real anchor must contain unique exact `data-upstream-credit="true"` and a unique literal canonical GitHub HTTPS href. Reject ambiguous duplicate attributes or untrusted destinations. Existing static export route and security gates remain unchanged.

## Verification on local copies
- Native `node --test scripts/tests/atlas-production-contract.test.mjs`: **8/8 PASS**.
- Together with the focused independent security tests: **12/12 PASS**.
- Existing synthetic 22 × 3 = **66 HTML project pages**: exported verifier **PASS**.
- Four malicious fixture variants (attribute-name spoof, href spoof, comment-only credit, HTML script-only credit) each made the exact export verifier fail with a nonzero exit.
- Helper Git blob after fix is expected to match local SHA `1be6abb404f033d92d09fad06e482f750589a7ac`; official Node suite after fix should match `812165c5ae09d39169a1db700aa16b2bc2c90975`.

No full Next.js build, authenticated E2E or CodeQL rerun. Do not claim the high-severity alert has been closed. npm dependency audit and Turkish mobile browser regression remain release blockers. **Draft / NO-GO.**
