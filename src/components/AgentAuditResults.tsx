import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle, 
  TrendingUp, 
  Clock, 
  Target,
  Zap,
  Calendar,
  Download,
  RefreshCw
} from "lucide-react";

interface AgentAuditResultsProps {
  recommendations: {
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
    recommendations: Array<{
      title: string;
      description: string;
      impact: string;
      timeSaved: string;
      priority: string;
      tasks: string[];
      integrations: string[];
      roiTimeline: string;
    }>;
    roi: string;
    timeSaved: string;
    competitiveAdvantage: string;
    nextSteps: string[];
  };
  onNewAnalysis: () => void;
}

const AgentAuditResults = ({ recommendations, onNewAnalysis }: AgentAuditResultsProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Haute': return 'bg-red-100 text-red-800 border-red-200';
      case 'Moyenne': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Basse': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-accent-success text-white px-6 py-2 rounded-full font-bold text-sm mb-6 border-2 border-black shadow-[2px_2px_0px_#000000]">
          🎯 AUDIT TERMINÉ
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
          Votre Rapport <span className="text-accent-success">Personnalisé</span>
        </h2>
        <p className="text-black font-medium text-lg">
          Analyse complète de {recommendations.companyName} par notre agent IA
        </p>
      </div>

      {/* Analyse Contextuelle */}
      <Card className="card-bold bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black flex items-center gap-2">
            <Bot className="w-6 h-6 text-accent-success" />
            Notre Analyse de Votre Business
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-black mb-2">Secteur d'activité</h4>
                <p className="text-black/70">{recommendations.businessContext.sector}</p>
              </div>
              <div>
                <h4 className="font-bold text-black mb-2">Modèle économique</h4>
                <p className="text-black/70">{recommendations.businessContext.businessModel}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-black mb-2">Taille d'équipe</h4>
                <p className="text-black/70">{recommendations.businessContext.teamSize}</p>
              </div>
              <div>
                <h4 className="font-bold text-black mb-2">Maturité digitale actuelle</h4>
                <p className="text-black/70">{recommendations.businessContext.currentMaturity}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-accent-success/10 border-2 border-accent-success rounded-lg p-6">
            <h4 className="font-bold text-black mb-3">💡 Insights Stratégiques</h4>
            <p className="text-black/80 font-medium">{recommendations.insights}</p>
          </div>
        </CardContent>
      </Card>

      {/* Score et Métriques */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="card-bold bg-white">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-accent-success rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black shadow-[2px_2px_0px_#000000]">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">{recommendations.score}%</h3>
            <p className="text-black/70 font-medium">Potentiel d'automatisation</p>
          </CardContent>
        </Card>

        <Card className="card-bold bg-white">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-accent-success rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black shadow-[2px_2px_0px_#000000]">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">{recommendations.timeSaved}</h3>
            <p className="text-black/70 font-medium">Temps économisé</p>
          </CardContent>
        </Card>

        <Card className="card-bold bg-white">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-accent-success rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black shadow-[2px_2px_0px_#000000]">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">{recommendations.roi}</h3>
            <p className="text-black/70 font-medium">ROI attendu</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommandations */}
      <Card className="card-bold bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black flex items-center gap-2">
            <Zap className="w-6 h-6 text-accent-success" />
            Recommandations Prioritaires
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {recommendations.recommendations.map((rec, index) => (
            <div key={index} className="p-6 border-2 border-black rounded-lg bg-gray-50">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-black">{rec.title}</h3>
                <Badge className={`px-3 py-1 text-sm font-bold border-2 ${getPriorityColor(rec.priority)}`}>
                  {rec.priority}
                </Badge>
              </div>
              <p className="text-black/70 font-medium mb-4">{rec.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-bold text-black mb-2">🎯 Tâches automatisées</h5>
                  <ul className="text-sm text-black/70 space-y-1">
                    {rec.tasks.map((task, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-accent-success" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-black mb-2">🔗 Intégrations</h5>
                  <ul className="text-sm text-black/70 space-y-1">
                    {rec.integrations.map((integration, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-accent-success" />
                        {integration}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-accent-success font-bold">
                  <TrendingUp className="w-4 h-4" />
                  <span>Impact: {rec.impact}</span>
                </div>
                <div className="text-sm text-black/70 font-medium">
                  {rec.roiTimeline}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Avantage Concurrentiel */}
      <Card className="card-bold bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black flex items-center gap-2">
            <Target className="w-6 h-6 text-accent-success" />
            Avantage Concurrentiel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-accent-success/10 border-2 border-accent-success rounded-lg p-6">
            <p className="text-black/80 font-medium text-lg">{recommendations.competitiveAdvantage}</p>
          </div>
        </CardContent>
      </Card>

      {/* Prochaines Étapes */}
      <Card className="card-bold bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black flex items-center gap-2">
            <Calendar className="w-6 h-6 text-accent-success" />
            Prochaines Étapes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.nextSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent-success rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <span className="text-black font-medium">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onNewAnalysis}
          variant="outline"
          size="lg"
          className="btn-bold-secondary"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Nouvel Audit
        </Button>
        <Button
          size="lg"
          className="btn-bold-primary"
        >
          <Download className="w-4 h-4 mr-2" />
          Télécharger le Rapport
        </Button>
        <Button
          size="lg"
          className="bg-accent-success text-white hover:bg-accent-success/90 font-bold px-8 py-3 border-2 border-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] transform hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
        >
          Planifier un Appel
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default AgentAuditResults;
