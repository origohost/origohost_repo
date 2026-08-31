# OrigoHOST — Technology Stack

> **Status: APPROVED & LOCKED** — Document 10 (Design System & Development Guidelines)
> The stack below is no longer an open implementation decision.

---

## 1. Stack Overview

| Layer | Technology | Version Target | Purpose |
|-------|-----------|----------------|---------|
| **Framework** | Next.js | Latest stable | Full-stack React framework with App Router, SSR/SSG/ISR, metadata API |
| **Language** | TypeScript | Latest stable | Type safety across all source files |
| **Styling** | Tailwind CSS | v3 / v4 | Utility-first CSS; design tokens via `tailwind.config.ts` |
| **Animations** | Framer Motion | Latest stable | All micro-interactions, page transitions, hover states, magnetic buttons |
| **PWA** | next-pwa or custom | — | Web Manifest, Service Worker, offline support, installability |
| **Backend / DB** | Firebase **or** Supabase | — | Database, authentication, storage, serverless functions |

---

## 2. Next.js — App Router

### Why Next.js
- SSR/SSG/ISR gives full control over rendering strategy per page
- Built-in Image optimization (`next/image`) — critical for event galleries and team photos
- Built-in Font optimization (`next/font`) — for brand typography
- Metadata API (`export const metadata`) — required for per-page SEO
- File-system routing with App Router layouts
- Built-in API Routes for form handling (contact, join)
- Strong ecosystem, deployment flexibility

### App Router Conventions

```
src/app/
├── layout.tsx              ← Root layout (HTML shell, providers, font loading)
├── page.tsx                ← Home page (/)
├── about/
│   └── page.tsx            ← About page (/about)
├── events/
│   ├── page.tsx            ← Events listing (/events)
│   └── [slug]/
│       └── page.tsx        ← Event detail (/events/:slug)
├── programs/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
├── blog/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
├── api/
│   ├── contact/
│   │   └── route.ts        ← POST /api/contact
│   └── join/
│       └── route.ts        ← POST /api/join
└── not-found.tsx           ← 404 page
```

### Rendering Strategy per Page

| Page | Strategy | Reason |
|------|---------|--------|
| Home | SSG | Static content, fast delivery |
| About | SSG | Static content |
| Events listing | ISR (revalidate: 3600) | Updated frequently |
| Event detail | ISR (revalidate: 3600) | Updated per event |
| Programs | SSG | Infrequently updated |
| Resources | ISR | Updated periodically |
| Blog listing | ISR (revalidate: 3600) | New articles added |
| Article | ISR (revalidate: 86400) | Rarely updated after publish |
| Team | SSG | Infrequently updated |
| Partners | SSG | Infrequently updated |
| FAQ | SSG | Infrequently updated |
| Contact | SSR / Client | Form page; no caching needed |
| Join | SSR / Client | Form page |
| 404 / 500 | Static | System pages |

---

## 3. TypeScript

### Rules
- All source files in `src/` must be `.ts` or `.tsx` — no `.js` or `.jsx`
- All component props must have explicit TypeScript interfaces or types
- All data models must have corresponding TypeScript types in `src/types/`
- All API route handlers must have typed request/response shapes
- Strict mode enabled in `tsconfig.json`
- No `any` types except where absolutely unavoidable (and must be commented)

### Key Type Locations

```
src/types/
├── event.types.ts
├── program.types.ts
├── resource.types.ts
├── article.types.ts
├── team.types.ts
├── partner.types.ts
├── sponsor.types.ts
├── gallery.types.ts
├── faq.types.ts
├── contact.types.ts
└── index.ts              ← Re-exports all types
```

---

## 4. Tailwind CSS

### Configuration
- Extend the default Tailwind theme in `tailwind.config.ts` with OrigoHOST brand tokens
- All brand colors, fonts, spacing, radius and shadow values defined as custom tokens
- No hardcoded color values in components — always reference tokens
- Tailwind `@layer components` used for reusable component classes
- Dark mode support via `class` strategy (for future dark theme)

### Brand Token Extension (tailwind.config.ts)

```ts
theme: {
  extend: {
    colors: {
      brand: {
        deepblue: '#001858',    // Approximate — update with verified value
        electric: '#0056FF',    // Approximate — update with verified value
      },
      // Semantic tokens
      primary: { ... },
      accent: { ... },
      surface: { ... },
      // etc.
    },
    fontFamily: {
      sans: [...],    // Primary font — to be confirmed from brand spec
      display: [...], // Display font — to be confirmed
    },
    // spacing, borderRadius, boxShadow extensions
  }
}
```

### Tailwind Conventions
- Use `cn()` utility (clsx + tailwind-merge) for conditional class composition
- Never use inline `style={{}}` for values that exist as Tailwind tokens
- Responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Group related Tailwind classes: layout → spacing → typography → color → border → shadow → transition

---

## 5. Framer Motion

