-- Secure Storage Uploads for Sponsors - Updated to allow webp, gif, svg
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
        OR storage.extension(name) = 'webp'
        OR storage.extension(name) = 'gif'
        OR storage.extension(name) = 'svg'
    )
);
