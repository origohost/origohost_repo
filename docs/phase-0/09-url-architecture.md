# 09 — URL Architecture & Routing Strategy

> **Phase:** Phase 0 — Foundation, Strategy, Structure, Content, UX, SEO & Technical Blueprint  
> **Status:** DECIDED (Routing & Canonical Standard)  
> **Classification Standard:** DECIDED | PROPOSED | TBD | OPTIONAL | DEPENDENCY  

---

## 1. Global URL Principles

```
   VALID URL PATTERN:
   https://origohost.com / [section] / [kebab-case-slug]
   └────────┬──────────┘   └───┬───┘   └───────┬───────┘
     Protocol & Origin      Category       Entity Slug
     (Strict HTTPS)        (Lowercase)     (No Trailing Slash)
```

1. **Protocol & Host:** Canonical origin is strictly `https://origohost.com`. (`DECIDED`)
2. **Trailing Slash Standard:** Strict **NO trailing slash** policy. `/about/` must 308-redirect to `/about`. (`DECIDED`)
3. **Casing Standard:** All URLs and path segments must be strictly lowercase. (`DECIDED`)
4. **Slug Format:** Alphanumeric characters separated by single hyphens (`^[a-z0-9]+(-[a-z0-9]+)*$`). No underscores, uppercase letters, or special characters. (`DECIDED`)

---

## 2. URL Directory Inventory

### Static Canonical URLs (`DECIDED`)
```
/                      ← Homepage
/about                 ← About, mission & ecosystem
/community             ← Chapters & developer pathways
/events                ← Hackathons, webinars & meetup index
/programs              ← Multi-week learning cohorts
/resources             ← Technical guides & chapter documentation
/partners              ← Academic & ecosystem collaboration
/sponsors              ← Corporate sponsorship & tiers
/team                  ← Leadership & organizers
/contact               ← Categorized communication intake
/join                  ← Core 5-pathway onboarding
/blog                  ← Articles, news & event reports
/gallery               ← Event & media photography archive
/faq                   ← Categorized question repository
/privacy-policy        ← Data protection policy
/terms                 ← Terms of use & code of conduct
/sitemap               ← User-facing HTML directory
/search                ← Keyword search results (noindex)
/403                   ← Access forbidden
/404                   ← Not found
/500                   ← Server error
/maintenance           ← Maintenance status
```

### Dynamic Canonical URLs (`DECIDED`)
```
/events/[slug]         ← Specific event details (e.g. /events/cyberforge-2026)
/programs/[slug]       ← Program cohort syllabus (e.g. /programs/knowledge-sharing-series-2026)
/blog/[slug]           ← Specific article (e.g. /blog/launching-kss-2026-webinar-series)
```

### Dynamic Route Evaluation
- **`/resources/[slug]`:** Evaluated and `DECIDED: OMITTED`. Resources are downloadable files, external tools, or short guides categorized directly on `/resources`. A detail page adds unnecessary click depth.
- **`/projects/[slug]`:** `PROPOSED` for Phase 2 once production open-source repositories are ready.

---

## 3. Redirect & Legacy URL Handling

### Next.js Configuration
```ts
// next.config.ts
const nextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/events/',
        destination: '/events',
        permanent: true,
      },
      {
        source: '/programs/',
        destination: '/programs',
        permanent: true,
      },
      {
        source: '/kss2026',
        destination: '/programs/knowledge-sharing-series-2026',
        permanent: true,
      },
      {
        source: '/cyberforge',
        destination: '/events/cyberforge-2026',
        permanent: true,
      },
    ];
  },
};
```
