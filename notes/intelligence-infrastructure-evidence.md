# Intelligence Infrastructure Evidence Brief

## NIST AI Risk Management Framework

Source: https://www.nist.gov/itl/ai-risk-management-framework

NIST describes the AI RMF as intended for voluntary use to improve organizations’ ability to incorporate trustworthiness considerations into the design, development, use, and evaluation of AI products, services, and systems. The page identifies the framework functions as Govern, Map, Measure, and Manage. NIST also notes that the AI RMF 1.0 is being revised and that it released a Generative AI Profile in July 2024.

Use in the pillar: governance and maintenance are operating disciplines, not a single publish-time technical pass. Do not present the Mason Nguyen model as a replacement for NIST or as formal compliance guidance.

## Google Search Central — Generative AI features

Source: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

Google says its generative Search features remain grounded in core Search ranking and quality systems. It emphasizes valuable, non-commodity, people-first content; clear technical structure; crawlability; content visible in readable HTML; page experience; and avoiding duplicate content. Google states that meeting requirements does not guarantee crawling, indexing, or serving. It also says `llms.txt` and special AI text files do not help or harm visibility in Google Search’s generative features.

Use in the pillar: public-source infrastructure is preparation and maintenance, not a citation guarantee or a special-file tactic.

## Google Search Central — Structured data

Source: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data

Google describes structured data as a standardized format for providing information about a page and classifying page content. It says markup must describe the page to which it applies and must not describe invisible content or be placed on blank pages. Google recommends fewer complete, accurate properties rather than wide but incomplete or inaccurate coverage. It recommends validation with the Rich Results Test during development and Search Console after deployment.

Use in the pillar: structure should faithfully describe a visible source record. It can clarify content and enable eligibility for some enhanced search displays, but it is not a standalone authority signal.

## Retrieval-Augmented Generation research

Source: https://arxiv.org/abs/2005.11401

Lewis et al. describe retrieval-augmented generation as combining parametric and non-parametric memory for knowledge-intensive language tasks. The abstract identifies provenance for decisions and updating world knowledge as open research problems. The paper’s scope is an ML architecture and benchmarked language-generation research, not a claim about how all public AI-search products retrieve web sources.

Use in the pillar: a retrievable evidence path is useful, but retrieved information does not remove the need for provenance, update ownership, or human review.

## Local visual review

The completed pillar was checked in the local browser preview. The hero artwork, title contrast, four-layer specimen, source list, and research rail rendered correctly. The review identified an inherited `page-wrap` margin/padding selector mismatch that introduced an ivory strip beneath the sticky navigation. The page-specific selector was corrected to target `body.intelligence-infrastructure-page[data-shell='research'] .page-wrap`; the same correction was applied to the GEO Stack and Applied Systems editorial pages for consistent full-frame behavior.
