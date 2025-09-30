import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const HeaderLanding = () => {
  const scrollToAudit = () => {
    const element = document.getElementById('audit-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo size="md" className="shadow-lg" />
            <h1 className="text-xl font-bold text-black">AgentConnect</h1>
          </div>

          {/* CTA Simple */}
          <Button 
            onClick={scrollToAudit}
            size="lg"
            className="bg-black text-white hover:bg-gray-800 font-bold px-6 md:px-8 py-2 md:py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span className="hidden md:inline">🚀 AUDIT GRATUIT</span>
            <span className="md:hidden">AUDIT</span>
          </Button>

        </div>
      </div>
    </header>
  );
};

export default HeaderLanding;
