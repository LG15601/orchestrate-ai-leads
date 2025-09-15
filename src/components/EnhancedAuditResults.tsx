import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Users, 
  Clock, 
  TrendingUp, 
  Bot, 
  Target, 
  Zap,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Calendar,
  BarChart3,
  Briefcase,
  MessageSquare,
  FileText,
  DollarSign,
  Settings
} from "lucide-react";

interface JobPosition {
  administration: string[];
  commercial: string[];
  marketing: string[];
  service_client: string[];
  production: string[];
  rh: string[];
  comptabilite: string[];
  technique: string[];
}

interface SpecializedAgent {
  name: string;
  role: string;
  tasks: string[];
  time_saved: string;
  integrations: string[];
}

interface AuditResult {
  score: number;
  company_name: string;
  sector: string;
  team_size: string;
  technologies: string[];
  job_positions: JobPosition;
  pain_points: string[];
  time_consuming_tasks: string[];
  automation_opportunities: string[];
  specialized_agents: SpecializedAgent[];
  roi_estimate: string;
  time_saved: string;
  analysis_summary: string;
  competitive_advantage: string;
  implementation_roadmap: string[];
  risk_assessment: string;
}

interface EnhancedAuditResultsProps {
  auditResult: AuditResult;
  onNewAnalysis: () => void;
}

const jobIcons = {
  administration: Briefcase,
  commercial: Target,
  marketing: BarChart3,
  service_client: MessageSquare,
  production: Settings,
  rh: Users,
  comptabilite: DollarSign,
  technique: FileText
};

const jobLabels = {
  administration: "Administration & Gestion",
  commercial: "Commercial & Ventes",
  marketing: "Marketing & Communication", 
  service_client: "Service Client & Support",
  production: "Production & Opérations",
  rh: "RH & Recrutement",
  comptabilite: "Comptabilité & Finance",
  technique: "Technique & IT"
};

