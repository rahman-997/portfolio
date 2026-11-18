export type ExplorerFilter = "all" | "product" | "backend" | "tools" | "web";
export function readExplorerLocation(search: string): {filter: ExplorerFilter; query: string};
export function shouldApplyExplorerSnapshot(initial: boolean, userEdited: boolean): boolean;
