/** Resolve the neighboring case studies in the canonical project order. */
export function adjacentProjectSlugs(slugs, slug) {
  const index = slugs.indexOf(slug);
  if (index < 0 || slugs.length < 2) return { previous: null, next: null };
  return {
    previous: slugs[(index - 1 + slugs.length) % slugs.length],
    next: slugs[(index + 1) % slugs.length],
  };
}
