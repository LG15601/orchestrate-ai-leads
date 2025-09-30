import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Check, ArrowRight } from "lucide-react";

const FinalCTA = () => {
  const scrollToAudit = () => {
    const element = document.getElementById('audit-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Votre prochaine décision va changer votre quotidien
            </h2>
            <p className="text-lg text-muted-foreground">
              Dans 6 mois, vous serez soit au même endroit... soit transformé
            </p>
          </div>

          {/* Two Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            
            {/* Option 1: Ne rien faire */}
            <Card className="p-8 border-2 border-red-500/30 bg-red-500/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <X className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Option 1 : Ne rien faire
                </h3>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Continuer à travailler 60h/semaine</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Rester débordé par l'administratif</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Voir vos concurrents vous dépasser</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Culpabiliser de ne pas voir assez votre famille</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Remettre à "plus tard" les projets qui vous tiennent à cœur</span>
                </li>
              </ul>

              <div className="bg-red-500/10 rounded-lg p-4 border-2 border-red-500/20">
                <p className="text-sm font-semibold text-foreground">
                  Dans 6 mois :
                </p>
                <p className="text-sm text-muted-foreground">
                  Vous serez exactement au même endroit.<br />
                  Peut-être plus épuisé.
                </p>
              </div>
            </Card>

            {/* Option 2: Faire l'audit */}
            <Card className="p-8 border-2 border-accent-success bg-accent-success/5 relative">
              <div className="absolute -top-3 -right-3 bg-accent-warning text-white px-3 py-1 rounded-full text-xs font-bold border-2 border-black shadow-lg rotate-12">
                RECOMMANDÉ
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-accent-success/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-accent-success" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Option 2 : Faire l'audit gratuit
                </h3>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent-success mt-1">✓</span>
                  <span>Découvrir combien d'heures vous pourriez récupérer</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent-success mt-1">✓</span>
                  <span>Voir concrètement quels Agents IA vous aideraient</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent-success mt-1">✓</span>
                  <span>Recevoir un plan d'action personnalisé</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent-success mt-1">✓</span>
                  <span>Aucun engagement, aucune carte bancaire</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent-success mt-1">✓</span>
                  <span>15 minutes de votre temps, résultat immédiat</span>
                </li>
              </ul>

              <div className="bg-accent-success/10 rounded-lg p-4 border-2 border-accent-success/30">
                <p className="text-sm font-semibold text-foreground">
                  Dans 6 mois :
                </p>
                <p className="text-sm text-muted-foreground">
                  Vous aurez récupéré 500+ heures.<br />
                  Développé votre CA. Retrouvé du temps pour vous.
                </p>
              </div>
            </Card>

          </div>

          {/* Decision Block */}
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-primary/10 to-accent-success/10 rounded-lg p-8 border-2 border-primary/20 max-w-3xl">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Le choix vous appartient.
              </h3>
              <p className="text-muted-foreground mb-6">
                Mais dans 6 mois, vous aurez soit :
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-6">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-accent-success" />
                  <span className="font-semibold text-foreground">Transformé votre quotidien d'entrepreneur</span>
                </div>
                <span className="text-muted-foreground">ou</span>
                <div className="flex items-center gap-2">
                  <X className="w-5 h-5 text-red-500" />
                  <span className="font-semibold text-foreground">Regretté de ne pas avoir essayé</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">
                L'audit est gratuit. Vous n'avez rien à perdre.<br />
                Et potentiellement 100h/mois à gagner.
              </p>
            </div>
          </div>

          {/* Giant CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-accent-success via-accent-success to-primary p-8 md:p-12 rounded-2xl border-4 border-black shadow-[8px_8px_0px_#000000]">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                🚀 OUI, JE VEUX DÉCOUVRIR MON POTENTIEL
              </h2>
              <p className="text-white/90 text-lg mb-6">
                Audit gratuit • 15 minutes • Résultat immédiat
              </p>
              <Button 
                size="lg"
                onClick={scrollToAudit}
                className="bg-white text-accent-success hover:bg-white/90 px-12 py-8 h-auto text-xl font-bold border-4 border-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
              >
                COMMENCER MON AUDIT GRATUIT
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
              <p className="text-white/80 text-sm mt-6">
                427 entrepreneurs l'ont fait ce mois-ci. Aucun regret.
              </p>
            </div>
          </div>

          {/* Final Reassurance */}
          <div className="mt-12 text-center">
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent-success" />
                <span>Sans engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent-success" />
                <span>Sans carte bancaire</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent-success" />
                <span>RGPD & hébergement France</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent-success" />
                <span>Réponse en 24h</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
