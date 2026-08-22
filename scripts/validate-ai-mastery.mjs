import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const pagePath = path.join(root, 'ai-mastery', 'index.html');
const homePath = path.join(root, 'index.html');
const sitemapPath = path.join(root, 'sitemap.xml');
const page = fs.readFileSync(pagePath, 'utf8');
const home = fs.readFileSync(homePath, 'utf8');
const sitemap = fs.readFileSync(sitemapPath, 'utf8');

const requiredPageSignals = [
  '<title>AI Mastery — Practical AI Research and Field Notes | Mason Nguyen</title>',
  'https://masonnguyengeo.com/ai-mastery',
  '<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large">',
  '<link rel="stylesheet" href="/assets/site.css">',
  '<nav class="site-nav-bar">',
  '<div class="progress-bar" id="progress"></div>',
  '"@type":"CollectionPage"',
  '"@type":"BreadcrumbList"',
  'AI Mastery is not a promise that a tool will make someone exceptional.',
];

const checks = [
  ...requiredPageSignals.map((signal) => ({
    name: `AI Mastery page contains: ${signal.slice(0, 64)}`,
    passed: page.includes(signal),
  })),
  {
    name: 'Homepage includes a visible AI Mastery route',
    passed: home.includes('href="/ai-mastery"'),
  },
  {
    name: 'XML sitemap includes the canonical AI Mastery URL',
    passed: sitemap.includes('<loc>https://masonnguyengeo.com/ai-mastery</loc>'),
  },
];

let failed = false;
for (const check of checks) {
  console.log(`${check.passed ? 'PASS' : 'FAIL'} — ${check.name}`);
  failed ||= !check.passed;
}

if (failed) process.exit(1);
