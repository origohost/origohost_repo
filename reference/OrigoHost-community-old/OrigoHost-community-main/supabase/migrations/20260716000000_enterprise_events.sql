-- Migration for Enterprise Event Management System

-- 1. CREATE EVENTS V2 TABLE
CREATE TABLE IF NOT EXISTS public.events_v2 (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  short_description text NOT NULL,
  long_description text, -- Markdown content
  banner_url text,
  thumbnail_url text,
  
  -- Date & Time
  date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  timezone text NOT NULL DEFAULT 'UTC',
  
  -- Location
  mode text NOT NULL DEFAULT 'offline', -- online, offline, hybrid
  venue_name text,
  address text,
  google_maps_link text,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  
  -- Registration
  registration_link text, -- For external platforms like Luma/Devfolio if used
  registration_deadline timestamptz,
  max_seats int,
  price decimal(10, 2) DEFAULT 0.00,
  
  -- Settings & Metadata
  category text,
  is_published boolean DEFAULT false,
  certificate_enabled boolean DEFAULT false,
  seo_metadata jsonb DEFAULT '{}'::jsonb,
  
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. CREATE EVENT ORGANIZERS TABLE
CREATE TABLE IF NOT EXISTS public.event_organizers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id uuid NOT NULL REFERENCES public.events_v2(id) ON DELETE CASCADE,
  name text NOT NULL,
  role text NOT NULL DEFAULT 'Host', -- Host, Co-Host, Community Partner
  logo_url text,
  website_url text,
  description text,
  created_at timestamptz DEFAULT now()
);

-- 3. CREATE SPEAKERS TABLE
CREATE TABLE IF NOT EXISTS public.speakers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  designation text NOT NULL,
  organization text NOT NULL,
  bio text,
  avatar_url text,
  social_links jsonb DEFAULT '{}'::jsonb, -- linkedin, github, twitter, website
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4. CREATE EVENT SPEAKERS LINK TABLE
CREATE TABLE IF NOT EXISTS public.event_speakers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id uuid NOT NULL REFERENCES public.events_v2(id) ON DELETE CASCADE,
  speaker_id uuid NOT NULL REFERENCES public.speakers(id) ON DELETE CASCADE,
  session_title text,
  speaking_time text, -- e.g. "10:30 AM - 11:30 AM"
  order_index int DEFAULT 0,
  UNIQUE(event_id, speaker_id)
);

-- 5. CREATE EVENT AGENDA TABLE
CREATE TABLE IF NOT EXISTS public.event_agenda (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id uuid NOT NULL REFERENCES public.events_v2(id) ON DELETE CASCADE,
  start_time text NOT NULL, -- e.g. "09:00 AM"
  title text NOT NULL,
  description text,
  order_index int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 6. CREATE EVENT FAQS TABLE
CREATE TABLE IF NOT EXISTS public.event_faqs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id uuid NOT NULL REFERENCES public.events_v2(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text NOT NULL,
  order_index int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 7. CREATE EVENT GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.event_gallery (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id uuid NOT NULL REFERENCES public.events_v2(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text,
  order_index int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 8. CREATE EVENT DOWNLOADS TABLE
CREATE TABLE IF NOT EXISTS public.event_downloads (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id uuid NOT NULL REFERENCES public.events_v2(id) ON DELETE CASCADE,
  title text NOT NULL,
  file_url text NOT NULL,
  type text NOT NULL, -- pdf, source_code, slides
  created_at timestamptz DEFAULT now()
);

-- 9. CREATE EVENT REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.event_reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id uuid NOT NULL REFERENCES public.events_v2(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review text,
  status text DEFAULT 'pending', -- pending, approved, rejected (for moderation)
  created_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- 10. CREATE EVENT REGISTRATIONS V2 TABLE
CREATE TABLE IF NOT EXISTS public.event_registrations_v2 (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id uuid NOT NULL REFERENCES public.events_v2(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'confirmed', -- confirmed, waitlisted, cancelled
  checked_in boolean DEFAULT false,
  ticket_id text UNIQUE, -- Unique QR Code or Ticket ID
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);


-- 11. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.events_v2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_organizers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_agenda ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations_v2 ENABLE ROW LEVEL SECURITY;

-- Public read access for published events and related data
CREATE POLICY "Public can view published events" ON public.events_v2 FOR SELECT USING (is_published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Public can view organizers" ON public.event_organizers FOR SELECT USING (true);
CREATE POLICY "Public can view speakers" ON public.speakers FOR SELECT USING (true);
CREATE POLICY "Public can view event speakers" ON public.event_speakers FOR SELECT USING (true);
CREATE POLICY "Public can view agenda" ON public.event_agenda FOR SELECT USING (true);
CREATE POLICY "Public can view faqs" ON public.event_faqs FOR SELECT USING (true);
CREATE POLICY "Public can view gallery" ON public.event_gallery FOR SELECT USING (true);
CREATE POLICY "Public can view downloads" ON public.event_downloads FOR SELECT USING (true);
CREATE POLICY "Public can view approved reviews" ON public.event_reviews FOR SELECT USING (status = 'approved' OR user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- Registrations policies
CREATE POLICY "Users can view own registrations" ON public.event_registrations_v2 FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can register themselves" ON public.event_registrations_v2 FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can cancel own registration" ON public.event_registrations_v2 FOR UPDATE USING (user_id = auth.uid());

-- Reviews policies
CREATE POLICY "Users can create review" ON public.event_reviews FOR INSERT WITH CHECK (user_id = auth.uid());

-- Admin policies (Admins can do everything)
CREATE POLICY "Admins full access events_v2" ON public.events_v2 FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access organizers" ON public.event_organizers FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access speakers" ON public.speakers FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access event_speakers" ON public.event_speakers FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access agenda" ON public.event_agenda FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access faqs" ON public.event_faqs FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access gallery" ON public.event_gallery FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access downloads" ON public.event_downloads FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access reviews" ON public.event_reviews FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins full access registrations" ON public.event_registrations_v2 FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- 12. UPDATED_AT TRIGGERS
CREATE TRIGGER update_events_v2_updated_at BEFORE UPDATE ON public.events_v2 FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_speakers_updated_at BEFORE UPDATE ON public.speakers FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_event_registrations_v2_updated_at BEFORE UPDATE ON public.event_registrations_v2 FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
