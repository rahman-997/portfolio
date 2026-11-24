#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

// These are SYNTHETIC desktop/Chrome lab checks, not field Core Web Vitals.
// Fail only stable UX/safety fundamentals. Performance/LCP remain advisory
// because throttled, single-run scores vary substantially across CI runners.
const MIN_SCORE = {
  accessibility: 0.95,
  "best-practices": 0.90,
  seo: 0.95,
};

export function evaluateLighthouseBudget(result) {
  const blockers = [];
  const advisories = [];
  if (!result || typeof result !== "object") {
    return { blockers: ["Lighthouse report is absent or invalid"], advisories };
  }
  if (result.runtimeError?.code) {
    blockers.push("Lighthouse runtime error: " + result.runtimeError.code);
    return { blockers, advisories };
  }
  for (const [name, min] of Object.entries(MIN_SCORE)) {
    const score = result.categories?.[name]?.score;
    if (typeof score !== "number") {
      blockers.push("Missing " + name + " score");
    } else if (score < min) {
      blockers.push(name + " score " + Math.round(score * 100) + " below " + Math.round(min * 100));
    }
  }
  const metric = (name) => result.audits?.[name]?.numericValue;
  const cls = metric("cumulative-layout-shift");
  if (typeof cls !== "number" || !Number.isFinite(cls)) {
    blockers.push("Missing usable CLS measurement");
  } else if (cls > 0.1) {
    blockers.push("CLS " + cls.toFixed(3) + " exceeds 0.100");
  }
  const lcp = metric("largest-contentful-paint");
  if (typeof lcp !== "number" || !Number.isFinite(lcp)) {
    blockers.push("Missing usable LCP measurement");
  } else if (lcp > 4000) {
    advisories.push("LCP " + Math.round(lcp) + "ms exceeds 4000ms lab target; investigate without claiming a regression from one run");
  }
  const tbt = metric("total-blocking-time");
  if (typeof tbt !== "number" || !Number.isFinite(tbt)) {
    blockers.push("Missing usable TBT measurement");
  } else if (tbt > 300) {
    advisories.push("TBT " + Math.round(tbt) + "ms exceeds 300ms synthetic target");
  }
  const perf = result.categories?.performance?.score;
  if (typeof perf !== "number") {
    blockers.push("Missing performance score");
  } else if (perf < 0.80) {
    advisories.push("Performance " + Math.round(perf * 100) + "/100 is below 80; repeat the lab and inspect LCP phases");
  }
  return { blockers, advisories };
}

export function evaluateLighthouseFiles(files) {
  const results = [];
  for (const file of files) {
    const report = JSON.parse(readFileSync(file, "utf8"));
    results.push({ file, ...evaluateLighthouseBudget(report) });
  }
  return results;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const files = process.argv.slice(2);
  if (!files.length) {
    console.error("Usage: node scripts/lighthouse-budget.mjs <en-mobile.json> <ar-mobile.json>");
    process.exitCode = 2;
  } else {
    const results = evaluateLighthouseFiles(files);
    for (const result of results) {
      console.log("Lighthouse lab budget: " + result.file);
      for (const warning of result.advisories) console.warn("::warning::" + warning);
      for (const failure of result.blockers) console.error("::error::" + failure);
      if (!result.blockers.length) console.log("Accessibility, SEO, best practices and CLS gates passed");
    }
    if (results.some((result) => result.blockers.length > 0)) process.exitCode = 1;
  }
}
