export interface LensProject {
  slug: string;
  name: string;
  stack: readonly string[];
  problem: string;
  solution: string;
  proof: readonly string[];
  live: string;
  source: string;
}
export declare function normalizeComparisonSelection<T extends LensProject>(projects: readonly T[], leftSlug: string, rightSlug: string): string[];
export declare function compareProjects<T extends LensProject>(projects: readonly T[], leftSlug: string, rightSlug: string): T[];
export declare function buildStackIndex<T extends { slug: string; stack: readonly string[] }>(projects: readonly T[]): { name: string; projects: string[] }[];
