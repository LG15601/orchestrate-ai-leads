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
    Tu es un expert en automatisation d'entreprise avec 20+ ans d'expérience, spécialisé dans l'analyse des postes de travail et l'implémentation d'agents IA spécialisés. 

    MISSION: Analyser cette entreprise française pour identifier TOUS les postes de travail et déterminer quelles tâches chronophages peuvent être automatisées par des agents IA spécialisés.

    DONNÉES À ANALYSER:
    URL: ${url}
    DOMAIN: ${domain}
    CONTENU DU SITE: ${content.slice(0, 15000)}
    ${maturityContext}

    INSTRUCTIONS CRITIQUES:
    1. EXTRACT le nom exact de l'entreprise depuis le contenu (pas juste le domaine)
    2. IDENTIFIE tous les postes de travail possibles dans cette entreprise
    3. ANALYSE chaque tâche chronophage qui peut être automatisée
    4. RECOMMANDE des agents IA spécialisés pour chaque poste
    5. SOIS SPÉCIFIQUE à cette entreprise, pas générique
    6. RÉPONDS UNIQUEMENT EN FRANÇAIS

    FRAMEWORK D'ANALYSE DÉTAILLÉ:

    1. IDENTIFICATION DE L'ENTREPRISE:
    - Nom exact de l'entreprise
    - Secteur d'activité spécifique
    - Modèle économique (B2B, B2C, SaaS, etc.)
    - Taille estimée de l'équipe

    2. ANALYSE DES POSTES DE TRAVAIL:
    - Administration & Gestion
    - Commercial & Ventes  
    - Marketing & Communication
    - Service Client & Support
    - Production & Opérations
    - RH & Recrutement
    - Comptabilité & Finance
    - Technique & IT

    3. IDENTIFICATION DES TÂCHES CHRONOPHAGES:
    - Tâches répétitives quotidiennes
    - Processus manuels complexes
    - Gestion de données volumineuses
    - Communication client répétitive
    - Reporting et analyses

    4. RECOMMANDATIONS D'AGENTS IA SPÉCIALISÉS:
    - Agent Commercial IA (CRM, prospection, suivi)
    - Agent Marketing IA (campagnes, contenu, analytics)
    - Agent Service Client IA (chat, tickets, FAQ)
    - Agent Administratif IA (planning, documents, facturation)
    - Agent RH IA (recrutement, formation, évaluations)
    - Agent Analytics IA (rapports, KPIs, prédictions)

    RÉPONDS UNIQUEMENT EN JSON VALIDE (pas de markdown, pas de backticks):
    {
      "score": (0-100 potentiel d'automatisation),
      "company_name": "nom exact de l'entreprise extrait du contenu",
      "sector": "secteur d'activité spécifique",
      "team_size": "${maturityData?.teamSize || 'estimé depuis le contenu'}",
      "technologies": ["technologies détectées dans le contenu"],
      "job_positions": {
        "administration": ["postes administratifs identifiés"],
        "commercial": ["postes commerciaux identifiés"], 
        "marketing": ["postes marketing identifiés"],
        "service_client": ["postes service client identifiés"],
        "production": ["postes production identifiés"],
        "rh": ["postes RH identifiés"],
        "comptabilite": ["postes comptabilité identifiés"],
        "technique": ["postes techniques identifiés"]
      },
      "pain_points": ["5-7 points de friction spécifiques identifiés"],
      "time_consuming_tasks": ["8-10 tâches chronophages identifiées avec estimation temps/semaine"],
      "automation_opportunities": ["6-8 opportunités d'automatisation spécifiques avec agents IA recommandés"],
      "specialized_agents": [
        {
          "name": "Nom de l'agent IA",
          "role": "Rôle spécifique",
          "tasks": ["tâches automatisées"],
          "time_saved": "X heures/semaine",
          "integrations": ["outils connectés"]
        }
      ],
      "roi_estimate": "estimation réaliste % avec justification",
      "time_saved": "X-Y heures/semaine économisées",
      "analysis_summary": "Résumé personnalisé de 3 phrases sur les plus grandes opportunités d'automatisation",
      "competitive_advantage": "Comment l'automatisation les aiderait spécifiquement vs concurrents",
      "implementation_roadmap": [
        "Phase 1: Gains rapides - Agents IA prioritaires",
        "Phase 2: Automatisation cœur de métier", 
        "Phase 3: IA avancée et intégrations complètes"
      ],
      "risk_assessment": "Faible/Moyen/Élevé basé sur leur niveau actuel et taille équipe"
    }

    CRITIQUE: Sois spécifique à cette entreprise, utilise le contenu réel fourni, et concentre-toi sur les agents IA spécialisés, pas les chatbots génériques.
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
            content: 'Tu es un expert en automatisation d\'entreprise spécialisé dans l\'analyse des postes de travail et l\'implémentation d\'agents IA spécialisés. Tu analyses les entreprises françaises pour identifier tous les postes de travail et déterminer quelles tâches chronophages peuvent être automatisées. Tu fournis des audits détaillés avec des calculs ROI précis et des recommandations d\'agents IA spécialisés. Réponds uniquement en format JSON valide et en français.'
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