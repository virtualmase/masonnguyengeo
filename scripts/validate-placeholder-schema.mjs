import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const prohibitedPlaceholders = ["[PAGE-SLUG]", "[PAGE TITLE]", "[META DESCRIPTION", "[YYYY-MM-DD]"];
const routeFiles = readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => resolve(root, entry.name, "index.html"));

for (const path of routeFiles) {
  let html;
  try {
    html = readFileSync(path, "utf8");
  } catch {
    continue;
  }
  for (const token of prohibitedPlaceholders) {
    assert.ok(!html.includes(token), `Placeholder machine-readable content remains in ${path}: ${token}`);
  }
}

console.log("Placeholder schema validation passed.");
