export function adjacentProjectSlugs<T extends string>(slugs: readonly T[], slug: string): {previous: T | null; next: T | null};
