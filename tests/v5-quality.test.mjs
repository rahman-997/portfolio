import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');

test('primary CI executes the repository UI regression suite before building', () => {
  const workflow = read('.github/workflows/ci.yml');
  const testStep = workflow.indexOf('run: npm run test:ui');
  const buildStep = workflow.indexOf('run: npm run build');
  assert.ok(testStep > 0, 'CI must actually run the UI regression tests');
  assert.ok(buildStep > testStep, 'Tests must run before the build');
});

test('case-study cover describes illustration provenance with real visible text', () => {
  const page = read('app/work/[slug]/page.tsx');
  assert.match(page, /<figcaption\s+className=\{styles\.coverCaption\}/,
    'Visual disclosure must be accessible text inside the figure');
  assert.match(page, /Concept visual[^<]*not a live screenshot/);
  const css = read('app/work/[slug]/case-study.module.css');
  assert.match(css, /\.coverCaption\s*\{/);
  assert.doesNotMatch(css, /\.cover:before\s*\{content:/,
    'A CSS pseudo-element must not be the only visual disclosure');
});

test('project content update is represented by sitemap and social metadata timestamp', () => {
  const source = read('app/portfolio-data.ts');
  assert.match(source, /PORTFOLIO_UPDATED_AT = "2026-10-(?:2[89]|30)T/);
  assert.match(read('app/sitemap.ts'), /PORTFOLIO_UPDATED_AT/);
  assert.match(read('app/work/[slug]/page.tsx'), /modifiedTime: PORTFOLIO_UPDATED_AT/);
});
