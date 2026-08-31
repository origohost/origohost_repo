# 11 — Performance Strategy & Core Web Vitals

> **Phase:** Phase 0 — Foundation, Strategy, Structure, Content, UX, SEO & Technical Blueprint  
> **Status:** DECIDED (Performance & Web Vitals Benchmark)  
> **Classification Standard:** DECIDED | PROPOSED | TBD | OPTIONAL | DEPENDENCY  

---

## 1. Core Web Vitals Targets

The OrigoHOST platform enforces strict performance budgets designed to guarantee flawless delivery even on mid-tier mobile devices and 3G/4G networks across India:

```
┌─────────────────────────────────────────────────────────────┐
│                 CORE WEB VITALS THRESHOLDS                  │
├───────────────────────────────┬─────────────────────────────┤
│ Metric                        │ Production Target           │
├───────────────────────────────┼─────────────────────────────┤
│ Largest Contentful Paint (LCP)│ ≤ 1.8 seconds (Mobile)      │
│ Interaction to Next Paint(INP)│ ≤ 150 milliseconds         │
│ Cumulative Layout Shift (CLS) │ ≤ 0.05                      │
│ First Contentful Paint (FCP)  │ ≤ 1.0 second                │
│ Time to First Byte (TTFB)     │ ≤ 250 milliseconds         │
│ Total Blocking Time (TBT)     │ ≤ 100 milliseconds         │
└───────────────────────────────┴─────────────────────────────┘
```

---

## 2. Rendering Strategy Architecture

```
                                RENDERING MATRIX
                                        │
           ┌────────────────────────────┼────────────────────────────┐
           ▼                            ▼                            ▼
   STATIC (SSG / Prebuild)       ISR (Time-Based)             CLIENT ISOLATED
   • Home (/)                    • Events (/events)           • JoinForm (/join)
   • About (/about)              • Event Detail ([slug])      • ContactForm (/contact)
   • Community (/community)      • Programs (/programs)       • SearchFilters (/search)
   • Team (/team)                • Program Detail ([slug])    • MobileMenu (Header)
   • Legal (/privacy-policy)     • Blog (/blog)               • Accordion (/faq)
   • Sitemap (/sitemap.xml)      • Article ([slug])           
```

1. **Server Components by Default:** 90%+ of all markup is rendered on the server as pure HTML without hydration overhead.
2. **Client Component Isolation:** Leaf components requiring user events (`onClick`, form state) are isolated using `"use client"` at the lowest possible level in the DOM tree.

---

## 3. Asset & Media Optimization

### Images (`next/image`)
- Configured with modern formats (`['image/avif', 'image/webp']`).
- Automatic `sizes` prop specified on all cards and responsive images to prevent downloading desktop resolutions on mobile.
- `priority` flag reserved strictly for hero LCP images.
- All non-hero images set to native `loading="lazy"`.

### Typography (`next/font`)
- Preloaded locally or via `next/font/google` with `display: 'swap'` and `variable` declarations.
- Prevents Flash of Unstyled Text (FOUT) and Flash of Invisible Text (FOIT), ensuring zero CLS during font swaps.

### Package Optimization
- Package import optimization enabled in `next.config.ts` for `lucide-react` and `framer-motion`:
```ts
experimental: {
  optimizePackageImports: ['lucide-react', 'framer-motion'],
}
```
- Eliminates bundling the full icon library, keeping the shared JS chunk under 105KB.
