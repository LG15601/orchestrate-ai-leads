-- Create leads table for capturing user information
CREATE TABLE public.leads (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    company text NOT NULL,
    phone text,
    source text NOT NULL DEFAULT 'website',
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Create index on email for faster lookups
CREATE INDEX idx_leads_email ON public.leads(email);

-- Create index on source for analytics
CREATE INDEX idx_leads_source ON public.leads(source);

-- Create index on created_at for time-based queries
CREATE INDEX idx_leads_created_at ON public.leads(created_at);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for lead capture)
CREATE POLICY "Allow lead insertion" ON public.leads
    FOR INSERT WITH CHECK (true);

-- Create policy to allow reads for authenticated users (for admin)
CREATE POLICY "Allow authenticated reads" ON public.leads
    FOR SELECT USING (auth.role() = 'authenticated');

-- Add trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at 
    BEFORE UPDATE ON public.leads 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
