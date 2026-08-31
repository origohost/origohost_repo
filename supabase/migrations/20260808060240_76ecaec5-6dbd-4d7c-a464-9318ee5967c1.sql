-- ============================================================
-- OrigoHOST platform foundation: CRM, CMS, governance,
-- certificates, contributions, analytics, automation
-- ============================================================

-- ---------- enums ----------
DO $$ BEGIN
  CREATE TYPE public.interaction_kind AS ENUM ('note','call','email','meeting','status_change','task','system');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.crm_entity_type AS ENUM ('profile','organization','partnership_lead','contact_enquiry','event_hosting_request','membership_application','chapter','event');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.contribution_kind AS ENUM ('speaking','mentoring','volunteering','writing','organizing','reviewing','open_source','other');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.automation_run_status AS ENUM ('pending','running','succeeded','failed','skipped');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================
-- 1. CRM interactions (activity timeline)
-- ============================================================
CREATE TABLE public.interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type public.crm_entity_type NOT NULL,
  entity_id uuid NOT NULL,
  kind public.interaction_kind NOT NULL DEFAULT 'note',
  subject text,
  body text,
  outcome text,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  follow_up_at timestamptz,
  actor_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX interactions_entity_idx ON public.interactions (entity_type, entity_id, occurred_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.interactions TO authenticated;
GRANT ALL ON public.interactions TO service_role;
ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "CRM admins read interactions" ON public.interactions
  FOR SELECT TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','crm_admin','community_admin','partnership_admin','events_admin']::public.app_role[]));
CREATE POLICY "CRM admins write interactions" ON public.interactions
  FOR INSERT TO authenticated
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','crm_admin','community_admin','partnership_admin','events_admin']::public.app_role[]));
CREATE POLICY "CRM admins update interactions" ON public.interactions
  FOR UPDATE TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','crm_admin','community_admin','partnership_admin','events_admin']::public.app_role[]));
CREATE POLICY "Platform admins delete interactions" ON public.interactions
  FOR DELETE TO authenticated
  USING (public.is_platform_admin(auth.uid()));

-- ============================================================
-- 2. Certificate templates
-- ============================================================
CREATE TABLE public.certificate_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  type public.certificate_type NOT NULL DEFAULT 'participant',
  title_text text NOT NULL DEFAULT 'Certificate of Participation',
  body_text text NOT NULL DEFAULT 'This certifies that {{recipient_name}} participated in {{event_title}}.',
  signatory_name text,
  signatory_role text,
  background_url text,
  accent_color text,
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.certificate_templates TO authenticated;
GRANT ALL ON public.certificate_templates TO service_role;
ALTER TABLE public.certificate_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Certificate admins read templates" ON public.certificate_templates
  FOR SELECT TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','certificate_admin','events_admin']::public.app_role[]));
CREATE POLICY "Certificate admins manage templates" ON public.certificate_templates
  FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','certificate_admin']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','certificate_admin']::public.app_role[]));

-- link issued certificates to the template used
ALTER TABLE public.certificates
  ADD COLUMN IF NOT EXISTS template_id uuid REFERENCES public.certificate_templates(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS file_url text;

-- ============================================================
-- 3. Contributions (community recognition)
-- ============================================================
CREATE TABLE public.contributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind public.contribution_kind NOT NULL DEFAULT 'other',
  title text NOT NULL,
  description text,
  event_id uuid REFERENCES public.events(id) ON DELETE SET NULL,
  program_id uuid REFERENCES public.programs(id) ON DELETE SET NULL,
  chapter_id uuid REFERENCES public.chapters(id) ON DELETE SET NULL,
  occurred_on date,
  points integer NOT NULL DEFAULT 0,
  is_verified boolean NOT NULL DEFAULT false,
  verified_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX contributions_user_idx ON public.contributions (user_id, occurred_on DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.contributions TO authenticated;
GRANT ALL ON public.contributions TO service_role;
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members read own contributions" ON public.contributions
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Community admins read contributions" ON public.contributions
  FOR SELECT TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','community_admin','chapter_admin','events_admin']::public.app_role[]));
CREATE POLICY "Community admins manage contributions" ON public.contributions
  FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','community_admin']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','community_admin']::public.app_role[]));

