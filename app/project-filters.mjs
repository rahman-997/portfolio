/** Project focus areas are curated from the documented case studies, not inferred from buzzwords. */
export const PROJECT_AREAS = Object.freeze({
  eventify: Object.freeze(['product', 'backend', 'reliability']),
  bookhaven: Object.freeze(['product', 'backend']),
  fitflow: Object.freeze(['product', 'offline']),
  'venues-api': Object.freeze(['backend', 'reliability']),
});

const FILTERS = new Set(['all', 'product', 'backend', 'reliability', 'offline']);

/** A stable, case-insensitive, token-based search. Never mutates the source project array. */
export function filterProjects(projects, category = 'all', query = '') {
  if (!FILTERS.has(category)) return [];
  const terms = String(query).trim().toLocaleLowerCase('en').split(/\s+/).filter(Boolean);
  return projects.filter((project) => {
    if (category !== 'all' && !PROJECT_AREAS[project.slug]?.includes(category)) return false;
    const searchText = [project.name, project.thesis, project.summary, ...project.stack]
      .join(' ').toLocaleLowerCase('en');
    return terms.every((term) => searchText.includes(term));
  });
}
