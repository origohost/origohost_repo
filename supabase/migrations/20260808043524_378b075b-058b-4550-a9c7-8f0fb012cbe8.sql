-- ============ ENUMS ============
CREATE TYPE public.app_role AS ENUM (
  'super_admin','platform_admin','content_admin','crm_admin','events_admin',
  'community_admin','chapter_admin','partnership_admin','certificate_admin',
  'editor','reviewer','chapter_leader','mentor','ambassador','member'
);
CREATE TYPE public.event_status AS ENUM ('proposal','review','approved','planning','published','live','completed','cancelled','archived');
CREATE TYPE public.event_mode AS ENUM ('online','offline','hybrid');
CREATE TYPE public.registration_status AS ENUM ('not_open','open','waitlist','full','closed');
CREATE TYPE public.chapter_type AS ENUM ('national','state','city','campus');
CREATE TYPE public.chapter_status AS ENUM ('application','review','approved','forming','active','paused','closed');
CREATE TYPE public.certificate_type AS ENUM ('participant','speaker','volunteer','organizer','mentor','winner','runner_up','contributor','chapter_leader');
CREATE TYPE public.org_type AS ENUM ('university','college','company','startup','community','ngo','industry','technology','media');
CREATE TYPE public.partnership_stage AS ENUM ('lead','qualified','discussion','proposal','negotiation','approved','active','renewal','closed');

-- ============ SHARED TRIGGER FN ============
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============ PROFILES (CRM person) ============
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  email text,
  phone text,
  photo_url text,
  headline text,
  bio text,
  location text,
  organization_name text,
  designation text,
  education text,
  skills text[] NOT NULL DEFAULT '{}',
  technology_interests text[] NOT NULL DEFAULT '{}',
  professional_interests text[] NOT NULL DEFAULT '{}',
  links jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_public boolean NOT NULL DEFAULT false,
  onboarded_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.profiles TO anon;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ ROLES ============
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  granted_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.has_any_role(_user_id uuid, _roles public.app_role[])
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = ANY(_roles));
$$;

CREATE OR REPLACE FUNCTION public.is_platform_admin(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_any_role(_user_id, ARRAY['super_admin','platform_admin']::public.app_role[]);
$$;

-- profiles policies
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "profiles_select_public" ON public.profiles FOR SELECT TO anon, authenticated USING (is_public = true);
CREATE POLICY "profiles_select_crm_admin" ON public.profiles FOR SELECT TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','crm_admin','community_admin']::public.app_role[]));
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- user_roles policies
CREATE POLICY "user_roles_select_own" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "user_roles_select_admin" ON public.user_roles FOR SELECT TO authenticated USING (public.is_platform_admin(auth.uid()));

-- new user -> profile + member role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), NEW.email)
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'member')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ ORGANIZATIONS ============
CREATE TABLE public.organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  type public.org_type NOT NULL,
  description text,
  website text,
  location text,
  logo_url text,
  partnership_stage public.partnership_stage,
  is_public boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.organizations TO anon, authenticated;
GRANT ALL ON public.organizations TO service_role;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER organizations_updated_at BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "orgs_select_public" ON public.organizations FOR SELECT TO anon, authenticated USING (is_public = true);
CREATE POLICY "orgs_admin_all" ON public.organizations FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','crm_admin','partnership_admin']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','crm_admin','partnership_admin']::public.app_role[]));
GRANT INSERT, UPDATE, DELETE ON public.organizations TO authenticated;

-- ============ CHAPTERS ============
CREATE TABLE public.chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  type public.chapter_type NOT NULL,
  institution text,
  region text,
  city text,
  status public.chapter_status NOT NULL DEFAULT 'application',
  lead_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  organization_id uuid REFERENCES public.organizations(id) ON DELETE SET NULL,
  summary text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.chapters TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chapters TO authenticated;
GRANT ALL ON public.chapters TO service_role;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER chapters_updated_at BEFORE UPDATE ON public.chapters FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "chapters_select_public" ON public.chapters FOR SELECT TO anon, authenticated USING (status IN ('active','forming'));
CREATE POLICY "chapters_select_lead" ON public.chapters FOR SELECT TO authenticated USING (lead_user_id = auth.uid());
CREATE POLICY "chapters_admin_all" ON public.chapters FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','chapter_admin','community_admin']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','chapter_admin','community_admin']::public.app_role[]));

CREATE TABLE public.chapter_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  chapter_role text NOT NULL DEFAULT 'member',
  joined_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (chapter_id, user_id)
);
GRANT SELECT, INSERT, DELETE ON public.chapter_members TO authenticated;
GRANT ALL ON public.chapter_members TO service_role;
ALTER TABLE public.chapter_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "chapter_members_select_own" ON public.chapter_members FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "chapter_members_insert_own" ON public.chapter_members FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "chapter_members_delete_own" ON public.chapter_members FOR DELETE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "chapter_members_admin" ON public.chapter_members FOR SELECT TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','chapter_admin','community_admin']::public.app_role[]));

