-- ============ ENUMS ============
CREATE TYPE public.post_status AS ENUM ('draft','published','archived');
CREATE TYPE public.profile_visibility AS ENUM ('public','community_only','private');
CREATE TYPE public.registration_state AS ENUM ('registered','confirmed','attended','absent','cancelled');
ALTER TYPE public.partnership_stage ADD VALUE IF NOT EXISTS 'lost';

-- ============ EVENTS: extend ============
ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS time_label text,
  ADD COLUMN IF NOT EXISTS organizer text,
  ADD COLUMN IF NOT EXISTS audience text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS topics text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS who_should_attend text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS learning_outcomes text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS speakers jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS partners jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS faqs jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS certificate_note text,
  ADD COLUMN IF NOT EXISTS seo_title text,
  ADD COLUMN IF NOT EXISTS seo_description text,
  ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE UNIQUE INDEX IF NOT EXISTS events_slug_key ON public.events (slug);
CREATE INDEX IF NOT EXISTS events_status_starts_at_idx ON public.events (status, starts_at DESC);

-- ============ BLOG POSTS ============
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL DEFAULT '',
  cover_image_url text,
  category text,
  tags text[] NOT NULL DEFAULT '{}',
  author_name text NOT NULL DEFAULT 'OrigoHOST Editorial',
  author_role text,
  author_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reading_time text,
  status public.post_status NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  seo_title text,
  seo_description text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY blog_select_public ON public.blog_posts
  FOR SELECT TO anon, authenticated
  USING (status = 'published' AND (published_at IS NULL OR published_at <= now()));

CREATE POLICY blog_admin_all ON public.blog_posts
  FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin','editor']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin','editor']::public.app_role[]));

CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS blog_posts_status_published_idx ON public.blog_posts (status, published_at DESC);
CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON public.blog_posts (category);

-- ============ PROFILES: visibility ============
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS visibility public.profile_visibility NOT NULL DEFAULT 'private';

UPDATE public.profiles SET visibility = 'public' WHERE is_public = true;

CREATE OR REPLACE FUNCTION public.sync_profile_visibility()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.is_public := (NEW.visibility = 'public');
  RETURN NEW;
END; $$;

CREATE TRIGGER profiles_sync_visibility BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.sync_profile_visibility();

CREATE INDEX IF NOT EXISTS profiles_visibility_idx ON public.profiles (visibility);
CREATE INDEX IF NOT EXISTS profiles_skills_idx ON public.profiles USING gin (skills);

DROP POLICY IF EXISTS profiles_select_public ON public.profiles;
CREATE POLICY profiles_select_public ON public.profiles
  FOR SELECT TO anon, authenticated USING (visibility = 'public');
CREATE POLICY profiles_select_community ON public.profiles
  FOR SELECT TO authenticated USING (visibility = 'community_only');

-- ============ REGISTRATIONS: status + attendance ============
ALTER TABLE public.event_registrations
  ADD COLUMN IF NOT EXISTS status public.registration_state NOT NULL DEFAULT 'registered',
  ADD COLUMN IF NOT EXISTS attendance_marked_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS notes text;

UPDATE public.event_registrations SET status = 'attended' WHERE attended = true;

CREATE UNIQUE INDEX IF NOT EXISTS event_registrations_event_user_key
  ON public.event_registrations (event_id, user_id);
CREATE INDEX IF NOT EXISTS event_registrations_event_idx ON public.event_registrations (event_id);

-- ============ CHAPTERS ============
ALTER TABLE public.chapters
  ADD COLUMN IF NOT EXISTS contact_email text,
  ADD COLUMN IF NOT EXISTS logo_url text,
  ADD COLUMN IF NOT EXISTS links jsonb NOT NULL DEFAULT '[]'::jsonb;
CREATE UNIQUE INDEX IF NOT EXISTS chapters_slug_key ON public.chapters (slug);

-- ============ PARTNERSHIP LEADS: CRM fields ============
ALTER TABLE public.partnership_leads
  ADD COLUMN IF NOT EXISTS owner_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS notes jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS follow_up_at timestamptz;
CREATE INDEX IF NOT EXISTS partnership_leads_stage_idx ON public.partnership_leads (stage);

