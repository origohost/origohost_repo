# 07 — Navigation Architecture

> **Phase:** Phase 0 — Foundation, Strategy, Structure, Content, UX, SEO & Technical Blueprint  
> **Status:** DECIDED (Navigation Hierarchy & Layout)  
> **Classification Standard:** DECIDED | PROPOSED | TBD | OPTIONAL | DEPENDENCY  

---

## 1. Global Navigation Principles

To avoid cognitive overload and clutter, the OrigoHOST navigation is divided into clear functional zones:

```
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│  [LOGO] OrigoHOST    About   Community   Events   Programs   Resources   More ▾     [JOIN NOW] │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
                                                                             │
                                              ┌──────────────────────────────┴──────────┐
                                              │ Partners   Sponsors   Team   Blog   FAQ │
                                              └─────────────────────────────────────────┘
```

1. **Simplicity First:** Maximum 5–6 primary links in the desktop viewport.
2. **Prominent Primary Action:** Distinct high-contrast `Join OrigoHOST` CTA button.
3. **Structured Secondary Access:** Clustered "More" dropdown for institutional, company, and editorial links.
4. **Contextual Breadcrumbs:** Required on all subpages to provide clear orientation.

---

## 2. Desktop Navigation Structure (`DECIDED`)

### Primary Navigation (Header Left & Center)
- **Brand Lockup (`/`):** Official OrigoHOST SVG wordmark + symbol.
- **About (`/about`):** Mission, ecosystem entities, principles, governance.
- **Community (`/community`):** Chapters, developer network, participation tracks.
- **Events (`/events`):** Hackathons, webinars, workshops, meetups.
- **Programs (`/programs`):** Knowledge Sharing Series (KSS), AI cohorts.
- **Resources (`/resources`):** Documentation, starter kits, learning paths.

### Secondary Navigation / "More" Dropdown (`DECIDED`)
- **Partners (`/partners`):** Institutional & academic collaboration.
- **Sponsors (`/sponsors`):** Corporate sponsorship tiers & inquiries.
- **Team (`/team`):** Leadership, advisors, technical directors.
- **Blog (`/blog`):** Official news, technical recaps, insights.
- **Gallery (`/gallery`):** Event photo records, press photography.
- **FAQ (`/faq`):** Frequently asked questions.

### Primary Conversion CTA (Header Right) (`DECIDED`)
- **Button:** `Join OrigoHOST` (styled with electric blue accent, linking to `/join`).

---

## 3. Mobile Navigation Architecture (`DECIDED`)

### Behavior & Interaction
- Hamburger toggle button on viewports `< 1024px` (`lg` breakpoint).
- Slide-over drawer powered by Framer Motion.
- Full keyboard trap and `aria-expanded` state synchronization.
- Locks body scroll when active to prevent background scrolling.

### Mobile Drawer Sections
1. **Primary Links:** Large touch targets (min 44×44px) for Home, About, Community, Events, Programs, Resources.
2. **Ecosystem & Community Links:** Nested section for Partners, Sponsors, Team, Blog, Gallery, FAQ.
3. **Action Cluster:** Persistent full-width `Join OrigoHOST` CTA button at the bottom of the drawer.
4. **Social Icons Row:** Quick access to GitHub, Discord, LinkedIn, X, YouTube.

---

## 4. Footer Navigation Architecture (`DECIDED`)

The footer provides exhaustive, structured site navigation organized into 4 thematic columns:

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ [LOGO] OrigoHOST                                                                     │
│ Where Builders Become Innovators                                                     │
│                                                                                      │
│ 1. ABOUT & COMMUNITY    2. PARTICIPATE      3. COLLABORATE       4. LEGAL & UTILITY  │
│ ─────────────────────   ───────────────     ───────────────      ──────────────────  │
│ • About OrigoHOST       • Events            • Academic Partners  • Privacy Policy    │
│ • Community Network     • Programs          • Corporate Sponsors • Terms & Conditions│
│ • Team & Leadership     • Resources Library • Contact Office     • HTML Sitemap      │
│ • Press & Gallery       • Join Pathways     • FAQ Directory      • System Status     │
│                                                                                      │
│ © 2026 OrigoHOST. All rights reserved.                                               │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Breadcrumb Architecture (`DECIDED`)

- **Implementation:** Visible semantic `<nav aria-label="Breadcrumb">` on all non-home pages.
- **Microdata:** Emits JSON-LD `BreadcrumbList` schema for Google search engine breadcrumb trails.
- **Pathing Rules:**
  - `/events/[slug]` ➔ `Home / Events / [Event Title]`
  - `/programs/[slug]` ➔ `Home / Programs / [Program Name]`
  - `/blog/[slug]` ➔ `Home / Blog / [Article Title]`
  - `/sitemap` ➔ `Home / Sitemap`
