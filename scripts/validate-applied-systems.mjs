import assert from 'node:assert/strict';
import fs from 'node:fs';

const page = fs.readFileSync('applied-systems/index.html', 'utf8');
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const siteIndex = fs.readFileSync('sitemap/index.html', 'utf8');
const route = 'https://masonnguyengeo.com/applied-systems';

for (const signal of [
  '<title>Applied Systems: Build Records for GEO &amp; Agentic Infrastructure | Mason Nguyen</title>',
  `<link rel="canonical" href="${route}">`,
  'Working boundary.',
  'Cite Watch Pulse',
  'Arctura Base Subnet',
  'Atlas Nexus GEO',
  'https://cite-watch-pulse.base44.app/',
  'https://base-arctura-subnet.base44.app',
  'https://atlas-nexus-geo.base44.app',
  'href="/writing/geo-stack-llms-txt-to-entity-graph"',
  'href="/arm-framework"',
  'assets/images/posts/applied-systems-editorial.png',
  'assets/applied-systems.css'
]) assert.ok(page.includes(signal), `Missing Applied Systems release signal: ${signal}`);

assert.ok(!/noindex/i.test(page), 'Applied Systems must remain indexable.');
assert.ok(!/Status:\s*Scaffold/i.test(page), 'Applied Systems must not retain a scaffold status.');
assert.ok(sitemap.includes(`<loc>${route}</loc>`), 'XML sitemap must include the Applied Systems canonical route.');
assert.ok(siteIndex.includes('href="/applied-systems"'), 'Human Site Index must link the Applied Systems canonical route.');

const graph = [...page.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)].flatMap((match) => JSON.parse(match[1])['@graph'] ?? []);
for (const type of ['CollectionPage', 'ItemList', 'BreadcrumbList']) assert.ok(graph.some((item) => item['@type'] === type), `${type} JSON-LD is required.`);
console.log('Applied Systems route validation passed.');
