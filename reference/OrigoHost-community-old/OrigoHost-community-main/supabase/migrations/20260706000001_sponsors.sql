-- Create sponsor_applications table
CREATE TABLE sponsor_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Step 1: Company Information
    company_name TEXT NOT NULL,
    website TEXT NOT NULL,
    company_type TEXT,
    industry TEXT,
    company_size TEXT,
    gst_number TEXT,
    linkedin_company TEXT,
    headquarters TEXT,
    country TEXT,
    
    -- Step 2: Primary Contact
    contact_name TEXT NOT NULL,
    contact_designation TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    contact_linkedin TEXT,
    preferred_communication TEXT,
    
    -- Step 3: Partnership Interest
    interested_in TEXT[] DEFAULT '{}'::TEXT[],
    budget_range TEXT,
    timeline TEXT,
    goals TEXT[] DEFAULT '{}'::TEXT[],
    resources_provided TEXT[] DEFAULT '{}'::TEXT[],
    
    -- Step 4: Proposal Details
    detailed_message TEXT,
    special_requirements TEXT,
    expected_roi TEXT,
    previous_experience TEXT,
    
    -- Uploads (Storage URLs)
    logo_url TEXT,
    brand_kit_url TEXT,
    proposal_pdf_url TEXT,
    marketing_assets_url TEXT,
    
    -- Admin Tracking
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'approved', 'rejected')),
    assigned_to UUID REFERENCES auth.users(id),
    internal_notes TEXT
);

-- RLS Policies for sponsor_applications
ALTER TABLE sponsor_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (since it's a public form)
CREATE POLICY "Anyone can submit a sponsor application"
    ON sponsor_applications FOR INSERT
    WITH CHECK (true);

-- Allow admins to view all applications
-- (Assuming we use a similar admin check as other tables, or just check role)
CREATE POLICY "Admins can view sponsor applications"
    ON sponsor_applications FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.uid() = id 
            AND raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Allow admins to update applications
CREATE POLICY "Admins can update sponsor applications"
    ON sponsor_applications FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.uid() = id 
            AND raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Allow admins to delete applications
CREATE POLICY "Admins can delete sponsor applications"
    ON sponsor_applications FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.uid() = id 
            AND raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Create storage bucket for sponsor assets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('sponsor_assets', 'sponsor_assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies for sponsor_assets
-- Allow public uploads
CREATE POLICY "Anyone can upload sponsor assets" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'sponsor_assets' );

-- Allow public viewing of logos/pdfs
CREATE POLICY "Anyone can view sponsor assets" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'sponsor_assets' );

-- Allow admins to delete files
CREATE POLICY "Admins can delete sponsor assets" 
ON storage.objects FOR DELETE 
USING ( 
    bucket_id = 'sponsor_assets' AND 
    EXISTS (
        SELECT 1 FROM auth.users 
        WHERE auth.uid() = id 
        AND raw_user_meta_data->>'role' = 'admin'
    )
);
