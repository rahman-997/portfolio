/**
 * Resolve roving-keyboard focus for the atlas' ordered node collection.
 * A null result leaves focus alone so Tab, Escape, and modifier keys retain
 * their normal browser behavior.
 *
 * @param {string} key
 * @param {number} index
 * @param {number} count
 * @param {{altKey?:boolean,ctrlKey?:boolean,metaKey?:boolean,shiftKey?:boolean}} [modifiers]
 * @returns {number | null}
 */
export function nextNodeIndex(key, index, count, modifiers = {}) {
  // Leave browser/system shortcuts such as Alt+Left intact.
  if (modifiers.altKey || modifiers.ctrlKey || modifiers.metaKey || modifiers.shiftKey) return null;
  if (!Number.isInteger(count) || count < 1 || !Number.isInteger(index) || index < 0 || index >= count) {
    return null;
  }
  switch (key) {
    case 'ArrowRight':
    case 'ArrowDown':
      return (index + 1) % count;
    case 'ArrowLeft':
    case 'ArrowUp':
      return (index + count - 1) % count;
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
    default:
      return null;
  }
}

/** Select a visible member of a mode, falling back to its first item. */
export function ensureSelection(activeId, orderedIds) {
  if (!Array.isArray(orderedIds) || !orderedIds.length) return null;
  return orderedIds.includes(activeId) ? activeId : orderedIds[0];
}

/** Move within the *visible* collection, wrapping around its edges. */
export function adjacentSelection(activeId, orderedIds, direction) {
  const current = ensureSelection(activeId, orderedIds);
  if (current === null || !Number.isInteger(direction)) return null;
  const index = orderedIds.indexOf(current);
  return orderedIds[((index + direction) % orderedIds.length + orderedIds.length) % orderedIds.length];
}
