/**
 * Server-rendered contract for the AI Atlas on the public production homepage.
 * Browser interactions and responsive behavior are tested separately by Playwright.
 */
export function assertAtlasProductionContract(html) {
  if (typeof html !== 'string') throw new TypeError('Homepage HTML must be a string');

  const start = html.search(/<section\b[^>]*\bid=["']ai-lab["'][^>]*>/i);
  if (start < 0) throw new Error('AI Atlas section missing from production homepage');
  const end = html.indexOf('</section>', start);
  if (end < 0) throw new Error('AI Atlas section is incomplete in production');
  const section = html.slice(start, end);

  const requiredLabels = [
    ['atlas identity', 'AH / SYSTEMS ATLAS'],
    ['inspector', 'DISCIPLINE INSPECTOR'],
    ['Network', '>Network</button>'],
    ['Neural portrait', 'Neural portrait'],
    ['System flow', 'System flow'],
    ['illustrative disclosure', 'NOT A LIVE AGENT CONTROL PANEL'],
  ];
  for (const [label, marker] of requiredLabels) {
    if (!section.includes(marker)) throw new Error(`AI Atlas missing ${label} in production`);
  }

  if (!/\baria-live=["']polite["']/.test(section)) {
    throw new Error('AI Atlas live inspector is missing from production');
  }
  if (!/\brole=["']group["'][^>]*\baria-label=["']Visualization mode["']/.test(section)) {
    throw new Error('AI Atlas visualization mode group is missing');
  }

  const count = [...section.matchAll(/\baria-label=["']Explore [^"']+["']/g)].length;
  if (count !== 8) throw new Error(`AI Atlas expected 8 engineering nodes, found ${count}`);

  if (!/href=["']#ai-lab["']/.test(html)) {
    throw new Error('AI Lab navigation is missing on production homepage');
  }

  return { nodeCount: count, verifiedModes: 3 };
}
