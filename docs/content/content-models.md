# OrigoHOST — Content Models

Content type definitions used across `src/data/`, `src/content/` and any future CMS.
Each model defines: required fields, optional fields, validation rules and display rules.

---

## 1. Event Content Model

### Required Fields
| Field | Type | Rule |
|-------|------|------|
| `title` | string | Must be unique; 5–100 chars |
| `slug` | string | kebab-case; URL-safe; unique |
| `type` | enum | Must be one of: Institutional / Open Community / Collaborative |
| `format` | enum | Must be one of: Meetup / Workshop / Webinar / Hackathon / Ideathon / Buildathon / Seminar / Conference / Training / Panel / Showcase / Challenge / Networking |
| `delivery` | enum | Online / Offline / Hybrid |
| `status` | enum | Upcoming / Ongoing / Past / Cancelled |
| `startDate` | ISO8601 | Must be a valid date |
| `summary` | string | Max 200 chars |

### Optional Fields
`endDate`, `registrationUrl`, `registrationDeadline`, `coverImage`, `gallery[]`,
`relatedProgram`, `partnerInstitution`, `focusAreas[]`, `audience[]`, `tags[]`, `description`

### Validation Rules
- `status` must be accurate: a past `startDate` event must not have status "Upcoming."
- `registrationUrl` must be a valid URL if present.
- `coverImage` must exist in `public/images/events/` before referencing.
- `type` is not the same as `format`. Type = context; format = structure.
- `purpose[]` values must come from the approved list.

---

## 2. Program Content Model

### Required Fields
| Field | Type | Rule |
|-------|------|------|
| `name` | string | Official program name; unique |
| `slug` | string | kebab-case; unique |
| `purpose` | string | One-sentence purpose statement |
| `status` | enum | Active / Completed / Upcoming / Paused |
| `description` | string | Minimum 50 chars |

### Optional Fields
`audience[]`, `focusAreas[]`, `seriesStructure`, `relatedEvents[]`,
`participationCTA`, `coverImage`, `tags[]`, `featured`

### Validation Rules
- A Program record is NOT an event format. Programs contain events; they are not events.
- `status` must be current and accurate.
- `relatedEvents[]` must contain valid event slugs.

---

## 3. Resource Content Model

### Required Fields
| Field | Type | Rule |
|-------|------|------|
| `title` | string | Unique; descriptive |
| `slug` | string | kebab-case; unique |
| `category` | string | e.g. Guide / Documentation / Video / Tool / Publication |
| `type` | enum | Internal / External |
| `url` | string | Valid URL or internal file path |
| `description` | string | Min 20 chars |

### Optional Fields
`source`, `focusAreas[]`, `tags[]`, `publicationDate`, `featured`

### Validation Rules
- External resources must have valid, reachable URLs (check periodically).
- Internal resources must exist in `public/documents/` before referencing.

---

## 4. Article (Blog) Content Model

### Required Fields
| Field | Type | Rule |
|-------|------|------|
| `title` | string | Unique; SEO-appropriate |
| `slug` | string | kebab-case; unique |
| `excerpt` | string | 1–2 sentences; max 250 chars |
| `body` | markdown | Substantive body content required |
| `category` | string | Community / Events / Technology / Ecosystem / News |
| `publishedAt` | ISO8601 | Must be a valid date |
| `status` | enum | Published / Draft / Archived |
| `featuredImage` | string | Must exist in `public/images/blog/` |

### Optional Fields
`author`, `updatedAt`, `tags[]`, `relatedEvents[]`, `relatedPrograms[]`, `featured`

### Validation Rules
- Articles must not be published with `status: Draft`.
- `author.name` must be an approved OrigoHOST contributor.
- Featured image must have a corresponding alt text field.

---

## 5. Team Member Content Model

### Required Fields
| Field | Type | Rule |
|-------|------|------|
| `name` | string | Full name |
| `role` | string | Approved official public role title |
| `avatar` | string | Must exist in `public/images/team/` |
| `biography` | string | Approved biography text |

### Optional Fields
`slug`, `department`, `approvedLinks{}`, `featured`, `order`

### Validation Rules
- `role` must match the approved public record — cross-reference with brand conflict register.
- `biography` must be approved by the team member themselves.
- `approvedLinks` must only contain links the team member has approved for public listing.
- Do not add team members without explicit approval from the project lead.

---

## 6. Partner Content Model

### Required Fields
| Field | Type | Rule |
|-------|------|------|
| `name` | string | Official organization name |
| `category` | string | Technology / Academic / Industry / Knowledge / Hiring / Media / Strategic / Ecosystem |
| `relationshipRole[]` | string[] | e.g. ["Technology Partner", "Knowledge Partner"] |
| `description` | string | Approved description of confirmed relationship |
| `logo` | string | Must exist in `public/images/partners/` |
| `status` | enum | Active / Past |

### Optional Fields
`website`, `featured`

### Validation Rules
- **A partner record must not be created without written confirmation from the named organization.**
- `relationshipRole[]` must accurately describe the nature of the relationship.
- Do not use generic "Partner" — specify the category.

---

## 7. Sponsor Content Model

### Required Fields
| Field | Type | Rule |
|-------|------|------|
| `name` | string | Official organization name |
| `description` | string | Approved brief description |
| `logo` | string | Must exist in `public/images/sponsors/` |
| `status` | enum | Active / Past |

### Optional Fields
`tier`, `website`, `featured`

### Validation Rules
- **A sponsor record must not be created without a confirmed sponsorship agreement.**
- `tier` should only be used if a formal tiering system has been approved.

---

## 8. FAQ Content Model

### Required Fields
| Field | Type | Rule |
|-------|------|------|
| `category` | string | General / Community / Events / Programs / Participation / Partnerships / Sponsorship / Contact / Policies |
| `question` | string | Written as a genuine user question |
| `answer` | markdown | Accurate, concise, factually verified |
| `order` | number | Display order within category |

### Optional Fields
`relatedLinks[]`

### Validation Rules
- Answers must not contain unverified statistics.
- Answers must not describe proposed frameworks as adopted facts.
- Link targets in `relatedLinks[]` must exist and resolve correctly.

---

## 9. Content Classification Summary

| Term | Meaning | Example |
|------|---------|---------|
| Program | Sustained initiative or series | Knowledge Sharing Series 2026 |
| Series | Structured set of episodes within a program | KSS2026 |
| Episode / Event | Single occurrence | KSS2026 — Episode 03 |
| Format | Structure of the event | Webinar |
| Type | Context of the event | Institutional |
| Purpose | Goal of the event | Learn, Build, Compete |
| Delivery | Mode of the event | Online, Offline, Hybrid |

> Never conflate Program with Event Format.
> Never conflate Stakeholder Type with Relationship Role.
