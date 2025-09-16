-- Create email_logs table for tracking sent emails
CREATE TABLE public.email_logs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id uuid REFERENCES public.leads(id) ON DELETE CASCADE,
    email_address text NOT NULL,
    subject text NOT NULL,
    template_type text NOT NULL DEFAULT 'audit_report', -- audit_report, follow_up, sequence_1, etc.
    sent_at timestamp with time zone DEFAULT now(),
    resend_id text, -- ID from Resend service
    status text DEFAULT 'sent', -- sent, delivered, opened, clicked, bounced, failed
    opened_at timestamp with time zone,
    clicked_at timestamp with time zone,
    sequence_step integer DEFAULT 1, -- For email sequences
    metadata jsonb -- Store additional data from Resend
);

-- Create indexes
CREATE INDEX idx_email_logs_lead_id ON public.email_logs(lead_id);
CREATE INDEX idx_email_logs_sent_at ON public.email_logs(sent_at);
CREATE INDEX idx_email_logs_status ON public.email_logs(status);
CREATE INDEX idx_email_logs_template_type ON public.email_logs(template_type);
CREATE INDEX idx_email_logs_resend_id ON public.email_logs(resend_id);

-- Enable Row Level Security
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow reads for authenticated users (for admin)
CREATE POLICY "Allow authenticated reads" ON public.email_logs
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create policy to allow inserts (for email sending)
CREATE POLICY "Allow email log insertion" ON public.email_logs
    FOR INSERT WITH CHECK (true);

-- Create policy to allow updates (for status updates)
CREATE POLICY "Allow email log updates" ON public.email_logs
    FOR UPDATE WITH CHECK (true);

-- Create email_sequences table for managing email campaigns
CREATE TABLE public.email_sequences (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    description text,
    steps jsonb NOT NULL, -- Array of email templates and delays
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Create lead_sequences table to track which leads are in which sequences
CREATE TABLE public.lead_sequences (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id uuid REFERENCES public.leads(id) ON DELETE CASCADE,
    sequence_id uuid REFERENCES public.email_sequences(id) ON DELETE CASCADE,
    current_step integer DEFAULT 1,
    started_at timestamp with time zone DEFAULT now(),
    completed_at timestamp with time zone,
    paused_at timestamp with time zone,
    status text DEFAULT 'active' -- active, completed, paused, cancelled
);

-- Create indexes for sequences
CREATE INDEX idx_email_sequences_is_active ON public.email_sequences(is_active);
CREATE INDEX idx_lead_sequences_lead_id ON public.lead_sequences(lead_id);
CREATE INDEX idx_lead_sequences_sequence_id ON public.lead_sequences(sequence_id);
CREATE INDEX idx_lead_sequences_status ON public.lead_sequences(status);

-- Enable RLS for sequences
ALTER TABLE public.email_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_sequences ENABLE ROW LEVEL SECURITY;

-- Policies for sequences
CREATE POLICY "Allow authenticated reads" ON public.email_sequences
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated all" ON public.email_sequences
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated reads" ON public.lead_sequences
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated all" ON public.lead_sequences
    FOR ALL USING (auth.role() = 'authenticated');

-- Add trigger to update updated_at for sequences
CREATE TRIGGER update_email_sequences_updated_at 
    BEFORE UPDATE ON public.email_sequences 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default email sequences
INSERT INTO public.email_sequences (name, description, steps) VALUES 
(
    'Séquence de Bienvenue',
    'Séquence d\'introduction pour nouveaux leads avec audit',
    '[
        {
            "step": 1,
            "delay_hours": 0,
            "subject": "🎉 Votre audit AgentConnect est prêt !",
            "template": "welcome_audit",
            "description": "Email de bienvenue avec rapport d\'audit"
        },
        {
            "step": 2,
            "delay_hours": 48,
            "subject": "💡 3 façons d\'automatiser votre entreprise dès maintenant",
            "template": "automation_tips",
            "description": "Conseils personnalisés d\'automatisation"
        },
        {
            "step": 3,
            "delay_hours": 168,
            "subject": "🚀 Prêt à libérer 20h par semaine ?",
            "template": "roi_focus",
            "description": "Focus sur le ROI et invitation à la démo"
        }
    ]'::jsonb
),
(
    'Relance Prospects Chauds',
    'Séquence pour les leads avec score d\'audit élevé (>70%)',
    '[
        {
            "step": 1,
            "delay_hours": 24,
            "subject": "🎯 Votre potentiel d\'automatisation est exceptionnel",
            "template": "high_score_follow_up",
            "description": "Relance personnalisée pour scores élevés"
        },
        {
            "step": 2,
            "delay_hours": 72,
            "subject": "📅 Calendrier ouvert pour votre transformation IA",
            "template": "calendar_booking",
            "description": "Invitation directe à réserver un créneau"
        }
    ]'::jsonb
);
