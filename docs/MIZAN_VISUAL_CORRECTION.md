# Mizan capture correction

The previous portfolio image contained a blank chart. The replacement is the actual Mizan dashboard from public source commit 8e33fededbdfc4144b22b6c2608cd066378e44ed, in a fresh, isolated browser context at 1440 x 960. No accounts, imports or real financial data were used.

- Vinext production build passed. Cloudflare Workers/Miniflare preview could not start in the CI environment; independent Next.js static export succeeded using the project's existing configuration.
- Screenshot script waited for two valid nonempty Recharts paths, four metric cards and bundled sample transactions. A second reviewed screenshot shows six budget tiles.
- Capture and visual evidence: https://github.com/rahman-997/portfolio/actions/runs/45493015890
- Exact image transfer: https://github.com/rahman-997/portfolio/actions/runs/45500102048
- Approved dashboard PNG SHA-256: e812540bd66598d8019b7b54f4f2a932f97fd0d0582d2366f843bccaa5bd3783
- The original PNG is retained without manipulation. Its digest must match the reviewed bytes in source and export.

Known source UI issue: the English dashboard eyebrow is statically labelled SEPTEMBER PLAN while the sample cash-flow series is relative to the capture month. This is a Mizan copy issue, not a broken chart. It remains outside this portfolio-only change; no modification to Mizan's own source or deployment.

The temporary screenshot-transfer workflow is removed. The capture script remains review-only. No paid service, production change or merge.
