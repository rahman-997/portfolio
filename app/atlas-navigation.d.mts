export type NavigationModifiers = {altKey?: boolean; ctrlKey?: boolean; metaKey?: boolean; shiftKey?: boolean};
export function nextNodeIndex(key: string, index: number, count: number, modifiers?: NavigationModifiers): number | null;
export function ensureSelection(activeId: string, orderedIds: readonly string[]): string | null;
export function adjacentSelection(activeId: string, orderedIds: readonly string[], direction: number): string | null;
