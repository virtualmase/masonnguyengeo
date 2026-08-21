import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const sitemap = await readFile(new URL('../sitemap.xml', import.meta.url), 'utf8');

for (const expected of [
  '<link rel="canonical" href="https://masonnguyengeo.com">',
  'name="robots" content="index, follow, max-snippet:-1, max-image-preview:large"',
  'application/ld+json',
  'https://masonnguyengeo.com/#mason-nguyen',
  'https://masonnguyengeo.com/#website',
  '<meta name="base:app_id" content="6a1834c7660a3f727dea7030">',
  '<meta name="base:app_id" content="6a0ada777abfff0aca7b16f5">',
  'href="/what-is-geo"',
  'href="/arm-framework"',
  'href="/ai-visibility-strategy"',
  'href="/glossary/arm-primitives"',
  'href="/sitemap.xml"',
  'href="/llms.txt"',
]) assert.ok(home.includes(expected), `homepage must retain ${expected}`);

assert.ok(!home.includes('marquee-track'), 'homepage must not retain the faux-live marquee');
assert.ok(!home.includes('Measured Outcomes'), 'homepage must not retain the performance dashboard framing');
assert.ok(sitemap.includes('<loc>https://masonnguyengeo.com/what-is-geo</loc>'), 'sitemap must retain the GEO pillar route');
console.log('Homepage SEO and research-route validation passed.');
