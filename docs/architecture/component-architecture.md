# OrigoHOST — Component Architecture

> Stack: **Next.js App Router + TypeScript + Tailwind CSS + Framer Motion**

---

## 1. Hierarchy

```
src/app/layout.tsx            ← Root layout (persistent shell across all pages)
    └── Header (navigation)
    └── <children />          ← Page outlet
    └── Footer

src/app/{page}/page.tsx       ← Next.js page — imports sections, sets metadata
    └── src/pages/{page}/sections/   ← Page-specific section components
        └── uses → src/components/**
        └── uses → src/sections/**

src/sections/                 ← Globally shared sections (used across 2+ pages)
    └── uses → src/components/**

src/components/               ← Leaf-level, presentational, fully typed UI components
```

---

## 2. Component Responsibilities

### src/app/{page}/page.tsx
- Exports Next.js `metadata` object for SEO
- Imports and composes section components
- Fetches page-level data (via `async` server component or data import)
- Does NOT contain inline UI implementation

### src/pages/{page}/sections/
- Page-specific section components — not reused elsewhere
- Receive data as props from the page
- Use Framer Motion for scroll-triggered animations
- Promote to `src/sections/` if reuse across 2+ pages is needed

### src/sections/
- Globally reusable section components
- Accept all content via typed props
- Include Framer Motion entrance animations by default

### src/components/
- Leaf-level, stateless, typed components
- No direct data fetching
- No Tailwind class strings hardcoded outside of `cn()` composition
- Each folder: `ComponentName.tsx` + `index.ts` + optional `.test.tsx`

---

## 3. Component Inventory

### navigation/
| Component | Description |
|-----------|-------------|
| `Header` | Site header — logo, nav links, primary CTA, mobile menu toggle |
| `NavBar` | Desktop horizontal nav (Framer Motion underline hover) |
| `MobileMenu` | Mobile drawer (Framer Motion slide-in) |
| `Breadcrumb` | Hierarchical breadcrumb trail |

### footer/
| Component | Description |
|-----------|-------------|
| `Footer` | Full footer with brand statement, nav groups, social, legal |
| `FooterNav` | Footer navigation column group |
| `FooterSocial` | Social link icons row |

### buttons/

All buttons use Framer Motion for hover interactions.

| Component | Props | Description |
|-----------|-------|-------------|
| `Button` | `variant`, `size`, `href`, `disabled`, `loading`, `magnetic` | Primary / secondary / ghost button |
| `IconButton` | `icon`, `label`, `variant` | Icon-only button |
| `LinkButton` | `href`, `external` | Styled anchor link |

**Magnetic button:** When `magnetic={true}`, uses Framer Motion `useMotionValue` + `useSpring` to follow cursor within a proximity radius.

### cards/

All cards use Framer Motion `whileHover` lift effect.

| Component | Description |
|-----------|-------------|
| `EventCard` | Event card with type badge, format, date, delivery mode |
| `ProgramCard` | Program card with status badge and CTA |
| `ArticleCard` | Blog article card with category, author, date |
| `ResourceCard` | Resource card with type badge and external link indicator |
| `TeamCard` | Team member profile card with approved social links |
| `PartnerCard` | Partner logo card with category label |
| `SponsorCard` | Sponsor logo card |
| `GalleryCard` | Single media item (image/video thumbnail) |

### forms/

All form components use React Hook Form for state management and Zod via `src/schemas/` for validation.

| Component | Description |
|-----------|-------------|
| `FormField` | Wrapper: label + input + error message |
| `Input` | Text input field (typed) |
| `Textarea` | Multi-line text area |
| `Select` | Dropdown select |
| `Checkbox` | Checkbox with label |
| `RadioGroup` | Group of radio options |
| `ContactForm` | Full contact inquiry form — POST to `/api/contact` |
| `JoinForm` | Get Involved / Join pathway form — POST to `/api/join` |

### typography/
| Component | Props | Description |
|-----------|-------|-------------|
| `Heading` | `as` (h1–h6), `size`, `weight`, `className` | Semantic heading |
| `Body` | `size`, `color`, `className` | Body text paragraph |
| `Kicker` | `className` | Small uppercase eyebrow label |
| `Caption` | `className` | Small metadata text |
| `Label` | `htmlFor`, `className` | Form or UI label |

