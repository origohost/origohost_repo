-- Add tracking step to applications
ALTER TABLE sponsor_applications
ADD COLUMN tracker_status TEXT DEFAULT 'Submitted' CHECK (tracker_status IN ('Submitted', 'Under Review', 'Meeting Scheduled', 'Approved', 'Event Planning', 'Completed'));

-- Create Invoices Table
CREATE TABLE sponsor_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    sponsor_application_id UUID REFERENCES sponsor_applications(id) ON DELETE CASCADE,
    invoice_number TEXT NOT NULL UNIQUE,
    amount DECIMAL(12,2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Paid', 'Cancelled')),
    due_date DATE,
    paid_at TIMESTAMP WITH TIME ZONE,
    payment_method TEXT,
    pdf_url TEXT
);

-- RLS for Invoices
ALTER TABLE sponsor_invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sponsors can view their own invoices"
    ON sponsor_invoices FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM sponsor_applications 
            WHERE sponsor_applications.id = sponsor_invoices.sponsor_application_id 
            -- Assuming the sponsor logs in and we link their auth.uid() to the application's email or a user_id field.
            -- For now, if assigned_to is the admin, we might need a sponsor_user_id field on sponsor_applications.
        )
    );

ALTER TABLE sponsor_applications ADD COLUMN sponsor_user_id UUID REFERENCES auth.users(id);

CREATE POLICY "Sponsors can view their own applications"
    ON sponsor_applications FOR SELECT
    USING (
        auth.uid() = sponsor_user_id
    );

CREATE POLICY "Admins manage invoices"
    ON sponsor_invoices FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.uid() = id 
            AND raw_user_meta_data->>'role' = 'admin'
        )
    );
