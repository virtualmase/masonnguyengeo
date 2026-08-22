import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const html = readFileSync(resolve(root, "ai-visibility-strategy/index.html"), "utf8");
const css = readFileSync(resolve(root, "assets/ai-visibility.css"), "utf8");
const jsonLdMatch = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);

assert.ok(jsonLdMatch, "AI Visibility Strategy must include parseable JSON-LD.");
const jsonLd = JSON.parse(jsonLdMatch[1]);
const articleSchema = jsonLd["@graph"].find((item) => item["@type"] === "Article");

assert.equal(articleSchema.headline, "AI Visibility Strategy", "Article headline must match the visible H1.");
assert.equal(articleSchema.url, "https://masonnguyengeo.com/ai-visibility-strategy", "Article URL must match the canonical route.");
assert.equal(articleSchema.author["@id"], "https://masonnguyengeo.com/#mason-nguyen", "Article author must use the established person identifier.");

for (const token of [
  '<link rel="canonical" href="https://masonnguyengeo.com/ai-visibility-strategy">',
  '<meta name="robots" content="noindex, follow">',
  '<link rel="stylesheet" href="/assets/site.css">',
  '<link rel="stylesheet" href="/assets/ai-visibility.css">',
  '<body class="ai-visibility-page">',
  '<h1>AI Visibility <em>Strategy</em></h1>',
  '<a class="skip-link" href="#main-content">Skip to article</a>',
  '<header class="signal-hero">',
  'Evidence boundary.',
  'Visibility is an observed outcome, not a promised placement.',
  'Build a sound publishing surface before looking for special tactics.',
  'Use structured data to describe the page you actually published.',
  'Measure carefully enough to learn, not enough to overclaim.',
  'https://developers.google.com/search/docs/appearance/ai-features',
  'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data',
  'href="/what-is-geo"',
  'href="/arm-framework"',
  'href="/knowledge-graph-authority"',
  '"@type": "Article"',
  '"@type": "BreadcrumbList"',
]) {
  assert.ok(html.includes(token), `Missing required AI Visibility markup: ${token}`);
}

for (const forbidden of [
  'SCAFFOLD — Content in progress.',
  '82% of commercial queries',
  '96% of queries return cited AI answer',
  '68% of informational queries',
  'FAQPage',
  'theme-toggle',
  '/assets/what-is-geo.css',
]) {
  assert.ok(!html.includes(forbidden), `Unsafe or obsolete AI Visibility markup remains: ${forbidden}`);
}

for (const token of [
  'body.ai-visibility-page',
  '--geo-night: #071A4A',
  '--geo-ivory: #F7F1E3',
  '--geo-cobalt: #1F46C8',
  '.skip-link',
  '.signal-hero',
  '.signal-content',
  '.evidence-boundary',
  '.on-this-page',
  '@media (max-width: 768px)',
  '@media (prefers-reduced-motion: reduce)',
]) {
  assert.ok(css.includes(token), `Missing route-scoped AI Visibility skin treatment: ${token}`);
}

assert.ok(!css.includes('body:not(.ai-visibility-page)'), 'AI Visibility stylesheet must not target unrelated routes.');
console.log('AI Visibility Strategy route validation passed.');
