import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { AgentThinking } from "@/components/AgentThinking";
import { ExpertAuditResults } from "@/components/ExpertAuditResults";
import { ProgressiveAudit } from "@/components/ProgressiveAudit";
import { 
  CheckCircle, 
  TrendingUp, 
  Clock, 
  Users, 
  Target, 
  AlertCircle, 
  Zap, 
  Calendar, 
  ArrowRight, 
  Star, 
  Download,
  Building2,
  AlertTriangle,
  X,
  Lightbulb,
  Bot
} from "lucide-react";
import MaturityQuestions from "./MaturityQuestions";
import AuditSteps from "./AuditSteps";
import ValueProposition from "./ValueProposition";
import { AgentThinking } from "./AgentThinking";
import { ExpertAuditResults } from "./ExpertAuditResults";
import ProgressiveAudit from "./ProgressiveAudit";

interface SpecializedAgent {
  name: string;
  business_impact: string;
  role: string;
  key_tasks: string[];
  time_saved: string;
  integrations: string[];
  roi_timeline: string;
}

interface AuditResult {
  score: number;
  company_name: string;
  sector: string;
  business_model: string;
  team_size: string;
  current_maturity: string;
  key_processes: string[];
  pain_points: string[];
  automation_opportunities: string[];
  specialized_agents: SpecializedAgent[];
  roi_estimate: string;
  time_saved: string;
  strategic_insights: string;
  competitive_advantage: string;
  implementation_roadmap: string[];
  risk_assessment: string;
  success_metrics: string[];
}

