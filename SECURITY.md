# Security Policy

## Supported version

The current `main` branch is the supported version of the portfolio. Older snapshots and historical deploys may not receive security fixes.

## Reporting a vulnerability

Please do **not** publish exploit details, credentials, tokens, personal data, or sensitive reproduction material in a public GitHub issue.

If you discover a security issue:

1. Contact the repository owner through the GitHub profile and request a private channel for the report.
2. Include the affected route, asset, configuration, or dependency; explain the impact and provide minimal reproduction steps.
3. Redact real credentials, personal data, and third-party secrets.
4. Allow time for triage and remediation before public disclosure.

A public issue is appropriate only for non-sensitive hardening suggestions that do not expose an exploitable vulnerability.

## Scope

Useful reports include script injection, unsafe external-link behavior, metadata or structured-data injection, sensitive information accidentally included in static output, security-header regressions, dependency vulnerabilities with practical impact, and deployment configuration that creates a concrete security risk.

The portfolio is a static export and intentionally has no authentication, account, payment, or private-data backend. Findings that assume those nonexistent server-side surfaces are outside the current application scope.

## Security baseline

The portfolio runs linting, TypeScript checks, production builds, static-export verification, identity/link checks, résumé validation, and dependency auditing in CI. Security fixes should include a regression check whenever practical.
## Production response policy

The primary Render static site and Netlify fallback are expected to enforce equivalent baseline response protections: `nosniff`, clickjacking denial, strict referrer behavior, restricted browser permissions, COOP/CORP isolation, HSTS, and bounded cache policies. The repository keeps these rules in `render.yaml` and `netlify.toml`, and production smoke checks verify the live Render response after deployment.
