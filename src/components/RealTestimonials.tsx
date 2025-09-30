import { TrendingUp, Clock, Smile } from "lucide-react";

const RealTestimonials = () => {
  const testimonials = [
    {
      name: "Sophie",
      role: "Expert-Comptable",
      company: "Cabinet de 3 personnes",
      before: "Je passais 25h/semaine sur la saisie comptable, les relances clients, et les questions administratives courantes. Je n'avais plus le temps de conseiller mes clients.",
      agents: [
        "Agent Comptable IA : Automatise 80% de la saisie",
        "Agent Email IA : Répond aux questions courantes",
        "Agent Relance IA : Gère les impayés automatiquement"
      ],
      results: {
        revenue: "+15 000€/an de CA (j'ai pris 8 nouveaux clients)",
        time: "20h/semaine récupérées",
        life: "Je pars désormais à 18h au lieu de 21h"
      }
    },
    {
      name: "Marc",
      role: "Agence Immobilière",
      company: "8 agents",
      before: "Mes agents passaient 40% de leur temps sur des tâches admin : qualification de leads, mise à jour CRM, envoi de documents... Au lieu de visiter et vendre.",
      agents: [
        "Agent Lead IA : Préqualifie 100% des demandes entrantes",
        "Agent CRM IA : Met à jour automatiquement tous les dossiers",
        "Agent Document IA : Prépare les mandats et compromis"
      ],
      results: {
        revenue: "+32% de ventes (mes agents sont 100% sur le terrain)",
        time: "240h/mois économisées sur l'équipe",
        life: "Mes agents sont moins stressés, plus productifs"
      },
    },
    {
      name: "Lucie",
      role: "E-commerce",
      company: "Solo-preneur",
      before: "Je passais 3-4h/jour sur les emails clients, la préparation des commandes, et les relances paniers abandonnés. Impossible de développer mon catalogue.",
      agents: [
        "Agent Support IA : Répond à 70% des questions clients automatiquement",
        "Agent Logistique IA : Prépare les bons de commande et étiquettes",
        "Agent Marketing IA : Relance les paniers et envoie les newsletters"
      ],
      results: {
        revenue: "+80% de CA en 6 mois",
        time: "90h/mois récupérées",
        life: "J'ai enfin lancé ma nouvelle collection (un rêve depuis 2 ans)"
      }
    },
    {
      name: "Thomas",
      role: "Entreprise de Plomberie",
      company: "15 techniciens",
      before: "Je gérais les devis, la facturation, le planning, les relances... Je n'étais jamais sur le terrain alors que j'ADORE mon métier.",
      agents: [
        "Agent Devis IA : Génère et envoie les devis instantanément",
        "Agent Planning IA : Optimise les tournées des techniciens",
        "Agent Facturation IA : Facture automatiquement après chaque intervention"
      ],
      results: {
        revenue: "+40% de devis signés (réactivité immédiate)",
        time: "100h/mois récupérées",
        life: "Je suis retourné sur le terrain 3 jours/semaine"
      }
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="badge-success mb-6">Témoignages Clients</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
              Des entrepreneurs comme vous témoignent
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ils étaient sceptiques au début. Aujourd'hui, ils ne pourraient plus s'en passer.
            </p>
          </div>

          {/* Testimonials */}
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="card-interactive group"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                  <span className="badge-neutral mt-2 md:mt-0">
                    Client AgentConnect
                  </span>
                </div>

                {/* Before */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 uppercase mb-3 flex items-center gap-2">
                    Avant
                  </h4>
                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.before}"
                  </p>
                </div>

                {/* Agents Used */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 uppercase mb-3 flex items-center gap-2">
                    Les Agents IA Déployés
                  </h4>
                  <div className="space-y-2">
                    {testimonial.agents.map((agent, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">→</span>
                        <span className="text-sm text-gray-900">{agent}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
                  <h4 className="text-sm font-medium text-gray-900 uppercase mb-4 flex items-center gap-2">
                    ✅ Résultats
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Revenus</p>
                        <p className="text-sm font-semibold text-gray-900">{testimonial.results.revenue}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Temps gagné</p>
                        <p className="text-sm font-semibold text-gray-900">{testimonial.results.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Smile className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Qualité de vie</p>
                        <p className="text-sm font-semibold text-gray-900">{testimonial.results.life}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Footer */}
          <div className="text-center mt-12 p-8 card-premium bg-gradient-to-br from-green-50 to-blue-50">
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Vous aussi, vous méritez de retrouver du temps
            </p>
            <p className="text-gray-700">
              Ces entrepreneurs étaient comme vous il y a 6 mois : débordés, épuisés, sceptiques.<br />
              Aujourd'hui ? Ils travaillent moins. Gagnent plus. Et vivent mieux.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RealTestimonials;