### Scope of Use (Document 10 — Approved)
- **Page transitions** — smooth enter/exit between routes
- **Micro-interactions** — button hovers, card lifts, icon animations
- **Hover states** — scale, translate, color transitions
- **Magnetic buttons** — primary CTA buttons
- **Scroll-triggered animations** — `whileInView` on section reveals
- **Stagger animations** — card grids, list items entering sequentially

### Core Patterns

```tsx
// Section reveal — standard pattern
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>

// Card hover — standard pattern
<motion.div
  whileHover={{ y: -4, boxShadow: '...' }}
  transition={{ duration: 0.2 }}
>

// Stagger children — standard pattern
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
  ))}
</motion.div>
```

### Accessibility
- All Framer Motion animations must respect `prefers-reduced-motion`
- Use `useReducedMotion()` hook and pass `{ duration: 0 }` when reduced motion is preferred

---

## 6. PWA (Progressive Web App)

### Requirements (Document 10 — Approved)
- Web App Manifest (`public/manifest.json`)
- Service Worker for offline support
- Installability (add to home screen)
- Caching strategy for static assets and key pages
- Offline fallback page

### Manifest Fields

```json
{
  "name": "OrigoHOST",
  "short_name": "OrigoHOST",
  "description": "Where Builders Become Innovators",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#001858",
  "theme_color": "#0056FF",
  "icons": [
    { "src": "/favicon/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/favicon/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### Caching Strategy
- Static assets (JS, CSS, fonts, images): Cache-first
- API responses: Network-first with offline fallback
- Pages: Stale-while-revalidate for ISR pages

---

## 7. Firebase / Supabase

### Use Cases
| Use Case | Firebase | Supabase |
|----------|---------|---------|
| Contact form submissions | Firestore | PostgreSQL table |
| Join form submissions | Firestore | PostgreSQL table |
| File storage (media) | Cloud Storage | Storage |
| Authentication (admin/editor) | Firebase Auth | Supabase Auth |
| Real-time updates | Realtime DB | Realtime subscriptions |

### Decision Criteria
- Choose **Firebase** if the team is more comfortable with NoSQL and Google ecosystem
- Choose **Supabase** if relational data and SQL queries are preferred
- Final choice to be approved by technical lead before implementation

### Security Rules
- All write operations require authentication
- Public read is limited to published/approved content only
- Form submissions validated server-side via Next.js API routes before writing to DB
- No direct client-side writes to database from public-facing pages

---

## 8. Development Guidelines (Document 10 — AI/Antigravity Rules)

These rules apply specifically when AI assists in code generation:

### ✅ Follow OrigoHOST Brand System
- Always use brand color tokens — never hardcode hex values
- Use the approved font system from `tailwind.config.ts`
- Follow asymmetric layouts and editorial composition principles
- Use organic whitespace and visual hierarchy

### ❌ Avoid Generic AI Design Patterns
| Anti-pattern | Correct approach |
|-------------|-----------------|
| Excessive gradients everywhere | Use gradients purposefully, sparingly |
| Generic card grids (3-col equal cards) | Use asymmetric, editorial layouts |
| Default system typography | Use brand fonts from tailwind config |
| Generic hero with centered text + blue button | Use brand-specific hero compositions |
| Cookie-cutter feature sections | Design with brand personality in mind |
| Floating hologram stock images | Use authentic OrigoHOST event photography |

---

## 9. Frontend Architecture Guidelines (Document 10)

```
src/app/                  ← Next.js App Router (pages, layouts, API routes)
src/components/           ← Reusable UI components (typed props, no data fetching)
src/sections/             ← Globally reusable page sections
src/pages-sections/       ← Page-specific section components (co-located with pages)
src/lib/                  ← Firebase/Supabase client, third-party inits
src/hooks/                ← Custom React hooks
src/types/                ← All TypeScript types
src/utils/                ← Pure utility functions
src/constants/            ← App-wide constants (ROUTES, etc.)
src/styles/               ← Tailwind base + global CSS
```

### Component File Structure

```
src/components/cards/EventCard/
├── EventCard.tsx          ← Component with TypeScript interface
├── EventCard.test.tsx     ← Unit test
└── index.ts               ← Re-export
```

---

## 10. Quality & Design Acceptance Criteria (Document 10)

| Category | Requirement |
|----------|------------|
| **Performance** | LCP < 2.5s, CLS < 0.1, INP < 100ms; Lighthouse ≥ 85 |
| **Accessibility** | WCAG 2.2 AA; keyboard nav; focus indicators; screen reader tested |
| **Responsiveness** | Works correctly at 320px, 768px, 1024px, 1440px, 1920px |
| **SEO** | Unique titles, meta descriptions, canonical, OG tags, sitemap |
| **PWA** | Manifest valid, service worker registered, installable, offline fallback |
| **Visual Consistency** | Follows OrigoHOST brand system; no generic AI patterns; passes brand review |
