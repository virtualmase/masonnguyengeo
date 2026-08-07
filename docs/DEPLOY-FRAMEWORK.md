# masonnguyengeo.com — Deploy Framework & CMS Engine
**Last updated:** 2026-08-07
**Maintainer:** HERALD (Arctura ecosystem)
**Repo:** `virtualmase/masonnguyengeo` (GitHub, branch `main`)
**Live site:** https://masonnguyengeo.com
**Hosting:** Vercel (auto-deploys on GitHub push)

---

## 1. Architecture Overview

The site uses a **headless CMS pattern** for static site generation:

```
build-site.py (Python CMS engine)
  ├── PAGES registry (structured JSON content definitions)
  ├── Component renderers (section types → HTML)
  ├── Shared templates (nav, footer, meta, JSON-LD)
  └── GitHub API push (deploys on commit → Vercel auto-builds)

assets/site.css (35KB, 162 component classes)
  ├── :root dark mode tokens
  ├── [data-theme="light"] overrides
  └── All component styles

vercel.json → routing config (clean URLs, rewrites)
sitemap.xml → 20 routes
robots.txt → three-tier crawler policy
llms.txt → AI crawler guidance
```

**Key principle:** Content lives as structured JSON in the `PAGES` dict inside `build-site.py`. The engine renders it to full HTML pages with unified nav, footer, meta tags, JSON-LD schema, theme toggle, and progress bar — automatically. You edit content, not HTML.

---

## 2. build-site.py — The CMS Engine

**Location:** HERALD workspace (not in GitHub repo — see Critical Notes)
**Size:** ~72KB

### 2.1 Commands

```bash
# Build + push a single page
python3 build-site.py --page arm-framework --push

# Build + push all pages in the registry
python3 build-site.py --all --push

# Build only (no push — preview locally)
python3 build-site.py --page about
```

### 2.2 PAGES Registry Format

Each page is a key in the `PAGES` dict with this structure:

```python
PAGES = {
    'arm-framework': {
        'path': 'arm-framework/index.html',    # GitHub file path
        'content': {
            'title': 'ARM Framework — Authority, Relevance, Momentum | Mason Nguyen GEO',
            'description': 'Meta description text',
            'canonical': 'https://masonnguyengeo.com/arm-framework',
            'og_type': 'article',
            'era_tag': '♦ CURRENT · METHODOLOGY · PILLAR',
            'h1': 'The ARM Framework',
            'subtitle': 'Authority · Relevance · Momentum — the proprietary methodology...',
            'breadcrumb': [
                {'name': 'masonnguyengeo.com', 'url': '/'},
                {'name': 'arm-framework'}
            ],
            'meta': [
                '♦ Primary keyword: authority relevance momentum SEO',
                '♦ Est. volume: 390/mo',
                '♦ Era: Current',
                '♦ Status: Scaffold'
            ],
            'scaffold_notice': '♦ SCAFFOLD — Content in progress · This page is indexed and crawlable.',
            'json_ld': {
                '@context': 'https://schema.org',
                '@type': 'Article',
                # ... full schema object
            },
            'sections': [
                # ... list of section objects (see Section Types below)
            ],
            'cta': {
                'eyebrow': 'GEO STRATEGY · SWELL MARKETING',
                'title': 'Work with Mason Nguyen',
                'description': 'GEO strategy, entity architecture...',
                'url': 'https://swellmarketing.xyz',
                'button_text': 'Swell Marketing'
            }
        }
    }
}
```

### 2.3 Section Types (Component Renderers)

The `render_section()` function handles these types:

| Type | Purpose | Key Fields |
|------|---------|------------|
| `standard` | Heading + body paragraph | `label`, `heading`, `body` |
| `callout` | Highlighted info box | `callout_type` (info/success/warning), `title`, `body` |
| `definition` | Dictionary-style term block | `term`, `abbr`, `def_body`, `contrast`, `schema_ref` |
| `pullquote` | Blockquote with attribution | `body`, `cite` |
| `faq` | Accordion FAQ list | `items[]` with `question`/`answer` |
| `related` | 3-card related articles grid | `cards[]` with `url`, `label`, `title`, `description` |
| `timeline` | Chronological timeline | `items[]` with `period`, `title`, `description`, `tags[]` |
| `raw` | Pass-through raw HTML | `body` (any HTML string) |

### 2.4 Auto-Generated Elements (on every page)

The engine automatically injects these on every built page — you do NOT add them manually:

