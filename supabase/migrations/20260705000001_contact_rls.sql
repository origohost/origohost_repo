-- Enable public inserts for contact requests
CREATE POLICY "Anyone can insert contact requests" ON public.contact_requests FOR INSERT WITH CHECK (true);
