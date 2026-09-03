-- Migration: Enterprise Host Module
-- Description: Creates schemas, tables, and RLS policies for the "Host an Event" module.

-- 1. ENUMS
CREATE TYPE public.host_org_type AS ENUM (
    'Startup', 'Enterprise', 'College', 'University', 'School', 'Government', 
    'Community', 'NGO', 'Training Institute', 'Individual'
);

CREATE TYPE public.host_event_type AS ENUM (
    'Workshop', 'Hackathon', 'Meetup', 'Conference', 'Bootcamp', 
    'Summit', 'AI', 'Cloud', 'Cyber Security', 'Webinar', 'Other'
);

CREATE TYPE public.host_event_format AS ENUM (
    'Offline', 'Online', 'Hybrid'
);

CREATE TYPE public.host_request_status AS ENUM (
    'Pending', 'Reviewing', 'Meeting Scheduled', 'Approved', 'Rejected', 'Completed'
);

-- 2. SEQUENCES
-- For OH-2026-000001 generation
CREATE SEQUENCE public.host_request_seq START 1;

-- 3. TABLES
CREATE TABLE public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    type public.host_org_type NOT NULL,
    website TEXT,
    email TEXT,
    phone TEXT,
    country TEXT,
    state TEXT,
    city TEXT,
    linkedin_url TEXT,
    company_size TEXT,
    expected_participants TEXT
);

CREATE TABLE public.host_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    request_number TEXT NOT NULL UNIQUE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    
    -- Event Info
    event_name TEXT NOT NULL,
    event_type public.host_event_type NOT NULL,
    format public.host_event_format NOT NULL,
    expected_date DATE,
    duration TEXT,
    venue TEXT,
    timezone TEXT,
    registration_deadline DATE,
    seats INTEGER,
    description TEXT,
    
    -- Deep Details
    budget TEXT,
    timeline TEXT,
    goals TEXT,
    
    -- Status
    status public.host_request_status NOT NULL DEFAULT 'Pending',
    
    -- Tracking Meta
    browser TEXT,
    country TEXT,
    ip TEXT
);

CREATE TABLE public.event_requirements (
    request_id UUID PRIMARY KEY REFERENCES public.host_requests(id) ON DELETE CASCADE,
    need_speakers BOOLEAN DEFAULT false,
    need_mentors BOOLEAN DEFAULT false,
    need_judges BOOLEAN DEFAULT false,
    need_certificates BOOLEAN DEFAULT false,
    need_qr_attendance BOOLEAN DEFAULT false,
    need_swags BOOLEAN DEFAULT false,
    need_volunteers BOOLEAN DEFAULT false,
    need_photography BOOLEAN DEFAULT false,
    need_live_streaming BOOLEAN DEFAULT false,
    need_sponsors BOOLEAN DEFAULT false,
    need_promotion BOOLEAN DEFAULT false,
    need_hiring_booth BOOLEAN DEFAULT false,
    need_registration_platform BOOLEAN DEFAULT false,
    need_community_marketing BOOLEAN DEFAULT false,
    need_internship_drive BOOLEAN DEFAULT false
);

CREATE TABLE public.host_request_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    request_id UUID NOT NULL REFERENCES public.host_requests(id) ON DELETE CASCADE,
    file_type TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size_bytes BIGINT
);

CREATE TABLE public.communications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    request_id UUID NOT NULL REFERENCES public.host_requests(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    subject TEXT,
    body TEXT NOT NULL,
    sender_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE TABLE public.admin_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    request_id UUID NOT NULL REFERENCES public.host_requests(id) ON DELETE CASCADE,
    admin_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    note TEXT NOT NULL
);

-- 4. TRIGGERS
CREATE TRIGGER update_organizations_updated_at
BEFORE UPDATE ON public.organizations
FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_host_requests_updated_at
BEFORE UPDATE ON public.host_requests
FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Function to auto-generate request_number (e.g. OH-2026-000001)
CREATE OR REPLACE FUNCTION public.generate_host_request_number()
RETURNS TRIGGER AS $$
DECLARE
    seq_val INT;
BEGIN
    seq_val := nextval('public.host_request_seq');
    NEW.request_number := 'OH-' || to_char(now(), 'YYYY') || '-' || lpad(seq_val::text, 6, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_host_requests
BEFORE INSERT ON public.host_requests
FOR EACH ROW EXECUTE PROCEDURE public.generate_host_request_number();

-- 5. STORAGE BUCKET
INSERT INTO storage.buckets (id, name, public) 
VALUES ('host-assets', 'host-assets', false) 
ON CONFLICT (id) DO NOTHING;

-- 6. RLS POLICIES
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.host_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.host_request_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notes ENABLE ROW LEVEL SECURITY;

-- Admins can do anything
CREATE POLICY "Admins have full access to organizations" ON public.organizations FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins have full access to host_requests" ON public.host_requests FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins have full access to event_requirements" ON public.event_requirements FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins have full access to host_request_files" ON public.host_request_files FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins have full access to communications" ON public.communications FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins have full access to admin_notes" ON public.admin_notes FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Users can read/insert their own requests and related data
CREATE POLICY "Users can read own requests" ON public.host_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own requests" ON public.host_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own requests (if pending)" ON public.host_requests FOR UPDATE USING (auth.uid() = user_id AND status = 'Pending');

CREATE POLICY "Users can read own orgs" ON public.organizations FOR SELECT USING (id IN (SELECT organization_id FROM public.host_requests WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert orgs" ON public.organizations FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own orgs" ON public.organizations FOR UPDATE USING (id IN (SELECT organization_id FROM public.host_requests WHERE user_id = auth.uid()));

CREATE POLICY "Users can read own requirements" ON public.event_requirements FOR SELECT USING (request_id IN (SELECT id FROM public.host_requests WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert own requirements" ON public.event_requirements FOR INSERT WITH CHECK (request_id IN (SELECT id FROM public.host_requests WHERE user_id = auth.uid()));

CREATE POLICY "Users can read own files" ON public.host_request_files FOR SELECT USING (request_id IN (SELECT id FROM public.host_requests WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert own files" ON public.host_request_files FOR INSERT WITH CHECK (request_id IN (SELECT id FROM public.host_requests WHERE user_id = auth.uid()));

CREATE POLICY "Users can read own communications" ON public.communications FOR SELECT USING (request_id IN (SELECT id FROM public.host_requests WHERE user_id = auth.uid()));

-- Storage bucket policies
CREATE POLICY "Users can upload host assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'host-assets' AND auth.uid() = owner);
CREATE POLICY "Users can read own host assets" ON storage.objects FOR SELECT USING (bucket_id = 'host-assets' AND auth.uid() = owner);
CREATE POLICY "Admins can read all host assets" ON storage.objects FOR SELECT USING (bucket_id = 'host-assets' AND public.has_role(auth.uid(), 'admin'));
