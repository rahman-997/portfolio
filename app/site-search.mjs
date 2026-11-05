/** Dependency-free search index used by the global command palette and its tests.
 * Each section uses a homepage-absolute hash so searching works on case studies.
 */
export const SEARCH_SECTIONS = [
  { title: 'Selected work', description: 'Four detailed engineering projects', keywords: 'projects portfolio source case studies', href: '/#work', kind: 'section' },
  { title: 'Project explorer', description: 'Search projects by problem and technology', keywords: 'filter browse tags technology', href: '/#explorer', kind: 'section' },
  { title: 'Résumé', description: 'Experience, skills and education', keywords: 'resume cv hiring download pdf', href: '/resume/', kind: 'page' },
  { title: 'Contact', description: 'GitHub, LinkedIn and professional connections', keywords: 'connect opportunities links', href: '/#contact', kind: 'section' },
  { title: 'AI Atlas', description: 'Explore interactive engineering disciplines', keywords: 'ai lab network neural visual experience', href: '/#ai-lab', kind: 'section' },
  { title: 'Compare projects', description: 'Contrast two implementation approaches', keywords: 'comparison architecture stack technical', href: '/#compare', kind: 'section' },
  { title: 'Expertise', description: 'Product, backend and automation capabilities', keywords: 'services skills development', href: '/#expertise', kind: 'section' },
  { title: 'Solution routes', description: 'Find a project relevant to a product challenge', keywords: 'solutions booking commerce offline api', href: '/#solutions', kind: 'section' },
  { title: 'Engineering systems', description: 'Layers of an end-to-end architecture', keywords: 'system data backend queues reliability', href: '/#systems', kind: 'section' },
  { title: 'Decision files', description: 'Architectural choices from real case studies', keywords: 'tradeoffs reasoning decisions', href: '/#decisions', kind: 'section' },
  { title: 'Quality lab', description: 'Testing and delivery evidence', keywords: 'verification testing ci security', href: '/#quality-lab', kind: 'section' },
  { title: 'Delivery process', description: 'Discover, architect, build, verify and ship', keywords: 'workflow process', href: '/#process', kind: 'section' },
  { title: 'Technology stack', description: 'Languages, tools and frameworks', keywords: 'tech stack languages', href: '/#stack', kind: 'section' },
  { title: 'Stack connections', description: 'Map tools to the projects using them', keywords: 'stack lens technologies', href: '/#stack-lens', kind: 'section' },
  { title: 'About', description: 'Background and education', keywords: 'university profile', href: '/#about', kind: 'section' },
  { title: 'Interface lab', description: 'Interactive design systems experiments', keywords: 'ui ux design interface dark light', href: '/#interface-lab', kind: 'section' },
  { title: 'FAQ', description: 'Answers to common questions', keywords: 'help questions', href: '/#faq', kind: 'section' },
  { title: 'Start here', description: 'Paths for hiring, product and engineering teams', keywords: 'hiring recruiting visitors', href: '/#start-here', kind: 'section' },
  { title: 'Project brief studio', description: 'Create and copy a private project brief', keywords: 'brief form collaboration copy', href: '/#brief-studio', kind: 'section' },
];

export function buildSearchIndex(projects) {
  const projectItems = projects.map(project => ({
    title: project.name,
    description: project.thesis,
    keywords: [project.summary, ...project.stack].join(' '),
    href: `/work/${encodeURIComponent(project.slug)}/`,
    kind: 'project',
  }));
  return [...projectItems, ...SEARCH_SECTIONS];
}

const normalize = value => String(value ?? '')
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('en')
  .trim();

export function searchItems(items, query = '', limit = 8) {
  const count = Number.isFinite(limit) ? Math.max(0, Math.trunc(limit)) : 8;
  if (!count) return [];
  const tokens = normalize(query).slice(0, 120).split(/\s+/).filter(Boolean);
  if (!tokens.length) return items.slice(0, count);
  return items
    .map((entry, index) => {
      const title = normalize(entry.title);
      const description = normalize(entry.description);
      const keywords = normalize(entry.keywords);
      if (!tokens.every(token => title.includes(token) || description.includes(token) || keywords.includes(token))) return null;
      const score = tokens.reduce((total, token) => total +
        (title === token ? 12 : title.startsWith(token) ? 8 : title.includes(token) ? 5 : 0) +
        (description.includes(token) ? 2 : 0) + (keywords.includes(token) ? 1 : 0), 0);
      return { entry, score, index };
    })
    .filter(Boolean)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .slice(0, count)
    .map(result => result.entry);
}

export function shouldOpenSearch({ key, ctrlKey = false, metaKey = false, altKey = false, editable = false }) {
  if (altKey) return false;
  if ((ctrlKey || metaKey) && key.toLowerCase() === 'k') return true;
  return key === '/' && !ctrlKey && !metaKey && !editable;
}

export function moveSelection(current, size, delta) {
  return size > 0 ? ((current + delta) % size + size) % size : 0;
}
