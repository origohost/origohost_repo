-- Migration for Enterprise RBAC & Ambassador Management

-- 1. ADD NEW ROLES TO ENUM
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'user_role' AND e.enumlabel = 'member') THEN
    ALTER TYPE user_role ADD VALUE 'member';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'user_role' AND e.enumlabel = 'ambassador') THEN
    ALTER TYPE user_role ADD VALUE 'ambassador';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'user_role' AND e.enumlabel = 'mentor') THEN
    ALTER TYPE user_role ADD VALUE 'mentor';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'user_role' AND e.enumlabel = 'college_admin') THEN
    ALTER TYPE user_role ADD VALUE 'college_admin';
  END IF;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. SET DEFAULT ROLE TO 'member'
ALTER TABLE public.user_roles ALTER COLUMN role SET DEFAULT 'member'::user_role;

-- Update existing students/guests to member for consistency
UPDATE public.user_roles SET role = 'member' WHERE role IN ('student', 'guest');

-- 3. ENFORCE PERMANENT SUPER ADMIN
CREATE OR REPLACE FUNCTION public.enforce_super_admin()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT email FROM auth.users WHERE id = NEW.user_id) IN ('ritikgoswami34@gmail.com', 'origohostscommunity@gmail.com') THEN
    NEW.role = 'super_admin'::user_role;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS ensure_super_admin ON public.user_roles;
CREATE TRIGGER ensure_super_admin
BEFORE INSERT OR UPDATE ON public.user_roles
FOR EACH ROW
EXECUTE PROCEDURE public.enforce_super_admin();

UPDATE public.user_roles 
SET role = 'super_admin' 
WHERE user_id IN (SELECT id FROM auth.users WHERE email IN ('ritikgoswami34@gmail.com', 'origohostscommunity@gmail.com'));


-- 4. CREATE AMBASSADOR APPLICATIONS V2 TABLE
CREATE TABLE IF NOT EXISTS public.ambassador_applications_v2 (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  college text NOT NULL,
  branch text NOT NULL,
  semester text NOT NULL,
  year text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  linkedin text,
  github text,
  portfolio text,
  resume text NOT NULL,
  motivation text NOT NULL,
  experience text,
  social_media text,
  events_organized text,
  availability text,
  status text NOT NULL DEFAULT 'pending', 
  approved_by uuid REFERENCES auth.users(id),
  approved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 5. CREATE AMBASSADOR PROFILES V2 TABLE
CREATE TABLE IF NOT EXISTS public.ambassador_profiles_v2 (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  college text,
  mentor text,
  xp int DEFAULT 0,
  level int DEFAULT 1,
  events_hosted int DEFAULT 0,
  members_referred int DEFAULT 0,
  certificates jsonb DEFAULT '[]'::jsonb,
  performance jsonb DEFAULT '{}'::jsonb,
  swags jsonb DEFAULT '[]'::jsonb,
  joined_at timestamptz DEFAULT now(),
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 6. CREATE AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.system_audit_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  details jsonb DEFAULT '{}'::jsonb,
  ip_address text,
  browser text,
  device text,
  created_at timestamptz DEFAULT now()
);

-- 7. RLS POLICIES FOR NEW TABLES
ALTER TABLE public.ambassador_applications_v2 ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own application" ON public.ambassador_applications_v2 FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own application" ON public.ambassador_applications_v2 FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all applications" ON public.ambassador_applications_v2 FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update applications" ON public.ambassador_applications_v2 FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.ambassador_profiles_v2 ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.ambassador_profiles_v2 FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.ambassador_profiles_v2 FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update profiles" ON public.ambassador_profiles_v2 FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.system_audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view audit logs" ON public.system_audit_logs FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "System can insert audit logs" ON public.system_audit_logs FOR INSERT WITH CHECK (true);

-- 8. UPDATED_AT FUNCTION AND TRIGGERS
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_ambassador_applications_v2_updated_at ON public.ambassador_applications_v2;
CREATE TRIGGER update_ambassador_applications_v2_updated_at
BEFORE UPDATE ON public.ambassador_applications_v2
FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_ambassador_profiles_v2_updated_at ON public.ambassador_profiles_v2;
CREATE TRIGGER update_ambassador_profiles_v2_updated_at
BEFORE UPDATE ON public.ambassador_profiles_v2
FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