-- ============================================================
-- 4. Role permissions (data-driven RBAC)
-- ============================================================
CREATE TABLE public.role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role public.app_role NOT NULL,
  permission text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (role, permission)
);

GRANT SELECT ON public.role_permissions TO authenticated;
GRANT ALL ON public.role_permissions TO service_role;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated read role permissions" ON public.role_permissions
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Super admins manage role permissions" ON public.role_permissions
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'))
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

CREATE OR REPLACE FUNCTION public.has_permission(_user_id uuid, _permission text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.role_permissions rp ON rp.role = ur.role
    WHERE ur.user_id = _user_id
      AND (rp.permission = _permission OR rp.permission = '*')
  );
$$;

INSERT INTO public.role_permissions (role, permission) VALUES
  ('super_admin','*'),
  ('platform_admin','*'),
  ('content_admin','cms.read'),('content_admin','cms.write'),('content_admin','cms.publish'),('content_admin','media.write'),
  ('crm_admin','crm.read'),('crm_admin','crm.write'),
  ('events_admin','events.read'),('events_admin','events.write'),('events_admin','events.publish'),('events_admin','events.attendance'),('events_admin','certificates.issue'),
  ('community_admin','community.read'),('community_admin','community.write'),('community_admin','members.review'),
  ('chapter_admin','chapters.read'),('chapter_admin','chapters.write'),
  ('partnership_admin','partnerships.read'),('partnership_admin','partnerships.write'),('partnership_admin','crm.read'),
  ('certificate_admin','certificates.read'),('certificate_admin','certificates.issue'),('certificate_admin','certificates.revoke'),
  ('editor','cms.read'),('editor','cms.write'),
  ('reviewer','cms.read'),('reviewer','events.read'),
  ('chapter_leader','chapters.read'),
  ('mentor','community.read'),
  ('ambassador','community.read'),
  ('member','portal.read')
ON CONFLICT (role, permission) DO NOTHING;

-- ============================================================
-- 5. CMS pages
-- ============================================================
CREATE TABLE public.cms_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  summary text,
  blocks jsonb NOT NULL DEFAULT '[]'::jsonb,
  status public.content_status NOT NULL DEFAULT 'draft',
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.cms_pages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cms_pages TO authenticated;
GRANT ALL ON public.cms_pages TO service_role;
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone reads published pages" ON public.cms_pages
  FOR SELECT USING (status = 'published');
CREATE POLICY "Content admins read all pages" ON public.cms_pages
  FOR SELECT TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin','editor','reviewer']::public.app_role[]));
CREATE POLICY "Content admins manage pages" ON public.cms_pages
  FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin','editor']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin','editor']::public.app_role[]));

-- ============================================================
-- 6. System settings
-- ============================================================
CREATE TABLE public.system_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  label text,
  description text,
  is_public boolean NOT NULL DEFAULT false,
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.system_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.system_settings TO authenticated;
GRANT ALL ON public.system_settings TO service_role;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone reads public settings" ON public.system_settings
  FOR SELECT USING (is_public = true);
CREATE POLICY "Platform admins read all settings" ON public.system_settings
  FOR SELECT TO authenticated USING (public.is_platform_admin(auth.uid()));
CREATE POLICY "Platform admins manage settings" ON public.system_settings
  FOR ALL TO authenticated
  USING (public.is_platform_admin(auth.uid()))
  WITH CHECK (public.is_platform_admin(auth.uid()));

