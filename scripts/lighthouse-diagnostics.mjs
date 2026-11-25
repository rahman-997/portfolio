// Keep diagnostics bounded and distinguish missing data from zero.
const numeric = value => typeof value === "number" && Number.isFinite(value) ? value : null;
const rows = audit => Array.isArray(audit?.details?.items) ? audit.details.items : [];
const safeText = value => typeof value === "string" ? value.slice(0, 300) : null;

export function lighthouseDiagnostics(report) {
  const audits = report?.audits ?? {};
  const lcpAudit = audits["lcp-breakdown-insight"] ?? audits["largest-contentful-paint-element"];
  // Insight details may nest tables inside lists. Only expose known metrics and labels.
  const walk = (node, depth = 0) => {
    if (!node || typeof node !== "object" || depth > 6) return [];
    if (Array.isArray(node)) return node.flatMap(item => walk(item, depth + 1));
    const current = Object.entries(node).filter(([key, value]) => /^(phase|label|subpart|duration|timing|percent|ms|type)$/i.test(key) && (typeof value === "string" || typeof value === "number"));
    return [...(current.length ? [Object.fromEntries(current.map(([key,value])=>[key,typeof value==="string"?safeText(value):numeric(value)]))] : []), ...Object.values(node).flatMap(value => walk(value, depth + 1))];
  };
  const opportunities = ["unused-javascript","unused-css-rules","render-blocking-resources","render-blocking-insight","image-delivery-insight","modern-image-formats","uses-text-compression"];
  return {
    lcpBreakdown: walk(lcpAudit?.details).slice(0, 16),
    longTasks: rows(audits["long-tasks"]).slice(0, 8).map(item=>({durationMs:numeric(item.duration),startMs:numeric(item.startTime)})),
    opportunities: opportunities.flatMap(id => {
      const audit = audits[id];
      if (!audit) return [];
      return [{id, score:numeric(audit.score), estimatedSavingsMs:numeric(audit.details?.overallSavingsMs ?? audit.metricSavings?.LCP ?? audit.metricSavings?.FCP), estimatedSavingsBytes:numeric(audit.details?.overallSavingsBytes)}];
    }),
    totalByteWeight: numeric(audits["total-byte-weight"]?.numericValue)
  };
}
