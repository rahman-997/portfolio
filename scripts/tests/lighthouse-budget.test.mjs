import test from "node:test";
import assert from "node:assert/strict";
import { evaluateLighthouseBudget } from "../lighthouse-budget.mjs";

const baseline = () => ({
  categories: {
    performance: { score: 0.78 },
    accessibility: { score: 1 },
    "best-practices": { score: 1 },
    seo: { score: 1 },
  },
  audits: {
    "largest-contentful-paint": { numericValue: 5600 },
    "total-blocking-time": { numericValue: 40 },
    "cumulative-layout-shift": { numericValue: 0 },
  },
});

test("known slow mobile baseline warns but does not falsely fail the release", () => {
  const result = evaluateLighthouseBudget(baseline());
  assert.deepEqual(result.blockers, []);
  assert.ok(result.advisories.some((item) => item.includes("LCP")));
  assert.ok(result.advisories.some((item) => item.includes("Performance")));
});

test("accessibility and SEO regressions block a release", () => {
  const input = baseline();
  input.categories.accessibility.score = 0.90;
  input.categories.seo.score = 0.8;
  const result = evaluateLighthouseBudget(input);
  assert.equal(result.blockers.length, 2);
});

test("excessive layout shift blocks a release", () => {
  const input = baseline();
  input.audits["cumulative-layout-shift"].numericValue = 0.16;
  assert.ok(evaluateLighthouseBudget(input).blockers.some((item) => item.includes("CLS")));
});

test("missing measurements and runtime failures are not silently accepted", () => {
  const input = baseline();
  delete input.audits["largest-contentful-paint"];
  assert.ok(evaluateLighthouseBudget(input).blockers.some((item) => item.includes("LCP")));
  assert.ok(evaluateLighthouseBudget({ runtimeError: { code: "NO_FCP" } }).blockers.length > 0);
});

test("healthy synthetic run has no warnings or blockers", () => {
  const input = baseline();
  input.categories.performance.score = 0.94;
  input.audits["largest-contentful-paint"].numericValue = 2300;
  assert.deepEqual(evaluateLighthouseBudget(input), { blockers: [], advisories: [] });
});
