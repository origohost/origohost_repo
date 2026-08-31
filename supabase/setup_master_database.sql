-- ==============================================================================
-- OrigoHOST Platform — Master Production Supabase Database Setup Script
-- Paste and execute this script directly into the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/nzsjvuoxxyjrownuruwo/sql/new
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- SECTION 1: EXTENSIONS & INITIAL CLEANUP OF LEGACY CONSTRAINTS
-- ------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop legacy table constraints if tables pre-existed in Supabase
ALTER TABLE IF EXISTS public.events DROP CONSTRAINT IF EXISTS events_format_check;
ALTER TABLE IF EXISTS public.events DROP CONSTRAINT IF EXISTS events_status_check;
ALTER TABLE IF EXISTS public.crm_contacts DROP CONSTRAINT IF EXISTS crm_contacts_status_check;
ALTER TABLE IF EXISTS public.crm_leads DROP CONSTRAINT IF EXISTS crm_leads_status_check;
ALTER TABLE IF EXISTS public.crm_applications DROP CONSTRAINT IF EXISTS crm_applications_status_check;

-- ------------------------------------------------------------------------------
-- SECTION 2: OPERATIONAL TABLE DEFINITIONS & INDEXES
-- ------------------------------------------------------------------------------

-- 1. CRM Contacts Table
CREATE TABLE IF NOT EXISTS public.crm_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  role VARCHAR(100) DEFAULT 'Member',
  organization VARCHAR(255),
  status VARCHAR(50) DEFAULT 'ACTIVE',
  lifecycle_stage VARCHAR(50) DEFAULT 'MEMBER',
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  owner_id VARCHAR(100) DEFAULT 'usr-operator-01',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_crm_contacts_email ON public.crm_contacts(email);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_status ON public.crm_contacts(status);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_owner ON public.crm_contacts(owner_id);

-- 2. CRM Leads Table
CREATE TABLE IF NOT EXISTS public.crm_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  organization VARCHAR(255),
  title VARCHAR(255),
  source VARCHAR(100) DEFAULT 'Public Website',
  status VARCHAR(50) DEFAULT 'NEW',
  score INT DEFAULT 0,
  assigned_to VARCHAR(100) DEFAULT 'usr-operator-01',
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_crm_leads_status ON public.crm_leads(status);
CREATE INDEX IF NOT EXISTS idx_crm_leads_email ON public.crm_leads(email);

-- 3. CRM Applications Table
CREATE TABLE IF NOT EXISTS public.crm_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  applicant_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  pathway VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'PENDING',
  chapter_name VARCHAR(255),
  notes TEXT,
  reviewed_by VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_crm_applications_status ON public.crm_applications(status);

-- 4. Events Table
CREATE TABLE IF NOT EXISTS public.events (
  id VARCHAR(100) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  format VARCHAR(50) NOT NULL DEFAULT 'Virtual',
  status VARCHAR(50) DEFAULT 'Upcoming',
  location VARCHAR(255),
  registration_url VARCHAR(500),
  capacity INT DEFAULT 100,
  featured BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);

-- 5. Event Registrations Table
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id VARCHAR(100) NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id VARCHAR(100),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'REGISTERED',
  check_in_status VARCHAR(50) DEFAULT 'NOT_ATTENDED',
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_event_registration UNIQUE(event_id, email)
);

CREATE INDEX IF NOT EXISTS idx_event_registrations_event ON public.event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_email ON public.event_registrations(email);

