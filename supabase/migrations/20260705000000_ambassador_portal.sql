-- Enums
CREATE TYPE ambassador_application_status AS ENUM (
  'draft', 'submitted', 'screening', 'shortlisted', 'interview_scheduled',
  'interview_completed', 'background_verification', 'selected', 'offer_sent',
  'offer_accepted', 'offer_declined', 'rejected', 'waiting_list',
  'onboarding', 'active', 'inactive', 'alumni'
);

-- Core Applications Table
CREATE TABLE public.ambassador_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status ambassador_application_status NOT NULL DEFAULT 'draft',
  unique_application_id text UNIQUE,
  
  -- Step 1: Personal Info
  full_name text,
  email text,
  phone text,
  dob date,
  gender text,
  nationality text,
  address text,
  state text,
  district text,
  city text,
  pincode text,
  
  -- Step 2: Education (JSONB for flexibility)
  education jsonb DEFAULT '{}'::jsonb,
  
  -- Step 3: Technical Skills
  skills text[] DEFAULT '{}'::text[],
  
  -- Step 4: Community Experience
  experience jsonb DEFAULT '{}'::jsonb,
  
  -- Step 5: Questions
  questions jsonb DEFAULT '{}'::jsonb,
  
  -- Flags & Timestamps
  submitted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexing for fast dashboard lookups
CREATE INDEX idx_ambassador_applications_user_id ON public.ambassador_applications(user_id);
CREATE INDEX idx_ambassador_applications_status ON public.ambassador_applications(status);

-- Social Profiles (Step 1 continued)
CREATE TABLE public.ambassador_social_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.ambassador_applications(id) ON DELETE CASCADE,
  platform text NOT NULL, -- linkedin, github, portfolio, twitter, instagram, discord, telegram
  url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (application_id, platform)
);

-- Documents (Step 6)
CREATE TABLE public.ambassador_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.ambassador_applications(id) ON DELETE CASCADE,
  document_type text NOT NULL, -- resume, student_id, college_id, gov_id, portfolio, certificates, photo
  file_path text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Interviews
CREATE TABLE public.ambassador_interviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.ambassador_applications(id) ON DELETE CASCADE,
  scheduled_at timestamptz,
  meet_link text,
  interviewer_id uuid REFERENCES auth.users(id),
  score_communication int,
  score_leadership int,
  score_technical int,
  score_culture int,
  notes text,
  recommendation text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Notes & Activity Logs (Admin tracking)
CREATE TABLE public.ambassador_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.ambassador_applications(id) ON DELETE CASCADE,
  admin_id uuid NOT NULL REFERENCES auth.users(id),
  note text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.ambassador_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.ambassador_applications(id) ON DELETE CASCADE,
  action text NOT NULL, -- e.g., 'status_changed', 'email_sent'
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Dimensional tracking for Analytics
CREATE TABLE public.ambassador_colleges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  city text,
  state text,
  country text
);

CREATE TABLE public.ambassador_schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  city text,
  state text,
  country text
);

-- Ambassador Post-Selection Activity & Management
CREATE TABLE public.ambassador_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  xp_points int NOT NULL DEFAULT 0,
  level int NOT NULL DEFAULT 1,
  total_events int NOT NULL DEFAULT 0,
  total_reach int NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.ambassador_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  xp_reward int NOT NULL DEFAULT 0,
  deadline timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.ambassador_attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id text NOT NULL,
  attended boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.ambassador_referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_email text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  reward_given boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.ambassador_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon_url text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.ambassador_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id uuid REFERENCES public.ambassador_badges(id),
  reward_type text NOT NULL, -- 'badge', 'goodie', 'certificate'
  issued_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.ambassador_certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  certificate_type text NOT NULL, -- 'selection', 'completion', 'event'
  file_url text NOT NULL,
  issued_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.ambassador_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  event_date date NOT NULL,
  attendee_count int NOT NULL DEFAULT 0,
  report_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_ambassador_updated_at()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ambassador_applications_updated_at
BEFORE UPDATE ON public.ambassador_applications
FOR EACH ROW EXECUTE PROCEDURE update_ambassador_updated_at();

CREATE TRIGGER update_ambassador_interviews_updated_at
BEFORE UPDATE ON public.ambassador_interviews
FOR EACH ROW EXECUTE PROCEDURE update_ambassador_updated_at();

CREATE TRIGGER update_ambassador_performance_updated_at
BEFORE UPDATE ON public.ambassador_performance
FOR EACH ROW EXECUTE PROCEDURE update_ambassador_updated_at();

-- Enable RLS
ALTER TABLE public.ambassador_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambassador_social_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambassador_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambassador_interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambassador_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambassador_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambassador_colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambassador_schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambassador_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambassador_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambassador_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambassador_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambassador_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambassador_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambassador_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambassador_events ENABLE ROW LEVEL SECURITY;

-- Admins get full access to everything
CREATE POLICY "Admins full access" ON public.ambassador_applications FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access" ON public.ambassador_social_profiles FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access" ON public.ambassador_documents FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access" ON public.ambassador_interviews FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access" ON public.ambassador_notes FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access" ON public.ambassador_activity FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access" ON public.ambassador_colleges FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access" ON public.ambassador_schools FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access" ON public.ambassador_performance FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access" ON public.ambassador_tasks FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access" ON public.ambassador_attendance FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access" ON public.ambassador_referrals FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access" ON public.ambassador_badges FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access" ON public.ambassador_rewards FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access" ON public.ambassador_certificates FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access" ON public.ambassador_events FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Users can read/write their own data
CREATE POLICY "Users read own application" ON public.ambassador_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own application" ON public.ambassador_applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own application" ON public.ambassador_applications FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users read own performance" ON public.ambassador_performance FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own certificates" ON public.ambassador_certificates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own rewards" ON public.ambassador_rewards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own events" ON public.ambassador_events FOR SELECT USING (auth.uid() = user_id);

-- Read access for public dictionary tables
CREATE POLICY "Anyone can read colleges" ON public.ambassador_colleges FOR SELECT USING (true);
CREATE POLICY "Anyone can read schools" ON public.ambassador_schools FOR SELECT USING (true);
CREATE POLICY "Anyone can read badges" ON public.ambassador_badges FOR SELECT USING (true);
