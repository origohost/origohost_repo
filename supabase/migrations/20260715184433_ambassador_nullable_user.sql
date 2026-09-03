-- Make user_id nullable in ambassador_applications to allow public form submissions without auth

ALTER TABLE public.ambassador_applications ALTER COLUMN user_id DROP NOT NULL;
