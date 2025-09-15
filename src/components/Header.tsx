import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Bot, ArrowRight } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-background border-b-2 border-black sticky top-0 z-50 shadow-[0px_4px_0px_#000000]">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent-success rounded-lg flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-black">AgentConnect</h1>
              <p className="text-xs text-black/60 font-medium">powered by OrchestraConnect.fr</p>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('audit-form')}
              className="text-black font-medium hover:text-accent-success transition-colors duration-200 text-sm"
            >
              Audit Gratuit
            </button>
            <button 
              onClick={() => scrollToSection('agent-request-form')}
              className="text-black font-medium hover:text-accent-success transition-colors duration-200 text-sm"
            >
              Nos Agents IA
            </button>
            <button 
              onClick={() => scrollToSection('value-proposition')}
              className="text-black font-medium hover:text-accent-success transition-colors duration-200 text-sm"
            >
              Solutions
            </button>
            <button 
              onClick={() => scrollToSection('blog-section')}
              className="text-black font-medium hover:text-accent-success transition-colors duration-200 text-sm"
            >
              Blog
            </button>
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              onClick={() => scrollToSection('audit-form')}
              className="bg-accent-success text-white hover:bg-accent-success/90 font-bold text-xs px-4 py-2 border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
            >
              Commencer l'Audit
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t-2 border-black bg-background">
            <nav className="py-4 space-y-4">
              <button 
                onClick={() => scrollToSection('audit-form')}
                className="block w-full text-left text-black font-medium hover:text-accent-success transition-colors duration-200 py-2"
              >
                Audit Gratuit
              </button>
              <button 
                onClick={() => scrollToSection('agent-request-form')}
                className="block w-full text-left text-black font-medium hover:text-accent-success transition-colors duration-200 py-2"
              >
                Nos Agents IA
              </button>
              <button 
                onClick={() => scrollToSection('value-proposition')}
                className="block w-full text-left text-black font-medium hover:text-accent-success transition-colors duration-200 py-2"
              >
                Solutions
              </button>
              <button 
                onClick={() => scrollToSection('blog-section')}
                className="block w-full text-left text-black font-medium hover:text-accent-success transition-colors duration-200 py-2"
              >
                Blog
              </button>
              <div className="pt-4 border-t-2 border-black">
                <Button 
                  onClick={() => scrollToSection('audit-form')}
                  className="w-full bg-accent-success text-white hover:bg-accent-success/90 font-bold text-sm px-6 py-3 border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
                >
                  Commencer l'Audit
                  <ArrowRight className="w-4 h-4 ml-2" />
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
