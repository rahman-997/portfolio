// Normalize URL state for the existing client-side project catalog.
// Pure, dependency-free helpers keep hydration and popstate behavior testable.
const FILTERS = new Set(["all", "product", "backend", "tools", "web"]);

export function readExplorerLocation(search) {
  const params = new URLSearchParams(search);
  const category = params.get("category") ?? "all";
  return {
    filter: FILTERS.has(category) ? category : "all",
    query: (params.get("q") ?? "").slice(0, 120),
  };
}

// Delayed first-paint hydration must not overwrite search/filter edits already typed.
// Explicit browser history navigation is authoritative even after the user edited.
export function shouldApplyExplorerSnapshot(initial, userEdited) {
  return !initial || !userEdited;
}
