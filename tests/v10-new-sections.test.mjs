import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createBrief, BRIEF_TRACKS, BRIEF_STAGES, BRIEF_PRIORITIES } from '../app/brief-utils.mjs';

const read = (path) => readFileSync(path, 'utf8');

test('V10 has three new navigable sections with distinct headings', () => {
  const page = read('app/page.tsx');
  const mobile = read('app/mobile-nav.tsx');
  for (const id of ['solutions', 'quality-lab', 'brief-studio']) {
    assert.equal((page.match(new RegExp(`id="${id}"`, 'g')) ?? []).length, 1, `Expected one #${id}`);
    assert.match(page, new RegExp(`href="#${id}"`));
    assert.match(mobile, new RegExp(`href="#${id}"`));
  }
  assert.match(page, /<BriefStudio\s*\/>/);
  assert.match(page, /PROJECT_LIST\.map\(\(project\) => \{/);
  assert.match(page, /project\.evidence\.slice\(0, 4\)/);
});

test('solution routes refer to real case studies and do not imply invented outcomes', () => {
  const page = read('app/page.tsx');
  for (const slug of ['eventify', 'bookhaven', 'fitflow', 'venues-api']) {
    assert.match(page, new RegExp(`slug: "${slug}"`));
  }
  assert.match(page, /href=\{`\/work\/\$\{solution\.slug\}\/`\}/);
  assert.doesNotMatch(page, /guaranteed revenue|happy clients|100% uptime/i);
});

test('brief generator validates controlled choices and normalizes free text', () => {
  assert.equal(BRIEF_TRACKS.length, 4);
  assert.equal(BRIEF_STAGES.length, 3);
  assert.ok(BRIEF_PRIORITIES.length >= 4);
  const value = createBrief({track: 'platform', stage: 'idea', priority: 'reliability', details: '  Need an API\n with retries   '});
  assert.match(value, /Platform or API/);
  assert.match(value, /Early idea/);
  assert.match(value, /Reliability and resilience/);
  assert.match(value, /Need an API with retries/);
  assert.doesNotMatch(value, /\n with/);
  assert.throws(() => createBrief({track: 'invalid', stage: 'idea', priority: 'reliability', details: ''}), /Invalid track/);
  assert.throws(() => createBrief({track: 'platform', stage: 'bad', priority: 'reliability', details: ''}), /Invalid stage/);
  assert.throws(() => createBrief({track: 'platform', stage: 'idea', priority: 'bad', details: ''}), /Invalid priority/);
});

test('brief text is bounded and does not embed markup control characters', () => {
  const output = createBrief({track: 'product', stage: 'improve', priority: 'accessibility', details: '<script> hello & good </script> '.repeat(40)});
  assert.ok(output.length < 650);
  assert.doesNotMatch(output, /<script>|<\/script>/);
  assert.match(output, /hello & good/);
});

test('brief studio has accessible labels, copy feedback and no automatic send', () => {
  const component = read('app/brief-studio.tsx');
  assert.match(component, /"use client"/);
  assert.match(component, /<label htmlFor="brief-track">/);
  assert.match(component, /<label htmlFor="brief-stage">/);
  assert.match(component, /<label htmlFor="brief-priority">/);
  assert.match(component, /aria-live="polite"/);
  assert.match(component, /navigator\.clipboard\.writeText/);
  assert.match(component, /maxLength=\{240\}/);
  assert.doesNotMatch(component, /fetch\(|localStorage|sessionStorage/);
});

test('V10 layout is responsive and desktop menu has an accessible More disclosure', () => {
  const css = read('app/home.module.css');
  const page = read('app/page.tsx');
  for (const name of ['solutionGrid', 'qualityGrid', 'briefLayout', 'navMore']) {
    assert.match(css, new RegExp(`\\.${name}\\s*\\{`));
  }
  assert.match(css, /@media\s*\(max-width:\s*800px\)[\s\S]*?\.solutionGrid\s*\{\s*grid-template-columns:\s*1fr/);
  assert.match(css, /@media\s*\(max-width:\s*800px\)[\s\S]*?\.briefLayout\s*\{\s*grid-template-columns:\s*1fr/);
  assert.match(page, /<details className=\{styles\.navMore\}(?:\s+[^>]*)?>/);
  assert.match(page, /<summary>More/);
  assert.match(css, /\.navMore summary:focus-visible/);
});

test('browser CI watches brief component and brief generator changes', () => {
  const qa = read('.github/workflows/atlas-browser-qa.yml');
  for (const file of ['app/brief-studio.tsx', 'app/brief-utils.mjs', 'app/brief-utils.d.mts', 'tests/v10-new-sections.test.mjs']) {
    assert.ok(qa.includes(`"${file}"`), `Missing ${file} in browser QA trigger`);
  }
});

test('browser acceptance plan verifies routes, evidence and brief interactions', () => {
  const browser = read('scripts/atlas-browser-qa.py');
  assert.match(browser, /solution routes should match the four real projects/);
  assert.match(browser, /quality evidence disclosure did not open/);
  assert.match(browser, /brief builder is not updating correctly/);
  assert.match(browser, /copy control provided no user feedback/);
  assert.match(browser, /desktop: missing navigation overflow disclosure/);
});
