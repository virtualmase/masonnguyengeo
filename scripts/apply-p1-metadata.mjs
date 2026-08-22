import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const updates = [
  {
    route: 'glossary/arm-primitives',
    title: 'ARM Primitives: Five Sovereign AI Building Blocks | Mason Nguyen',
    description: 'A working definition of five AI infrastructure primitives: entity resolution, signal architecture, citation networks, retrieval design, and maintenance.'
  },
  {
    route: 'glossary/entity-authority',
    title: 'Entity Authority: A Working Definition | Mason Nguyen',
    description: 'A working definition of how identity, evidence, and references shape an entity’s public source record for AI-mediated discovery.'
  },
  {
    route: 'glossary/resonance-bft-agent-swarms',
    title: 'Resonance BFT: Agent Consensus, Defined | Mason Nguyen',
    description: 'A working definition of applying Byzantine fault-tolerance concepts to distributed agent coordination, including limits and assumptions.'
  },
  {
    route: 'glossary/share-of-model',
    title: 'Share of Model: AI Visibility Metric | Mason Nguyen',
    description: 'A proposed observation metric for tracking how often an entity appears in sampled AI responses; not a platform-owned ranking metric.'
  },
  {
    route: 'glossary/signal-architecture',
    title: 'Signal Architecture: Source-System Definition | Mason Nguyen',
    description: 'A working definition of the sources, structure, and maintenance practices that make a public record easier to inspect and use.'
  },
  {
    route: 'glossary/signal-decay',
    title: 'Signal Decay: Source Maintenance, Defined | Mason Nguyen',
    description: 'A working definition of how outdated, conflicting, or unmaintained information can weaken a public source record over time.'
  },
  {
    route: 'what-is-geo',
    title: 'What Is GEO? Generative Engine Optimization Guide | Mason Nguyen',
    description: 'A careful guide to Generative Engine Optimization: public identity, source structure, technical access, and accurate representation.'
  }
];

function replaceRequired(text, pattern, replacement, label, file) {
  if (!pattern.test(text)) {
    throw new Error(`${label} not found in ${file}`);
  }
  return text.replace(pattern, replacement);
}

for (const update of updates) {
  const file = path.join(root, update.route, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  const documentTitle = update.title;
  const socialTitle = update.title;
  const description = update.description;

  html = replaceRequired(html, /<title>[^<]*<\/title>/i, `<title>${documentTitle}</title>`, 'document title', file);
  html = replaceRequired(html, /<meta name="description" content="[^"]*">/i, `<meta name="description" content="${description}">`, 'meta description', file);
  html = replaceRequired(html, /<meta property="og:title" content="[^"]*">/gi, `<meta property="og:title" content="${socialTitle}">`, 'Open Graph title', file);
  html = replaceRequired(html, /<meta property="og:description" content="[^"]*">/gi, `<meta property="og:description" content="${description}">`, 'Open Graph description', file);

  if (/<meta name="twitter:title" content="[^"]*">/i.test(html)) {
    html = html.replace(/<meta name="twitter:title" content="[^"]*">/gi, `<meta name="twitter:title" content="${socialTitle}">`);
  }
  if (/<meta name="twitter:description" content="[^"]*">/i.test(html)) {
    html = html.replace(/<meta name="twitter:description" content="[^"]*">/gi, `<meta name="twitter:description" content="${description}">`);
  }

  const articleTitlePattern = /("@type":\s*"Article"[\s\S]*?"headline":\s*")[^"]*(")/;
  if (articleTitlePattern.test(html)) {
    html = html.replace(articleTitlePattern, `$1${documentTitle.replace(/ \| Mason Nguyen$/, '')}$2`);
  }

  const articleDescriptionPattern = /("@type":\s*"Article"[\s\S]*?"description":\s*")[^"]*(")/;
  if (articleDescriptionPattern.test(html)) {
    html = html.replace(articleDescriptionPattern, `$1${description}$2`);
  }

  fs.writeFileSync(file, html);
  console.log(`Updated ${update.route}`);
}

console.log(`Applied P1 metadata revisions to ${updates.length} canonical routes.`);
