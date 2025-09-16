import { Bot, Mail, Phone, MapPin, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Footer = () => {
  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Section jaune */}
      <div className="bg-[#f5ff7d] py-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-6">
              Unlock Your Business Automation
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Start activating the automation that matters. Get started now to see how AgentConnect can 
              <strong> simplify</strong> and <strong>supercharge</strong> your business workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => scrollToSection('audit-form')}
                className="bg-black text-white hover:bg-gray-800 font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
              >
                Get Started
              </Button>
              <Button 
                onClick={() => scrollToSection('audit-form')}
                className="bg-white text-black hover:bg-gray-50 font-semibold px-8 py-3 rounded-lg border border-gray-300 transition-colors duration-200"
              >
                Or, book a demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer noir */}
      <footer className="bg-black text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
            {/* Logo et Description */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <Logo size="sm" />
                <h3 className="text-xl font-bold text-white">AgentConnect</h3>
              </div>
              <p className="text-white/80 font-medium leading-relaxed mb-6">
                Révolutionnez votre entreprise avec des agents IA spécialisés, connectés à plus de 500 outils métier. 
                Automatisation intelligente, ROI garanti.
              </p>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Solutions</h4>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => scrollToSection('agent-request-form')}
                    className="text-white/80 font-medium hover:text-white transition-colors duration-200"
                  >
                    Agents IA Spécialisés
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('value-proposition')}
                    className="text-white/80 font-medium hover:text-white transition-colors duration-200"
                  >
                    Automatisation Métier
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('audit-form')}
                    className="text-white/80 font-medium hover:text-white transition-colors duration-200"
                  >
                    Audit d'Automatisation
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('blog-section')}
                    className="text-white/80 font-medium hover:text-white transition-colors duration-200"
                  >
                    Formations IA
                  </button>
                </li>
              </ul>
            </div>

            {/* Ressources */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Ressources</h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="/blog" 
                    className="text-white/80 font-medium hover:text-white transition-colors duration-200"
                  >
                    Blog & Actualités
                  </a>
                </li>
                <li>
                  <a 
                    href="/documentation" 
                    className="text-white/80 font-medium hover:text-white transition-colors duration-200"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a 
                    href="/cas-clients" 
                    className="text-white/80 font-medium hover:text-white transition-colors duration-200"
                  >
                    Cas Clients
                  </a>
                </li>
                <li>
                  <a 
                    href="/support" 
                    className="text-white/80 font-medium hover:text-white transition-colors duration-200"
                  >
                    Support 24/7
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-white/60" />
                  <a 
                    href="mailto:contact@agentconnect.fr" 
                    className="text-white/80 font-medium hover:text-white transition-colors duration-200"
                  >
                    contact@agentconnect.fr
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-white/60" />
                  <a 
                    href="tel:+33123456789" 
                    className="text-white/80 font-medium hover:text-white transition-colors duration-200"
                  >
                    +33 1 23 45 67 89
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-white/60 mt-0.5" />
                  <span className="text-white/80 font-medium">
                    123 Avenue des Champs-Élysées<br />
                    75008 Paris, France
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-white/80 font-medium text-sm">
                  © 2024 AgentConnect powered by OrchestraConnect.fr. Tous droits réservés.
                </p>
                <p className="text-white/60 font-medium text-xs mt-1">
                  Agents IA spécialisés • Automatisation intelligente • ROI garanti
                </p>
              </div>
              
              <div className="flex items-center gap-6">
                <a 
                  href="/mentions-legales" 
                  className="text-white/60 font-medium text-sm hover:text-white transition-colors duration-200"
                >
                  Mentions Légales
                </a>
                <a 
                  href="/politique-confidentialite" 
                  className="text-white/60 font-medium text-sm hover:text-white transition-colors duration-200"
                >
                  Politique de Confidentialité
                </a>
                <a 
                  href="/cgv" 
                  className="text-white/60 font-medium text-sm hover:text-white transition-colors duration-200"
                >
                  CGV
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
