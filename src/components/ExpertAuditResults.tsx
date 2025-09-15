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
  Calendar,
  BarChart3,
  ArrowRight,
  MessageSquare,
  Users,
  Briefcase,
  DollarSign,
  Settings,
  FileText,
  Headphones,
  ShoppingCart,
  Mail,
  Phone,
  Database,
  PieChart
} from "lucide-react";

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

interface ExpertAuditResultsProps {
  auditResult: AuditResult;
  onNewAnalysis: () => void;
}

export const ExpertAuditResults = ({ auditResult, onNewAnalysis }: ExpertAuditResultsProps) => {
  // Fonction pour obtenir l'icône appropriée selon le type d'agent
  const getAgentIcon = (agentName: string) => {
    const name = agentName.toLowerCase();
    if (name.includes('commercial') || name.includes('vente') || name.includes('sales')) return Target;
    if (name.includes('marketing') || name.includes('campagne')) return BarChart3;
    if (name.includes('service') || name.includes('client') || name.includes('support')) return Headphones;
    if (name.includes('admin') || name.includes('gestion')) return Briefcase;
    if (name.includes('rh') || name.includes('recrutement')) return Users;
    if (name.includes('comptabilité') || name.includes('finance')) return DollarSign;
    if (name.includes('technique') || name.includes('it')) return Settings;
    if (name.includes('analytics') || name.includes('rapport')) return PieChart;
    if (name.includes('email') || name.includes('mail')) return Mail;
    if (name.includes('chat') || name.includes('message')) return MessageSquare;
    if (name.includes('e-commerce') || name.includes('boutique')) return ShoppingCart;
    if (name.includes('données') || name.includes('data')) return Database;
    return Bot; // Icône par défaut
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* En-tête avec KPIs */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-accent-success text-white px-6 py-2 rounded-full font-bold text-sm mb-6 border-2 border-black shadow-[2px_2px_0px_#000000]">
          <CheckCircle className="w-4 h-4" />
          ANALYSE STRATÉGIQUE TERMINÉE
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">
          Votre Rapport d'Audit <span className="text-accent-success">Expert</span>
        </h2>
        <p className="text-lg text-black font-medium max-w-3xl mx-auto">
          Analyse stratégique de <span className="font-bold text-accent-success">{auditResult.company_name}</span> • 
          <span className="font-bold text-black"> {auditResult.sector}</span> • 
          <span className="font-bold text-black"> {auditResult.business_model}</span>
        </p>
      </div>

      {/* KPIs Principaux - Taille encore plus réduite */}
      <div className="grid lg:grid-cols-4 gap-3 mb-10">
        <div className="bg-black text-white text-center p-4 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
          <div className="text-3xl font-bold mb-2">{auditResult.score}%</div>
          <h3 className="text-base font-bold mb-1 text-accent-warning">Potentiel d'Automatisation</h3>
          <p className="text-white/80 font-medium text-xs">Score d'opportunités identifiées</p>
        </div>

        <div className="bg-accent-success text-white text-center p-4 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
          <div className="text-3xl font-bold mb-2 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 mr-1" />
            {auditResult.roi_estimate}
          </div>
          <h3 className="text-base font-bold mb-1">ROI Estimé</h3>
          <p className="text-white/80 font-medium text-xs">Amélioration des marges</p>
        </div>

        <div className="bg-accent-warning text-black text-center p-4 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
          <div className="text-3xl font-bold mb-2 flex items-center justify-center">
            <Clock className="w-6 h-6 mr-1" />
            {auditResult.time_saved}
          </div>
          <h3 className="text-base font-bold mb-1">Temps Économisé</h3>
          <p className="text-black/80 font-medium text-xs">Par semaine avec l'automatisation</p>
        </div>

        <div className="bg-accent-blue text-white text-center p-4 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
          <div className="text-3xl font-bold mb-2 flex items-center justify-center">
            <Bot className="w-6 h-6 mr-1" />
            {auditResult.specialized_agents?.length || 0}
          </div>
          <h3 className="text-base font-bold mb-1">Agents IA Recommandés</h3>
          <p className="text-white/80 font-medium text-xs">Spécialisés pour votre entreprise</p>
        </div>
      </div>

      {/* Profil de l'entreprise - Simplifié */}
      <Card className="card-bold bg-white mb-12">
        <CardHeader className="bg-black text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Building2 className="w-5 h-5" />
            PROFIL STRATÉGIQUE DE L'ENTREPRISE
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-background border-2 border-black p-6 rounded-lg shadow-[2px_2px_0px_#000000]">
              <span className="font-bold text-black text-sm uppercase tracking-wide">Secteur</span>
              <p className="text-black font-medium text-lg mt-2">{auditResult.sector}</p>
            </div>
            <div className="bg-background border-2 border-black p-6 rounded-lg shadow-[2px_2px_0px_#000000]">
              <span className="font-bold text-black text-sm uppercase tracking-wide">Modèle Économique</span>
              <p className="text-black font-medium text-lg mt-2">{auditResult.business_model}</p>
            </div>
            <div className="bg-background border-2 border-black p-6 rounded-lg shadow-[2px_2px_0px_#000000]">
              <span className="font-bold text-black text-sm uppercase tracking-wide">Taille d'équipe</span>
              <p className="text-black font-medium text-lg mt-2">{auditResult.team_size}</p>
            </div>
            <div className="bg-background border-2 border-black p-6 rounded-lg shadow-[2px_2px_0px_#000000]">
              <span className="font-bold text-black text-sm uppercase tracking-wide">Maturité Digitale</span>
              <Badge variant="outline" className="border-2 border-black mt-2">
                {auditResult.current_maturity}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights Stratégiques - Section clé */}
      <Card className="card-bold bg-white mb-12">
        <CardHeader className="bg-accent-success text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Lightbulb className="w-5 h-5" />
            INSIGHTS STRATÉGIQUES
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <p className="text-black font-medium text-xl leading-relaxed">{auditResult.strategic_insights}</p>
        </CardContent>
      </Card>

      {/* Agents IA Spécialisés - Section principale */}
      <Card className="card-bold bg-white mb-12">
        <CardHeader className="bg-accent-blue text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Bot className="w-5 h-5" />
            AGENTS IA SPÉCIALISÉS RECOMMANDÉS
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-8">
            {auditResult.specialized_agents?.map((agent, index) => {
              const AgentIcon = getAgentIcon(agent.name);
              return (
                <div key={index} className="bg-accent-blue/5 border-2 border-accent-blue rounded-lg p-8 shadow-[2px_2px_0px_#000000]">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-accent-blue rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
                      <AgentIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-black mb-2">{agent.name}</h4>
                      <p className="text-accent-blue font-bold text-lg mb-3">{agent.business_impact}</p>
                      <p className="text-black font-medium mb-4">{agent.role}</p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-bold text-black mb-3">Tâches critiques automatisées :</h5>
                          <ul className="space-y-2">
                            {agent.key_tasks?.map((task, taskIndex) => (
                              <li key={taskIndex} className="text-black font-medium flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-accent-success" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-bold text-black mb-3">Intégrations métier :</h5>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {agent.integrations?.map((integration, intIndex) => (
                              <Badge key={intIndex} variant="outline" className="border-2 border-black">
                                {integration}
                              </Badge>
                            ))}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-accent-warning/20 border-2 border-accent-warning rounded-lg p-4">
                              <p className="text-sm font-bold text-black">
                                ⏰ {agent.time_saved}
                              </p>
                            </div>
                            <div className="bg-accent-success/20 border-2 border-accent-success rounded-lg p-4">
                              <p className="text-sm font-bold text-black">
                                📈 {agent.roi_timeline}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Roadmap d'implémentation - Accélérée */}
      <Card className="card-bold bg-white mb-12">
        <CardHeader className="bg-accent-purple text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Calendar className="w-5 h-5" />
            ROADMAP D'IMPLÉMENTATION ACCÉLÉRÉE
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 bg-accent-purple/5 border-2 border-accent-purple rounded-lg shadow-[2px_2px_0px_#000000]">
              <div className="w-12 h-12 bg-accent-purple text-white rounded-full flex items-center justify-center text-lg font-bold border-2 border-black shadow-[2px_2px_0px_#000000]">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-black text-lg mb-1">Phase 1: Contact & Analyse (48h)</h4>
                <p className="text-black font-medium">Rappel sous 48h pour planifier votre stratégie d'automatisation personnalisée</p>
              </div>
              <ArrowRight className="w-6 h-6 text-accent-purple" />
            </div>
            
            <div className="flex items-center gap-6 p-6 bg-accent-purple/5 border-2 border-accent-purple rounded-lg shadow-[2px_2px_0px_#000000]">
              <div className="w-12 h-12 bg-accent-purple text-white rounded-full flex items-center justify-center text-lg font-bold border-2 border-black shadow-[2px_2px_0px_#000000]">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-black text-lg mb-1">Phase 2: Agent Prêt à l'Emploi (7 jours)</h4>
                <p className="text-black font-medium">Premier agent IA spécialisé déployé et opérationnel avec intégrations métier</p>
              </div>
              <ArrowRight className="w-6 h-6 text-accent-purple" />
            </div>
            
            <div className="flex items-center gap-6 p-6 bg-accent-purple/5 border-2 border-accent-purple rounded-lg shadow-[2px_2px_0px_#000000]">
              <div className="w-12 h-12 bg-accent-purple text-white rounded-full flex items-center justify-center text-lg font-bold border-2 border-black shadow-[2px_2px_0px_#000000]">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-black text-lg mb-1">Phase 3: Écosystème Complet (30 jours)</h4>
                <p className="text-black font-medium">Déploiement de tous les agents IA recommandés avec orchestration complète</p>
              </div>
              <ArrowRight className="w-6 h-6 text-accent-purple" />
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-accent-blue/10 border-2 border-accent-blue rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Bot className="w-6 h-6 text-accent-blue" />
              <h5 className="font-bold text-accent-blue text-lg">Powered by Orchestra Connect</h5>
            </div>
            <p className="text-black font-medium">
              Nos agents IA sont connectés à plus de 500 outils métier et s'intègrent parfaitement dans votre écosystème existant. 
              Déploiement rapide, formation incluse, support dédié.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Avantage concurrentiel - Développé */}
      <Card className="card-bold bg-white mb-12">
        <CardHeader className="bg-accent-success text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Target className="w-5 h-5" />
            AVANTAGE CONCURRENTIEL DURABLE
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            <p className="text-black font-medium text-xl leading-relaxed">{auditResult.competitive_advantage}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-accent-success/10 border-2 border-accent-success rounded-lg p-6">
                <h4 className="font-bold text-black text-lg mb-3 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-accent-success" />
                  Agents IA vs LLM Traditionnels
                </h4>
                <ul className="space-y-2 text-black font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent-success" />
                    <span>Agents IA spécialisés dans votre métier</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent-success" />
                    <span>Intégrations natives avec vos outils</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent-success" />
                    <span>Apprentissage continu de vos processus</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent-success" />
                    <span>Autonomie dans l'exécution des tâches</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-accent-blue/10 border-2 border-accent-blue rounded-lg p-6">
                <h4 className="font-bold text-black text-lg mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent-blue" />
                  Intégration Rassurante
                </h4>
                <ul className="space-y-2 text-black font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent-blue" />
                    <span>Déploiement progressif et sécurisé</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent-blue" />
                    <span>Formation de vos équipes incluse</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent-blue" />
                    <span>Support dédié 24/7</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent-blue" />
                    <span>ROI garanti ou remboursé</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-accent-warning/10 border-2 border-accent-warning rounded-lg p-6">
              <h4 className="font-bold text-black text-lg mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent-warning" />
                Pourquoi nos Agents IA sont différents ?
              </h4>
              <p className="text-black font-medium leading-relaxed">
                Contrairement aux chatbots génériques, nos agents IA sont des <strong>employés virtuels spécialisés</strong> qui comprennent votre métier, 
                s'intègrent à vos outils existants et travaillent de manière autonome. Ils apprennent vos processus, 
                s'adaptent à vos besoins et évoluent avec votre entreprise. C'est comme embaucher un expert dans chaque domaine, 
                mais disponible 24h/24, sans congés, et qui ne fait jamais d'erreur.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Actions */}
      <Card className="card-bold bg-black text-white p-8">
        <CardContent className="text-center">
          <h3 className="text-3xl font-bold mb-4 text-accent-warning">🚀 Prêt à transformer votre entreprise ?</h3>
          <p className="mb-6 text-white font-medium text-base max-w-3xl mx-auto">
            Obtenez votre stratégie d'automatisation complète et planifiez votre succès avec nos agents IA spécialisés
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.open('https://cal.com/getrepeat', '_blank')}
              className="bg-accent-warning text-black hover:bg-accent-warning/90 font-bold text-base px-6 py-3 border-2 border-white shadow-[4px_4px_0px_#ffffff] hover:shadow-[6px_6px_0px_#ffffff] transform hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
            >
              📅 Réserver une Démo Gratuite
            </Button>
            <Button 
              onClick={onNewAnalysis}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-bold text-base px-6 py-3 shadow-[4px_4px_0px_#ffffff] hover:shadow-[6px_6px_0px_#ffffff] transform hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
            >
              🔄 Nouvelle Analyse
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
