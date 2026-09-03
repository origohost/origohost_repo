-- =====================================================================
-- OrigoHOSTs Community — full backend schema
-- Run this ONCE in the Supabase SQL Editor of your project
-- (vtjxacmlmiatwpzyrifw). Idempotent: safe to re-run.
-- =====================================================================

-- ---------- Extensions ----------
create extension if not exists "pgcrypto";

-- =====================================================================
-- 1. Timestamp helper
-- =====================================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =====================================================================
-- 2. Roles (separate table — never on profiles)
-- =====================================================================
do $$ begin
  create type public.app_role as enum ('admin', 'moderator', 'user');
exception when duplicate_object then null; end $$;

create table if not exists public.user_roles (
  id      uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role    public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

drop policy if exists "read own roles" on public.user_roles;
create policy "read own roles" on public.user_roles
  for select to authenticated using (user_id = auth.uid());

-- SECURITY DEFINER avoids recursive RLS when policies call it
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles where user_id = _user_id and role = _role
  )
$$;

grant execute on function public.has_role(uuid, public.app_role) to anon, authenticated;

-- =====================================================================
-- 3. Profiles (1:1 with auth.users)
-- =====================================================================
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url   text,
  bio          text,
  socials      jsonb not null default '{}'::jsonb,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

grant select, insert, update on public.profiles to authenticated;
grant select on public.profiles to anon;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

drop policy if exists "profiles public read" on public.profiles;
drop policy if exists "profiles owner insert" on public.profiles;
drop policy if exists "profiles owner update" on public.profiles;

create policy "profiles public read" on public.profiles
  for select to anon, authenticated using (true);
create policy "profiles owner insert" on public.profiles
  for insert to authenticated with check (id = auth.uid());
create policy "profiles owner update" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create a profile row on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =====================================================================
-- 4. Partners (replaces localStorage store)
-- =====================================================================
create table if not exists public.partners (
  id         uuid primary key default gen_random_uuid(),
  kind       text not null check (kind in ('logo', 'institute')),
  name       text not null,
  domain     text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists partners_kind_sort_idx
  on public.partners (kind, sort_order);

grant select on public.partners to anon, authenticated;
grant insert, update, delete on public.partners to authenticated;
grant all on public.partners to service_role;
alter table public.partners enable row level security;

drop policy if exists "partners public read"  on public.partners;
drop policy if exists "partners admin insert" on public.partners;
drop policy if exists "partners admin update" on public.partners;
drop policy if exists "partners admin delete" on public.partners;

create policy "partners public read" on public.partners
  for select to anon, authenticated using (true);
create policy "partners admin insert" on public.partners
  for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "partners admin update" on public.partners
  for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create policy "partners admin delete" on public.partners
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

drop trigger if exists partners_updated_at on public.partners;
create trigger partners_updated_at
  before update on public.partners
  for each row execute function public.set_updated_at();

-- Enable realtime for the marquee
alter publication supabase_realtime add table public.partners;

-- =====================================================================
-- 5. Contact submissions
-- =====================================================================
create table if not exists public.contact_submissions (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  message    text not null,
  user_agent text,
  handled    boolean not null default false,
  created_at timestamptz not null default now()
);

grant insert on public.contact_submissions to anon, authenticated;
grant select, update, delete on public.contact_submissions to authenticated;
grant all on public.contact_submissions to service_role;
alter table public.contact_submissions enable row level security;

drop policy if exists "contact anon insert"  on public.contact_submissions;
drop policy if exists "contact admin read"   on public.contact_submissions;
drop policy if exists "contact admin update" on public.contact_submissions;
drop policy if exists "contact admin delete" on public.contact_submissions;

create policy "contact anon insert" on public.contact_submissions
  for insert to anon, authenticated with check (
    char_length(name) between 1 and 100
    and char_length(email) between 3 and 255
    and char_length(message) between 10 and 2000
  );
create policy "contact admin read" on public.contact_submissions
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "contact admin update" on public.contact_submissions
  for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create policy "contact admin delete" on public.contact_submissions
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- =====================================================================
-- 6. Shared CMS pattern (jobs / events / gallery / faq / blog)
-- =====================================================================

-- ---- Jobs ----
create table if not exists public.jobs (
  id         uuid primary key default gen_random_uuid(),
  role       text not null,
  company    text not null,
  location   text not null,
  type       text not null check (type in ('Full-time','Part-time','Internship','Contract')),
  tags       text[] not null default '{}',
  apply_url  text,
  published  boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---- Events ----
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  city        text not null,
  category    text not null,
  mode        text not null check (mode in ('ONLINE','OFFLINE')),
  starts_at   timestamptz not null,
  published   boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---- Gallery ----
create table if not exists public.gallery_items (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  category   text not null,
  count      integer not null default 0,
  tone       text not null default 'orange',
  published  boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---- FAQ ----
create table if not exists public.faq_items (
  id         uuid primary key default gen_random_uuid(),
  question   text not null,
  answer     text not null,
  category   text,
  published  boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---- Blog ----
create table if not exists public.blog_posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  excerpt      text,
  body         text not null,
  cover_url    text,
  author_id    uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists blog_posts_published_at_idx
  on public.blog_posts (published_at desc nulls last);

-- ---- Grants + RLS: apply the same pattern to every CMS table ----
do $$
declare
  t text;
  cms_tables text[] := array['jobs','events','gallery_items','faq_items','blog_posts'];
begin
  foreach t in array cms_tables loop
    execute format('grant select on public.%I to anon, authenticated;', t);
    execute format('grant insert, update, delete on public.%I to authenticated;', t);
    execute format('grant all on public.%I to service_role;', t);
    execute format('alter table public.%I enable row level security;', t);

    execute format('drop policy if exists "%1$s public read"  on public.%1$s;', t);
    execute format('drop policy if exists "%1$s admin insert" on public.%1$s;', t);
    execute format('drop policy if exists "%1$s admin update" on public.%1$s;', t);
    execute format('drop policy if exists "%1$s admin delete" on public.%1$s;', t);

    -- Public read (blog_posts only reveals published rows to anon)
    if t = 'blog_posts' then
      execute 'create policy "blog_posts public read" on public.blog_posts
               for select to anon using (published_at is not null and published_at <= now());
               create policy "blog_posts auth read"   on public.blog_posts
               for select to authenticated using (true);';
    else
      execute format('create policy "%1$s public read" on public.%1$s
                      for select to anon, authenticated using (
                        coalesce((row_to_json(%1$s)->>''published'')::boolean, true)
                      );', t);
    end if;

    execute format('create policy "%1$s admin insert" on public.%1$s
                    for insert to authenticated with check (public.has_role(auth.uid(), ''admin''));', t);
    execute format('create policy "%1$s admin update" on public.%1$s
                    for update to authenticated
                    using (public.has_role(auth.uid(), ''admin''))
                    with check (public.has_role(auth.uid(), ''admin''));', t);
    execute format('create policy "%1$s admin delete" on public.%1$s
                    for delete to authenticated using (public.has_role(auth.uid(), ''admin''));', t);

    execute format('drop trigger if exists %1$s_updated_at on public.%1$s;', t);
    execute format('create trigger %1$s_updated_at
                    before update on public.%1$s
                    for each row execute function public.set_updated_at();', t);
  end loop;
end $$;

-- =====================================================================
-- 7. Bootstrap: make YOURSELF the first admin
--    Sign up in the app first, then uncomment + run this line:
-- =====================================================================
-- insert into public.user_roles (user_id, role)
-- select id, 'admin' from auth.users where email = 'YOUR_EMAIL@example.com'
-- on conflict do nothing;