-- ============ EVENTS ============
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  summary text,
  description text,
  category text,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz,
  timezone text NOT NULL DEFAULT 'Asia/Kolkata',
  mode public.event_mode NOT NULL DEFAULT 'online',
  venue text,
  meeting_url text,
  cover_image_url text,
  capacity integer,
  registration_status public.registration_status NOT NULL DEFAULT 'not_open',
  registration_url text,
  status public.event_status NOT NULL DEFAULT 'proposal',
  chapter_id uuid REFERENCES public.chapters(id) ON DELETE SET NULL,
  organizer_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  agenda jsonb NOT NULL DEFAULT '[]'::jsonb,
  report jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.events TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.events TO authenticated;
GRANT ALL ON public.events TO service_role;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "events_select_public" ON public.events FOR SELECT TO anon, authenticated USING (status IN ('published','live','completed'));
CREATE POLICY "events_select_organizer" ON public.events FOR SELECT TO authenticated USING (organizer_user_id = auth.uid());
CREATE POLICY "events_insert_organizer" ON public.events FOR INSERT TO authenticated WITH CHECK (organizer_user_id = auth.uid() AND status = 'proposal');
CREATE POLICY "events_update_organizer" ON public.events FOR UPDATE TO authenticated USING (organizer_user_id = auth.uid()) WITH CHECK (organizer_user_id = auth.uid());
CREATE POLICY "events_admin_all" ON public.events FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','events_admin','content_admin']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','events_admin','content_admin']::public.app_role[]));

CREATE TABLE public.event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  registered_at timestamptz NOT NULL DEFAULT now(),
  attended boolean NOT NULL DEFAULT false,
  attended_at timestamptz,
  feedback jsonb,
  UNIQUE (event_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.event_registrations TO authenticated;
GRANT ALL ON public.event_registrations TO service_role;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "regs_select_own" ON public.event_registrations FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "regs_insert_own" ON public.event_registrations FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "regs_delete_own" ON public.event_registrations FOR DELETE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "regs_admin_all" ON public.event_registrations FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','events_admin','crm_admin']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','events_admin','crm_admin']::public.app_role[]));

-- ============ CERTIFICATES ============
CREATE TABLE public.certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_number text NOT NULL UNIQUE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  recipient_name text NOT NULL,
  event_id uuid REFERENCES public.events(id) ON DELETE SET NULL,
  event_title text NOT NULL,
  type public.certificate_type NOT NULL DEFAULT 'participant',
  issued_on date NOT NULL DEFAULT CURRENT_DATE,
  revoked_at timestamptz,
  revoked_reason text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.certificates TO anon;
GRANT SELECT, INSERT, UPDATE ON public.certificates TO authenticated;
GRANT ALL ON public.certificates TO service_role;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "certs_verify_public" ON public.certificates FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "certs_admin_all" ON public.certificates FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','certificate_admin','events_admin']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','certificate_admin','events_admin']::public.app_role[]));

-- ============ PARTNERSHIP LEADS ============
CREATE TABLE public.partnership_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  organization_name text,
  partnership_type text,
  message text,
  stage public.partnership_stage NOT NULL DEFAULT 'lead',
  organization_id uuid REFERENCES public.organizations(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.partnership_leads TO anon, authenticated;
GRANT SELECT, UPDATE ON public.partnership_leads TO authenticated;
GRANT ALL ON public.partnership_leads TO service_role;
ALTER TABLE public.partnership_leads ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER partnership_leads_updated_at BEFORE UPDATE ON public.partnership_leads FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "leads_insert_anyone" ON public.partnership_leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "leads_admin_read" ON public.partnership_leads FOR SELECT TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','partnership_admin','crm_admin']::public.app_role[]));
CREATE POLICY "leads_admin_update" ON public.partnership_leads FOR UPDATE TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','partnership_admin','crm_admin']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','partnership_admin','crm_admin']::public.app_role[]));

-- ============ AUDIT LOG ============
CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.audit_logs TO authenticated;
GRANT ALL ON public.audit_logs TO service_role;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "audit_admin_read" ON public.audit_logs FOR SELECT TO authenticated USING (public.is_platform_admin(auth.uid()));

CREATE INDEX idx_events_status_starts_at ON public.events(status, starts_at);
CREATE INDEX idx_regs_user ON public.event_registrations(user_id);
CREATE INDEX idx_certs_user ON public.certificates(user_id);