- **`<head>` meta tags:** title, description, canonical, OG tags, llms.txt alternate link
- **Font imports:** Cormorant Garamond (serif), Inter (sans), JetBrains Mono (mono)
- **CSS link:** `/assets/site.css`
- **JSON-LD schema:** from the `json_ld` field
- **Progress bar:** scroll-position indicator (top of page)
- **Navigation bar:** site-nav-bar with GEO/ARM/AI Visibility/AURE/About/Index links + theme toggle
- **Breadcrumb:** from the `breadcrumb` field
- **Footer:** brand tagline, social links (LinkedIn/X/GitHub), copyright, nav links, sitemap link
- **Theme toggle script:** `toggleTheme()` function + localStorage persistence

---

## 3. CSS Design System

**File:** `assets/site.css` (35KB, 162 component classes)
**Fonts:** Cormorant Garamond (headings), Inter (body), JetBrains Mono (code/meta)

### 3.1 Design Tokens

#### Dark Mode (`:root` — default)
```css
--void:        #0A0A0A     /* page background */
--surface:     #1A1A22     /* card/infobox background */
--surface-2:   #202028     /* secondary surface */
--surface-3:   #262630     /* tertiary surface */
--parchment:   #F5F0E8     /* primary text */
--text-muted:  #908A80     /* secondary text */
--text-dim:    #6E6860     /* tertiary text */
--gold:        #C9A84C     /* primary accent */
--gold-dim:    #9a7d38     /* border accent */
--rule:        1px solid rgba(201,168,76,0.22)  /* standard border */
```

#### Light Mode (`[data-theme="light"]`)
```css
--void:        #F5F0E8     /* cream background */
--surface:     #EDEAE3     /* card background */
--parchment:   #1A1A1A     /* charcoal text */
--gold:        #9a7d18     /* muted gold accent */
--rule:        1px solid rgba(154,125,24,0.15)
```

### 3.2 Key Component Classes

**Layout:** `.page-wrap`, `.container`, `.content-body`, `.two-col`
**Navigation:** `.site-nav-bar`, `.nav-links`, `.nav-wordmark`, `.nav-dot`
**Content:** `.definition-block`, `.meta-row`, `.scaffold-notice`, `.era-tag`, `.pullquote`
**Cards:** `.audience-card`, `.related-card`, `.series-card`, `.platform-cell`, `.discipline`
**Data:** `.vs-grid`, `.failure-matrix`, `.timeline`, `.probe-block`, `.case-study`
**CTA:** `.page-cta`, `.cta-btn`, `.cta-block`
**Footer:** `.site-footer`, `.footer-inner`, `.footer-social`, `.footer-links`
**Theme:** `.theme-toggle`, `.icon-moon`, `.icon-sun`, `.progress-bar`

### 3.3 Theme Toggle System

Every page includes this script (auto-injected by CMS engine; manually injected on legacy pages):

```javascript
function toggleTheme(){
  var t = document.documentElement.getAttribute("data-theme");
  t = t === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", t);
  try { localStorage.setItem("theme", t); } catch(e) {}
}
try {
  var saved = localStorage.getItem("theme");
  if (saved) { document.documentElement.setAttribute("data-theme", saved); }
} catch(e) {}
```

- CSS uses `[data-theme="light"]` selector to override `:root` tokens
- Preference persists in localStorage across all pages and visits
- Toggle button: `.theme-toggle` with moon (☾) / sun (☀) icons

---

## 4. Page Inventory (20 pages)

### CMS-Built Pages (13 — managed via build-site.py)
| Route | File | Content Status |
|-------|------|----------------|
| `/arm-framework` | `arm-framework/index.html` | Scaffold |
| `/geo-the-discipline` | `geo-the-discipline/index.html` | Scaffold |
| `/ai-visibility-strategy` | `ai-visibility-strategy/index.html` | Scaffold |
| `/ai-content-pipeline` | `ai-content-pipeline/index.html` | Scaffold |
| `/ai-native-systems-design` | `ai-native-systems-design/index.html` | Scaffold |
| `/aure-swarm` | `aure-swarm/index.html` | Scaffold |
| `/intelligence-infrastructure` | `intelligence-infrastructure/index.html` | Scaffold |
| `/knowledge-graph-authority` | `knowledge-graph-authority/index.html` | Scaffold |
| `/no-code-ai-systems` | `no-code-ai-systems/index.html` | Scaffold |
| `/prestige-web-development` | `prestige-web-development/index.html` | Scaffold |
| `/seo-for-ai-brands` | `seo-for-ai-brands/index.html` | Scaffold |
| `/systems-that-outlive-products` | `systems-that-outlive-products/index.html` | Scaffold |
| `/about` | `about/index.html` | Full content |

