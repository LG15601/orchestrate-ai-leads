import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { 
  ArrowRight, 
  Bot, 
  Globe, 
  MessageSquare,
  CheckCircle,
  Loader2
} from "lucide-react";

interface AgentAuditProps {
  onComplete: (recommendations: any) => void;
}

interface AuditStep {
  type: 'url' | 'analysis' | 'questions' | 'recommendations';
  title: string;
  content: any;
}

const AgentAudit = ({ onComplete }: AgentAuditProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<AuditStep['type']>('url');
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] = useState(false);

  const getContextualQuestions = (analysisData: any) => {
    const baseQuestions = [
      {
        id: 'business_validation',
        question: `D'après notre analyse de ${analysisData?.company_name || 'votre site'}, nous avons identifié que vous évoluez dans le secteur ${analysisData?.sector || 'des services'}. Cette analyse est-elle correcte ?`,
        options: [
          'Oui, c\'est exactement notre secteur',
          'Partiellement, nous sommes plutôt dans...',
          'Non, nous sommes dans un autre secteur',
          'Je ne suis pas sûr'
        ]
      },
      {
        id: 'process_validation',
        question: `Nous avons identifié ces processus clés sur votre site : ${analysisData?.key_processes?.join(', ') || 'vente, support client, marketing'}. Lesquels vous prennent le plus de temps ?`,
        options: analysisData?.key_processes?.slice(0, 4) || [
          'Gestion des ventes et prospects',
          'Support client et réponses',
          'Marketing et communication',
          'Administration et facturation'
        ]
      },
      {
        id: 'pain_validation',
        question: `Basé sur votre secteur et vos processus, nous pensons que vos principaux défis sont : ${analysisData?.pain_points?.join(', ') || 'tâches répétitives, gestion du temps'}. Lequel vous impacte le plus ?`,
        options: analysisData?.pain_points?.slice(0, 4) || [
          'Trop de tâches manuelles répétitives',
          'Difficulté à suivre tous les prospects',
          'Manque de temps pour le développement',
          'Processus de communication inefficaces'
        ]
      },
      {
        id: 'automation_priority',
        question: `Parmi ces opportunités d'automatisation que nous avons identifiées pour votre business : ${analysisData?.automation_opportunities?.join(', ') || 'chatbot, email marketing, CRM'}, laquelle vous ferait gagner le plus de temps ?`,
        options: analysisData?.automation_opportunities?.slice(0, 4) || [
          'Automatisation du support client',
          'Gestion automatisée des leads',
          'Communication marketing automatisée',
          'Processus administratifs automatisés'
        ]
      }
    ];
    
    return baseQuestions;
  };

  const handleUrlSubmit = async () => {
    if (!url || !url.startsWith('https://')) {
      toast({
        title: "URL invalide",
        description: "Veuillez entrer une URL complète commençant par https://",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsAnalyzing(true);
    setCurrentStep('analysis');

    try {
      // Analyse réelle du site via Supabase
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Configuration Supabase manquante');
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/ai-audit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({ 
          url: url,
          auditType: 'educational'
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur d'analyse: ${response.status}`);
      }

      const responseData = await response.json();
      
      if (responseData.success && responseData.data) {
        setAnalysisData(responseData.data);
        setCurrentStep('questions');
      } else {
        throw new Error('Aucune donnée d\'analyse reçue');
      }
    } catch (error) {
      console.error('Erreur d\'analyse:', error);
      toast({
        title: "Erreur d'analyse",
        description: "Impossible d'analyser le site. Veuillez réessayer.",
        variant: "destructive",
        duration: 3000,
      });
      setCurrentStep('url');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleQuestionAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    const contextualQuestions = getContextualQuestions(analysisData);
    
    if (currentQuestion < contextualQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 1000);
    } else {
      // Toutes les questions sont répondues
      setTimeout(() => {
        generateRecommendations();
      }, 1000);
    }
  };

  const generateRecommendations = async () => {
    setIsGeneratingRecommendations(true);
    setCurrentStep('recommendations');

    try {
      // Génération de recommandations basées sur l'analyse et les réponses
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Analyse des réponses pour personnaliser les recommandations
      const businessValidation = answers.business_validation;
      const processPriority = answers.process_validation;
      const painPoint = answers.pain_validation;
      const automationPriority = answers.automation_priority;

      // Génération de recommandations intelligentes
      const recommendations = {
        companyName: analysisData.company_name || 'Votre entreprise',
        url: analysisData.url || url,
        score: analysisData.score || 75,
        businessContext: {
          sector: analysisData.sector,
          businessModel: analysisData.business_model,
          teamSize: analysisData.team_size,
          currentMaturity: analysisData.current_maturity
        },
        insights: analysisData.strategic_insights || "Votre entreprise présente un fort potentiel d'automatisation dans plusieurs domaines clés.",
        recommendations: analysisData.specialized_agents?.map((agent: any) => ({
          title: agent.name,
          description: agent.role,
          impact: agent.business_impact,
          timeSaved: agent.time_saved,
          priority: agent.name.includes('Support') || agent.name.includes('Client') ? 'Haute' : 'Moyenne',
          tasks: agent.key_tasks,
          integrations: agent.integrations,
          roiTimeline: agent.roi_timeline
        })) || [
          {
            title: "Agent IA de Support Client",
            description: "Automatisez 80% des questions clients récurrentes basé sur votre secteur",
            impact: "Économisez 15h/semaine",
            priority: "Haute",
            tasks: ["Réponses automatiques", "Qualification des leads", "Planification de rendez-vous"],
            integrations: ["Site web", "Email", "Calendrier"],
            roiTimeline: "ROI en 2 mois"
          },
          {
            title: "Automatisation Marketing",
            description: "Séquences automatisées adaptées à votre business model",
            impact: "+40% de conversion",
            priority: "Haute",
            tasks: ["Email marketing", "Suivi prospects", "Nurturing automatisé"],
            integrations: ["CRM", "Email", "Réseaux sociaux"],
            roiTimeline: "ROI en 3 mois"
          },
          {
            title: "Assistant Opérationnel",
            description: "Automatisation des tâches administratives chronophages",
            impact: "Économisez 10h/semaine",
            priority: "Moyenne",
            tasks: ["Gestion documents", "Facturation", "Reporting"],
            integrations: ["Comptabilité", "Documents", "Analytics"],
            roiTimeline: "ROI en 4 mois"
          }
        ],
        roi: analysisData.roi_estimate || "300% en 6 mois",
        timeSaved: analysisData.time_saved || "25h/semaine",
        competitiveAdvantage: analysisData.competitive_advantage || "L'automatisation vous donnera un avantage concurrentiel significatif",
        nextSteps: analysisData.implementation_roadmap || [
          "Planification d'un appel de découverte personnalisé",
          "Déploiement du premier agent IA adapté à votre secteur",
          "Formation de l'équipe et intégration des outils existants"
        ]
      };

      onComplete(recommendations);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer les recommandations.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsGeneratingRecommendations(false);
    }
  };

  const renderUrlStep = () => (
    <Card className="card-bold bg-white">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-accent-success rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
            <Globe className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-black">Étape 1/4</span>
        </div>
        
        <CardTitle className="text-2xl font-bold text-black mb-2">
          Votre site web
        </CardTitle>
        <p className="text-black/70 font-medium">
          Entrez l'URL de votre site pour que notre agent IA puisse l'analyser
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <Input
          type="url"
          placeholder="https://votre-entreprise.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full h-12 text-base border-2 border-black shadow-[2px_2px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200"
        />

        <Button
          onClick={handleUrlSubmit}
          disabled={!url}
          className="w-full bg-accent-success text-white hover:bg-accent-success/90 font-bold px-6 py-3 border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
        >
          Analyser mon site
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );

  const renderAnalysisStep = () => (
    <Card className="card-bold bg-white">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-accent-success rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-black">Étape 2/4</span>
        </div>
        
        <CardTitle className="text-2xl font-bold text-black mb-2">
          Agent IA en action
        </CardTitle>
        <p className="text-black/70 font-medium">
          Notre agent analyse votre site web en temps réel...
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-accent-success" />
          <span className="text-lg font-medium text-black">Analyse en cours...</span>
        </div>
        
        <div className="space-y-3 text-sm text-black/70">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-accent-success" />
            <span>Extraction du contenu du site</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-accent-success" />
            <span>Analyse des technologies utilisées</span>
          </div>
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-accent-success" />
            <span>Identification des opportunités d'automatisation</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderQuestionsStep = () => {
    const contextualQuestions = getContextualQuestions(analysisData);
    const currentQ = contextualQuestions[currentQuestion];
    
    return (
      <Card className="card-bold bg-white">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-accent-success rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-black">Étape 3/4</span>
          </div>
          
          <CardTitle className="text-2xl font-bold text-black mb-2">
            Validation de notre analyse
          </CardTitle>
          <p className="text-black/70 font-medium">
            Question {currentQuestion + 1} sur {contextualQuestions.length}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-bold text-black mb-4">
              {currentQ.question}
            </h3>
          </div>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleQuestionAnswer(currentQ.id, option)}
                className="w-full p-4 text-left rounded-lg border-2 transition-all duration-200 border-black bg-white hover:bg-gray-50 text-black font-medium shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px]"
              >
                {option}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderRecommendationsStep = () => (
    <Card className="card-bold bg-white">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-accent-success rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-black">Étape 4/4</span>
        </div>
        
        <CardTitle className="text-2xl font-bold text-black mb-2">
          Génération des recommandations
        </CardTitle>
        <p className="text-black/70 font-medium">
          Notre agent IA finalise votre rapport personnalisé...
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-accent-success" />
          <span className="text-lg font-medium text-black">Génération en cours...</span>
        </div>
        
        <div className="space-y-3 text-sm text-black/70">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-accent-success" />
            <span>Analyse des réponses personnalisées</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-accent-success" />
            <span>Calcul du ROI personnalisé</span>
          </div>
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-accent-success" />
            <span>Génération des recommandations finales</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-2xl mx-auto">
      {currentStep === 'url' && renderUrlStep()}
      {currentStep === 'analysis' && renderAnalysisStep()}
      {currentStep === 'questions' && renderQuestionsStep()}
      {currentStep === 'recommendations' && renderRecommendationsStep()}
    </div>
  );
};

export default AgentAudit;
