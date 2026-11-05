import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');

test('atlas keyboard navigation wraps and ignores unrelated keys', async () => {
  const { nextNodeIndex } = await import('../app/atlas-navigation.mjs');
  assert.equal(nextNodeIndex('ArrowRight', 7, 8), 0);
  assert.equal(nextNodeIndex('ArrowDown', 2, 8), 3);
  assert.equal(nextNodeIndex('ArrowLeft', 0, 8), 7);
  assert.equal(nextNodeIndex('ArrowUp', 4, 8), 3);
  assert.equal(nextNodeIndex('Home', 6, 8), 0);
  assert.equal(nextNodeIndex('End', 0, 8), 7);
  assert.equal(nextNodeIndex('Tab', 4, 8), null);
  assert.equal(nextNodeIndex('ArrowRight', 0, 0), null);
});

test('AI Atlas has a single tabbable map node and respects reduced motion', () => {
  const atlas = read('app/ai-atlas.tsx');
  const css = read('app/ai-atlas.module.css');
  assert.match(atlas, /import\s*\{[^}]*\bnextNodeIndex\b[^}]*\}\s*from\s*["']\.\/atlas-navigation\.mjs["']/);
  assert.match(atlas, /tabIndex=\{activeId === area\.id \? 0 : -1\}/);
  assert.match(atlas, /nodeRefs\.current\[next\]\?\.focus\(\)/);
  assert.match(atlas, /matchMedia\(["']\(prefers-reduced-motion: reduce\)["']\)/);
  assert.match(atlas, /!reduceMotion && activeId === area\.id/);
  assert.match(css, /@media\s*\(prefers-reduced-motion: reduce\)[\s\S]*\.signalParticle\s*\{\s*display:\s*none/);
});

test('project artwork uses semantic, lazy-loaded images and discloses illustration provenance', () => {
  const page = read('app/page.tsx');
  const css = read('app/home.module.css');
  assert.match(page, /import Image from ["']next\/image["']/);
  assert.match(page, /<figure className=\{styles\.productFrame\}>/);
  assert.match(page, /loading="lazy"/);
  assert.match(page, /alt=\{`\$\{project\.name\} conceptual interface illustration`\}/);
  assert.match(page, /<figcaption className=\{styles\.productCaption\}>/);
  assert.match(page, /not a live screenshot/i);
  assert.doesNotMatch(page, /backgroundImage:\s*`url\(\$\{project\.cover\}\)`/);
  assert.match(css, /\.productImage\s*\{[^}]*object-fit:\s*cover/s);
});

test('Atlas browser QA runs when the shared keyboard navigation helper changes', () => {
  assert.match(read('.github/workflows/atlas-browser-qa.yml'), /app\/atlas-navigation\.mjs/);
});
