import Logo from "./Logo";

const HeaderLanding = () => {
  const scrollToAudit = () => {
    const element = document.getElementById('audit-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-header border-b border-gray-200">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer transition-opacity duration-200 hover:opacity-80" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Logo size="md" />
            <span className="text-lg font-semibold text-gray-900">AgentConnect</span>
          </div>

          {/* CTA Premium */}
          <button 
            onClick={scrollToAudit}
            className="btn-primary btn-md"
          >
            <span className="hidden md:inline">Audit Gratuit</span>
            <span className="md:hidden">Audit</span>
            <svg 
              className="w-4 h-4 ml-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7l5 5m0 0l-5 5m5-5H6" 
              />
            </svg>
          </button>

        </div>
      </div>
    </header>
  );
};

export default HeaderLanding;
