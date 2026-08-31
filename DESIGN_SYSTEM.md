# OrigoHOST Design System Specification
> **Version:** 1.0.0 (Phase 1 Baseline)  
> **Target Framework:** Next.js 15+ (App Router), TypeScript, Tailwind CSS, Framer Motion  
> **Brand Philosophy:** *"Where Builders Become Innovators"* — Built for people who build platforms.  

---

## 1. Brand Identity & Principles

OrigoHOST's visual identity communicates technical depth, infrastructural reliability, modern precision, and developer confidence. It avoids generic SaaS hype, bright neon purple gradients, cyberpunk gimmickry, and excessive glassmorphism.

```
┌─────────────────────────────────────────────────────────────┐
│                    CORE BRAND ATTRIBUTES                    │
├──────────────────────────────┬──────────────────────────────┤
│ TECHNICAL & INFRASTRUCTURAL  │ PRECISE & GEOMETRIC          │
│ Grounded in real systems.    │ Clean grid alignment & lines.│
├──────────────────────────────┼──────────────────────────────┤
│ CONFIDENT & PREMIUM          │ DEVELOPER-ORIENTED           │
│ Deep navy, electric blue.    │ Code blocks, monospaced tags.│
└──────────────────────────────┴──────────────────────────────┘
```

- **Master Brand Role:** OrigoHOST is the single master brand. Sub-entities (**Origo Cloud**, **Origo Academy**, **Origo Community**, **Origo Events**, **Origo AI**, and **Origo Dev**) are unified operational expressions.
- **Color Roles:**
  - **Midnight Navy (`#001857`):** The foundational brand color. Powers strong surfaces, footers, and brand anchors.
  - **Electric Blue (`#0055FF`):** The action and emphasis color. Reserved for primary CTAs, active links, focus rings, and featured highlights. **Never turn the entire interface blue.**

---

## 2. Color System & Design Tokens

Defined centrally in `src/styles/tokens/tokens.css` and mapped to Tailwind utilities in `tailwind.config.ts`.

### Light Mode
| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `--color-bg` | `#F7F9FC` | Default canvas background |
| `--color-surface` | `#FFFFFF` | Cards, panels, inputs |
| `--color-surface-elevated` | `#FFFFFF` | Elevated dropdowns, popovers |
| `--color-text-primary` | `#08152F` | Headings, primary body copy |
| `--color-text-secondary` | `#44516A` | Subtitles, descriptions, secondary copy |
| `--color-text-muted` | `#69758A` | Captions, placeholders, metadata |
| `--color-border` | `#D9E0EC` | Component borders, separators |
| `--color-primary` | `#0047D9` | High-contrast interactive buttons, links |
| `--color-accent` | `#0055FF` | Electric blue focus rings and accents |

### Dark Mode
| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `--color-bg` | `#050A16` | Deep canvas background |
| `--color-surface` | `#0A1222` | Card backgrounds, search panels |
| `--color-surface-elevated` | `#101B30` | Modals, elevated cards, dropdowns |
| `--color-text-primary` | `#F4F7FF` | Primary text, titles |
| `--color-text-secondary` | `#B7C2D9` | Descriptions, labels |
| `--color-text-muted` | `#7F8CA5` | Timestamps, inactive metadata |
| `--color-border` | `#1C2A43` | Dark theme component borders |
| `--color-primary` | `#3D7CFF` | Electric blue primary actions |
| `--color-hover` / focus | `#5A91FF` | Hover and focus states |

---

## 3. Typography Hierarchy

- **Primary Typeface:** `Inter` (sans-serif) via `next/font/google`.
- **Display Typeface:** Geometric display scale via `font-display`.
- **Monospace:** `JetBrains Mono` / system monospace for code and technical tags.

| Scale Token | Font Size | Line Height | Letter Spacing | Weight |
| :--- | :--- | :--- | :--- | :--- |
| `text-display-2xl` | 4.5rem (72px) | 1.05 | -0.035em | 800 (ExtraBold) |
| `text-display-xl` | 3.75rem (60px) | 1.08 | -0.03em | 800 (ExtraBold) |
| `text-display-lg` | 3.0rem (48px) | 1.10 | -0.025em | 700 (Bold) |
| `text-display-md` | 2.25rem (36px) | 1.16 | -0.025em | 700 (Bold) |
| `text-display-sm` | 1.875rem (30px)| 1.20 | -0.02em | 700 (Bold) |
| `text-heading-xl` | 1.5rem (24px) | 1.24 | -0.018em | 700 (Bold) |
| `text-heading-lg` | 1.25rem (20px) | 1.28 | -0.01em | 700 (Bold) |
| `text-heading-md` | 1.125rem (18px)| 1.32 | -0.008em | 600 (SemiBold) |
| `text-heading-sm` | 1.0rem (16px) | 1.36 | -0.005em | 600 (SemiBold) |
| `text-body-xl` | 1.125rem (18px)| 1.65 | Normal | 400 (Regular) |
| `text-body-lg` | 1.0rem (16px) | 1.60 | Normal | 400 (Regular) |
| `text-body-md` | 0.9375rem (15px)| 1.58 | Normal | 400 (Regular) |
| `text-body-sm` | 0.875rem (14px)| 1.52 | Normal | 400 (Regular) |
| `text-body-xs` | 0.8125rem (13px)| 1.50 | Normal | 400 (Regular) |
| `text-label-lg` | 0.875rem (14px)| 1.40 | 0.02em | 600 (SemiBold) |
| `text-label-md` | 0.8125rem (13px)| 1.40 | 0.02em | 500 (Medium) |
| `text-caption` | 0.75rem (12px) | 1.45 | 0.01em | 400 (Regular) |
| `text-kicker` | 0.75rem (12px) | 1.40 | 0.12em | 700 (Bold, Uppercase) |

