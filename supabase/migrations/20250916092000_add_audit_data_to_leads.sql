-- Add audit-related columns to leads table
ALTER TABLE public.leads 
ADD COLUMN audit_data jsonb,
ADD COLUMN audit_score integer,
ADD COLUMN company_sector text,
ADD COLUMN automation_opportunities text[],
ADD COLUMN priority_agents text[];

-- Create index on audit_score for filtering
CREATE INDEX idx_leads_audit_score ON public.leads(audit_score);

-- Create index on company_sector for analytics
CREATE INDEX idx_leads_company_sector ON public.leads(company_sector);

-- Create index on audit_data for JSON queries
CREATE INDEX idx_leads_audit_data ON public.leads USING GIN (audit_data);



