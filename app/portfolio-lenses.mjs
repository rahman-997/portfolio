/** Pure selectors shared by client components and dependency-free regression tests. */
export function normalizeComparisonSelection(projects, leftSlug, rightSlug) {
  const slugs = projects.map(project => project.slug);
  if (slugs.length < 2) return [];
  const validLeft = slugs.includes(leftSlug);
  const validRight = slugs.includes(rightSlug);
  if (validLeft) return [leftSlug, validRight && rightSlug !== leftSlug ? rightSlug : slugs.find(slug => slug !== leftSlug)];
  if (validRight) return [slugs.find(slug => slug !== rightSlug), rightSlug];
  return slugs.slice(0, 2);
}

export function compareProjects(projects, leftSlug, rightSlug) {
  const [left, right] = normalizeComparisonSelection(projects, leftSlug, rightSlug);
  return left ? [projects.find(project => project.slug === left), projects.find(project => project.slug === right)] : [];
}

export function buildStackIndex(projects) {
  const stacks = new Map();
  for (const project of projects) {
    for (const raw of project.stack ?? []) {
      const technology = raw.trim();
      if (!technology) continue;
      if (!stacks.has(technology)) stacks.set(technology, new Set());
      stacks.get(technology).add(project.slug);
    }
  }
  return [...stacks.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, ids]) => ({ name, projects: [...ids] }));
}
