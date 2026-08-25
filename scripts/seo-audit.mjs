import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const reportPath = '/home/ubuntu/seo-audit-report.md';
const canonicalOrigin = 'https://www.masonnguyengeo.com';
const excluded = new Set(['.git', 'node_modules', 'public']);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (excluded.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
function firstMatch(html, re) { return html.match(re)?.[1]?.trim() ?? ''; }
function routeFromCanonical(canonical) { return new URL(canonical).pathname || '/'; }
function sourceRoute(file) {
  const relative = path.relative(root, file).replaceAll('\\', '/').replace(/\/index\.html$/, '');
  return relative === 'index.html' ? '/' : `/${relative}`;
}
function routeFromHref(href) {
  const pathname = href.split('#')[0].split('?')[0];
  return pathname === '' ? '/' : pathname;
}

const redirectConfig = fs.readFileSync(path.join(root, 'vercel.json'), 'utf8');
const pages = [];
const legacySources = [];
for (const file of walk(root).filter((candidate) => candidate.endsWith('index.html'))) {
  const html = fs.readFileSync(file, 'utf8');
  const canonical = firstMatch(html, /<link\s+rel="canonical"\s+href="([^"]+)"\s*\/?\s*>/i);
  if (!canonical.startsWith(canonicalOrigin)) continue;
  const route = routeFromCanonical(canonical);
  const fileRoute = sourceRoute(file);
  if (fileRoute !== route) {
    legacySources.push({ source: fileRoute, destination: route, redirected: redirectConfig.includes(`"source": "${fileRoute}"`) && redirectConfig.includes(`"destination": "${route}"`) });
    continue;
  }
  const title = firstMatch(html, /<title>([\s\S]*?)<\/title>/i);
  const description = firstMatch(html, /<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i);
  const ogTitle = firstMatch(html, /<meta\s+property="og:title"\s+content="([^"]*)"\s*\/?>/i);
  const ogDescription = firstMatch(html, /<meta\s+property="og:description"\s+content="([^"]*)"\s*\/?>/i);
  const ogUrl = firstMatch(html, /<meta\s+property="og:url"\s+content="([^"]*)"\s*\/?>/i);
  const noindex = /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  const schemas = [...html.matchAll(/<script\s+type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/gi)];
  const schemaTypes = [];
  const schemaErrors = [];
  for (const schema of schemas) {
    try {
      const json = JSON.parse(schema[1]);
      const graph = json['@graph'] ?? [json];
      graph.forEach((node) => schemaTypes.push(node['@type'] ?? 'unknown'));
    } catch (error) { schemaErrors.push(error.message); }
  }
  const links = [...html.matchAll(/href="([^"]+)"/gi)].map((match) => match[1]);
  pages.push({ route, canonical, title, description, ogTitle, ogDescription, ogUrl, noindex, h1Count, schemaTypes, schemaErrors, links });
}

const routeSet = new Set(pages.map((page) => page.route));
const inbound = Object.fromEntries([...routeSet].map((route) => [route, 0]));
const broken = [];
for (const page of pages) {
  for (const href of page.links) {
    if (!href.startsWith('/')) continue;
    if (/^\/(assets|api|favicon|robots\.txt|llms\.txt|schema\.json|sitemap\.xml|site\.webmanifest)(\/|$)/.test(href)) continue;
    const target = routeFromHref(href);
    if (routeSet.has(target)) inbound[target] += 1;
    else if (!target.includes('.')) broken.push({ source: page.route, target });
  }
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
const canonicals = new Set(pages.map((page) => page.canonical));
const sitemapMissing = [...canonicals].filter((url) => !sitemapUrls.has(url));
const sitemapExtra = [...sitemapUrls].filter((url) => !canonicals.has(url));

const findings = [];
for (const page of pages.sort((a, b) => a.route.localeCompare(b.route))) {
  const errors = [];
  const advisories = [];
  if (!page.title) errors.push('missing title');
  else if (page.title.length > 65) advisories.push(`long title (${page.title.length})`);
  if (!page.description) errors.push('missing meta description');
  else if (page.description.length > 165) advisories.push(`long description (${page.description.length})`);
  if (!page.ogTitle || !page.ogDescription || !page.ogUrl) errors.push('incomplete Open Graph');
  if (page.ogUrl && page.ogUrl !== page.canonical) errors.push('Open Graph URL differs from canonical');
  if (page.noindex) errors.push('noindex directive');
  if (page.h1Count !== 1) errors.push(`H1 count ${page.h1Count}`);
  if (page.schemaErrors.length) errors.push('invalid JSON-LD');
  if (!page.schemaTypes.length) errors.push('missing JSON-LD');
  if ((inbound[page.route] ?? 0) === 0 && page.route !== '/') errors.push('no internal inbound link');
  findings.push({ route: page.route, title: page.title, inbound: inbound[page.route] ?? 0, schema: page.schemaTypes.join(', ') || 'none', errors, advisories });
}

const criticalCount = findings.reduce((count, finding) => count + finding.errors.length, 0) + broken.length + sitemapMissing.length + sitemapExtra.length + legacySources.filter((source) => !source.redirected).length;
const advisoryCount = findings.reduce((count, finding) => count + finding.advisories.length, 0);
const lines = [
  '# Technical SEO Audit — www.masonnguyengeo.com',
  '',
  `**Scope:** ${pages.length} canonical public routes; ${legacySources.length} legacy paths evaluated separately.`,
  `**Critical result:** ${criticalCount} errors. **Metadata recommendations:** ${advisoryCount} length observations.`,
  '',
  '| Route | Title | Inbound links | JSON-LD | Critical status | Advisory |',
  '| --- | --- | ---: | --- | --- | --- |',
  ...findings.map((f) => `| ${f.route} | ${f.title.replaceAll('|', '\\|')} | ${f.inbound} | ${f.schema || '—'} | ${f.errors.join('; ') || 'Pass'} | ${f.advisories.join('; ') || '—'} |`),
  '',
  '## Sitemap parity',
  '',
  sitemapMissing.length ? `Missing: ${sitemapMissing.join(', ')}` : 'All canonical routes are present in the XML sitemap.',
  sitemapExtra.length ? `Extra: ${sitemapExtra.join(', ')}` : 'No extra XML sitemap URLs were found.',
  '',
  '## Legacy route consolidation',
  '',
  legacySources.length ? legacySources.map((source) => `- ${source.source} → ${source.destination}: ${source.redirected ? 'permanent redirect declared' : 'redirect missing'}`).join('\n') : 'No legacy route sources were found.',
  '',
  '## Internal-link integrity',
  '',
  broken.length ? broken.map((link) => `- ${link.source} → ${link.target}`).join('\n') : 'No unresolved internal route targets were found.',
  '',
  '## Audit boundary',
  '',
  'This source-level audit verifies canonical declarations, index controls, primary metadata, JSON-LD parseability, internal route integrity, redirect declarations, and XML sitemap parity. It does not replace crawl, rendered-page, coverage, enhancement, or performance observations from Google Search Console.',
  ''
];
fs.writeFileSync(reportPath, lines.join('\n'));
console.log(`SEO audit complete: ${pages.length} canonicals, ${criticalCount} critical errors, ${advisoryCount} recommendations. Report: ${reportPath}`);
if (criticalCount) process.exitCode = 1;
