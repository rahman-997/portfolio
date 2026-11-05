export interface SearchEntry {
  title: string;
  description: string;
  keywords: string;
  href: string;
  kind: string;
}
export declare const SEARCH_SECTIONS: readonly SearchEntry[];
export declare function buildSearchIndex<T extends {
  slug: string;
  name: string;
  thesis: string;
  summary: string;
  stack: readonly string[];
}>(projects: readonly T[]): SearchEntry[];
export declare function searchItems<T extends SearchEntry>(items: readonly T[], query?: string, limit?: number): T[];
export declare function shouldOpenSearch(event: {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  editable?: boolean;
}): boolean;
export declare function moveSelection(current: number, size: number, delta: number): number;
