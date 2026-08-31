# OrigoHOST — Folder Structure Reference

> Stack: **Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + PWA**
> All `.js`/`.jsx` references below are replaced by `.ts`/`.tsx`.

---

## Root Layout

```
origohost/
│
├── public/               # Static assets served at root
├── src/                  # All application source code
├── tests/                # Test suites
├── docs/                 # Project documentation
├── scripts/              # Build and automation scripts
│
├── .env.example          # Environment variable template
├── .env.local            # Local secrets — NEVER commit (in .gitignore)
├── .gitignore
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS + brand token configuration
├── tsconfig.json         # TypeScript strict configuration
├── package.json
├── README.md
└── LICENSE
```

---

## public/

Static assets. Everything here is served as-is at the root URL.

```
public/
├── favicon/              # Favicon variants (ICO, PNG 16/32/192/512, SVG, Apple Touch)
├── fonts/                # Self-hosted font files (WOFF2) — if not using next/font
├── icons/                # SVG icon files not bundled in JS
├── documents/            # Downloadable PDFs, decks, reports
├── manifest.json         # PWA Web App Manifest
├── sw.js                 # Service Worker (generated or custom)
├── robots.txt            # Search engine directives
└── images/
    ├── brand/            # Logos, wordmarks, symbol marks (PNG, SVG, WebP)
    ├── team/             # Team member profile photos (WebP preferred)
    ├── events/           # Event cover images and photos (WebP)
    ├── programs/         # Program cover images (WebP)
    ├── community/        # Community photos and illustrations (WebP)
    ├── partners/         # Partner logos (SVG or PNG transparent)
    ├── sponsors/         # Sponsor logos (SVG or PNG transparent)
    ├── gallery/          # Event and community gallery media (WebP)
    └── blog/             # Blog and article featured images (WebP)
```

**Rules:**
- All images must be optimized (WebP preferred, fallback PNG/JPG).
- Images used in `<Image />` from `next/image` must be in `/public/images/` or from an approved remote domain configured in `next.config.ts`.
- Brand assets may only be placed in `public/images/brand/`.
- PWA icons must be in `public/favicon/` at 192×192 and 512×512 minimum.

---

## src/app/ (Next.js App Router)

All pages, layouts, API routes and metadata are defined here.

```
src/app/
├── layout.tsx                    # Root layout — HTML shell, font loading, providers, metadata
├── page.tsx                      # Home page — /
├── not-found.tsx                 # 404 page — /[anything-invalid]
├── error.tsx                     # 500 / error boundary
├── loading.tsx                   # Global loading UI
├── manifest.ts                   # Dynamic PWA manifest (or use public/manifest.json)
│
├── about/
│   └── page.tsx                  # /about
├── community/
│   └── page.tsx                  # /community
├── events/
│   ├── page.tsx                  # /events
│   └── [slug]/
│       └── page.tsx              # /events/:slug
├── programs/
│   ├── page.tsx                  # /programs
│   └── [slug]/
│       └── page.tsx              # /programs/:slug
├── resources/
│   └── page.tsx                  # /resources
├── partners/
│   └── page.tsx                  # /partners
├── sponsors/
│   └── page.tsx                  # /sponsors
├── team/
│   └── page.tsx                  # /team
├── contact/
│   └── page.tsx                  # /contact
├── join/
│   └── page.tsx                  # /join
├── blog/
│   ├── page.tsx                  # /blog
│   └── [slug]/
│       └── page.tsx              # /blog/:slug
├── gallery/
│   └── page.tsx                  # /gallery
├── faq/
│   └── page.tsx                  # /faq
├── privacy-policy/
│   └── page.tsx                  # /privacy-policy
├── terms/
│   └── page.tsx                  # /terms
├── search/
│   └── page.tsx                  # /search
├── sitemap/
│   └── page.tsx                  # /sitemap (human-readable)
├── sitemap.ts                    # /sitemap.xml (Next.js sitemap API)
├── robots.ts                     # /robots.txt (Next.js robots API)
│
└── api/
    ├── contact/
    │   └── route.ts              # POST /api/contact
    └── join/
        └── route.ts              # POST /api/join
```

---

## src/pages/ (Legacy — Not Used)

> The `src/pages/` directory created in the folder scaffold is retained for page-level
> component composition files (sections composition layer), NOT as Next.js Pages Router files.
> The Next.js App Router lives entirely in `src/app/`.

