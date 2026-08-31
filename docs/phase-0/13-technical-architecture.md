# 13 — Technical Architecture & System Design

> **Phase:** Phase 0 — Foundation, Strategy, Structure, Content, UX, SEO & Technical Blueprint  
> **Status:** DECIDED (Next.js App Router Architecture)  
> **Classification Standard:** DECIDED | PROPOSED | TBD | OPTIONAL | DEPENDENCY  

---

## 1. System Overview & Technology Stack

The OrigoHOST system is architected as a **Server-First Next.js App Router** application built on TypeScript, Tailwind CSS, and Framer Motion:

```
                            APPLICATION ARCHITECTURE
┌─────────────────────────────────────────────────────────────────────────────┐
│                          EDGE / CDN ROUTING LAYER                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                   NEXT.JS APP ROUTER (Server Components)                    │
│  • Root Layout (Shell, Theme, Fonts)                                        │
│  • Static Pages (SSG) & Incremental Revalidated Pages (ISR)                 │
│  • Metadata API (SEO, OpenGraph, JSON-LD)                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                 ISOLATED CLIENT COMPONENTS ("use client")                   │
│  • Header Mobile Menu Toggle        • Join & Contact Form Validation        │
│  • Magnetic CTA Button Interactions • FAQ Accordions & Search Filtering     │
├─────────────────────────────────────────────────────────────────────────────┤
│                       DATA & TYPE DEFINITIONS LAYER                         │
│  • src/types/ (Strict Interfaces)   • src/data/ (Static Content Modules)    │
│  • src/constants/routes.ts          • Zod Form Schemas                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Organization & Folder Hierarchy

```
src/
├── app/                      # App Router routes, layouts, error boundaries
│   ├── layout.tsx            # Global layout shell
│   ├── page.tsx              # Root homepage
│   ├── sitemap.xml/route.ts  # XML sitemap generator
│   ├── robots.ts             # Robots.txt generator
│   └── [route]/page.tsx      # Canonical route endpoints
│
├── components/               # Atomic & reusable design system components
│   ├── buttons/              # Button, IconButton, LinkButton
│   ├── forms/                # Input, Select, Textarea, Checkbox, FormField
│   ├── feedback/             # Alert, Toast, LoadingSpinner, EmptyState
│   ├── navigation/           # Header, NavBar, MobileMenu, Breadcrumb
│   ├── typography/           # Heading, Body, CodeBlock, Caption
│   └── cards/                # EventCard, ProgramCard, ResourceCard, TeamCard
│
├── sections/                 # Shared multi-component page sections
│   ├── Hero/                 # Standardized hero layouts
│   ├── CTA/                  # Call-to-action blocks
│   └── Stats/                # Impact metrics grid
│
├── types/                    # Core TypeScript models (event, program, etc.)
├── data/                     # Typed data modules (events.data, etc.)
└── constants/                # Immutable route mappings & site constants
```

---

## 3. Form Handling & Validation Strategy

1. **Client-Side Validation:** Powered by `react-hook-form` + `@hookform/resolvers` + `zod`.
2. **Schema-Driven Rules:** Schemas defined in `src/lib/validation/` ensure synchronized validation on both client and API handlers.
3. **API Handlers:** `/api/contact` and `/api/join` parse payloads via Zod, validate honeypots, rate-limit, and return standardized JSON responses.
4. **Resilience:** Graceful toast alerts provide immediate user feedback with actionable resolution paths if network drops occur.

---

## 4. Error & Loading Architecture

- **Global Error (`src/app/error.tsx`):** Catches uncaught runtime exceptions, logs error details, and renders a branded recovery UI without crashing the entire browser window.
- **Not Found (`src/app/not-found.tsx`):** Renders the custom 404 page for unmatched routes.
- **Loading Boundaries (`src/app/loading.tsx`):** Lightweight skeletal fallbacks preserve layout structure during ISR route transitions.

---

## 5. Environment Configuration

All environment configurations are documented in `.env.example` with strict typing:

```env
NEXT_PUBLIC_SITE_URL=https://origohost.com
NEXT_PUBLIC_APP_ENV=production
# Rate limiting & notification webhooks (Phase 1 Dependencies)
CONTACT_NOTIFICATION_WEBHOOK_URL=
JOIN_NOTIFICATION_WEBHOOK_URL=
```
