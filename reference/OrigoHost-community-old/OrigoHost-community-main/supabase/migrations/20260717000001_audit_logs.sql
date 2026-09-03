-- Create tamper-proof security audit log table
CREATE TABLE IF NOT EXISTS public.security_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    ip_address TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.security_audit_logs ENABLE ROW LEVEL SECURITY;

-- Allow inserts from authenticated and service roles
CREATE POLICY "Insert audit logs" ON public.security_audit_logs
    FOR INSERT WITH CHECK (true);

-- Only admins/service role can view logs
CREATE POLICY "View audit logs" ON public.security_audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_roles.user_id = auth.uid()
            AND user_roles.role = 'admin'
        )
    );

-- Prevent updates and deletes entirely
CREATE POLICY "Prevent updates" ON public.security_audit_logs
    FOR UPDATE USING (false);
CREATE POLICY "Prevent deletes" ON public.security_audit_logs
    FOR DELETE USING (false);

-- Index for rapid searching
CREATE INDEX idx_audit_action ON public.security_audit_logs(action);
CREATE INDEX idx_audit_created_at ON public.security_audit_logs(created_at DESC);
