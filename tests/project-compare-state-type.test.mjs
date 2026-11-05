import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// The selector produces arbitrary strings, while the comparison normalizer
// also returns string slugs. The state setters must accept those values.
test('comparison state explicitly accepts normalized string project slugs', () => {
  const source = readFileSync('app/project-compare.tsx', 'utf8');
  assert.match(source, /useState<string>\(PROJECT_LIST\[0\]\.slug\)/);
  assert.match(source, /useState<string>\(PROJECT_LIST\[1\]\.slug\)/);
});