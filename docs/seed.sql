-- =====================================================================
-- OrigoHOSTs starter seed data
-- Run AFTER docs/backend-schema.sql. Idempotent via ON CONFLICT / WHERE
-- NOT EXISTS guards so it is safe to re-run in local development.
-- =====================================================================

-- ---------- Partners ----------
insert into public.partners (kind, name, domain, sort_order) values
  ('logo',      'Nimbus Cloud',  'nimbuscloud.com',  10),
  ('logo',      'Fintrail',      'fintrail.io',      20),
  ('logo',      'Skyloft',       'skyloft.dev',      30),
  ('logo',      'Bolt Systems',  'boltsystems.com',  40),
  ('logo',      'EdgeStack',     'edgestack.io',     50),
  ('institute', 'IIT Delhi',     'iitd.ac.in',       10),
  ('institute', 'BITS Pilani',   'bits-pilani.ac.in',20),
  ('institute', 'IIIT Hyderabad','iiit.ac.in',       30)
on conflict do nothing;

-- ---------- Jobs ----------
insert into public.jobs (role, company, location, type, tags, apply_url, sort_order)
select * from (values
  ('Platform Engineer',       'Nimbus Cloud', 'Bengaluru · Hybrid', 'Full-time',  array['Kubernetes','Terraform','AWS'],       'https://example.com/apply/1', 10),
  ('Site Reliability Engineer','Fintrail',    'Remote (India)',     'Full-time',  array['SRE','GCP','Observability'],          'https://example.com/apply/2', 20),
  ('DevOps Intern',           'Origo Labs',   'Pune · Onsite',      'Internship', array['CI/CD','Docker','Linux'],             'https://example.com/apply/3', 30),
  ('Cloud Solutions Architect','Skyloft',     'Hyderabad · Hybrid', 'Full-time',  array['Multi-cloud','Design','GTM'],         'https://example.com/apply/4', 40),
  ('Backend Engineer (Infra)','Bolt Systems', 'Remote',             'Full-time',  array['Go','Postgres','Kafka'],              'https://example.com/apply/5', 50),
  ('Developer Advocate',      'EdgeStack',    'Delhi NCR',          'Full-time',  array['Community','Content','Cloudflare'],   'https://example.com/apply/6', 60)
) as v(role, company, location, type, tags, apply_url, sort_order)
where not exists (select 1 from public.jobs j where j.role = v.role and j.company = v.company);

-- ---------- Events ----------
insert into public.events (title, description, city, category, mode, starts_at, sort_order)
select * from (values
  ('Kubernetes Community Day', 'Talks, workshops, hallway track.',        'Bengaluru',  'Meetup',    'OFFLINE', now() + interval '14 days', 10),
  ('SRE Book Club',            'Chapter 3 discussion.',                   'Online',     'Book club', 'ONLINE',  now() + interval '7 days',  20),
  ('Cloud Native Delhi',       'Speakers from AWS, Google, Cloudflare.',  'Delhi NCR',  'Conference','OFFLINE', now() + interval '45 days', 30),
  ('Observability Deep Dive',  'OpenTelemetry + Grafana hands-on.',       'Online',     'Workshop',  'ONLINE',  now() + interval '21 days', 40)
) as v(title, description, city, category, mode, starts_at, sort_order)
where not exists (select 1 from public.events e where e.title = v.title);

-- ---------- Gallery ----------
insert into public.gallery_items (title, category, count, tone, sort_order)
select * from (values
  ('KCD Bengaluru 2024',      'Meetups',     42, 'orange', 10),
  ('DevOps Days Pune',        'Conferences', 68, 'green',  20),
  ('Kubernetes Workshop',     'Workshops',   24, 'blue',   30),
  ('Community Hackathon',     'Hackathons',  81, 'purple', 40)
) as v(title, category, count, tone, sort_order)
where not exists (select 1 from public.gallery_items g where g.title = v.title);

-- ---------- FAQ ----------
insert into public.faq_items (question, answer, category, sort_order)
select * from (values
  ('How do I join OrigoHOSTs?',       'Register for a free account and RSVP for any upcoming event.', 'General', 10),
  ('Is membership free?',             'Yes — the community is free for individual practitioners.',    'General', 20),
  ('Can my company partner?',         'Reach out via the contact form; we onboard 3–5 partners a quarter.', 'Partners', 30),
  ('Where can I find recorded talks?','Recordings appear on the Gallery page a week after each event.','Content',  40)
) as v(question, answer, category, sort_order)
where not exists (select 1 from public.faq_items f where f.question = v.question);

-- ---------- Blog ----------
insert into public.blog_posts (slug, title, excerpt, body, published_at)
select * from (values
  ('welcome-to-origohosts',
   'Welcome to OrigoHOSTs',
   'A short note on why this community exists and what to expect.',
   E'## Hello, operators\n\nWe are building a home for platform, cloud, and SRE folks in India.\n\nSee the events page for what''s next.',
   now() - interval '7 days'),
  ('kubernetes-in-2026',
   'Kubernetes in 2026 — what actually matters',
   'Pragmatic take from running k8s across three companies.',
   E'## Boring is a feature\n\nStop chasing the shiny operator. The core primitives — Deployment, Service, Ingress — still carry every production workload we run.',
   now() - interval '2 days')
) as v(slug, title, excerpt, body, published_at)
where not exists (select 1 from public.blog_posts p where p.slug = v.slug);
