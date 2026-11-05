import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const cmd=readFileSync(new URL('../scripts/hajar-review-windows.cmd',import.meta.url),'utf8');
const guide=readFileSync(new URL('../docs/HAJAR_V15_7_GITHUB_TRANSFER_AR.md',import.meta.url),'utf8');
test('Windows helper defaults to a read-only GitHub branch check',()=>{
 assert.match(cmd,/DRY RUN ONLY/);
 assert.match(cmd,/--check-remote\s*\r?\n/);
 assert.match(cmd,/if \/I "%~1"=="--push"/);
 assert.match(cmd,/--check-remote --apply --push/);
 assert.match(cmd,/review\/hajar-v15-5-qa-20261102/);
 assert.doesNotMatch(cmd,/git push .*main/i);
});
test('instructions distinguish GitHub branch existence from uploaded HAJAR source',()=>{
 assert.ok(guide.includes('لم تُرفع الشيفرة المصدرية'));
 assert.ok(guide.includes('hajar-review-windows.cmd --push'));
 assert.ok(guide.includes('لا ترفع ملف `Portfolio1_'));
});
