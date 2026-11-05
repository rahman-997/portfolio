/** Controlled, local-only project brief generator. No network I/O or persistence. */
export const BRIEF_TRACKS = Object.freeze([
  { id: 'product', label: 'Digital product / web app' },
  { id: 'commerce', label: 'Commerce experience' },
  { id: 'platform', label: 'Platform or API' },
  { id: 'experience', label: 'Offline-first / PWA' },
]);
export const BRIEF_STAGES = Object.freeze([
  { id: 'idea', label: 'Early idea' },
  { id: 'build', label: 'Ready to build' },
  { id: 'improve', label: 'Improving an existing product' },
]);
export const BRIEF_PRIORITIES = Object.freeze([
  { id: 'accessibility', label: 'Accessibility and UX' },
  { id: 'reliability', label: 'Reliability and resilience' },
  { id: 'performance', label: 'Performance and speed' },
  { id: 'integrations', label: 'Integrations and APIs' },
]);
function labelFor(list, id, type) {
  const match = list.find(item => item.id === id);
  if (!match) throw new RangeError(`Invalid ${type}`);
  return match.label;
}
export function createBrief({ track, stage, priority, details = '' }) {
  const a = labelFor(BRIEF_TRACKS, track, 'track');
  const b = labelFor(BRIEF_STAGES, stage, 'stage');
  const c = labelFor(BRIEF_PRIORITIES, priority, 'priority');
  const safeDetails = String(details).replace(/[<>\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 240);
  return [
    'PROJECT BRIEF / PORTFOLIO INQUIRY',
    `Project type: ${a}`,
    `Project stage: ${b}`,
    `Primary focus: ${c}`,
    `Context: ${safeDetails || 'To be discussed'}`,
    '',
    'Prepared via the portfolio brief studio. This text has not been sent or saved.',
  ].join('\n');
}
