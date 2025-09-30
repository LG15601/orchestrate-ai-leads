const Hero = () => {
  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center relative overflow-hidden pt-20">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <div className="mb-6 animate-fade-in opacity-0">
            <span className="badge-neutral">
              ✨ Nouvelle génération d'automatisation
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 leading-[1.1] tracking-tight animate-fade-in opacity-0 animate-delay-100">
            Et si vous aviez enfin du temps<br />
            pour <span className="gradient-text">développer vraiment</span><br />
            votre entreprise ?
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in opacity-0 animate-delay-200">
            Chaque mois, vous perdez <strong>80 à 120 heures</strong> sur des tâches répétitives.
            <br />
            Découvrez combien de temps vous pourriez récupérer avec des employés IA.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in opacity-0 animate-delay-300">
            <button 
              className="btn-primary btn-lg"
              onClick={() => scrollToSection('audit-form')}
            >
              Audit Gratuit en 15 min
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button 
              className="btn-ghost btn-lg"
              onClick={() => scrollToSection('ai-explanation')}
            >
              Voir comment ça marche
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="animate-fade-in opacity-0 animate-delay-400">
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Sans engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Résultat immédiat</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>100% gratuit</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">
              Déjà adopté par <strong className="text-gray-900">40+ PME françaises</strong>
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-500">
              <span>Experts-comptables</span>
              <span className="text-gray-300">•</span>
              <span>Agences immobilières</span>
              <span className="text-gray-300">•</span>
              <span>Cabinets de conseil</span>
              <span className="text-gray-300">•</span>
              <span>E-commerces</span>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;