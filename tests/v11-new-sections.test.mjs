import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildStackIndex, compareProjects, normalizeComparisonSelection } from '../app/portfolio-lenses.mjs';

const read = file => readFileSync(file, 'utf8');
const projects = [
  { slug: 'alpha', name: 'Alpha', stack: ['React', 'TypeScript'], problem: 'Problem A', solution: 'Solution A', proof: ['Validated requests'], live: 'https://example.com/a', source: 'https://example.com/source-a' },
  { slug: 'beta', name: 'Beta', stack: ['TypeScript', 'Redis'], problem: 'Problem B', solution: 'Solution B', proof: ['Retries'], live: 'https://example.com/b', source: 'https://example.com/source-b' },
  { slug: 'gamma', name: 'Gamma', stack: ['React'], problem: 'Problem C', solution: 'Solution C', proof: [], live: 'https://example.com/c', source: 'https://example.com/source-c' },
];

test('V11 adds three unique, labelled sections and desktop / mobile navigation', () => {
  const page = read('app/page.tsx');
  const mobile = read('app/mobile-nav.tsx');
  for (const id of ['compare', 'stack-lens', 'interface-lab']) {
    assert.equal((page.match(new RegExp(`id="${id}"`, 'g')) ?? []).length, 1);
    assert.match(page, new RegExp(`href="#${id}"`));
    assert.match(mobile, new RegExp(`href="#${id}"`));
  }
  assert.match(page, /<ProjectCompare\s*\/>/);
  assert.match(page, /<StackLens\s*\/>/);
  assert.match(page, /<InterfaceLab\s*\/>/);
});

test('comparison only accepts two distinct, real project slugs', () => {
  assert.deepEqual(normalizeComparisonSelection(projects, 'alpha', 'beta'), ['alpha', 'beta']);
  assert.deepEqual(normalizeComparisonSelection(projects, 'alpha', 'alpha'), ['alpha', 'beta']);
  assert.deepEqual(normalizeComparisonSelection(projects, 'unlisted', 'alpha'), ['beta', 'alpha']);
  assert.deepEqual(normalizeComparisonSelection(projects, 'not-there', 'unknown'), ['alpha', 'beta']);
  assert.deepEqual(normalizeComparisonSelection([projects[0]], 'alpha', 'alpha'), []);
});

test('comparison returns verbatim project evidence and does not produce fabricated scores', () => {
  const [left, right] = compareProjects(projects, 'alpha', 'beta');
  assert.equal(left.problem, 'Problem A');
  assert.equal(right.solution, 'Solution B');
  assert.deepEqual(left.proof, ['Validated requests']);
  assert.equal(right.source, 'https://example.com/source-b');
  assert.equal(compareProjects(projects, 'alpha', 'alpha').length, 2);
  assert.equal(compareProjects(projects, 'oops', 'beta')[0].name, 'Alpha');
});

test('stack lens deduplicates technologies and finds projects precisely', () => {
  const index = buildStackIndex(projects);
  assert.deepEqual(index.map(x => x.name), ['React', 'Redis', 'TypeScript']);
  assert.deepEqual(index.find(x => x.name === 'TypeScript').projects, ['alpha', 'beta']);
  assert.deepEqual(index.find(x => x.name === 'Redis').projects, ['beta']);
  assert.equal(buildStackIndex([]).length, 0);
  assert.equal(buildStackIndex([{ slug: 'a', stack: ['React', 'React', ''] }]).length, 1);
});

test('new interactions expose accessible controls and label the interface as a sample', () => {
  const compare = read('app/project-compare.tsx');
  const lens = read('app/stack-lens.tsx');
  const lab = read('app/interface-lab.tsx');
  for (const component of [compare, lens, lab]) assert.match(component, /"use client"/);
  assert.match(compare, /<label htmlFor="compare-left">/);
  assert.match(compare, /<label htmlFor="compare-right">/);
  assert.match(compare, /aria-live="polite"/);
  assert.match(lens, /aria-pressed=\{selected === technology\.name\}/);
  assert.match(lens, /href=\{`\/work\/\$\{project\.slug\}\/`\}/);
  assert.match(lab, /aria-pressed=\{mode === "dark"\}/);
  assert.match(lab, /aria-pressed=\{spacing === "compact"\}/);
  assert.match(lab, /Concept demo/);
  assert.doesNotMatch(lab, /fetch\(|localStorage|sessionStorage/);
});

test('responsive layout and reduced-motion rules cover all three sections', () => {
  const css = read('app/home.module.css');
  for (const selector of ['compareSection', 'comparisonGrid', 'stackLensSection', 'lensLayout', 'interfaceLabSection', 'labBoard']) {
    assert.match(css, new RegExp(`\\.${selector}(?=[\\s,{])`));
  }
  assert.match(css, /@media\s*\(max-width:\s*800px\)[\s\S]*?\.comparisonGrid\s*\{\s*grid-template-columns:\s*1fr/);
  assert.match(css, /@media\s*\(max-width:\s*800px\)[\s\S]*?\.lensLayout\s*\{\s*grid-template-columns:\s*1fr/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});

test('browser QA CI watches new components, helper and tests', () => {
  const ci = read('.github/workflows/atlas-browser-qa.yml');
  for (const file of ['app/project-compare.tsx', 'app/stack-lens.tsx', 'app/interface-lab.tsx', 'app/portfolio-lenses.mjs', 'tests/v11-new-sections.test.mjs']) {
    assert.ok(ci.includes(`"${file}"`), `Missing ${file} from browser workflow`);
  }
});
