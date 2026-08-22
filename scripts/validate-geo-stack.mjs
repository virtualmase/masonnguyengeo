import assert from 'node:assert/strict';
import fs from 'node:fs';

const page = fs.readFileSync('writing/geo-stack-llms-txt-to-entity-graph/index.html', 'utf8');
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const siteIndex = fs.readFileSync('sitemap/index.html', 'utf8');
const route = 'https://masonnguyengeo.com/writing/geo-stack-llms-txt-to-entity-graph';

for (const signal of [
  '<title>The GEO Stack: From llms.txt to Entity Graph | Mason Nguyen</title>',
  `<link rel="canonical" href="${route}">`,
  'Working boundary.',
  'Google Search Central: AI features and your website',
  'Google Search Central: Introduction to structured data markup',
  'Schema.org: sameAs',
  'Google Search Central: Organization structured data',
  'Wikidata: Introduction',
  'Google Search Central: Optimizing your website for generative AI features',
  'href="/writing/how-to-become-source-llms-trust"',
  'href="/knowledge-graph-authority"',
  'href="/glossary/entity-authority"',
  'href="/writing/llms-txt-not-for-search"'
]) assert.ok(page.includes(signal), `Missing GEO Stack release signal: ${signal}`);

assert.ok(!/noindex/i.test(page), 'The completed GEO Stack page must remain indexable.');
assert.ok(!/Status:\s*Scaffold/i.test(page), 'The completed GEO Stack page must not retain a scaffold status.');
assert.ok(sitemap.includes(`<loc>${route}</loc>`), 'XML sitemap must include the GEO Stack canonical route.');
assert.ok(siteIndex.includes('href="/writing/geo-stack-llms-txt-to-entity-graph"'), 'Human Site Index must link the GEO Stack canonical route.');

const graph = [...page.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)].flatMap((match) => JSON.parse(match[1])['@graph'] ?? []);
for (const type of ['Article', 'FAQPage', 'BreadcrumbList']) assert.ok(graph.some((item) => item['@type'] === type), `${type} JSON-LD is required.`);
console.log('Completed GEO Stack route validation passed.');
