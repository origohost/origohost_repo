# Backend build — self-hosted Supabase

Because your Supabase project is self-hosted (not Lovable Cloud), I cannot push migrations or configure OAuth providers for you. I will:

1. Give you **one SQL script** to paste into your Supabase SQL Editor (schema, RLS, roles, triggers).
2. Give you a **short checklist** for the Supabase dashboard (enable Google provider, set Site URL, redirect URLs).
3. Write **all the app code** that talks to those tables.

Nothing gets committed to git — `.env` is already ignored.

---

## 1. SQL to run in Supabase (I'll provide it in the next message)

Creates the following tables in `public`, all with RLS + grants:

| Table                                                         | Purpose                                                    | Who can write                           |
| ------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------- |
| `profiles`                                                    | display_name, avatar, bio, socials — 1:1 with `auth.users` | owner                                   |
| `user_roles` + `app_role` enum (`admin`, `moderator`, `user`) | roles table separate from profiles (secure)                | admin only                              |
| `partners`                                                    | replaces the local partners store                          | admin only, public read                 |
| `contact_submissions`                                         | contact-form entries                                       | anon insert, admin read                 |
| `jobs`                                                        | job listings                                               | admin write, public read                |
| `events`                                                      | events with date/location                                  | admin write, public read                |
| `gallery_items`                                               | image + caption                                            | admin write, public read                |
| `blog_posts`                                                  | slug, title, excerpt, body, published_at                   | admin write, published rows public read |
| `faq_items`                                                   | question / answer / category / sort_order                  | admin write, public read                |

Plus:

- `has_role(user_id, role)` SECURITY DEFINER function (prevents recursive RLS).
- `handle_new_user()` trigger on `auth.users` → auto-creates a profile row.
- `updated_at` trigger where relevant.
- All tables get proper `GRANT` statements — no PostgREST permission errors.

## 2. Supabase dashboard checklist

You'll do these once in your Supabase project:

- **Authentication → URL Configuration**: set Site URL to your app URL and add `http://localhost:8080/**` + your prod URL to Redirect URLs.
- **Authentication → Providers → Google**: enable + paste your Google OAuth client ID/secret (or leave disabled and skip Google button — email/password still works).
- **Authentication → Email**: toggle "Confirm email" as you prefer (off = instant login in dev).
- **Authentication → Policies**: nothing to do here — the SQL script sets all RLS.

## 3. App code I'll add

**Auth layer**

- `src/hooks/use-auth.ts` — session hook using `supabase.auth`, exposes `user`, `isAdmin`, `signIn`, `signUp`, `signInWithGoogle`, `signOut`. Uses `onAuthStateChange` + `getUser()` correctly, no race conditions.
- Wire `AuthProvider` into `src/providers/app-providers.tsx`.
- Rewrite `src/routes/login.tsx`, `register.tsx`, `forgot-password.tsx` to actually call Supabase (currently stubs).
- Add `src/routes/reset-password.tsx` — required for the reset flow to work.
- Add `src/routes/_authenticated/route.tsx` — client-only auth gate that redirects to `/login`.
- Move `admin.partners.tsx` under `_authenticated/` and add an admin role check (redirect non-admins to `/`).

**Partners CMS**

- Rewrite `src/features/cms/content/partners.store.ts` to read/write `public.partners` via `supabase-js` (list, create, update, delete, reorder). Keeps the same store API so the marquee + admin page don't change shape.
- Realtime subscription on `partners` so the marquee updates without refresh.

**Contact form**

- Rewrite the contact page submit handler to insert into `contact_submissions` (anon insert allowed, Zod-validated).
- Add `src/routes/_authenticated/admin.messages.tsx` for admins to read submissions.

**CMS tables (jobs / events / gallery / blog / FAQ)**

- Read layer: replace each route's local content import with a Supabase query (`useSuspenseQuery` in a loader) with **fallback to the existing local content** so the site never looks empty before you add rows.
- Admin write layer: one page per resource under `_authenticated/admin.*` with list + create + edit + delete. Simple, consistent shadcn forms — no redesign.

**Loading skeletons & errors**: every loader route gets `errorComponent` + `notFoundComponent` (some are missing today).

## Out of scope

- Redesigning any existing page.
- Business logic beyond CRUD.
- Deployment / publishing.

## After you approve

I'll deliver in one turn:

1. The SQL script (in chat + saved to `docs/backend-schema.sql`).
2. All the code changes.
3. A short "what to do now" checklist.

Then you paste the SQL, tick the dashboard boxes, reload — and the app is fully wired.
