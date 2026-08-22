# Source Record Editorial Image QA

**Route:** `/writing/how-to-become-source-llms-trust`  
**Environment:** local rebuilt-site server  
**Status:** Pending delegated production release

## Desktop observation

The existing research masthead, source-boundary notice, and title hierarchy remain intact. The added editorial figure is placed after the article metadata and before the claim-boundary notice. Its intended role is strictly conceptual: it is captioned as a source-record field spanning identity, evidence, access, and maintenance, and explicitly disclaims any depiction of an LLM, search result, citation, ranking, or trust outcome.

## Technical checks

The page includes descriptive image alternative text, declared image dimensions, asynchronous decoding, a reusable responsive figure treatment, Open Graph image metadata, a large-image social card, and an `Article.image` property. Route indexability and SEO validation passed after integration: 32 canonical routes, 32 sitemap URLs, and zero critical errors.

## Remaining checks

Run narrow-mobile visual inspection once the generated image has resolved, then commit only the route markup, the reusable style if changed, and this QA record. Production release must record the commit and deployment verification before the route is marked complete.
