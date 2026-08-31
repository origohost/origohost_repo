# 10 — SEO Foundation & Schema Architecture

> **Phase:** Phase 0 — Foundation, Strategy, Structure, Content, UX, SEO & Technical Blueprint  
> **Status:** DECIDED (Search Engine Optimization Standard)  
> **Classification Standard:** DECIDED | PROPOSED | TBD | OPTIONAL | DEPENDENCY  

---

## 1. Global Metadata Architecture

OrigoHOST leverages the Next.js App Router Metadata API with a unified root layout configuration:

```ts
// src/app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://origohost.com'),
  title: {
    default: 'OrigoHOST — Where Builders Become Innovators',
    template: '%s — OrigoHOST',
  },
  description:
    'OrigoHOST is a technology and community ecosystem bridging the gap between learning technology and building with it. Hackathons, webinars, training programs, and builder networks across India.',
  keywords: [
    'OrigoHOST',
    'developer community',
    'hackathons India',
    'technology ecosystem',
    'CyberForge',
    'Knowledge Sharing Series',
    'campus chapters',
    'builder community',
  ],
  authors: [{ name: 'OrigoHOST Core Team', url: 'https://origohost.com/team' }],
  creator: 'OrigoHOST',
  publisher: 'OrigoHOST',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://origohost.com',
    siteName: 'OrigoHOST',
    title: 'OrigoHOST — Where Builders Become Innovators',
    description: 'Technology ecosystem for developers, students, and institutions across India.',
    images: [
      {
        url: '/images/brand/og-default.png',
        width: 1200,
        height: 630,
        alt: 'OrigoHOST — Where Builders Become Innovators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OrigoHOST — Where Builders Become Innovators',
    description: 'Technology ecosystem for developers, students, and institutions across India.',
    images: ['/images/brand/og-default.png'],
  },
};
```

---

## 2. Heading Hierarchy Standards

- **Strict Single H1:** Exactly one `<h1>` per page, placed inside the hero section.
- **Section Headings:** Major page segments must use `<h2>`.
- **Sub-features & Cards:** Card titles and nested items must use `<h3>`.
- **No Skipping Levels:** Never jump from `<h1>` to `<h3>` or `<h4>` without intermediate headings.

---

## 3. Robots.txt Directives (`DECIDED`)

Generated dynamically via `src/app/robots.ts`:

```txt
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /search
Disallow: /maintenance
Disallow: /403
Disallow: /500

Sitemap: https://origohost.com/sitemap.xml
```

---

## 4. Structured Data (JSON-LD) Matrix

All structured data is generated with zero runtime client JS using script tags in Server Components:

| Schema Type | Applied Pages | Required Properties |
| :--- | :--- | :--- |
| **`Organization`** | `/` (Home), `/about` | `@type: "Organization"`, `name: "OrigoHOST"`, `url: "https://origohost.com"`, `logo`, `sameAs: [social URLs]` |
| **`WebSite`** | `/` (Home) | `@type: "WebSite"`, `name: "OrigoHOST"`, `url`, `potentialAction: SearchAction` |
| **`BreadcrumbList`** | All subpages | Array of `{ @type: "ListItem", position, name, item }` |
| **`Event`** | `/events/[slug]` | `name`, `startDate`, `endDate`, `eventAttendanceMode`, `eventStatus`, `location`, `organizer`, `description` |
| **`Article`** | `/blog/[slug]` | `headline`, `image`, `datePublished`, `dateModified`, `author`, `publisher` |
| **`FAQPage`** | `/faq` | `mainEntity: [ { @type: "Question", name, acceptedAnswer: { text } } ]` |

---

## 5. Internal Linking Architecture

1. **Breadcrumbs:** Contextual climb links on all pages.
2. **Contextual Cross-links:**
   - Event cards link to parent program (`/events/[slug]` ➔ `/programs/[slug]`).
   - Program detail lists all related event episodes.
   - Blog recaps link directly to the respective event registration or gallery album.
   - Resource starter kits link to community chapter guidelines.
