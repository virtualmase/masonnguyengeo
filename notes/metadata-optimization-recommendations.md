# Metadata Optimization Recommendations

## Scope and decision rule

The technical SEO audit reports **22 advisory observations** across 13 canonical routes. These are not indexing defects. They are length-based review prompts: titles exceed the audit’s 65-character guideline, descriptions exceed the 165-character guideline, or both. The purpose of revision is not to force every title into an arbitrary limit; it is to retain the page’s distinguishing subject and claim boundary while reducing the likelihood that important qualifiers are truncated in search-result previews.

The recommendations below favor **plain precision** over broad promises. They remove dated claims, unsupported citation language, and redundant site-name suffixes before removing useful subject terms.

| Priority | Decision | Routes | Rationale |
| --- | --- | --- | --- |
| **P1** | Revise in the next metadata pass | Glossary entries and `what-is-geo` | These pages define the site’s shared vocabulary or carry high internal demand. Their current metadata is long and, in several cases, makes stronger claims than the article’s evidence-first voice supports. |
| **P2** | Revise when the substantive page is replaced | `intelligence-infrastructure`, `multi-agent-hardware`, `prestige-web-development` | The copy should be rewritten alongside the remaining scaffold or field-note content, so the metadata reflects the completed page rather than a temporary framing. |
| **P3** | Optional title tightening | `geo-reputation-repair`, `geo-the-discipline`, `systems-that-outlive-products` | The descriptions are within the advisory threshold. The current titles are intelligible, and the recommended alternatives are refinements rather than urgent corrections. |

## Page-level recommendations

| Route | Audit observation | Suggested title | Suggested description | Recommendation |
| --- | --- | --- | --- | --- |
| `/geo-reputation-repair` | Title: 71 characters | **GEO Reputation Repair: Correcting AI Brand Errors \| Mason Nguyen** | Retain current description. | **P3.** Removes the colloquial “When AI Gets Your Brand Wrong” while preserving the topic and moving the page toward an evidence-first repair posture. |
| `/geo-the-discipline` | Title: 68 characters | **GEO as a Discipline: Search After LLMs \| Mason Nguyen** | Retain current description. | **P3.** Keeps the manifesto framing but removes redundant wording. |
| `/glossary/arm-primitives` | Title: 80; description: 244 | **ARM Primitives: Five Sovereign AI Building Blocks \| Mason Nguyen** | **A working definition of five AI infrastructure primitives: entity resolution, signal architecture, citation networks, retrieval design, and maintenance.** | **P1.** Replaces “canonical definition” with a working-definition label and keeps the five components visible. |
| `/glossary/entity-authority` | Title: 81; description: 182 | **Entity Authority: A Working Definition \| Mason Nguyen** | **A working definition of how identity, evidence, and references shape an entity’s public source record for AI-mediated discovery.** | **P1.** Removes the implied universal claim that AI “decides whose voice to trust.” |
| `/glossary/resonance-bft-agent-swarms` | Title: 85; description: 243 | **Resonance BFT: Agent Consensus, Defined \| Mason Nguyen** | **A working definition of applying Byzantine fault-tolerance concepts to distributed agent coordination, including limits and assumptions.** | **P1.** Clarifies that the term is site-specific working language rather than a claim of guaranteed agent consensus. |
| `/glossary/share-of-model` | Title: 66; description: 196 | **Share of Model: AI Visibility Metric \| Mason Nguyen** | **A proposed observation metric for tracking how often an entity appears in sampled AI responses; not a platform-owned ranking metric.** | **P1.** Removes the assertion that Mason coined the term and gives the measurement boundary up front. |
| `/glossary/signal-architecture` | Title: 89; description: 166 | **Signal Architecture: Source-System Definition \| Mason Nguyen** | **A working definition of the sources, structure, and maintenance practices that make a public record easier to inspect and use.** | **P1.** Avoids the unsupported promise that a system makes a brand “citable by AI language models.” |
| `/glossary/signal-decay` | Title: 72; description: 180 | **Signal Decay: Source Maintenance, Defined \| Mason Nguyen** | **A working definition of how outdated, conflicting, or unmaintained information can weaken a public source record over time.** | **P1.** Replaces “why AI systems stop citing you” with a more defensible maintenance concept. |
| `/intelligence-infrastructure` | Title: 68; description: 171 | **Intelligence Infrastructure for AI Systems \| Mason Nguyen** | **A research guide to source systems, knowledge layers, and review practices for AI-native brands and agent workflows.** | **P2.** Apply when the scaffold is replaced so the title and page content are designed as one record. |
| `/multi-agent-hardware` | Title: 79; description: 187 | **Hardware for Multi-Agent AI Systems \| Mason Nguyen** | **A 2026 research note on VRAM, system memory, storage, and deployment tradeoffs for autonomous multi-agent workloads.** | **P2.** Removes “requirements,” which can imply universal thresholds, and replaces “architect’s guide” with a narrower research-note scope. |
| `/prestige-web-development` | Description: 173 | Retain current title. | **A research note on high-craft web design, accessible source architecture, and durable brand presentation for the AI-mediated web.** | **P2.** Removes “GEO-optimized,” “cited by AI,” and “remembered by humans,” which are stronger than the available evidence. |
| `/systems-that-outlive-products` | Title: 80 characters | **Systems That Outlive Products \| Mason Nguyen** | Retain current description. | **P3.** The shorter title retains the page’s distinctive premise; the description can carry the philosophical qualifier. |
| `/what-is-geo` | Title: 81; description: 210 | **What Is GEO? Generative Engine Optimization Guide \| Mason Nguyen** | **A careful guide to Generative Engine Optimization: public identity, source structure, technical access, and accurate representation.** | **P1.** Retains the exact-match topic while removing an unsupported guarantee that models will cite a brand accurately. |

## Proposed release sequence

The P1 changes should be released together in one narrow metadata pass after confirming the visible copy on each glossary page remains aligned with the revised descriptions. The P2 changes should ship with their completed substantive page replacements rather than as a separate cosmetic metadata release. The P3 changes may be accepted as written or retained if the existing editorial framing is preferred; neither class presents an indexability issue.

> **Recommended principle:** a concise title or description should state the topic, form, and evidence boundary—not forecast how a search engine or model will behave.
