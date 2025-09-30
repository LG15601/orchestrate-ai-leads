import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string;
  source: string;
  audit_result?: any;
  audit_score?: number;
  company_sector?: string;
  automation_opportunities?: string[];
  priority_agents?: string[];
  captured_at: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const leadData: LeadData = await req.json();
    
    // Validate required fields
    if (!leadData.firstName || !leadData.lastName || !leadData.email || !leadData.company) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check if lead already exists
    const { data: existingLead } = await supabase
      .from('leads')
      .select('id, email')
      .eq('email', leadData.email)
      .single();

    if (existingLead) {
      // Update existing lead with new audit data
      const { error: updateError } = await supabase
        .from('leads')
        .update({
          first_name: leadData.firstName,
          last_name: leadData.lastName,
          company: leadData.company,
          phone: leadData.phone || null,
          updated_at: new Date().toISOString(),
          // Store audit data as JSON in a separate field or table
          audit_data: leadData.audit_result,
          audit_score: leadData.audit_score,
          company_sector: leadData.company_sector,
          automation_opportunities: leadData.automation_opportunities,
          priority_agents: leadData.priority_agents
        })
        .eq('id', existingLead.id);

      if (updateError) {
        console.error('Error updating lead:', updateError);
        throw new Error('Failed to update lead');
      }

      return new Response(JSON.stringify({
        success: true,
        message: 'Lead updated successfully',
        leadId: existingLead.id
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create new lead
    const { data: newLead, error: insertError } = await supabase
      .from('leads')
      .insert({
        first_name: leadData.firstName,
        last_name: leadData.lastName,
        email: leadData.email,
        company: leadData.company,
        phone: leadData.phone || null,
        source: leadData.source,
        created_at: new Date().toISOString(),
        // Store audit data
        audit_data: leadData.audit_result,
        audit_score: leadData.audit_score,
        company_sector: leadData.company_sector,
        automation_opportunities: leadData.automation_opportunities,
        priority_agents: leadData.priority_agents
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting lead:', insertError);
      throw new Error('Failed to create lead');
    }

    // Log the lead capture for analytics
    console.log('New lead captured:', {
      id: newLead.id,
      email: newLead.email,
      company: newLead.company,
      audit_score: leadData.audit_score,
      source: leadData.source
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Lead captured successfully',
      leadId: newLead.id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in capture-lead function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});



