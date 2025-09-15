-- Add new columns to audit_results table for enhanced audit
ALTER TABLE public.audit_results 
ADD COLUMN user_email text,
ADD COLUMN maturity_data jsonb,
ADD COLUMN audit_type text DEFAULT 'free',
ADD COLUMN automation_percentage integer,
ADD COLUMN hours_saved integer,
ADD COLUMN business_priority text,
ADD COLUMN team_size text,
ADD COLUMN current_ai_usage text,
ADD COLUMN current_automation text;