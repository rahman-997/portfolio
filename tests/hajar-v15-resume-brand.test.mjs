import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../public/resume.html', import.meta.url), 'utf8');

test('standalone printable résumé uses HAJAR champagne palette rather than old green', () => {
  assert.match(html, /--accent:#745131/i);
  assert.doesNotMatch(html, /--accent:#19713b/i);
  assert.match(html, /<h1>Abdulrahman Hajar<\/h1>/);
});
