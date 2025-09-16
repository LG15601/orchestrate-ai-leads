import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Bot, 
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Zap,
  Target,
  Clock,
  TrendingUp
} from "lucide-react";

const AuditIntroduction = () => {
  return (
    <div className="space-y-8">
      {/* En-tête principal */}
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Les <span className="text-primary">Agents IA OrchestraConnect</span> : 
          Révolution pour les PME
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Découvrez comment nos agents IA métier transforment radicalement votre entreprise, 
          bien au-delà des simples assistants conversationnels
        </p>
      </div>

      {/* Qu'est-ce qu'un agent IA concret */}
      <Card className="card-bold bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-black">
            <Brain className="w-6 h-6" />
            Qu'est-ce qu'un Agent IA Concret ?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Un <strong>agent IA métier</strong> est une application spécialisée qui automatise des tâches opérationnelles, 
            avec une intelligence spécifique à chaque secteur ou fonction. Contrairement aux assistants IA généralistes, 
            nos agents IA savent traiter la réglementation française, intègrent les spécificités des métiers, 
            et se branchent nativement aux logiciels utilisés en PME.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
              <h4 className="font-bold text-blue-800 mb-2">Exemples d'Agents IA Métier</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Gestionnaire client pour experts-comptables</li>
                <li>• Assistant RH pour pré-sélectionner des CV</li>
                <li>• Agent commercial pour analyser la prospection</li>
                <li>• Agent administratif pour la facturation</li>
              </ul>
            </div>
            
            <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
              <h4 className="font-bold text-green-800 mb-2">Spécificités Françaises</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Réglementation française intégrée</li>
                <li>• Conformité RGPD garantie</li>
                <li>• Hébergement souverain en France</li>
                <li>• Support local en français</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparaison détaillée */}
      <Card className="card-bold bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-black">
            <Target className="w-6 h-6" />
            Pourquoi nos Agents IA sont plus performants que ChatGPT ?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-4 bg-green-50 text-green-800 font-bold">
                    Agent IA Métier OrchestraConnect
                  </th>
                  <th className="text-left p-4 bg-gray-50 text-gray-800 font-bold">
                    ChatGPT, Claude, IA Généralistes
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-100">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="font-medium">Spécialisation secteur/métier</span>
                    </div>
                    <p className="text-gray-600 text-xs mt-1">Expertise comptable, RH, industrie, santé</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 text-gray-400">❌</div>
                      <span>Généralistes, non adaptés aux contextes métier</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="font-medium">Intégration réglementation & outils PME</span>
                    </div>
                    <p className="text-gray-600 text-xs mt-1">Workflows réels, automatisation sur mesure</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 text-gray-400">❌</div>
                      <span>Réponses génériques, pas d'intégration directe</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="font-medium">Made in France</span>
                    </div>
                    <p className="text-gray-600 text-xs mt-1">Hébergement souverain RGPD, support local</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 text-gray-400">❌</div>
                      <span>Serveurs hors Europe, conformité RGPD non garantie</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="font-medium">Déploiement Plug & Play</span>
                    </div>
                    <p className="text-gray-600 text-xs mt-1">48h, zéro code requis</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 text-gray-400">❌</div>
                      <span>Mise en œuvre technique complexe</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="font-medium">Collaboration humaine augmentée</span>
                    </div>
                    <p className="text-gray-600 text-xs mt-1">Entraîne l'utilisateur, recommandations personnalisées</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 text-gray-400">❌</div>
                      <span>Pas de guidage métier, pas d'apprentissage</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Révolution du travail en PME */}
      <Card className="card-bold bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-black">
            <Lightbulb className="w-6 h-6" />
            En quoi les Agents IA révolutionnent le travail en PME ?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
              <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Automatisation Intelligente
              </h4>
              <p className="text-sm text-blue-700 mb-3">
                Les tâches administratives, répétitives ou chronophages (saisie comptable, relances, 
                reporting, pré-qualifications RH, veille réglementaire) sont automatisées.
              </p>
              <div className="bg-blue-100 p-3 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">
                  <strong>Résultat :</strong> 15 à 100h/mois libérées selon le métier
                </p>
              </div>
            </div>
            
            <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
              <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Accès à l'Expertise Premium
              </h4>
              <p className="text-sm text-green-700 mb-3">
                L'intelligence des meilleurs experts sectoriels est directement intégrée, 
                démocratisant l'excellence même pour les plus petites structures.
              </p>
              <div className="bg-green-100 p-3 rounded-lg">
                <p className="text-sm text-green-800 font-medium">
                  <strong>Avantage :</strong> Sans les coûts d'un consultant senior
                </p>
              </div>
            </div>
            
            <div className="p-4 border-2 border-purple-200 rounded-lg bg-purple-50">
              <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                ROI Immédiat et Mesurable
              </h4>
              <p className="text-sm text-purple-700 mb-3">
                Les études terrain montrent un retour sur investissement moyen de 300% dès la première année.
              </p>
              <div className="bg-purple-100 p-3 rounded-lg">
                <p className="text-sm text-purple-800 font-medium">
                  <strong>Impact :</strong> Productivité, croissance CA, satisfaction clients
                </p>
              </div>
            </div>
            
            <div className="p-4 border-2 border-orange-200 rounded-lg bg-orange-50">
              <h4 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Formation et Montée en Compétences
              </h4>
              <p className="text-sm text-orange-700 mb-3">
                L'agent explique ses choix et guide les collaborateurs, 
                automatisant aussi l'apprentissage continu.
              </p>
              <div className="bg-orange-100 p-3 rounded-lg">
                <p className="text-sm text-orange-800 font-medium">
                  <strong>Bénéfice :</strong> Équipe plus compétente et autonome
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Témoignages et exemples concrets */}
      <Card className="card-bold bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            🎯 Témoignages et Impact Concret
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold mb-2">👩‍💼 Experte-Comptable</h4>
              <p className="text-sm text-white/90 mb-2">
                "J'ai automatisé 80% de la gestion administrative et économisé 100h/mois"
              </p>
              <p className="text-xs text-white/80">
                → Se consacre maintenant au conseil à forte valeur ajoutée
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold mb-2">👨‍💼 Dirigeant PME</h4>
              <p className="text-sm text-white/90 mb-2">
                "J'ai libéré 15h/semaine grâce à la délégation intelligente"
              </p>
              <p className="text-xs text-white/80">
                → ROI mensuel de 5 000€ pour un coût d'agent IA de 299€/mois
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold mb-2">📈 Secteur Commercial</h4>
              <p className="text-sm text-white/90 mb-2">
                "Le volume de prospection a triplé en 6 mois"
              </p>
              <p className="text-xs text-white/80">
                → Analyse intelligente des douleurs clients et personnalisation à grande échelle
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white/10 rounded-lg text-center">
            <p className="text-white/90">
              <strong>En résumé :</strong> Les agents IA métier sont une nouvelle génération d'outils IA 
              radicalement plus utiles et rentables pour les PME, car ils s'appuient sur l'intelligence 
              humaine sectorielle et garantissent des gains mesurables en performance, compétitivité et satisfaction employés.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Call to action pour l'audit */}
      <Card className="card-bold bg-gradient-to-r from-accent-success to-accent-success/80 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold mb-2">
            🚀 Prêt à Découvrir Votre Potentiel d'Automatisation ?
          </CardTitle>
          <p className="text-white/90 mb-4">
            Notre audit personnalisé analysera votre site web et identifiera 
            les opportunités d'automatisation spécifiques à votre secteur avec des agents IA OrchestraConnect
          </p>
          <div className="flex items-center justify-center gap-2 text-white/80">
            <ArrowRight className="w-4 h-4" />
            <span className="text-sm">Faites défiler vers le bas pour commencer votre audit gratuit</span>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default AuditIntroduction;
