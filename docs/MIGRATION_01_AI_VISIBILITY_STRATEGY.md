# Migration 01 — AI Visibility Strategy

**Status:** Design and source boundary approved for implementation; content claims still require source-level editing before indexability changes.

## Scope and decision

The first migration unit is the priority-one **AI Visibility Strategy** pillar at `/ai-visibility-strategy/`. Its Notion publishing record places it in **Silo I — Signal Architecture**, identifies the primary keyword as “AI visibility for brands,” and explicitly calls for internal links to the ARM Framework and Knowledge Graph Authority. The record also says it should publish only after the existing *What is GEO* pillar indexes.

This is a contained first unit: the direct route is presently an explicit scaffold with a `noindex` directive, while a legacy long-form draft exists at `/what-is-geo/ai-visibility-strategy/` but declares the direct route as canonical. The migration will make **only the direct route** authoritative. It will not bulk-restyle the homepage, glossary, writing archive, ARM page, or other silo surfaces.

| Decision | Migration 01 choice | Reason |
| --- | --- | --- |
| Route | `/ai-visibility-strategy/` only | It is Priority 1, a pillar, and explicitly scoped in the Notion schedule. |
| Visual mode | Dark ultramarine reading environment with ivory editorial fields | It unifies the existing homepage direction without reproducing AURE’s product UI. |
| Shared stylesheet risk | No global `assets/site.css` replacement in this unit | A page-scoped layer keeps rollback clean and prevents unrelated page regressions. |
| Content source | Approved Notion draft, corrected against primary-source guidance | The existing nested HTML has unsupported causal claims and stale numeric platform assertions. |
| Indexability | Remain `noindex` until content and metadata pass the release gate | A scaffold must never be opened to crawl prematurely. |

## Original ultramarine-and-ivory design system

The system borrows **relationships**, not components, from the AURE reference: deep blue ground, warm light reading field, blue evidence/action signal, and restrained state colors. It deliberately excludes AURE’s audit rail, instrument panels, score language, logo geometry, and workflow-state UI. Mason Nguyen GEO remains an **editorial research library**, not a software console.[1]

| Token | Value | Role | Verified body-text pairing |
| --- | --- | --- | --- |
| `--geo-night` | `#071A4A` | Deep ultramarine ground for navigation, hero, and the page conclusion | Ivory on night: 14.85:1 |
| `--geo-ink` | `#071A4A` | Primary dark text and rules on ivory | Ink on ivory: 14.85:1 |
| `--geo-ivory` | `#F7F1E3` | Warm reading surface and primary light text | See night pairing above |
| `--geo-cobalt` | `#1F46C8` | Action, active state, links, and focus signal | Cobalt on ivory: 6.74:1; ivory on cobalt: 6.74:1 |
| `--geo-slate` | `#4C5A76` | Metadata and secondary body text on ivory | Slate on ivory: 6.15:1 |
| `--geo-oxide` | `#A13F31` | Bounded caution or unsupported-claim marker, never a decorative accent | Oxide on ivory: 5.70:1 |
| `--geo-line` | `#CDD5E6` | Quiet structural rules on ivory | Used only for non-text separation |

The contrast values above are produced by `scripts/check_theme_contrast.py` using the WCAG relative-luminance formula. Text will never be placed directly over an image or a transparency layer whose effective background varies. A persistent dark navigation field will keep its own opaque or near-opaque background so it retains contrast when the ivory content field scrolls beneath it.

Typography keeps the existing research-page family roles: **Cormorant Garamond** for displayed ideas, **Inter** for reading text, and **JetBrains Mono** for provenance, dates, and route metadata. The page-specific style may use the homepage’s visual logic—fine rule grids, left-aligned editorial measure, and cobalt emphasis—without adopting the homepage’s font stack or collapsing article hierarchy.

## Page composition and interaction contract

The visual composition is intentionally quiet. A compact sticky masthead anchors the route. The hero uses a dark ultramarine field with a low-opacity analytical grid, a clear one-sentence definition, and visible provenance rather than a synthetic “AI score.” The body moves to a generous ivory field with one dominant reading column, scannable evidence blocks, and carefully bounded internal links. The article ends in a dark synthesis band that points to the next two Silo I nodes.

| Surface | Intended behavior | Accessibility requirement |
| --- | --- | --- |
| Sticky header | Establishes site identity and exposes an escape route to the parent GEO pillar | Keyboard-operable links, visible focus state, solid dark contrast field |
| Hero | States the page’s definition and evidence boundary before explanatory copy | Correct `h1`, no text-only color distinction, no animated essential content |
| Reading field | Keeps paragraphs at a comfortable line length with hierarchy visible in the document outline | Semantic headings, list/table alternatives where appropriate, 200% zoom resilience |
| Evidence blocks | Separates verified source statements from Mason’s operating interpretation | Source links in text; titles, dates, and claims remain visible without script execution |
| Related reading | Creates two deliberate Silo I pathways rather than a miscellaneous card grid | Each link describes its destination in visible text |

Non-essential hover and entrance transitions stay within 160–200ms, animate only `opacity` and `transform`, and switch off for reduced-motion preferences. There will be no auto-playing meter, numeric animation, or visualized “citation probability.”

## Content source and evidence boundary

