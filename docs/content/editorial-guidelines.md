# OrigoHOST — Editorial Guidelines

Standards for writing, formatting and quality-assuring all content on the OrigoHOST website.

---

## 1. Voice Reminders

- Write like a builder, not a marketer.
- Prefer short sentences (max 25 words) in body copy.
- Prefer active voice over passive voice.
- One idea per paragraph.
- One primary CTA per section.

---

## 2. Spelling and Naming Standards

| Item | Correct Form | Incorrect Forms |
|------|-------------|----------------|
| Brand name | OrigoHOST | Origohost, ORIGOHOST, Origo Host, origohost |
| Abbreviation | OH | oh, O.H. |
| Tagline | Where Builders Become Innovators | Where builders become innovators (capitalize all main words in logo context) |
| Ecosystem entities | Origo Cloud, Origo Academy, Origo Community, Origo Events, Origo AI, Origo Dev | OrigoCloud, Origo-Cloud, ORIGO CLOUD |
| Programs | Knowledge Sharing Series (KSS2026) | knowledge sharing series, KSS 2026 |
| Country | India | INDIA, india |
| Technology terms | DevOps, AI, ML, IoT, UI/UX | Devops, A.I., M.L., IOT |

---

## 3. Capitalization Rules

| Context | Rule |
|---------|------|
| Page headings (H1) | Title Case |
| Section headings (H2, H3) | Title Case |
| Body headings (H4+) | Sentence case |
| Navigation labels | Title Case |
| Button labels | Title Case |
| Form labels | Sentence case |
| Meta titles | Title Case — OrigoHOST |
| Body copy | Sentence case |
| Tagline in body copy | Where Builders Become Innovators (capitalize) |

---

## 4. Punctuation Rules

- Use the Oxford comma: "workshops, hackathons, and meetups."
- Use em dashes (—) for parenthetical breaks, not double hyphens (--).
- Use en dashes (–) for ranges: "June 10–12, 2026."
- Do not use exclamation marks in formal headings.
- Use curly/smart quotes, not straight quotes where possible.
- Avoid ellipsis (...) in headings.

---

## 5. Number and Date Formatting

| Item | Format | Example |
|------|--------|---------|
| Dates | DD Month YYYY | 28 August 2026 |
| Date ranges (same month) | DD–DD Month YYYY | 10–12 June 2026 |
| Date ranges (different months) | DD Month – DD Month YYYY | 30 July – 2 August 2026 |
| Times | 12-hour with AM/PM | 10:00 AM – 1:00 PM IST |
| Numbers under 10 | Spell out | "three workshops" not "3 workshops" |
| Numbers 10 and above | Numerals | "12 events" |
| Large numbers | Use K/L notation with metric definition | "90,000+" not "90K+" unless metric is defined |

---

## 6. Link Guidelines

- Link text must be descriptive: "Register for CyberForge 2026" not "click here."
- External links must open in a new tab with `rel="noopener noreferrer"`.
- Broken links are a content error — check all links during QA.
- Internal links must use relative paths to avoid environment-specific breakage.

---

## 7. Image Guidelines

- Every image must have a meaningful `alt` attribute.
  - Not: `alt="image"` or `alt=""` for content images.
  - Yes: `alt="Participants collaborating at CyberForge 2026 hackathon, GL Bajaj."`
- Decorative images may use `alt=""`.
- Team photos: `alt="{Full Name}, {Role}, OrigoHOST."`
- Event covers: `alt="{Event Title} — {Format} by OrigoHOST."`
- Logo: `alt="OrigoHOST — Where Builders Become Innovators."`

---

## 8. Heading Hierarchy

Each page must have exactly one `<h1>` tag.
Heading levels must not be skipped (H1 → H2 → H3, not H1 → H3).

```
<h1>  — Page title (one per page)
<h2>  — Major section headings
<h3>  — Sub-section headings
<h4>  — Sub-sub-section or card headings
<h5>  — Minor labels within sections
<h6>  — Use sparingly
```

---

## 9. Metadata Requirements

Every published page must have:

| Field | Requirement |
|-------|------------|
| `<title>` | Unique; "{Page Name} — OrigoHOST"; 50–60 chars |
| `meta description` | Unique; 140–160 chars; includes primary keyword |
| `og:title` | Match or close variant of `<title>` |
| `og:description` | Match or variant of meta description |
| `og:image` | 1200×630px minimum; branded |
| `canonical` | Absolute canonical URL |

---

## 10. Content QA Checklist

Before any content goes live, the content editor must confirm:

### Accuracy
- [ ] All facts verified against approved source
- [ ] All dates are correct and current
- [ ] Statistics have defined metric, period, source and methodology
- [ ] No proposed frameworks presented as adopted facts
- [ ] Partner/sponsor records have confirmed relationships
- [ ] Team records match approved public information

### Writing Quality
- [ ] No spelling errors
- [ ] No broken sentences or grammar issues
- [ ] OrigoHOST name spelled correctly throughout
- [ ] No unauthorized brand alternatives (see naming standards table)
- [ ] No unsupported superlatives ("world-class", "best", "leading")
- [ ] CTAs are specific and actionable

### Technical
- [ ] All internal links resolve correctly
- [ ] All external links are reachable and open in new tab
- [ ] All images load correctly with meaningful alt text
- [ ] Page title and meta description are unique and within character limits
- [ ] Page heading hierarchy is correct (single H1, no skipped levels)

### Legal
- [ ] No content claiming relationships without confirmation
- [ ] No content that could constitute misleading advertising
- [ ] Privacy Policy and Terms present on site
- [ ] Cookie/consent handling in place

---

## 11. Event and Program Labelling Standards

Always use the specific, correct taxonomy. Never guess or use a generic label.

| Correct | Incorrect |
|---------|-----------|
| Workshop | "Course", "Class", "Session" (unless that is what it is) |
| Webinar | "Online event", "Virtual workshop" (unless it's a workshop) |
| Hackathon | "Competition" (unless specifically positioned that way) |
| Ideathon | "Hackathon" (different format) |
| Meetup | "Conference" (different format) |
| Training Program | "Seminar" (different format) |
| Knowledge Sharing Session | "Webinar" (unless delivered as a webinar) |

---

## 12. Empty States

When content is not yet available, use a meaningful empty state — never leave a section blank or broken.

**Example empty state messages:**
- Events: "No upcoming events right now. Check back soon or join the community to get notified."
- Blog: "No articles published yet. We are just getting started."
- Gallery: "Gallery coming soon. Follow our community channels for event photos."
- Partners: "Partnership information coming soon."
