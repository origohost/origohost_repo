-- ============ ENUMS ============
CREATE TYPE public.program_status AS ENUM ('planning','upcoming','active','archived');
CREATE TYPE public.resource_type AS ENUM ('pdf','presentation','recording','guide','toolkit','article','project','external');
CREATE TYPE public.content_status AS ENUM ('draft','published','archived');
CREATE TYPE public.enquiry_status AS ENUM ('new','in_review','responded','closed','spam');
CREATE TYPE public.hosting_status AS ENUM ('new','reviewing','approved','rejected','converted');
CREATE TYPE public.application_status AS ENUM ('pending','approved','rejected');
CREATE TYPE public.membership_status AS ENUM ('none','pending','approved','active','rejected','suspended','alumni');
CREATE TYPE public.partner_status AS ENUM ('pending','active','inactive','archived');

-- ============ PROFILES: membership status ============
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS membership_status public.membership_status NOT NULL DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS slug text UNIQUE;

-- ============ ORGANIZATIONS: partner fields ============
ALTER TABLE public.organizations
  ADD COLUMN IF NOT EXISTS partner_status public.partner_status,
  ADD COLUMN IF NOT EXISTS partnership_category text,
  ADD COLUMN IF NOT EXISTS partnership_start date,
  ADD COLUMN IF NOT EXISTS partnership_end date,
  ADD COLUMN IF NOT EXISTS display_order integer NOT NULL DEFAULT 0;

-- ============ PROGRAMS ============
CREATE TABLE public.programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  summary text,
  description text,
  category text,
  format text,
  audience text[] NOT NULL DEFAULT '{}',
  objectives text[] NOT NULL DEFAULT '{}',
  eligibility text[] NOT NULL DEFAULT '{}',
  activities text[] NOT NULL DEFAULT '{}',
  outcomes text[] NOT NULL DEFAULT '{}',
  image_url text,
  contact_email text,
  lead_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  status public.program_status NOT NULL DEFAULT 'planning',
  is_published boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  seo_title text,
  seo_description text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.programs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.programs TO authenticated;
GRANT ALL ON public.programs TO service_role;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published programs are public" ON public.programs FOR SELECT USING (is_published = true);
CREATE POLICY "Content admins read all programs" ON public.programs FOR SELECT TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin']::public.app_role[]));
CREATE POLICY "Content admins manage programs" ON public.programs FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin']::public.app_role[]));
CREATE TRIGGER programs_updated_at BEFORE UPDATE ON public.programs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ RESOURCES ============
CREATE TABLE public.resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  category text,
  type public.resource_type NOT NULL DEFAULT 'article',
  thumbnail_url text,
  file_url text,
  external_url text,
  author text,
  reading_time text,
  tags text[] NOT NULL DEFAULT '{}',
  program_id uuid REFERENCES public.programs(id) ON DELETE SET NULL,
  event_id uuid REFERENCES public.events(id) ON DELETE SET NULL,
  published_at timestamptz,
  status public.content_status NOT NULL DEFAULT 'draft',
  is_public boolean NOT NULL DEFAULT true,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.resources TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.resources TO authenticated;
GRANT ALL ON public.resources TO service_role;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published public resources are visible" ON public.resources FOR SELECT
  USING (status = 'published' AND is_public = true);
CREATE POLICY "Members read published resources" ON public.resources FOR SELECT TO authenticated
  USING (status = 'published');
CREATE POLICY "Content admins manage resources" ON public.resources FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin']::public.app_role[]));
CREATE TRIGGER resources_updated_at BEFORE UPDATE ON public.resources FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ LEADERSHIP PROFILES ============
CREATE TABLE public.leadership_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  organization text,
  photo_url text,
  short_bio text,
  full_bio text,
  skills text[] NOT NULL DEFAULT '{}',
  responsibilities text[] NOT NULL DEFAULT '{}',
  links jsonb NOT NULL DEFAULT '[]'::jsonb,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.leadership_profiles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leadership_profiles TO authenticated;
