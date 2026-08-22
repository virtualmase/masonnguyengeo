import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const html = readFileSync(resolve(root, "what-is-geo/index.html"), "utf8");
const css = readFileSync(resolve(root, "assets/what-is-geo.css"), "utf8");

const requiredMarkup = [
  '<link rel="canonical" href="https://masonnguyengeo.com/what-is-geo">',
  '<link rel="stylesheet" href="/assets/site.css">',
  '<link rel="stylesheet" href="/assets/what-is-geo.css">',
  '"@type": "Article"',
  '"@type": "FAQPage"',
  'What is Generative Engine Optimization?',
  'href="/arm-framework"',
  'href="/ai-visibility-strategy"',
  'href="/seo-for-ai-brands"',
  'href="tel:+19705798489"',
  '<meta name="base:app_id" content="6a1834c7660a3f727dea7030">',
  '<meta name="base:app_id" content="6a0ada777abfff0aca7b16f5">',
];

for (const token of requiredMarkup) {
  assert.ok(html.includes(token), `Missing required What Is GEO markup: ${token}`);
}

assert.match(html, /<body\s+class="geo-pillar"(?:\s+[^>]*)?>/, "Missing required What Is GEO body class.");

for (const token of [".geo-pillar", ":focus-visible", "prefers-reduced-motion", ".hero h1", ".definition-block"]) {
  assert.ok(css.includes(token), `Missing route-scoped visual safeguard: ${token}`);
}

assert.ok(!css.includes("body:not(.geo-pillar)"), "Route override must not target unrelated legacy pages.");

console.log("What Is GEO route validation passed.");
