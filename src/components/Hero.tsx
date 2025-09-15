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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6 leading-tight animate-fade-in">
            Révolutionnez Votre Entreprise avec des{" "}
            <span className="text-primary font-normal">Agents IA</span>{" "}
            Sur-Mesure
          </h1>
          
          {/* Subtitle */}
          <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed animate-slide-up">
            Analysez vos besoins, optimisez vos processus et libérez le potentiel de vos équipes avec AgentConnect
          </p>
          
          {/* Statistics - Minimalist Style */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mb-12 animate-slide-up">
            <div className="text-center">
              <span className="text-xl md:text-2xl font-light text-foreground">40%</span>
              <p className="text-xs text-muted-foreground font-light tracking-wide">RÉDUCTION COÛTS</p>
            </div>
            
            <div className="text-center">
              <span className="text-xl md:text-2xl font-light text-foreground">60h</span>
              <p className="text-xs text-muted-foreground font-light tracking-wide">TEMPS ÉCONOMISÉ/MOIS</p>
            </div>
            
            <div className="text-center">
              <span className="text-xl md:text-2xl font-light text-foreground">300%</span>
              <p className="text-xs text-muted-foreground font-light tracking-wide">ROI MOYEN</p>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12 animate-slide-up">
            <Button 
              size="lg" 
              className="btn-bold-primary min-w-40 h-10 text-sm"
              onClick={() => scrollToSection('audit-form')}
            >
              AUDIT GRATUIT
            </Button>
            <Button 
              size="lg" 
              className="bg-accent-success text-white hover:bg-accent-success/90 min-w-40 h-10 text-sm font-bold border-2 border-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
              onClick={() => scrollToSection('agent-request-form')}
            >
              DEMANDER UN AGENT IA
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="animate-slide-up">
            <p className="text-xs text-muted-foreground mb-4 font-light tracking-widest uppercase">
              Ils nous font confiance
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <span className="text-sm text-muted-foreground font-light tracking-wide">TechCorp</span>
              <div className="w-px h-4 bg-border"></div>
              <span className="text-sm text-muted-foreground font-light tracking-wide">InnovSolutions</span>
              <div className="w-px h-4 bg-border"></div>
              <span className="text-sm text-muted-foreground font-light tracking-wide">FutureAI</span>
              <div className="w-px h-4 bg-border"></div>
              <span className="text-sm text-muted-foreground font-light tracking-wide">NextGen</span>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;