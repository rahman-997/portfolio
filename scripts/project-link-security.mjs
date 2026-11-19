/* Static-export security: validate actual anchor attributes, not HTML substrings. */
const TRUSTED_UPSTREAM = "https://github.com/Alishahryar1/free-claude-code";
const UPSTREAM_PATH = "/Alishahryar1/free-claude-code";

export function isCanonicalUpstreamHref(href) {
  if (typeof href !== "string" || href !== TRUSTED_UPSTREAM) return false;
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

// Parse only start-tag attributes, respecting quotes so an attribute name or
// href concealed inside title, class, or another value cannot masquerade as real.
function parseAttributes(raw) {
  const attributes = Object.create(null);
  let cursor = 0;
  while (cursor < raw.length) {
    while (/\s/.test(raw[cursor] ?? "")) cursor++;
    if (cursor >= raw.length || (raw[cursor] === "/" && !raw.slice(cursor + 1).trim())) break;
    const start = cursor;
    while (cursor < raw.length && !/[\s=<>/'"]/.test(raw[cursor])) cursor++;
    if (start === cursor) return null;
    const name = raw.slice(start, cursor).toLowerCase();
    if (Object.hasOwn(attributes, name)) return null;
    while (/\s/.test(raw[cursor] ?? "")) cursor++;
    let value = null;
    if (raw[cursor] === "=") {
      cursor++;
      while (/\s/.test(raw[cursor] ?? "")) cursor++;
      if (raw[cursor] === "\"" || raw[cursor] === "'") {
        const quote = raw[cursor++];
        const end = raw.indexOf(quote, cursor);
        if (end < 0) return null;
        value = raw.slice(cursor, end);
        cursor = end + 1;
      } else {
        const begin = cursor;
        while (cursor < raw.length && !/[\s<>"'=]/.test(raw[cursor])) cursor++;
        if (begin === cursor) return null;
        value = raw.slice(begin, cursor);
      }
    }
    attributes[name] = value;
  }
  return attributes;
}

// Walk actual HTML tags. Skip comments and raw-text elements; HTML-looking
// strings inside them do not create DOM anchors. Honor > within quoted values.
function* anchorAttributeTexts(html) {
  const lower = html.toLowerCase();
  let cursor = 0;
  while (cursor < html.length) {
    const start = html.indexOf("<", cursor);
    if (start < 0) return;
    if (html.startsWith("<!--", start)) {
      const end = html.indexOf("-->", start + 4);
      if (end < 0) return;
      cursor = end + 3;
      continue;
    }
    const tag = /^<([a-z][a-z0-9:-]*)(?=[\s/>])/i.exec(html.slice(start, start + 80));
    if (!tag) { cursor = start + 1; continue; }
    const name = tag[1].toLowerCase();
    let pos = start + tag[0].length;
    let quote = "";
    for (; pos < html.length; pos++) {
      const char = html[pos];
      if (quote) { if (char === quote) quote = ""; }
      else if (char === "\"" || char === "'") quote = char;
      else if (char === ">") break;
    }
    if (pos === html.length) return;
    if (name === "a") yield html.slice(start + tag[0].length, pos);
    cursor = pos + 1;
    if (["script", "style", "textarea", "title"].includes(name)) {
      const close = lower.indexOf("</" + name, cursor);
      if (close < 0) return;
      const end = html.indexOf(">", close);
      if (end < 0) return;
      cursor = end + 1;
    }
  }
}

export function hasVerifiedUpstreamCredit(html) {
  if (typeof html !== "string") return false;
  let verified = 0;
  for (const raw of anchorAttributeTexts(html)) {
    const attributes = parseAttributes(raw);
    if (!attributes) return false; // Reject malformed or ambiguous anchors.
    if (!Object.hasOwn(attributes, "data-upstream-credit")) continue;
    if (attributes["data-upstream-credit"] !== "true"
      || !isCanonicalUpstreamHref(attributes.href)) return false;
    verified++;
  }
  return verified === 1;
}

// The original raw-text URL scan is retained separately. This additional check
// inspects actual hrefs, so protocol-relative, encoded and disguised private
// source anchors cannot bypass the static export's public-repository allowlist.
function decodeAnchorUrlAttribute(raw) {
  return raw.replace(/&(#(?:x[0-9a-f]+|[0-9]+)|amp|colon|sol|period|hyphen);?/gi, (entity, token) => {
    const name = token.toLowerCase();
    if (name[0] === "#") {
      const hex = name[1] === "x";
      const code = Number.parseInt(name.slice(hex ? 2 : 1), hex ? 16 : 10);
      return Number.isFinite(code) && code > 0 && code <= 0x10ffff
        ? String.fromCodePoint(code) : entity;
    }
    return ({amp: "&", colon: ":", sol: "/", period: ".", hyphen: "-"})[name] ?? entity;
  });
}

export function hasOnlyApprovedPortfolioRepoAnchors(html, allowed) {
  if (typeof html !== "string" || !(allowed instanceof Set)) return false;
  for (const raw of anchorAttributeTexts(html)) {
    const attributes = parseAttributes(raw);
    if (!attributes) return false;
    if (!Object.hasOwn(attributes, "href") || attributes.href === null) continue;
    const href = attributes.href;
    const decoded = decodeAnchorUrlAttribute(href);
    let url;
    try {
      url = new URL(decoded, "https://portfolio.invalid/");
    } catch {
      // A malformed href cannot prove that no private GitHub link was exposed.
      return false;
    }
    const host = url.hostname.toLowerCase().replace(/\.$/, "");
    // A GitHub-looking link must never redirect through a different host.
    if (decoded.toLowerCase().includes("github.com")
      && decoded.toLowerCase().includes("rahman-997/")
      && host !== "github.com") return false;
    if (host !== "github.com") continue;
    let parts;
    try {
      parts = decodeURIComponent(url.pathname).split("/").filter(Boolean);
    } catch {
      return false;
    }
    if (parts[0]?.toLowerCase() !== "rahman-997" || !parts[1]) continue;
    // All published source links use literal canonical HTTPS GitHub URLs.
    // Reject encoded, relative, userinfo and alternate-host variants entirely.
    if (!href.startsWith("https://github.com/rahman-997/")
      || /[&%]/.test(href) || url.protocol !== "https:"
      || url.username !== "" || url.password !== "" || url.port !== ""
      || url.hostname !== "github.com") return false;
    if (!allowed.has(parts[1].toLowerCase())) return false;
  }
  return true;
}
