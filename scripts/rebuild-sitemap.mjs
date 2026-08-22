import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const lastmod = '2026-08-21';

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (['.git', 'node_modules', 'public'].includes(entry.name)) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function priority(url) {
  const pathname = new URL(url).pathname;
  if (pathname === '/') return '1.0';
  if (['/about', '/what-is-geo', '/arm-framework', '/ai-visibility-strategy'].includes(pathname)) return '0.9';
  if (pathname === '/sitemap') return '0.5';
  if (pathname.startsWith('/glossary/')) return '0.6';
  if (pathname.startsWith('/writing/')) return '0.7';
  return '0.8';
}

const urls = new Set();
for (const file of walk(root).filter((candidate) => candidate.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8');
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?\s*>/i)?.[1];
  if (canonical?.startsWith('https://masonnguyengeo.com')) urls.add(canonical);
}

const ordered = [...urls].sort((a, b) => {
  if (a.endsWith('.com/')) return -1;
  if (b.endsWith('.com/')) return 1;
  return a.localeCompare(b);
});

const body = ordered.map((url) => `  <url><loc>${url}</loc><lastmod>${lastmod}</lastmod><priority>${priority(url)}</priority></url>`).join('\n');
fs.writeFileSync(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
console.log(`Rebuilt sitemap with ${ordered.length} canonical public routes.`);
console.log(ordered.join('\n'));
