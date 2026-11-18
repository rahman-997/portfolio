/* Static-export security checks: verify the actual anchor destination, not substrings. */
const UPSTREAM_PATH = "/Alishahryar1/free-claude-code";

export function isCanonicalUpstreamHref(href) {
  if (typeof href !== "string") return false;
  try {
    const url = new URL(href);
    return url.protocol === "https:"
      && url.hostname === "github.com"
      && url.username === "" && url.password === "" && url.port === ""
      && url.pathname === UPSTREAM_PATH
      && url.search === "" && url.hash === "";
  } catch {
    return false;
  }
}

export function hasVerifiedUpstreamCredit(html) {
  if (typeof html !== "string") return false;
  let verified = 0;
  // Validate a real anchor whose exact href is the expected GitHub upstream.
  // An arbitrary string elsewhere on the page cannot satisfy the check.
  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const tag = match[0];
    if (!/\sdata-upstream-credit\s*=\s*(?:"true"|'true')/i.test(tag)) continue;
    const href = tag.match(/\shref\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
    if (!href || !isCanonicalUpstreamHref(href[1] ?? href[2])) return false;
    verified++;
  }
  return verified === 1;
}
