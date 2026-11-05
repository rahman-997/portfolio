import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

test('server search component cannot collide with the client search helper module', () => {
  const layout = readFileSync('app/layout.tsx', 'utf8');
  assert.ok(existsSync('app/site-search-panel.tsx'));
  assert.match(layout, /from ["']\.\/site-search-panel["']/);
  assert.ok(!existsSync('app/site-search.tsx'));
  assert.ok(existsSync('app/site-search.mjs'));
});