import { Bot, Mail, Phone, MapPin, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-white border-t-2 border-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Logo et Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent-success rounded-lg flex items-center justify-center border-2 border-white shadow-[2px_2px_0px_#ffffff]">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Orchestra Connect</h3>
                <p className="text-sm text-white/80 font-medium">Agents IA Sur-Mesure</p>
              </div>
            </div>
            <p className="text-white/80 font-medium leading-relaxed mb-6">
              Révolutionnez votre entreprise avec des agents IA spécialisés, connectés à plus de 500 outils métier. 
              Automatisation intelligente, ROI garanti.
            </p>
            <Button 
              onClick={() => scrollToSection('audit-form')}
              className="bg-accent-success text-white hover:bg-accent-success/90 font-bold text-sm px-6 py-3 border-2 border-white shadow-[2px_2px_0px_#ffffff] hover:shadow-[4px_4px_0px_#ffffff] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
            >
              Audit Gratuit
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Solutions</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('agent-request-form')}
                  className="text-white/80 font-medium hover:text-accent-warning transition-colors duration-200 flex items-center gap-2"
                >
                  Agents IA Spécialisés
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('value-proposition')}
                  className="text-white/80 font-medium hover:text-accent-warning transition-colors duration-200 flex items-center gap-2"
                >
                  Automatisation Métier
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('audit-form')}
                  className="text-white/80 font-medium hover:text-accent-warning transition-colors duration-200 flex items-center gap-2"
                >
                  Audit d'Automatisation
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('blog-section')}
                  className="text-white/80 font-medium hover:text-accent-warning transition-colors duration-200 flex items-center gap-2"
                >
                  Formations IA
                  <ExternalLink className="w-3 h-3" />
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
                  className="text-white/80 font-medium hover:text-accent-warning transition-colors duration-200 flex items-center gap-2"
                >
                  Blog & Actualités
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="/documentation" 
                  className="text-white/80 font-medium hover:text-accent-warning transition-colors duration-200 flex items-center gap-2"
                >
                  Documentation
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="/cas-clients" 
                  className="text-white/80 font-medium hover:text-accent-warning transition-colors duration-200 flex items-center gap-2"
                >
                  Cas Clients
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="/support" 
                  className="text-white/80 font-medium hover:text-accent-warning transition-colors duration-200 flex items-center gap-2"
                >
                  Support 24/7
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent-warning" />
                <a 
                  href="mailto:contact@orchestraconnect.fr" 
                  className="text-white/80 font-medium hover:text-accent-warning transition-colors duration-200"
                >
                  contact@orchestraconnect.fr
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent-warning" />
                <a 
                  href="tel:+33123456789" 
                  className="text-white/80 font-medium hover:text-accent-warning transition-colors duration-200"
                >
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-warning mt-0.5" />
                <span className="text-white/80 font-medium">
                  123 Avenue des Champs-Élysées<br />
                  75008 Paris, France
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t-2 border-white pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-white/80 font-medium text-sm">
                © 2024 Orchestra Connect. Tous droits réservés.
              </p>
              <p className="text-white/60 font-medium text-xs mt-1">
                Agents IA spécialisés • Automatisation intelligente • ROI garanti
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <a 
                href="/mentions-legales" 
                className="text-white/60 font-medium text-sm hover:text-accent-warning transition-colors duration-200"
              >
                Mentions Légales
              </a>
              <a 
                href="/politique-confidentialite" 
                className="text-white/60 font-medium text-sm hover:text-accent-warning transition-colors duration-200"
              >
                Politique de Confidentialité
              </a>
              <a 
                href="/cgv" 
                className="text-white/60 font-medium text-sm hover:text-accent-warning transition-colors duration-200"
              >
                CGV
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
