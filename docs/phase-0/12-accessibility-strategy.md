# 12 — Accessibility Foundation (WCAG 2.2 AA)

> **Phase:** Phase 0 — Foundation, Strategy, Structure, Content, UX, SEO & Technical Blueprint  
> **Status:** DECIDED (Compliance & Inclusion Standard)  
> **Classification Standard:** DECIDED | PROPOSED | TBD | OPTIONAL | DEPENDENCY  

---

## 1. Compliance Mandate

The OrigoHOST web application is built strictly to **WCAG 2.2 Level AA** compliance. Accessibility is an architectural requirement built into components from the ground up, not a post-launch remediation checklist.

---

## 2. Accessibility Engineering Directives

### 1. Semantic HTML & Document Landmarks
- Every page contains standard landmarks: `<header>`, `<nav>`, `<main id="main-content">`, `<section>`, `<article>`, and `<footer>`.
- A skip-to-content link (`<a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to content</a>`) must be the very first focusable element in the DOM.

### 2. Focus Visibility & Keyboard Navigation
- All interactive elements (buttons, inputs, links, tabs) must feature a distinct, high-contrast focus ring:
  ```css
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-2 focus-visible:ring-offset-surface
  ```
- No component may trap keyboard focus unless it is an explicitly opened modal dialog.

### 3. Color Contrast Ratios
- **Body Text & Headings:** Minimum **4.5:1** contrast ratio against backgrounds.
- **Large Text (18pt+ or 14pt+ bold):** Minimum **3.0:1** contrast ratio.
- **UI Components & Borders:** Minimum **3.0:1** contrast against adjacent backgrounds.
- Electric Blue accents (`#0056FF`) on dark backgrounds must be calibrated with sufficient luminosity (or white text on blue buttons).

### 4. Forms & Interactive Validation
- Every input and select element must possess an explicit `<label htmlFor="...">` tag.
- Error messages must be programmatically linked to inputs using `aria-describedby="[field]-error"`.
- Erroneous fields must set `aria-invalid="true"`.
- Form submission states (loading, disabled) must announce changes to assistive devices via `aria-live="polite"`.

### 5. Touch Target Sizes
- All interactive touch targets on mobile viewports must meet the minimum size requirement of **44 × 44 CSS pixels**.

### 6. Reduced Motion Standards
- All Framer Motion animations must listen to the OS accessibility preference:
  ```tsx
  import { useReducedMotion } from 'framer-motion';
  const shouldReduceMotion = useReducedMotion();
  ```
- When `shouldReduceMotion === true`, all spatial translations and scale transforms must immediately fallback to simple opacity fades (`duration: 0.1s`).
