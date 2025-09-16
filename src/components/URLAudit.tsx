import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import AIAgentExplanation from "@/components/AIAgentExplanation";
import { 
  ArrowRight, 
  Bot, 
  Globe, 
  CheckCircle,
  Loader2,
  Building2,
  Users,
  TrendingUp,
  Clock,
  Target,
  Zap,
  BarChart3,
  FileText,
  MessageSquare,
  Calendar,
  Mail,
  ShoppingCart,
  Truck,
  Calculator,
  Megaphone,
  Shield,
  Lightbulb
} from "lucide-react";

interface URLAuditProps {
  onComplete: (recommendations: any) => void;
}

interface SectorAnalysis {
  sector: string;
  businessModel: string;
  teamSize: string;
  keyProcesses: string[];
  painPoints: string[];
  automationOpportunities: string[];
  specializedAgents: AgentRecommendation[];
  highValuePhases: HighValuePhase[];
  businessPoles: BusinessPole[];
}

interface AgentRecommendation {
  name: string;
  description: string;
  impact: string;
  timeSaved: string;
  priority: 'Haute' | 'Moyenne' | 'Faible';
  tasks: string[];
  integrations: string[];
  roiTimeline: string;
  pole: string;
}

interface HighValuePhase {
  phase: string;
  description: string;
  currentTime: string;
  aiAcceleration: string;
  valueAdded: string;
  agents: string[];
}

interface BusinessPole {
  name: string;
  icon: any;
  tasks: string[];
  automatableTasks: string[];
  agents: string[];
  timeSaved: string;
  impact: string;
}

