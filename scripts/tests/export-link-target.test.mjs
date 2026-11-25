import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { internalTargetExists } from "../export-link-target.mjs";

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), "portfolio-links-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const directory of ["work/valid", "work/empty", "fake.pdf", "work/bad/index.html"]) {
    mkdirSync(join(root, directory), { recursive: true });
  }
  for (const file of ["index.html", "work/valid/index.html", "resume.pdf", "opengraph-image"]) {
    writeFileSync(join(root, file), "synthetic");
  }
  return root;
}

test("accepts exported root, route, file and extensionless asset", t => {
  const root = fixture(t);
  for (const href of ["/", "/work/valid", "/work/valid/", "/resume.pdf?download=1#page=1", "/opengraph-image"]) {
    assert.equal(internalTargetExists(root, href), true, href);
  }
});

test("rejects missing files and empty directories with or without trailing slash", t => {
  const root = fixture(t);
  for (const href of ["/missing", "/work/empty", "/work/empty/", "/absent.pdf"]) {
    assert.equal(internalTargetExists(root, href), false, href);
  }
});

test("rejects directories masquerading as a file or route index", t => {
  const root = fixture(t);
  for (const href of ["/fake.pdf", "/work/bad", "/work/bad/"]) {
    assert.equal(internalTargetExists(root, href), false, href);
  }
});

test("does not interpret external protocol-relative URLs as export paths", t => {
  const root = fixture(t);
  assert.equal(internalTargetExists(root, "//cdn.example.test/file.css"), true);
});
