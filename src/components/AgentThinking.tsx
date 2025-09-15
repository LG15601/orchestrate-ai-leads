import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Brain, Zap, Target, Users, Clock, TrendingUp } from "lucide-react";

interface AgentThinkingProps {
  currentStep: string;
  progress: number;
  isAnalyzing: boolean;
}

const thinkingSteps = [
  {
    id: 1,
    title: "Analyse du site web",
    description: "Extraction et analyse du contenu pour comprendre l'entreprise",
    icon: Brain,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Identification des postes",
    description: "Cartographie de tous les postes de travail de l'entreprise",
    icon: Users,
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "Analyse des tâches chronophages",
    description: "Identification des processus répétitifs et manuels",
    icon: Clock,
    color: "bg-orange-500"
  },
  {
    id: 4,
    title: "Recommandations d'agents IA",
    description: "Sélection des agents IA spécialisés pour chaque poste",
    icon: Bot,
    color: "bg-purple-500"
  },
  {
    id: 5,
    title: "Calcul du ROI",
    description: "Estimation des gains de temps et d'efficacité",
    icon: TrendingUp,
    color: "bg-emerald-500"
  },
  {
    id: 6,
    title: "Roadmap d'implémentation",
    description: "Planification des phases d'automatisation",
    icon: Target,
    color: "bg-red-500"
  }
];

const thinkingMessages = [
  "🔍 Je scrute votre site web pour comprendre votre activité...",
  "👥 J'identifie tous les postes de travail dans votre entreprise...",
  "⏰ J'analyse les tâches chronophages qui peuvent être automatisées...",
  "🤖 Je sélectionne les agents IA spécialisés pour chaque poste...",
  "📊 Je calcule le potentiel d'économies et le ROI...",
  "🗺️ Je prépare votre roadmap d'automatisation personnalisée..."
];

export const AgentThinking = ({ currentStep, progress, isAnalyzing }: AgentThinkingProps) => {
  const [currentThinkingStep, setCurrentThinkingStep] = useState(0);
  const [thinkingText, setThinkingText] = useState("");
  const [showThinking, setShowThinking] = useState(false);

  useEffect(() => {
    if (isAnalyzing) {
      setShowThinking(true);
      const stepIndex = Math.floor((progress / 100) * thinkingSteps.length);
      setCurrentThinkingStep(Math.min(stepIndex, thinkingSteps.length - 1));
      
      // Animation du texte de réflexion
      const message = thinkingMessages[currentThinkingStep] || thinkingMessages[0];
      let i = 0;
      setThinkingText("");
      
      const typeWriter = setInterval(() => {
        if (i < message.length) {
          setThinkingText(message.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeWriter);
        }
      }, 50);

      return () => clearInterval(typeWriter);
    } else {
      setShowThinking(false);
    }
  }, [progress, isAnalyzing, currentThinkingStep]);

  if (!showThinking) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* En-tête de l'agent */}
      <Card className="border-2 border-black shadow-[4px_4px_0px_#000000] bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-black">Agent IA Expert</h3>
              <p className="text-gray-600 font-medium">Analyse en cours de votre entreprise</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Barre de progression */}
      <Card className="border-2 border-black shadow-[4px_4px_0px_#000000]">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-black">Progression de l'analyse</span>
              <Badge variant="outline" className="border-2 border-black">
                {progress}%
              </Badge>
            </div>
            <div className="w-full bg-gray-200 border-2 border-black rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 font-medium">
              {currentStep}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Réflexion de l'agent */}
      <Card className="border-2 border-black shadow-[4px_4px_0px_#000000] bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-black mb-2">Réflexion de l'agent IA</h4>
              <div className="bg-white border-2 border-black rounded-lg p-4 shadow-[2px_2px_0px_#000000]">
                <p className="text-black font-medium">
                  {thinkingText}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Étapes de l'analyse */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {thinkingSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentThinkingStep;
          const isCurrent = index === currentThinkingStep;
          
          return (
            <Card 
              key={step.id}
              className={`border-2 border-black shadow-[2px_2px_0px_#000000] transition-all duration-300 ${
                isActive 
                  ? 'bg-white scale-105' 
                  : 'bg-gray-100 opacity-60'
              } ${isCurrent ? 'ring-2 ring-blue-500' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-black ${
                    isActive ? step.color : 'bg-gray-400'
                  }`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h5 className={`font-bold text-sm ${isActive ? 'text-black' : 'text-gray-500'}`}>
                      {step.title}
                    </h5>
                    <p className={`text-xs ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                      {step.description}
                    </p>
                  </div>
                  {isActive && (
                    <div className="w-3 h-3 bg-green-500 rounded-full border border-black animate-pulse" />
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Message d'encouragement */}
      <Card className="border-2 border-black shadow-[4px_4px_0px_#000000] bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-green-600" />
            <span className="font-bold text-green-600">Analyse en cours</span>
          </div>
          <p className="text-black font-medium">
            Notre agent IA expert analyse votre entreprise pour identifier toutes les opportunités d'automatisation. 
            Cette analyse approfondie vous permettra de découvrir le vrai potentiel de vos équipes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
