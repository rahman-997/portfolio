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

// A queued initial/history callback must not overwrite a more recent user edit.
// Back/forward remains authoritative when no new edit happened after the event.
export function shouldApplyExplorerSnapshot(initial, userEdited, editedSinceScheduled = false) {
  return !editedSinceScheduled && (!initial || !userEdited);
}
