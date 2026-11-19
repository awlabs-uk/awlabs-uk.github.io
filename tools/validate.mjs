import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const expected = "google.com, pub-4480134787985012, DIRECT, f08c47fec0942fa0";
assert.deepEqual(
  readFileSync(resolve(root, "app-ads.txt")),
  Buffer.from(expected, "utf8"),
);
for (const name of [
  "index.html",
  "vice-guide/index.html",
  "privacy/index.html",
]) {
  const html = readFileSync(resolve(root, name), "utf8");
  assert.match(html, /<!doctype html>/i);
  assert.match(html, /<html lang="en">/);
  assert.match(html, /name="viewport"/);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
  assert.equal((html.match(/<main[ >]/g) || []).length, 1);
  assert.match(html, /id="main"/);
  assert.match(html, /aria-label="Main navigation"/);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    let target = match[1];
    if (target.startsWith("https:") || target.startsWith("#")) continue;
    assert.ok(target.startsWith("/"), "Use root-relative local links");
    target = target.split("#")[0];
    if (target.endsWith("/")) target += "index.html";
    assert.ok(
      existsSync(resolve(root, "." + target)),
      "Missing link " + target,
    );
  }
  assert.ok(!/mailto:|firebase|service_account|PRIVATE KEY/i.test(html));
  console.log("PASS: structure and local links: " + name);
}
console.log(
  "PASS: exact app-ads.txt bytes, no BOM/newline/HTML; no external scripts, fonts or personal contact details.",
);
