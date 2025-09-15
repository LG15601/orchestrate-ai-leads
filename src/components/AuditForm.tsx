import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
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

const AuditForm = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [formStep, setFormStep] = useState<'url' | 'maturity' | 'email' | 'results'>('url');
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
    setFormStep('url');
    setMaturityData({
      currentAiUsage: '',
      currentAutomation: '',
      businessPriority: '',
      teamSize: ''
    });
    setUserEmail('');
    setFirstName('');
    setLastName('');
  };

  if (formStep === 'results') {
    if (auditResult) {
      const extractNumber = (str: string): number => {
        const match = str?.match(/(\d+)/);
        return match ? parseInt(match[1]) : 0;
      };

      return (
        <>
          <AuditSteps currentStep={4} />
          <section className="py-20 bg-background" id="audit-form">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto animate-fade-in">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 bg-accent-success text-white px-6 py-2 rounded-full font-bold text-sm mb-6 border-2 border-black shadow-[2px_2px_0px_#000000]">
                    <CheckCircle className="w-4 h-4" />
                    AUDIT TERMINÉ
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
                    Votre Rapport d'Audit <span className="text-accent-success">Personnalisé</span>
                  </h2>
                  <p className="text-xl text-black font-medium max-w-2xl mx-auto">
                    Analyse complète de <span className="font-bold text-accent-success">{auditResult.company_name || "votre entreprise"}</span> • Secteur: <span className="font-bold text-black">{auditResult.sector}</span>
                  </p>
                </div>

                {/* Section KPIs */}
                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                  <div className="card-bold bg-black text-white text-center hover:shadow-[6px_6px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
                    <div className="text-6xl font-bold mb-4">{auditResult.score}%</div>
                    <h3 className="text-xl font-bold mb-2 text-accent-warning">Score d'Automatisation</h3>
                    <p className="text-white/80 font-medium">
                      Potentiel d'amélioration identifié
                    </p>
                  </div>

                  <div className="card-bold bg-accent-success text-white text-center hover:shadow-[6px_6px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
                    <div className="text-6xl font-bold mb-4 flex items-center justify-center">
                      <TrendingUp className="w-12 h-12 mr-2" />
                      {auditResult.roi_estimate}
                    </div>
                    <h3 className="text-xl font-bold mb-2">ROI Estimé</h3>
                    <p className="text-white/80 font-medium">
                      Amélioration des marges
                    </p>
                  </div>

                  <div className="card-bold bg-accent-warning text-black text-center hover:shadow-[6px_6px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
                    <div className="text-6xl font-bold mb-4 flex items-center justify-center">
                      <Clock className="w-12 h-12 mr-2" />
                      {auditResult.time_saved}
                    </div>
                    <h3 className="text-xl font-bold mb-2">Temps Économisé</h3>
                    <p className="text-black/80 font-medium">
                      Par semaine avec l'automatisation
                    </p>
                  </div>
                </div>

                {/* Section Informations Entreprise */}
                <div className="card-bold bg-white mb-8">
                  <div className="bg-black text-white p-6 border-b-2 border-black">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      PROFIL DE VOTRE ENTREPRISE
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-background border-2 border-black p-4 rounded-lg shadow-[2px_2px_0px_#000000]">
                        <span className="font-bold text-black text-sm uppercase tracking-wide">Secteur</span>
                        <p className="text-black font-medium text-lg mt-1">{auditResult.sector}</p>
                      </div>
                      <div className="bg-background border-2 border-black p-4 rounded-lg shadow-[2px_2px_0px_#000000]">
                        <span className="font-bold text-black text-sm uppercase tracking-wide">Taille d'équipe</span>
                        <p className="text-black font-medium text-lg mt-1">{auditResult.team_size}</p>
                      </div>
                      <div className="bg-background border-2 border-black p-4 rounded-lg shadow-[2px_2px_0px_#000000]">
                        <span className="font-bold text-black text-sm uppercase tracking-wide">Technologies</span>
                        <p className="text-black font-medium text-lg mt-1">{auditResult.technologies?.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Pain Points */}
                <div className="card-bold bg-white mb-8">
                  <div className="bg-accent-orange text-white p-6 border-b-2 border-black">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      POINTS DE FRICTION IDENTIFIÉS
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid gap-4">
                      {auditResult.pain_points?.map((pain, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-accent-orange/10 border-2 border-accent-orange rounded-lg shadow-[2px_2px_0px_#000000]">
                          <X className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0 font-bold" />
                          <p className="text-black font-medium">{pain}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section Opportunités */}
                <div className="card-bold bg-white mb-8">
                  <div className="bg-accent-warning text-black p-6 border-b-2 border-black">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      OPPORTUNITÉS D'AUTOMATISATION
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid gap-4">
                      {auditResult.automation_opportunities?.map((opportunity, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-accent-success/10 border-2 border-accent-success rounded-lg shadow-[2px_2px_0px_#000000]">
                          <CheckCircle className="w-5 h-5 text-accent-success mt-0.5 flex-shrink-0 font-bold" />
                          <p className="text-black font-medium">{opportunity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section Agents Recommandés */}
                <div className="card-bold bg-white mb-8">
                  <div className="bg-accent-blue text-white p-6 border-b-2 border-black">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Bot className="w-5 h-5" />
                      AGENTS IA RECOMMANDÉS
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid gap-4">
                      {auditResult.priority_agents?.map((agent, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-accent-blue/10 border-2 border-accent-blue rounded-lg shadow-[2px_2px_0px_#000000]">
                          <Bot className="w-5 h-5 text-accent-blue mt-0.5 flex-shrink-0 font-bold" />
                          <p className="text-black font-medium">{agent}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section Roadmap */}
                <div className="card-bold bg-white mb-8">
                  <div className="bg-accent-purple text-white p-6 border-b-2 border-black">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      ROADMAP D'IMPLÉMENTATION
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {auditResult.implementation_roadmap?.map((phase, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 bg-accent-purple/10 border-2 border-accent-purple rounded-lg shadow-[2px_2px_0px_#000000]">
                          <div className="w-8 h-8 bg-accent-purple text-white rounded-full flex items-center justify-center text-sm font-bold border-2 border-black">
                            {index + 1}
                          </div>
                          <p className="text-black font-medium pt-1">{phase}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section Avantage Concurrentiel */}
                <div className="card-bold bg-white mb-8">
                  <div className="bg-accent-success text-white p-6 border-b-2 border-black">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      AVANTAGE CONCURRENTIEL
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-black font-medium text-lg leading-relaxed">{auditResult.competitive_advantage}</p>
                  </div>
                </div>

                {/* Call to Actions */}
                <div className="card-bold bg-black text-white p-8">
                  <h3 className="text-3xl font-bold mb-4 text-accent-warning">🚀 Prêt à transformer votre entreprise ?</h3>
                  <p className="mb-8 text-white font-medium text-lg">Obtenez votre stratégie d'automatisation complète et planifiez votre succès</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => window.open('https://cal.com/getrepeat', '_blank')}
                      className="bg-accent-warning text-black hover:bg-accent-warning/90 font-bold text-lg px-8 py-4 border-2 border-white shadow-[4px_4px_0px_#ffffff] hover:shadow-[6px_6px_0px_#ffffff] transform hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
                    >
                      📅 Réserver une Démo Gratuite
                    </Button>
                    <Button 
                      onClick={handleNewAnalysis}
                      className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-4 shadow-[4px_4px_0px_#ffffff] hover:shadow-[6px_6px_0px_#ffffff] transform hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
                    >
                      🔄 Nouvelle Analyse
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    }

    return (
      <>
        <AuditSteps currentStep={3} />
        <section className="py-20 bg-background" id="audit-form">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="card-bold p-12">
                <div className="mb-8">
                  <div className="w-20 h-20 mx-auto mb-6 bg-accent-warning rounded-full flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_#000000]">
                    <Clock className="w-10 h-10 text-black animate-pulse" />
                  </div>
                  <h3 className="text-3xl font-bold text-black mb-4">
                    Analyse en cours...
                  </h3>
                  <p className="text-black font-medium text-lg mb-8">
                    {currentStep}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-full bg-background border-2 border-black rounded-lg overflow-hidden shadow-[2px_2px_0px_#000000]">
                    <div 
                      className="h-4 bg-accent-success transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-black font-medium">
                    {progress}% terminé • Environ {Math.max(1, Math.ceil((100 - progress) / 20))} minute{Math.ceil((100 - progress) / 20) > 1 ? 's' : ''} restante{Math.ceil((100 - progress) / 20) > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
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
      <section className="py-20 bg-background" id="audit-form">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Prêt à transformer votre productivité ? Commencez ici.
              </h2>
              <p className="text-xl text-muted-foreground">
                Découvrez en 45 secondes combien d'heures vous pourriez économiser chaque mois
              </p>
            </div>

            <div className="card-bold p-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="website-url" className="block text-lg font-semibold text-foreground mb-3">
                    L'URL de votre site web
                  </label>
                  <Input
                    id="website-url"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="monsite.com ou https://www.monsite.com"
                    className="input-bold h-14 text-base"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    🔍 Notre IA analysera votre site pour comprendre votre métier
                  </p>
                </div>
                
                <Button 
                  onClick={handleUrlSubmit}
                  disabled={!url.trim()}
                  size="lg"
                  className="btn-bold-primary w-full h-14 text-lg"
                >
                  Continuer →
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    ✓ Analyse gratuite • ✓ Aucune inscription requise • ✓ Résultats personnalisés
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuditForm;