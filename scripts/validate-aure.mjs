import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const pagePath = new URL("../aure/index.html", import.meta.url);
const cssPath = new URL("../assets/aure.css", import.meta.url);
const configPath = new URL("../vercel.json", import.meta.url);

const [page, css, config] = await Promise.all([
  readFile(pagePath, "utf8"),
  readFile(cssPath, "utf8"),
  readFile(configPath, "utf8")
]);

const requiredPageFragments = [
  '<body class="aure-page">',
  '<link rel="stylesheet" href="/assets/aure.css">',
  '<meta name="robots" content="index, follow">',
  '<link rel="canonical" href="https://aure.swellmarketing.xyz/">',
  "AURE is Swell Marketing's forensic agent review method",
  "AI Agent Evaluation and Forensic Review",
  "Forensic agent review.",
  "A review has a record.",
  "Review sequence",
  "testing, trace review, and accountable human oversight",
  "in-house review method",
  "https://swellmarketing.xyz/contact/",
  "Skip to AURE review method",
  'aria-label="Primary navigation"'
];

for (const fragment of requiredPageFragments) {
  assert.ok(page.includes(fragment), `Missing required AURE fragment: ${fragment}`);
}

for (const deprecated of [
  "AURE Swarm",
  "sibling research context",
  "sibling intelligence-architecture context",
  "sibling organization",
  "first constraint",
  "16-agent",
  "—"
]) {
  assert.ok(!page.includes(deprecated), `Deprecated AURE language remains: ${deprecated}`);
}

assert.ok(css.includes("body.aure-page"), "AURE must retain route-scoped styling.");
assert.ok(css.includes(".aure-page .site-header { position: sticky"), "AURE must retain a sticky header.");
assert.ok(css.includes(".aure-page .evidence-panel"), "AURE must retain the forensic evidence-panel treatment.");
assert.ok(css.includes("@media (prefers-reduced-motion: reduce)"), "AURE must preserve a reduced-motion path.");
assert.ok(config.includes('"source": "/aure-swarm"'), "The deprecated AURE Swarm route must redirect.");
assert.ok(config.includes('"destination": "/aure"'), "The deprecated AURE Swarm route must redirect to the clean AURE route.");

console.log("AURE validation passed.");
