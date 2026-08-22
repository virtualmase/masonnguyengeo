# Evidence Brief — The GEO Stack: From llms.txt to Entity Graph

## Editorial thesis

The **GEO Stack** is Mason Nguyen’s working map for maintaining a legible public source system. It is not an industry standard, a required protocol, or a claim that one technical layer causes an AI system to retrieve or cite a page. The stack moves from the public page and its evidence through access and identity signals to maintenance and observation.

| Layer | Practical role | Explicit boundary |
| --- | --- | --- |
| Public source page | Carries the answer, evidence, authorship, scope, and date in readable content. | Useful content is not a retrieval or citation guarantee. |
| Technical access | Supports crawling, rendering, canonicalization, internal discovery, and stable URLs. | Eligibility does not guarantee crawl, index, or serving. |
| Structured data | Provides explicit, visible-content-aligned clues about the page or organization. | Markup must be accurate; it is not a citation switch. |
| Entity references | Connects a declared identity to truthful, unambiguous references such as official profiles where applicable. | `sameAs` must not be used to assert speculative or ambiguous equivalence. |
| Supplemental inventory | A maintained `llms.txt` or similar inventory may help people or systems that choose to use it. | Google says `llms.txt` is not used for its generative Search features. |
| Maintenance record | Preserves dates, sources, revisions, and documented observations. | An observation is not proof of causality or universal system behavior. |

## Primary source findings

Google says that its generative AI Search features use existing Search foundations, with no extra technical requirement or special AI optimization. It specifies that a page must be indexed and eligible for Search snippets, while noting that crawling, indexing, and serving are not guaranteed. [1]

Google’s generative AI optimization guidance says that `llms.txt` and similar special files are not used for Google generative Search. It also recommends non-commodity, people-first material and a clear technical structure, while cautioning against inauthentic visibility tactics. [2]

Google’s structured-data documentation says that structured data can provide explicit clues about a page’s meaning. It should describe visible page content; fewer complete and accurate properties are preferable to incomplete or inaccurate markup. [3]

Schema.org defines `sameAs` as a URL to a reference page that unambiguously indicates an item’s identity. [4] Google’s Organization documentation says organization markup can help it understand administrative details and disambiguate organizations; it recommends using relevant properties and truthful `sameAs` references. [5]

Wikidata describes itself as a free, collaborative, multilingual secondary knowledge base that collects structured data and links records to sources and other databases. It is a possible reference ecosystem, not an automatic business-identity destination. [6]

## References

[1] [Google Search Central: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)

[2] [Google Search Central: Optimizing your website for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

[3] [Google Search Central: Introduction to structured data markup](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

[4] [Schema.org: sameAs](https://schema.org/sameAs)

[5] [Google Search Central: Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)

[6] [Wikidata: Introduction](https://www.wikidata.org/wiki/Wikidata:Introduction)