---

## 4. Spacing, Radius & Layout Rhythm

### Border Radius Rules
- **Buttons & Controls:** Strictly **8–10px** (`rounded-btn` / `var(--radius-btn)`). Prevents pill-shaped or oversized bubbly buttons.
- **Cards & Dialogs:** Strictly **10–14px** (`rounded-card` / `var(--radius-card)`). Provides crisp geometric containment.
- **Badges & Avatars:** Fully rounded (`rounded-full`).

### Layout Container & Section Spacing
- **Responsive Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` (`<Container size="lg" />`).
- **Section Spacing Rhythm:**
  - `sm`: `py-16 md:py-20` (Internal subpages, compact bands)
  - `md`: `py-20 md:py-24` (Standard landing page sections)
  - `lg`: `py-24 md:py-28 lg:py-32` (Major feature reveals)
  - `xl`: `py-28 md:py-32 lg:py-36` (Hero & flagship conversion zones)

---

## 5. UI Primitives Inventory

All primitives reside in `src/components/` with strict TypeScript typing and full keyboard accessibility:

1. **`Button` & `IconButton`:** Primary, Secondary, Outline, Ghost, Link variants. Sizes: `sm`, `md`, `lg`. Loading, magnetic physics, and disabled states.
2. **`Input` & `Textarea`:** Theme-aware backgrounds, border states, start/end icon slots, accessible error validation.
3. **`Select`:** Native semantic dropdown with high-DPI Lucide `ChevronDown` replacing brittle background SVGs.
4. **`Checkbox` & `Radio`:** Accessible custom inputs with explicit labels, descriptions, and focus rings.
5. **`FormField`:** Accessible wrapper with `<label>`, required asterisk indicator, and ARIA `role="alert"` error feedback.
6. **`Card`:** Generic card with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`. Depth derived from surface contrast and 1px border.
7. **`Badge`:** Semantic categorical pills (`primary`, `secondary`, `success`, `warning`, `error`, `info`, `outline`) with optional pulsing dot indicators.
8. **`Alert`:** Contextual alert banner (`role="alert"`) with Lucide status icons and close button.
9. **`Modal`:** Portal dialog (`role="dialog"`, `aria-modal="true"`) with Escape key listener, focus trap, and background blur.
10. **`Tooltip`:** Hover and focus contextual helper with `role="tooltip"`.
11. **`Tabs`:** Accessible tablist (`role="tablist"`, `role="tab"`) with ArrowLeft/ArrowRight keyboard navigation.
12. **`Accordion`:** Collapsible panel (`role="region"`) with smooth animation and Enter/Space keyboard control.
13. **`Table`:** Semantic, responsive data table with `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`.
14. **`Pagination`:** Navigational pagination (`aria-label="Pagination Navigation"`) with `aria-current="page"`.
15. **`Breadcrumb`:** Structured breadcrumb navigation (`<nav aria-label="Breadcrumb">`).
16. **`Skeleton` & `Spinner`:** Loading states with `role="status"` and screen reader text.
17. **`EmptyState`:** Clean empty query or zero-data fallback state with action button.

---

## 6. Motion & Animation Principles

1. **Speed & Purpose:** Micro-interactions run between **150ms and 250ms**. Motion must feel responsive and snappy, never sluggish.
2. **Hydration Safety:** Framer Motion components initialize with deterministic initial values matching server SSR output.
3. **Accessibility (Reduced Motion):** All animated components integrate `useReducedMotion()`. When OS reduced-motion is enabled, scale and translation effects immediately fallback to subtle opacity transitions.

---

## 7. Accessibility Mandates (WCAG 2.2 AA)

- **Focus Ring:** 2px Electric Blue ring (`focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`).
- **Contrast Ratios:** Minimum 4.5:1 for body copy and 3.0:1 for large display headers and UI borders.
- **Keyboard Navigation:** Every interactive element is reachable and operable via keyboard (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Arrow` keys).
- **Landmarks:** Strictly semantic `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.

---

## 8. Do's and Don'ts

| Practice | Do | Don't |
| :--- | :--- | :--- |
| **Color Usage** | Use Deep Navy as foundation and Electric Blue for action elements. | Don't paint entire background sections bright neon blue or purple. |
| **Buttons** | Keep border radius to 8–10px (`rounded-btn`). | Don't use 9999px pill buttons or oversized bubbly controls. |
| **Cards** | Rely on surface contrast and 1px borders (`rounded-card`). | Don't make every card a floating glassmorphism panel. |
| **Icons** | Use consistent 2px stroke Lucide React icons. | Don't mix multiple icon libraries or use decorative clip art. |
| **State** | Leverage CSS variables and Tailwind classes. | Don't conditionally render differing HTML classes based on client `isDark` state. |
| **Animation** | Use subtle, fast transitions (150–250ms). | Don't add constant spinning icons, heavy parallax, or particle clouds. |
