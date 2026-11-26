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

## Update 2026-11-26: refreshed capture (local build, not the live Netlify demo)

The "SEPTEMBER PLAN" label was fixed in mizan-finance PR 18 (now "MONTHLY OVERVIEW"). The cover image was replaced with a capture of current mizan-finance main (commit ed4e621), built locally as a Next.js static export (output: export) and served on 127.0.0.1, 1440 x 960, bundled sample data, no accounts. The chart curves were verified rendered in the pixels. This is a local build capture, not the live Netlify demo, which is an older build. PNG SHA-256 22fe4c799963879b135d52cc4e504e1122ca53f3e2df07cd2d38b74801cf7dc1; lossless WebP 76,078 bytes, SHA-256 e204c18c1fe2a93db6b907d1a2bd7819466c08b5b4095cce2fcfbd6d9b225052, decoded pixels identical to the PNG. verify-v5 pins the new digest.
