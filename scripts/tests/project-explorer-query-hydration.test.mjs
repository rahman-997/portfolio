import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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

// Exercise the actual hydration effect source with a deterministic animation-frame
// scheduler. This is a focused unit harness, not a substitute for browser E2E.
test("ProjectExplorer's queued initial frame leaves in-progress typing intact", () => {
  const source = readFileSync(new URL("../../app/experience/ProjectExplorer.tsx", import.meta.url), "utf8");
  const match = source.match(/  useEffect\(\(\)=>\{[\s\S]*?\n  \},\[\]\);/);
  assert.ok(match, "ProjectExplorer initial URL hydration effect missing");
  const effect = match[0].replace("sync=(initial:boolean)=>", "sync=(initial)=>");
  const frames = new Map();
  const listeners = new Map();
  let id = 0, cleanup = null;
  let current = {filter:"all",query:"",ready:false};
  const userInteracted = {current:false};
  const window = {
    location:{search:"?category=tools&q=FROM-URL"},
    addEventListener(name,listener) {listeners.set(name,listener);},
    removeEventListener(name) {listeners.delete(name);},
  };
  const runFrame = () => {const callbacks=[...frames.values()];frames.clear();for(const callback of callbacks)callback();};
  new Function("useEffect","cancelAnimationFrame","requestAnimationFrame","window",
    "readExplorerLocation","shouldApplyExplorerSnapshot","setFilter","setQuery","setReady","userInteracted",effect)(
    (callback) => {cleanup=callback();}, (frame) => frames.delete(frame),
    (callback) => {const frame=++id;frames.set(frame,callback);return frame;},
    window, readExplorerLocation, shouldApplyExplorerSnapshot,
    value => {current.filter=value;}, value => {current.query=value;},
    value => {current.ready=value;}, userInteracted,
  );
  userInteracted.current = true;
  current.query = "LUMERA";
  runFrame();
  assert.deepEqual(current,{filter:"all",query:"LUMERA",ready:true});
  window.location.search="?category=web&q=Culture";
  listeners.get("popstate")();
  runFrame();
  assert.deepEqual(current,{filter:"web",query:"Culture",ready:true});
  cleanup();
  assert.equal(listeners.has("popstate"),false);
});
