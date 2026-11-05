import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const ci = read('.github/workflows/ci.yml');
const browser = read('.github/workflows/atlas-browser-qa.yml');
const driver = read('scripts/atlas-browser-qa.py');

for (const [name, workflow] of [['release', ci], ['standalone browser QA', browser]]) {
  test(`${name} installs a pinned Playwright browser before using the test driver`, () => {
    assert.match(workflow, /playwright==1\.56\.0/);
    const provision = workflow.indexOf('python3 -m playwright install --with-deps chromium');
    const execute = workflow.indexOf('python3 scripts/atlas-browser-qa.py');
    assert.ok(provision >= 0, 'Install the actual Chromium binary, not just the Python package');
    assert.ok(provision < execute, 'Install the browser before running acceptance tests');
  });
}

test('browser driver defaults to explicitly installed Playwright Chromium and permits a local executable override', () => {
  assert.match(driver, /os\.environ\.get\("ATLAS_CHROMIUM_PATH"\)/);
  assert.match(driver, /playwright\.chromium\.launch\(headless=True, \*\*launch_config\)/);
  assert.doesNotMatch(driver, /\{"channel": "chrome"\}/);
});
