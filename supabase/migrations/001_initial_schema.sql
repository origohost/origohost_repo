-- ==============================================================================
-- OrigoHOST Platform — PostgreSQL Migration 001: Operational Schema
-- Authoritative database tables for CRM, Events, Registrations & Community
-- ==============================================================================

-- Extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. CRM Contacts Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS crm_contacts (
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

CREATE INDEX IF NOT EXISTS idx_crm_contacts_email ON crm_contacts(email);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_status ON crm_contacts(status);

-- ------------------------------------------------------------------------------
-- 2. CRM Leads Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS crm_leads (
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

CREATE INDEX IF NOT EXISTS idx_crm_leads_status ON crm_leads(status);

-- ------------------------------------------------------------------------------
-- 3. CRM Applications Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS crm_applications (
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

CREATE INDEX IF NOT EXISTS idx_crm_applications_status ON crm_applications(status);

-- ------------------------------------------------------------------------------
-- 4. Events Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS events (
  id VARCHAR(100) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  format VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'Upcoming',
  location VARCHAR(255),
  registration_url VARCHAR(500),
  capacity INT DEFAULT 100,
  featured BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);

-- ------------------------------------------------------------------------------
-- 5. Event Registrations Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id VARCHAR(100) NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id VARCHAR(100),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'REGISTERED',
  check_in_status VARCHAR(50) DEFAULT 'NOT_ATTENDED',
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_event_registration UNIQUE(event_id, email)
);

CREATE INDEX IF NOT EXISTS idx_event_registrations_event ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_email ON event_registrations(email);

-- ------------------------------------------------------------------------------
-- 6. Community Members Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS community_members (
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

CREATE INDEX IF NOT EXISTS idx_community_members_status ON community_members(status);

-- ------------------------------------------------------------------------------
-- 7. Audit Logs Table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id VARCHAR(100) NOT NULL,
  actor_name VARCHAR(255) NOT NULL,
  action VARCHAR(50) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id VARCHAR(100) NOT NULL,
  details JSONB DEFAULT '{}',
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp DESC);
