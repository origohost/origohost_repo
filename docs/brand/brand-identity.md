# OrigoHOST — Brand Identity Reference

> This document records what is **visually established** from the official logo assets
> and what remains **unverified** pending formal brand guidelines.
> Do not treat approximations as official specifications.

---

## 1. Official Name & Tagline

| Element | Value | Status |
|---------|-------|--------|
| Official Name | **OrigoHOST** | Established |
| Abbreviation | **OH** | Established |
| Tagline | **Where Builders Become Innovators** | Established |
| Wordmark split | **Origo** (lighter) + **HOST** (electric blue, stronger) | Logo-established |

The tagline must appear in UPPERCASE with wide letter-spacing in all brand lockup applications.

---

## 2. Logo System

### Primary Logo (Full Lockup)
Contains: **Symbol + OrigoHOST wordmark + tagline**

Used: Official website header, official communications, presentations, documents.

### Symbol Mark (Standalone)
The emblem combines:
- A strong H-like structural form
- Circular/arc geometry
- A rocket emerging upward from the central structure

Visual metaphor: **launch → progress → building → innovation → upward movement**

> This is a visual interpretation. The official symbolic rationale should be sourced
> from the formal logo rationale document when available.

### Wordmark Only
Contains: **OrigoHOST** logotype without the symbol.

### Usage Guidelines (Pending Formal Brand Manual)
The following rules must be defined in the formal brand manual before launch:

- [ ] Minimum size (px / mm)
- [ ] Clear space rules
- [ ] Approved background colors
- [ ] Monochrome version
- [ ] Reversed / white version
- [ ] Symbol-only approved use cases
- [ ] Incorrect alterations list
- [ ] Digital and favicon usage
- [ ] Print specifications

---

## 3. Color System

### Primary Colors

| Name | Approximate HEX | Role | Status |
|------|----------------|------|--------|
| Deep Blue | `#001858` | Primary brand, backgrounds, trust | Visually observed — **unverified** |
| Electric Blue | `#0056FF` | Accent, innovation, energy, CTAs | Visually observed — **unverified** |

> **IMPORTANT:** These HEX values are observed approximations from the supplied logo artwork.
> They must be replaced with formally verified brand color codes before production use.
> RGB, HSL and Pantone equivalents are not yet confirmed.

### Semantic Color Roles (Design System)

These roles must be mapped to the verified brand tokens once confirmed:

| Token | Role | Applied To |
|-------|------|-----------|
| `--color-primary` | Main brand color | Buttons, links, highlights |
| `--color-primary-dark` | Darker primary shade | Hover states, headings |
| `--color-accent` | Electric blue accent | CTAs, badges, icons |
| `--color-background` | Page background | Body, sections |
| `--color-surface` | Card/panel background | Cards, modals, inputs |
| `--color-text-primary` | Main body text | Paragraphs, headings |
| `--color-text-secondary` | Secondary/muted text | Captions, metadata |
| `--color-border` | UI borders | Input fields, dividers |
| `--color-error` | Error state | Form validation errors |
| `--color-success` | Success state | Form submission success |

### Color Character

**Deep Blue** = Technological credibility · Trust · Stability · Infrastructure · Professionalism

**Electric Blue** = Innovation · Energy · Digital technology · Momentum · Future orientation

---

## 4. Typography

### Typography Status

| Element | Status |
|---------|--------|
| Logo wordmark | Established artwork |
| Tagline artwork | Established |
| Exact production font family | **Not yet verified** |
| Official primary font | **Not yet verified** |
| Secondary / display font | **Not yet verified** |
| UI / body font | **Not yet verified** |
| Official weights | **Not yet verified** |
| Official tracking values | **Not yet verified** |

> No specific font family should be declared official without the brand guidelines
> or source design file. A modern sans-serif consistent with the wordmark character
> is the working design direction.

### Typography Scale (Design System Tokens — Pending Verification)

All typography tokens are defined in `tailwind.config.ts` under `theme.extend.fontSize` and loaded
via `next/font` for performance. The following token structure must be populated once the font
family is confirmed from the brand specification:

