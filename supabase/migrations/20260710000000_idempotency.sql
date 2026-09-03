CREATE TABLE IF NOT EXISTS public.submission_idempotency (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idempotency_key text NOT NULL UNIQUE,
  form_type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL
);

-- Index for automatic cleanup or fast lookup
CREATE INDEX IF NOT EXISTS idx_submission_idempotency_expires_at ON public.submission_idempotency(expires_at);

-- RLS: Only allow service role to read/write, deny all public access
ALTER TABLE public.submission_idempotency ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access to idempotency"
  ON public.submission_idempotency
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
