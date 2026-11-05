import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = (path) => readFileSync(path, 'utf8');

test('Atlas arrow shortcuts ignore browser/system modifiers', async () => {
  const { nextNodeIndex } = await import('../app/atlas-navigation.mjs');
  for (const modifier of ['altKey', 'ctrlKey', 'metaKey', 'shiftKey']) {
    assert.equal(nextNodeIndex('ArrowLeft', 2, 8, { [modifier]: true }), null, `${modifier} should not be hijacked`);
  }
  assert.equal(nextNodeIndex('ArrowLeft', 2, 8, {}), 1);
  assert.match(source('app/ai-atlas.tsx'), /nextNodeIndex\(event\.key, index, areas\.length,\s*\{/);
});

test('Atlas System flow only selects visible stages and keeps selection in sync', async () => {
  const { ensureSelection, adjacentSelection } = await import('../app/atlas-navigation.mjs');
  const flow = ['architecture', 'backend', 'data', 'async', 'quality'];
  assert.equal(ensureSelection('interface', flow), 'architecture');
  assert.equal(ensureSelection('data', flow), 'data');
  assert.equal(adjacentSelection('quality', flow, 1), 'architecture');
  assert.equal(adjacentSelection('architecture', flow, -1), 'quality');
  assert.equal(adjacentSelection('unknown', flow, 1), 'backend');
  assert.equal(ensureSelection('unknown', []), null);
  assert.equal(adjacentSelection('data', [], 1), null);
  assert.equal(adjacentSelection('data', flow, 1.5), null);
  const atlas = source('app/ai-atlas.tsx');
  assert.match(atlas, /setViewMode\(mode:/);
  assert.match(atlas, /view === "flow" \? journey\.map/);
  assert.match(atlas, /setActiveId\(\(current\) => ensureSelection/);
});

test('Case study pages expose real prev/next project navigation', async () => {
  const { adjacentProjectSlugs } = await import('../app/project-navigation.mjs');
  const slugs = ['eventify', 'bookhaven', 'fitflow', 'venues-api'];
  assert.deepEqual(adjacentProjectSlugs(slugs, 'eventify'), { previous: 'venues-api', next: 'bookhaven' });
  assert.deepEqual(adjacentProjectSlugs(slugs, 'venues-api'), { previous: 'fitflow', next: 'eventify' });
  assert.deepEqual(adjacentProjectSlugs(slugs, 'unknown'), { previous: null, next: null });
  assert.deepEqual(adjacentProjectSlugs([], 'eventify'), { previous: null, next: null });
  const page = source('app/work/[slug]/page.tsx');
  assert.match(page, /aria-label="Browse case studies"/);
  assert.match(page, /adjacentProjectSlugs\(PROJECT_SLUGS, slug\)/);
  assert.match(source('app/work/[slug]/case-study.module.css'), /\.caseNavNext/);
  const workflow = source('.github/workflows/atlas-browser-qa.yml');
  assert.match(workflow, /app\/project-navigation\.mjs/);
  assert.match(workflow, /app\/work\/\[slug\]\/page\.tsx/);
});
