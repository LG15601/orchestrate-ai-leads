import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Lightbulb,
  ArrowRight,
  Star,
  Zap,
  CheckCircle,
  Brain,
  Users,
  ShoppingCart,
  Megaphone,
  Shield,
  Cog,
  BarChart3
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
}

interface EnhancedCompactAnalysisResultsProps {
  auditData: AuditData;
  onNewAnalysis: () => void;
}

export const EnhancedCompactAnalysisResults = ({ auditData, onNewAnalysis }: EnhancedCompactAnalysisResultsProps) => {
  
  // Génération d'une analyse PME ultra-enrichie avec compréhension des agents IA métier
  const generateEnhancedAnalysis = () => {
    const companyName = auditData.company_name || "votre entreprise";
    const sector = auditData.sector || "votre secteur";
    const score = auditData.score || 75;
    
    return `${companyName} présente un potentiel d'automatisation de ${score}% dans le secteur ${sector}. 

**En tant que PME, vous gérez tout : acquisition client, visibilité, croissance ET tâches administratives chronophages.** Notre analyse révèle que vous pourriez libérer ${auditData.time_saved} par semaine grâce aux **agents IA métier spécialisés** - bien au-delà des ChatGPT génériques.

**L'opportunité transformatrice** : Nos agents IA intègrent l'expertise des meilleurs spécialistes de votre secteur, automatisent intelligemment vos processus métier, et se branchent nativement à vos outils PME existants. **Résultat : vous vous recentrez sur votre cœur de métier à forte valeur ajoutée.**

**Pourquoi nos agents IA révolutionnent votre quotidien :**
• **Spécialisation métier** : Contrairement aux IA généralistes, ils maîtrisent votre réglementation française et vos spécificités sectorielles
• **ROI immédiat** : 300% dès la première année selon nos études terrain
• **Made in France** : Hébergement souverain RGPD, support local, déploiement en 48h`;
  };

  // Sélection intelligente des agents avec analyse approfondie des pain points PME
  const getSmartAgents = () => {
    const agents = auditData.specialized_agents || [];
    
    // Analyse des pain points PME typiques pour proposer les bons agents
    const pmeNeeds = {
      'acquisition': { priority: 1, icon: Megaphone, colorClass: 'bg-red-500' },
      'marketing': { priority: 1, icon: Megaphone, colorClass: 'bg-red-500' },
      'commercial': { priority: 1, icon: TrendingUp, colorClass: 'bg-green-600' },
      'vente': { priority: 1, icon: TrendingUp, colorClass: 'bg-green-600' },
      'support': { priority: 2, icon: Users, colorClass: 'bg-blue-600' },
      'client': { priority: 2, icon: Users, colorClass: 'bg-blue-600' },
      'service': { priority: 2, icon: Users, colorClass: 'bg-blue-600' },
      'admin': { priority: 3, icon: Cog, colorClass: 'bg-gray-600' },
      'gestion': { priority: 3, icon: Cog, colorClass: 'bg-gray-600' },
      'comptabilité': { priority: 3, icon: BarChart3, colorClass: 'bg-gray-600' }
    };

    const enrichedAgents = agents.map(agent => {
      const agentName = (agent.name || '').toLowerCase();
      const matchedNeed = Object.entries(pmeNeeds).find(([key]) => agentName.includes(key));
      
      return {
        ...agent,
        priority: matchedNeed ? matchedNeed[1].priority : 4,
        icon: matchedNeed ? matchedNeed[1].icon : Target,
        colorClass: matchedNeed ? matchedNeed[1].colorClass : 'bg-gray-600',
        enhanced_description: generateAgentDescription(agent, matchedNeed?.[0])
      };
    });

    // Si pas d'agents ou agents génériques, créer des agents métier intelligents
    if (enrichedAgents.length === 0 || enrichedAgents.every(a => !a.name)) {
      return generateDefaultSmartAgents();
    }

    return enrichedAgents.sort((a, b) => a.priority - b.priority).slice(0, 2);
  };

  const generateAgentDescription = (agent: any, needType?: string) => {
    const baseName = agent.name || 'Agent IA Spécialisé';
    const baseImpact = agent.business_impact || agent.impact || '';
    
    switch(needType) {
      case 'acquisition':
      case 'marketing':
        return {
          title: 'Agent IA Marketing & Acquisition',
          impact: 'Triplez votre volume de prospection qualifiée',
          description: 'Analyse intelligente des douleurs clients, personnalisation des messages à grande échelle, automation des campagnes. Intégré à vos outils CRM et emailing.',
          roi_detail: 'ROI mensuel moyen : 5 000€ pour un coût de 299€/mois',
          time_saved: '25h/semaine',
          expertise: 'Expertise des meilleurs commerciaux sectoriels intégrée'
        };
      case 'support':
      case 'client':
        return {
          title: 'Agent IA Support Client Intelligent',
          impact: '+25% satisfaction client, -80% temps de traitement',
          description: 'Traitement automatique des demandes récurrentes, escalade intelligente, base de connaissance auto-apprenante. Intégré à vos outils de support.',
          roi_detail: 'Économie : 15h/semaine d\'un collaborateur senior',
          time_saved: '30h/semaine',
          expertise: 'Expertise service client premium intégrée'
        };
      default:
        return {
          title: baseName,
          impact: baseImpact || 'Optimisation de vos processus métier',
          description: agent.role || agent.description || 'Agent spécialisé pour votre secteur avec expertise métier intégrée',
          roi_detail: agent.roi_timeline || 'ROI en 3-6 mois',
          time_saved: agent.time_saved || agent.timeSaved || '15h/semaine',
          expertise: 'Expertise sectorielle des meilleurs spécialistes'
        };
    }
  };

  const generateDefaultSmartAgents = () => {
    return [
      {
        priority: 1,
        icon: Megaphone,
        colorClass: 'bg-red-500',
        enhanced_description: {
          title: 'Agent IA Marketing & Acquisition',
          impact: '+300% efficacité prospection, +40% taux conversion',
          description: 'Automatise l\'analyse des prospects, personnalise vos messages commerciaux, gère vos campagnes emailing et suit vos conversions. Expertise des meilleurs commerciaux intégrée.',
          roi_detail: 'ROI : 5 000€/mois pour 299€/mois d\'investissement',
          time_saved: '25h/semaine',
          expertise: 'Intègre les techniques des top performers commerciaux'
        }
      },
      {
        priority: 2,
        icon: Users,
        colorClass: 'bg-green-600',
        enhanced_description: {
          title: 'Agent IA Support Client Expert',
          impact: '+25% satisfaction, -80% temps traitement',
          description: 'Répond automatiquement aux questions récurrentes, qualifie les demandes complexes, gère les relances. Expertise service client premium intégrée.',
          roi_detail: 'Économie équivalent à 1 ETP senior',
          time_saved: '30h/semaine',
          expertise: 'Savoir-faire des meilleurs experts service client'
        }
      }
    ];
  };

  const smartAgents = getSmartAgents();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* En-tête avec thème cohérent */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-accent-success text-white px-4 py-2 rounded-full font-bold text-sm mb-4 border-2 border-black shadow-[2px_2px_0px_#000000]">
          <Brain className="w-4 h-4" />
          ANALYSE TERMINÉE
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Votre Potentiel d'Automatisation
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          <span className="font-bold text-accent-success">{auditData.company_name}</span> • {auditData.sector}
        </p>
      </div>

      {/* KPIs avec couleurs thème */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <Card className="border-2 border-black shadow-[2px_2px_0px_#000000] bg-black text-white text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent-warning mb-1">{auditData.score}%</div>
            <p className="text-xs text-white">Potentiel</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-black shadow-[2px_2px_0px_#000000] bg-accent-success text-white text-center">
          <CardContent className="p-4">
            <div className="text-lg font-bold mb-1">{auditData.time_saved}</div>
            <p className="text-xs text-white">Temps libéré</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-black shadow-[2px_2px_0px_#000000] bg-primary text-primary-foreground text-center">
          <CardContent className="p-4">
            <div className="text-lg font-bold mb-1">{auditData.roi_estimate}</div>
            <p className="text-xs">ROI estimé</p>
          </CardContent>
        </Card>
      </div>

      {/* Analyse enrichie avec expertise agents IA */}
      <Card className="border-2 border-black shadow-[2px_2px_0px_#000000] bg-card">
        <CardHeader className="bg-primary text-primary-foreground border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5" />
            ANALYSE STRATÉGIQUE PME - AGENTS IA MÉTIER
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="prose max-w-none">
            <p className="text-card-foreground font-medium leading-relaxed whitespace-pre-line text-base">
              {generateEnhancedAnalysis()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Avantage concurrentiel enrichi */}
      <Card className="border-2 border-black shadow-[2px_2px_0px_#000000] bg-accent-success/5">
        <CardHeader className="bg-accent-success text-accent-success-foreground border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Star className="w-5 h-5" />
            VOTRE AVANTAGE CONCURRENTIEL AVEC LES AGENTS IA
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-card-foreground font-medium text-base leading-relaxed mb-4">
            {String(auditData.competitive_advantage)}
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card border-2 border-accent-success rounded-lg p-4">
              <h4 className="font-bold text-card-foreground text-base mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent-success" />
                Agents IA vs IA Généralistes
              </h4>
              <ul className="text-card-foreground text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-accent-success" />
                  <span>Expertise métier des meilleurs spécialistes intégrée</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-accent-success" />
                  <span>Réglementation française maîtrisée</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-accent-success" />
                  <span>Intégration native à vos outils PME</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card border-2 border-accent-warning rounded-lg p-4">
              <h4 className="font-bold text-card-foreground text-base mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent-warning" />
                Impact PME Immédiat
              </h4>
              <ul className="text-card-foreground text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-accent-warning" />
                  <span>Déploiement en 48h, zéro code requis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-accent-warning" />
                  <span>ROI moyen 300% dès la première année</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-accent-warning" />
                  <span>Made in France, hébergement souverain RGPD</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agents IA métier enrichis */}
      <Card className="border-2 border-black shadow-[2px_2px_0px_#000000] bg-card">
        <CardHeader className="bg-accent-orange text-accent-orange-foreground border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="w-5 h-5" />
            VOS AGENTS IA MÉTIER RECOMMANDÉS
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {smartAgents.map((agent, index) => {
              const Icon = agent.icon;
              const desc = agent.enhanced_description;
              
              return (
                <div key={index} className="bg-background border-2 border-black rounded-lg p-6 shadow-[2px_2px_0px_#000000]">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${agent.colorClass} rounded-full flex items-center justify-center border-2 border-black shadow-[1px_1px_0px_#000000]`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-card-foreground text-lg mb-1">{desc.title}</h4>
                      <p className="text-accent-success font-bold text-base mb-2">{desc.impact}</p>
                      <p className="text-muted-foreground text-sm mb-3">{desc.description}</p>
                      
                      <div className="bg-muted/30 rounded-lg p-3 mb-3">
                        <p className="text-xs font-medium text-card-foreground mb-1">💡 {desc.expertise}</p>
                        <p className="text-xs font-bold text-accent-success">{desc.roi_detail}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-accent-warning text-accent-warning-foreground px-3 py-1 rounded-full border border-black font-bold">
                          ⏰ {desc.time_saved}
                        </span>
                        <span className="text-xs bg-accent-success text-accent-success-foreground px-3 py-1 rounded-full border border-black font-bold">
                          🚀 Déploiement 48h
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Profil entreprise avec thème */}
      <Card className="border-2 border-black shadow-[2px_2px_0px_#000000] bg-muted/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase">Secteur</p>
              <p className="text-sm font-bold text-card-foreground">{auditData.sector}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase">Modèle</p>
              <p className="text-sm font-bold text-card-foreground">{auditData.business_model}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase">Équipe</p>
              <p className="text-sm font-bold text-card-foreground">{auditData.team_size}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase">Maturité</p>
              <Badge variant="outline" className="border-black text-xs">
                {auditData.current_maturity}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA avec thème */}
      <Card className="border-2 border-black shadow-[2px_2px_0px_#000000] bg-black text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2 text-accent-warning">🚀 Prêt à libérer {auditData.time_saved} par semaine ?</h3>
          <p className="mb-4 text-white text-sm">
            Transformez votre PME avec nos <strong>agents IA métier spécialisés</strong>. Plus de temps pour ce qui compte : <strong>faire grandir votre business</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => window.open('https://cal.com/getrepeat', '_blank')}
              className="bg-accent-warning text-accent-warning-foreground hover:bg-accent-warning/90 font-bold px-6 py-2 border-2 border-white shadow-[2px_2px_0px_#ffffff] hover:shadow-[4px_4px_0px_#ffffff] transform hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
            >
              📅 Planifier ma Transformation
            </Button>
            <Button 
              onClick={onNewAnalysis}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-bold px-6 py-2 shadow-[2px_2px_0px_#ffffff] hover:shadow-[4px_4px_0px_#ffffff] transform hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
            >
              🔄 Nouvelle Analyse
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