GRANT ALL ON public.leadership_profiles TO service_role;
ALTER TABLE public.leadership_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active leadership is public" ON public.leadership_profiles FOR SELECT USING (is_active = true);
CREATE POLICY "Content admins manage leadership" ON public.leadership_profiles FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin']::public.app_role[]));
CREATE TRIGGER leadership_updated_at BEFORE UPDATE ON public.leadership_profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ COMMUNITY STORIES / TESTIMONIALS ============
CREATE TABLE public.community_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  organization text,
  photo_url text,
  quote text NOT NULL,
  story text,
  status public.content_status NOT NULL DEFAULT 'draft',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.community_stories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.community_stories TO authenticated;
GRANT ALL ON public.community_stories TO service_role;
ALTER TABLE public.community_stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published stories are public" ON public.community_stories FOR SELECT USING (status = 'published');
CREATE POLICY "Content admins manage stories" ON public.community_stories FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin']::public.app_role[]));
CREATE TRIGGER stories_updated_at BEFORE UPDATE ON public.community_stories FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ IMPACT METRICS ============
CREATE TABLE public.impact_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  label text NOT NULL,
  value text,
  description text,
  is_verified boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.impact_metrics TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.impact_metrics TO authenticated;
GRANT ALL ON public.impact_metrics TO service_role;
ALTER TABLE public.impact_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Metrics are public" ON public.impact_metrics FOR SELECT USING (true);
CREATE POLICY "Content admins manage metrics" ON public.impact_metrics FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin']::public.app_role[]));
CREATE TRIGGER metrics_updated_at BEFORE UPDATE ON public.impact_metrics FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ PARTNER CASE STUDIES ============
CREATE TABLE public.partner_case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  summary text,
  challenge text,
  collaboration text,
  outcome text,
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  status public.content_status NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.partner_case_studies TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_case_studies TO authenticated;
GRANT ALL ON public.partner_case_studies TO service_role;
ALTER TABLE public.partner_case_studies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published case studies are public" ON public.partner_case_studies FOR SELECT USING (status = 'published');
CREATE POLICY "Partnership admins manage case studies" ON public.partner_case_studies FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','partnership_admin','content_admin']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','partnership_admin','content_admin']::public.app_role[]));
CREATE TRIGGER case_studies_updated_at BEFORE UPDATE ON public.partner_case_studies FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ CONTACT ENQUIRIES ============
CREATE TABLE public.contact_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  category text,
  message text NOT NULL,
  status public.enquiry_status NOT NULL DEFAULT 'new',
  assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  notes jsonb NOT NULL DEFAULT '[]'::jsonb,
  submitted_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_enquiries TO authenticated;
GRANT ALL ON public.contact_enquiries TO service_role;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "CRM admins manage contact enquiries" ON public.contact_enquiries FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','crm_admin']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','crm_admin']::public.app_role[]));
CREATE TRIGGER contact_enquiries_updated_at BEFORE UPDATE ON public.contact_enquiries FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ EVENT HOSTING REQUESTS ============
CREATE TABLE public.event_hosting_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  organization text,
  event_title text NOT NULL,
  event_type text,
  description text,
  expected_audience text,
  preferred_date date,
  location text,
  mode public.event_mode,
  requirements text,
  status public.hosting_status NOT NULL DEFAULT 'new',
  assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  notes jsonb NOT NULL DEFAULT '[]'::jsonb,
  submitted_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.event_hosting_requests TO authenticated;
