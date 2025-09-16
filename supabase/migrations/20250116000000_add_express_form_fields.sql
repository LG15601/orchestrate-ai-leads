-- Add fields for express form
ALTER TABLE public.leads 
ADD COLUMN needs text,
ADD COLUMN is_professional text,
ADD COLUMN siret text,
ADD COLUMN urgency text;

-- Create index on urgency for filtering
CREATE INDEX idx_leads_urgency ON public.leads(urgency);

-- Create index on is_professional for analytics
CREATE INDEX idx_leads_is_professional ON public.leads(is_professional);