The `src/pages/{page}/` directories hold:
- Page-specific section components in `sections/`
- Page-level composition logic that is imported by `src/app/{page}/page.tsx`

---

## src/components/

Reusable, page-agnostic UI components. All files are `.tsx` with typed props.

```
src/components/
├── common/               # Badge, Tag, Divider, EmptyState, AlertBanner, Pagination, SearchInput
├── navigation/           # Header, NavBar, MobileMenu, Breadcrumb
├── footer/               # Footer, FooterNav, FooterSocial
├── buttons/              # Button, IconButton, LinkButton (with Framer Motion hover)
├── cards/                # EventCard, ProgramCard, ArticleCard, ResourceCard, TeamCard,
│                         #   PartnerCard, SponsorCard, GalleryCard
├── forms/                # FormField, Input, Textarea, Select, Checkbox, RadioGroup,
│                         #   ContactForm, JoinForm
├── modals/               # Modal, Drawer
├── loaders/              # Spinner, Skeleton, ProgressBar
├── typography/           # Heading, Body, Kicker, Caption, Label
└── media/                # Image (wraps next/image), VideoEmbed, Avatar, MediaGallery, LogoMark
```

**Rules:**
- All components: typed props interface, no `any`, no data fetching inside component
- Use `cn()` from `src/lib/utils.ts` for class composition
- Framer Motion used for hover/interaction states — never raw CSS transitions for animated elements
- All interactive elements have unique `id` attributes

---

## src/sections/

Globally reusable page sections (used across 2+ pages). All `.tsx`.

```
src/sections/
├── Hero/                 # Full-width hero variants (with Framer Motion entrance)
├── CTA/                  # Call-to-action banner (with motion entrance)
├── Statistics/           # Impact statistics grid (with count-up animation)
├── Testimonials/         # Testimonials carousel (Framer Motion)
├── Newsletter/           # Stay informed section
└── Featured/             # Featured events / programs / articles strip
```

---

## src/data/

Static or semi-static typed data files in `.ts` format.

```
src/data/
├── site/                 # site.config.ts — navigation, footer, social links, meta defaults
├── events/               # events.data.ts — typed Event[] array
├── programs/             # programs.data.ts — typed Program[] array
├── team/                 # team.data.ts — typed TeamMember[] array
├── partners/             # partners.data.ts — typed Partner[] array
├── sponsors/             # sponsors.data.ts — typed Sponsor[] array
├── resources/            # resources.data.ts — typed Resource[] array
├── blog/                 # blog.data.ts — typed Article[] metadata array
├── gallery/              # gallery.data.ts — typed GalleryItem[] array
└── faq/                  # faq.data.ts — typed FAQItem[] array
```

---

## src/content/

Long-form markdown / MDX content files.

```
src/content/
├── pages/                # About, Community prose (MDX)
├── blog/                 # Blog article body content (MDX)
├── events/               # Event description long-form content (MDX)
├── programs/             # Program description long-form content (MDX)
└── legal/                # Privacy Policy, Terms & Conditions (MDX)
```

---

## src/types/

All TypeScript type definitions.

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
└── index.ts              # Re-exports all types
```

---

## src/lib/

Third-party library initializations.

```
src/lib/
├── firebase.ts           # Firebase app init (if Firebase chosen)
├── supabase.ts           # Supabase client init (if Supabase chosen)
├── motion.ts             # Shared Framer Motion variants and constants
└── utils.ts              # cn() utility (clsx + tailwind-merge)
```

---

## src/styles/

```
src/styles/
├── globals/
│   └── globals.css       # Tailwind directives, base layer overrides
├── tokens/               # Token reference docs (actual tokens live in tailwind.config.ts)
├── components/           # @layer components overrides if needed
└── pages/                # Page-specific global style overrides
```

---

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| App Router pages | lowercase file | `page.tsx`, `layout.tsx` |
| Page section components | PascalCase + Section suffix | `HeroSection.tsx` |
| Reusable components | PascalCase | `EventCard.tsx` |
| Hooks | camelCase + use prefix | `useEventFilter.ts` |
| API routes | lowercase + route.ts | `contact/route.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Constants | SCREAMING_SNAKE_CASE file | `ROUTES.ts` |
| Data files | camelCase + .data | `events.data.ts` |
| Type files | camelCase + .types | `event.types.ts` |
| Config files | camelCase + .config | `tailwind.config.ts` |
| Routes | kebab-case | `/privacy-policy` |
| Image files | kebab-case | `ritik-kumar.webp` |
