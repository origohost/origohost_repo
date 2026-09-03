-- ==============================================================================
-- ENTERPRISE OPTIMIZATIONS: Missing Foreign Key & Sorting Indexes
-- ==============================================================================

-- 1. Contact Submissions
-- Frequent admin panel sorts by created_at DESC and filters by 'handled'
CREATE INDEX IF NOT EXISTS idx_contact_submissions_handled_created 
  ON public.contact_submissions (handled, created_at DESC);

-- 2. Sponsor Applications
-- Filters by status and sorts by created_at
CREATE INDEX IF NOT EXISTS idx_sponsor_applications_status_created 
  ON public.sponsor_applications (status, created_at DESC);

-- 3. Host Requests
-- Filters by status and joins on organization_id
CREATE INDEX IF NOT EXISTS idx_host_requests_status_created 
  ON public.host_requests (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_host_requests_organization_id 
  ON public.host_requests (organization_id);

-- 4. Blog Posts
-- Filtering published posts by date
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at_desc
  ON public.blog_posts (published_at DESC)
  WHERE is_published = true;

-- 5. Foreign Key indexes for User/Profile relations
-- To prevent sequential scans on joins with auth.users or profiles
CREATE INDEX IF NOT EXISTS idx_event_registrations_v2_user_id
  ON public.event_registrations_v2(user_id);

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id
  ON public.user_roles(user_id);
