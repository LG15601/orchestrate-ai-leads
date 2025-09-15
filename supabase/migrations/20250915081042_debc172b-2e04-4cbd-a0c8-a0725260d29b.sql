-- Create audit_results table to store AI audit data
CREATE TABLE public.audit_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  company_name TEXT,
  sector TEXT,
  score INTEGER,
  analysis_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.audit_results ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a public audit tool)
CREATE POLICY "Anyone can view audit results" 
ON public.audit_results 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create audit results" 
ON public.audit_results 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_audit_results_updated_at
  BEFORE UPDATE ON public.audit_results
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for better performance
CREATE INDEX idx_audit_results_url ON public.audit_results(url);
CREATE INDEX idx_audit_results_created_at ON public.audit_results(created_at DESC);