import test from 'node:test';
import assert from 'node:assert/strict';
import { assertAtlasProductionContract } from '../atlas-production-contract.mjs';

const nodeNames = ['Architecture', 'Interface', 'Backend', 'Data', 'AI / MCP', 'Async work', 'Verification', 'Delivery'];
const nodeMarkup = nodeNames.map((name, index) => `<button aria-label="Explore ${name}" aria-pressed="${index === 0 ? 'true' : 'false'}">${name}</button>`).join('');
const atlas = `<section id="ai-lab" aria-labelledby="ai-lab-heading">
  <h2 id="ai-lab-heading">Every system is a network of decisions.</h2>
  AH / SYSTEMS ATLAS
  <div role="group" aria-label="Visualization mode"><button>Network</button><button>Neural portrait</button><button>System flow</button></div>
  ${nodeMarkup}
  <aside aria-labelledby="atlas-inspector-title">DISCIPLINE INSPECTOR<div aria-live="polite"><h3 id="atlas-inspector-title">Architecture</h3></div></aside>
  DESIGNED FOR EXPLORATION, NOT A LIVE AGENT CONTROL PANEL
</section>`;
const homepage = (section = atlas) => `<html><body><a href="#ai-lab">Explore AI Lab</a>${section}<section>Other</section></body></html>`;

test('accepts the complete, accessible server-rendered production Atlas', () => {
  const result = assertAtlasProductionContract(homepage());
  assert.equal(result.nodeCount, 8);
});

test('rejects a deploy missing the Atlas even when the homepage is healthy', () => {
  assert.throws(() => assertAtlasProductionContract(homepage('')), /AI Atlas section missing/);
});

test('rejects a partially rendered Atlas with fewer than eight nodes', () => {
  assert.throws(() => assertAtlasProductionContract(homepage(atlas.replace('aria-label="Explore Delivery"', 'aria-label="Missing Delivery"'))), /8 engineering nodes/);
});

test('rejects an inaccessible inspector without live updates', () => {
  assert.throws(() => assertAtlasProductionContract(homepage(atlas.replace('aria-live="polite"', 'aria-live="off"'))), /live inspector/);
});

test('rejects a missing alternate visualization mode', () => {
  assert.throws(() => assertAtlasProductionContract(homepage(atlas.replace('System flow</button>', 'Other</button>'))), /System flow/);
});

test('rejects missing hero navigation to AI Lab', () => {
  assert.throws(() => assertAtlasProductionContract(homepage().replace('href="#ai-lab"', 'href="#elsewhere"')), /AI Lab navigation/);
});

import { isCanonicalUpstreamHref, hasVerifiedUpstreamCredit, hasOnlyApprovedPortfolioRepoAnchors } from "../project-link-security.mjs";

test("security: fork upstream must use the exact GitHub anchor destination", () => {
  const good = '<a href="https://github.com/Alishahryar1/free-claude-code" data-upstream-credit="true">Upstream</a>';
  assert.equal(hasVerifiedUpstreamCredit(good), true);
  assert.equal(hasVerifiedUpstreamCredit(good + good), false);
  assert.equal(hasVerifiedUpstreamCredit('<span data-upstream-credit="true">https://github.com/Alishahryar1/free-claude-code</span>'), false);
  assert.equal(hasVerifiedUpstreamCredit('<a data-evil-data-upstream-credit="true" href="https://github.com/Alishahryar1/free-claude-code">Fake</a>'), false);
  assert.equal(hasVerifiedUpstreamCredit('<a data-upstream-credit="true" data-href="https://github.com/Alishahryar1/free-claude-code">Fake</a>'), false);
  for (const candidate of [
    "https://evil.example/?next=https://github.com/Alishahryar1/free-claude-code",
    "https://github.com.evil.example/Alishahryar1/free-claude-code",
    "https://github.com@evil.example/Alishahryar1/free-claude-code",
    "http://github.com/Alishahryar1/free-claude-code",
    "//github.com/Alishahryar1/free-claude-code",
    "https://github.com/Alishahryar1/free-claude-code/issues",
    "https://github.com/Alishahryar1/free-claude-code?redirect=bad",
    "https://github.com/Alishahryar1/free-claude-code#phishing",
    "https://user@github.com/Alishahryar1/free-claude-code",
    "https://github.com/Alishahryar1/free-claude-code.evil.example",
  ]) {
    assert.equal(isCanonicalUpstreamHref(candidate), false, candidate);
    assert.equal(hasVerifiedUpstreamCredit('<a data-upstream-credit="true" href="'+candidate+'">Upstream</a>'), false, candidate);
  }
  assert.equal(hasVerifiedUpstreamCredit('<a href="https://github.com/Alishahryar1/free-claude-code">No marker</a>'), false);
});