-- ============ CERTIFICATES ============
ALTER TABLE public.certificates
  ADD COLUMN IF NOT EXISTS issued_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS registration_id uuid REFERENCES public.event_registrations(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS metadata jsonb NOT NULL DEFAULT '{}'::jsonb;
CREATE UNIQUE INDEX IF NOT EXISTS certificates_number_key ON public.certificates (certificate_number);

-- ============ USER ROLES: admin management ============
CREATE POLICY user_roles_admin_insert ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (public.is_platform_admin(auth.uid()));
CREATE POLICY user_roles_admin_delete ON public.user_roles
  FOR DELETE TO authenticated
  USING (public.is_platform_admin(auth.uid()));

-- ============ AUDIT LOGGING ============
CREATE OR REPLACE FUNCTION public.log_audit(
  _action text, _entity_type text, _entity_id text DEFAULT NULL, _metadata jsonb DEFAULT '{}'::jsonb
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.uid() IS NULL THEN RETURN; END IF;
  INSERT INTO public.audit_logs (actor_user_id, action, entity_type, entity_id, metadata)
  VALUES (auth.uid(), _action, _entity_type, _entity_id, COALESCE(_metadata, '{}'::jsonb));
END; $$;

GRANT EXECUTE ON FUNCTION public.log_audit(text, text, text, jsonb) TO authenticated;
CREATE INDEX IF NOT EXISTS audit_logs_created_idx ON public.audit_logs (created_at DESC);

-- ============ SEED: migrate static events + blog into the database ============
INSERT INTO public.events (title, slug, summary, description, category, starts_at, ends_at, time_label, mode, venue, registration_url, registration_status, status, organizer, audience, topics, who_should_attend, learning_outcomes, tags, speakers, partners, faqs, agenda, report, certificate_note, seo_title, seo_description) VALUES
('Knowledge Sharing Series: Designing Systems That Scale', 'knowledge-sharing-systems-that-scale', 'A practitioner walkthrough of how production systems are structured, from request path to failure handling.', 'The Knowledge Sharing Series brings practitioners in front of the community to explain how real systems are actually built and operated. This session covers service boundaries, data flow, caching, observability and the failure modes teams meet in production.', 'Software Engineering', '2026-09-12T19:00:00+05:30'::timestamptz, '2026-09-12T20:30:00+05:30'::timestamptz, '19:00 – 20:30 IST', 'online'::event_mode, 'Online — link shared after registration', NULL, 'open'::registration_status, 'published'::event_status, 'OrigoHOST Programs', ARRAY['Students','Developers','Professionals']::text[], ARRAY['System design','Reliability','Observability','Trade-offs']::text[], ARRAY['Students preparing for engineering roles','Developers moving into system design work','Professionals reviewing architecture decisions']::text[], ARRAY['How to reason about service boundaries','Where caching helps and where it hides bugs','A practical checklist for reliability reviews']::text[], ARRAY['knowledge-sharing','system-design']::text[], '[{"name":"Speaker to be announced","role":"Practitioner, systems engineering","bio":"Speaker profile is published once confirmed by the programs team."}]'::jsonb, '[]'::jsonb, '[{"question":"Is it free?","answer":"Yes. Community knowledge-sharing sessions are free to attend."},{"question":"Will it be recorded?","answer":"Yes, the recording is published in Resources after the session."}]'::jsonb, '[{"time":"19:00","title":"Welcome & community briefing"},{"time":"19:10","title":"Session: designing for scale","detail":"Service boundaries, data flow, caching."},{"time":"20:00","title":"Failure modes and observability"},{"time":"20:15","title":"Open Q&A"}]'::jsonb, NULL, 'Participation certificate issued to attendees who complete the session.', 'Knowledge Sharing Series: Designing Systems That Scale — OrigoHOST', 'A practitioner walkthrough of how production systems are structured, from request path to failure handling.'),
('CyberForge Workshop: Practical Application Security', 'cyberforge-practical-application-security', 'A hands-on lab covering how web applications break and how to defend them.', 'CyberForge is the OrigoHOST cybersecurity program. This workshop is a guided lab: participants work through authentication flaws, injection, access-control mistakes and secure-by-default patterns on a prepared target application.', 'Cybersecurity', '2026-09-27T10:00:00+05:30'::timestamptz, '2026-09-27T16:00:00+05:30'::timestamptz, '10:00 – 16:00 IST', 'hybrid'::event_mode, 'Host campus (to be confirmed) + online stream', NULL, 'waitlist'::registration_status, 'published'::event_status, 'OrigoHOST CyberForge', ARRAY['Students','Developers','Professionals']::text[], ARRAY['Threat modelling','AuthN/AuthZ','Injection','Secure defaults']::text[], ARRAY['Developers shipping web applications','Students entering security','QA and platform engineers']::text[], ARRAY['Run a lightweight threat model','Identify the most common access-control mistakes','Apply a secure-review checklist to your own project']::text[], ARRAY['cyberforge','workshop','security']::text[], '[{"name":"Speaker to be announced","role":"Application security practitioner","bio":"Speaker profile is published once confirmed by the programs team."}]'::jsonb, '[]'::jsonb, '[{"question":"Do I need prior security experience?","answer":"No, but basic web development experience helps."},{"question":"What should I bring?","answer":"A laptop with a modern browser and a code editor."}]'::jsonb, '[{"time":"10:00","title":"Threat modelling a real application"},{"time":"11:30","title":"Lab 1 — authentication and session flaws"},{"time":"13:30","title":"Lab 2 — access control and injection"},{"time":"15:15","title":"Secure defaults and review checklist"}]'::jsonb, NULL, 'Workshop certificate issued on lab completion.', 'CyberForge Workshop: Practical Application Security — OrigoHOST', 'A hands-on lab covering how web applications break and how to defend them.'),
('OrigoHOST Build Weekend: AI for Real Problems', 'build-weekend-ai-for-real-problems', 'A 48-hour build challenge focused on useful, evaluated AI applications.', 'Teams pick a real problem, ship a working prototype in 48 hours and defend it in review. Mentors support scoping, evaluation and delivery. Judging weighs usefulness and evaluation quality over demo polish.', 'AI', '2026-10-17T09:00:00+05:30'::timestamptz, NULL, 'Starts 09:00 IST', 'offline'::event_mode, 'Venue to be confirmed', NULL, 'not_open'::registration_status, 'published'::event_status, 'OrigoHOST Hackathons', ARRAY['Students','Developers','Founders']::text[], ARRAY['Applied AI','Evaluation','Product scoping','Team delivery']::text[], ARRAY['Builders comfortable shipping code','Teams with a problem worth solving','Early founders']::text[], ARRAY['Scope an AI project that can ship in 48 hours','Evaluate output quality instead of guessing','Present technical work to a review panel']::text[], ARRAY['hackathon','ai']::text[], '[]'::jsonb, '[]'::jsonb, '[{"question":"Can I join without a team?","answer":"Yes. Team formation happens during kickoff."},{"question":"Is there a registration fee?","answer":"Fee details are published when registration opens."}]'::jsonb, '[{"time":"Day 1 · 09:00","title":"Kickoff, team formation, problem selection"},{"time":"Day 1 · 14:00","title":"Mentor scoping reviews"},{"time":"Day 2 · 10:00","title":"Build and evaluation checkpoints"},{"time":"Day 2 · 16:00","title":"Final review and outcomes"}]'::jsonb, NULL, NULL, 'OrigoHOST Build Weekend: AI for Real Problems — OrigoHOST', 'A 48-hour build challenge focused on useful, evaluated AI applications.'),
('Community Meetup: Cloud & DevOps Practice', 'community-meetup-cloud-devops-practice', 'An open meetup on delivery pipelines, infrastructure practice and operational habits.', 'A member-led meetup where two short talks are followed by open discussion on delivery pipelines, environment management and the operational habits that keep teams shipping safely.', 'DevOps', '2026-08-22T18:30:00+05:30'::timestamptz, '2026-08-22T20:00:00+05:30'::timestamptz, '18:30 – 20:00 IST', 'online'::event_mode, 'Online', NULL, 'closed'::registration_status, 'live'::event_status, 'OrigoHOST Community', ARRAY['Developers','Professionals']::text[], ARRAY['CI/CD','Environments','Operations']::text[], ARRAY['Developers','Platform and infrastructure engineers']::text[], ARRAY['Compare delivery practices across teams','Meet members working in the same domain']::text[], ARRAY['meetup','devops']::text[], '[]'::jsonb, '[]'::jsonb, '[{"question":"Can I speak at a meetup?","answer":"Yes — submit a proposal through the contact form."}]'::jsonb, '[{"time":"18:30","title":"Two member talks"},{"time":"19:15","title":"Open discussion"}]'::jsonb, NULL, NULL, 'Community Meetup: Cloud & DevOps Practice — OrigoHOST', 'An open meetup on delivery pipelines, infrastructure practice and operational habits.'),
('Knowledge Sharing Series: Open Source Contribution Paths', 'knowledge-sharing-open-source-contribution-paths', 'How to find, scope and land a first meaningful open source contribution.', 'A working session on choosing a project, reading a codebase, scoping a first issue and communicating with maintainers. Participants leave with a shortlist of issues to work on.', 'Open Source', '2026-07-18T19:00:00+05:30'::timestamptz, '2026-07-18T20:15:00+05:30'::timestamptz, '19:00 – 20:15 IST', 'online'::event_mode, 'Online', NULL, 'closed'::registration_status, 'completed'::event_status, 'OrigoHOST Open Source', ARRAY['Students','Developers']::text[], ARRAY['Open source','Codebase reading','Contribution etiquette']::text[], ARRAY['First-time contributors','Students building a public portfolio']::text[], ARRAY['A shortlist of issues to contribute to','A repeatable contribution workflow']::text[], ARRAY['open-source','knowledge-sharing']::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[{"time":"19:00","title":"Choosing a project that fits your goals"},{"time":"19:30","title":"Reading an unfamiliar codebase"},{"time":"20:00","title":"Working with maintainers"}]'::jsonb, '{"overview":"The session covered how to select projects, read unfamiliar code and scope a first issue. Participants left with a shortlist of issues and a contribution workflow.","participants":null,"keyDiscussions":["Choosing projects by domain interest rather than popularity","Reading tests before reading implementation","Writing issue comments that maintainers can act on"],"outcomes":["A shared contribution checklist published in Resources","A community shortlist of beginner-friendly repositories"],"gallery":[{"caption":"Session recording stills — gallery pending upload."}],"recordings":[{"label":"Session recording — publishing pending"}],"presentations":[{"label":"Contribution paths deck — publishing pending"}],"certificates":"Participation certificates were issued to attendees who completed the session."}'::jsonb, NULL, 'Knowledge Sharing Series: Open Source Contribution Paths — OrigoHOST', 'How to find, scope and land a first meaningful open source contribution.'),
('Career Session: Engineering Portfolios That Get Read', 'career-session-engineering-portfolios', 'What reviewers actually look for in a student or early-career engineering portfolio.', 'A career-track session on structuring projects, writing readable documentation and presenting work so that reviewers can evaluate it in minutes.', 'Career', '2026-06-14T18:00:00+05:30'::timestamptz, '2026-06-14T19:15:00+05:30'::timestamptz, '18:00 – 19:15 IST', 'online'::event_mode, 'Online', NULL, 'closed'::registration_status, 'completed'::event_status, 'OrigoHOST Career Development', ARRAY['Students','Developers']::text[], ARRAY['Portfolios','Technical writing','Interviews']::text[], ARRAY['Students','Early-career developers']::text[], ARRAY['A portfolio structure you can apply the same week']::text[], ARRAY['career']::text[], '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '[{"time":"18:00","title":"How reviewers scan a portfolio"},{"time":"18:30","title":"Documenting a project well"},{"time":"19:00","title":"Q&A"}]'::jsonb, '{"overview":"Attendees reviewed portfolio structure, project documentation and how technical work is evaluated during hiring.","participants":null,"keyDiscussions":["Depth over volume in project selection","README quality as a hiring signal"],"outcomes":["A portfolio review checklist published in Resources"],"gallery":[{"caption":"Gallery pending upload."}],"recordings":[{"label":"Session recording — publishing pending"}],"presentations":[]}'::jsonb, NULL, 'Career Session: Engineering Portfolios That Get Read — OrigoHOST', 'What reviewers actually look for in a student or early-career engineering portfolio.')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.blog_posts (title, slug, excerpt, content, category, tags, author_name, author_role, reading_time, status, published_at, seo_title, seo_description) VALUES
('Why OrigoHOST starts with people, not platforms', 'why-origohost-starts-with-people', 'Technology communities fail when they optimise for attendance instead of capability. Here is the standard we are holding ourselves to.', 'Most technology communities are measured by the size of a registration list. That number says nothing about whether anyone learned something they could use the following week.

OrigoHOST is built around a different measurement: what members can do after a program that they could not do before. That standard changes how sessions are designed. It pushes us towards labs instead of lectures, checklists instead of slogans, and public write-ups instead of private notes.

It also changes what we publish. Every event ends with a report — what was covered, what came out of it, what is available afterwards. If a program did not produce an outcome worth documenting, that is a signal to redesign it rather than repeat it.

The community is the product. Programs, events, chapters and resources exist to serve the people inside it, and that ordering will not change as OrigoHOST grows.', 'Editorial', ARRAY['community','editorial']::text[], 'OrigoHOST Editorial', 'Community', '6 min', 'published'::post_status, '2026-08-02T09:00:00+05:30'::timestamptz, 'Why OrigoHOST starts with people, not platforms — OrigoHOST Blog', 'Technology communities fail when they optimise for attendance instead of capability. Here is the standard we are holding ourselves to.'),
('Learning in public: the case for community write-ups', 'learning-in-public-community-write-ups', 'A short technical write-up compounds far more than a certificate. What we ask members to publish, and why.', 'Writing forces precision. When a member explains a build decision in public, the gaps in their reasoning become visible — to them first.

We ask for short pieces: what problem you had, what you tried, what actually worked, what you would do differently. Three hundred words of that is more useful than a long tutorial rewritten from documentation.

The second effect is compounding. A member who publishes ten small write-ups over a year has a body of evidence that no certificate can substitute for, and reviewers can evaluate it in minutes.', 'Community', ARRAY['writing','learning']::text[], 'OrigoHOST Editorial', 'Programs', '5 min', 'published'::post_status, '2026-08-18T09:00:00+05:30'::timestamptz, 'Learning in public: the case for community write-ups — OrigoHOST Blog', 'A short technical write-up compounds far more than a certificate. What we ask members to publish, and why.'),
('Reading a codebase you did not write', 'reading-a-codebase-you-did-not-write', 'A practical order of operations for getting oriented in unfamiliar code without drowning in it.', 'Start at the edges. Entry points, routes and configuration tell you what the system is expected to do before you look at how it does it.

Read the tests next. Tests encode the behaviour maintainers care about, and they are usually shorter and more honest than documentation.

Only then follow one request or one command all the way through. Depth on a single path beats a shallow survey of the whole repository.

Finally, write down what you learned in the issue you plan to work on. Maintainers respond much faster to a comment that demonstrates understanding.', 'Technology', ARRAY['open-source','engineering']::text[], 'OrigoHOST Open Source', 'Open Source', '7 min', 'published'::post_status, '2026-07-25T09:00:00+05:30'::timestamptz, 'Reading a codebase you did not write — OrigoHOST Blog', 'A practical order of operations for getting oriented in unfamiliar code without drowning in it.'),
('What we look for in a hackathon project', 'what-we-look-for-in-a-hackathon-project', 'Judging criteria for OrigoHOST build weekends — usefulness and evaluation over demo polish.', 'A convincing demo can hide an unusable product. Our review panels ask three questions instead: who has this problem, does the prototype actually solve part of it, and how do you know?

The third question is where most projects fall down. Teams that build a small evaluation — even a spreadsheet of thirty test cases — consistently defend their work better than teams that rehearsed a script.

Scope is the other differentiator. A narrow, working slice earns more credit than a broad prototype that only functions on the happy path.', 'Events', ARRAY['hackathon','events']::text[], 'OrigoHOST Hackathons', 'Programs', '4 min', 'published'::post_status, '2026-08-28T09:00:00+05:30'::timestamptz, 'What we look for in a hackathon project — OrigoHOST Blog', 'Judging criteria for OrigoHOST build weekends — usefulness and evaluation over demo polish.'),
('Building a campus chapter that outlives its founders', 'campus-chapter-that-outlives-its-founders', 'Chapters collapse when knowledge lives in one person''s head. Documentation is the fix.', 'Student communities have a structural problem: leadership turns over every year or two. Chapters that survive it are the ones that write things down.

The OrigoHOST chapter toolkit exists for exactly that reason — event runbooks, promotion templates, report formats and handover checklists that a new team can pick up.

Leadership then becomes about judgment rather than recall, and each cohort starts from where the last one finished.', 'Builder Stories', ARRAY['chapters','leadership']::text[], 'OrigoHOST Community', 'Community', '6 min', 'published'::post_status, '2026-09-01T09:00:00+05:30'::timestamptz, 'Building a campus chapter that outlives its founders — OrigoHOST Blog', 'Chapters collapse when knowledge lives in one person''s head. Documentation is the fix.'),
('Research is a community activity', 'research-is-a-community-activity', 'Reading groups, peer review and writing cohorts make technical research accessible outside labs.', 'Reading a difficult paper alone is slow. Reading it with six people who each caught a different detail is considerably faster and far more accurate.

Our research track is deliberately low-ceremony: a paper, a shared set of notes, and a short write-up of what the group concluded.

Over time those notes become a genuine resource for members entering the domain, which is the whole point.', 'Research', ARRAY['research','community']::text[], 'OrigoHOST Research', 'Research', '5 min', 'published'::post_status, '2026-09-05T09:00:00+05:30'::timestamptz, 'Research is a community activity — OrigoHOST Blog', 'Reading groups, peer review and writing cohorts make technical research accessible outside labs.')
ON CONFLICT (slug) DO NOTHING;