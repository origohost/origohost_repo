-- 20260801000000_production_architecture.sql
-- OrigoHOST Production Architecture Migration
-- Multidimensional Taxonomy Engine + Transactional Outbox + Tickets & Attendance + CRM Tables

BEGIN;

-- 1. EVENT FORMATS
CREATE TABLE IF NOT EXISTS public.event_formats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. TECHNOLOGY DOMAINS
CREATE TABLE IF NOT EXISTS public.technology_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Core Tech',
  description TEXT,
  icon_name TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. REAL-WORLD INDUSTRIES
CREATE TABLE IF NOT EXISTS public.industries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. TAXONOMY JUNCTION TABLES
CREATE TABLE IF NOT EXISTS public.event_technology_domains (
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  domain_id UUID NOT NULL REFERENCES public.technology_domains(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, domain_id)
);

CREATE TABLE IF NOT EXISTS public.event_industries (
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  industry_id UUID NOT NULL REFERENCES public.industries(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, industry_id)
);

-- 5. TICKETS & ATTENDANCE
CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID NOT NULL REFERENCES public.event_registrations_v2(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ticket_code TEXT UNIQUE NOT NULL,
  qr_payload TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  issued_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  scanned_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  location TEXT,
  checkin_at TIMESTAMPTZ DEFAULT now()
);

-- 6. TRANSACTIONAL OUTBOX FOR DOMAIN EVENTS
CREATE TABLE IF NOT EXISTS public.outbox_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  aggregate_type TEXT NOT NULL,
  aggregate_id UUID NOT NULL,
  payload JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  retry_count INT DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  processed_at TIMESTAMPTZ
);

-- 7. ISOLATED CRM DOMAIN TABLES
CREATE TABLE IF NOT EXISTS public.crm_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  job_title TEXT,
  status TEXT DEFAULT 'lead',
  source TEXT DEFAULT 'website',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.crm_organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  domain TEXT,
  industry TEXT,
  company_size TEXT,
  status TEXT DEFAULT 'prospect',
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.crm_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID REFERENCES public.crm_contacts(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES public.crm_organizations(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  estimated_value NUMERIC(12, 2) DEFAULT 0.00,
  stage TEXT NOT NULL DEFAULT 'new',
  probability INT DEFAULT 10,
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.crm_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.crm_leads(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES public.crm_contacts(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL, -- 'call', 'meeting', 'email', 'note'
  subject TEXT NOT NULL,
  notes TEXT,
  performed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.crm_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.crm_leads(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES public.crm_contacts(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  due_date TIMESTAMPTZ,
  status TEXT DEFAULT 'pending',
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_tickets_event_id ON public.tickets(event_id);
CREATE INDEX IF NOT EXISTS idx_tickets_code ON public.tickets(ticket_code);
CREATE INDEX IF NOT EXISTS idx_outbox_status ON public.outbox_events(status);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_email ON public.crm_contacts(email);
CREATE INDEX IF NOT EXISTS idx_crm_leads_stage ON public.crm_leads(stage);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.event_formats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technology_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_technology_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outbox_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_tasks ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES FOR PUBLIC TAXONOMY (READ UNRESTRICTED)
CREATE POLICY "Public can view event_formats" ON public.event_formats FOR SELECT USING (true);
CREATE POLICY "Public can view technology_domains" ON public.technology_domains FOR SELECT USING (true);
CREATE POLICY "Public can view industries" ON public.industries FOR SELECT USING (true);
CREATE POLICY "Public can view event_technology_domains" ON public.event_technology_domains FOR SELECT USING (true);
CREATE POLICY "Public can view event_industries" ON public.event_industries FOR SELECT USING (true);

-- RLS POLICIES FOR TICKETS
CREATE POLICY "Users can view own tickets" ON public.tickets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all tickets" ON public.tickets FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'super_admin')
  )
);

-- RLS POLICIES FOR CRM (ISOLATED TO AUTHORIZED CRM / ADMIN USERS ONLY)
CREATE POLICY "CRM access for authorized roles" ON public.crm_contacts FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'super_admin', 'crm_manager')
  )
);

CREATE POLICY "CRM leads access" ON public.crm_leads FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'super_admin', 'crm_manager')
  )
);

CREATE POLICY "CRM orgs access" ON public.crm_organizations FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'super_admin', 'crm_manager')
  )
);

CREATE POLICY "CRM activities access" ON public.crm_activities FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'super_admin', 'crm_manager')
  )
);

CREATE POLICY "CRM tasks access" ON public.crm_tasks FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'super_admin', 'crm_manager')
  )
);

