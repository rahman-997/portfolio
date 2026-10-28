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
