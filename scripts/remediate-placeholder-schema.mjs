import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const routeFiles = [
  "ai-content-pipeline/index.html",
  "ai-native-systems-design/index.html",
  "aure-swarm/index.html",
  "geo-the-discipline/index.html",
  "knowledge-graph-authority/index.html",
  "no-code-ai-systems/index.html",
  "prestige-web-development/index.html",
  "seo-for-ai-brands/index.html",
  "systems-that-outlive-products/index.html",
];

const jsonLdBlock = /\n<script type="application\/ld\+json">\s*\{[\s\S]*?\n<\/script>\n/;

for (const relativePath of routeFiles) {
  const path = resolve(root, relativePath);
  const source = readFileSync(path, "utf8");
  if (!source.includes("[PAGE-SLUG]")) continue;
  const updated = source.replace(jsonLdBlock, "\n");
  if (updated === source || updated.includes("[PAGE-SLUG]")) {
    throw new Error(`Could not safely remove placeholder JSON-LD from ${relativePath}`);
  }
  writeFileSync(path, updated, "utf8");
  console.log(`Removed placeholder JSON-LD: ${relativePath}`);
}