const URLAudit = ({ onComplete }: URLAuditProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<'lead_capture' | 'url' | 'analysis' | 'results'>('lead_capture');
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<SectorAnalysis | null>(null);
  
  // Données du lead
  const [leadData, setLeadData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: ''
  });

  const businessPolesData: BusinessPole[] = [
    {
      name: "Administration",
      icon: FileText,
      tasks: [
        "Gestion des documents",
        "Planification des réunions",
        "Suivi des tâches",
        "Archivage des données",
        "Gestion des contrats",
        "Reporting administratif"
      ],
      automatableTasks: [
        "Classification automatique des documents",
        "Planification intelligente des réunions",
        "Suivi automatique des échéances",
        "Archivage automatique avec tags",
        "Extraction de données des contrats",
        "Génération automatique de rapports"
      ],
      agents: [
        "Agent IA Document Manager",
        "Agent IA Meeting Scheduler",
        "Agent IA Task Tracker",
        "Agent IA Report Generator"
      ],
      timeSaved: "15-25h/semaine",
      impact: "Réduction de 70% des tâches administratives"
    },
    {
      name: "Comptabilité",
      icon: Calculator,
      tasks: [
        "Saisie des factures",
        "Rapprochements bancaires",
        "Déclarations fiscales",
        "Suivi des paiements",
        "Gestion des relances",
        "Clôture mensuelle"
      ],
      automatableTasks: [
        "Saisie automatique des factures",
        "Rapprochement bancaire automatique",
        "Préparation des déclarations",
        "Suivi automatique des impayés",
        "Relances automatiques personnalisées",
        "Clôture automatisée avec contrôles"
      ],
      agents: [
        "Agent IA Invoice Processor",
        "Agent IA Bank Reconciliation",
        "Agent IA Tax Assistant",
        "Agent IA Payment Tracker"
      ],
      timeSaved: "20-30h/semaine",
      impact: "Réduction de 80% des erreurs comptables"
    },
    {
      name: "Marketing",
      icon: Megaphone,
      tasks: [
        "Création de contenu",
        "Gestion des campagnes",
        "Analyse des performances",
        "Gestion des leads",
        "SEO/SEM",
        "Réseaux sociaux"
      ],
      automatableTasks: [
        "Génération de contenu personnalisé",
        "Optimisation automatique des campagnes",
        "Analyse prédictive des performances",
        "Qualification automatique des leads",
        "Optimisation SEO automatique",
        "Gestion automatisée des réseaux sociaux"
      ],
      agents: [
        "Agent IA Content Creator",
        "Agent IA Campaign Optimizer",
        "Agent IA Lead Qualifier",
        "Agent IA SEO Assistant"
      ],
      timeSaved: "25-35h/semaine",
      impact: "Augmentation de 40% des conversions"
    },
    {
      name: "Commerce",
      icon: ShoppingCart,
      tasks: [
        "Gestion des prospects",
        "Négociation commerciale",
        "Suivi des ventes",
        "Gestion des clients",
        "Prévisions de ventes",
        "Formation commerciale"
      ],
      automatableTasks: [
        "Qualification automatique des prospects",
        "Assistance à la négociation",
        "Prédiction des ventes",
        "Service client automatisé",
        "Prévisions basées sur l'IA",
        "Formation personnalisée automatique"
      ],
      agents: [
        "Agent IA Sales Assistant",
        "Agent IA Lead Qualifier",
        "Agent IA Customer Success",
        "Agent IA Sales Predictor"
      ],
      timeSaved: "30-40h/semaine",
      impact: "Augmentation de 50% du chiffre d'affaires"
    },
    {
      name: "Finance",
      icon: BarChart3,
      tasks: [
        "Analyse financière",
        "Prévisions budgétaires",
        "Gestion des risques",
        "Reporting financier",
        "Audit interne",
        "Optimisation des coûts"
      ],
      automatableTasks: [
        "Analyse automatique des données financières",
        "Prévisions budgétaires prédictives",
        "Détection automatique des risques",
        "Reporting financier automatisé",
        "Audit continu automatisé",
        "Optimisation automatique des coûts"
      ],
      agents: [
        "Agent IA Financial Analyst",
        "Agent IA Risk Manager",
        "Agent IA Budget Optimizer",
        "Agent IA Audit Assistant"
      ],
      timeSaved: "20-30h/semaine",
      impact: "Amélioration de 60% de la précision financière"
    },
    {
      name: "Logistique",
      icon: Truck,
      tasks: [
        "Gestion des stocks",
        "Planification des livraisons",
        "Optimisation des routes",
        "Gestion des fournisseurs",
        "Suivi des commandes",
        "Gestion des retours"
      ],
      automatableTasks: [
        "Prédiction automatique des stocks",
        "Optimisation automatique des livraisons",
        "Planification intelligente des routes",
        "Gestion automatisée des fournisseurs",
        "Suivi en temps réel des commandes",
        "Gestion automatisée des retours"
      ],
      agents: [
        "Agent IA Inventory Manager",
        "Agent IA Route Optimizer",
        "Agent IA Supplier Manager",
        "Agent IA Delivery Tracker"
      ],
      timeSaved: "25-35h/semaine",
      impact: "Réduction de 30% des coûts logistiques"
    },
    {
      name: "Ressources Humaines",
      icon: Users,
      tasks: [
        "Recrutement",
        "Formation",
        "Gestion des performances",
        "Paie et avantages",
        "Conformité RH",
        "Développement des talents"
      ],
      automatableTasks: [
        "Screening automatique des CV",
        "Formation personnalisée automatique",
        "Évaluation automatique des performances",
        "Calcul automatique de la paie",
        "Veille réglementaire automatique",
        "Plan de carrière personnalisé"
      ],
      agents: [
        "Agent IA Recruiter",
        "Agent IA Training Assistant",
        "Agent IA Performance Manager",
        "Agent IA Payroll Assistant"
      ],
      timeSaved: "20-30h/semaine",
      impact: "Amélioration de 45% de l'efficacité RH"
    },
    {
      name: "Support Client",
      icon: MessageSquare,
      tasks: [
        "Réponses aux questions",
        "Résolution des problèmes",
        "Gestion des réclamations",
        "Formation des clients",
        "Suivi de satisfaction",
        "Escalade des tickets"
      ],
      automatableTasks: [
        "Réponses automatiques intelligentes",
        "Diagnostic automatique des problèmes",
        "Gestion automatisée des réclamations",
        "Formation interactive automatique",
        "Mesure automatique de satisfaction",
        "Routage intelligent des tickets"
      ],
      agents: [
        "Agent IA Customer Support",
        "Agent IA Problem Solver",
        "Agent IA Satisfaction Tracker",
        "Agent IA Ticket Router"
      ],
      timeSaved: "35-45h/semaine",
      impact: "Amélioration de 70% du temps de réponse"
    }
  ];

  const highValuePhasesData: HighValuePhase[] = [
    {
      phase: "Acquisition de Prospects",
      description: "Phase critique de génération et qualification des leads",
      currentTime: "15-20h/semaine",
      aiAcceleration: "Réduction de 80% du temps",
      valueAdded: "Augmentation de 60% des conversions qualifiées",
      agents: ["Agent IA Lead Generator", "Agent IA Prospect Qualifier", "Agent IA Nurturing Assistant"]
    },
    {
      phase: "Négociation Commerciale",
      description: "Phase de conversion des prospects en clients",
      currentTime: "20-25h/semaine",
      aiAcceleration: "Assistance en temps réel",
      valueAdded: "Augmentation de 40% du taux de conversion",
      agents: ["Agent IA Sales Coach", "Agent IA Objection Handler", "Agent IA Deal Closer"]
    },
    {
      phase: "Service Client Premium",
      description: "Phase de satisfaction et fidélisation client",
      currentTime: "25-30h/semaine",
      aiAcceleration: "Réponse instantanée 24/7",
      valueAdded: "Amélioration de 50% de la satisfaction client",
      agents: ["Agent IA Customer Success", "Agent IA Proactive Support", "Agent IA Retention Manager"]
    },
    {
      phase: "Analyse Prédictive",
      description: "Phase d'anticipation des besoins et tendances",
      currentTime: "10-15h/semaine",
      aiAcceleration: "Analyse continue en temps réel",
      valueAdded: "Anticipation de 70% des opportunités",
      agents: ["Agent IA Trend Analyzer", "Agent IA Predictive Modeler", "Agent IA Opportunity Detector"]
    },
    {
      phase: "Optimisation Opérationnelle",
      description: "Phase d'amélioration continue des processus",
      currentTime: "15-20h/semaine",
      aiAcceleration: "Optimisation automatique continue",
      valueAdded: "Réduction de 35% des coûts opérationnels",
      agents: ["Agent IA Process Optimizer", "Agent IA Cost Reducer", "Agent IA Efficiency Tracker"]
    }
  ];

  const saveLeadToSupabase = async (leadData: any) => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Configuration Supabase manquante pour la sauvegarde du lead');
        return;
      }

      const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'apikey': supabaseAnonKey
        },
        body: JSON.stringify({
          first_name: leadData.firstName,
          last_name: leadData.lastName,
          email: leadData.email,
          company: leadData.company,
          source: 'url_audit',
          created_at: new Date().toISOString()
        })
      });

      if (!response.ok) {
        console.warn('Erreur lors de la sauvegarde du lead:', response.status);
      }
    } catch (error) {
      console.warn('Erreur lors de la sauvegarde du lead:', error);
    }
  };

  const handleLeadSubmit = async () => {
    if (!leadData.firstName || !leadData.lastName || !leadData.email || !leadData.company) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadData.email)) {
      toast({
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Sauvegarder le lead
    await saveLeadToSupabase(leadData);
    
    setCurrentStep('url');
    toast({
      title: "✅ Informations enregistrées",
      description: "Maintenant, analysons votre site web",
      duration: 3000,
    });
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
      // Appel réel à l'API Supabase pour l'analyse
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
          auditType: 'url_audit'
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur d'analyse: ${response.status}`);
      }

      const responseData = await response.json();
      
      if (responseData.success && responseData.data) {
        // Transformation des données de l'API vers le format du composant
        const apiData = responseData.data;
        
        const personalizedAnalysis: SectorAnalysis = {
          sector: apiData.sector || "Services",
          businessModel: apiData.business_model || "B2B",
          teamSize: apiData.team_size || "10-50 employés",
          keyProcesses: apiData.key_processes || [],
          painPoints: apiData.pain_points || [],
          automationOpportunities: apiData.automation_opportunities || [],
          specializedAgents: apiData.specialized_agents?.map((agent: any) => ({
            name: agent.name,
            description: agent.role || agent.description,
            impact: agent.business_impact,
            timeSaved: agent.time_saved,
            priority: agent.priority || "Moyenne",
            tasks: agent.key_tasks || [],
            integrations: agent.integrations || [],
            roiTimeline: agent.roi_timeline,
            pole: agent.pole || "Général"
          })) || [],
          highValuePhases: apiData.high_value_phases || highValuePhasesData,
          businessPoles: apiData.business_poles || businessPolesData
        };

        setAnalysisData(personalizedAnalysis);
        setCurrentStep('results');
        
        toast({
          title: "🎉 Analyse terminée !",
          description: `Audit personnalisé pour ${apiData.company_name || 'votre entreprise'} prêt`,
          duration: 4000,
        });
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

  const renderLeadCaptureStep = () => (
    <Card className="card-bold bg-white">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-accent-success rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
            <Users className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-black">Étape 1/3</span>
        </div>
        
        <CardTitle className="text-2xl font-bold text-black mb-2">
          Vos informations
        </CardTitle>
        <p className="text-black/70 font-medium">
          Quelques informations pour personnaliser votre audit et vous envoyer vos résultats
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Prénom"
            value={leadData.firstName}
            onChange={(e) => setLeadData(prev => ({ ...prev, firstName: e.target.value }))}
            className="h-12 text-base border-2 border-black shadow-[2px_2px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200"
          />
          <Input
            type="text"
            placeholder="Nom"
            value={leadData.lastName}
            onChange={(e) => setLeadData(prev => ({ ...prev, lastName: e.target.value }))}
            className="h-12 text-base border-2 border-black shadow-[2px_2px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200"
          />
        </div>
        
        <Input
          type="email"
          placeholder="Email professionnel"
          value={leadData.email}
          onChange={(e) => setLeadData(prev => ({ ...prev, email: e.target.value }))}
          className="h-12 text-base border-2 border-black shadow-[2px_2px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200"
        />
        
        <Input
          type="text"
          placeholder="Nom de votre entreprise"
          value={leadData.company}
          onChange={(e) => setLeadData(prev => ({ ...prev, company: e.target.value }))}
          className="h-12 text-base border-2 border-black shadow-[2px_2px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200"
        />

        <Button
          onClick={handleLeadSubmit}
          disabled={!leadData.firstName || !leadData.lastName || !leadData.email || !leadData.company}
          className="w-full bg-accent-success text-white hover:bg-accent-success/90 font-bold px-6 py-3 border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
        >
          Continuer vers l'analyse
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        
        <p className="text-xs text-gray-500 text-center">
          Vos informations sont sécurisées et ne seront utilisées que pour votre audit personnalisé
        </p>
      </CardContent>
    </Card>
  );

  const renderUrlStep = () => (
    <Card className="card-bold bg-white">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-accent-success rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
            <Globe className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-black">Étape 2/3</span>
        </div>
        
        <CardTitle className="text-2xl font-bold text-black mb-2">
          Analysez votre entreprise
        </CardTitle>
        <p className="text-black/70 font-medium">
          Entrez l'URL de votre site pour une analyse complète de vos processus et recommandations d'automatisation par pôles métier
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
          Analyser mon entreprise
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
          <span className="text-sm font-bold text-black">Étape 3/3</span>
        </div>
        
        <CardTitle className="text-2xl font-bold text-black mb-2">
          Agent IA OrchestraConnect en action
        </CardTitle>
        <p className="text-black/70 font-medium">
          Analyse complète de votre site web et identification des opportunités d'automatisation...
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
            <span>Extraction du contenu de {url}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-accent-success" />
            <span>Analyse des technologies et structure du site</span>
          </div>
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-accent-success" />
            <span>Identification du secteur d'activité et processus métier</span>
          </div>
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-accent-success" />
            <span>Mapping des 8 pôles métier et tâches automatisables</span>
          </div>
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-accent-success" />
            <span>Génération des recommandations d'agents IA personnalisés</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderResultsStep = () => {
    if (!analysisData) return null;

    return (
      <div className="space-y-8">
        {/* En-tête de l'analyse */}
        <Card className="card-bold bg-gradient-to-r from-accent-success to-accent-success/80 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold mb-2">
              🎯 Audit Personnalisé - {url}
            </CardTitle>
            <p className="text-white/90">
              Analyse détaillée basée sur votre site web avec recommandations d'automatisation par pôles métier
            </p>
            <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <p className="text-sm text-white/80">
                ✅ Site analysé en temps réel • ✅ Secteur d'activité identifié • ✅ Processus métier mappés
              </p>
            </div>
          </CardHeader>
        </Card>

        {/* Informations générales */}
        <Card className="card-bold bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black">
              <Building2 className="w-5 h-5" />
              Informations Extraites de votre Site
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-black">
                  <Target className="w-3 h-3 mr-1" />
                  {analysisData.sector}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-black">
                  <Users className="w-3 h-3 mr-1" />
                  {analysisData.teamSize}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-black">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {analysisData.businessModel}
                </Badge>
              </div>
            </div>
            
            {/* Processus identifiés sur le site */}
            {analysisData.keyProcesses.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-black mb-2">Processus identifiés sur votre site :</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisData.keyProcesses.map((process, index) => (
                    <Badge key={index} variant="outline" className="border-blue-500 text-blue-700">
                      {process}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Points de friction identifiés */}
            {analysisData.painPoints.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-black mb-2">Points de friction identifiés :</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisData.painPoints.map((pain, index) => (
                    <Badge key={index} variant="outline" className="border-red-500 text-red-700">
                      {pain}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Agents IA Recommandés */}
        <Card className="card-bold bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black">
              <Bot className="w-5 h-5" />
              Agents IA OrchestraConnect Recommandés
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysisData.specializedAgents.map((agent, index) => (
              <div key={index} className="border-2 border-black rounded-lg p-4 bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-black">{agent.name}</h3>
                    <p className="text-black/70 text-sm">{agent.description}</p>
                  </div>
                  <Badge 
                    variant={agent.priority === 'Haute' ? 'default' : agent.priority === 'Moyenne' ? 'secondary' : 'outline'}
                    className={agent.priority === 'Haute' ? 'bg-red-500' : agent.priority === 'Moyenne' ? 'bg-yellow-500' : 'bg-gray-500'}
                  >
                    {agent.priority}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent-success" />
                    <span className="text-sm font-medium text-black">Impact: {agent.impact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent-success" />
                    <span className="text-sm font-medium text-black">Temps économisé: {agent.timeSaved}</span>
                  </div>
                </div>
                <div className="mb-3">
                  <h4 className="font-medium text-black mb-2">Tâches automatisées:</h4>
                  <div className="flex flex-wrap gap-1">
                    {agent.tasks.map((task, taskIndex) => (
                      <Badge key={taskIndex} variant="outline" className="text-xs border-gray-300">
                        {task}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-black/70">Pôle: {agent.pole}</span>
                  </div>
                  <Badge variant="outline" className="border-green-500 text-green-700">
                    {agent.roiTimeline}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Phases à Forte Valeur Ajoutée */}
        <Card className="card-bold bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black">
              <Lightbulb className="w-5 h-5" />
              Phases à Forte Valeur Ajoutée - Boostées par l'IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysisData.highValuePhases.map((phase, index) => (
              <div key={index} className="border-2 border-black rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-black">{phase.phase}</h3>
                    <p className="text-black/70 text-sm">{phase.description}</p>
                  </div>
                  <Badge variant="outline" className="border-blue-500 text-blue-700">
                    Haute Valeur
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-black">Temps actuel: {phase.currentTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-black">Accélération IA: {phase.aiAcceleration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-black">Valeur ajoutée: {phase.valueAdded}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-black mb-2">Agents IA OrchestraConnect:</h4>
                  <div className="flex flex-wrap gap-1">
                    {phase.agents.map((agent, agentIndex) => (
                      <Badge key={agentIndex} variant="outline" className="text-xs border-blue-300 text-blue-700">
                        {agent}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Analyse par Pôles Métier */}
        <Card className="card-bold bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-black">
              <Users className="w-5 h-5" />
              Analyse Détaillée par Pôles Métier
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {analysisData.businessPoles.map((pole, index) => {
              const IconComponent = pole.icon;
              return (
                <div key={index} className="border-2 border-black rounded-lg p-6 bg-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-accent-success rounded-full flex items-center justify-center border-2 border-black">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-black">{pole.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-black/70">
                        <span>Temps économisé: {pole.timeSaved}</span>
                        <span>Impact: {pole.impact}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-black mb-2">Tâches Actuelles:</h4>
                      <div className="space-y-1">
                        {pole.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-center gap-2 text-sm text-black/70">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            {task}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-black mb-2">Tâches Automatisables:</h4>
                      <div className="space-y-1">
                        {pole.automatableTasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-center gap-2 text-sm text-green-700">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {task}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-black mb-2">Agents IA OrchestraConnect Spécialisés:</h4>
                    <div className="flex flex-wrap gap-2">
                      {pole.agents.map((agent, agentIndex) => (
                        <Badge key={agentIndex} variant="outline" className="border-accent-success text-accent-success">
                          {agent}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Explication des Agents IA */}
        <AIAgentExplanation 
          painPoints={analysisData.painPoints}
          sector={analysisData.sector}
          businessModel={analysisData.businessModel}
        />

        {/* Call to Action */}
        <Card className="card-bold bg-gradient-to-r from-accent-success to-accent-success/80 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold mb-2">
              🚀 Prêt à Transformer votre Entreprise ?
            </CardTitle>
            <p className="text-white/90 mb-4">
              Découvrez comment OrchestraConnect peut déployer ces agents IA spécialisés dans votre entreprise
            </p>
            <Button
              onClick={() => onComplete(analysisData)}
              className="bg-white text-accent-success hover:bg-gray-100 font-bold px-8 py-3 border-2 border-white shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
            >
              Découvrir OrchestraConnect
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardHeader>
        </Card>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {currentStep === 'lead_capture' && renderLeadCaptureStep()}
      {currentStep === 'url' && renderUrlStep()}
      {currentStep === 'analysis' && renderAnalysisStep()}
      {currentStep === 'results' && renderResultsStep()}
    </div>
  );
};

export default URLAudit;