### Extended Guide Pages (5 — manually built, theme toggle injected)
| Route | File | Notes |
|-------|------|-------|
| `/what-is-geo` | `what-is-geo/index.html` | 36KB, pillar guide |
| `/geo-reputation-repair` | `geo-reputation-repair/index.html` | 35KB, full guide |
| `/what-is-geo/ai-visibility-strategy` | `what-is-geo/ai-visibility-strategy/index.html` | 34KB |
| `/what-is-geo/arm-framework` | `what-is-geo/arm-framework/index.html` | 32KB |
| `/what-is-geo/seo-for-ai-brands` | `what-is-geo/seo-for-ai-brands/index.html` | 36KB |

### Special Pages (2 — custom)
| Route | File | Notes |
|-------|------|-------|
| `/` | `public/index.html` | 78KB homepage, custom inline styles |
| `/sitemap` | `sitemap/index.html` | Book-index style site map |

### Machine-Readable Files
| File | Purpose |
|------|---------|
| `robots.txt` | Three-tier crawler policy (search=allow, AI-cite=allow, training=block) |
| `llms.txt` | AI crawler content guidance |
| `llms-full.txt` | Extended LLM guidance |
| `sitemap.xml` | 20 routes, all dates current |
| `schema.json` | Site-wide JSON-LD schema reference |
| `humans.txt` | Human-readable site credits |
| `security.txt` | Security contact info |
| `vercel.json` | Vercel routing config (clean URLs, rewrites) |

---

## 5. How to Add or Update a Page

### Scenario A: Update an existing CMS-built page

1. Open `build-site.py` in the workspace
2. Find the page key in the `PAGES` dict (e.g., `'arm-framework'`)
3. Edit the `content` fields — `title`, `description`, `sections[]`, etc.
4. Run: `python3 build-site.py --page arm-framework --push`
5. Vercel auto-deploys within ~30 seconds

### Scenario B: Add a new page to the CMS engine

1. Add a new entry to the `PAGES` dict with a unique key
2. Set `path` to the GitHub file path (e.g., `'new-page/index.html'`)
3. Fill in the `content` dict following the schema in section 2.2
4. Add sections using the types in section 2.3
5. Run: `python3 build-site.py --page new-page --push`
6. Update `sitemap.xml` to include the new route
7. Update `vercel.json` if the route needs a rewrite rule

### Scenario C: Update a legacy/extended page (not in CMS)

These pages have their own HTML and are not managed by build-site.py. To update:
1. Fetch the file from GitHub via API
2. Modify the HTML directly
3. Push back via GitHub API
4. These pages already have the theme toggle button + script injected

### Scenario D: Update CSS

1. Fetch `assets/site.css` from GitHub
2. Modify CSS (design tokens, component styles)
3. Push back via GitHub API
4. All pages auto-pick up the new CSS on next load (CDN cache may delay ~1-2 min)

---

## 6. Deployment Flow

```
build-site.py --page <name> --push
  ↓
GitHub API (PUT /repos/virtualmase/masonnguyengeo/contents/<path>)
  ↓
GitHub commit on main branch
  ↓
Vercel webhook triggers auto-build
  ↓
Static site deployed (~30 seconds)
  ↓
Live at masonnguyengeo.com
```

**No manual Vercel interaction needed** — push to GitHub = deploy to production.

---

## 7. Critical Notes for Future Agents

1. **build-site.py is NOT in the GitHub repo.** It lives in HERALD's workspace. If the workspace is reset, this file is lost. Consider pushing it to the repo as `build-site.py` for persistence.

2. **The 5 extended guide pages** (`what-is-geo/*` and `geo-reputation-repair`) are hand-coded HTML, NOT managed by the CMS engine. They have the theme toggle injected but their content must be edited as raw HTML.

3. **The homepage** (`public/index.html`, 78KB) is also custom HTML with inline styles. It does NOT link to `/assets/site.css` — it has its own embedded styles.

4. **CSS changes affect all 19 pages** that link to `/assets/site.css` (everyone except the homepage). The homepage has its own inline styles.

5. **The theme toggle script must be present on every page.** If you create a new page, ensure the `toggleTheme()` function + localStorage script is included before `</body>`.

6. **All pages must have:** (a) link to `/assets/site.css`, (b) the nav bar with theme toggle button, (c) the toggleTheme script, (d) JSON-LD schema, (e) canonical URL, (f) OG tags. The CMS engine handles all of these automatically.

7. **Robots.txt policy:** SEARCH=OPEN, AI-CITATION=OPEN, AI-TRAINING=CLOSED. Do not blanket-block AI bots — that kills the GEO play. See `.agents/rules/robots-master-template.txt` for the master template.

