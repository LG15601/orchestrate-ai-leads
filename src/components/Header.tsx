import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Bot, ArrowRight, ChevronDown } from "lucide-react";
import Logo from "./Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-[#f5ff7d] border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Logo size="md" className="shadow-lg" />
            <h1 className="text-xl font-bold text-black">AgentConnect</h1>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Product Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                className="flex items-center gap-1 text-black hover:text-gray-700 transition-colors duration-200 font-medium"
              >
                Solutions
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isProductDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  <button 
                    onClick={() => { scrollToSection('agent-request-form'); setIsProductDropdownOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-200"
                  >
                    Agents IA Spécialisés
                  </button>
                  <button 
                    onClick={() => { scrollToSection('value-proposition'); setIsProductDropdownOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-200"
                  >
                    Automatisation Métier
                  </button>
                  <button 
                    onClick={() => { scrollToSection('audit-form'); setIsProductDropdownOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-200"
                  >
                    Audit d'Automatisation
                  </button>
                  <button 
                    onClick={() => { scrollToSection('ai-explanation'); setIsProductDropdownOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black transition-colors duration-200"
                  >
                    Qu'est-ce qu'un Agent IA ?
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={() => scrollToSection('blog-section')}
              className="text-black hover:text-gray-700 transition-colors duration-200 font-medium"
            >
              Blog
            </button>
            <button 
              onClick={() => scrollToSection('express-form')}
              className="text-black hover:text-gray-700 transition-colors duration-200 font-medium"
            >
              Arrêtez de vous concentrer sur les tâches manuelles
            </button>
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden md:flex items-center">
            <Button 
              onClick={() => scrollToSection('audit-form')}
              className="bg-black text-white hover:bg-gray-800 font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
            >
              RÉSERVER UNE DÉMO
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-[#f5ff7d]">
            <nav className="py-4 space-y-4">
              <div className="px-4">
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Solutions</h4>
                <div className="space-y-2">
                  <button 
                    onClick={() => { scrollToSection('agent-request-form'); setIsMenuOpen(false); }}
                    className="block w-full text-left text-black hover:text-gray-700 transition-colors duration-200 py-2"
                  >
                    Agents IA Spécialisés
                  </button>
                  <button 
                    onClick={() => { scrollToSection('value-proposition'); setIsMenuOpen(false); }}
                    className="block w-full text-left text-black hover:text-gray-700 transition-colors duration-200 py-2"
                  >
                    Automatisation Métier
                  </button>
                  <button 
                    onClick={() => { scrollToSection('audit-form'); setIsMenuOpen(false); }}
                    className="block w-full text-left text-black hover:text-gray-700 transition-colors duration-200 py-2"
                  >
                    Audit d'Automatisation
                  </button>
                  <button 
                    onClick={() => { scrollToSection('ai-explanation'); setIsMenuOpen(false); }}
                    className="block w-full text-left text-black hover:text-gray-700 transition-colors duration-200 py-2"
                  >
                    Qu'est-ce qu'un Agent IA ?
                  </button>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 px-4">
                <button 
                  onClick={() => { scrollToSection('blog-section'); setIsMenuOpen(false); }}
                  className="block w-full text-left text-black hover:text-gray-700 transition-colors duration-200 py-2"
                >
                  Blog
                </button>
                <button 
                  onClick={() => { scrollToSection('express-form'); setIsMenuOpen(false); }}
                  className="block w-full text-left text-black hover:text-gray-700 transition-colors duration-200 py-2"
                >
                  Arrêtez de vous concentrer sur les tâches manuelles
                </button>
              </div>

              <div className="pt-4 px-4">
                <Button 
                  onClick={() => { scrollToSection('audit-form'); setIsMenuOpen(false); }}
                  className="w-full bg-black text-white hover:bg-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  RÉSERVER UNE DÉMO
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
