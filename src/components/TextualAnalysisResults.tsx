import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  TrendingUp, 
  Clock, 
  Bot, 
  Target, 
  Zap,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  ArrowRight,
  Users,
  Briefcase,
  DollarSign,
  Settings,
  PieChart,
  Star,
  Award,
  Rocket,
  Brain
} from "lucide-react";

interface AuditData {
  score: number;
  company_name: string;
  sector: string;
  business_model: string;
  team_size: string;
  current_maturity: string;
  key_processes: string[];
  pain_points: string[];
  automation_opportunities: string[];
  specialized_agents: any[];
  roi_estimate: string;
  time_saved: string;
  strategic_insights: string;
  competitive_advantage: string;
  implementation_roadmap: string[];
  business_poles?: any[];
  high_value_phases?: any[];
}

interface TextualAnalysisResultsProps {
  auditData: AuditData;
  onNewAnalysis: () => void;
}

export const TextualAnalysisResults = ({ auditData, onNewAnalysis }: TextualAnalysisResultsProps) => {
  
  // Génération de l'analyse textuelle personnalisée
  const generateTextualAnalysis = () => {
    const companyName = auditData.company_name || "votre entreprise";
    const sector = auditData.sector || "votre secteur";
    const score = auditData.score || 75;
    
    return `
Notre analyse approfondie de ${companyName} révèle un potentiel d'automatisation de ${score}% dans le secteur ${sector}. 

Cette évaluation se base sur l'analyse de vos processus métier actuels, de votre maturité digitale (${auditData.current_maturity}) et de votre modèle économique ${auditData.business_model}. Avec une équipe de ${auditData.team_size}, vous êtes dans une position idéale pour tirer parti de l'automatisation intelligente.

Les opportunités identifiées se concentrent principalement sur ${auditData.automation_opportunities?.slice(0, 3).join(', ')}, qui représentent les domaines où l'impact sera le plus significatif. Ces automatisations pourraient vous faire économiser ${auditData.time_saved} par semaine, soit un ROI estimé de ${auditData.roi_estimate}.

L'analyse révèle que vos principaux défis actuels (${auditData.pain_points?.slice(0, 2).join(', ')}) peuvent être résolus efficacement par des agents IA spécialisés, créant ainsi un avantage concurrentiel durable dans votre marché.
    `.trim();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* En-tête avec badge de réussite */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-accent-success text-white px-6 py-3 rounded-full font-bold text-sm mb-6 border-2 border-black shadow-[2px_2px_0px_#000000]">
          <Brain className="w-5 h-5" />
          ANALYSE IA TERMINÉE
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">
          Rapport d'Analyse <span className="text-accent-success">Intelligente</span>
        </h2>
        <p className="text-lg text-black/70 font-medium max-w-3xl mx-auto">
          Analyse personnalisée pour <span className="font-bold text-accent-success">{auditData.company_name}</span>
        </p>
      </div>

      {/* Métriques clés - Blocs de données */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <Card className="card-bold bg-black text-white text-center">
          <CardContent className="p-6">
            <div className="text-4xl font-bold mb-2 text-accent-warning">{auditData.score}%</div>
            <h3 className="text-sm font-bold mb-1 text-white">POTENTIEL</h3>
            <p className="text-white/70 text-xs">d'automatisation</p>
          </CardContent>
        </Card>

        <Card className="card-bold bg-accent-success text-white text-center">
          <CardContent className="p-6">
            <div className="text-2xl font-bold mb-2 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 mr-1" />
              {auditData.roi_estimate}
            </div>
            <h3 className="text-sm font-bold mb-1">ROI ESTIMÉ</h3>
            <p className="text-white/70 text-xs">première année</p>
          </CardContent>
        </Card>

        <Card className="card-bold bg-accent-warning text-black text-center">
          <CardContent className="p-6">
            <div className="text-2xl font-bold mb-2 flex items-center justify-center">
              <Clock className="w-6 h-6 mr-1" />
              {auditData.time_saved}
            </div>
            <h3 className="text-sm font-bold mb-1">TEMPS GAGNÉ</h3>
            <p className="text-black/70 text-xs">par semaine</p>
          </CardContent>
        </Card>

        <Card className="card-bold bg-accent-blue text-white text-center">
          <CardContent className="p-6">
            <div className="text-4xl font-bold mb-2">{auditData.specialized_agents?.length || 3}</div>
            <h3 className="text-sm font-bold mb-1">SOLUTIONS</h3>
            <p className="text-white/70 text-xs">recommandées</p>
          </CardContent>
        </Card>
      </div>

      {/* Analyse textuelle principale */}
      <Card className="card-bold bg-white">
        <CardHeader className="bg-accent-blue text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Brain className="w-6 h-6" />
            ANALYSE INTELLIGENTE DE VOTRE ENTREPRISE
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-black font-medium text-lg leading-relaxed whitespace-pre-line">
              {generateTextualAnalysis()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Profil de l'entreprise - Bloc de données structuré */}
      <Card className="card-bold bg-white">
        <CardHeader className="bg-black text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Building2 className="w-6 h-6" />
            PROFIL DE L'ENTREPRISE
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 border-2 border-black p-6 rounded-lg shadow-[2px_2px_0px_#000000]">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-accent-blue" />
                <span className="font-bold text-black text-sm uppercase tracking-wide">Secteur</span>
              </div>
              <p className="text-black font-bold text-lg">{auditData.sector}</p>
            </div>
            
            <div className="bg-gray-50 border-2 border-black p-6 rounded-lg shadow-[2px_2px_0px_#000000]">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-5 h-5 text-accent-success" />
                <span className="font-bold text-black text-sm uppercase tracking-wide">Modèle</span>
              </div>
              <p className="text-black font-bold text-lg">{auditData.business_model}</p>
            </div>
            
            <div className="bg-gray-50 border-2 border-black p-6 rounded-lg shadow-[2px_2px_0px_#000000]">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-accent-warning" />
                <span className="font-bold text-black text-sm uppercase tracking-wide">Équipe</span>
              </div>
              <p className="text-black font-bold text-lg">{auditData.team_size}</p>
            </div>
            
            <div className="bg-gray-50 border-2 border-black p-6 rounded-lg shadow-[2px_2px_0px_#000000]">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-accent-purple" />
                <span className="font-bold text-black text-sm uppercase tracking-wide">Maturité</span>
              </div>
              <Badge variant="outline" className="border-2 border-black font-bold">
                {auditData.current_maturity}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Opportunités d'automatisation - Blocs visuels */}
      <Card className="card-bold bg-white">
        <CardHeader className="bg-accent-success text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Rocket className="w-6 h-6" />
            OPPORTUNITÉS D'AUTOMATISATION
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auditData.automation_opportunities?.slice(0, 6).map((opportunity, index) => (
              <div key={index} className="bg-accent-success/10 border-2 border-accent-success rounded-lg p-6 shadow-[2px_2px_0px_#000000]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-accent-success rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-black text-sm">OPPORTUNITÉ #{index + 1}</span>
                </div>
                <p className="text-black font-medium">{opportunity}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Points de friction actuels */}
      <Card className="card-bold bg-white">
        <CardHeader className="bg-accent-warning text-black border-b-2 border-black">
          <CardTitle className="flex items-center gap-3 text-xl">
            <AlertTriangle className="w-6 h-6" />
            POINTS DE FRICTION IDENTIFIÉS
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {auditData.pain_points?.map((painPoint, index) => (
              <div key={index} className="bg-accent-warning/10 border-2 border-accent-warning rounded-lg p-6 shadow-[2px_2px_0px_#000000]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-accent-warning rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <AlertTriangle className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black mb-2">Défi #{index + 1}</h4>
                    <p className="text-black font-medium">{painPoint}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Solutions recommandées */}
      <Card className="card-bold bg-white">
        <CardHeader className="bg-accent-purple text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Bot className="w-6 h-6" />
            SOLUTIONS IA RECOMMANDÉES
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            {auditData.specialized_agents?.slice(0, 3).map((agent, index) => (
              <div key={index} className="bg-accent-purple/10 border-2 border-accent-purple rounded-lg p-8 shadow-[2px_2px_0px_#000000]">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-accent-purple rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000] flex-shrink-0">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-black mb-2">{String(agent.name || `Solution IA #${index + 1}`)}</h4>
                    <p className="text-accent-purple font-bold text-lg mb-3">{String(agent.business_impact || agent.impact || 'Impact positif sur votre activité')}</p>
                    <p className="text-black font-medium mb-4">{String(agent.role || agent.description || 'Agent personnalisé pour votre secteur')}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-accent-warning/20 border border-accent-warning rounded-lg p-4">
                        <p className="text-sm font-bold text-black">
                          ⏰ {String(agent.time_saved || agent.timeSaved || "10-15h/semaine")}
                        </p>
                      </div>
                      <div className="bg-accent-success/20 border border-accent-success rounded-lg p-4">
                        <p className="text-sm font-bold text-black">
                          📈 {String(agent.roi_timeline || agent.roiTimeline || "ROI en 3 mois")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights stratégiques */}
      <Card className="card-bold bg-white">
        <CardHeader className="bg-accent-blue text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Lightbulb className="w-6 h-6" />
            INSIGHTS STRATÉGIQUES
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="bg-accent-blue/10 border-2 border-accent-blue rounded-lg p-8">
            <p className="text-black font-medium text-lg leading-relaxed">
              {auditData.strategic_insights}
            </p>
          </div>
          
          <div className="mt-6 bg-accent-success/10 border-2 border-accent-success rounded-lg p-6">
            <h4 className="font-bold text-black text-lg mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-accent-success" />
              Avantage Concurrentiel
            </h4>
            <p className="text-black font-medium">
              {auditData.competitive_advantage}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Plan d'action - Roadmap */}
      <Card className="card-bold bg-white">
        <CardHeader className="bg-accent-success text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-3 text-xl">
            <ArrowRight className="w-6 h-6" />
            PLAN D'ACTION RECOMMANDÉ
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-4">
            {auditData.implementation_roadmap?.map((step, index) => (
              <div key={index} className="flex items-center gap-6 p-6 bg-accent-success/10 border-2 border-accent-success rounded-lg shadow-[2px_2px_0px_#000000]">
                <div className="w-12 h-12 bg-accent-success text-white rounded-full flex items-center justify-center text-lg font-bold border-2 border-black shadow-[2px_2px_0px_#000000]">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-black font-medium text-lg">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="card-bold bg-black text-white p-8">
        <CardContent className="text-center">
          <h3 className="text-3xl font-bold mb-4 text-accent-warning">🚀 Prêt à automatiser votre entreprise ?</h3>
          <p className="mb-6 text-white font-medium text-lg max-w-3xl mx-auto">
            Votre analyse révèle un potentiel de <strong>{auditData.score}%</strong> d'automatisation. 
            Planifiez votre transformation dès maintenant !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.open('https://cal.com/getrepeat', '_blank')}
              className="bg-accent-warning text-black hover:bg-accent-warning/90 font-bold text-lg px-8 py-4 border-2 border-white shadow-[4px_4px_0px_#ffffff] hover:shadow-[6px_6px_0px_#ffffff] transform hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
            >
              📅 Planifier ma Transformation
            </Button>
            <Button 
              onClick={onNewAnalysis}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8 py-4 shadow-[4px_4px_0px_#ffffff] hover:shadow-[6px_6px_0px_#ffffff] transform hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
            >
              🔄 Nouvelle Analyse
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
