import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const html = readFileSync(resolve(root, "ai-visibility-strategy/index.html"), "utf8");
const css = readFileSync(resolve(root, "assets/ai-visibility.css"), "utf8");

assert.match(html, /<body\s+class="geo-pillar ai-visibility-page"(?:\s+[^>]*)?>/, "Missing required AI Visibility body classes.");
assert.ok(!html.includes('SCAFFOLD — Content in progress.'), "Completed AI Visibility page must not retain scaffold copy.");
assert.ok(!html.includes('<meta name="robots" content="noindex, follow">'), "Completed AI Visibility page must be indexable.");

for (const token of [
  '<link rel="canonical" href="https://masonnguyengeo.com/ai-visibility-strategy">',
  '<link rel="stylesheet" href="/assets/research-shell.css">',
  '<header class="signal-hero">',
  'AI Visibility Strategy',
  'Build for useful access, not a secret parser.',
  'Observe answers like a research sample, not a scoreboard.',
  'Use each file for its actual job.',
  'https://developers.google.com/search/docs/appearance/ai-features',
  'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide',
  'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data',
  'https://arxiv.org/abs/2410.22349',
  '"@type": "Article"',
  '"@type": "FAQPage"',
  'href="/what-is-geo"',
  'href="/arm-framework"',
  'href="/knowledge-graph-authority"',
  'href="tel:+19705798489"',
]) {
  assert.ok(html.includes(token), `Missing required completed AI Visibility markup: ${token}`);
}

for (const token of [
  ".ai-visibility-page",
  ".signal-hero",
  ".signal-content",
  ".visibility-grid",
  ".guide-table",
  ".guide-steps",
  ".source-list",
  "@media (max-width: 768px)",
]) {
  assert.ok(css.includes(token), `Missing route-scoped AI Visibility treatment: ${token}`);
}

assert.ok(!css.includes("body:not(.ai-visibility-page)"), "AI Visibility stylesheet must not target unrelated routes.");
console.log("Completed AI Visibility Strategy route validation passed.");
