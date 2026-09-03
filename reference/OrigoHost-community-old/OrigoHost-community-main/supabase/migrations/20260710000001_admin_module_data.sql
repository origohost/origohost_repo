CREATE TABLE IF NOT EXISTS admin_module_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  module_name TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_admin_module_data_module_name ON admin_module_data(module_name);

-- RLS policies
ALTER TABLE admin_module_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access for authenticated admins" ON admin_module_data FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow insert access for authenticated admins" ON admin_module_data FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow update access for authenticated admins" ON admin_module_data FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow delete access for authenticated admins" ON admin_module_data FOR DELETE TO authenticated USING (true);