-- 6. Community Members Table
CREATE TABLE IF NOT EXISTS public.community_members (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  chapter_name VARCHAR(255),
  avatar VARCHAR(500),
  bio TEXT,
  email VARCHAR(255),
  status VARCHAR(50) DEFAULT 'ACTIVE',
  joined_date TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_community_members_status ON public.community_members(status);

-- 7. Audit Logs Table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id VARCHAR(100) NOT NULL,
  actor_name VARCHAR(255) NOT NULL,
  action VARCHAR(50) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id VARCHAR(100) NOT NULL,
  details JSONB DEFAULT '{}',
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON public.audit_logs(timestamp DESC);

-- ------------------------------------------------------------------------------
-- SECTION 3: AUTOMATED TIMESTAMP TRIGGERS
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_crm_contacts_modtime
BEFORE UPDATE ON public.crm_contacts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_crm_leads_modtime
BEFORE UPDATE ON public.crm_leads
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_events_modtime
BEFORE UPDATE ON public.events
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ------------------------------------------------------------------------------
-- SECTION 4: ROW LEVEL SECURITY (RLS) & POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. Events RLS
DROP POLICY IF EXISTS "Public Read Events" ON public.events;
CREATE POLICY "Public Read Events" ON public.events
  FOR SELECT USING (status != 'Draft');

DROP POLICY IF EXISTS "Operator Manage Events" ON public.events;
CREATE POLICY "Operator Manage Events" ON public.events
  FOR ALL USING (auth.jwt() ->> 'role' IN ('operator', 'admin', 'service_role') OR current_user = 'postgres');

-- 2. Event Registrations RLS
DROP POLICY IF EXISTS "Public Insert Registrations" ON public.event_registrations;
CREATE POLICY "Public Insert Registrations" ON public.event_registrations
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Operator Manage Registrations" ON public.event_registrations;
CREATE POLICY "Operator Manage Registrations" ON public.event_registrations
  FOR ALL USING (auth.jwt() ->> 'role' IN ('operator', 'admin', 'service_role') OR current_user = 'postgres');

-- 3. Public Forms RLS (Leads & Applications)
DROP POLICY IF EXISTS "Public Insert Leads" ON public.crm_leads;
CREATE POLICY "Public Insert Leads" ON public.crm_leads
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Insert Applications" ON public.crm_applications;
CREATE POLICY "Public Insert Applications" ON public.crm_applications
  FOR INSERT WITH CHECK (true);

-- 4. Protected CRM Tables
DROP POLICY IF EXISTS "Operator Manage Contacts" ON public.crm_contacts;
CREATE POLICY "Operator Manage Contacts" ON public.crm_contacts
  FOR ALL USING (auth.jwt() ->> 'role' IN ('operator', 'admin', 'service_role') OR current_user = 'postgres');

DROP POLICY IF EXISTS "Operator Manage Leads" ON public.crm_leads;
CREATE POLICY "Operator Manage Leads" ON public.crm_leads
  FOR ALL USING (auth.jwt() ->> 'role' IN ('operator', 'admin', 'service_role') OR current_user = 'postgres');

DROP POLICY IF EXISTS "Operator Manage Applications" ON public.crm_applications;
CREATE POLICY "Operator Manage Applications" ON public.crm_applications
  FOR ALL USING (auth.jwt() ->> 'role' IN ('operator', 'admin', 'service_role') OR current_user = 'postgres');

DROP POLICY IF EXISTS "Operator Manage Audit Logs" ON public.audit_logs;
CREATE POLICY "Operator Manage Audit Logs" ON public.audit_logs
  FOR ALL USING (auth.jwt() ->> 'role' IN ('operator', 'admin', 'service_role') OR current_user = 'postgres');

-- ------------------------------------------------------------------------------
-- SECTION 5: BASELINE OPERATIONAL SEED DATA
-- ------------------------------------------------------------------------------
INSERT INTO public.events (
  id,
  slug,
  title,
  summary,
  description,
  start_date,
  end_date,
  format,
  status,
  location,
  registration_url,
  capacity,
  featured,
  tags
)
VALUES
  (
    'evt-kss-03',
    'kss2026-ep03-cybersecurity-ethical-hacking',
    'Cybersecurity & Ethical Hacking Essentials',
    'Deep dive into penetration testing, threat modeling, and modern defense strategies.',
    'Join industry experts for a comprehensive workshop on securing distributed cloud applications and ethical hacking methodologies.',
    NOW() + INTERVAL '7 days',
    NOW() + INTERVAL '7 days 2 hours',
    'Virtual',
    'Upcoming',
    'Online Webinar',
    'https://origohost.com/events/kss2026-ep03-cybersecurity-ethical-hacking',
    250,
    true,
    ARRAY['cybersecurity', 'webinar', 'kss2026']
  ),
  (
    'evt-cyberforge-2026',
    'cyberforge-2026',
    'CyberForge 2026 Hackathon',
    '48-hour intensive hackathon building next-generation secure cloud applications.',
    'Assemble your teams and compete for prizes in cloud architecture, AI defense systems, and resilient infrastructure.',
    NOW() + INTERVAL '21 days',
    NOW() + INTERVAL '23 days',
    'Hybrid',
    'Upcoming',
    'Tech Hub Center & Virtual',
    'https://origohost.com/events/cyberforge-2026',
    150,
    true,
    ARRAY['hackathon', 'cybersecurity', 'ai']
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  description = EXCLUDED.description,
  start_date = EXCLUDED.start_date,
  end_date = EXCLUDED.end_date,
  format = EXCLUDED.format,
  status = EXCLUDED.status,
  location = EXCLUDED.location,
  registration_url = EXCLUDED.registration_url,
  capacity = EXCLUDED.capacity,
  featured = EXCLUDED.featured,
  tags = EXCLUDED.tags;
