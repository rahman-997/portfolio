export declare const PROJECT_AREAS: Readonly<Record<string, readonly string[]>>;
export declare function filterProjects<T extends {
  slug: string;
  name: string;
  thesis: string;
  summary: string;
  stack: readonly string[];
}>(projects: readonly T[], category?: string, query?: string): T[];
