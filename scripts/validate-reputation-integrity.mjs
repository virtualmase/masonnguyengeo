import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const html = readFileSync(resolve(root, "geo-reputation-repair/index.html"), "utf8");

for (const token of [
  '"@id": "https://masonnguyengeo.com/geo-reputation-repair#article"',
  '"url": "https://masonnguyengeo.com/geo-reputation-repair"',
  '"name": "GEO Reputation Repair"',
  'Observation boundary',
  'Publication condition',
  'href="/what-is-geo"',
  'href="/ai-visibility-strategy"',
  'href="/arm-framework"',
]) {
  assert.ok(html.includes(token), `Missing required reputation-integrity markup: ${token}`);
}

for (const prohibited of ["[PAGE-SLUG]", "[PAGE TITLE]", "[META DESCRIPTION", "[YYYY-MM-DD]", "[Brand]", "After repair — 74 days later", "Share of Model: 34%", "Days to first correct Perplexity citation"]) {
  assert.ok(!html.includes(prohibited), `Synthetic or placeholder content must not remain: ${prohibited}`);
}

console.log("GEO Reputation Repair integrity validation passed.");
