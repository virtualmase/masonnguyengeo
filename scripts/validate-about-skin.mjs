import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const html = readFileSync(resolve(root, "about/index.html"), "utf8");
assert.match(html, /<body\s+class="geo-pillar about-page"(?:\s+[^>]*)?>/, "Missing required body class: geo-pillar about-page.");
const css = readFileSync(resolve(root, "assets/about.css"), "utf8");

for (const token of [
  '<link rel="canonical" href="https://masonnguyengeo.com/about">',
  '"@type": "AboutPage"',
  '<link rel="stylesheet" href="/assets/site.css">',
  '<link rel="stylesheet" href="/assets/what-is-geo.css">',
  '<link rel="stylesheet" href="/assets/about.css">',
  'Every resource on this page is a non-affiliate external link.',
  'influences, not endorsers, partners, clients, or affiliates',
  'https://sparktoro.com/team/rand',
  'https://drjoedispenza.com/collections/books',
]) {
  assert.ok(html.includes(token), `Missing required About route markup: ${token}`);
}

for (const token of [".about-page", ".content-body", ".page-cta", "@media (max-width: 768px)"]) {
  assert.ok(css.includes(token), `Missing route-scoped About skin treatment: ${token}`);
}

console.log("About route skin validation passed.");
