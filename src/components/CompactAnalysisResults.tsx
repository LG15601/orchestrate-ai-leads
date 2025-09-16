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
  Megaphone
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

interface CompactAnalysisResultsProps {
  auditData: AuditData;
  onNewAnalysis: () => void;
}

export const CompactAnalysisResults = ({ auditData, onNewAnalysis }: CompactAnalysisResultsProps) => {
  
  // Génération d'une analyse PME intelligente et ciblée
  const generateSmartAnalysis = () => {
    const companyName = auditData.company_name || "votre entreprise";
    const sector = auditData.sector || "votre secteur";
    const score = auditData.score || 75;
    
    return `${companyName} présente un potentiel d'automatisation de ${score}% dans le secteur ${sector}. 

En tant que PME, vos priorités sont claires : **acquisition client, visibilité et croissance**. Notre analyse révèle que vous pourriez libérer ${auditData.time_saved} par semaine en automatisant les tâches chronophages, vous permettant de vous concentrer sur ce qui compte vraiment : développer votre business.

**L'opportunité clé** : Automatiser la gestion administrative et le support pour investir massivement dans le marketing et l'acquisition client - votre véritable moteur de croissance.`;
  };

  // Sélection intelligente des 2 agents les plus impactants pour une PME
  const getTopAgents = () => {
    const agents = auditData.specialized_agents || [];
    
    // Prioriser les agents marketing/commercial/support pour les PME
    const priorityOrder = ['marketing', 'commercial', 'support', 'client', 'vente', 'acquisition'];
    
    const sortedAgents = agents.sort((a, b) => {
      const aName = (a.name || '').toLowerCase();
      const bName = (b.name || '').toLowerCase();
      
      const aPriority = priorityOrder.findIndex(keyword => aName.includes(keyword));
      const bPriority = priorityOrder.findIndex(keyword => bName.includes(keyword));
      
      if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;
      if (aPriority !== -1) return -1;
      if (bPriority !== -1) return 1;
      return 0;
    });

    return sortedAgents.slice(0, 2);
  };

  const topAgents = getTopAgents();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* En-tête compact avec résultats clés */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full font-bold text-sm mb-4 border-2 border-black shadow-[2px_2px_0px_#000000]">
          <Brain className="w-4 h-4" />
          ANALYSE TERMINÉE
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
          Votre Potentiel d'Automatisation
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          <span className="font-bold text-green-600">{auditData.company_name}</span> • {auditData.sector}
        </p>
      </div>

      {/* KPIs compacts en une ligne */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <Card className="border-2 border-black shadow-[2px_2px_0px_#000000] bg-black text-white text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-400 mb-1">{auditData.score}%</div>
            <p className="text-xs text-white">Potentiel</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-black shadow-[2px_2px_0px_#000000] bg-green-600 text-white text-center">
          <CardContent className="p-4">
            <div className="text-lg font-bold mb-1">{auditData.time_saved}</div>
            <p className="text-xs text-white">Temps libéré</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-black shadow-[2px_2px_0px_#000000] bg-blue-600 text-white text-center">
          <CardContent className="p-4">
            <div className="text-lg font-bold mb-1">{auditData.roi_estimate}</div>
            <p className="text-xs text-white">ROI estimé</p>
          </CardContent>
        </Card>
      </div>

      {/* Analyse intelligente compacte */}
      <Card className="border-2 border-black shadow-[2px_2px_0px_#000000] bg-white">
        <CardHeader className="bg-blue-600 text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5" />
            ANALYSE STRATÉGIQUE PME
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="prose max-w-none">
            <p className="text-black font-medium leading-relaxed whitespace-pre-line text-base">
              {generateSmartAnalysis()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Avantage concurrentiel en haut */}
      <Card className="border-2 border-black shadow-[2px_2px_0px_#000000] bg-green-50">
        <CardHeader className="bg-green-600 text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Star className="w-5 h-5" />
            VOTRE AVANTAGE CONCURRENTIEL
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-black font-medium text-base leading-relaxed mb-4">
            {String(auditData.competitive_advantage)}
          </p>
          
          <div className="bg-white border-2 border-green-600 rounded-lg p-4">
            <h4 className="font-bold text-black text-base mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-600" />
              Impact Immédiat pour votre PME
            </h4>
            <ul className="text-black text-sm space-y-1">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-600" />
                <span>Plus de temps pour la prospection et le développement commercial</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-600" />
                <span>Réduction des coûts opérationnels de 15-25%</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-600" />
                <span>Amélioration de l'expérience client et de la réactivité</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Top 2 solutions prioritaires pour PME */}
      <Card className="border-2 border-black shadow-[2px_2px_0px_#000000] bg-white">
        <CardHeader className="bg-purple-600 text-white border-b-2 border-black">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="w-5 h-5" />
            VOS 2 PRIORITÉS D'AUTOMATISATION
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            {topAgents.length > 0 ? topAgents.map((agent, index) => {
              const getIcon = (name: string) => {
                const n = name.toLowerCase();
                if (n.includes('marketing') || n.includes('acquisition')) return Megaphone;
                if (n.includes('commercial') || n.includes('vente')) return TrendingUp;
                if (n.includes('support') || n.includes('client')) return Users;
                return Target;
              };
              
              const Icon = getIcon(agent.name || '');
              
              return (
                <div key={index} className="bg-purple-50 border-2 border-purple-600 rounded-lg p-4 shadow-[2px_2px_0px_#000000]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center border-2 border-black shadow-[1px_1px_0px_#000000]">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-black text-base mb-1">{String(agent.name || `Solution #${index + 1}`)}</h4>
                      <p className="text-purple-700 font-medium text-sm mb-2">{String(agent.business_impact || agent.impact || 'Impact positif')}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-yellow-200 text-black px-2 py-1 rounded border border-black">
                          ⏰ {String(agent.time_saved || agent.timeSaved || "15h/sem")}
                        </span>
                        <span className="text-xs bg-green-200 text-black px-2 py-1 rounded border border-black">
                          📈 {String(agent.roi_timeline || agent.roiTimeline || "ROI 3 mois")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="col-span-2 text-center py-8 text-gray-600">
                <p>Solutions personnalisées en cours d'analyse pour votre secteur...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Profil entreprise compact */}
      <Card className="border-2 border-black shadow-[2px_2px_0px_#000000] bg-gray-50">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div>
              <p className="text-xs font-bold text-gray-600 uppercase">Secteur</p>
              <p className="text-sm font-bold text-black">{auditData.sector}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-600 uppercase">Modèle</p>
              <p className="text-sm font-bold text-black">{auditData.business_model}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-600 uppercase">Équipe</p>
              <p className="text-sm font-bold text-black">{auditData.team_size}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-600 uppercase">Maturité</p>
              <Badge variant="outline" className="border-black text-xs">
                {auditData.current_maturity}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action compact */}
      <Card className="border-2 border-black shadow-[2px_2px_0px_#000000] bg-black text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2 text-yellow-400">🚀 Prêt à libérer {auditData.time_saved} par semaine ?</h3>
          <p className="mb-4 text-white text-sm">
            Transformez votre PME avec l'automatisation intelligente. Plus de temps pour ce qui compte : <strong>faire grandir votre business</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => window.open('https://cal.com/getrepeat', '_blank')}
              className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold px-6 py-2 border-2 border-white shadow-[2px_2px_0px_#ffffff] hover:shadow-[4px_4px_0px_#ffffff] transform hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
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
