# 14 — Component Architecture & Taxonomy

> **Phase:** Phase 0 — Foundation, Strategy, Structure, Content, UX, SEO & Technical Blueprint  
> **Status:** DECIDED (Design System Component Inventory)  
> **Classification Standard:** DECIDED | PROPOSED | TBD | OPTIONAL | DEPENDENCY  

---

## 1. Architectural Taxonomy

Components are organized into strict functional layers to prevent ad-hoc duplication and ensure uniform visual hierarchy:

```
                            COMPONENT TAXONOMY
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. FOUNDATION        Container  •  Section  •  Stack  •  Grid               │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. NAVIGATION        Header  •  NavBar  •  MobileMenu  •  Footer  •  Crumb  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. CONTENT (Cards)   EventCard  •  ProgramCard  •  ArticleCard  •  TeamCard │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. FORMS             Input  •  Select  •  Textarea  •  Checkbox  •  Button  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. FEEDBACK          Alert  •  Toast  •  LoadingSpinner  •  EmptyState      │
├─────────────────────────────────────────────────────────────────────────────┤
│ 6. INTERACTION       Modal  •  Dropdown  •  Tabs  •  Accordion  •  Filters  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Inventory & Interface Definitions

### Layer 1: Foundation Components (`DECIDED`)
- **`Container`:** Centers and bounds content with responsive horizontal padding (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`).
- **`Section`:** Standardizes vertical rhythm across major landing page blocks (`py-16 md:py-24`).
- **`Stack`:** Vertical or horizontal flex layout primitive with parameterized gap tokens.
- **`Grid`:** Responsive CSS grid primitive (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`).

### Layer 2: Navigation Components (`DECIDED`)
- **`Header`:** Sticky top landmark containing brand logo, primary nav, and primary CTA.
- **`NavBar`:** Desktop horizontal navigation with subtle hover micro-interactions.
- **`MobileMenu`:** Accessible slide-over drawer with focus trap and body scroll lock.
- **`Footer`:** 4-column structured directory with copyright and social links.
- **`Breadcrumb`:** Semantic hierarchical navigation trail.

### Layer 3: Content Cards (`DECIDED`)
- **`BaseCard`:** Foundational surface card offering border styling, dark/light theme tokens, and subtle hover lift.
- **`EventCard`:** Extends `BaseCard` with date badge, format tag (Hackathon/Webinar), delivery mode, and registration link.
- **`ProgramCard`:** Displays cohort badge, duration, target audience, and syllabus link.
- **`ArticleCard`:** Blog article preview featuring cover image, reading time, author, and ISO date.
- **`ResourceCard`:** Downloadable guide or documentation link with category badge and file format indicator.
- **`TeamCard`:** Organizer card with headshot, name, title, department, and GitHub/LinkedIn links.

### Layer 4: Form Elements (`DECIDED`)
- **`FormField`:** Wrapper managing `<label>`, input slot, helper text, and error validation message.
- **`Input`:** Standardized text input with focus ring and error state borders.
- **`Select`:** Native or custom dropdown supporting immutable `as const` tuples and standard option objects.
- **`Textarea`:** Multiline input with autosize or resize constraints.
- **`Checkbox`:** Custom accessible checkbox with keyboard navigation support.
- **`Button`:** Unified button supporting `variant` (primary, secondary, outline, ghost), `size`, `href` (internal Next.js link or external), `loading`, and optional cursor proximity `magnetic` effect.

### Layer 5: Feedback Components (`DECIDED`)
- **`Alert`:** Inline contextual message banner (info, success, warning, error).
- **`Toast`:** Floating transient notification spawned on form actions.
- **`Loading`:** Skeletal placeholder mimicking card structures during data hydration.
- **`EmptyState`:** Clean branded fallback for empty search results or filtered states.

### Layer 6: Interactive Components (`DECIDED`)
- **`Modal`:** Accessible dialog with backdrop blur, Escape key listener, and focus lock.
- **`Dropdown`:** Click/hover floating menu for the "More" navigation cluster.
- **`Tabs`:** Accessible tab list for pathway switching on `/join` and category filters on `/resources`.
- **`Accordion`:** Collapsible panel for `/faq` questions with `aria-expanded` state.
- **`Filters`:** Multi-select toolbar for filtering events and resources.
