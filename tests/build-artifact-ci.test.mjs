import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const ci = readFileSync(new URL('../.github/workflows/ci.yml', import.meta.url), 'utf8');

test('CI supports a manually initiated production build', () => {
  assert.match(ci, /^\s{2}workflow_dispatch:\s*$/m);
});

test('CI publishes the verified exported site rather than just the source code', () => {
  assert.match(ci, /name: Upload verified static export/);
  assert.match(ci, /name: hajar-nextjs-production-/);
  assert.match(ci, /^\s{10}path: out\/\s*$/m);
  assert.ok(ci.indexOf('run: npm run verify:export') < ci.indexOf('name: Upload verified static export'));
});
