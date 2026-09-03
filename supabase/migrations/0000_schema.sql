-- OrigoHOSTs Enterprise Schema
-- Auto-generated during Architecture Phase 1

-- ==========================================
-- EXTENSIONS
-- ==========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. AUTH & ROLES
-- ==========================================

-- Custom roles enum
CREATE TYPE user_role AS ENUM (
  'guest',
  'student',
  'organization',
  'recruiter',
  'moderator',
  'admin',
  'super_admin'
);

-- user_roles table ties Supabase auth.users to our application roles
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'student',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);
;['']
-- Helper function to check roles in RLS policies
CREATE OR REPLACE FUNCTION public.has_role(uid uuid, required_role user_role)
RETURNS boolean AS $$
BEGIN
  -- Super admins have all permissions
  IF EXISTS (SELECT 1 FROM user_roles WHERE user_id = uid AND role = 'super_admin') THEN
    RETURN true;
  END IF;
  -- Direct match check
  RETURN EXISTS (SELECT 1 FROM user_roles WHERE user_id = uid AND role = required_role);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ==========================================
-- 2. CMS (Pages, Blocks, Navigation)
-- ==========================================

CREATE TABLE public.pages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  is_published boolean DEFAULT false,
  seo_metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.page_blocks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id uuid NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  block_type text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.navigation (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  label text NOT NULL,
  href text NOT NULL,
  is_external boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  parent_id uuid REFERENCES navigation(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- ==========================================
-- 3. EVENTS
-- ==========================================

CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  date timestamptz NOT NULL,
  location text NOT NULL,
  image_url text,
  category text,
  status text DEFAULT 'upcoming', -- 'upcoming', 'ongoing', 'past'
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.event_registrations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status text DEFAULT 'confirmed', -- 'confirmed', 'waitlisted', 'cancelled'
  registered_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- ==========================================
-- 4. JOBS (ATS)
-- ==========================================

CREATE TABLE public.jobs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  type text NOT NULL, -- 'Full-time', 'Part-time', 'Contract', 'Internship'
  description text NOT NULL,
  requirements jsonb DEFAULT '[]'::jsonb,
  benefits jsonb DEFAULT '[]'::jsonb,
  apply_url text,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.job_applications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  portfolio_url text,
  linkedin_url text,
  status text DEFAULT 'pending', -- 'pending', 'reviewed', 'accepted', 'rejected'
  applied_at timestamptz DEFAULT now()
);

-- ==========================================
-- 5. SOCIAL PROOF (Gallery, Testimonials, Partners)
-- ==========================================

CREATE TABLE public.gallery_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  category text NOT NULL,
  count integer DEFAULT 0,
  tone text DEFAULT 'orange',
  published boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  company text,
  role text,
  quote text NOT NULL,
  avatar_url text,
  rating integer DEFAULT 5,
  published boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.partners (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  type text NOT NULL DEFAULT 'logo', -- 'logo', 'institute'
  domain text,
  image_url text,
  published boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- ==========================================
-- 6. CERTIFICATES
-- ==========================================

CREATE TABLE public.certificates (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_name text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  event_name text NOT NULL,
  issue_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- ==========================================
-- 7. RLS POLICIES (Example Base)
-- ==========================================

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Public can read published items
CREATE POLICY "Public can read published events" ON public.events FOR SELECT USING (published = true);
CREATE POLICY "Public can read published jobs" ON public.jobs FOR SELECT USING (published = true);
CREATE POLICY "Public can read published gallery items" ON public.gallery_items FOR SELECT USING (published = true);
CREATE POLICY "Public can read published partners" ON public.partners FOR SELECT USING (published = true);
CREATE POLICY "Public can read published testimonials" ON public.testimonials FOR SELECT USING (published = true);
CREATE POLICY "Public can read all certificates" ON public.certificates FOR SELECT USING (true); -- Public verification

-- Admins can do everything
-- (In a real setup, apply this to all tables)
CREATE POLICY "Admins bypass RLS on events" ON public.events USING (public.has_role(auth.uid(), 'admin'));

-- ==========================================
-- 8. SETTINGS & SEO
-- ==========================================
CREATE TABLE public.settings (
  id text PRIMARY KEY DEFAULT 'global',
  site_name text DEFAULT 'OrigoHOSTs Community',
  support_email text DEFAULT 'support@origohosts.com',
  maintenance_mode boolean DEFAULT false,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.seo_redirects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_path text NOT NULL UNIQUE,
  destination_url text NOT NULL,
  permanent boolean DEFAULT true,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- ==========================================
-- 9. NEWSLETTER
-- ==========================================
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text NOT NULL UNIQUE,
  status text DEFAULT 'active', -- 'active', 'unsubscribed'
  subscribed_at timestamptz DEFAULT now()
);

CREATE TABLE public.newsletter_campaigns (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject text NOT NULL,
  content text NOT NULL,
  status text DEFAULT 'draft', -- 'draft', 'sent'
  sent_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- ==========================================
-- 10. SECURITY & PROFILES
-- ==========================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  role text DEFAULT 'student' CHECK (role IN ('student', 'organization', 'recruiter', 'admin')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 9. Organizations
CREATE TABLE IF NOT EXISTS public.organizations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  industry text,
  website text,
  logo_url text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 10. Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_email text NOT NULL,
  action text NOT NULL,
  entity text NOT NULL,
  entity_id text,
  ip_address text,
  created_at timestamptz DEFAULT now()
);

-- 11. Gallery Images
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text,
  image_url text NOT NULL,
  category text,
  is_featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