export const EnhancedAuditResults = ({ auditResult, onNewAnalysis }: EnhancedAuditResultsProps) => {
  const extractNumber = (str: string): number => {
    const match = str?.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* En-tête avec KPIs */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full font-bold text-sm mb-6 border-2 border-black shadow-[2px_2px_0px_#000000]">
          <CheckCircle className="w-4 h-4" />
          AUDIT TERMINÉ
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
          Votre Rapport d'Audit <span className="text-green-500">Personnalisé</span>
        </h2>
        <p className="text-xl text-black font-medium max-w-2xl mx-auto">
          Analyse complète de <span className="font-bold text-green-500">{auditResult.company_name}</span> • 
          Secteur: <span className="font-bold text-black">{auditResult.sector}</span>
        </p>
      </div>

      {/* KPIs Principaux */}
      <div className="grid lg:grid-cols-4 gap-6 mb-12">
        <Card className="border-2 border-black shadow-[4px_4px_0px_#000000] bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6 text-center">
            <div className="text-5xl font-bold mb-2">{auditResult.score}%</div>
            <h3 className="text-lg font-bold mb-1">Potentiel d'Automatisation</h3>
            <p className="text-blue-100 text-sm">Score d'opportunités identifiées</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-black shadow-[4px_4px_0px_#000000] bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6 text-center">
            <div className="text-5xl font-bold mb-2 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 mr-2" />
              {auditResult.roi_estimate}
            </div>
            <h3 className="text-lg font-bold mb-1">ROI Estimé</h3>
            <p className="text-green-100 text-sm">Amélioration des marges</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-black shadow-[4px_4px_0px_#000000] bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6 text-center">
            <div className="text-5xl font-bold mb-2 flex items-center justify-center">
              <Clock className="w-8 h-8 mr-2" />
              {auditResult.time_saved}
            </div>
            <h3 className="text-lg font-bold mb-1">Temps Économisé</h3>
            <p className="text-orange-100 text-sm">Par semaine avec l'automatisation</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-black shadow-[4px_4px_0px_#000000] bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6 text-center">
            <div className="text-5xl font-bold mb-2 flex items-center justify-center">
              <Bot className="w-8 h-8 mr-2" />
              {auditResult.specialized_agents?.length || 0}
            </div>
            <h3 className="text-lg font-bold mb-1">Agents IA Recommandés</h3>
            <p className="text-purple-100 text-sm">Spécialisés pour votre entreprise</p>
          </CardContent>
        </Card>
      </div>

      {/* Profil de l'entreprise */}
      <Card className="border-2 border-black shadow-[4px_4px_0px_#000000]">
        <CardHeader className="bg-black text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Building2 className="w-5 h-5" />
            PROFIL DE VOTRE ENTREPRISE
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gray-50 border-2 border-black p-4 rounded-lg shadow-[2px_2px_0px_#000000]">
              <span className="font-bold text-black text-sm uppercase tracking-wide">Secteur</span>
              <p className="text-black font-medium text-lg mt-1">{auditResult.sector}</p>
            </div>
            <div className="bg-gray-50 border-2 border-black p-4 rounded-lg shadow-[2px_2px_0px_#000000]">
              <span className="font-bold text-black text-sm uppercase tracking-wide">Taille d'équipe</span>
              <p className="text-black font-medium text-lg mt-1">{auditResult.team_size}</p>
            </div>
            <div className="bg-gray-50 border-2 border-black p-4 rounded-lg shadow-[2px_2px_0px_#000000]">
              <span className="font-bold text-black text-sm uppercase tracking-wide">Technologies</span>
              <p className="text-black font-medium text-lg mt-1">{auditResult.technologies?.join(', ')}</p>
            </div>
            <div className="bg-gray-50 border-2 border-black p-4 rounded-lg shadow-[2px_2px_0px_#000000]">
              <span className="font-bold text-black text-sm uppercase tracking-wide">Niveau de risque</span>
              <Badge variant={auditResult.risk_assessment === 'Faible' ? 'default' : auditResult.risk_assessment === 'Moyen' ? 'secondary' : 'destructive'}>
                {auditResult.risk_assessment}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analyse des postes de travail */}
      <Card className="border-2 border-black shadow-[4px_4px_0px_#000000]">
        <CardHeader className="bg-blue-500 text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Users className="w-5 h-5" />
            ANALYSE DES POSTES DE TRAVAIL IDENTIFIÉS
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(auditResult.job_positions || {}).map(([category, positions]) => {
              const Icon = jobIcons[category as keyof typeof jobIcons];
              const label = jobLabels[category as keyof typeof jobLabels];
              
              if (!positions || positions.length === 0) return null;
              
              return (
                <div key={category} className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 shadow-[2px_2px_0px_#000000]">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-blue-800 text-sm">{label}</h4>
                  </div>
                  <ul className="space-y-1">
                    {positions.map((position, index) => (
                      <li key={index} className="text-sm text-blue-700 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        {position}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tâches chronophages */}
      <Card className="border-2 border-black shadow-[4px_4px_0px_#000000]">
        <CardHeader className="bg-orange-500 text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Clock className="w-5 h-5" />
            TÂCHES CHRONOPHAGES IDENTIFIÉES
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4">
            {auditResult.time_consuming_tasks?.map((task, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 border-2 border-orange-300 rounded-lg shadow-[2px_2px_0px_#000000]">
                <Clock className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <p className="text-black font-medium">{task}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Points de friction */}
      <Card className="border-2 border-black shadow-[4px_4px_0px_#000000]">
        <CardHeader className="bg-red-500 text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-xl">
            <AlertTriangle className="w-5 h-5" />
            POINTS DE FRICTION IDENTIFIÉS
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4">
            {auditResult.pain_points?.map((pain, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-300 rounded-lg shadow-[2px_2px_0px_#000000]">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-black font-medium">{pain}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agents IA spécialisés */}
      <Card className="border-2 border-black shadow-[4px_4px_0px_#000000]">
        <CardHeader className="bg-purple-500 text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Bot className="w-5 h-5" />
            AGENTS IA SPÉCIALISÉS RECOMMANDÉS
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6">
            {auditResult.specialized_agents?.map((agent, index) => (
              <div key={index} className="bg-purple-50 border-2 border-purple-300 rounded-lg p-6 shadow-[2px_2px_0px_#000000]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-purple-800 mb-2">{agent.name}</h4>
                    <p className="text-purple-700 font-medium mb-3">{agent.role}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-bold text-purple-800 mb-2">Tâches automatisées :</h5>
                        <ul className="space-y-1">
                          {agent.tasks?.map((task, taskIndex) => (
                            <li key={taskIndex} className="text-sm text-purple-700 flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-bold text-purple-800 mb-2">Intégrations :</h5>
                        <div className="flex flex-wrap gap-2">
                          {agent.integrations?.map((integration, intIndex) => (
                            <Badge key={intIndex} variant="outline" className="border-purple-300 text-purple-700">
                              {integration}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-3 p-3 bg-green-100 border border-green-300 rounded-lg">
                          <p className="text-sm font-bold text-green-800">
                            ⏰ Temps économisé : {agent.time_saved}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Opportunités d'automatisation */}
      <Card className="border-2 border-black shadow-[4px_4px_0px_#000000]">
        <CardHeader className="bg-green-500 text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Lightbulb className="w-5 h-5" />
            OPPORTUNITÉS D'AUTOMATISATION
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4">
            {auditResult.automation_opportunities?.map((opportunity, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-green-50 border-2 border-green-300 rounded-lg shadow-[2px_2px_0px_#000000]">
                <Lightbulb className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-black font-medium">{opportunity}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Roadmap d'implémentation */}
      <Card className="border-2 border-black shadow-[4px_4px_0px_#000000]">
        <CardHeader className="bg-indigo-500 text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Calendar className="w-5 h-5" />
            ROADMAP D'IMPLÉMENTATION
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {auditResult.implementation_roadmap?.map((phase, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-indigo-50 border-2 border-indigo-300 rounded-lg shadow-[2px_2px_0px_#000000]">
                <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center text-lg font-bold border-2 border-black shadow-[2px_2px_0px_#000000]">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-indigo-800 mb-1">Phase {index + 1}</h4>
                  <p className="text-black font-medium">{phase}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Avantage concurrentiel */}
      <Card className="border-2 border-black shadow-[4px_4px_0px_#000000]">
        <CardHeader className="bg-emerald-500 text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Target className="w-5 h-5" />
            AVANTAGE CONCURRENTIEL
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-black font-medium text-lg leading-relaxed">{auditResult.competitive_advantage}</p>
        </CardContent>
      </Card>

      {/* Résumé de l'analyse */}
      <Card className="border-2 border-black shadow-[4px_4px_0px_#000000] bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Zap className="w-5 h-5" />
            RÉSUMÉ DE L'ANALYSE
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-black font-medium text-lg leading-relaxed">{auditResult.analysis_summary}</p>
        </CardContent>
      </Card>

      {/* Call to Actions */}
      <Card className="border-2 border-black shadow-[4px_4px_0px_#000000] bg-gradient-to-r from-black to-gray-800 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-3xl font-bold mb-4 text-yellow-400">🚀 Prêt à transformer votre entreprise ?</h3>
          <p className="mb-8 text-white font-medium text-lg">
            Obtenez votre stratégie d'automatisation complète et planifiez votre succès avec nos agents IA spécialisés
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.open('https://cal.com/getrepeat', '_blank')}
              className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold text-lg px-8 py-4 border-2 border-white shadow-[4px_4px_0px_#ffffff] hover:shadow-[6px_6px_0px_#ffffff] transform hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
            >
              📅 Réserver une Démo Gratuite
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
