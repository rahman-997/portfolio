import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const ci = readFileSync(new URL('../.github/workflows/ci.yml', import.meta.url), 'utf8');
const browserQA = readFileSync(new URL('../.github/workflows/atlas-browser-qa.yml', import.meta.url), 'utf8');

function position(marker) {
  const index = ci.indexOf(marker);
  assert.ok(index >= 0, `Missing required CI step: ${marker}`);
  return index;
}

test('production build artifacts are gated by real-browser acceptance testing', () => {
  const exportCheck = position('run: npm run verify:export');
  const browserTest = position('run: python3 scripts/atlas-browser-qa.py');
  const previewArtifact = position('- name: Upload verified preview export');
  const productionArtifact = position('- name: Upload verified static export');
  const deployArtifact = position('- name: Upload deployable source');
  assert.ok(exportCheck < browserTest, 'The static export must be verified before browser checks');
  assert.ok(browserTest < previewArtifact && browserTest < productionArtifact && browserTest < deployArtifact,
    'No deliverable or production artifact may bypass browser acceptance tests');
});

test('the release CI provisions the actual browser test dependencies and starts only the local export preview', () => {
  assert.match(ci, /playwright==1\.56\.0/);
  assert.match(ci, /axe-core@4\.10\.3/);
  assert.match(ci, /nohup npm run preview:export -- --port 4173 --dir out/);
  assert.match(ci, /curl --fail --silent --output \/dev\/null http:\/\/127\.0\.0\.1:4173\//);
  assert.match(browserQA, /run: python3 scripts\/atlas-browser-qa\.py/);
});

test('browser failures retain artifacts for diagnosis but cannot create production payloads', () => {
  const screenshots = position('- name: Upload release browser evidence');
  const production = position('- name: Upload verified static export');
  assert.ok(screenshots < production);
  assert.match(ci.slice(screenshots, screenshots + 210), /if: always\(\)/);
  assert.match(ci.slice(production, production + 200), /github\.event_name == 'push'/);
});
