# OrigoHOST — Environments

## 1. Environment Overview

The OrigoHOST website uses three environments:

| Environment | Purpose | Audience | URL Pattern |
|-------------|---------|----------|-------------|
| Development | Local development and feature work | Developers | `localhost:3000` |
| Staging | Pre-production review and QA | Internal team + stakeholders | `staging.origohost.com` (or equivalent) |
| Production | Live public website | Everyone | `origohost.com` (or equivalent) |

---

## 2. Development Environment

### Purpose
- Local feature development
- Component building and testing
- Integration testing before staging

### Configuration
- Uses `.env.local` or `.env.development` for local overrides
- Never connects to production databases or APIs
- Uses mock/stub data for third-party services where possible
- Hot-reload enabled

### Access
- Developers only
- No public exposure

### Rules
- `.env.local` must be listed in `.gitignore` — never commit local secrets
- All environment variables must be documented in `.env.example`

---

## 3. Staging Environment

### Purpose
- Full pre-production validation
- Content QA and stakeholder review
- Accessibility, performance and security testing
- User acceptance testing (UAT)

### Configuration
- Uses staging-specific environment variables
- May use staging equivalents of analytics, forms and third-party services
- Should mirror production infrastructure as closely as possible

### Access
- Internal team and approved stakeholders
- Protected from public search indexing (`robots.txt`: `Disallow: /`)
- May be behind basic auth or IP allowlist

### Rules
- No feature goes to production without staging approval
- Content approved on staging must not be modified before production deployment
- Staging must be reset/refreshed from production periodically to avoid drift

---

## 4. Production Environment

### Purpose
- Live public-facing website

### Configuration
- Uses production environment variables only
- All analytics, tracking and third-party integrations live
- CDN enabled with appropriate cache-control headers
- HTTPS enforced with valid SSL certificate
- Security headers active (HSTS, CSP, X-Frame-Options, etc.)

### Access
- Public
- Administrative access restricted to authorized team members

### Rules
- Production deployments require staging sign-off
- Production deployments must follow the deployment checklist
- A rollback plan must be identified before every deployment
- Deployments to production should be scheduled — avoid deploying immediately before events

---

## 5. Environment Variables

All environment variables must be documented in `.env.example` with placeholder values and comments.

### Required Variables (Template — Next.js App Router)

```env
# ============================================================
# APPLICATION
# ============================================================
NEXT_PUBLIC_SITE_URL=https://origohost.com
NEXT_PUBLIC_SITE_NAME=OrigoHOST
NEXT_PUBLIC_SITE_TAGLINE=Where Builders Become Innovators

# ============================================================
# ANALYTICS
# ============================================================
NEXT_PUBLIC_GA_MEASUREMENT_ID=          # Google Analytics 4 Measurement ID
NEXT_PUBLIC_ANALYTICS_ENABLED=false     # Set to true in production only

# ============================================================
# FORMS / CONTACT (Next.js API Routes)
# ============================================================
CONTACT_FORM_RECIPIENT=                 # Internal email for contact form routing
JOIN_FORM_RECIPIENT=                    # Internal email for join form routing
FORM_RATE_LIMIT_PER_HOUR=10            # Max submissions per IP per hour

# ============================================================
# EMAIL
# ============================================================
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=                          # NEVER commit — use secrets manager

# ============================================================
# FIREBASE (if Firebase chosen)
# ============================================================
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_ADMIN_PRIVATE_KEY=             # NEVER commit — server-side only
FIREBASE_ADMIN_CLIENT_EMAIL=

# ============================================================
# SUPABASE (if Supabase chosen)
# ============================================================
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=             # NEVER commit — server-side only

# ============================================================
# SEARCH
# ============================================================
NEXT_PUBLIC_SEARCH_INDEX=               # Search index name (Algolia/Typesense)

# ============================================================
# FEATURE FLAGS
# ============================================================
NEXT_PUBLIC_MAINTENANCE_MODE=false
NEXT_PUBLIC_BLOG_ENABLED=true
NEXT_PUBLIC_GALLERY_ENABLED=true
NEXT_PUBLIC_SEARCH_ENABLED=true
NEXT_PUBLIC_PWA_ENABLED=true
```

---

## 6. Secrets Management

| Secret Type | Storage | Rule |
|-------------|---------|------|
| API keys | Environment variable / secrets manager | Never in source code |
| SMTP credentials | Secrets manager | Never in source code |
| CMS tokens | Secrets manager | Never in source code |
| Database credentials | Secrets manager | Never in source code |
| `.env.local` | Local only | In `.gitignore` |

---

## 7. Build and Deploy Pipeline

### Recommended Flow (Next.js)

```
git push origin feature/branch
    ↓
CI pipeline triggered (GitHub Actions / Vercel / other)
    ↓
npm install (frozen lockfile: npm ci)
    ↓
TypeScript type check: npx tsc --noEmit
    ↓
ESLint: npm run lint
    ↓
Unit + integration tests: npm test
    ↓
Next.js build: npm run build (next build)
    ↓
(on staging branch) → Deploy to staging (next start or Vercel preview)
    ↓
Manual QA / stakeholder review
    ↓
Accessibility test (axe / Playwright)
    ↓
Lighthouse CI run
    ↓
(on main branch, after PR approval) → Deploy to production
    ↓
Post-deployment smoke tests
    ↓
Monitor (uptime + error tracking + Core Web Vitals)
```

### Key Next.js Build Considerations
- Run `next build` to check for build errors and static generation issues before deploying
- ISR pages with `revalidate` require a Node.js server (not pure static export)
- Framer Motion tree-shaking: import only what is used
- `next/image` remote domains must be whitelisted in `next.config.ts`
- PWA service worker generated at build time (next-pwa or custom)

### Rollback Strategy
- Vercel: instant rollback to previous deployment via dashboard
- Self-hosted: retain previous build artifact; redeploy via CI with previous commit tag
- Define rollback trigger: who decides, what threshold (error rate, uptime breach)
- Test rollback procedure in staging before first production deployment

---

## 8. Performance Targets

To be finalized and approved before launch. Suggested starting point:

| Metric | Target |
|--------|--------|
| Largest Contentful Paint (LCP) | < 2.5 seconds |
| First Input Delay (FID) / INP | < 100ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Time to First Byte (TTFB) | < 800ms |
| Lighthouse Performance Score | ≥ 85 |
| Lighthouse Accessibility Score | ≥ 90 |
| Lighthouse SEO Score | ≥ 95 |

---

## 9. Monitoring

| Area | Tool / Method |
|------|--------------|
| Uptime | Uptime monitoring service (to be selected) |
| Error tracking | Error monitoring service (e.g., Sentry) |
| Performance | Core Web Vitals (via Search Console / CrUX) |
| Analytics | Approved analytics platform |
| Form errors | Log form submission failures |
| Search queries | Search analytics for zero-result queries |
