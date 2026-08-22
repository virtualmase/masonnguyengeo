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

## Production verification

GitHub commit `2d037db4232f3567a190ae0e8c2425c86926bc84` triggered Vercel production deployment `dpl_AdD4B6gFVniHWJDcHiyh2HPmm9ku`, which reported `READY`. The canonical public route resolves through the `www` redirect and serves the editorial caption and unchanged claim boundary. The narrow-mobile visual capture was then completed and recorded below.

## Narrow-mobile verification

At a 390px viewport, the research navigation collapses to a compact menu, the breadcrumb and metadata wrap inside the masthead, and the editorial figure remains within the reading column with no observed horizontal overflow. The generated visual resolved successfully: its midnight and ivory source-record fields are visible beneath the metadata and maintain a clear separation from the article’s title and claim-boundary notice. The caption follows the image in the normal reading order.
