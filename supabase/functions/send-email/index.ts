import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SendEmailRequest {
  to: string;
  subject: string;
  html: string;
  leadId?: string;
  templateType?: string;
  sequenceStep?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, html, leadId, templateType = 'custom', sequenceStep = 1 }: SendEmailRequest = await req.json();
    
    if (!to || !subject || !html) {
      throw new Error('Missing required fields: to, subject, html');
    }

    console.log('Sending email to:', to);
    console.log('Subject:', subject);

    // Send email via Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('Resend API key not configured');
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AgentConnect <contact@orchestraconnect.fr>',
        to: [to],
        subject: subject,
        html: html,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend API error:', errorText);
      throw new Error(`Resend API error: ${resendResponse.status}`);
    }

    const resendData = await resendResponse.json();
    console.log('Email sent successfully via Resend:', resendData);

    // Log email to database
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error: logError } = await supabase
      .from('email_logs')
      .insert({
        lead_id: leadId,
        email_address: to,
        subject: subject,
        template_type: templateType,
        sent_at: new Date().toISOString(),
        resend_id: resendData.id,
        status: 'sent',
        sequence_step: sequenceStep,
        metadata: {
          resend_data: resendData,
          html_length: html.length
        }
      });

    if (logError) {
      console.error('Error logging email:', logError);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Email sent successfully',
      resend_id: resendData.id,
      email_log_created: !logError
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in send-email function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});