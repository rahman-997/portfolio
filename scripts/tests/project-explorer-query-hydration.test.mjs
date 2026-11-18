import test from "node:test";
import assert from "node:assert/strict";
import {
  readExplorerLocation,
  shouldApplyExplorerSnapshot,
} from "../../app/experience/project-query-sync.mjs";

test("valid URL category and search query are retained for gallery links", () => {
  assert.deepEqual(readExplorerLocation("?category=backend&q=LUMERA"), {
    filter: "backend", query: "LUMERA",
  });
  assert.deepEqual(readExplorerLocation("?category=web&q=S%C4%B1raHaz%C4%B1r"), {
    filter: "web", query: "SıraHazır",
  });
});

test("unknown categories fail closed to all and query input is bounded", () => {
  const input = "a".repeat(900);
  const state = readExplorerLocation(`?category=%3Cscript%3E&q=${input}`);
  assert.equal(state.filter, "all");
  assert.equal(state.query.length, 120);
});

test("a queued initial URL sync cannot overwrite a user's search or filter", () => {
  assert.equal(shouldApplyExplorerSnapshot(true, false), true);
  assert.equal(shouldApplyExplorerSnapshot(true, true), false);
});

test("back/forward navigation still restores URL state after edits", () => {
  assert.equal(shouldApplyExplorerSnapshot(false, true), true);
  assert.equal(shouldApplyExplorerSnapshot(false, false), true);
});
