import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { filterProjects, PROJECT_AREAS } from '../app/project-filters.mjs';

const projects = [
  { slug: 'eventify', name: 'Eventify', thesis: 'Booking that survives retries', summary: 'PostgreSQL outbox and Redis queues', stack: ['React', 'Redis', 'BullMQ'] },
  { slug: 'bookhaven', name: 'BookHaven', thesis: 'Commerce workflows', summary: 'Order inventory and checkout', stack: ['Next.js', 'MongoDB'] },
  { slug: 'fitflow', name: 'FitFlow', thesis: 'Offline-first training', summary: 'Device-local progress', stack: ['Next.js', 'PWA'] },
  { slug: 'venues-api', name: 'Venues API', thesis: 'Strict API contracts', summary: 'Zod validation and layered backend', stack: ['Express', 'Zod'] },
];

test('project categories are based on actual featured project slugs', () => {
  assert.deepEqual(Object.keys(PROJECT_AREAS).sort(), projects.map(p => p.slug).sort());
  assert.deepEqual(filterProjects(projects, 'offline', '').map(p => p.slug), ['fitflow']);
  assert.deepEqual(filterProjects(projects, 'reliability', '').map(p => p.slug), ['eventify', 'venues-api']);
  assert.deepEqual(filterProjects(projects, 'backend', '').map(p => p.slug), ['eventify', 'bookhaven', 'venues-api']);
});

test('search is trimmed, case-insensitive and matches names, stack, and project descriptions', () => {
  assert.deepEqual(filterProjects(projects, 'all', '  MONGODB  ').map(p => p.slug), ['bookhaven']);
  assert.deepEqual(filterProjects(projects, 'all', 'redis retries').map(p => p.slug), ['eventify']);
  assert.deepEqual(filterProjects(projects, 'all', 'fitflow').map(p => p.slug), ['fitflow']);
  assert.deepEqual(filterProjects(projects, 'all', '').map(p => p.slug), projects.map(p => p.slug));
});

test('unknown category yields empty results; filtering preserves source order without mutation', () => {
  const before = structuredClone(projects);
  assert.deepEqual(filterProjects(projects, 'unlisted', ''), []);
  assert.deepEqual(filterProjects(projects, 'product', 'unfindable'), []);
  assert.deepEqual(projects, before);
});

test('new sections have unique destinations and links in desktop/mobile navigation', () => {
  const page = readFileSync('app/page.tsx', 'utf8');
  const nav = readFileSync('app/mobile-nav.tsx', 'utf8');
  for (const id of ['explorer', 'decisions', 'start-here']) {
    assert.equal((page.match(new RegExp(`id="${id}"`, 'g')) ?? []).length, 1);
    assert.match(nav, new RegExp(`href="#${id}"`));
  }
  assert.match(page, /<ProjectExplorer/);
  assert.match(page, /PROJECT_LIST\.map\(\(project\)/);
  assert.match(page, /project\.decisions\[0\]/);
});

test('project explorer has semantic controls, result announcements and useful empty state', () => {
  const explorer = readFileSync('app/project-explorer.tsx', 'utf8');
  assert.match(explorer, /aria-label="Search projects"/);
  assert.match(explorer, /aria-pressed=\{category === option\.id\}/);
  assert.match(explorer, /aria-live="polite"/);
  assert.match(explorer, /No matching projects/);
  assert.match(explorer, /href=\{`\/work\/\$\{project\.slug\}\/`\}/);
  assert.match(explorer, /filterProjects\(PROJECT_LIST, category, query\)/);
});

test('new sections have responsive and reduced-motion-aware styles', () => {
  const css = readFileSync('app/home.module.css', 'utf8');
  for (const name of ['explorer', 'explorerControls', 'explorerGrid', 'decisionShelf', 'decisionGrid', 'startHere', 'pathGrid']) {
    assert.match(css, new RegExp(`\\.${name}\\s*\\{`));
  }
  assert.match(css, /@media\s*\(max-width:\s*800px\)[\s\S]*?\.explorerGrid\s*\{\s*grid-template-columns:\s*1fr/);
  assert.match(css, /@media\s*\(max-width:\s*600px\)[\s\S]*?\.pathGrid\s*\{\s*grid-template-columns:\s*1fr/);
  assert.match(css, /\.explorerFilter:focus-visible/);
});


test('CI browser QA reruns when the project explorer or its filtering logic changes', () => {
  const workflow = readFileSync('.github/workflows/atlas-browser-qa.yml', 'utf8');
  const browser = readFileSync('scripts/atlas-browser-qa.py', 'utf8');
  for (const file of ['app/project-explorer.tsx', 'app/project-filters.mjs', 'app/project-filters.d.mts']) {
    assert.ok(workflow.includes(`"${file}"`), `Missing browser QA path trigger for ${file}`);
  }
  assert.match(browser, /combined category \+ search filter failed/);
  assert.match(browser, /decision disclosure did not open/);
});
