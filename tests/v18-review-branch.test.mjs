import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const cli = new URL('../scripts/prepare-review-branch.mjs', import.meta.url).pathname;
function git(root, ...args) {
  const r = spawnSync('git', ['-C', root, ...args], {encoding:'utf8'});
  assert.equal(r.status,0,`git ${args.join(' ')}: ${r.stderr}`);
  return r.stdout.trim();
}
function fixture() {
  const base=mkdtempSync(join(tmpdir(),'hajar-review-test-'));
  const repo=join(base,'repo'), src=join(base,'source');
  mkdirSync(repo);mkdirSync(src);
  git(repo,'init','-b','main');git(repo,'config','user.email','test@example.invalid');git(repo,'config','user.name','Test');
  writeFileSync(join(repo,'old.txt'),'old current site');
  git(repo,'add','.');git(repo,'commit','-m','Existing website');
  writeFileSync(join(src,'package.json'),JSON.stringify({name:'hajar'}));
  writeFileSync(join(src,'package-lock.json'),JSON.stringify({name:'hajar',lockfileVersion:3}));
  writeFileSync(join(src,'next.config.ts'),'export default {output:"export"};');
  mkdirSync(join(src,'app'));writeFileSync(join(src,'app','page.tsx'),'export default function Home(){return "HAJAR"}');
  mkdirSync(join(src,'public'));writeFileSync(join(src,'public','index.txt'),'safe');
  writeFileSync(join(src,'.env.local'),'SECRET=not-for-public');
  writeFileSync(join(src,'credentials.json'),'private');
  mkdirSync(join(src,'Instagram_Internal'));writeFileSync(join(src,'Instagram_Internal','schedule.json'),'private schedule');
  return {base,repo,src};
}
function run({repo,src}, ...flags){return spawnSync(process.execPath,[cli,'--repository',repo,'--source',src,'--branch','review/hajar-qa',...flags],{encoding:'utf8'});}

test('review staging defaults to dry-run, leaving main and worktree unchanged',()=>{
  const f=fixture();try {
    const sha=git(f.repo,'rev-parse','main'); const r=run(f);
    assert.equal(r.status,0,r.stderr);assert.match(r.stdout,/DRY RUN/);
    assert.equal(git(f.repo,'rev-parse','main'),sha);
    assert.equal(git(f.repo,'branch','--list','review/hajar-qa'),'');
    assert.equal(readdirSync(f.base).filter(x=>x.startsWith('hajar-review-')).length,0);
  }finally{rmSync(f.base,{recursive:true,force:true})}
});

test('apply commits safe source onto isolated branch while main stays unchanged',()=>{
  const f=fixture();try {
    const main=git(f.repo,'rev-parse','main'); const r=run(f,'--apply');
    assert.equal(r.status,0,r.stderr);
    const review=git(f.repo,'rev-parse','review/hajar-qa');assert.notEqual(review,main);
    assert.equal(git(f.repo,'rev-parse','main'),main);
    const staged=join(f.base,'hajar-review-review-hajar-qa');
    assert.ok(existsSync(join(staged,'app/page.tsx')));
    assert.ok(existsSync(join(staged,'public/index.txt')));
    assert.ok(!existsSync(join(staged,'old.txt')));
    assert.ok(!existsSync(join(staged,'.env.local')));
    assert.ok(!existsSync(join(staged,'credentials.json')));
    assert.ok(!existsSync(join(staged,'Instagram_Internal')));
    assert.equal(readFileSync(join(f.repo,'old.txt'),'utf8'),'old current site');
    assert.equal(git(f.repo,'status','--porcelain'),'');
  }finally{rmSync(f.base,{recursive:true,force:true})}
});

test('branch name and source validation block dangerous requests',()=>{
  const f=fixture();try {
    assert.notEqual(run(f,'--branch','main','--apply').status,0);
    assert.notEqual(run(f,'--branch','../main','--apply').status,0);
    assert.notEqual(run(f,'--push').status,0);
    rmSync(join(f.src,'next.config.ts'));
    assert.notEqual(run(f,'--apply').status,0);
    assert.equal(git(f.repo,'branch','--list','review/hajar-qa'),'');
  }finally{rmSync(f.base,{recursive:true,force:true})}
});

test('review preparation command is documented in npm scripts',()=>{
  const pkg=JSON.parse(readFileSync(new URL('../package.json',import.meta.url),'utf8'));
  assert.equal(pkg.scripts['review:prepare'],'node scripts/prepare-review-branch.mjs');
});

test('review staging never includes internal Instagram files or environment files in nested directories',()=>{
  const f=fixture();try {
    writeFileSync(join(f.src,'app','.env.production'),'PASSWORD=secret');
    mkdirSync(join(f.src,'public','Instagram_Campaign'));
    writeFileSync(join(f.src,'public','Instagram_Campaign','schedule.json'),'unpublished');
    writeFileSync(join(f.src,'public','access_token.json'),'secret');
    const r=run(f,'--apply');assert.equal(r.status,0,r.stderr);
    const staged=join(f.base,'hajar-review-review-hajar-qa');
    assert.ok(!existsSync(join(staged,'app','.env.production')));
    assert.ok(!existsSync(join(staged,'public','Instagram_Campaign')));
    assert.ok(!existsSync(join(staged,'public','access_token.json')));
    assert.ok(existsSync(join(staged,'app','page.tsx')));
  }finally{rmSync(f.base,{recursive:true,force:true})}
});
