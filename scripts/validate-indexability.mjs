import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (['.git', 'node_modules', 'public'].includes(entry.name)) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const pages = walk(root).filter((file) => file.endsWith('index.html'));
const canonicals = new Set();
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  assert.ok(!html.includes('<meta name="robots" content="noindex, follow">'), `Legacy noindex directive found: ${path.relative(root, file)}`);
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?\s*>/i)?.[1];
  assert.ok(canonical, `Missing canonical URL: ${path.relative(root, file)}`);
  canonicals.add(canonical);
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
assert.deepEqual([...sitemapUrls].sort(), [...canonicals].sort(), 'XML sitemap URLs must match the canonical public route set.');

const humanIndex = fs.readFileSync(path.join(root, 'sitemap/index.html'), 'utf8');
for (const canonical of canonicals) {
  const pathname = new URL(canonical).pathname;
  if (pathname === '/' || pathname === '/sitemap') continue;
  assert.ok(humanIndex.includes(`href="${pathname}"`), `Human site index missing canonical route: ${pathname}`);
}

console.log(`Indexability validation passed: ${canonicals.size} canonical routes, ${sitemapUrls.size} sitemap URLs, zero legacy noindex directives.`);
