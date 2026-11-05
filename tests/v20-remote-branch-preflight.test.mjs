import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const cli = new URL('../scripts/prepare-review-branch.mjs', import.meta.url).pathname;
const branch = 'review/hajar-v15-5-qa-20261102';
function git(cwd,...args){const r=spawnSync('git',args,{cwd,encoding:'utf8'});assert.equal(r.status,0,`git ${args.join(' ')}: ${r.stderr}`);return r.stdout.trim()}
function setup(){
 const root=mkdtempSync(join(tmpdir(),'hajar-remote-check-'));const bare=join(root,'remote.git'),repo=join(root,'checkout'),src=join(root,'source');
 mkdirSync(repo);mkdirSync(src);git(root,'init','--bare',bare);git(repo,'init','-b','main');
 git(repo,'config','user.name','QA');git(repo,'config','user.email','qa@example.invalid');
 writeFileSync(join(repo,'README.md'),'existing');git(repo,'add','.');git(repo,'commit','-m','base');git(repo,'remote','add','origin',bare);git(repo,'push','-u','origin','main');
 git(repo,'push','origin',`HEAD:refs/heads/${branch}`);git(repo,'fetch','origin');
 writeFileSync(join(src,'package.json'),'{}');writeFileSync(join(src,'package-lock.json'),'{}');writeFileSync(join(src,'next.config.ts'),'export default {}');mkdirSync(join(src,'app'));writeFileSync(join(src,'app','page.tsx'),'export default function Home(){}');
 return {root,repo,src,bare};
}
function check(x){return spawnSync(process.execPath,[cli,'--repository',x.repo,'--source',x.src,'--branch',branch,'--check-remote'],{encoding:'utf8'})}
test('remote review preflight accepts existing branch at main commit without changing local or remote',()=>{
 const f=setup();try{const base=git(f.repo,'rev-parse','main');const r=check(f);assert.equal(r.status,0,r.stderr);assert.match(r.stdout,/Remote review branch verified/);assert.equal(git(f.repo,'rev-parse','main'),base);assert.equal(git(f.repo,'branch','--list',branch),'');}finally{rmSync(f.root,{recursive:true,force:true})}
});
test('remote review preflight fails safely if the existing review branch has diverged',()=>{
 const f=setup();try{
   git(f.repo,'switch','-c',branch,`origin/${branch}`);writeFileSync(join(f.repo,'NEW.txt'),'remote user edit');git(f.repo,'add','.');git(f.repo,'commit','-m','remote edit');git(f.repo,'push','origin',branch);git(f.repo,'switch','main');git(f.repo,'branch','-D',branch);
   const base=git(f.repo,'rev-parse','main'),r=check(f);
   assert.notEqual(r.status,0);assert.match(r.stderr,/Remote review branch differs from the base|Remote review branch has advanced/);assert.equal(git(f.repo,'rev-parse','main'),base);
 }finally{rmSync(f.root,{recursive:true,force:true})}
});