GRANT ALL ON public.event_hosting_requests TO service_role;
ALTER TABLE public.event_hosting_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Event admins manage hosting requests" ON public.event_hosting_requests FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','events_admin','crm_admin']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','events_admin','crm_admin']::public.app_role[]));
CREATE TRIGGER hosting_requests_updated_at BEFORE UPDATE ON public.event_hosting_requests FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ MEMBERSHIP APPLICATIONS ============
CREATE TABLE public.membership_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  organization_name text,
  designation text,
  education text,
  location text,
  bio text,
  skills text[] NOT NULL DEFAULT '{}',
  interests text[] NOT NULL DEFAULT '{}',
  community_interests text[] NOT NULL DEFAULT '{}',
  referral_source text,
  public_directory boolean NOT NULL DEFAULT false,
  consent boolean NOT NULL DEFAULT false,
  status public.application_status NOT NULL DEFAULT 'pending',
  reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at timestamptz,
  review_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.membership_applications TO authenticated;
GRANT ALL ON public.membership_applications TO service_role;
ALTER TABLE public.membership_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users submit own application" ON public.membership_applications FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users read own application" ON public.membership_applications FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','community_admin','crm_admin']::public.app_role[]));
CREATE POLICY "Users update own pending application" ON public.membership_applications FOR UPDATE TO authenticated
  USING (auth.uid() = user_id AND status = 'pending') WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Community admins manage applications" ON public.membership_applications FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','community_admin']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','community_admin']::public.app_role[]));
CREATE TRIGGER applications_updated_at BEFORE UPDATE ON public.membership_applications FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ MEDIA ASSETS ============
CREATE TABLE public.media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket text NOT NULL,
  path text NOT NULL,
  url text NOT NULL,
  filename text NOT NULL,
  content_type text,
  size_bytes bigint,
  kind text,
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  usage text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (bucket, path)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media_assets TO authenticated;
GRANT ALL ON public.media_assets TO service_role;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Uploader reads own media" ON public.media_assets FOR SELECT TO authenticated
  USING (uploaded_by = auth.uid() OR public.is_platform_admin(auth.uid()));
CREATE POLICY "Users record own uploads" ON public.media_assets FOR INSERT TO authenticated
  WITH CHECK (uploaded_by = auth.uid());
CREATE POLICY "Uploader deletes own media" ON public.media_assets FOR DELETE TO authenticated
  USING (uploaded_by = auth.uid() OR public.is_platform_admin(auth.uid()));
CREATE POLICY "Platform admins update media" ON public.media_assets FOR UPDATE TO authenticated
  USING (public.is_platform_admin(auth.uid())) WITH CHECK (public.is_platform_admin(auth.uid()));

-- ============ NOTIFICATION EVENTS (queued, provider-agnostic) ============
CREATE TABLE public.notification_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL,
  recipient_email text,
  recipient_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'queued',
  error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz
);
GRANT SELECT ON public.notification_events TO authenticated;
GRANT ALL ON public.notification_events TO service_role;
ALTER TABLE public.notification_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Platform admins read notifications" ON public.notification_events FOR SELECT TO authenticated
  USING (public.is_platform_admin(auth.uid()));

-- ============ INDEXES ============
CREATE INDEX idx_programs_published ON public.programs (is_published, display_order);
CREATE INDEX idx_resources_status ON public.resources (status, published_at DESC);
CREATE INDEX idx_stories_status ON public.community_stories (status, display_order);
CREATE INDEX idx_leadership_active ON public.leadership_profiles (is_active, display_order);
CREATE INDEX idx_orgs_partner ON public.organizations (partner_status, display_order);
CREATE INDEX idx_contact_status ON public.contact_enquiries (status, created_at DESC);
CREATE INDEX idx_hosting_status ON public.event_hosting_requests (status, created_at DESC);
CREATE INDEX idx_applications_status ON public.membership_applications (status, created_at DESC);
CREATE INDEX idx_registrations_user ON public.event_registrations (user_id);
CREATE INDEX idx_registrations_event ON public.event_registrations (event_id);
CREATE INDEX idx_certificates_user ON public.certificates (user_id);
CREATE INDEX idx_events_starts ON public.events (status, starts_at DESC);
CREATE INDEX idx_profiles_public ON public.profiles (is_public);