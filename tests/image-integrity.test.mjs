import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const imageFiles = ['eventify-cover.jpg', 'bookhaven-cover.jpg'];

// This is a header/structure regression guard, not a complete JPEG decoder.
function imageDimensions(buffer) {
  assert.equal(buffer.readUInt16BE(0), 0xffd8, 'JPEG SOI is missing');
  let offset = 2;
  while (offset < buffer.length - 4) {
    if (buffer[offset] !== 0xff) throw new Error(`Unexpected byte before JPEG marker at ${offset}`);
    while (buffer[offset] === 0xff) offset++;
    const marker = buffer[offset++];
    if (marker === 0xda) throw new Error('JPEG reached scan data without a valid frame header');
    if (marker === 0xd9) break;
    if (marker >= 0xd0 && marker <= 0xd7 || marker === 0x01) continue;
    const length = buffer.readUInt16BE(offset);
    if (length < 2 || offset + length > buffer.length) throw new Error('JPEG segment is truncated');
    if ([0xc0, 0xc1, 0xc2, 0xc3].includes(marker)) {
      return [buffer.readUInt16BE(offset + 3), buffer.readUInt16BE(offset + 5)];
    }
    offset += length;
  }
  throw new Error('JPEG frame header is missing');
}

test('featured project covers are valid, dimensioned JPEGs and not broken placeholders', () => {
  for (const name of imageFiles) {
    const binary = readFileSync(join('public', 'projects', name));
    const [height, width] = imageDimensions(binary);
    assert.ok(width >= 900, `${name} width too small: ${width}`);
    assert.ok(height >= 470, `${name} height too small: ${height}`);
    assert.equal(binary.readUInt16BE(binary.length - 2), 0xffd9, `${name} EOI is missing`);
  }
});
