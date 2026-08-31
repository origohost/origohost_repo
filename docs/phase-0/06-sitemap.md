# 06 — Sitemap Architecture Specification

> **Phase:** Phase 0 — Foundation, Strategy, Structure, Content, UX, SEO & Technical Blueprint  
> **Status:** DECIDED (Production-Verified)  
> **Classification Standard:** DECIDED | PROPOSED | TBD | OPTIONAL | DEPENDENCY  

---

## 1. Dual-Sitemap Architecture

OrigoHOST employs a clean, conflict-free dual-sitemap architecture serving both search engine crawlers and human visitors:

```
                                SITEMAP ARCHITECTURE
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
          MACHINE SITEMAP                                  HUMAN DIRECTORY
         (/sitemap.xml)                                       (/sitemap)
                  │                                               │
      • Route Handler (/sitemap.xml)                  • Server Component Page
      • XML Protocol 0.9 standard                     • Hierarchical 5-Cluster Layout
      • Dynamic lastmod from data                     • Breadcrumbs & Accessible Links
      • Force-static / 24hr Cache                     • Excludes system/error routes
```

---

## 2. Collision & Conflict Resolution History (`DECIDED`)

| Issue Identified | Root Cause | Architectural Solution | Status |
| :--- | :--- | :--- | :--- |
| **Route Collision at `/sitemap`** | `src/app/sitemap.ts` and `src/app/sitemap/page.tsx` competed for `/sitemap` in Next.js App Router. | Converted the XML sitemap to `src/app/sitemap.xml/route.ts` while keeping the human page at `src/app/sitemap/page.tsx`. | **Resolved** |
| **Static File Shadowing** | `public/robots.txt` intercepted `/robots.txt` before App Router could execute `src/app/robots.ts`. | Removed `public/robots.txt`. All robots directives now generate dynamically from `src/app/robots.ts`. | **Resolved** |

---

## 3. Inclusion & Exclusion Policy

### Inclusion Criteria
- All canonical, indexable public marketing, educational, and informational pages.
- Dynamic detail pages with verified slugs and active content (`/events/[slug]`, `/programs/[slug]`, `/blog/[slug]`).

### Strict Exclusion Criteria
- **Internal / Query Pages:** `/search` (prevents crawler loops and thin query pages).
- **Self-Referential Index:** `/sitemap` (omitted from XML sitemap to prevent circular indexing).
- **Operational / Error States:** `/403`, `/404`, `/500`, `/maintenance`.
- **API Endpoints:** `/api/contact`, `/api/join`, and all `/api/*`.

---

## 4. Canonical Inventory in `sitemap.xml` (24 URLs)

### Static Routes (16 URLs)
```xml
<url>
  <loc>https://origohost.com</loc>
  <lastmod>2026-08-28T00:00:00.000Z</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
</url>
<!-- /events (0.9, weekly) -->
<!-- /programs (0.9, weekly) -->
<!-- /about (0.8, weekly) -->
<!-- /community (0.8, weekly) -->
<!-- /resources (0.8, weekly) -->
<!-- /blog (0.8, weekly) -->
<!-- /join (0.8, monthly) -->
<!-- /partners (0.7, monthly) -->
<!-- /sponsors (0.7, monthly) -->
<!-- /team (0.7, monthly) -->
<!-- /contact (0.7, monthly) -->
<!-- /gallery (0.6, monthly) -->
<!-- /faq (0.6, monthly) -->
<!-- /privacy-policy (0.3, yearly) -->
<!-- /terms (0.3, yearly) -->
```

### Dynamic Routes (8 URLs)

#### Events (`/events/[slug]`)
1. `https://origohost.com/events/kss2026-ep03-cybersecurity-ethical-hacking` (`lastmod: 2026-07-20`)
2. `https://origohost.com/events/cyberforge-2026` (`lastmod: 2026-06-15`)
3. `https://origohost.com/events/kss2026-ep04-cloud-devops` (`lastmod: 2026-08-28`)
4. `https://origohost.com/events/generative-ai-workshop-2026` (`lastmod: 2026-08-28`)

#### Programs (`/programs/[slug]`)
1. `https://origohost.com/programs/knowledge-sharing-series-2026` (`lastmod: 2026-08-28`)
2. `https://origohost.com/programs/origo-ai-foundation-program` (`lastmod: 2026-08-28`)

#### Blog Articles (`/blog/[slug]`)
1. `https://origohost.com/blog/launching-kss-2026-webinar-series` (`lastmod: 2026-08-20`)
2. `https://origohost.com/blog/cyberforge-2026-hackathon-highlights` (`lastmod: 2026-06-15`)

---

## 5. Technical Implementation Directives

```ts
// src/app/sitemap.xml/route.ts
export const dynamic = 'force-static';
export const revalidate = 86400; // 24-hour cache regeneration
```

- Content-Type header: `application/xml; charset=utf-8`.
- Deterministic ISO timestamps (no dynamic `new Date()` calls that trigger unnecessary re-crawling).
- Fully validated against Google Search Console sitemap schema guidelines.
