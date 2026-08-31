-- ==============================================================================
-- OrigoHOST Platform — PostgreSQL Migration 002: Row Level Security (RLS)
-- Granular database boundaries protecting private CRM data
-- ==============================================================================

-- Enable RLS on operational tables
ALTER TABLE crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 1. Events RLS Policies
-- ------------------------------------------------------------------------------
-- Public users can read non-draft events
CREATE POLICY "Public Read Events" ON events
  FOR SELECT USING (status != 'Draft');

-- Service role / Operator full management
CREATE POLICY "Operator Manage Events" ON events
  FOR ALL USING (auth.jwt() ->> 'role' IN ('operator', 'admin', 'service_role') OR current_user = 'postgres');

-- ------------------------------------------------------------------------------
-- 2. Event Registrations RLS Policies
-- ------------------------------------------------------------------------------
-- Public users can insert new registrations
CREATE POLICY "Public Insert Registrations" ON event_registrations
  FOR INSERT WITH CHECK (true);

-- Operators can read & manage all registrations
CREATE POLICY "Operator Manage Registrations" ON event_registrations
  FOR ALL USING (auth.jwt() ->> 'role' IN ('operator', 'admin', 'service_role') OR current_user = 'postgres');

-- ------------------------------------------------------------------------------
-- 3. Community Members RLS Policies
-- ------------------------------------------------------------------------------
-- Public users can read active community member profiles
CREATE POLICY "Public Read Community Members" ON community_members
  FOR SELECT USING (status = 'ACTIVE');

-- Operators can manage community members
CREATE POLICY "Operator Manage Members" ON community_members
  FOR ALL USING (auth.jwt() ->> 'role' IN ('operator', 'admin', 'service_role') OR current_user = 'postgres');

-- ------------------------------------------------------------------------------
-- 4. CRM Ingestion Public Insert Policies
-- ------------------------------------------------------------------------------
-- Public users can submit inquiries (creates leads)
CREATE POLICY "Public Insert Leads" ON crm_leads
  FOR INSERT WITH CHECK (true);

-- Public users can submit applications
CREATE POLICY "Public Insert Applications" ON crm_applications
  FOR INSERT WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 5. CRM Private Records Operator Policies
-- ------------------------------------------------------------------------------
CREATE POLICY "Operator Manage Contacts" ON crm_contacts
  FOR ALL USING (auth.jwt() ->> 'role' IN ('operator', 'admin', 'service_role') OR current_user = 'postgres');

CREATE POLICY "Operator Manage Leads" ON crm_leads
  FOR ALL USING (auth.jwt() ->> 'role' IN ('operator', 'admin', 'service_role') OR current_user = 'postgres');

CREATE POLICY "Operator Manage Applications" ON crm_applications
  FOR ALL USING (auth.jwt() ->> 'role' IN ('operator', 'admin', 'service_role') OR current_user = 'postgres');

CREATE POLICY "Operator Manage Audit Logs" ON audit_logs
  FOR ALL USING (auth.jwt() ->> 'role' IN ('operator', 'admin', 'service_role') OR current_user = 'postgres');