-- ============================================================
-- 7. Analytics events (no PII beyond optional member reference)
-- ============================================================
CREATE TABLE public.analytics_events (
  id bigserial PRIMARY KEY,
  event_name text NOT NULL,
  path text,
  entity_type text,
  entity_id text,
  referrer_host text,
  device text,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX analytics_events_name_time_idx ON public.analytics_events (event_name, created_at DESC);
CREATE INDEX analytics_events_time_idx ON public.analytics_events (created_at DESC);

GRANT INSERT ON public.analytics_events TO anon;
GRANT INSERT, SELECT ON public.analytics_events TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.analytics_events_id_seq TO anon, authenticated;
GRANT ALL ON public.analytics_events TO service_role;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone records analytics" ON public.analytics_events
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read analytics" ON public.analytics_events
  FOR SELECT TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin','events_admin','community_admin','crm_admin','partnership_admin']::public.app_role[]));

-- ============================================================
-- 8. Automation workflows + runs
-- ============================================================
CREATE TABLE public.automation_workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  trigger_event text NOT NULL,
  actions jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.automation_workflows TO authenticated;
GRANT ALL ON public.automation_workflows TO service_role;
ALTER TABLE public.automation_workflows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Platform admins read workflows" ON public.automation_workflows
  FOR SELECT TO authenticated USING (public.is_platform_admin(auth.uid()));
CREATE POLICY "Platform admins manage workflows" ON public.automation_workflows
  FOR ALL TO authenticated
  USING (public.is_platform_admin(auth.uid()))
  WITH CHECK (public.is_platform_admin(auth.uid()));

CREATE TABLE public.automation_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_key text NOT NULL,
  trigger_event text NOT NULL,
  status public.automation_run_status NOT NULL DEFAULT 'pending',
  subject_type text,
  subject_id text,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  result jsonb,
  error text,
  attempts integer NOT NULL DEFAULT 0,
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX automation_runs_status_idx ON public.automation_runs (status, created_at DESC);

GRANT SELECT ON public.automation_runs TO authenticated;
GRANT ALL ON public.automation_runs TO service_role;
ALTER TABLE public.automation_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Platform admins read runs" ON public.automation_runs
  FOR SELECT TO authenticated USING (public.is_platform_admin(auth.uid()));

INSERT INTO public.automation_workflows (key, name, description, trigger_event, actions) VALUES
  ('event_registration_confirmation','Event registration confirmation','Notify the member when their event registration is recorded.','event.registered','[{"type":"notify_member","template":"event_registration_confirmed"}]'::jsonb),
  ('event_reminder','Upcoming event reminder','Remind registered members before an event starts.','event.upcoming','[{"type":"notify_member","template":"event_reminder"}]'::jsonb),
  ('attendance_certificate_eligibility','Attendance to certificate eligibility','Mark attendees as certificate-eligible once attendance is confirmed.','event.attendance_confirmed','[{"type":"mark_certificate_eligible"}]'::jsonb),
  ('certificate_issued_notice','Certificate issued notice','Notify the member when a certificate is issued.','certificate.issued','[{"type":"notify_member","template":"certificate_issued"}]'::jsonb),
  ('membership_approved_welcome','Membership approved welcome','Send the welcome sequence when a membership application is approved.','membership.approved','[{"type":"notify_member","template":"membership_welcome"}]'::jsonb),
  ('partnership_lead_task','Partnership lead follow-up task','Create a CRM follow-up interaction when a partnership lead arrives.','partnership.lead_created','[{"type":"create_interaction","kind":"task"}]'::jsonb),
  ('chapter_approved_onboarding','Chapter approved onboarding','Kick off chapter onboarding once a chapter is approved.','chapter.approved','[{"type":"notify_member","template":"chapter_onboarding"}]'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- 9. updated_at triggers
-- ============================================================
CREATE TRIGGER interactions_updated_at BEFORE UPDATE ON public.interactions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER certificate_templates_updated_at BEFORE UPDATE ON public.certificate_templates FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER contributions_updated_at BEFORE UPDATE ON public.contributions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER cms_pages_updated_at BEFORE UPDATE ON public.cms_pages FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER system_settings_updated_at BEFORE UPDATE ON public.system_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER automation_workflows_updated_at BEFORE UPDATE ON public.automation_workflows FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER automation_runs_updated_at BEFORE UPDATE ON public.automation_runs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();