import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const html = readFileSync(resolve(root, "intelligence-infrastructure/index.html"), "utf8");
const css = readFileSync(resolve(root, "assets/intelligence-infrastructure.css"), "utf8");

for (const token of [
  '<link rel="canonical" href="https://masonnguyengeo.com/intelligence-infrastructure">',
  '<meta name="robots" content="noindex, follow">',
  '"@type": "Article"',
  '"@type": "BreadcrumbList"',
  '<link rel="stylesheet" href="/assets/what-is-geo.css">',
  '<link rel="stylesheet" href="/assets/intelligence-infrastructure.css">',
  '<body class="geo-pillar intelligence-infrastructure-page">',
  '<header class="infrastructure-hero">',
  'SCAFFOLD — Content in progress.',
  'href="/aure-swarm"',
  'href="/ai-native-systems-design"',
  'href="/systems-that-outlive-products"',
]) assert.ok(html.includes(token), `Missing required Intelligence Infrastructure markup: ${token}`);

for (const token of [".intelligence-infrastructure-page", ".infrastructure-hero", ".infrastructure-content", "@media (max-width: 768px)"]) assert.ok(css.includes(token), `Missing Intelligence Infrastructure treatment: ${token}`);
console.log("Intelligence Infrastructure route validation passed.");
