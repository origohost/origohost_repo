# OrigoHOST — Deployment Checklist

Use this checklist before every production deployment.
All items must be confirmed before the deployment is approved.

---

## Pre-Deployment: Code & Build

- [ ] All P0 features implemented and tested
- [ ] No unresolved critical (P0) or high (P1) defects
- [ ] Code reviewed and approved by at least one team member
- [ ] TypeScript type check passes: `npx tsc --noEmit` returns no errors
- [ ] ESLint passes: `npm run lint` returns no errors or warnings
- [ ] All automated tests passing (unit, integration, e2e)
- [ ] Production build completes without errors: `npm run build` succeeds
- [ ] No hardcoded secrets, credentials or environment-specific values in source
- [ ] `.env.example` is up to date with all required variables documented
- [ ] All dependencies up to date; no known security vulnerabilities in `npm audit`
- [ ] No `any` TypeScript types in production code (except documented exceptions)
- [ ] Framer Motion: `useReducedMotion()` applied on all animated components

---

## Pre-Deployment: Content

- [ ] All P0 pages have approved, verified content
- [ ] All event records are accurate and status values are current
- [ ] No stale "Upcoming" events with past start dates
- [ ] No unconfirmed partnership or sponsor records published
- [ ] All published statistics have defined metric, period, source and methodology
- [ ] No proposed frameworks presented as adopted facts
- [ ] Privacy Policy is finalized and legally reviewed
- [ ] Terms & Conditions are finalized and legally reviewed
- [ ] All team member records approved by the individuals
- [ ] All internal links verified and resolving correctly
- [ ] All external links verified as reachable
- [ ] All images loaded correctly with meaningful alt text
- [ ] No broken or placeholder images

---

## Pre-Deployment: SEO

- [ ] Every page has a unique `<title>` (50–60 chars)
- [ ] Every page has a unique `meta description` (140–160 chars)
- [ ] All canonical URLs correct and absolute
- [ ] Open Graph metadata present on all key pages
- [ ] XML sitemap generated and accessible at `/sitemap.xml`
- [ ] `robots.txt` configured correctly for production (not blocking crawlers)
- [ ] Structured data (JSON-LD) validated where implemented
- [ ] No duplicate title or description tags

---

## Pre-Deployment: Accessibility

- [ ] WCAG 2.2 AA review completed on all P0 pages
- [ ] Keyboard navigation working across all primary journeys
- [ ] Focus indicators visible throughout
- [ ] All form fields labeled correctly
- [ ] Color contrast ratios meet AA standards
- [ ] `prefers-reduced-motion` respected
- [ ] Screen reader testing completed on critical paths
- [ ] No accessibility issues rated Critical or High unresolved

## Pre-Deployment: PWA

- [ ] `public/manifest.json` is valid (use PWA Manifest Validator)
- [ ] PWA icons present at 192×192 and 512×512 in `public/favicon/`
- [ ] Service worker registered and functioning in staging
- [ ] Offline fallback page renders correctly when network is unavailable
- [ ] Caching strategy confirmed for static assets, API responses and key pages
- [ ] App is installable (Add to Home Screen works on Chrome + Safari)
- [ ] `theme_color` and `background_color` match brand colors
- [ ] Lighthouse PWA score reviewed

---

## Pre-Deployment: Visual Quality (Document 10)

- [ ] No generic AI design patterns present (equal card grids, default typography, excessive gradients)
- [ ] Asymmetric / editorial layouts implemented as designed
- [ ] All animations use Framer Motion — no raw CSS `@keyframes` on interactive elements
- [ ] Magnetic button behavior verified on primary CTAs
- [ ] Page transitions working correctly between all P0 routes
- [ ] Brand typography applied correctly throughout
- [ ] Brand color tokens used — no hardcoded hex values in components
- [ ] Visual design reviewed and approved by project lead

- [ ] Core Web Vitals measured on staging
- [ ] Agreed performance budgets met
- [ ] Images optimized (WebP format, correct dimensions, lazy-loaded)
- [ ] Fonts optimized (subset, preloaded, WOFF2)
- [ ] JavaScript bundle size within acceptable limits
- [ ] Third-party scripts reviewed and minimized
- [ ] CDN and caching configured for production
- [ ] Lighthouse scores meet targets (Performance ≥ 85, SEO ≥ 95, A11y ≥ 90)

---

## Pre-Deployment: Security

- [ ] HTTPS enforced; valid SSL certificate in place
- [ ] Security headers configured (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- [ ] All form endpoints include CSRF protection where applicable
- [ ] Rate limiting on contact and join forms
- [ ] Bot/spam protection on public forms
- [ ] Input validation and output encoding in place
- [ ] No sensitive data exposed in public API responses
- [ ] No credentials or secrets in repository or build artifacts
- [ ] `npm audit` reports no critical or high vulnerabilities

---

## Pre-Deployment: Infrastructure

- [ ] Production environment variables set correctly in hosting platform
- [ ] Database backups configured (if applicable)
- [ ] CDN configured and tested
- [ ] Error pages (403, 404, 500) confirmed working
- [ ] Maintenance page confirmed working (can be toggled via feature flag)
- [ ] Rollback plan identified and tested in staging
- [ ] Monitoring and alerting configured (uptime, errors, performance)
- [ ] Analytics platform configured and consent handling in place

---

## Pre-Deployment: Stakeholder Approval

- [ ] Project lead has reviewed and approved staging build
- [ ] Content approver has signed off all P0 content
- [ ] Legal reviewer has approved Privacy Policy and Terms
- [ ] Security review completed
- [ ] Accessibility review completed
- [ ] Analytics and privacy handling approved

---

## Deployment Steps

1. Confirm all checklist items above are complete.
2. Create a deployment record (date, deployer, version, changes).
3. Notify the team of the deployment window.
4. Deploy to production via approved CI/CD pipeline.
5. Run post-deployment smoke tests (see below).
6. Confirm monitoring is active.
7. Record deployment as complete.

---

## Post-Deployment: Smoke Tests

Run these immediately after production deployment:

- [ ] Homepage loads correctly
- [ ] Navigation works on desktop and mobile
- [ ] Events page loads and displays event records
- [ ] Contact form submits successfully and delivers to correct inbox
- [ ] Join form submits successfully
- [ ] 404 page displays correctly for invalid URL
- [ ] Legal pages (Privacy Policy, Terms) are accessible
- [ ] SEO metadata visible in page source for homepage
- [ ] Analytics events firing correctly
- [ ] SSL certificate valid and HTTPS enforced
- [ ] All social links in footer resolve correctly

---

## Rollback Trigger

Initiate rollback immediately if any of the following occur post-deployment:

- Site is inaccessible (uptime monitor alerts)
- Critical user journey is broken (Home, Events, Contact, Join)
- Data is being exposed unexpectedly
- Form submissions are failing silently
- Significant spike in 5xx errors

**Rollback decision authority:** Project Lead / Technical Lead
**Rollback procedure:** Documented in deployment runbook (to be created)
