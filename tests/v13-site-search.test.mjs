import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildSearchIndex, searchItems, shouldOpenSearch, moveSelection } from '../app/site-search.mjs';

const examples = [
  { slug: 'eventify', name: 'Eventify', thesis: 'Booking state beyond the happy path', summary: 'A durable event service', stack: ['React', 'Redis', 'BullMQ'] },
  { slug: 'bookhaven', name: 'BookHaven', thesis: 'Commerce and inventory', summary: 'Online store', stack: ['Next.js', 'MongoDB'] },
];

test('index contains stable section destinations and real project destinations', () => {
  const entries = buildSearchIndex(examples);
  for (const href of ['/#work', '/#explorer', '/#ai-lab', '/#contact', '/resume/', '/work/eventify/', '/work/bookhaven/']) {
    assert.ok(entries.some(entry => entry.href === href), `Missing destination ${href}`);
  }
  assert.equal(new Set(entries.map(entry => entry.href)).size, entries.length, 'Duplicate search result destinations');
});

test('case-insensitive multi-word matches use real project data and require every term', () => {
  const entries = buildSearchIndex(examples);
  assert.equal(searchItems(entries, 'rEdiS booking')[0]?.title, 'Eventify');
  assert.ok(searchItems(entries, 'mongo commerce').some(entry => entry.title === 'BookHaven'));
  assert.ok(!searchItems(entries, 'redis mongodb').some(entry => entry.kind === 'project'));
});

test('normalization handles accent marks, special characters and whitespace safely', () => {
  const entries = [{ title: 'Résumé', description: 'Hiring', keywords: 'CV', kind: 'page', href: '/resume/' }];
  assert.equal(searchItems(entries, 'ReSuMe')[0]?.href, '/resume/');
  assert.deepEqual(searchItems(entries, '   ', 5), entries);
  assert.deepEqual(searchItems(entries, '[a-z](?:.*)', 5), []);
});

test('ranking prefers project name match over secondary keywords and bounds results', () => {
  const entries = buildSearchIndex(examples);
  assert.equal(searchItems(entries, 'BookHaven')[0]?.href, '/work/bookhaven/');
  assert.equal(searchItems(entries, '', 3).length, 3);
  assert.deepEqual(searchItems(entries, 'no-such-portfolio-topic'), []);
});

test('slash shortcut never hijacks typing; control-K and command-K can open anywhere', () => {
  assert.equal(shouldOpenSearch({ key: '/', editable: false }), true);
  assert.equal(shouldOpenSearch({ key: '/', editable: true }), false);
  assert.equal(shouldOpenSearch({ key: 'k', ctrlKey: true, editable: true }), true);
  assert.equal(shouldOpenSearch({ key: 'K', metaKey: true, editable: false }), true);
  assert.equal(shouldOpenSearch({ key: '/', altKey: true, editable: false }), false);
  assert.equal(shouldOpenSearch({ key: 'k', ctrlKey: true, altKey: true }), false);
});

test('arrow key selection wraps and handles zero results', () => {
  assert.equal(moveSelection(0, 4, -1), 3);
  assert.equal(moveSelection(3, 4, 1), 0);
  assert.equal(moveSelection(99, 0, 1), 0);
});

test('site search is global, keyboard accessible, and has a mobile-safe floating trigger', () => {
  const component = readFileSync('app/site-search-client.tsx', 'utf8');
  const root = readFileSync('app/layout.tsx', 'utf8');
  const css = readFileSync('app/site-search.module.css', 'utf8');
  assert.match(root, /<SiteSearch\s*\/>/);
  assert.match(component, /aria-modal="true"/);
  assert.match(component, /role="dialog"/);
  assert.match(component, /role="listbox"/);
  assert.match(component, /aria-activedescendant/);
  assert.match(component, /aria-keyshortcuts/);
  assert.match(component, /event\.key === "Escape"/);
  assert.match(component, /event\.key === "Tab"/);
  assert.match(css, /@media\s*\(max-width:\s*600px\)/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
});

test('browser QA and CI watch the command palette', () => {
  const qa = readFileSync('scripts/atlas-browser-qa.py', 'utf8');
  assert.match(qa, /Site search keyboard shortcut/);
  assert.match(qa, /get_by_role\("dialog", name="Search portfolio"\)/);
  const ci = readFileSync('.github/workflows/atlas-browser-qa.yml', 'utf8');
  assert.ok(ci.includes('"app/site-search.tsx"'));
  assert.ok(ci.includes('"app/site-search.mjs"'));
  assert.ok(ci.includes('"app/layout.tsx"'));
  assert.ok(ci.includes('"app/portfolio-data.ts"'));
});


test('every quick navigation anchor has a real section target', async () => {
  const { SEARCH_SECTIONS } = await import('../app/site-search.mjs');
  const page = readFileSync('app/page.tsx', 'utf8');
  const atlas = readFileSync('app/ai-atlas.tsx', 'utf8');
  for (const section of SEARCH_SECTIONS) {
    if (!section.href.startsWith('/#')) continue;
    const anchor = section.href.slice(2);
    assert.ok(page.includes(`id="${anchor}"`) || atlas.includes(`id="${anchor}"`),
      `Quick navigation link ${section.href} has no matching anchor`);
  }
});

test('browser QA can use local Chromium while CI defaults to installed Playwright Chromium', () => {
  const qa = readFileSync('scripts/atlas-browser-qa.py', 'utf8');
  assert.match(qa, /ATLAS_CHROMIUM_PATH/);
  assert.match(qa, /executable_path/);
  assert.match(qa, /launch_config = \{"executable_path": chromium_path\} if chromium_path else \{\}/);
  assert.doesNotMatch(qa, /channel.*chrome/);
});

test('global search keeps large project details in the server bundle, not every client page', () => {
  const server = readFileSync('app/site-search.tsx', 'utf8');
  const client = readFileSync('app/site-search-client.tsx', 'utf8');
  assert.match(server, /buildSearchIndex\(PROJECT_LIST\)/);
  assert.match(server, /<SiteSearchClient/);
  assert.doesNotMatch(client, /portfolio-data/);
  assert.match(client, /searchItems\(items, query/);
  const ci = readFileSync('.github/workflows/atlas-browser-qa.yml', 'utf8');
  assert.ok(ci.includes('"app/site-search-client.tsx"'));
});
