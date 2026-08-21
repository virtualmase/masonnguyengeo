import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const html = readFileSync(resolve(root, "ai-visibility-strategy/index.html"), "utf8");
const css = readFileSync(resolve(root, "assets/ai-visibility.css"), "utf8");

for (const token of [
  '<link rel="canonical" href="https://masonnguyengeo.com/ai-visibility-strategy">',
  '<meta name="robots" content="noindex, follow">',
  '<link rel="stylesheet" href="/assets/site.css">',
  '<link rel="stylesheet" href="/assets/what-is-geo.css">',
  '<link rel="stylesheet" href="/assets/ai-visibility.css">',
  '<body class="geo-pillar ai-visibility-page">',
  '<header class="signal-hero">',
  'SCAFFOLD — Content in progress.',
  '"@type": "Article"',
  '"@type": "FAQPage"',
  'href="/what-is-geo"',
  'href="/arm-framework"',
  'href="/knowledge-graph-authority"',
  'href="https://swellmarketing.xyz"',
]) {
  assert.ok(html.includes(token), `Missing required AI Visibility markup: ${token}`);
}

for (const token of [".ai-visibility-page", ".signal-hero", ".signal-content", "@media (max-width: 768px)"]) {
  assert.ok(css.includes(token), `Missing route-scoped AI Visibility skin treatment: ${token}`);
}

assert.ok(!css.includes("body:not(.ai-visibility-page)"), "AI Visibility stylesheet must not target unrelated routes.");
console.log("AI Visibility Strategy route validation passed.");
