# 20 — Phase 0 Architectural Decisions, Assumptions & Conflict Registry

> **Phase:** Phase 0 — Foundation, Strategy, Structure, Content, UX, SEO & Technical Blueprint  
> **Status:** AUDITED & LOGGED  
> **Classification Standard:** DECIDED | PROPOSED | TBD | OPTIONAL | DEPENDENCY  

---

## 1. Architectural Decisions Register

| ID | Decision Item | Category | Justification |
| :--- | :--- | :---: | :--- |
| **D-01** | **Master Brand Architecture Model** | `DECIDED` | OrigoHOST operates as a unified Branded House. The 6 entities (Cloud, Academy, Community, Events, AI, Dev) are sub-expressions, not independent competing brands. |
| **D-02** | **App Router Server-First Architecture** | `DECIDED` | Next.js App Router with Server Components by default guarantees superior SEO, zero hydration penalties, and fast TTFB. |
| **D-03** | **Sitemap Conflict Resolution** | `DECIDED` | Machine sitemap is hosted at `src/app/sitemap.xml/route.ts` and human directory at `src/app/sitemap/page.tsx` to eliminate Next.js route collision. |
| **D-04** | **Static Robots.txt Elimination** | `DECIDED` | Removed `public/robots.txt` so that dynamic Next.js `src/app/robots.ts` with complete `Disallow` rules and canonical sitemap link is served reliably. |
| **D-05** | **No Trailing Slashes Standard** | `DECIDED` | All canonical URLs enforce no-trailing-slash. Trailing slashes permanently 308-redirect to canonical paths. |
| **D-06** | **Strict WCAG 2.2 AA Compliance** | `DECIDED` | Semantic landmarks, accessible form labels, keyboard navigation, and reduced-motion fallbacks are built into foundational components. |
| **D-07** | **Zero Third-Party Tracking in Phase 0** | `DECIDED` | Protects visitor privacy, minimizes client bundle size, and maintains sub-second page delivery. |
| **D-08** | **5 Structured Pathways on `/join`** | `DECIDED` | Participant, Volunteer, Speaker, Mentor, and Campus Lead pathways provide clean, categorized user onboarding. |
| **D-09** | **Deferral of `/projects` Directory** | `PROPOSED` | Evaluated as an optional Phase 2 enhancement. In Phase 0/1, projects will be highlighted inside `/resources` and `/events/[slug]`. |
| **D-10** | **Static Content Storage in `src/data/`** | `DECIDED` | Eliminates external CMS latency and failure points during launch while maintaining full TypeScript validation. |

---

## 2. Key Working Assumptions

1. **Brand Assets (`DECIDED`):** Official logos in `/logo/` and `public/images/brand/` reflect the true visual identity of OrigoHOST.
2. **Hosting Environment (`DEPENDENCY`):** The application will be deployed to a Node.js/Vercel/Docker environment capable of executing Next.js 15 App Router server handlers.
3. **Domain & SSL (`DEPENDENCY`):** `https://origohost.com` is configured with valid TLS/SSL certificates and DNS records.
4. **Form Delivery (`DEPENDENCY`):** Outgoing notifications from `/api/contact` and `/api/join` will eventually connect to an internal email dispatch service (e.g. Resend, SendGrid, or Slack/Discord webhooks).

---

## 3. Conflict Registry & Resolutions

### Conflict 1: Static Route Collision at `/sitemap`
- **Identified Conflict:** `src/app/sitemap.ts` (metadata route generating `/sitemap`) collided with `src/app/sitemap/page.tsx` (human page at `/sitemap`), throwing `Conflicting page and metadata at /sitemap`.
- **Architectural Impact:** Dev server halted with 500 Internal Server Error.
- **Recommended & Executed Solution:** Relocated the XML route handler to `src/app/sitemap.xml/route.ts`. Search engines read `/sitemap.xml`, and human visitors navigate `/sitemap`.
- **Status:** **RESOLVED** (`DECIDED`).

### Conflict 2: Static `public/robots.txt` Shadowing Dynamic Directives
- **Identified Conflict:** A pre-existing static file `public/robots.txt` was being served by Next.js static asset handler, bypassing `src/app/robots.ts` and omitting `Disallow` rules for `/api/`, `/search`, and `/maintenance`.
- **Architectural Impact:** Search engines crawled internal APIs and maintenance endpoints, diluting crawl budget.
- **Recommended & Executed Solution:** Permanently deleted `public/robots.txt`. Now `src/app/robots.ts` serves dynamically with full crawler rules.
- **Status:** **RESOLVED** (`DECIDED`).

### Conflict 3: Status of `/projects` in Information Architecture
- **Identified Conflict:** Some early design references listed `/projects` as a top-level page, while the approved 22-page baseline sitemap omitted it in favor of `/resources`.
- **Architectural Impact:** Expanding to 23 pages without sufficient production repositories creates empty or thin pages.
- **Recommended Solution:** Categorize `/projects` as `OPTIONAL` for Phase 2. Feature open-source initiatives inside `/resources` for Phase 1.
- **Status:** **PROPOSED / TBD** (Awaiting formal stakeholder sign-off).