### media/
| Component | Description |
|-----------|-------------|
| `Image` | Wraps `next/image` — enforces alt text, adds skeleton loader |
| `VideoEmbed` | Responsive embedded video (YouTube/Vimeo) |
| `Avatar` | Circular profile avatar using `next/image` |
| `MediaGallery` | Grid/masonry gallery with Framer Motion stagger |
| `LogoMark` | OrigoHOST logo variants (full, symbol, wordmark) as SVG |

### common/
| Component | Description |
|-----------|-------------|
| `Badge` | Pill badge for type/status labels (Tailwind variants) |
| `Tag` | Clickable filter tag |
| `Divider` | Horizontal rule divider |
| `EmptyState` | Illustrated empty state with message and optional CTA |
| `AlertBanner` | Inline alert (info / warning / error / success) |
| `Pagination` | Pagination controls |
| `SearchInput` | Search input with icon and keyboard shortcut hint |

### loaders/
| Component | Description |
|-----------|-------------|
| `Spinner` | Circular loading spinner (Framer Motion rotate) |
| `Skeleton` | Content placeholder skeleton (Tailwind animate-pulse) |
| `ProgressBar` | Linear progress (Framer Motion width animation) |

### modals/
| Component | Description |
|-----------|-------------|
| `Modal` | Accessible modal dialog (Framer Motion scale-in/fade-in) |
| `Drawer` | Side drawer panel (Framer Motion slide-in) |

---

## 4. Section Inventory (src/sections/)

All sections use Framer Motion `whileInView` with `once: true` for scroll-triggered reveals.

| Section | Pages Used On | Motion Pattern |
|---------|-------------|----------------|
| `Hero` | Home, About, Community, Events, Programs, etc. | Fade + slide up on mount |
| `CTA` | Home (bottom), Join, various | Fade + scale up on scroll |
| `Statistics` | Home, About | Count-up numbers + stagger |
| `Testimonials` | Home, Community | Drag/swipe carousel |
| `Newsletter` | Various | Fade on scroll |
| `Featured` | Home | Staggered card entrance |

---

## 5. Framer Motion Shared Variants (src/lib/motion.ts)

```ts
// Standard variants used across sections and components

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const cardHover = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: 0.2 } },
};
```

---

## 6. Human-Design Principles (Document 10)

These principles govern layout and visual composition — not just component internals.

| Principle | Application |
|-----------|------------|
| **Asymmetric Layouts** | Avoid rigid equal-column grids; use intentional asymmetry in hero, feature and about sections |
| **Organic Whitespace** | Generous, intentional whitespace — not padding to fill gaps |
| **Editorial Composition** | Content laid out like editorial design — varied type sizes, rhythm, hierarchy |
| **Visual Hierarchy** | Clear distinction between display text, headings, body, captions — never flat |

---

## 7. Interaction & Animation Patterns (Document 10)

| Pattern | Implementation |
|---------|---------------|
| **Page transitions** | Framer Motion `AnimatePresence` with `layout` prop |
| **Micro-interactions** | `whileHover`, `whileTap` on all interactive elements |
| **Hover states** | Scale, translate-y, box-shadow changes via Framer Motion |
| **Magnetic buttons** | `useMotionValue` + `useSpring` cursor tracking |
| **Scroll reveals** | `whileInView` with `once: true` and `viewport={{ amount: 0.2 }}` |
| **Stagger grids** | `variants` with `staggerChildren` on container |
| **Reduced motion** | `useReducedMotion()` hook — pass `{ duration: 0 }` when true |

---

## 8. State Management

- **Global state:** Minimal — theme preference, nav open/closed, search query via React Context
- **Server state:** Fetched in Next.js Server Components or via `src/services/`
- **Local state:** `useState` / `useReducer` within page or component
- **Form state:** React Hook Form
- **Avoid prop drilling** deeper than 2 levels — use context or composition
- **No Redux or Zustand** unless complexity demands it in future

---

## 9. Component Rules

1. All interactive elements must have unique, descriptive `id` attributes.
2. Every component must have a TypeScript `interface` for props — no implicit `any`.
3. No hardcoded color values — always use Tailwind token classes or `cn()` composition.
4. All animations must use Framer Motion — no raw CSS `@keyframes` for interactive elements.
5. All animations must respect `prefers-reduced-motion` via `useReducedMotion()`.
6. Card components must not fetch their own data.
7. All `<Image />` usage must have non-empty, meaningful `alt` text.
8. All form components must support error and loading states.
9. Avoid generic AI design patterns — asymmetric, editorial, brand-consistent layouts only.
10. All components must have at minimum a basic render test.
