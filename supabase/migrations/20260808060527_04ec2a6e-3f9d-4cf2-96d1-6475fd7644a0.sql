-- Storage access rules for the private `media` bucket.
-- Path convention: profiles/{user_id}/…, certificates/{user_id}/…, content/…, resources/…

-- ---------- profiles/{user_id}/… : owner-managed avatars ----------
CREATE POLICY "Members read own profile media"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'media'
  AND (storage.foldername(name))[1] = 'profiles'
  AND (storage.foldername(name))[2] = auth.uid()::text
);

CREATE POLICY "Members upload own profile media"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'media'
  AND (storage.foldername(name))[1] = 'profiles'
  AND (storage.foldername(name))[2] = auth.uid()::text
);

CREATE POLICY "Members update own profile media"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'media'
  AND (storage.foldername(name))[1] = 'profiles'
  AND (storage.foldername(name))[2] = auth.uid()::text
);

CREATE POLICY "Members delete own profile media"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'media'
  AND (storage.foldername(name))[1] = 'profiles'
  AND (storage.foldername(name))[2] = auth.uid()::text
);

CREATE POLICY "Admins read profile media"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'media'
  AND (storage.foldername(name))[1] = 'profiles'
  AND public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','community_admin','crm_admin']::public.app_role[])
);

-- ---------- certificates/{user_id}/… : owner-read, admin-managed ----------
CREATE POLICY "Members read own certificate files"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'media'
  AND (storage.foldername(name))[1] = 'certificates'
  AND (storage.foldername(name))[2] = auth.uid()::text
);

CREATE POLICY "Certificate admins read certificate files"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'media'
  AND (storage.foldername(name))[1] = 'certificates'
  AND public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','certificate_admin','events_admin']::public.app_role[])
);

CREATE POLICY "Certificate admins write certificate files"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'media'
  AND (storage.foldername(name))[1] = 'certificates'
  AND public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','certificate_admin','events_admin']::public.app_role[])
);

CREATE POLICY "Certificate admins delete certificate files"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'media'
  AND (storage.foldername(name))[1] = 'certificates'
  AND public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','certificate_admin']::public.app_role[])
);

-- ---------- content/… : editorial imagery, readable by members ----------
CREATE POLICY "Members read content media"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'media' AND (storage.foldername(name))[1] = 'content');

CREATE POLICY "Content admins write content media"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'media'
  AND (storage.foldername(name))[1] = 'content'
  AND public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin','editor','events_admin','chapter_admin','partnership_admin']::public.app_role[])
);

CREATE POLICY "Content admins update content media"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'media'
  AND (storage.foldername(name))[1] = 'content'
  AND public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin','editor','events_admin','chapter_admin','partnership_admin']::public.app_role[])
);

CREATE POLICY "Content admins delete content media"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'media'
  AND (storage.foldername(name))[1] = 'content'
  AND public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin','editor']::public.app_role[])
);

-- ---------- resources/… : library files ----------
CREATE POLICY "Members read resource files"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'media' AND (storage.foldername(name))[1] = 'resources');

CREATE POLICY "Content admins manage resource files"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'media'
  AND (storage.foldername(name))[1] = 'resources'
  AND public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin','editor']::public.app_role[])
);

CREATE POLICY "Content admins delete resource files"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'media'
  AND (storage.foldername(name))[1] = 'resources'
  AND public.has_any_role(auth.uid(), ARRAY['super_admin','platform_admin','content_admin','editor']::public.app_role[])
);