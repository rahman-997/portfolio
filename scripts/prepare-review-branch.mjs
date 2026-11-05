#!/usr/bin/env node
/**
 * Stage a HAJAR portfolio source snapshot into an isolated Git worktree/branch.
 * Defaults to a no-write dry run; --apply writes locally, --push is explicit.
 * Never modifies main, publishes to production, or copies Instagram planning.
 */
import { existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, rmSync, copyFileSync } from 'node:fs';
import { resolve, join, dirname, relative, sep } from 'node:path';
import { spawnSync } from 'node:child_process';

const rootFiles = new Set([
  '.gitignore', '.node-version', 'DELIVERY_NOTES.md', 'LICENSE', 'README.md', 'SECURITY.md',
  'eslint.config.mjs', 'netlify.toml', 'next.config.ts', 'package-lock.json', 'package.json',
  'postcss.config.mjs', 'render.yaml', 'tsconfig.json',
]);
const rootFolders = new Set(['.github', 'app', 'docs', 'public', 'scripts', 'tests']);
const blockedPart = /^(?:\.git|\.next|node_modules|out|dist|build|coverage|instagram.*|.*(?:_internal|_private)|\.env(?:\..*)?|.*(?:secret|credential|token|password|private.?key).*|.*\.pem|.*\.key|\.npmrc)$/i;
const safeBranch = /^review\/hajar-[a-z0-9]+(?:-[a-z0-9]+)*$/;

function fail(message) { throw new Error(message); }
function cmd(cwd, program, args) {
  const r=spawnSync(program,args,{cwd,encoding:'utf8',maxBuffer:10*1024*1024});
  if(r.status!==0) fail(`${program} ${args.join(' ')} failed: ${(r.stderr||r.stdout).trim()}`);
  return r.stdout.trim();
}
function filesForRelease(source) {
  const files=[];
  function walk(folder) {
    for(const entry of readdirSync(folder,{withFileTypes:true})) {
      const path=join(folder,entry.name), rel=relative(source,path),parts=rel.split(sep);
      if (parts.some(part=>blockedPart.test(part))) continue;
      const stat=lstatSync(path);
      if(stat.isSymbolicLink()) fail(`Symlinks are not allowed in release sources: ${rel}`);
      if(stat.isDirectory()) walk(path);
      else if(stat.isFile()) {
        if(stat.size>25*1024*1024) fail(`File exceeds 25 MB: ${rel}`);
        files.push(rel);
      }
    }
  }
  for(const name of [...rootFiles,...rootFolders].sort()) {
    const full=join(source,name);
    if(!existsSync(full)) continue;
    const rootStat=lstatSync(full);
    if(rootStat.isSymbolicLink()) fail(`Symlinks are not allowed in release sources: ${name}`);
    if(rootFolders.has(name)) {
      if(!rootStat.isDirectory()) fail(`Expected a directory: ${name}`);
      walk(full);
    } else if(rootStat.isFile()) files.push(name);
  }
  files.sort();
  return files;
}
function parse(args) {
  const opts={apply:false,push:false,checkRemote:false,branch:'review/hajar-v15-5-qa-20261102',source:process.cwd()};
  for(let i=0;i<args.length;i++) {
    if(args[i]==='--apply') opts.apply=true;
    else if(args[i]==='--push') opts.push=true;
    else if(args[i]==='--check-remote') opts.checkRemote=true;
    else if(['--repository','--source','--branch'].includes(args[i])) {
      if(!args[i+1]) fail(`${args[i]} needs a value`);
      opts[args[i].slice(2)]=args[++i];
    } else fail(`Unknown argument ${args[i]}`);
  }
  if(!opts.repository) fail('--repository path is required');
  if(!safeBranch.test(opts.branch)) fail('Only review/hajar-* branch names are allowed');
  if(opts.push&&!opts.apply) fail('--push requires --apply');
  opts.repository=resolve(opts.repository);opts.source=resolve(opts.source);
  if(opts.repository===opts.source) fail('Source and Git checkout must be separate');
  return opts;
}

