import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';
import { request as httpRequest } from 'node:http';
import { createExportServer } from '../scripts/preview-export.mjs';

async function withPreview(action) {
  const root = mkdtempSync(join(tmpdir(), 'hajar-export-preview-'));
  mkdirSync(join(root, 'work'), { recursive: true });
  mkdirSync(join(root, '_next', 'static'), { recursive: true });
  writeFileSync(join(root, 'index.html'), '<main>HAJAR home</main>');
  writeFileSync(join(root, 'work', 'index.html'), '<main>Case studies</main>');
  writeFileSync(join(root, '_next', 'static', 'main.css'), 'body{color:black}');
  writeFileSync(join(root, 'favicon.ico'), Buffer.from([0, 1, 2, 3]));
  const server = createExportServer(root);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const origin = `http://127.0.0.1:${server.address().port}`;
  try { await action({ root, origin }); }
  finally { await new Promise(resolve => server.close(resolve)); rmSync(root, { recursive: true, force: true }); }
}

function rawRequest(origin, path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const url = new URL(origin);
    const req = httpRequest({ hostname: url.hostname, port: url.port, path, method }, res => {
      const chunks = [];
      res.on('data', x => chunks.push(x));
      res.on('end', () => resolve({ status: res.statusCode, data: Buffer.concat(chunks).toString('utf8') }));
    });
    req.on('error', reject);
    req.end();
  });
}

test('static export preview serves trailing-slash routes, static assets, and HEAD correctly', async () => {
  await withPreview(async ({ origin }) => {
    const home = await fetch(`${origin}/`);
    assert.equal(home.status, 200);
    assert.match(home.headers.get('content-type'), /text\/html/);
    assert.match(await home.text(), /HAJAR home/);
    assert.match(await (await fetch(`${origin}/work`)).text(), /Case studies/);
    assert.match(await (await fetch(`${origin}/work/`)).text(), /Case studies/);
    const asset = await fetch(`${origin}/_next/static/main.css`);
    assert.match(asset.headers.get('content-type'), /text\/css/);
    assert.match(await asset.text(), /color:black/);
    const head = await fetch(`${origin}/favicon.ico`, { method: 'HEAD' });
    assert.equal(head.status, 200);
    assert.equal(await head.text(), '');
    const missing = await fetch(`${origin}/missing`);
    assert.equal(missing.status, 404);
    assert.equal(missing.headers.get('cache-control'), 'no-store');
  });
});

test('static export preview rejects unsafe methods, traversal, and symlink escapes', async () => {
  await withPreview(async ({ root, origin }) => {
    const forbidden = await fetch(`${origin}/`, { method: 'POST' });
    assert.equal(forbidden.status, 405);
    assert.equal((await rawRequest(origin, '/%2e%2e/secrets.txt')).status, 400);
    assert.equal((await rawRequest(origin, '/%2fetc%2fpasswd')).status, 400);
    const secret = join(root, '..', 'hajar-secret-fixture.txt');
    writeFileSync(secret, 'private fixture');
    try {
      symlinkSync(secret, join(root, 'leak.txt'));
      const leak = await fetch(`${origin}/leak.txt`);
      assert.notEqual(leak.status, 200);
      assert.doesNotMatch(await leak.text(), /private fixture/);
    } finally { rmSync(secret, { force: true }); }
  });
});

test('CI separates branch review artifacts from production release artifacts', () => {
  const ci = readFileSync(new URL('../.github/workflows/ci.yml', import.meta.url), 'utf8');
  assert.match(ci, /name: Upload verified preview export/);
  assert.match(ci, /name: hajar-nextjs-preview-/);
  assert.match(ci, /if: github\.event_name != 'push' \|\| github\.ref != 'refs\/heads\/main'/);
  assert.match(ci, /if: github\.event_name == 'push' && github\.ref == 'refs\/heads\/main'/);
  assert.ok(ci.indexOf('run: npm run verify:export') < ci.indexOf('name: Upload verified preview export'));
  const browserQa = readFileSync(new URL('../.github/workflows/atlas-browser-qa.yml', import.meta.url), 'utf8');
  assert.match(browserQa, /nohup npm run preview:export -- --port 4173 --dir out/);
  assert.match(browserQa, /scripts\/preview-export\.mjs/);
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)));
  assert.equal(pkg.scripts.start, 'node scripts/preview-export.mjs');
  assert.equal(pkg.scripts['preview:export'], 'node scripts/preview-export.mjs');
});

test('manual or PR CI builds never trigger the automated production smoke workflow', () => {
  const smoke = readFileSync(new URL('../.github/workflows/production-smoke.yml', import.meta.url), 'utf8');
  assert.match(smoke, /github\.event\.workflow_run\.event == 'push'/);
  const deploy = readFileSync(new URL('../.github/workflows/netlify-deploy.yml', import.meta.url), 'utf8');
  assert.match(deploy, /github\.event\.workflow_run\.event == 'push'/);
  const ci = readFileSync(new URL('../.github/workflows/ci.yml', import.meta.url), 'utf8');
  const artifactSection = ci.split('- name: Upload deployable source')[1];
  assert.ok(artifactSection, 'A production deploy artifact is required');
  assert.match(artifactSection, /^\s+out\/\s*$/m);
  assert.match(artifactSection, /^\s+netlify\.toml\s*$/m);
  assert.doesNotMatch(artifactSection, /^\s+\.\s*$/m, 'Avoid archiving the entire repository in the deploy artifact');
});
