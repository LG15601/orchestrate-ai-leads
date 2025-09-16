import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Zap, Target, Shield, Clock, TrendingUp } from "lucide-react";

const AIAgentExplanation = () => {
  return (
    <section id="ai-explanation" className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent-success text-white border-2 border-black shadow-[2px_2px_0px_#000000]">
              <Bot className="w-4 h-4 mr-2" />
              Agents IA Métier
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Qu'est-ce qu'un Agent IA Métier ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Les <strong>agents IA</strong> sont des intelligences artificielles conçues pour automatiser, 
              professionnaliser et personnaliser des tâches métier précises dans les PME, allant bien 
              au-delà des simples assistants conversationnels comme ChatGPT ou Claude.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            
            {/* Left Column - Definition */}
            <Card className="card-bold">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-accent-success" />
                  Qu'est-ce qu'un agent IA concret ?
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Un agent IA métier est une application spécialisée qui automatise des tâches opérationnelles, 
                  avec une intelligence spécifique à chaque secteur ou fonction.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent-success rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Gestionnaire client</strong> pour experts-comptables
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent-success rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Assistant RH</strong> pour pré-sélectionner rapidement des CV
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent-success rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Agent commercial</strong> pour analyser et personnaliser la prospection
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent-success rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Agent administratif</strong> qui gère automatiquement la facturation
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Benefits */}
            <Card className="card-bold">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-accent-success" />
                  Révolution du travail en PME
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-accent-success mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Automatisation intelligente</h4>
                      <p className="text-sm text-muted-foreground">
                        Libération de 15 à 100h/mois selon le métier
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-accent-success mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Accès à l'expertise premium</h4>
                      <p className="text-sm text-muted-foreground">
                        Intelligence des meilleurs experts sectoriels intégrée
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-accent-success mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">ROI immédiat</h4>
                      <p className="text-sm text-muted-foreground">
                        Retour sur investissement moyen de 300% dès la première année
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Table */}
          <Card className="card-bold mb-12">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-6 text-center">
                Pourquoi nos agents sont-ils plus performants ?
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left py-3 px-4 font-bold text-foreground">
                        Agent IA métier OrchestraConnect
                      </th>
                      <th className="text-left py-3 px-4 font-bold text-foreground">
                        ChatGPT, Claude, IA généralistes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-accent-success rounded-full"></div>
                          <span className="text-sm">Spécialisation secteur/métier</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        Généralistes, non adaptés aux contextes métier
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-accent-success rounded-full"></div>
                          <span className="text-sm">Intègre la réglementation française</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        Réponses génériques, pas d'intégration métier
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-accent-success" />
                          <span className="text-sm">Made in France - RGPD garanti</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        Serveurs hors Europe, conformité RGPD non garantie
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-accent-success rounded-full"></div>
                          <span className="text-sm">Déploiement en 48h, Plug & Play</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        Mise en œuvre technique complexe
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-accent-success rounded-full"></div>
                          <span className="text-sm">Collaboration humaine augmentée</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        Pas de guidage métier personnalisé
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-gradient-success">
              <CardContent className="p-6">
                <h4 className="font-bold text-white mb-3">Expert-comptable</h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  "J'ai automatisé 80% de la gestion administrative et économisé 100h/mois, 
                  pour me consacrer au conseil à forte valeur ajoutée."
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-gradient-primary">
              <CardContent className="p-6">
                <h4 className="font-bold text-white mb-3">Dirigeante PME</h4>
                <p className="text-white/90 text-sm leading-relaxed">
                  "J'ai libéré 15h/semaine grâce à la délégation intelligente des tâches répétitives, 
                  avec un ROI mensuel de 5 000 € pour un coût d'agent IA de 299 €/mois."
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Conclusion */}
          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              En résumé, les <strong>agents IA métier</strong> sont une nouvelle génération d'outils IA 
              radicalement plus utiles et rentables pour les PME, car ils s'appuient sur l'intelligence 
              humaine sectorielle, fournissent une automation clé en main, et garantissent des gains 
              mesurables en performance, compétitivité et satisfaction employés.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AIAgentExplanation;