-- SEED DATA FOR EVENT FORMATS
INSERT INTO public.event_formats (slug, name, description, icon_name, sort_order) VALUES
  ('meetup', 'Meetup', 'Community networking & informal presentations', 'Users', 1),
  ('seminar', 'Seminar', 'In-depth educational lecture & discussion', 'BookOpen', 2),
  ('hackathon', 'Hackathon', 'Time-bound intensive building competition', 'Code', 3),
  ('ideathon', 'Ideathon', 'Collaborative problem solving & pitching', 'Lightbulb', 4),
  ('tech-marathon', 'Tech Marathon', 'Multi-day continuous learning & sprint', 'Trophy', 5),
  ('webinar', 'Webinar', 'Interactive online presentation & live Q&A', 'Video', 6),
  ('kss', 'Knowledge Sharing Series (KSS)', 'Expert-led technical deep dives', 'Sparkles', 7),
  ('workshop', 'Workshop', 'Hands-on guided coding session', 'Terminal', 8),
  ('masterclass', 'Masterclass', 'Advanced practitioner session', 'GraduationCap', 9),
  ('conference', 'Conference', 'Flagship ecosystem gathering & keynotes', 'Building2', 10),
  ('community-session', 'Community Session', 'Peer roundtables & open discussions', 'MessageSquare', 11)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon_name = EXCLUDED.icon_name;

-- SEED DATA FOR TECHNOLOGY DOMAINS
INSERT INTO public.technology_domains (slug, name, category, description, icon_name, sort_order) VALUES
  ('ai', 'Artificial Intelligence', 'Core Tech', 'Generative AI, ML, LLMs, Neural Networks & Autonomous Systems', 'Brain', 1),
  ('cloud', 'Cloud Computing', 'Infrastructure', 'AWS, Azure, GCP, Serverless, Distributed Systems & Virtualization', 'Cloud', 2),
  ('cybersecurity', 'Cybersecurity', 'Security', 'Ethical Hacking, AppSec, Threat Audit & Cyber Defense', 'Shield', 3),
  ('networking', 'Networking', 'Infrastructure', 'Computer Networks, 5G, Wi-Fi 7, Protocols & Infrastructure', 'Radio', 4),
  ('devops', 'DevOps & Platform Engineering', 'Infrastructure', 'CI/CD, Kubernetes, Terraform, Docker & Telemetry Playbooks', 'Cpu', 5),
  ('software-engineering', 'Software Engineering', 'Core Tech', 'Web, Mobile, Backend APIs, Microservices & Architecture', 'Code2', 6),
  ('data', 'Data Science & Analytics', 'Core Tech', 'Data Engineering, Databases, Visualization & Analytics', 'Database', 7),
  ('robotics-iot', 'Robotics & IoT', 'Emerging', 'Connected Devices, Embedded Systems, Sensors & Industrial Machines', 'Bot', 8),
  ('web3', 'Blockchain & Web3', 'Emerging', 'Smart Contracts, Decentralized Systems, Digital Assets & Cryptography', 'Layers', 9),
  ('xr', 'AR / VR / XR', 'Emerging', 'Spatial Computing, Virtual Reality & Immersive UI', 'Globe', 10),
  ('open-source', 'Open Source', 'Community', 'Collaborative Development, PR Workflows & Public Codebases', 'Terminal', 11),
  ('emerging-tech', 'Emerging Technology', 'Emerging', 'Quantum Computing, Nanotech & Paradigm Shift Tech', 'Sparkles', 12)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  icon_name = EXCLUDED.icon_name;

-- SEED DATA FOR REAL-WORLD INDUSTRIES
INSERT INTO public.industries (slug, name, description, icon_name, sort_order) VALUES
  ('agritech', 'Agriculture & AgriTech', 'Smart farming, IoT sensors, precision agriculture & food security', 'Sprout', 1),
  ('business', 'Business & Entrepreneurship', 'Digital transformation, tech startups & enterprise innovation', 'Building', 2),
  ('foodtech', 'Food Technology', 'Supply chain automation, food science & sustainable systems', 'Utensils', 3),
  ('healthtech', 'Healthcare & HealthTech', 'Digital health, AI diagnostics, medical devices & patient care', 'HeartPulse', 4),
  ('edtech', 'Education & EdTech', 'Digital learning platforms, AI tutoring & technical upskilling', 'GraduationCap', 5),
  ('fintech', 'Finance & FinTech', 'Digital banking, payments, blockchain & financial inclusion', 'Coins', 6),
  ('smart-cities', 'Smart Cities', 'Urban mobility, connected public infrastructure & IoT systems', 'Landmark', 7),
  ('sustainability', 'Environment & Sustainability', 'Climate tech, clean energy, waste tracking & green computing', 'Leaf', 8),
  ('media', 'Media & Entertainment', 'Digital streaming, AI content generation & interactive media', 'Tv', 9),
  ('industry40', 'Manufacturing & Industry 4.0', 'Industrial IoT, digital twins, robotics & automated factories', 'Factory', 10),
  ('govtech', 'Government & Public Technology', 'Digital public infrastructure, civic tech & e-governance', 'ShieldCheck', 11),
  ('digital-world', 'Digital World', 'Online communities, meta-ecosystems & global digital connectivity', 'Globe', 12)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon_name = EXCLUDED.icon_name;

COMMIT;
