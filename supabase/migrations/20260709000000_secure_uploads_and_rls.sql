-- Secure Storage Uploads for Sponsors
DROP POLICY IF EXISTS "Anyone can upload sponsor assets" ON storage.objects;

CREATE POLICY "Anyone can upload sponsor assets" 
ON storage.objects FOR INSERT 
WITH CHECK ( 
    bucket_id = 'sponsor_assets' 
    AND (
        storage.extension(name) = 'png' 
        OR storage.extension(name) = 'jpg' 
        OR storage.extension(name) = 'jpeg' 
        OR storage.extension(name) = 'pdf' 
        OR storage.extension(name) = 'zip'
    )
    -- size limit could be enforced here but requires length(file) which isn't always exposed cleanly in storage policies, usually handled by api.
);

-- Secure contact requests (No empty inserts)
DROP POLICY IF EXISTS "Anyone can insert contact requests" ON public.contact_requests;
CREATE POLICY "Anyone can insert contact requests" ON public.contact_requests FOR INSERT WITH CHECK (
    length(email) > 0 AND length(name) > 0
);