```ts
// tailwind.config.ts — typography extension (values to be confirmed)
theme: {
  extend: {
    fontFamily: {
      sans: ['...', 'sans-serif'],      // Primary / body font — PENDING CONFIRMATION
      display: ['...', 'sans-serif'],   // Display / heading font — PENDING CONFIRMATION
      mono: ['...', 'monospace'],       // Code / monospace — PENDING CONFIRMATION
    },
    fontSize: {
      'display':  ['', { lineHeight: '' }],   // Hero display text
      'h1':       ['', { lineHeight: '' }],
      'h2':       ['', { lineHeight: '' }],
      'h3':       ['', { lineHeight: '' }],
      'h4':       ['', { lineHeight: '' }],
      'h5':       ['', { lineHeight: '' }],
      'h6':       ['', { lineHeight: '' }],
      'body-lg':  ['', { lineHeight: '' }],
      'body-md':  ['', { lineHeight: '' }],
      'body-sm':  ['', { lineHeight: '' }],
      'label':    ['', { lineHeight: '' }],
      'caption':  ['', { lineHeight: '' }],
      'kicker':   ['', { lineHeight: '', letterSpacing: '0.1em' }],
    },
  }
}
```

### Tagline Typography Characteristics (from logo artwork)
- UPPERCASE
- Small size relative to wordmark
- Wide letter-spacing / tracking
- Institutional presentation weight

---

## 5. Iconography

- Use a consistent icon library throughout the site.
- Icons should feel modern, clean and technical — consistent with brand personality.
- Avoid decorative icons that add visual noise without semantic purpose.
- Icon library selection is an implementation decision pending approval.
- Custom icons should be stored in `public/icons/`.

---

## 6. Imagery Guidelines

- Prefer **authentic OrigoHOST event and community photography** wherever available.
- Where stock or generated imagery is used: choose images that reflect the actual community
  (diverse, India-based, technical environments, real people working and collaborating).
- Avoid generic "technology" stock imagery (floating holograms, abstract circuits, etc.).
- Event photos belong in `public/images/events/`.
- Community photos belong in `public/images/community/`.
- Team photos belong in `public/images/team/`.

---

## 7. Spacing System

Tailwind CSS default spacing scale is used (4px base unit).
Custom spacing extensions are added in `tailwind.config.ts` for brand-specific values.
Use Tailwind spacing utilities (`p-4`, `mt-8`, `gap-6`, etc.) — never inline `style` for spacing.

```ts
// tailwind.config.ts — custom spacing additions
theme: {
  extend: {
    spacing: {
      '18': '4.5rem',   // 72px
      '22': '5.5rem',   // 88px
      '26': '6.5rem',   // 104px
      '30': '7.5rem',   // 120px
    }
  }
}
```

---

## 8. Border Radius

Defined in `tailwind.config.ts`. Use Tailwind radius utilities (`rounded-sm`, `rounded-xl`, etc.).

```ts
// tailwind.config.ts — custom radius
theme: {
  extend: {
    borderRadius: {
      'sm':   '4px',
      'md':   '8px',
      'lg':   '12px',
      'xl':   '16px',
      '2xl':  '24px',
      'full': '9999px',
    }
  }
}
```

---

## 9. Shadow System

Defined in `tailwind.config.ts`. Use Tailwind shadow utilities (`shadow-sm`, `shadow-xl`, etc.).

```ts
// tailwind.config.ts — custom shadows
theme: {
  extend: {
    boxShadow: {
      'sm':  '0 1px 3px rgba(0, 0, 0, 0.08)',
      'md':  '0 4px 12px rgba(0, 0, 0, 0.10)',
      'lg':  '0 8px 24px rgba(0, 0, 0, 0.12)',
      'xl':  '0 16px 48px rgba(0, 0, 0, 0.14)',
    }
  }
}
```

---

## 10. Motion & Animation

- **All animations use Framer Motion** — no raw CSS `@keyframes` for interactive elements.
- Use subtle micro-animations to enhance experience, not decorate.
- All animations must respect `prefers-reduced-motion` via `useReducedMotion()` hook.
- Page transitions use Framer Motion `AnimatePresence`.
- Shared motion variants live in `src/lib/motion.ts`.

```ts
// src/lib/motion.ts — shared timing constants
export const DURATION = {
  fast:   0.15,
  base:   0.2,
  slow:   0.3,
  page:   0.4,
};

export const EASE = {
  out:    'easeOut',
  inOut:  'easeInOut',
  spring: { type: 'spring', stiffness: 300, damping: 30 },
};
```
