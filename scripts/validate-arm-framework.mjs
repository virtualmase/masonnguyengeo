import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const html = readFileSync(resolve(root, "arm-framework/index.html"), "utf8");
const css = readFileSync(resolve(root, "assets/arm-framework.css"), "utf8");

for (const token of [
  '<link rel="canonical" href="https://masonnguyengeo.com/arm-framework">',
  '<meta name="robots" content="noindex, follow">',
  '<link rel="stylesheet" href="/assets/site.css">',
  '<link rel="stylesheet" href="/assets/what-is-geo.css">',
  '<link rel="stylesheet" href="/assets/arm-framework.css">',
  '<body class="geo-pillar arm-framework-page">',
  '<header class="method-hero">',
  'SCAFFOLD — Content in progress.',
  '"@type": "Article"',
  '"@type": "FAQPage"',
  'href="/what-is-geo"',
  'href="/ai-visibility-strategy"',
  'href="https://swellmarketing.xyz"',
]) {
  assert.ok(html.includes(token), `Missing required ARM Framework markup: ${token}`);
}

for (const token of [".arm-framework-page", ".method-hero", ".method-content", "@media (max-width: 768px)"]) {
  assert.ok(css.includes(token), `Missing route-scoped ARM skin treatment: ${token}`);
}

assert.ok(!css.includes("body:not(.arm-framework-page)"), "ARM stylesheet must not target unrelated routes.");
console.log("ARM Framework route validation passed.");
