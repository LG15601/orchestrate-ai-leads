import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen bg-background flex items-center relative overflow-hidden">
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight animate-fade-in">
            Et si vous aviez enfin du temps<br />
            pour développer{" "}
            <span className="text-primary">VRAIMENT</span>{" "}
            votre entreprise ?
          </h1>
          
          {/* Subtitle */}
          <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Chaque mois, vous perdez <strong>80 à 120 heures</strong> sur des tâches répétitives, 
            administratives ou chronophages. Pendant ce temps, vos concurrents grandissent, 
            vos clients attendent, et votre vie personnelle en pâtit.
            <br /><br />
            <strong>AgentConnect</strong> vous montre exactement combien de temps vous pourriez 
            récupérer avec des "employés IA" qui travaillent pour vous 24h/24, 
            sans congés, sans erreurs, et pour le prix d'un déjeuner.
          </p>
          
          {/* Statistics - Impact Réel */}
          <div className="grid md:grid-cols-4 gap-6 mb-12 animate-slide-up max-w-4xl mx-auto">
            <div className="text-center p-4 bg-accent-success/10 rounded-lg border-2 border-accent-success/20">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">120h</div>
              <p className="text-sm text-muted-foreground">récupérées chaque mois</p>
              <p className="text-xs text-muted-foreground/70 mt-1">(3 semaines de travail)</p>
            </div>
            
            <div className="text-center p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">300€</div>
              <p className="text-sm text-muted-foreground">par employé IA/mois</p>
              <p className="text-xs text-muted-foreground/70 mt-1">(vs 2500€ employé)</p>
            </div>
            
            <div className="text-center p-4 bg-accent-warning/10 rounded-lg border-2 border-accent-warning/20">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">48h</div>
              <p className="text-sm text-muted-foreground">pour déployer</p>
              <p className="text-xs text-muted-foreground/70 mt-1">(pas de recrutement)</p>
            </div>
            
            <div className="text-center p-4 bg-accent-success/10 rounded-lg border-2 border-accent-success/20">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">24/7</div>
              <p className="text-sm text-muted-foreground">travail continu</p>
              <p className="text-xs text-muted-foreground/70 mt-1">(weekend inclus)</p>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up">
            <Button 
              size="lg" 
              className="bg-accent-success text-white hover:bg-accent-success/90 px-8 py-6 h-auto text-base font-bold border-2 border-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
              onClick={() => scrollToSection('audit-form')}
            >
              🚀 DÉCOUVRIR MON POTENTIEL DE TEMPS LIBÉRÉ
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-6 py-6 h-auto text-sm border-2"
              onClick={() => scrollToSection('ai-explanation')}
            >
              Voir ce qu'un employé IA peut faire pour moi
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mb-8 animate-slide-up">
            ✅ Audit gratuit • ✅ 15 minutes • ✅ Résultat immédiat • ✅ Sans engagement
          </p>
          
          {/* Trust Indicators */}
          <div className="animate-slide-up">
            <p className="text-sm text-muted-foreground mb-4 font-semibold">
              Déjà adopté par 40+ PME françaises
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 opacity-80">
              <span className="text-sm text-muted-foreground">🏢 Experts-comptables</span>
              <div className="w-px h-4 bg-border"></div>
              <span className="text-sm text-muted-foreground">🏘️ Agences immobilières</span>
              <div className="w-px h-4 bg-border"></div>
              <span className="text-sm text-muted-foreground">💼 Cabinets de conseil</span>
              <div className="w-px h-4 bg-border"></div>
              <span className="text-sm text-muted-foreground">🛒 E-commerces</span>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;