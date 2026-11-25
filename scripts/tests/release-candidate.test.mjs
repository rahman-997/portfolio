import {test} from "node:test";
import assert from "node:assert/strict";
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from "node:fs";
import {join,dirname} from "node:path";
import {tmpdir} from "node:os";
import {inventoryExport,verifyInventory} from "../release-candidate.mjs";

const SHA="a".repeat(40);
const required=["index.html","ar/index.html","tr/index.html","404.html","resume/index.html","work/fitflow/index.html","work/mizan/index.html","work/bookhaven/index.html","work/eventify/index.html","work/venues-api/index.html","briefs/project-brief-en.txt","briefs/project-brief-ar.txt","briefs/project-brief-tr.txt","Abdulrahman-Hajar-Frontend-Resume.pdf","robots.txt","sitemap.xml","manifest.webmanifest"];
function fixture(t){
  const root=mkdtempSync(join(tmpdir(),"portfolio-release-"));
  t.after(()=>rmSync(root,{recursive:true,force:true}));
  for(const path of required){
    const full=join(root,path);mkdirSync(dirname(full),{recursive:true});
    writeFileSync(full,'<body data-deploy-commit="'+SHA+'">test</body>');
  }
  return root;
}
test("inventory is reproducible and verifies exact export",t=>{
  const root=fixture(t),manifest=inventoryExport(root,SHA);
  assert.equal(manifest.fileCount,required.length);
  assert.deepEqual(verifyInventory(root,manifest),manifest);
});
test("modified and extra files fail verification",t=>{
  const root=fixture(t),manifest=inventoryExport(root,SHA);
  writeFileSync(join(root,"robots.txt"),"changed");
  assert.throws(()=>verifyInventory(root,manifest),/inventory mismatch/);
  writeFileSync(join(root,"robots.txt"),'<body data-deploy-commit="'+SHA+'">test</body>');
  writeFileSync(join(root,"extra.txt"),"unexpected");
  assert.throws(()=>verifyInventory(root,manifest),/inventory mismatch/);
});
test("missing required files, secret-looking files and incorrect SHA fail",t=>{
  const root=fixture(t);
  assert.throws(()=>inventoryExport(root,"b".repeat(40)),/Commit marker mismatch/);
  writeFileSync(join(root,".env.local"),"dummy");
  assert.throws(()=>inventoryExport(root,SHA),/Forbidden release file/);
  rmSync(join(root,".env.local"));rmSync(join(root,"briefs/project-brief-ar.txt"));
  assert.throws(()=>inventoryExport(root,SHA),/Required release file missing/);
});
