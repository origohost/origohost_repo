-- Create schedule_calls table
CREATE TABLE public.schedule_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  organization text,
  topic text NOT NULL,
  preferred_date timestamp with time zone,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.schedule_calls ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public/anon/authenticated) to insert
CREATE POLICY "Enable insert for all users" ON public.schedule_calls
  FOR INSERT WITH CHECK (true);

-- Allow only admins to select/update/delete
CREATE POLICY "Enable read for admins" ON public.schedule_calls
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Enable update for admins" ON public.schedule_calls
  FOR UPDATE USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Enable delete for admins" ON public.schedule_calls
  FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Indexes
CREATE INDEX idx_schedule_calls_status ON public.schedule_calls(status);
CREATE INDEX idx_schedule_calls_created_at ON public.schedule_calls(created_at DESC);
