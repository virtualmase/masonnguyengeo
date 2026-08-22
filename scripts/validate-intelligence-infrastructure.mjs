import assert from 'node:assert/strict';
import fs from 'node:fs';

const page = fs.readFileSync('intelligence-infrastructure/index.html', 'utf8');
const css = fs.readFileSync('assets/intelligence-infrastructure.css', 'utf8');
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const siteIndex = fs.readFileSync('sitemap/index.html', 'utf8');
const route = 'https://masonnguyengeo.com/intelligence-infrastructure';

for (const signal of [
  '<title>Intelligence Infrastructure: Public Records, Retrieval &amp; Review | Mason Nguyen</title>',
  `<link rel="canonical" href="${route}">`,
  'Working boundary.',
  'NIST AI Risk Management Framework',
  'Google Search Central: Optimizing your website for generative AI features',
  'Google Search Central: Introduction to structured data markup',
  'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
  'href="/writing/geo-stack-llms-txt-to-entity-graph"',
  'href="/arm-framework"',
  'href="/applied-systems"',
  'assets/images/posts/intelligence-infrastructure-editorial.png'
]) assert.ok(page.includes(signal), `Missing Intelligence Infrastructure release signal: ${signal}`);

assert.ok(!/noindex/i.test(page), 'Intelligence Infrastructure must remain indexable.');
assert.ok(!/SCAFFOLD|Content in progress|Status:\s*Scaffold/i.test(page), 'Intelligence Infrastructure must not retain scaffold copy.');
assert.ok(sitemap.includes(`<loc>${route}</loc>`), 'XML sitemap must include the Intelligence Infrastructure canonical route.');
assert.ok(siteIndex.includes('href="/intelligence-infrastructure"'), 'Human Site Index must link Intelligence Infrastructure.');

for (const token of ['.intelligence-infrastructure-page', '.infrastructure-hero', '.infrastructure-content', '.infrastructure-specimen', '@media (max-width:880px)']) assert.ok(css.includes(token), `Missing Intelligence Infrastructure treatment: ${token}`);
const graph = [...page.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)].flatMap((match) => JSON.parse(match[1])['@graph'] ?? []);
for (const type of ['Article', 'BreadcrumbList']) assert.ok(graph.some((item) => item['@type'] === type), `${type} JSON-LD is required.`);
console.log('Completed Intelligence Infrastructure route validation passed.');
