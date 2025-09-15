import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AuditRequest {
  url: string;
  maturityData?: {
    currentAiUsage: string;
    currentAutomation: string;
    businessPriority: string;
    teamSize: string;
  };
  userEmail?: string;
  auditType?: 'free' | 'premium';
}

interface AuditResult {
  score: number;
  company_name: string;
  sector: string;
  team_size: string;
  technologies: string[];
  pain_points: string[];
  automation_opportunities: string[];
  roi_estimate: string;
  time_saved: string;
  priority_agents: string[];
  analysis_summary: string;
  competitive_advantage: string;
  implementation_roadmap: string[];
  risk_assessment: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, maturityData, userEmail, auditType = 'free' }: AuditRequest = await req.json();
    
    if (!url) {
      throw new Error('URL is required');
    }

      console.log('Starting AI audit for URL:', url);
      console.log('Maturity data:', maturityData);
      console.log('Audit type:', auditType);

    // Step 1: Enhanced content extraction with fallback
    let content = '';
    
    try {
      // Try Firecrawl first
      const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
      
      if (firecrawlApiKey) {
        console.log('Attempting Firecrawl extraction...');
        
        const firecrawlResponse = await fetch('https://api.firecrawl.dev/v0/scrape', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${firecrawlApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: url,
            pageOptions: {
              onlyMainContent: true,
              includeHtml: false,
              screenshot: false,
            },
          }),
        });

        if (firecrawlResponse.ok) {
          const scrapedData = await firecrawlResponse.json();
          content = scrapedData.data?.content || scrapedData.data?.markdown || '';
          console.log('Firecrawl extraction successful, content length:', content.length);
        } else {
          console.log('Firecrawl failed, status:', firecrawlResponse.status);
        }
      }
      
      // Fallback to direct fetch if Firecrawl fails or no API key
      if (!content || content.length < 200) {
        console.log('Using fallback extraction method...');
        
        const fallbackResponse = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; BusinessAuditBot/1.0)',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          }
        });

        if (!fallbackResponse.ok) {
          throw new Error(`Failed to access website: ${fallbackResponse.status}`);
        }

        const html = await fallbackResponse.text();
        
        // Extract text content from HTML
        content = html
          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
          .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
          
        console.log('Fallback extraction successful, content length:', content.length);
      }

      if (!content || content.length < 100) {
        throw new Error('Unable to extract sufficient content from website');
      }

    } catch (extractionError) {
      console.error('Content extraction failed:', extractionError);
      throw new Error('Unable to access or extract content from the website');
    }

    // Step 2: Advanced AI Analysis with GPT-5 using maturity data
    const maturityContext = maturityData ? `
    CURRENT BUSINESS CONTEXT:
    - AI Usage: ${maturityData.currentAiUsage}
    - Automation Level: ${maturityData.currentAutomation}
    - Business Priority: ${maturityData.businessPriority}
    - Team Size: ${maturityData.teamSize}
    ` : '';

    // Extract company name and basic info from domain
    const domain = new URL(url).hostname.replace('www.', '');
    const domainParts = domain.split('.');
    const possibleCompanyName = domainParts[0];

    const analysisPrompt = `
    You are an elite business automation consultant with 20+ years of experience. Conduct a comprehensive, personalized audit of this website:

    WEBSITE URL: ${url}
    DOMAIN: ${domain}

    WEBSITE CONTENT:
    ${content.slice(0, 12000)}
    ${maturityContext}

    CRITICAL INSTRUCTIONS:
    1. EXTRACT the exact company name from the content (not just domain)
    2. IDENTIFY the specific business sector/industry from content and services offered
    3. PERSONALIZE recommendations based on current AI usage and automation level
    4. ADJUST complexity based on team size and business priority
    5. BE SPECIFIC to this business, not generic advice

    ANALYSIS FRAMEWORK:
    
    1. BUSINESS IDENTIFICATION:
    - Extract exact company name from website content
    - Identify primary business model (B2B, B2C, marketplace, SaaS, etc.)
    - Determine industry sector from services/products described
    
    2. CURRENT STATE ASSESSMENT:
    - Analyze existing automation level from content
    - Identify current technology stack from website
    - Assess digital maturity relative to industry standards
    
    3. PERSONALIZED OPPORTUNITIES:
    - Match automation opportunities to business priority (${maturityData?.businessPriority || 'efficiency'})
    - Scale recommendations to team size (${maturityData?.teamSize || 'unknown'})
    - Consider current AI usage level (${maturityData?.currentAiUsage || 'unknown'})
    
    4. SECTOR-SPECIFIC RECOMMENDATIONS:
    - Industry-standard automation benchmarks for this specific sector
    - Competitive advantage opportunities in this market
    - Compliance/regulatory considerations for this industry

    RESPOND WITH VALID JSON ONLY (no markdown, no backticks):
    {
      "score": (0-100 overall automation readiness),
      "company_name": "exact company name extracted from content",
      "sector": "specific industry vertical (e.g., E-commerce, SaaS, Consulting, Manufacturing, etc.)",
      "team_size": "${maturityData?.teamSize || 'estimated from content'}",
      "technologies": ["specific technologies detected in content"],
      "pain_points": ["3-5 specific pain points identified from this business context"],
      "automation_opportunities": ["5-7 personalized automation opportunities based on their current level and priority"],
      "roi_estimate": "realistic % range with reasoning for this specific business",
      "time_saved": "X-Y hours/week specific to their processes",
      "priority_agents": ["Top 3 AI agents most relevant to this specific business model and sector"],
      "analysis_summary": "Personalized 2-sentence insight about this specific company's biggest automation opportunity",
      "competitive_advantage": "How automation would specifically help them vs competitors in their sector",
      "implementation_roadmap": ["Phase 1: Quick wins for their priority", "Phase 2: Core automation", "Phase 3: Advanced AI"],
      "risk_assessment": "Low/Medium/High based on their current automation level and team size"
    }

    CRITICAL: Be specific to this business, not generic. Use the actual content and context provided.
    `;

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Starting AI analysis...');

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an elite business automation consultant specializing in AI implementation strategy. Provide detailed, sector-specific automation audits with precise ROI calculations and actionable recommendations. Respond only in valid JSON format.'
          },
          {
            role: 'user',
            content: analysisPrompt
          }
        ],
        max_completion_tokens: 2000,
      }),
    });

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const aiResult = await openaiResponse.json();
    const analysisText = aiResult.choices[0].message.content;

    console.log('AI analysis completed');

    // Parse JSON response with better error handling
    let auditResult: AuditResult;
    try {
      // Clean the response to handle markdown formatting
      let cleanedResponse = analysisText.trim();
      
      // Remove markdown code blocks if present
      if (cleanedResponse.startsWith('```json')) {
        cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedResponse.startsWith('```')) {
        cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      // Log the cleaned response for debugging
      console.log('Cleaned AI response for parsing:', cleanedResponse.slice(0, 500));
      
      auditResult = JSON.parse(cleanedResponse);
      console.log('Successfully parsed AI response');
      
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.log('Original AI response:', analysisText);
      
      // Enhanced fallback using available data
      const domain = new URL(url).hostname.replace('www.', '');
      const possibleCompanyName = domain.split('.')[0];
      
      // Use maturity data to create more personalized fallback
      const teamSize = maturityData?.teamSize || 'medium';
      const businessPriority = maturityData?.businessPriority || 'efficiency';
      const currentAiUsage = maturityData?.currentAiUsage || 'no';
      
      auditResult = {
        score: currentAiUsage === 'yes' ? 65 : currentAiUsage === 'unsure' ? 55 : 45,
        company_name: possibleCompanyName.charAt(0).toUpperCase() + possibleCompanyName.slice(1),
        sector: "Business Services", // Generic but will be improved with better parsing
        team_size: teamSize,
        technologies: ["Site Web", "CMS"],
        pain_points: businessPriority === 'efficiency' ? 
          ["Processus manuels chronophages", "Gestion des tâches répétitives", "Coordination d'équipe"] :
          businessPriority === 'growth' ?
          ["Acquisition clients", "Suivi prospects", "Scaling operations"] :
          ["Optimisation des coûts", "Automatisation processus", "Réduction temps de traitement"],
        automation_opportunities: teamSize === '1-5' ?
          ["Automatisation email marketing", "Chatbot simple", "Gestion calendrier automatisée"] :
          ["CRM automatisé", "Workflow complexes", "IA prédictive", "Automatisation complète"],
        roi_estimate: teamSize === '1-5' ? "25-45%" : "35-65%",
        time_saved: teamSize === '1-5' ? "10-20 heures" : "25-45 heures",
        priority_agents: currentAiUsage === 'yes' ?
          ["Assistant IA Avancé", "Automatisation Workflow", "Analytics Prédictif"] :
          ["Chatbot de Base", "Automatisation Email", "Assistant Scheduling"],
        analysis_summary: `Entreprise avec un potentiel d'automatisation adapté à une équipe ${teamSize} focalisée sur ${businessPriority}.`,
        competitive_advantage: "L'automatisation permettrait une efficacité accrue et une meilleure allocation des ressources",
        implementation_roadmap: ["Phase 1: Automatisations simples", "Phase 2: Integration système", "Phase 3: IA avancée"],
        risk_assessment: teamSize === '1-5' ? "Low" : "Medium"
      };
      
      console.log('Using enhanced personalized fallback based on maturity data');
    }

    // Step 3: Store result in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error: insertError } = await supabase
      .from('audit_results')
      .insert({
        url: url,
        company_name: auditResult.company_name,
        sector: auditResult.sector,
        score: auditResult.score,
        analysis_data: auditResult,
        created_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error('Error storing audit result:', insertError);
    }

    return new Response(JSON.stringify({
      success: true,
      data: auditResult
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-audit function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});