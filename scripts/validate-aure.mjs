import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const pagePath = new URL("../aure-swarm/index.html", import.meta.url);
const cssPath = new URL("../assets/aure.css", import.meta.url);
const page = await readFile(pagePath, "utf8");
const css = await readFile(cssPath, "utf8");

const requiredPageFragments = [
  '<body class="aure-page">',
  '<link rel="stylesheet" href="/assets/aure.css">',
  '<meta name="robots" content="noindex, follow">',
  '<link rel="canonical" href="https://masonnguyengeo.com/aure-swarm">',
  'AURE is not a swarm',
  'forensic review',
  'in-house review method',
  'https://swellmarketing.xyz/about/',
  'Skip to AURE research',
  'aria-label="Primary navigation"'
];

for (const fragment of requiredPageFragments) {
  assert.ok(page.includes(fragment), `Missing required AURE fragment: ${fragment}`);
}

assert.ok(!page.includes("AURE Swarm"), "The AURE route still uses the deprecated AURE Swarm name.");
assert.ok(!page.includes("16-agent"), "The AURE route still claims a fixed agent count.");
assert.ok(css.includes("body.aure-page"), "AURE must retain route-scoped styling.");
assert.ok(css.includes(".aure-page .site-header { position: sticky"), "AURE must retain the sticky header contract.");
assert.ok(css.includes("@media (prefers-reduced-motion: reduce)"), "AURE must preserve a reduced-motion path.");

console.log("AURE validation passed.");
