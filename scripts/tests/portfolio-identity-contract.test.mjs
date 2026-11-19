import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const file = (path) => readFileSync(new URL("../../" + path, import.meta.url), "utf8");

test("professional role is led by Computer Engineering in EN/AR/TR", () => {
  const source = file("app/experience/locale.ts");
  for (const expected of [
    'role: "Computer Engineer · Full-Stack Developer", brandRole: "COMPUTER ENGINEER"',
    'role: "مهندس كمبيوتر · مطوّر برمجيات متكامل", brandRole: "مهندس كمبيوتر"',
    'role: "Bilgisayar Mühendisi · Full-Stack Geliştirici", brandRole: "BİLGİSAYAR MÜHENDİSİ"',
    "أنا عبد الرحمن حجار"
  ]) assert.ok(source.includes(expected), "Missing identity value: " + expected);
});

test("header and footer share one localized brand-role source", () => {
  const source = file("app/experience/PortfolioExperience.tsx");
  assert.equal(source.split("<small>{t.brandRole}</small>").length - 1, 2);
  assert.ok(!source.includes("YAZILIM MÜHENDİSİ"), "Outdated primary title remains in brand");
});

test("SEO and structured Person data lead with Computer Engineer without dropping software skills", () => {
  const source = file("app/layout.tsx");
  assert.ok(source.includes("Abdulrahman Hajar | Computer Engineer & Full-Stack Developer"));
  assert.ok(source.includes('jobTitle: "Computer Engineer · Full-Stack Developer · Software Engineer"'));
  assert.ok(source.includes('"Software Engineer"'), "Keep software-engineering discoverability");
  const arabic = file("app/ar/page.tsx");
  assert.ok(arabic.includes("عبد الرحمن حجار"));
  assert.ok(!arabic.includes("عبدالرحمن حجار"));
});

test("online résumé identity matches the portfolio without inflating qualifications", () => {
  const source = file("app/resume/page.tsx");
  assert.ok(source.includes("COMPUTER ENGINEER · FULL-STACK DEVELOPER · SOFTWARE ENGINEER"));
  assert.ok(source.includes("Computer Engineering · Nişantaşı University"));
  assert.ok(source.includes("Computer Engineer · Full-Stack Developer · Software Engineer"));
});

test("CI export verification inspects localized published role and résumé", () => {
  const pkg = JSON.parse(file("package.json"));
  assert.ok(pkg.scripts["verify:export"].includes("node scripts/verify-professional-identity.mjs"));
  const verification = file("scripts/verify-professional-identity.mjs");
  for (const language of ["en", "ar", "tr"]) assert.ok(verification.includes('locale:"' + language + '"'));
  assert.ok(verification.includes('roleCount === 2'));
});


test("downloadable PDF metadata matches the verified Computer Engineer identity", () => {
  const data = readFileSync(new URL("../../public/Abdulrahman-Hajar-Resume.pdf", import.meta.url));
  const pdf = data.toString("latin1");
  assert.equal(data.subarray(0, 5).toString("latin1"), "%PDF-");
  assert.match(pdf, /\/Title \(Abdulrahman Hajar - Computer Engineer Resume\)/);
  assert.doesNotMatch(pdf, /\/Title \(Abdulrahman Hajar - Software Engineer Resume\)/);
  assert.match(pdf, /\/URI \(https:\/\/github\.com\/rahman-997\)/);
  assert.match(pdf, /\/URI \(https:\/\/www\.linkedin\.com\/in\//);
});
