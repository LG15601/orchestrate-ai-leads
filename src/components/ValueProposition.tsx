import React from 'react';
import { TrendingUp, Clock, Users, BarChart3 } from 'lucide-react';

const ValueProposition = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ce que vous allez découvrir : bien plus qu'un simple rapport
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une analyse approfondie qui révèle le potentiel caché de votre entreprise
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Bloc 1: Pourcentage d'Automatisation */}
          <div className="card-gradient-primary text-center group hover:scale-105 transition-all duration-300">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-primary-foreground/20 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="text-4xl font-bold text-primary-foreground mb-2">
                <span className="counter" data-target="78">XX</span>%
              </div>
            </div>
            <h3 className="text-xl font-bold text-primary-foreground mb-4">
              Votre Pourcentage d'Automatisation
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Nous quantifions précisément la part de vos opérations qui peut être déléguée à des agents IA. 
              Ne passez plus 60% de votre temps sur des tâches à faible valeur !
            </p>
          </div>

          {/* Bloc 2: Temps Récupéré */}
          <div className="card-gradient-success text-center group hover:scale-105 transition-all duration-300">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-accent-success-foreground/20 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-10 h-10 text-accent-success-foreground" />
              </div>
              <div className="text-4xl font-bold text-accent-success-foreground mb-2">
                <span className="counter" data-target="120">XX</span>h
              </div>
            </div>
            <h3 className="text-xl font-bold text-accent-success-foreground mb-4">
              Des Heures de Travail Récupérées
            </h3>
            <p className="text-accent-success-foreground/80 leading-relaxed">
              Découvrez le nombre d'heures que vous et vos équipes pouvez réallouer à la stratégie, 
              à l'innovation et à la relation client.
            </p>
          </div>

          {/* Bloc 3: Agents Experts */}
          <div className="card-gradient-warning text-center group hover:scale-105 transition-all duration-300">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-accent-warning-foreground/20 rounded-full flex items-center justify-center mb-4">
                <Users className="w-10 h-10 text-accent-warning-foreground" />
              </div>
              <div className="text-4xl font-bold text-accent-warning-foreground mb-2">
                <span className="counter" data-target="12">XX</span>+
              </div>
            </div>
            <h3 className="text-xl font-bold text-accent-warning-foreground mb-4">
              Des Agents Experts à votre Service
            </h3>
            <p className="text-accent-warning-foreground/80 leading-relaxed">
              Nous vous suggérons les profils d'agents IA les plus pertinents pour votre activité, 
              prêts à prendre en charge les tâches complexes.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-background px-8 py-4 rounded-full border-2 border-border shadow-lg">
            <TrendingUp className="w-6 h-6 text-accent-success" />
            <span className="text-lg font-semibold text-foreground">
              Prêt à transformer votre productivité ? Commencez ici. ⬇️
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;