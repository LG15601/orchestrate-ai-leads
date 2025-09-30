export default function HeroSimple() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
      paddingTop: '5rem'
    }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          
          <span className="badge" style={{ marginBottom: '1.5rem' }}>
            ✨ Nouvelle génération d'automatisation
          </span>
          
          <h1 style={{ marginBottom: '1.5rem' }}>
            Et si vous aviez enfin du temps<br />
            pour <span className="gradient-text">développer vraiment</span><br />
            votre entreprise ?
          </h1>
          
          <p style={{ 
            fontSize: '1.125rem', 
            color: 'var(--gray-600)',
            marginBottom: '2.5rem',
            maxWidth: '600px',
            margin: '0 auto 2.5rem'
          }}>
            Chaque mois, vous perdez <strong>80 à 120 heures</strong> sur des tâches répétitives.<br />
            Découvrez combien de temps vous pourriez récupérer avec des employés IA.
          </p>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            <button onClick={() => scrollToSection('audit-form')} className="btn btn-primary btn-lg">
              Audit Gratuit en 15 min
              <span>→</span>
            </button>
            <button onClick={() => scrollToSection('ai-explanation')} className="btn btn-secondary btn-lg">
              Comment ça marche
            </button>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            fontSize: '0.875rem',
            color: 'var(--gray-600)'
          }}>
            <span>✓ Sans engagement</span>
            <span>✓ Résultat immédiat</span>
            <span>✓ 100% gratuit</span>
          </div>
        </div>
      </div>
    </section>
  );
}
