-- Create private bucket for secure resumes
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'secure_resumes',
  'secure_resumes',
  false,
  5242880, -- 5MB limit
  ARRAY['application/pdf']
) ON CONFLICT (id) DO UPDATE SET
  public = false,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['application/pdf'];

-- RLS: Only authenticated users can insert their own (or rather service role does it)
-- Since we do server-side uploads, we don't need to give public insert access.
-- We'll allow authenticated users to read if they are admins.

CREATE POLICY "Admins can view secure resumes" ON storage.objects
FOR SELECT TO authenticated USING (
  bucket_id = 'secure_resumes' AND
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);
