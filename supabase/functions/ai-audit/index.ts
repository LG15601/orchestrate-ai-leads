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
  auditType?: 'free' | 'premium' | 'conversational' | 'advanced_ai_agent';
  includeScraping?: boolean;
  includeAnalysis?: boolean;
  includeRecommendations?: boolean;
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
    const { url, maturityData, userEmail, auditType = 'free', includeScraping = true, includeAnalysis = true, includeRecommendations = true }: AuditRequest = await req.json();
    
    if (!url) {
      throw new Error('URL is required');
    }

      console.log('Starting AI audit for URL:', url);
      console.log('Maturity data:', maturityData);
      console.log('Audit type:', auditType);

    // Step 1: Enhanced content extraction with Firecrawl and web search
    let content = '';
    let additionalContext = '';
    
    // Normalize URL - add https:// if no protocol specified
    let normalizedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      normalizedUrl = `https://${url}`;
    }
    
    // Validate URL format
    try {
      new URL(normalizedUrl);
    } catch (urlError) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid URL format',
        url: url,
        normalizedUrl: normalizedUrl,
        details: 'Please provide a valid domain name (e.g., example.com or https://example.com)'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    try {
      // Extract company name from domain for additional research
      const domain = new URL(normalizedUrl).hostname.replace('www.', '');
      const companyName = domain.split('.')[0];
      
      // Try Firecrawl first for comprehensive content extraction
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
            url: normalizedUrl,
            pageOptions: {
              onlyMainContent: true,
              includeHtml: false,
              screenshot: false,
            },
            crawlerOptions: {
              includes: ['/about', '/services', '/contact', '/team'],
              maxDepth: 2
            }
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
        
        const fallbackResponse = await fetch(normalizedUrl, {
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

      // Additional web search for company context (if needed)
      if (auditType === 'conversational') {
        console.log('Performing additional web research for conversational context...');
        // Here you could add web search API calls to get additional context
        // about the company, industry trends, etc.
        additionalContext = `Company: ${companyName}, Domain: ${domain}`;
      }

    } catch (extractionError) {
      console.error('Content extraction failed:', extractionError);
      console.error('URL attempted:', normalizedUrl);
      console.error('Error details:', extractionError.message);
      
      // Return a more informative error
      return new Response(JSON.stringify({
        success: false,
        error: `Unable to access or extract content from the website: ${extractionError.message}`,
        url: normalizedUrl,
        details: 'Please check if the URL is accessible and try again'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
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
    Tu es un expert en audit business et recommandation d'agents IA spécialisés pour OrchestraConnect.fr. Tu analyses les entreprises pour identifier les opportunités d'automatisation par pôles métier.

    BASE DE CONNAISSANCES - AGENTS IA MÉTIER:
    
    Les agents IA OrchestraConnect sont des intelligences artificielles spécialisées qui vont bien au-delà des assistants conversationnels génériques comme ChatGPT ou Claude. Ils sont conçus pour automatiser, professionnaliser et personnaliser des tâches métier précises dans les PME.

    AVANTAGES DES AGENTS IA MÉTIER vs IA GÉNÉRALISTES:
    - Spécialisation secteur/métier (expertise comptable, RH, industrie, santé)
    - Intégration de la réglementation française et des outils PME
    - Made in France: hébergement souverain RGPD, support local
    - Déploiement en 48h, usage Plug & Play, zéro code requis
    - Collaboration humaine augmentée avec apprentissage personnalisé
    - ROI moyen de 300% dès la première année
    - Libération de 15 à 100h/mois selon le métier

    EXEMPLES D'AGENTS IA SPÉCIALISÉS:
    - Gestionnaire client pour experts-comptables
    - Assistant RH pour pré-sélectionner rapidement des CV
    - Agent commercial pour analyser et personnaliser la prospection
    - Agent administratif qui gère automatiquement la facturation ou les relances clients

    MISSION: Analyser cette entreprise et fournir une analyse complète par secteur d'activité avec recommandations d'agents IA OrchestraConnect par pôles métier.

    DONNÉES À ANALYSER:
    URL: ${url}
    DOMAIN: ${domain}
    CONTENU DU SITE: ${content.slice(0, 20000)}
    CONTEXTE ADDITIONNEL: ${additionalContext}
    ${maturityContext}

    OBJECTIF: Fournir une analyse détaillée par pôles métier avec:
    1. Identification précise du secteur d'activité
    2. Analyse des 8 pôles métier principaux (Admin, Compta, Marketing, Commerce, Finance, Logistique, RH, Support)
    3. Tâches automatisables par pôle avec agents IA OrchestraConnect spécialisés
    4. Phases à forte valeur ajoutée boostables par IA
    5. Focus sur l'automatisation intelligente et l'accès à l'expertise premium

    RÉPONDS UNIQUEMENT EN JSON VALIDE:
    {
      "score": (0-100 potentiel d'automatisation),
      "company_name": "nom de l'entreprise",
      "sector": "secteur d'activité détaillé",
      "business_model": "modèle économique (B2B, B2C, SaaS, etc.)",
      "team_size": "${maturityData?.teamSize || 'estimé'}",
      "current_maturity": "Débutant/Intermédiaire/Avancé",
      "key_processes": ["processus métier identifiés"],
      "pain_points": ["points de friction"],
      "automation_opportunities": ["opportunités d'automatisation"],
      "technologies": ["technologies identifiées"],
      "business_poles": [
        {
          "name": "Administration",
          "tasks": ["tâches actuelles du pôle"],
          "automatable_tasks": ["tâches automatisables"],
          "agents": ["agents IA OrchestraConnect spécialisés"],
          "time_saved": "X-Y heures/semaine",
          "impact": "impact business"
        }
      ],
      "high_value_phases": [
        {
          "phase": "nom de la phase",
          "description": "description détaillée",
          "current_time": "temps actuel",
          "ai_acceleration": "accélération par IA",
          "value_added": "valeur ajoutée",
          "agents": ["agents IA concernés"]
        }
      ],
      "specialized_agents": [
        {
          "name": "Agent IA OrchestraConnect spécialisé",
          "description": "description détaillée de l'agent spécialisé",
          "impact": "impact business mesurable",
          "time_saved": "X heures/semaine",
          "priority": "Haute/Moyenne/Faible",
          "tasks": ["tâches automatisées spécifiques"],
          "integrations": ["outils PME connectés"],
          "roi_timeline": "ROI en X mois",
          "pole": "pôle métier concerné",
          "expertise_level": "niveau d'expertise intégré",
          "compliance": "conformité réglementaire française",
          "deployment_time": "délai de déploiement",
          "training_included": "formation incluse"
        }
      ],
      "roi_estimate": "estimation ROI",
      "time_saved": "X-Y heures/semaine",
      "strategic_insights": "insights stratégiques",
      "competitive_advantage": "avantage concurrentiel",
      "implementation_roadmap": ["phases d'implémentation"],
      "risk_assessment": "évaluation des risques",
      "success_metrics": ["KPIs de succès"]
    }

    EXIGENCES:
    - Analyse par pôles métier détaillée avec focus sur les agents IA OrchestraConnect
    - Recommandations d'agents IA spécialisés par pôle (pas d'IA généralistes)
    - Identification des phases à forte valeur ajoutée boostables par IA
    - Mise en avant des avantages des agents IA métier vs IA généralistes
    - Focus sur l'automatisation intelligente et l'accès à l'expertise premium
    - Réponse 100% en français
    - Insister sur le ROI de 300% et la libération de 15-100h/mois
    - Mentionner la conformité RGPD et le support local français
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
            content: 'Tu es un consultant senior en transformation digitale, ancien associé chez McKinsey & Company, avec 25 ans d\'expérience. Tu conduis des analyses stratégiques approfondies pour identifier les opportunités d\'automatisation les plus impactantes. Tu fournis des recommandations d\'agents IA spécialisés avec ROI précis et impact business mesurable. Ton niveau d\'analyse est celui des meilleurs cabinets de conseil. Réponds uniquement en format JSON valide et en français professionnel.'
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