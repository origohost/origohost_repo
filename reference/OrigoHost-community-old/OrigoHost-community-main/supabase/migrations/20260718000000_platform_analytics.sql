CREATE TABLE IF NOT EXISTS public.platform_visits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    path TEXT NOT NULL,
    device_type TEXT NOT NULL CHECK (device_type IN ('Mobile', 'Desktop', 'Tablet')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast time-series and grouping aggregations
CREATE INDEX IF NOT EXISTS idx_platform_visits_created_at ON public.platform_visits(created_at);
CREATE INDEX IF NOT EXISTS idx_platform_visits_device_type ON public.platform_visits(device_type);

-- RLS Policies
ALTER TABLE public.platform_visits ENABLE ROW LEVEL SECURITY;

-- Allow anyone (even unauthenticated users) to log a visit
CREATE POLICY "Allow public inserts on platform visits" 
ON public.platform_visits FOR INSERT 
TO public
WITH CHECK (true);

-- Allow only authenticated users to read analytics (we will enforce admin check in server actions)
CREATE POLICY "Allow authenticated read on platform visits" 
ON public.platform_visits FOR SELECT 
TO authenticated 
USING (true);

-- Setup Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.platform_visits;
