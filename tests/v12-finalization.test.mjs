import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (path) => readFileSync(path, 'utf8');

test('desktop More menu dismisses on selection, Escape and outside click', () => {
  const page = read('app/page.tsx');
  const behavior = read('app/nav-more-control.tsx');
  assert.match(page, /<details className=\{styles\.navMore\} data-desktop-more>/);
  assert.match(page, /<NavMoreControl\s*\/>/);
  assert.match(behavior, /"use client"/);
  assert.match(behavior, /event\.key === "Escape"/);
  assert.match(behavior, /addEventListener\("pointerdown"/);
  assert.match(behavior, /addEventListener\("click"/);
  assert.match(behavior, /\.open = false/);
});

test('mobile navigation is grouped and keeps the most important routes visible', () => {
  const mobile = read('app/mobile-nav.tsx');
  for (const group of ['Featured', 'Engineering', 'Connect']) {
    assert.match(mobile, new RegExp(`>${group}<`));
  }
  for (const id of ['work', 'explorer', 'brief-studio', 'contact']) {
    assert.match(mobile, new RegExp(`href="#${id}"`));
  }
});

test('long navigation disclosures are constrained to the viewport', () => {
  const css = read('app/home.module.css');
  assert.match(css, /\.navMorePanel\s*\{[^}]*max-height:\s*min\(/);
  assert.match(css, /\.navMorePanel\s*\{[^}]*overflow-y:\s*auto/);
  assert.match(css, /\.mobileMenu nav\s*\{[^}]*max-height:/);
});

test('brief preview provides read-only selectable text and a keyboard clipboard fallback', () => {
  const brief = read('app/brief-studio.tsx');
  assert.match(brief, /useRef<\s*HTMLTextAreaElement\s*>/);
  assert.match(brief, /readOnly/);
  assert.match(brief, /aria-label="Generated project brief"/);
  assert.match(brief, /\.select\(\)/);
  assert.match(brief, /Ctrl\+C/);
  assert.match(brief, /role="status"/);
});

test('browser acceptance reads the editable brief value and verifies More dismissal', () => {
  const qa = read('scripts/atlas-browser-qa.py');
  assert.match(qa, /studio\.locator\("#brief-preview"\)\.input_value\(\)/);
  assert.match(qa, /Escape did not dismiss More navigation/);
  assert.match(qa, /clicking outside did not dismiss More navigation/);
});

test('the browser QA workflow watches new client navigation and brief improvements', () => {
  const workflow = read('.github/workflows/atlas-browser-qa.yml');
  for (const path of ['app/nav-more-control.tsx', 'tests/v12-finalization.test.mjs']) {
    assert.ok(workflow.includes(`"${path}"`), `Missing browser QA watch entry: ${path}`);
  }
});

test('release verification command must gate shipping on tests, lint, types, build, and export', () => {
  const pkg = JSON.parse(read('package.json'));
  const command = pkg.scripts['check:release'];
  assert.ok(command, 'Missing check:release');
  for (const step of ['test:ui', 'lint', 'typecheck', 'build', 'verify:export']) {
    assert.ok(command.includes(`npm run ${step}`), `Missing ${step} from release command`);
  }
  assert.ok(!/deploy|publish|push/.test(command), 'Release verification must not deploy anything');
});
