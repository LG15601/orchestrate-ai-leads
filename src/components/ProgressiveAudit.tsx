import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, 
  CheckCircle, 
  Building2, 
  Users, 
  Zap, 
  Target,
  Globe,
  Mail,
  User
} from "lucide-react";

interface ProgressiveAuditProps {
  onComplete: (data: any) => void;
  onStartAnalysis: () => void;
}

const ProgressiveAudit = ({ onComplete, onStartAnalysis }: ProgressiveAuditProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({
    url: '',
    companyName: '',
    teamSize: '',
    currentAiUsage: '',
    businessPriority: '',
    email: '',
    firstName: '',
    lastName: ''
  });

  const questions = [
    {
      id: 'url',
      title: 'Votre site web',
      description: 'Quelle est l\'URL de votre entreprise ?',
      icon: Globe,
      placeholder: 'https://votre-entreprise.com',
      type: 'url'
    },
    {
      id: 'companyName',
      title: 'Nom de votre entreprise',
      description: 'Comment s\'appelle votre entreprise ?',
      icon: Building2,
      placeholder: 'Mon Entreprise',
      type: 'text'
    },
    {
      id: 'teamSize',
      title: 'Taille de votre équipe',
      description: 'Combien de personnes travaillent dans votre entreprise ?',
      icon: Users,
      placeholder: 'Ex: 10-50 employés',
      type: 'select',
      options: ['1-5 employés', '6-20 employés', '21-50 employés', '51-200 employés', '200+ employés']
    },
    {
      id: 'currentAiUsage',
      title: 'Utilisation actuelle de l\'IA',
      description: 'Utilisez-vous déjà des outils d\'IA dans votre entreprise ?',
      icon: Zap,
      placeholder: 'Sélectionnez une option',
      type: 'select',
      options: ['Pas du tout', 'Quelques outils basiques', 'IA intégrée dans certains processus', 'IA avancée dans plusieurs domaines']
    },
    {
      id: 'businessPriority',
      title: 'Priorité business',
      description: 'Quel est votre objectif principal avec l\'automatisation ?',
      icon: Target,
      placeholder: 'Sélectionnez une option',
      type: 'select',
      options: ['Réduire les coûts', 'Augmenter la productivité', 'Améliorer la qualité', 'Accélérer la croissance', 'Automatiser les tâches répétitives']
    },
    {
      id: 'firstName',
      title: 'Votre prénom',
      description: 'Comment vous appelez-vous ?',
      icon: User,
      placeholder: 'Jean',
      type: 'text'
    },
    {
      id: 'lastName',
      title: 'Votre nom',
      description: 'Quel est votre nom de famille ?',
      icon: User,
      placeholder: 'Dupont',
      type: 'text'
    },
    {
      id: 'email',
      title: 'Votre email',
      description: 'Où pouvons-nous vous envoyer votre rapport d\'audit ?',
      icon: Mail,
      placeholder: 'jean.dupont@entreprise.com',
      type: 'email'
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Toutes les questions sont répondues
      onComplete(answers);
      onStartAnalysis();
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: value
    }));
  };

  const canProceed = () => {
    const currentAnswer = answers[currentQ.id as keyof typeof answers];
    return currentAnswer && currentAnswer.trim() !== '';
  };

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

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="card-bold bg-white">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-accent-success rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
              <currentQ.icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-black">
              Question {currentQuestion + 1} sur {questions.length}
            </span>
          </div>
          
          <Progress value={progress} className="w-full h-2 mb-4" />
          
          <CardTitle className="text-2xl font-bold text-black mb-2">
            {currentQ.title}
          </CardTitle>
          <p className="text-black/70 font-medium">
            {currentQ.description}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {currentQ.type === 'select' ? (
            <div className="space-y-3">
              {currentQ.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerChange(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    answers[currentQ.id as keyof typeof answers] === option
                      ? 'border-accent-success bg-accent-success/10 text-black font-bold shadow-[2px_2px_0px_#000000]'
                      : 'border-black bg-white hover:bg-gray-50 text-black font-medium shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <Input
              type={currentQ.type}
              placeholder={currentQ.placeholder}
              value={answers[currentQ.id as keyof typeof answers]}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="w-full h-12 text-base border-2 border-black shadow-[2px_2px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200"
            />
          )}

          <div className="flex justify-between items-center pt-4">
            <div className="text-sm text-black/60 font-medium">
              {currentQuestion > 0 && (
                <button
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  className="hover:text-accent-success transition-colors duration-200"
                >
                  ← Question précédente
                </button>
              )}
            </div>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-accent-success text-white hover:bg-accent-success/90 font-bold px-6 py-2 border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === questions.length - 1 ? 'Lancer l\'Audit' : 'Suivant'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressiveAudit;
