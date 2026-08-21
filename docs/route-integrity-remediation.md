# Route Integrity Remediation — 2026-08-21

## Decision

Nine remaining noindex scaffold routes contained JSON-LD template tokens such as `[PAGE-SLUG]`, `[PAGE TITLE]`, and `[YYYY-MM-DD]`. These are not valid public article records and must not be amplified through a design migration. The placeholder JSON-LD blocks are therefore removed rather than populated with invented dates, images, authorship claims, or content descriptions.

## Controlled boundary

The change preserves each route’s visible title, description, canonical URL, robots directive, and internal links. It does not mark a scaffold as complete or make an outcome claim. A future structured-data record may be added only once it contains a canonical URL, a real title and description, verifiable publication or modification metadata when asserted, and page content that supports the record.

The `geo-reputation-repair` guide is separately remediated: placeholder Article JSON-LD, synthetic model-answer examples, a composite customer narrative, and specific success metrics were replaced with a clear observation/publication boundary. This leaves methodology as methodology until a permission-cleared evidence packet exists.

## Regression rule

`npm run validate:placeholder-schema` scans all route HTML files and fails if any placeholder schema token returns. `npm run validate:reputation-integrity` protects the stronger evidence boundary on the reputation guide.
