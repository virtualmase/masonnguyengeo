import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const article = readFileSync(resolve(root, "writing/aeo-vs-geo/index.html"), "utf8");
const sitemap = readFileSync(resolve(root, "sitemap.xml"), "utf8");

const required = [
  '<link rel="canonical" href="https://masonnguyengeo.com/writing/aeo-vs-geo">',
  '"@type":"Article"',
  '"@type":"BreadcrumbList"',
  'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide',
  'https://collaborate.princeton.edu/en/publications/geo-generative-engine-optimization/',
  'never convert a benchmark',
  'does not ensure a featured answer, citation, ranking, or conversion',
  'source-bounded',
];

for (const token of required) {
  if (!article.includes(token)) throw new Error(`Missing required AEO/GEO boundary token: ${token}`);
}

for (const prohibited of ["guaranteed-growth", "guaranteed citation", "guaranteed ranking", "40% visibility gain"]) {
  if (article.toLowerCase().includes(prohibited)) throw new Error(`Prohibited outcome claim found: ${prohibited}`);
}

if (!sitemap.includes("https://masonnguyengeo.com/writing/aeo-vs-geo")) {
  throw new Error("Sitemap entry for /writing/aeo-vs-geo is missing");
}

console.log("AEO versus GEO route contract passes.");
