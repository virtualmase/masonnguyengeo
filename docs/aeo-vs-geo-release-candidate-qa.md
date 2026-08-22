# AEO vs. GEO Release Candidate QA

**Candidate route:** `/writing/aeo-vs-geo`  
**Environment:** local rebuilt-site server, port 4323  
**Status:** No-publish candidate; deployment remains subject to explicit human approval.

## Desktop finding

The route renders with the established research shell and preserves the intended hierarchy: breadcrumb, source-bounded status marker, short-answer lead, comparison table, primary-source sections, decision framework, related research cards, and contact handoff. The comparison table visibly carries both the no-inherent-pricing context and the no-outcome inference boundary. The article does not display performance metrics, AI-answer fabrications, or outcome promises.

## Source treatment observed

The Google Search Central and KDD 2024 GEO paper links are visible in the relevant explanatory sections. The page explicitly differentiates official platform guidance from academic benchmark context, and frames both as evidence to interpret rather than outcomes to promise.

## Mobile finding

At 390px, the compact navigation collapses correctly, the source-bounded marker and metadata retain readable wrapping, and the title/subtitle remain contained. The status row becomes a vertical card rather than overflowing. The opening reading flow is legible and retains its evidence boundary before the article body. The comparison table was not visible in the initial mobile viewport, so route-level CSS and link checks still remain required.

## Remaining QA

Final local route checks passed. The candidate route, site index, related research routes, primary glossary link, XML sitemap, and `llms.txt` all resolve successfully after the site’s canonical trailing-slash redirects. The deterministic route contract, indexability validation, and SEO audit also pass.

The route is ready to move from `Blocked` to `Human approval required` in the release-control board. It is still not eligible for deployment until a release owner explicitly approves the public change.

## Live visual-system alignment review

The approved candidate was inspected beside the current `masonnguyengeo.com` homepage. It inherits the same compact research navigation, midnight masthead, ivory editorial reading field, ultramarine research accent, high-contrast sans-serif hierarchy, monospaced metadata treatment, and restrained ruled/card surfaces. The article deliberately changes the hero composition from the homepage’s research map to an editorial comparison page while retaining the shared site identity and a visible accessibility skip link. No generic alternate theme, invented proof metric, or outcome-led conversion treatment was introduced.

## Editorial image integration review — 2026-08-22

The first image-system slice adds one original, text-free conceptual figure immediately after the article metadata. It uses midnight and ivory visual fields meeting at an ultramarine seam to support the article’s conceptual distinction; it does **not** depict an actual search engine, AI interface, model answer, observed result, ranking, citation, or performance metric. The adjacent caption makes that boundary explicit.

At desktop width, the figure sits inside the same fixed-width research reading column and preserves the title-to-lead sequence. At narrow mobile width, the frame and caption stay inside the viewport with no observed horizontal overflow; the caption wraps below the image and the research header remains readable. The figure uses a descriptive alternative text, declared dimensions, asynchronous decode behavior, and a fixed aspect ratio to protect the reading flow from image-layout shift.

The route contract, indexability validation, and SEO audit were re-run after the image integration and passed: 32 canonical routes, 32 sitemap URLs, and zero critical SEO errors.
