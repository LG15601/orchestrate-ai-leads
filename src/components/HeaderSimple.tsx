export default function HeaderSimple() {
  const scrollToAudit = () => {
    const element = document.getElementById('audit-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="glass-header" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          height: '64px'
        }}>
          <div style={{ 
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'var(--gray-900)',
            cursor: 'pointer'
          }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            AgentConnect
          </div>
          
          <button onClick={scrollToAudit} className="btn btn-primary">
            Audit Gratuit
          </button>
        </div>
      </div>
    </header>
  );
}
