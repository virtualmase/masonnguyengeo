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
  "AURE is Swell Marketing's forensic agent review method",
  "AI Agent Evaluation and Forensic Review",
  "AURE is not a swarm",
  "testing failure modes",
  "in-house review method",
  "https://swellmarketing.xyz/contact/",
  "Skip to AURE review method",
  'aria-label="Primary navigation"'
];

for (const fragment of requiredPageFragments) {
  assert.ok(page.includes(fragment), `Missing required AURE fragment: ${fragment}`);
}

for (const deprecated of ["AURE Swarm", "sibling research context", "sibling intelligence-architecture context", "sibling organization", "first constraint", "16-agent", "—"]) {
  assert.ok(!page.includes(deprecated), `Deprecated AURE language remains: ${deprecated}`);
}

assert.ok(css.includes("body.aure-page"), "AURE must retain route-scoped styling.");
assert.ok(css.includes(".aure-page .site-header { position: sticky"), "AURE must retain the sticky header contract.");
assert.ok(css.includes("@media (prefers-reduced-motion: reduce)"), "AURE must preserve a reduced-motion path.");

console.log("AURE validation passed.");
