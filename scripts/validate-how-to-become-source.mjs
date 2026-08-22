import assert from 'node:assert/strict';
import fs from 'node:fs';

const pagePath = 'writing/how-to-become-source-llms-trust/index.html';
const page = fs.readFileSync(pagePath, 'utf8');
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const siteIndex = fs.readFileSync('sitemap/index.html', 'utf8');
const route = 'https://masonnguyengeo.com/writing/how-to-become-source-llms-trust';

for (const required of [
  '<title>How to Become a Source LLMs Can Use | Mason Nguyen</title>',
  `<link rel="canonical" href="${route}">`,
  '<meta property="og:title"',
  'Claim boundary.',
  'Google Search Central: Creating helpful, reliable, people-first content',
  'Google Search Central: AI features and your website',
  'Google Search Central: Optimizing your website for generative AI features',
  'Google Search Central: Introduction to structured data markup',
  'href="/arm-framework"',
  'href="/ai-visibility-strategy"',
  'href="/glossary/entity-authority"',
  'href="/writing/llms-txt-not-for-search"'
]) assert.ok(page.includes(required), `Missing required source or signal: ${required}`);

assert.ok(!/noindex/i.test(page), 'The completed content page must remain indexable.');
assert.ok(!/Status:\s*Scaffold/i.test(page), 'The completed content page must not retain a scaffold status.');
assert.ok(sitemap.includes(`<loc>${route}</loc>`), 'XML sitemap must include the canonical article route.');
assert.ok(siteIndex.includes('href="/writing/how-to-become-source-llms-trust"'), 'Human Site Index must link the canonical article route.');

const jsonLd = [...page.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)].flatMap((match) => JSON.parse(match[1])['@graph'] ?? []);
assert.ok(jsonLd.some((item) => item['@type'] === 'Article'), 'Article JSON-LD is required.');
assert.ok(jsonLd.some((item) => item['@type'] === 'FAQPage'), 'FAQPage JSON-LD is required.');
assert.ok(jsonLd.some((item) => item['@type'] === 'BreadcrumbList'), 'BreadcrumbList JSON-LD is required.');

console.log('Completed source-record guide validation passed.');
