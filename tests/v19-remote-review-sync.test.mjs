import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const script = readFileSync(new URL('../scripts/prepare-review-branch.mjs', import.meta.url), 'utf8');
const guide = readFileSync(new URL('../docs/HAJAR_V15_5_REVIEW_RELEASE_AR.md', import.meta.url), 'utf8');
const branch = 'review/hajar-v15-5-qa-20261102';

test('review script defaults to the isolated GitHub review branch', () => {
  assert.match(script, /branch:'review\/hajar-v15-5-qa-20261102'/);
});

test('documentation matches the actual review branch and explicitly distinguishes branch from deployed source', () => {
  assert.ok(guide.includes(branch));
  assert.ok(guide.includes('لا يحتوي بعد على ملفات V15.5'));
  assert.ok(!guide.includes('review/hajar-v15-5-qa --'));
});

test('review staging rejects a symbolic link at an approved root folder', async () => {
  const { mkdtempSync, mkdirSync, writeFileSync, rmSync, symlinkSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const { spawnSync } = await import('node:child_process');
  const base = mkdtempSync(join(tmpdir(), 'hajar-root-link-'));
  try {
    const repo = join(base, 'checkout'); const source = join(base, 'source'); const outside = join(base, 'outside');
    for (const dir of [repo, source, outside]) mkdirSync(dir);
    for (const args of [['init', '-b', 'main'], ['config', 'user.name', 'Test'], ['config', 'user.email', 'test@example.invalid']]) {
      assert.equal(spawnSync('git', args, { cwd: repo }).status, 0);
    }
    writeFileSync(join(repo, 'README.md'), 'Original');
    for (const args of [['add', '.'], ['commit', '-m', 'baseline']]) assert.equal(spawnSync('git', args, { cwd: repo }).status, 0);
    writeFileSync(join(source, 'package.json'), '{}');
    writeFileSync(join(source, 'package-lock.json'), '{}');
    writeFileSync(join(source, 'next.config.ts'), 'export default {};');
    writeFileSync(join(outside, 'page.tsx'), 'secret content outside source');
    symlinkSync(outside, join(source, 'app'), 'dir');
    const scriptPath = new URL('../scripts/prepare-review-branch.mjs', import.meta.url).pathname;
    const result = spawnSync(process.execPath, [scriptPath, '--repository', repo, '--source', source], { encoding: 'utf8' });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Symlinks are not allowed/);
  } finally {
    rmSync(base, { recursive: true, force: true });
  }
});
