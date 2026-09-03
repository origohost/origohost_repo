-- Seed Data for OrigoHOSTs

-- Note: We assume auth.users already exist or will be bypassed during dev.
-- In local dev, foreign keys to auth.users can sometimes be mocked if constraints are relaxed, 
-- but here we provide the standard non-auth bound data.

-- 1. Events
INSERT INTO public.events (title, slug, description, date, location, category, status, published) VALUES
('OrigoHOSTs Annual Summit 2026', 'annual-summit-2026', 'Join us for the biggest hosting and infrastructure summit of the year. Network with industry leaders.', '2026-10-15T09:00:00Z', 'San Francisco, CA', 'Conference', 'upcoming', true),
('Cloud Infrastructure Workshop', 'cloud-infra-workshop', 'A deep dive into Kubernetes, Docker, and edge computing.', '2026-08-20T13:00:00Z', 'Remote', 'Workshop', 'upcoming', true),
('Web3 & Decentralized Hosting', 'web3-hosting', 'Exploring the future of decentralized storage and hosting solutions.', '2025-11-05T10:00:00Z', 'New York, NY', 'Meetup', 'past', true);

-- 2. Jobs
INSERT INTO public.jobs (title, company, location, type, description, published) VALUES
('Senior Frontend Engineer', 'OrigoHOSTs Core', 'Remote (US/EU)', 'Full-time', 'We are looking for a Senior Frontend Engineer with deep React and TanStack experience to help scale our enterprise dashboard.', true),
('Cloud Architect', 'PartnerCorp', 'London, UK', 'Full-time', 'Design and implement scalable AWS/GCP infrastructures for our enterprise clients.', true),
('Technical Support Specialist', 'OrigoHOSTs Support', 'Remote', 'Part-time', 'Help our global user base resolve complex hosting configuration issues.', true);

-- 3. Gallery
INSERT INTO public.gallery_items (title, category, count, tone, published, sort_order) VALUES
('Community Meetup NY', 'Events', 24, 'orange', true, 1),
('Hackathon 2025 Winners', 'Hackathons', 12, 'purple', true, 2),
('Behind the Scenes: Core Team', 'Culture', 8, 'green', true, 3),
('Global Summit Keynotes', 'Conferences', 45, 'blue', true, 4);

-- 4. Partners
INSERT INTO public.partners (name, type, domain, published, sort_order) VALUES
('Vercel', 'logo', 'vercel.com', true, 1),
('Supabase', 'logo', 'supabase.com', true, 2),
('Cloudflare', 'logo', 'cloudflare.com', true, 3),
('Stripe', 'logo', 'stripe.com', true, 4),
('Stanford University', 'institute', 'stanford.edu', true, 5),
('MIT', 'institute', 'mit.edu', true, 6);

-- 5. Testimonials
INSERT INTO public.testimonials (name, company, role, quote, rating, published) VALUES
('Sarah Jenkins', 'TechNova', 'CTO', 'OrigoHOSTs entirely transformed how we deploy and manage our edge functions. The community support is unparalleled.', 5, true),
('David Chen', 'StartUp Inc', 'Lead Developer', 'The platform architecture is brilliantly designed. Being part of this network has accelerated our growth exponentially.', 5, true),
('Maria Rodriguez', 'EduCloud', 'Director of Infrastructure', 'Secure, blazing fast, and incredibly reliable. OrigoHOSTs is the gold standard for community-driven hosting.', 5, true);

-- 6. Certificates
INSERT INTO public.certificates (id, recipient_name, event_name, issue_date) VALUES
('a1b2c3d4-0000-0000-0000-000000000001', 'Alice Walker', 'Cloud Infrastructure Workshop', '2026-08-20T17:00:00Z'),
('a1b2c3d4-0000-0000-0000-000000000002', 'John Smith', 'OrigoHOSTs Annual Summit 2025', '2025-10-15T18:00:00Z');

-- 7. Operations (Settings, SEO, Newsletter)
INSERT INTO public.settings (id, site_name, support_email) VALUES
('global', 'OrigoHOSTs Enterprise', 'admin@origohosts.com');

INSERT INTO public.seo_redirects (source_path, destination_url) VALUES
('/old-events', '/events'),
('/about-us', '/about');

INSERT INTO public.newsletter_subscribers (email, status) VALUES
('alice.walker@example.com', 'active'),
('john.smith@example.com', 'active'),
('marketing@partnercorp.com', 'unsubscribed');

-- 8. Profiles, Organizations & Audit Logs
INSERT INTO public.profiles (id, email, full_name, role, status) VALUES
('00000000-0000-0000-0000-000000000000', 'admin@origohosts.com', 'System Admin', 'admin', 'active'),
('11111111-1111-1111-1111-111111111111', 'student@university.edu', 'Alex Johnson', 'student', 'active'),
('22222222-2222-2222-2222-222222222222', 'recruiter@techcorp.com', 'Sarah Tech', 'recruiter', 'active');

INSERT INTO public.organizations (id, owner_id, name, industry, status) VALUES
('33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'TechCorp Inc.', 'Technology', 'approved'),
('44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'NextGen Startup', 'AI', 'pending');

INSERT INTO public.audit_logs (actor_email, action, entity, entity_id, ip_address) VALUES
('admin@origohosts.com', 'DELETE', 'events', 'e1-uuid', '192.168.1.1'),
('admin@origohosts.com', 'UPDATE', 'settings', 'global', '192.168.1.1');

-- 9. Gallery Images
INSERT INTO public.gallery_images (title, image_url, category, is_featured) VALUES
('Annual Tech Conference 2024', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', 'Events', true),
('Student Hackathon Winners', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80', 'Community', false);
