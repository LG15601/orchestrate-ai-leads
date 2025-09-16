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

  const questions = [
    {
      id: 'business_goal',
      question: 'Quel est votre objectif principal avec l\'automatisation ?',
      options: [
        'Réduire les coûts opérationnels',
        'Augmenter la productivité de l\'équipe',
        'Améliorer l\'expérience client',
        'Accélérer la croissance',
        'Automatiser les tâches répétitives'
      ]
    },
    {
      id: 'team_size',
      question: 'Combien de personnes travaillent dans votre entreprise ?',
      options: [
        '1-5 employés',
        '6-20 employés',
        '21-50 employés',
        '51-200 employés',
        '200+ employés'
      ]
    },
    {
      id: 'current_automation',
      question: 'Utilisez-vous déjà des outils d\'automatisation ?',
      options: [
        'Pas du tout',
        'Quelques outils basiques (email, calendrier)',
        'Automatisation partielle de certains processus',
        'Automatisation avancée dans plusieurs domaines'
      ]
    },
    {
      id: 'pain_points',
      question: 'Quel est votre plus gros défi actuel ?',
      options: [
        'Trop de tâches manuelles chronophages',
        'Difficulté à gérer la croissance',
        'Manque de visibilité sur les performances',
        'Processus inefficaces',
        'Ressources limitées'
      ]
    }
  ];

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
      // Simulation de l'analyse du site
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Données simulées basées sur l'URL
      const mockAnalysis = {
        url: url,
        companyName: url.split('//')[1]?.split('.')[0] || 'Entreprise',
        sector: 'Business Services',
        technologies: ['Site Web', 'CMS'],
        keyFeatures: ['Présentation entreprise', 'Services', 'Contact'],
        automationPotential: 75
      };

      setAnalysisData(mockAnalysis);
      setCurrentStep('questions');
    } catch (error) {
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
    
    if (currentQuestion < questions.length - 1) {
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
      // Simulation de génération de recommandations
      await new Promise(resolve => setTimeout(resolve, 2000));

      const recommendations = {
        companyName: analysisData.companyName,
        url: analysisData.url,
        score: analysisData.automationPotential,
        recommendations: [
          {
            title: "Agent IA de Support Client",
            description: "Automatisez 80% des questions clients récurrentes",
            impact: "Économisez 15h/semaine",
            priority: "Haute"
          },
          {
            title: "Automatisation Email Marketing",
            description: "Séquences automatisées pour la génération de leads",
            impact: "+40% de conversion",
            priority: "Haute"
          },
          {
            title: "Assistant de Planification",
            description: "Gestion automatique des rendez-vous et tâches",
            impact: "Économisez 10h/semaine",
            priority: "Moyenne"
          }
        ],
        roi: "300% en 6 mois",
        timeSaved: "25h/semaine",
        nextSteps: [
          "Planification d'un appel de découverte",
          "Déploiement du premier agent IA",
          "Formation de l'équipe"
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
    const currentQ = questions[currentQuestion];
    
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
            Questions personnalisées
          </CardTitle>
          <p className="text-black/70 font-medium">
            Question {currentQuestion + 1} sur {questions.length}
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