test("security regression: ignore fake upstream attributes embedded in other attributes or comments", () => {
  const trusted = "https://github.com/Alishahryar1/free-claude-code";
  assert.equal(hasVerifiedUpstreamCredit(`<a title='fake data-upstream-credit="true"' href="${trusted}">Link</a>`), false);
  assert.equal(hasVerifiedUpstreamCredit(`<a data-upstream-credit="true" title='fake href="${trusted}"' href="https://evil.example/hijack">Link</a>`), false);
  assert.equal(hasVerifiedUpstreamCredit(`<!-- <a data-upstream-credit="true" href="${trusted}">Comment only</a> -->`), false);
  assert.equal(hasVerifiedUpstreamCredit(`<script>const template = '<a data-upstream-credit="true" href="${trusted}">fake</a>';</script>`), false);
  assert.equal(hasVerifiedUpstreamCredit(`<a data-upstream-credit="true" href="${trusted}" title="text with > sign">real</a>`), true);
  assert.equal(hasVerifiedUpstreamCredit(`<a data-upstream-credit="true" href="https://evil.example" href="${trusted}">duplicate href</a>`), false);
});


test("security: actual source anchors must only link to public repos with canonical URLs", () => {
  const allow = new Set(["portfolio", "eventify", "bookbookhaven", "fitflow-gym", "venues-api", "mizan-finance", "free-claude-code"]);
  const anchor = (href) => `<a href="${href}">Repository</a>`;
  for (const repo of allow) {
    assert.equal(hasOnlyApprovedPortfolioRepoAnchors(anchor(`https://github.com/rahman-997/${repo}`), allow), true, repo);
  }
  assert.equal(hasOnlyApprovedPortfolioRepoAnchors(anchor("https://github.com/Alishahryar1/free-claude-code"), allow), true);
  assert.equal(hasOnlyApprovedPortfolioRepoAnchors(anchor("https://github.com/rahman-997"), allow), true);
  for (const bad of [
    "https://github.com/rahman-997/private-client",
    "//github.com/rahman-997/private-client",
    "https://github.com/rahman-997/%70rivate-client",
    "https://github.com/rahman-997/pri&#118;ate-client",
    "https&#58;//github.com/rahman-997/private-client",
    "https://github.com/rahman&#45;997/private-client",
    "https://github.com/rahman-997/eventify%2f..%2fprivate-client",
    "https://github.com.evil.example/rahman-997/portfolio",
    "https://github.com@evil.example/rahman-997/portfolio",
    "http://github.com/rahman-997/eventify",
    "https://user@github.com/rahman-997/portfolio",
    "https://github.com/rahman-997/private-client?ref=public",
  ]) {
    assert.equal(hasOnlyApprovedPortfolioRepoAnchors(anchor(bad), allow), false, bad);
  }
  assert.equal(hasOnlyApprovedPortfolioRepoAnchors('<!-- '+anchor('https://github.com/rahman-997/private-client')+' -->',allow),true);
  assert.equal(hasOnlyApprovedPortfolioRepoAnchors('<script>const t=`'+anchor('https://github.com/rahman-997/private-client')+'`;</script>',allow),true);
  assert.equal(hasOnlyApprovedPortfolioRepoAnchors(anchor('https://github.com/rahman-997/portfolio')+anchor('https://github.com/rahman-997/private-client'),allow),false);
});
