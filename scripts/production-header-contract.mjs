// The currently committed hosting policy, evaluated without substring matches.
export const REQUIRED_SECURITY_HEADERS = Object.freeze({
  "x-content-type-options":"nosniff",
  "x-frame-options":"deny",
  "referrer-policy":"strict-origin-when-cross-origin",
  "cross-origin-opener-policy":"same-origin",
  "cross-origin-resource-policy":"same-origin",
});

export function assessSecurityHeaders(headers) {
  const checks=Object.entries(REQUIRED_SECURITY_HEADERS).map(([name,expected])=>{
    const actual=headers.get(name);
    const status=actual===null ? "missing" : actual.trim().toLowerCase()===expected ? "pass" : "mismatch";
    return {name,expected,actual,status};
  });
  return {status:checks.every(item=>item.status==="pass")?"pass":"incomplete",checks};
}
