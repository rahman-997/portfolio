# Gallery hydration diagnostic trace — 2026-11-19

The release acceptance suite exhibited two kinds of outcomes on real GitHub Actions:
- [run 44520433889](https://github.com/rahman-997/portfolio/actions/runs/44520433889): `tr-dark-320` PASS, all 24 release cases pass, but a **test-only** readiness probe incorrectly required a visible empty gallery in the clipboard-denied test.
- [run 44521462432](https://github.com/rahman-997/portfolio/actions/runs/44521462432): after fixing that readiness probe, `ar-dark-320` and `tr-dark-320` intermittently returned 22 cards instead of one. Failure screenshots show an empty search field. This indicates a **real nondeterministic input/state synchronization problem**; the prior 24/24 green run was not sufficient proof of stability.

This candidate adds **diagnostic-only instrumentation** before the release script fills `HajarCare`: capture native input events, location hash/query, gallery readiness, number of cards and input DOM-node replacement. Every 320px case writes `*-gallery-trace.json` even if the assertion fails, and the hard `to_have_count(1)` remains enforced. No retries, broadening of timeouts, production deployment, or application functionality changes.

These traces must be inspected from the next `Atlas Browser QA` artifact to determine the underlying defect, then the source behavior must be fixed and the same strict browser suite rerun. This diagnostic Commit is **not release-ready**.
