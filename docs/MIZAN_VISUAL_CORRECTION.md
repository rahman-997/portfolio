# Mizan capture correction

The previous portfolio image contained a blank chart. The replacement is the actual Mizan dashboard from public source commit 8e33fededbdfc4144b22b6c2608cd066378e44ed, in a fresh, isolated browser context at 1440 x 960. No accounts, imports or real financial data were used.

- Vinext production build passed. Cloudflare Workers/Miniflare preview could not start in the CI environment; independent Next.js static export succeeded using the project's existing configuration.
- Screenshot script waited for two valid nonempty Recharts paths, four metric cards and bundled sample transactions. A second reviewed screenshot shows six budget tiles.
- Capture and visual evidence: https://github.com/rahman-997/portfolio/actions/runs/45493015890
- Exact image transfer: https://github.com/rahman-997/portfolio/actions/runs/45500102048
- Approved dashboard PNG SHA-256: e812540bd66598d8019b7b54f4f2a932f97fd0d0582d2366f843bccaa5bd3783
- Size: the reviewed PNG (131,353 bytes) exceeded the 100,000 byte asset ceiling. The site now serves a lossless WebP of it (`public/projects/mizan-live-dashboard.webp`, 69,508 bytes, SHA-256 9c9ba27d263eb4508af19070d0b4cbebc28559832c5bde7808d3fb0d0fe3bcdc). Decoded RGB pixels were compared with the reviewed PNG and are identical, so no new visual review is needed. The reviewed PNG digest above stays the provenance record; verify-v5 pins the WebP digest in source and export, and the ceiling is unchanged.

Known source UI issue: the English dashboard eyebrow is statically labelled SEPTEMBER PLAN while the sample cash-flow series is relative to the capture month. This is a Mizan copy issue, not a broken chart. It remains outside this portfolio-only change; no modification to Mizan's own source or deployment.

The temporary screenshot-transfer workflow is removed. The capture script remains review-only. No paid service, production change or merge.
