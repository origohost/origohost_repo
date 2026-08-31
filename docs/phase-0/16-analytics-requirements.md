# 16 — Analytics, Instrumentation & Measurement

> **Phase:** Phase 0 — Foundation, Strategy, Structure, Content, UX, SEO & Technical Blueprint  
> **Status:** PROPOSED (Telemetry & Event Schema Specification)  
> **Classification Standard:** DECIDED | PROPOSED | TBD | OPTIONAL | DEPENDENCY  

---

## 1. Analytics & Privacy Mandate

In accordance with strict privacy compliance and performance standards:
- **No Third-Party Tracking in Phase 0:** No Google Analytics, Meta Pixels, or heavy trackers are loaded at this stage. (`DECIDED`)
- **Privacy-First Telemetry:** Event schemas are defined here for future lightweight, cookieless analytics integration (e.g. Plausible, PostHog, or self-hosted Umami). (`PROPOSED`)

---

## 2. Key Conversion Events Matrix

| Event Name | Trigger Location | Parameters | Purpose |
| :--- | :--- | :--- | :--- |
| `join_application_submitted` | `/join` | `pathway`, `experience_level`, `timestamp` | Measure primary builder acquisition |
| `event_registration_clicked` | `/events/[slug]` | `event_slug`, `delivery_mode`, `is_external` | Track event attendee demand |
| `partnership_inquiry_submitted`| `/contact` | `category: 'institutional'`, `institution_type` | Measure institutional outreach |
| `sponsorship_inquiry_submitted`| `/contact` | `category: 'sponsorship'`, `tier_interest` | Measure corporate interest |
| `contact_form_submitted` | `/contact` | `category`, `has_attachment` | General communication intake |
| `resource_downloaded` | `/resources` | `resource_slug`, `category`, `file_format` | Evaluate curriculum usefulness |
| `article_read_completed` | `/blog/[slug]` | `article_slug`, `reading_time_seconds` | Measure technical content engagement |
| `site_search_executed` | `/search` | `query_string`, `result_count` | Identify unserved user content gaps |
| `chapter_charter_downloaded` | `/community` | `asset_name: 'chapter-guide.pdf'` | Track campus chapter intent |

---

## 3. Implementation Requirements (Phase 1/2 Dependency)

When analytics is formally enabled:
1. Script must be loaded asynchronously via `next/script` with `strategy="afterInteractive"`.
2. Must respect Do Not Track (DNT) and Global Privacy Control (GPC) headers.
3. Must never log Personally Identifiable Information (PII) such as full names, email addresses, or phone numbers.
