import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const excluded = new Set(['.git', 'node_modules', 'public']);
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (excluded.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
function get(html, pattern) { return html.match(pattern)?.[1]?.trim() ?? ''; }

let updated = 0;
for (const file of walk(root).filter((candidate) => candidate.endsWith('index.html'))) {
  let html = fs.readFileSync(file, 'utf8');
  const canonical = get(html, /<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?\s*>/i);
  if (!canonical.startsWith('https://masonnguyengeo.com')) continue;
  const missing = [
    !/<meta\s+property="og:title"/i.test(html),
    !/<meta\s+property="og:description"/i.test(html),
    !/<meta\s+property="og:url"/i.test(html),
    !/<meta\s+property="og:site_name"/i.test(html)
  ].some(Boolean);
  if (!missing) continue;

  const title = get(html, /<title>([\s\S]*?)<\/title>/i).replaceAll('&amp;', '&');
  const description = get(html, /<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i);
  const metadata = [
    '<meta property="og:type" content="article">',
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:url" content="${canonical}">`,
    '<meta property="og:site_name" content="Mason Nguyen GEO">',
    '<meta name="twitter:card" content="summary">'
  ].join('\n  ');
  html = html.replace(/<\/head>/i, `  ${metadata}\n</head>`);
  fs.writeFileSync(file, html);
  updated += 1;
}
console.log(`Added missing Open Graph baseline metadata to ${updated} pages.`);
