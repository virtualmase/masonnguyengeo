import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const excluded = new Set(['.git', 'node_modules', 'public']);
const faviconLinks = `  <link rel="icon" href="/assets/brand/favicon.ico" sizes="any">\n  <link rel="icon" type="image/png" sizes="32x32" href="/assets/brand/favicon-32x32.png">\n  <link rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.png">\n  <link rel="manifest" href="/site.webmanifest">`;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (excluded.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
function get(html, pattern) { return html.match(pattern)?.[1]?.trim() ?? ''; }
function escapeJson(value) { return value.replaceAll('</script>', '<\\/script>'); }

let faviconCount = 0;
let schemaCount = 0;
for (const file of walk(root).filter((candidate) => candidate.endsWith('index.html'))) {
  let html = fs.readFileSync(file, 'utf8');
  const canonical = get(html, /<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?\s*>/i);
  if (!canonical.startsWith('https://masonnguyengeo.com')) continue;

  if (!html.includes('/assets/brand/favicon.ico')) {
    html = html.replace(/<\/head>/i, `${faviconLinks}\n</head>`);
    faviconCount += 1;
  }

  if (!/application\/ld\+json/i.test(html)) {
    const title = get(html, /<title>([\s\S]*?)<\/title>/i).replaceAll('&amp;', '&');
    const description = get(html, /<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i);
    const pathname = new URL(canonical).pathname;
    const segments = pathname.split('/').filter(Boolean);
    const crumbName = segments.at(-1)?.replaceAll('-', ' ') || 'Home';
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${canonical}#webpage`,
          url: canonical,
          name: title,
          description,
          isPartOf: { '@id': 'https://masonnguyengeo.com/#website' },
          author: { '@id': 'https://masonnguyengeo.com/#person' },
          inLanguage: 'en-US'
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://masonnguyengeo.com/' },
            { '@type': 'ListItem', position: 2, name: crumbName, item: canonical }
          ]
        }
      ]
    };
    const markup = `\n  <script type="application/ld+json">${escapeJson(JSON.stringify(schema))}</script>`;
    html = html.replace(/<\/head>/i, `${markup}\n</head>`);
    schemaCount += 1;
  }
  fs.writeFileSync(file, html);
}
console.log(`Added favicon links to ${faviconCount} pages and baseline JSON-LD to ${schemaCount} pages.`);
