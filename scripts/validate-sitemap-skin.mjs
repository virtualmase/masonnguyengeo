import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const html = readFileSync(resolve(root, "sitemap/index.html"), "utf8");
assert.match(html, /<body\s+class="geo-pillar sitemap-directory"(?:\s+[^>]*)?>/, "Missing required body class: geo-pillar sitemap-directory.");
const css = readFileSync(resolve(root, "assets/sitemap.css"), "utf8");

for (const token of [
  '<link rel="canonical" href="https://masonnguyengeo.com/sitemap">',
  '"@type": "WebPage"',
  '<link rel="stylesheet" href="/assets/what-is-geo.css">',
  '<link rel="stylesheet" href="/assets/sitemap.css">',
  'href="/intelligence-infrastructure"',
  'href="/llms.txt"',
  'href="/robots.txt"',
  'href="/schema.json"',
  'href="/sitemap.xml"',
]) assert.ok(html.includes(token), `Missing required sitemap markup: ${token}`);

for (const token of [".sitemap-directory", ".sitemap-group", ".sitemap-list", "@media (max-width: 768px)"]) assert.ok(css.includes(token), `Missing sitemap treatment: ${token}`);
console.log("Sitemap route validation passed.");