The approved Notion draft provides the page’s core arc: crawl access, structural legibility, entity/schema signals, and topical cluster depth. It is an editorial source, not an external authority. The legacy nested draft offers an outline only; it contains unverified platform percentages, asserted ranking factors, fixed retrieval descriptions, and attribution claims that cannot be presented as facts without primary evidence.

The edited article will define AI visibility as an **operating measurement discipline**: observing whether a named entity is present, described accurately, or linked in a defined repeatable query panel. It will not assert that any site can make a model crawl, trust, cite, rank, train on, or recommend it. The article will distinguish between a publisher’s controls, a platform’s eligibility conditions, and any final system output.

> Google’s current Search guidance states that there are no special requirements, AI files, or special markup needed to appear in Google AI Overviews or AI Mode. For Google’s AI features, a page must be indexable and eligible for a Search snippet, but crawl, indexing, and serving remain unguaranteed.[2]

The migration must therefore correct the Notion draft’s treatment of `llms.txt`, crawler permissions, FAQ markup, and schema. An `llms.txt` file may remain a voluntary public reading index, but it must not be represented as a Google requirement, a crawler control, or evidence of model ingestion. JSON-LD will be retained where it faithfully represents visible content; Google’s guidance requires structured data to describe the page it appears on and warns against markup for invisible content.[3]

| Keep or adapt | Remove or rewrite | Why |
| --- | --- | --- |
| Plain-language definition of AI visibility | “Machines read this page first” framing | The reader remains primary; machine readability is a technical quality, not a replacement audience. |
| Crawlability, internal links, visible text, and semantic structure | “Explicit permission” guarantees and opt-in-to-citation claims | Site controls do not determine third-party retrieval, attribution, or training outcomes. |
| Article, Person, BreadcrumbList, and visibly matched FAQ markup when appropriate | Citation-rate promises, proprietary score claims, and invisible schema facts | Structured data must be accurate and align with visible content.[3] |
| Prompt-panel logging as an observational method | Percent meters, projected timelines, platform-wide ranking recipes | The current page has no source record supporting those numbers or causal claims. |
| Links to the ARM Framework and Knowledge Graph Authority | Unverified client/project examples | Evidence-led content must not borrow authority from undocumented cases. |

## Release gate and rollback

The page does **not** leave `noindex` in this migration unless the full visible copy, metadata, canonical target, source notes, and structured data are internally consistent. The source page must answer a human reader’s question before it is treated as retrieval-ready. Google’s AI-feature documentation specifically recommends people-first content, basic technical eligibility, textual content, internal discoverability, and markup that matches visible text—not speculative special optimizations.[2]

| Gate | Pass condition |
| --- | --- |
| Content | No scaffold notice; no stale word-count or date claims; no unsupported numerical or causal claims. |
| Structure | One canonical direct route; semantic heading order; duplicate nested draft removed, redirected, or quarantined in a separate reviewable decision. |
| Metadata | Title, description, canonical, Open Graph, and JSON-LD describe the same visible page. |
| Accessibility | Keyboard test, focus visibility, mobile reflow, reduced-motion path, and all intended body-text pairings meet the recorded contrast threshold. |
| SEO/GEO | Crawl status is intentional; internal links are contextually relevant; no promised model outcome; citations link to primary documentation. |
| Reversibility | All first-unit changes are committed on `manus/ultramarine-ivory-theme`; no unrelated routes change. |

## Implementation order

First, create the isolated branch and baseline capture. Second, introduce page-scoped token aliases and component rules in `assets/ai-visibility.css`, so existing research pages do not inherit the experimental styling. Third, replace the scaffold body with the source-controlled article and revise visible metadata/JSON-LD as one coherent change. Fourth, test desktop and mobile rendering against the static server, validate semantic and crawler-facing markup, and compare changes before deciding whether to lift `noindex`. The global `assets/site.css` migration remains the next **separate** unit after this page is reviewed.

## Verification record

On 2026-08-21, the shared token migration was previewed on `/what-is-geo/` at desktop and 375px-wide mobile widths through the local static server. The sticky header, dark reading-ground hero, ivory headline, periwinkle emphasis, and fine-rule grid retained a coherent hierarchy; the mobile navigation collapsed without overflow, and no inherited gold-toned accents were visible in the viewed header or hero. The existing GEO page’s content was deliberately not edited in this unit. Its unsupported platform statistics and causal wording remain a **separate content-quality remediation item**, not an endorsement of those claims.

The direct AI Visibility Strategy route is now a fully populated, noindex research guide with a skip link, a visible evidence boundary, a desktop-only contextual table of contents, reduced-motion handling, source links to current Google Search Central documentation, and a text-first mobile layout. Its Article and BreadcrumbList JSON-LD are programmatically checked for valid parsing and a headline that matches the visible `h1`. The legacy nested route now returns a 301 redirect to `/ai-visibility-strategy` in the local Express server, with matching permanent redirects declared in `vercel.json`. The direct page remains `noindex, follow` pending the separate editorial decision specified in the publishing schedule; the content migration does not silently turn a previously staged page into an indexed publication.

## References

[1] [AURE public stylesheet reference](https://github.com/Earthward-Holdings/AURE/blob/main/client/src/index.css)

[2] [Google Search Central: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)

[3] [Google Search Central: Introduction to structured data markup](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
