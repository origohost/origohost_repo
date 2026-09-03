-- Fix Missing WITH CHECK on ambassador_applications
DROP POLICY IF EXISTS "Users update own application" ON public.ambassador_applications;
CREATE POLICY "Users update own application" 
ON public.ambassador_applications 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Fix Missing WITH CHECK on host_requests
DROP POLICY IF EXISTS "Users can update own requests (if pending)" ON public.host_requests;
CREATE POLICY "Users can update own requests (if pending)" 
ON public.host_requests 
FOR UPDATE 
USING (auth.uid() = user_id AND status = 'Pending')
WITH CHECK (auth.uid() = user_id AND status = 'Pending');

-- Fix Missing WITH CHECK on organizations
DROP POLICY IF EXISTS "Users can update own orgs" ON public.organizations;
CREATE POLICY "Users can update own orgs" 
ON public.organizations 
FOR UPDATE 
USING (id IN (SELECT organization_id FROM public.host_requests WHERE user_id = auth.uid()))
WITH CHECK (id IN (SELECT organization_id FROM public.host_requests WHERE user_id = auth.uid()));

-- Fix CRITICAL Broken Access Control on admin_module_data
DROP POLICY IF EXISTS "Allow read access for authenticated admins" ON admin_module_data;
DROP POLICY IF EXISTS "Allow insert access for authenticated admins" ON admin_module_data;
DROP POLICY IF EXISTS "Allow update access for authenticated admins" ON admin_module_data;
DROP POLICY IF EXISTS "Allow delete access for authenticated admins" ON admin_module_data;

CREATE POLICY "Allow read access for authenticated admins" 
ON admin_module_data FOR SELECT TO authenticated 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Allow insert access for authenticated admins" 
ON admin_module_data FOR INSERT TO authenticated 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Allow update access for authenticated admins" 
ON admin_module_data FOR UPDATE TO authenticated 
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Allow delete access for authenticated admins" 
ON admin_module_data FOR DELETE TO authenticated 
USING (public.has_role(auth.uid(), 'admin'));
