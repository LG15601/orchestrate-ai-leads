import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Users, 
  Zap, 
  Target,
  ArrowRight,
  Star,
  Calendar,
  Phone,
  Mail,
  ExternalLink,
  Brain,
  Settings,
  BarChart3,
  Lightbulb,
  Rocket,
  Shield,
  Award,
  Globe,
  MessageSquare,
  FileText,
  Bot
} from "lucide-react";

interface Recommendation {
  title: string;
  description: string;
  impact: string;
  timeSaved: string;
  priority: string;
  tasks: string[];
  integrations: string[];
  roiTimeline: string;
  orchestraConnect?: boolean;
  category?: string;
}

interface Report {
  companyName: string;
  url: string;
  score: number;
  businessContext: {
    sector: string;
    businessModel: string;
    teamSize: string;
    currentMaturity: string;
  };
  insights: string;
  recommendations: Recommendation[];
  roi: string;
  timeSaved: string;
  competitiveAdvantage: string;
  nextSteps: string[];
  orchestraConnectBenefits?: string[];
}

interface OrchestraConnectRecommendationsProps {
  report: Report;
  onContact: () => void;
}

const OrchestraConnectRecommendations = ({ report, onContact }: OrchestraConnectRecommendationsProps) => {
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'haute':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'moyenne':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'basse':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'support client':
        return <MessageSquare className="w-4 h-4" />;
      case 'marketing':
        return <Target className="w-4 h-4" />;
      case 'opérations':
        return <Settings className="w-4 h-4" />;
      case 'ressources humaines':
        return <Users className="w-4 h-4" />;
      default:
        return <Bot className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'support client':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'marketing':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'opérations':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'ressources humaines':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header avec score et contexte */}
      <Card className="card-bold bg-gradient-to-r from-accent-success to-green-600 text-white">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-8 h-8" />
            <span className="text-lg font-bold">Rapport d'Audit IA OrchestraConnect</span>
          </div>
          <CardTitle className="text-3xl font-bold mb-2">
            {report.companyName}
          </CardTitle>
          <p className="text-lg opacity-90">
            Potentiel d'automatisation : <span className="font-bold">{report.score}%</span>
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white/20 rounded-lg p-4">
              <TrendingUp className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{report.roi}</div>
              <div className="text-sm opacity-90">ROI estimé</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <Clock className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{report.timeSaved}</div>
              <div className="text-sm opacity-90">Temps économisé</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <Zap className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{report.recommendations.length}</div>
              <div className="text-sm opacity-90">Agents recommandés</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contexte business */}
      <Card className="card-bold bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-black flex items-center gap-2">
            <Globe className="w-5 h-5 text-accent-success" />
            Contexte Business
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-black">Secteur :</span>
                <Badge variant="outline" className="border-black">
                  {report.businessContext.sector}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-black">Modèle économique :</span>
                <Badge variant="outline" className="border-black">
                  {report.businessContext.businessModel}
                </Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-black">Taille d'équipe :</span>
                <Badge variant="outline" className="border-black">
                  {report.businessContext.teamSize}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-black">Maturité actuelle :</span>
                <Badge variant="outline" className="border-black">
                  {report.businessContext.currentMaturity}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights stratégiques */}
      <Card className="card-bold bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-black flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-accent-success" />
            Insights Stratégiques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-black/80 leading-relaxed">{report.insights}</p>
          <div className="mt-4 p-4 bg-accent-success/10 rounded-lg border-2 border-accent-success/20">
            <p className="text-black font-medium">{report.competitiveAdvantage}</p>
          </div>
        </CardContent>
      </Card>

      {/* Recommandations d'agents IA */}
      <Card className="card-bold bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-black flex items-center gap-2">
            <Rocket className="w-5 h-5 text-accent-success" />
            Agents IA OrchestraConnect Recommandés
          </CardTitle>
          <p className="text-black/70">
            Sélectionnés spécifiquement pour votre secteur et vos processus
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {report.recommendations.map((recommendation, index) => (
              <Card 
                key={index}
                className={`card-bold bg-white border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200 cursor-pointer ${
                  selectedRecommendation === recommendation ? 'ring-2 ring-accent-success' : ''
                }`}
                onClick={() => setSelectedRecommendation(recommendation)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {recommendation.category && getCategoryIcon(recommendation.category)}
                      <Badge className={getCategoryColor(recommendation.category || '')}>
                        {recommendation.category}
                      </Badge>
                    </div>
                    <Badge className={getPriorityColor(recommendation.priority)}>
                      {recommendation.priority}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold text-black">
                    {recommendation.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-black/70 text-sm">{recommendation.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-accent-success" />
                      <span className="font-medium text-black">Impact :</span>
                      <span className="text-black/70">{recommendation.impact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-accent-success" />
                      <span className="font-medium text-black">Temps économisé :</span>
                      <span className="text-black/70">{recommendation.timeSaved}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-accent-success" />
                      <span className="font-medium text-black">ROI :</span>
                      <span className="text-black/70">{recommendation.roiTimeline}</span>
                    </div>
                  </div>

                  {recommendation.orchestraConnect && (
                    <div className="flex items-center gap-2 p-2 bg-accent-success/10 rounded-lg">
                      <Award className="w-4 h-4 text-accent-success" />
                      <span className="text-sm font-medium text-accent-success">
                        Agent OrchestraConnect
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Détail de la recommandation sélectionnée */}
      {selectedRecommendation && (
        <Card className="card-bold bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black flex items-center gap-2">
              <Target className="w-5 h-5 text-accent-success" />
              Détail de l'Agent IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-black mb-3">Tâches automatisées :</h4>
                <ul className="space-y-2">
                  {selectedRecommendation.tasks.map((task, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-accent-success" />
                      <span className="text-black/80">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-black mb-3">Intégrations :</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRecommendation.integrations.map((integration, index) => (
                    <Badge key={index} variant="outline" className="border-black">
                      {integration}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Avantages OrchestraConnect */}
      {report.orchestraConnectBenefits && (
        <Card className="card-bold bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-black flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent-success" />
              Avantages OrchestraConnect
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.orchestraConnectBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-accent-success/10 rounded-lg border-2 border-accent-success/20">
                  <CheckCircle className="w-5 h-5 text-accent-success" />
                  <span className="text-black font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Prochaines étapes */}
      <Card className="card-bold bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-black flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-accent-success" />
            Prochaines Étapes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {report.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border-2 border-black">
                <div className="w-6 h-6 bg-accent-success rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <span className="text-black font-medium">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="card-bold bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-black text-center">
            Prêt à automatiser votre business ?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onContact}
              className="bg-accent-success text-white hover:bg-accent-success/90 font-bold px-8 py-3 border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
            >
              <Phone className="w-4 h-4 mr-2" />
              Planifier un appel
            </Button>
            <Button
              variant="outline"
              className="font-bold px-8 py-3 border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
            >
              <Mail className="w-4 h-4 mr-2" />
              Envoyer par email
            </Button>
            <Button
              variant="outline"
              className="font-bold px-8 py-3 border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Voir OrchestraConnect
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrchestraConnectRecommendations;
