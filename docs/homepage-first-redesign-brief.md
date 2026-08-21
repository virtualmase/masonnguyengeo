# Mason Nguyen GEO — Homepage-First Redesign Brief

## Diagnosis

The homepage tries to function as a personal entity page, research index, service selector, ecosystem map, FAQ, glossary, citation library, and conversion page simultaneously. The result is not a lack of content; it is a lack of **routing hierarchy**. The existing indexable material should remain available, but the first screen must become an editorial decision surface rather than a compressed archive.

## Visual system

The first release adopts a deliberate **ultramarine and archive-ivory** system. Ultramarine signals active research paths and primary navigation. Archive ivory establishes reading authority, contrast, and editorial breathing room. Soft ink and a muted blue-grey hold long-form text and metadata. Brass/gold, green status dots, dark premium surfaces, and decorative pulse behavior do not carry forward into the homepage shell.

| Token role | Value | Use |
| --- | --- | --- |
| Ink | `#0c1322` | Header, hero field, dark reading bands |
| Archive ivory | `#f3efe6` | Primary page ground and editorial cards |
| Ultramarine | `#4b5dff` | Primary actions, active route cues, key links |
| Periwinkle | `#9aa5ff` | Secondary signal, selected text, subtle hierarchy |
| Slate | `#56606f` | Supporting prose and metadata |
| Boundary | `#d8d2c7` | Rules, dividers, quiet card edges |

## Homepage information architecture

The homepage retains its existing research coverage but changes its order and density.

1. **Entity statement:** one precise promise, a short reading-oriented definition of the research layer, and two clear routes: the GEO pillar guide and the authored research index.
2. **Research map:** three route cards for GEO foundations, ARM methods, and AI systems. Each links to existing indexable content rather than duplicating every topic on the homepage.
3. **Featured reading:** preserve the existing pillar and supporting-guide internal links in a concise editorial selection.
4. **Method boundary:** retain person/organization separation and a cautious commercial-routing statement without embedding a service catalogue or outcome claims above the fold.
5. **Reference access:** retain explicit links to the glossary, sources, `llms.txt`, sitemap, and contact layer.

Existing FAQ, glossary, sources, and keyword-cluster material will remain indexable in the initial homepage release but be visually demoted below the core research map. They will not be removed or redirected during the homepage slice.

## Migration protocol

The homepage embeds its own release-specific CSS. `assets/site.css` remains unchanged until a specific content template is selected for migration. This avoids a global injection across 30 HTML files.

For each later route:

1. Capture its current title, canonical URL, meta description, structured data, headings, internal links, and body word count.
2. Apply only token-level/component-level changes needed by that route; do not rewrite topic content during a visual pass.
3. Run the author validation and a route-specific HTML/link regression check.
4. Inspect desktop and 390px mobile output.
5. Publish one coherent route or template family at a time; retain a distinct commit and deployment record.

## Homepage acceptance criteria

| Area | Requirement |
| --- | --- |
| SEO preservation | Keep title, canonical, meta description, robots, Person/WebSite JSON-LD, `sitemap.xml`, `llms.txt`, and all existing internal content-route URLs intact. |
| Content routing | Retain at least one direct internal link to the GEO pillar guide, ARM framework, AI visibility strategy, glossary, sources, contact, and existing commercial-routing context. |
| UX | The hero exposes no more than two primary reader choices and does not use a marquee, artificially live status, pulse dots, or a fixed dual-tier chrome. |
| Accessibility | Visible focus, keyboard-safe navigation, semantic heading order, readable contrast, and reduced-motion support remain intact. |
| Scope control | No global `assets/site.css` change and no content-route restyling in the homepage release. |
