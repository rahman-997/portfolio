# Local Portfolio release gate (non-production)

Execute from a **clean, isolated review branch** on a machine with Node 22, pinned npm 11 and Python Playwright:

```powershell
npm ci --no-audit --no-fund
npm run qa:local
npm run qa:full
```

`qa:local` runs the repository's Node suites without doing a deployment. Its status remains INCOMPLETE by design.
`qa:full` refuses `main`, `master`, detached HEAD, and dirty checkouts, then requires all Node, npm CI, lint, TypeScript, build, static-export, moderate+ audit and three Playwright suites. A failed, missing or blocked step **never** yields a local PASS. Reports and individual logs are written only under `.qa/` (local-only; do not commit evidence with personal information).

`release_status` remains **NO-GO** in the generated JSON even if local tests pass, because successful hosted CodeQL and Semgrep scans on the exact final SHA plus explicit publication approval are mandatory and cannot be verified by this local command.

The runner does not merge, publish, contact customers, provision paid services, or modify production. `npm ci` changes only local installed dependencies. Zero extra cost. No direct dependency updates in this PR.

The current container cannot resolve npm registry and Playwright browsers are blocked by the environment, so full mode is **not certified** on this branch.
