import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { serializeJsonLd } from '../app/json-ld.mjs';

test('structured data safely escapes HTML script boundaries while preserving JSON values', () => {
  const input = {
    name: 'Test </script><script>alert("x")</script>',
    note: 'A&B < C > D',
    separators: 'line\u2028paragraph\u2029',
  };
  const output = serializeJsonLd(input);
  assert.doesNotMatch(output, /<|>|&|\u2028|\u2029/u);
  assert.deepEqual(JSON.parse(output), input);
});

test('all emitted JSON-LD blocks use the safe serializer', () => {
  for (const file of ['app/layout.tsx', 'app/work/[slug]/page.tsx']) {
    const source = readFileSync(file, 'utf8');
    assert.match(source, /serializeJsonLd\(data\)/);
    assert.doesNotMatch(source, /__html:\s*JSON\.stringify\(data\)/);
  }
});
