import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const html = readFileSync(resolve(root, "arm-framework/index.html"), "utf8");
const css = readFileSync(resolve(root, "assets/arm-framework.css"), "utf8");

assert.match(html, /<body\s+class="geo-pillar arm-framework-page"(?:\s+[^>]*)?>/, "Missing required ARM body classes.");
assert.ok(!html.includes('SCAFFOLD — Content in progress.'), "Completed ARM page must not retain scaffold copy.");
assert.ok(!html.includes('<meta name="robots" content="noindex, follow">'), "Completed ARM page must be indexable.");

for (const token of [
  '<link rel="canonical" href="https://masonnguyengeo.com/arm-framework">',
  '<link rel="stylesheet" href="/assets/research-shell.css">',
  '<header class="method-hero">',
  'The ARM Framework',
  'Authority · Retrieval · Mandate',
  'Three layers, one review loop.',
  'What ARM is—and is not',
  'What to document before calling a system accountable.',
  'External context for the framework.',
  'https://www.nist.gov/itl/ai-risk-management-framework',
  'https://airc.nist.gov/airmf-resources/airmf/5-sec-core/',
  'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data',
  'https://arxiv.org/abs/2005.11401',
  '"@type": "Article"',
  '"@type": "FAQPage"',
  'href="/what-is-geo"',
  'href="/knowledge-graph-authority"',
  'href="tel:+19705798489"',
]) {
  assert.ok(html.includes(token), `Missing required completed ARM markup: ${token}`);
}

for (const token of [
  ".arm-framework-page",
  ".method-hero",
  ".method-content",
  ".framework-grid",
  ".framework-table",
  ".method-steps",
  ".source-list",
  "@media (max-width: 768px)",
]) {
  assert.ok(css.includes(token), `Missing route-scoped ARM treatment: ${token}`);
}

assert.ok(!css.includes("body:not(.arm-framework-page)"), "ARM stylesheet must not target unrelated routes.");
console.log("Completed ARM Framework route validation passed.");
