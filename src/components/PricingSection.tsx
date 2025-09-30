import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";

const PricingSection = () => {
  const scrollToAudit = () => {
    const element = document.getElementById('audit-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const plans = [
    {
      name: "Essentiel",
      price: "299",
      description: "Pour tester et commencer à respirer",
      features: [
        "1 Agent IA spécialisé",
        "Gain estimé : 30-50h/mois",
        "Support email",
        "Mises à jour incluses",
        "Déploiement en 48h"
      ],
      highlight: false,
      roi: "Rentabilisé en 3 jours de travail économisé",
      cta: "Commencer avec 1 Agent"
    },
    {
      name: "Croissance",
      price: "549",
      description: "Le choix de 70% de nos clients",
      features: [
        "3 Agents IA spécialisés",
        "Gain estimé : 80-120h/mois",
        "Support prioritaire",
        "1 session stratégique/trimestre",
        "Déploiement en 48h",
        "Formation personnalisée"
      ],
      highlight: true,
      roi: "Rentabilisé en 5 jours de travail économisé",
      cta: "La formule la plus choisie"
    },
    {
      name: "Premium",
      price: "899",
      description: "Pour automatiser au maximum",
      features: [
        "5+ Agents IA personnalisés",
        "Gain estimé : 150-200h/mois",
        "Support illimité + WhatsApp",
        "Agents sur-mesure",
        "1 session stratégique/mois",
        "Accompagnement dédié",
        "Intégrations avancées"
      ],
      highlight: false,
      roi: "Rentabilisé en 1 semaine de travail économisé",
      cta: "Automatisation maximale"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Combien ça coûte vraiment ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Spoiler : Beaucoup moins cher qu'un employé. Et infiniment plus rentable.
            </p>
            <div className="inline-block bg-accent-success/10 border-2 border-accent-success/30 rounded-lg px-6 py-3">
              <p className="text-sm font-semibold text-foreground">
                🎁 L'audit est 100% gratuit • Aucune carte bancaire demandée
              </p>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan, index) => (
              <Card 
                key={index}
                className={`relative ${plan.highlight ? 'border-4 border-primary shadow-2xl scale-105' : 'border-2'}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-white border-2 border-black shadow-lg px-4 py-1">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Le plus populaire
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8 pt-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-foreground">{plan.price}€</span>
                    <span className="text-muted-foreground">/mois</span>
                  </div>
                  <p className="text-xs text-accent-success font-semibold">
                    ✅ {plan.roi}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4 pb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}

                  <Button 
                    className={`w-full mt-6 ${plan.highlight ? 'btn-bold-primary' : ''}`}
                    variant={plan.highlight ? "default" : "outline"}
                    size="lg"
                    onClick={scrollToAudit}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparison with Employee */}
          <div className="bg-gradient-to-br from-primary/10 via-accent-success/10 to-accent-warning/10 rounded-2xl p-8 border-2 border-primary/20 mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              La vraie comparaison : Agent IA vs Employé
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Employee Cost */}
              <div className="bg-background/90 rounded-lg p-6 border-2 border-red-500/30">
                <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-2xl">👤</span>
                  Employé à temps partiel (20h/semaine)
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salaire net</span>
                    <span className="font-semibold">1 200€/mois</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Charges patronales</span>
                    <span className="font-semibold">800€/mois</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Formation initiale</span>
                    <span className="font-semibold">500€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Votre temps de management</span>
                    <span className="font-semibold">2-3h/semaine</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Congés, absences</span>
                    <span className="font-semibold">~6 semaines/an</span>
                  </div>
                  <div className="border-t-2 border-border pt-3 flex justify-between items-center">
                    <span className="font-bold text-foreground">TOTAL mensuel</span>
                    <span className="text-2xl font-bold text-red-600">~2 500€</span>
                  </div>
                </div>
              </div>

              {/* AI Agent Cost */}
              <div className="bg-background/90 rounded-lg p-6 border-2 border-accent-success/50">
                <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-2xl">🤖</span>
                  Agent IA (Formule Essentiel)
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Abonnement mensuel</span>
                    <span className="font-semibold">299€/mois</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Charges</span>
                    <span className="font-semibold text-accent-success">0€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Formation</span>
                    <span className="font-semibold text-accent-success">0€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Votre temps de gestion</span>
                    <span className="font-semibold text-accent-success">0h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Disponibilité</span>
                    <span className="font-semibold text-accent-success">24/7/365</span>
                  </div>
                  <div className="border-t-2 border-border pt-3 flex justify-between items-center">
                    <span className="font-bold text-foreground">TOTAL mensuel</span>
                    <span className="text-2xl font-bold text-accent-success">299€</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings */}
            <div className="mt-6 text-center p-6 bg-accent-success/20 rounded-lg border-2 border-accent-success">
              <p className="text-2xl font-bold text-foreground mb-2">
                Vous économisez 2 200€ chaque mois
              </p>
              <p className="text-muted-foreground">
                Soit <strong>26 400€ par an</strong>. Pour toujours.
              </p>
            </div>
          </div>

          {/* Guarantee */}
          <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-accent-success/10 rounded-lg border-2 border-primary/20">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              <span className="text-2xl">🛡️</span>
              Garantie Satisfait ou Remboursé 30 jours
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Si au bout de 30 jours, vous n'avez pas économisé au moins 20h et vous n'êtes pas satisfait, 
              on vous rembourse intégralement. Sans discuter.
              <br /><br />
              <strong className="text-foreground">Vous ne prenez AUCUN risque. Nous oui.</strong>
            </p>
          </div>

          {/* Bonus */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-accent-warning/10 border-2 border-accent-warning rounded-lg px-6 py-4">
              <p className="text-sm font-semibold text-foreground mb-2">
                🎁 BONUS : Première semaine d'essai gratuit
              </p>
              <p className="text-xs text-muted-foreground">
                Offert aux entrepreneurs qui complètent l'audit dans les 48h
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PricingSection;
