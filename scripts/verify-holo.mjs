/** Deterministic, offline V2 geometry + integration regression checks. */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = (name) => readFileSync(path.join(root, name), "utf8");
const engine = file("app/components/holo3d-engine.ts");
const react = file("app/components/HoloInterface.tsx");
const css = file("app/components/HoloInterface.module.css");
const page = file("app/page.tsx");

assert.match(engine, /getContext\("webgl2"/, "must render in real GPU 3D");
assert.match(engine, /gl\.enable\(gl\.DEPTH_TEST\)/, "must use depth testing");
assert.match(engine, /uZoom/, "must implement 3D camera zoom");
assert.match(engine, /uYaw/, "must implement yaw / orbit");
assert.match(engine, /ResizeObserver/, "must react to resizing");
assert.doesNotMatch(engine, /getUserMedia|mediaDevices|fetch\(/, "must not require camera or tracking");
assert.match(react, /prefers-reduced-motion/);
assert.match(react, /aria-pressed/);
assert.match(react, /Reset 3D view/);
assert.match(css, /focus-visible/);
assert.match(css, /max-width:760px/);
assert.match(page, /<HoloInterface \/>/);
assert.match(page, /PROJECT_LIST\.map/);
assert.match(page, /Profile proof points/);
assert.match(page, /Read case study/);

const js = ts.transpileModule(engine, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
}).outputText;
const { makeBust } = await import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));
const shape = makeBust(5417);
const repeat = makeBust(5417);
assert.ok(shape instanceof Float32Array);
assert.equal(shape.length, 21700 * 4, "expected number of 3D points");
assert.deepEqual(Array.from(shape.slice(0, 64)), Array.from(repeat.slice(0, 64)), "geometry should be reproducible");
const xs=[], ys=[], zs=[];
for (let i=0;i<shape.length;i+=4) {
  const x=shape[i], y=shape[i+1], z=shape[i+2];
  assert.ok(Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z), "finite XYZ coordinates");
  if (i%400===0) {xs.push(x);ys.push(y);zs.push(z);}
}
const spread=(v)=>Math.max(...v)-Math.min(...v);
assert.ok(spread(xs)>2.5 && spread(ys)>2.9 && spread(zs)>.7, "geometry must have true 3D volume");
console.log("PASS: 21,700 deterministic 3D points; finite XYZ; nonplanar depth; interaction/accessibility; original portfolio preserved.");
