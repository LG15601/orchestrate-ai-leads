import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { TextualAnalysisResults } from "./TextualAnalysisResults";
import { 
  Globe, 
  Bot, 
  CheckCircle,
  Loader2,
  Brain
} from "lucide-react";

interface SimpleAuditFormProps {
  onComplete: (analysisData: any) => void;
}

const SimpleAuditForm = ({ onComplete }: SimpleAuditFormProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<'url' | 'analysis' | 'results'>('url');
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);

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
      // Analyse via Supabase
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
          auditType: 'textual'
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur d'analyse: ${response.status}`);
      }

      const responseData = await response.json();
      
      if (responseData.success && responseData.data) {
        setAnalysisData(responseData.data);
        
        toast({
          title: "🎉 Analyse terminée !",
          description: `Rapport d'analyse pour ${responseData.data.company_name || 'votre entreprise'} généré`,
          duration: 4000,
        });

        // Appeler onComplete avec les données d'analyse pour passer à l'étape de capture de leads
        onComplete(responseData.data);
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

  const handleNewAnalysis = () => {
    setAnalysisData(null);
    setCurrentStep('url');
    setUrl('');
  };

  const renderUrlStep = () => (
    <Card className="card-bold bg-white">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 bg-accent-success rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-bold text-black">ÉTAPE 1/2</span>
        </div>
        
        <CardTitle className="text-3xl font-bold text-black mb-3">
          Analyse Intelligente de votre Site
        </CardTitle>
        <p className="text-black/70 font-medium text-lg">
          Notre IA va analyser votre site web et générer un rapport détaillé avec des recommandations personnalisées
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <Input
          type="url"
          placeholder="https://votre-entreprise.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full h-14 text-lg border-2 border-black shadow-[2px_2px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200"
          autoFocus
        />

        <Button
          onClick={handleUrlSubmit}
          disabled={!url}
          className="w-full bg-accent-success text-white hover:bg-accent-success/90 font-bold text-lg px-8 py-4 border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
        >
          <Brain className="w-5 h-5 mr-2" />
          Générer mon Analyse IA
        </Button>
      </CardContent>
    </Card>
  );

  const renderAnalysisStep = () => (
    <Card className="card-bold bg-white">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 bg-accent-blue rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-bold text-black">ÉTAPE 2/2</span>
        </div>
        
        <CardTitle className="text-3xl font-bold text-black mb-3">
          IA en cours d'analyse...
        </CardTitle>
        <p className="text-black/70 font-medium text-lg">
          Notre intelligence artificielle analyse votre site web en profondeur
        </p>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="flex items-center justify-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-accent-blue" />
          <span className="text-xl font-bold text-black">Analyse en cours...</span>
        </div>
        
        <div className="space-y-4 text-base text-black/80">
          <div className="flex items-center gap-3 p-4 bg-accent-success/10 border border-accent-success rounded-lg">
            <CheckCircle className="w-5 h-5 text-accent-success" />
            <span className="font-medium">Extraction et analyse du contenu</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-accent-success/10 border border-accent-success rounded-lg">
            <CheckCircle className="w-5 h-5 text-accent-success" />
            <span className="font-medium">Identification du secteur et du modèle économique</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-accent-blue/10 border border-accent-blue rounded-lg">
            <Loader2 className="w-5 h-5 animate-spin text-accent-blue" />
            <span className="font-medium">Génération des recommandations personnalisées</span>
          </div>
        </div>

        <div className="bg-accent-warning/10 border-2 border-accent-warning rounded-lg p-6">
          <p className="text-black font-medium text-center">
            <Bot className="w-5 h-5 inline mr-2" />
            L'analyse peut prendre 30 secondes à 2 minutes selon la complexité de votre site
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-2xl mx-auto">
      {currentStep === 'url' && renderUrlStep()}
      {currentStep === 'analysis' && renderAnalysisStep()}
    </div>
  );
};

export default SimpleAuditForm;