const AuditForm = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [formStep, setFormStep] = useState<'progressive' | 'analysis' | 'results'>('progressive');
  const [maturityData, setMaturityData] = useState({
    currentAiUsage: '',
    currentAutomation: '',
    businessPriority: '',
    teamSize: ''
  });
  const [userEmail, setUserEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [progressiveData, setProgressiveData] = useState<any>(null);

  const isValidUrl = (urlString: string): boolean => {
    try {
      if (urlString.includes('.') && urlString.length > 3) {
        return true;
      }
      new URL(urlString);
      return true;
    } catch (e) {
      return urlString.includes('.') && urlString.length > 3;
    }
  };

  const normalizeUrl = (urlString: string): string => {
    if (!urlString.startsWith('http://') && !urlString.startsWith('https://')) {
      return `https://${urlString}`;
    }
    return urlString;
  };

  const handleProgressiveComplete = (data: any) => {
    setProgressiveData(data);
    setUrl(normalizeUrl(data.url));
    setMaturityData({
      currentAiUsage: data.currentAiUsage,
      currentAutomation: '',
      businessPriority: data.businessPriority,
      teamSize: data.teamSize
    });
    setUserEmail(data.email);
    setFirstName(data.firstName);
    setLastName(data.lastName);
  };

  const handleStartAnalysis = async () => {
    console.log('handleStartAnalysis called, setting formStep to analysis');
    setFormStep('analysis');
    // Petit délai pour s'assurer que les states sont mis à jour
    setTimeout(async () => {
      console.log('Starting audit with data:', { url, maturityData, userEmail });
      await handleAuditSubmit();
    }, 100);
  };

  const handleUrlSubmit = () => {
    if (!isValidUrl(url)) {
      toast({
        title: "URL invalide",
        description: "Veuillez entrer une URL valide (ex: monsite.com)",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    setFormStep('maturity');
  };

  const handleMaturitySubmit = () => {
    const { currentAiUsage, currentAutomation, businessPriority, teamSize } = maturityData;
    if (!currentAiUsage || !currentAutomation || !businessPriority || !teamSize) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez répondre à toutes les questions pour continuer",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    setShowEmailForm(true);
    setFormStep('email');
  };

  const handleEmailSubmit = () => {
    if (!userEmail.trim() || !firstName.trim() || !lastName.trim()) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs pour continuer",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    setFormStep('results');
    setTimeout(() => handleAuditSubmit(), 1000);
  };

  const handleAuditSubmit = async () => {
    const normalizedUrl = normalizeUrl(url);
    
    setIsLoading(true);
    setProgress(0);
    setCurrentStep("Initialisation de l'analyse...");

    try {
      const steps = [
        { message: `Analyse de ${url}...`, progress: 15 },
        { message: "Compréhension de votre secteur d'activité...", progress: 30 },
        { message: "Identification des processus métier...", progress: 45 },
        { message: "Évaluation des opportunités d'automatisation...", progress: 65 },
        { message: "Calcul du ROI personnalisé...", progress: 80 },
        { message: "Génération de votre rapport sur-mesure...", progress: 95 }
      ];

      for (const step of steps) {
        setCurrentStep(step.message);
        setProgress(step.progress);
        await new Promise(resolve => setTimeout(resolve, 1800));
      }

      const { data, error } = await supabase.functions.invoke('ai-audit', {
        body: { 
          url: normalizedUrl,
          maturityData,
          userEmail,
          auditType: 'free'
        }
      });

      if (error) {
        console.error('Audit error:', error);
        throw new Error(error.message || 'Erreur lors de l\'audit');
      }

      setProgress(100);
      setCurrentStep("Audit terminé !");
      
      if (data?.data) {
        setAuditResult(data.data);
        setFormStep('results');
        toast({
          title: "🎉 Audit terminé !",
          description: "Votre rapport personnalisé est prêt",
          duration: 4000,
        });
      } else {
        throw new Error('Aucune donnée reçue de l\'audit');
      }
    } catch (error) {
      console.error('Error during audit:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de l'audit",
        variant: "destructive",
        duration: 5000,
      });
      setFormStep('email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setUrl("");
    setAuditResult(null);
    setProgress(0);
    setCurrentStep("");
    setFormStep('progressive');
    setMaturityData({
      currentAiUsage: '',
      currentAutomation: '',
      businessPriority: '',
      teamSize: ''
    });
    setUserEmail('');
    setFirstName('');
    setLastName('');
    setProgressiveData(null);
  };

  if (formStep === 'results') {
    if (auditResult) {
      return (
        <>
          <AuditSteps currentStep={4} />
          <section className="py-16 bg-background" id="audit-form">
            <div className="container mx-auto px-6">
              <ExpertAuditResults 
                auditResult={auditResult} 
                onNewAnalysis={handleNewAnalysis}
              />
            </div>
          </section>
        </>
      );
    }

    return (
      <>
        <AuditSteps currentStep={3} />
        <section className="py-16 bg-background" id="audit-form">
          <div className="container mx-auto px-6">
            <AgentThinking 
              currentStep={currentStep}
              progress={progress}
              isAnalyzing={isLoading}
            />
                  </div>
        </section>
      </>
    );
  }

  if (formStep === 'analysis') {
    console.log('Rendering analysis phase with:', { currentStep, progress, isLoading });
    return (
      <>
        <AuditSteps currentStep={3} />
        <section className="py-16 bg-background" id="audit-form">
          <div className="container mx-auto px-6">
            <AgentThinking 
              currentStep={currentStep}
              progress={progress}
              isAnalyzing={isLoading}
            />
          </div>
        </section>
      </>
    );
  }

  if (formStep === 'email') {
    return (
      <>
        <AuditSteps currentStep={3} />
        <section className="py-20 bg-background" id="audit-form">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-accent-success text-white px-6 py-2 rounded-full font-bold text-sm mb-6 border-2 border-black shadow-[2px_2px_0px_#000000]">
                  📧 AUDIT COMPLET
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
                  Recevez Votre Rapport <span className="text-accent-success">Personnalisé</span>
                </h2>
                <p className="text-black font-medium text-lg">
                  Entrez vos coordonnées pour recevoir l'analyse détaillée et accéder aux recommandations premium
                </p>
              </div>

              <div className="card-bold bg-white border-2 border-black shadow-[8px_8px_0px_#000000] p-8">
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-black font-bold text-sm uppercase tracking-wide">Prénom *</label>
                      <Input
                        placeholder="Jean"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="input-bold text-lg font-medium border-2 border-black shadow-[2px_2px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-black font-bold text-sm uppercase tracking-wide">Nom *</label>
                      <Input
                        placeholder="Dupont"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="input-bold text-lg font-medium border-2 border-black shadow-[2px_2px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-black font-bold text-sm uppercase tracking-wide">Email professionnel *</label>
                    <Input
                      type="email"
                      placeholder="jean.dupont@entreprise.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="input-bold text-lg font-medium border-2 border-black shadow-[2px_2px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] transition-all"
                    />
                  </div>
                  
                  <div className="bg-accent-success/10 border-2 border-accent-success rounded-lg p-6">
                    <div className="grid md:grid-cols-2 gap-4 text-sm font-medium text-black">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent-success rounded-full"></div>
                        <span>Rapport PDF personnalisé</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent-success rounded-full"></div>
                        <span>Roadmap d'implémentation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent-success rounded-full"></div>
                        <span>Calcul ROI précis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent-success rounded-full"></div>
                        <span>Templates d'automatisation</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleEmailSubmit}
                    disabled={!userEmail.trim() || !firstName.trim() || !lastName.trim()}
                    className="w-full bg-accent-success text-white hover:bg-accent-success/90 font-bold text-lg px-8 py-4 border-2 border-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] transform hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
                  >
                    🚀 RECEVOIR MON RAPPORT COMPLET
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (formStep === 'maturity') {
    return (
      <>
        <AuditSteps currentStep={2} />
        <section className="py-20 bg-background" id="audit-form">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <MaturityQuestions 
                maturityData={maturityData}
                setMaturityData={setMaturityData}
              />
              
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="btn-bold-secondary"
                  onClick={() => setFormStep('url')}
                >
                  ← Retour
                </Button>
                <Button 
                  size="lg" 
                  className="btn-bold-primary"
                  onClick={handleMaturitySubmit}
                >
                  Continuer →
                </Button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <AuditSteps currentStep={1} />
      <ValueProposition />
      <section className="py-16 bg-background" id="audit-form">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Prêt à transformer votre productivité ?
              </h2>
            <p className="text-base text-muted-foreground">
              Découvrez en 2 minutes combien d'heures vous pourriez économiser chaque mois
              </p>
            </div>

          <ProgressiveAudit 
            onComplete={handleProgressiveComplete}
            onStartAnalysis={handleStartAnalysis}
          />
        </div>
      </section>
    </>
  );
};

export default AuditForm;