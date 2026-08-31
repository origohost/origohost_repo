# OrigoHOST — Architecture Documentation Index

This folder documents the technical and structural architecture of the OrigoHOST website.

---

## Documents in This Folder

| Document | Purpose |
|----------|---------|
| [site-architecture.md](./site-architecture.md) | Pages, routing, navigation hierarchy |
| [folder-structure.md](./folder-structure.md) | Project directory conventions and rules |
| [data-models.md](./data-models.md) | Core content entity schemas |
| [component-architecture.md](./component-architecture.md) | Component hierarchy and design system |
| [tech-stack.md](./tech-stack.md) | Approved technology stack and rationale |

---

## Approved Technology Stack (Locked — Document 10)

| Layer | Technology | Status |
|-------|-----------|--------|
| Framework | **Next.js** (App Router) | ✅ Approved |
| Language | **TypeScript** | ✅ Approved |
| Styling | **Tailwind CSS** | ✅ Approved |
| Animations | **Framer Motion** | ✅ Approved |
| PWA | Web Manifest + Service Worker | ✅ Approved |
| Backend / DB | **Firebase** or **Supabase** | ✅ Approved |

---

## Architecture Principles

1. **Next.js App Router** — all pages use the App Router pattern; no Pages Router.
2. **TypeScript everywhere** — no untyped `.js` files in `src/`.
3. **Tailwind CSS utility-first** — design tokens extended in `tailwind.config.ts`.
4. **Framer Motion for all animations** — no CSS-only keyframe animations for interactive elements.
5. **Component-driven** — UI is composed of reusable, focused components.
6. **Content-first** — data and content are decoupled from presentation.
7. **Master-brand-led** — one ecosystem, one brand, multiple expressions.
8. **PWA-ready** — manifest, service worker and offline support from day one.
9. **SEO-ready** — every public page uses Next.js metadata API.
10. **Scalable** — structure accommodates future pages, ecosystems and integrations.
11. **No generic AI design** — follow OrigoHOST brand system; avoid default AI aesthetic patterns.