function run() {
  const opts=parse(process.argv.slice(2));
  if(!existsSync(join(opts.source,'package.json'))||!existsSync(join(opts.source,'next.config.ts'))) {
    fail('Source must point directly to the HAJAR Next.js project root');
  }
  if(!existsSync(join(opts.repository,'.git'))) fail('Repository must be an independent local Git checkout');
  if(cmd(opts.repository,'git',['rev-parse','--is-inside-work-tree'])!=='true') fail('Invalid Git checkout');
  if(cmd(opts.repository,'git',['status','--porcelain'])) fail('Git checkout has uncommitted changes');
  // Read refs without moving main or fetching from the network.
  const hasRemoteMain=spawnSync('git',['-C',opts.repository,'show-ref','--verify','--quiet','refs/remotes/origin/main']).status===0;
  const chosenBase=hasRemoteMain?'refs/remotes/origin/main':'refs/heads/main';
  cmd(opts.repository,'git',['rev-parse','--verify',chosenBase]);
  if(opts.push || opts.checkRemote) {
    const r=spawnSync('git',['ls-remote','--heads','origin',`refs/heads/${opts.branch}`],
      {cwd:opts.repository,encoding:'utf8',env:{...process.env,GIT_TERMINAL_PROMPT:'0'}});
    if(r.status!==0) fail('Cannot inspect remote review branch; verify GitHub access and origin');
    const remoteSha=r.stdout.trim().split(/\s+/)[0] || null;
    if(!remoteSha) fail(`Remote review branch does not exist: ${opts.branch}`);
    const baseSha=cmd(opts.repository,'git',['rev-parse',chosenBase]);
    if(remoteSha!==baseSha) fail(`Remote review branch differs from the base: expected ${baseSha}, found ${remoteSha}. Refusing to overwrite remote changes.`);
    console.log(`Remote review branch verified: ${opts.branch} at ${remoteSha}`);
  }
  const files=filesForRelease(opts.source);
  if(!files.includes('app/page.tsx')||!files.includes('package-lock.json')) fail('Incomplete portfolio source: missing homepage or lockfile');
  const destination=join(dirname(opts.repository),`hajar-review-${opts.branch.replaceAll('/','-')}`);
  if(existsSync(destination)) fail(`Refusing to overwrite existing worktree: ${destination}`);
  if(spawnSync('git',['-C',opts.repository,'show-ref','--verify','--quiet',`refs/heads/${opts.branch}`]).status===0) {
    fail(`Review branch already exists: ${opts.branch}`);
  }
  console.log(`${opts.apply?'APPLY':'DRY RUN'}: ${files.length} approved files from ${opts.source}`);
  console.log(`Review branch: ${opts.branch}\nBase: ${chosenBase}\nWorktree: ${destination}`);
  if(!opts.apply) {console.log('No files, branches, or remotes changed.');return;}
  if(opts.push) {
    const remote=cmd(opts.repository,'git',['remote','get-url','origin']);
    if(!/^(?:https:\/\/github\.com\/rahman-997\/portfolio(?:\.git)?|git@github\.com:rahman-997\/portfolio(?:\.git)?)$/.test(remote)) {
      fail('Pushing is permitted only to github.com/rahman-997/portfolio');
    }
  }
  cmd(opts.repository,'git',['worktree','add','-b',opts.branch,destination,chosenBase]);
  // Replace files only inside the newly created worktree, never the existing checkout.
  for(const file of cmd(destination,'git',['ls-files','-z']).split('\0').filter(Boolean)) {
    rmSync(join(destination,file),{force:true,recursive:true});
  }
  for(const file of files) {
    const dest=join(destination,file);
    mkdirSync(dirname(dest),{recursive:true});
    copyFileSync(join(opts.source,file),dest);
  }
  cmd(destination,'git',['add','-A']);
  if(!cmd(destination,'git',['diff','--cached','--name-only'])) fail('No changes to stage');
  cmd(destination,'git',['commit','-m','chore(review): stage HAJAR portfolio source and CI checks']);
  console.log('Created review commit '+cmd(destination,'git',['rev-parse','--short','HEAD']));
  if(opts.push) {
    cmd(destination,'git',['push','-u','origin',opts.branch]);
    console.log(`Pushed isolated review branch ${opts.branch}. main was not updated.`);
  } else console.log('Local-only. To explicitly push, use --apply --push on a fresh checkout.');
}
try {run();}catch(error){console.error('Review preparation failed:',error.message);process.exitCode=1;}