8. **Vercel routing:** `vercel.json` contains clean URL rewrites. Each route like `/arm-framework` is rewritten to serve `arm-framework/index.html`. New routes must be added to vercel.json.

9. **GitHub auth:** Uses `$GITHUB_ACCESS_TOKEN` environment variable (OAuth connector). If token expires, re-authorize via `get_connector_token` with integration_type `github`.

10. **Content status:** 12 of 13 CMS pages are in "scaffold" status (placeholder content). The `about` page has full content. Filling scaffold pages with real content is the next major content task.

---

## 8. Component Reference (Quick Lookup)

### definition-block
```html
<div class="definition-block">
  <div class="def-term">Term Name</div>
  <div class="def-abbr">ABBR / pronunciation / noun</div>
  <div class="def-body">Definition text...</div>
  <div class="def-contrast">What it is NOT...</div>
  <div class="def-schema">schema.org · URL reference</div>
</div>
```
Styled with gold left-border accent, surface background, box shadow.

### meta-row
```html
<div class="meta-row">
  <div class="meta-item">♦ Key: value</div>
  <div class="meta-item">♦ Key: value</div>
</div>
```
Monospace font, surface background, gold border.

### scaffold-notice
```html
<div class="scaffold-notice">
  ♦ SCAFFOLD — Content in progress...
</div>
```
Gold-tinted background, gold border.

### vs-grid (comparison grid)
```html
<div class="vs-grid">
  <div class="vs-col vs-seo">SEO approach...</div>
  <div class="vs-center"><div class="vs-arrow">→</div></div>
  <div class="vs-col vs-geo">GEO approach...</div>
</div>
```

### related-grid (3-card grid)
```html
<div class="related-grid">
  <a href="/url" class="related-card">
    <div class="rc-label">Related</div>
    <div class="rc-title">Title</div>
    <div class="rc-desc">Description</div>
  </a>
  <!-- repeat x3 -->
</div>
```

### platform-grid
```html
<div class="platform-grid">
  <div class="platform-cell">
    <div class="plat-name">ChatGPT</div>
    <div class="plat-type">TRAINED + RETRIEVAL</div>
    <div class="plat-bar-wrap"><div class="plat-bar" style="width:85%"></div></div>
    <div class="plat-desc">Description...</div>
  </div>
  <!-- repeat per platform -->
</div>
```

### failure-matrix
```html
<div class="failure-matrix">
  <div class="fm-row fm-row-header">...</div>
  <div class="fm-row">
    <div class="fm-type">Type</div>
    <div class="fm-example">Example</div>
    <div class="fm-omission">What's missing</div>
    <div class="fm-repair-val">Fix</div>
  </div>
</div>
```

### probe-block
```html
<div class="probe-block">
  <div class="probe-query">Query text</div>
  <div class="probe-output">AI response...</div>
  <div class="probe-label">CITED / PARAPHRASED / ABSENT</div>
</div>
```

### timeline
```html
<div class="timeline">
  <div class="tl-row">
    <div class="tl-period">2025 Q1</div>
    <div class="tl-title">Title</div>
    <div class="tl-desc">Description</div>
    <div class="tl-tags"><span class="tl-tag">tag</span></div>
  </div>
</div>
```

### callout
```html
<div class="callout callout-info">
  <div class="callout-title">Title</div>
  Body text...
</div>
<!-- callout-info, callout-success, callout-warning -->
```

### FAQ
```html
<div class="faq-list">
  <div class="faq-item">
    <div class="faq-q">Question?</div>
    <div class="faq-a">Answer.</div>
  </div>
</div>
```

---

## 9. Environment Variables

| Variable | Purpose | Source |
|----------|---------|--------|
| `GITHUB_ACCESS_TOKEN` | GitHub API auth for push | OAuth connector (`get_connector_token`) |

---

## 10. Quick Reference Card

```
EDIT A PAGE:     python3 build-site.py --page <name> --push
EDIT CSS:        Fetch → modify → push via GitHub API
ADD A PAGE:      Add to PAGES dict → run --page --push → update sitemap.xml
THEME TOGGLE:    Auto-injected by CMS; manual pages need script before </body>
DEPLOY:          Automatic on GitHub push (Vercel auto-build)
VERIFY:          curl -sI https://masonnguyengeo.com/<route> | head -1
CSS CACHE:       CDN may delay ~1-2 min; add ?v=N to bust
GITHUB AUTH:     get_connector_token integration_type=github
```

---

*Generated by HERALD · Arctura ecosystem · 2026-08-07*
*Questions? This doc lives at the workspace root. Update it when the framework changes.*
