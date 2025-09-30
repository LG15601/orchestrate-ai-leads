import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingCart, Calculator, Home, Wrench, Scale, 
  Megaphone, Heart, GraduationCap, Dumbbell, Scissors,
  Camera, Users, Building2, Car, Laptop
} from "lucide-react";

const UseCasesByIndustry = () => {
  const industries = [
    {
      id: "ecommerce",
      name: "E-commerce",
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      agents: [
        {
          name: "Agent Support Client",
          tasks: ["Suivi commande automatique", "Gestion retours/échanges", "FAQ produits instantanée", "Recommandations personnalisées"],
          timeSaved: "60h/mois",
          roi: "450%",
          integrations: ["Shopify", "WooCommerce", "Email", "WhatsApp", "Zendesk"],
          cost: "299€/mois"
        },
        {
          name: "Agent Relance Panier",
          tasks: ["Emails personnalisés", "SMS de rappel", "Offres ciblées", "A/B testing automatique"],
          timeSaved: "20h/mois",
          revenue: "+15-25% de conversion",
          integrations: ["Shopify", "Klaviyo", "Mailchimp", "SMS"],
          cost: "199€/mois"
        },
        {
          name: "Agent Logistique",
          tasks: ["Génération étiquettes", "Optimisation envois", "Tracking automatique", "Gestion stocks"],
          timeSaved: "40h/mois",
          roi: "320%",
          integrations: ["Shopify", "Colissimo", "Chronopost", "Google Sheets"],
          cost: "249€/mois"
        }
      ]
    },
    {
      id: "accounting",
      name: "Expert-Comptable",
      icon: Calculator,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      agents: [
        {
          name: "Agent Saisie Comptable",
          tasks: ["OCR factures", "Catégorisation automatique", "Rapprochement bancaire", "Export vers logiciel"],
          timeSaved: "100h/mois",
          roi: "600%",
          integrations: ["QuickBooks", "Sage", "Cegid", "Pennylane"],
          cost: "349€/mois"
        },
        {
          name: "Agent Relance Impayés",
          tasks: ["Détection factures impayées", "Relances graduées", "Suivi paiements", "Mise en demeure"],
          timeSaved: "30h/mois",
          revenue: "+12% de recouvrement",
          integrations: ["CRM", "Email", "SMS", "Comptabilité"],
          cost: "199€/mois"
        },
        {
          name: "Agent Reporting Client",
          tasks: ["Tableaux de bord automatiques", "Alertes personnalisées", "Envoi rapports mensuels", "Analyses prédictives"],
          timeSaved: "50h/mois",
          roi: "400%",
          integrations: ["Excel", "Power BI", "Email", "CRM"],
          cost: "299€/mois"
        }
      ]
    },
    {
      id: "realestate",
      name: "Agence Immobilière",
      icon: Home,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      agents: [
        {
          name: "Agent Qualification Leads",
          tasks: ["Réponse instantanée demandes", "Pré-qualification budget/critères", "Planification visites", "Scoring opportunités"],
          timeSaved: "80h/mois",
          revenue: "+32% de visites qualifiées",
          integrations: ["Site web", "Email", "SMS", "Calendrier"],
          cost: "349€/mois"
        },
        {
          name: "Agent CRM Automatisé",
          tasks: ["Mise à jour fiches", "Suivi pipeline", "Relances automatiques", "Reporting activité"],
          timeSaved: "40h/mois",
          roi: "380%",
          integrations: ["Salesforce", "HubSpot", "Trello", "Email"],
          cost: "249€/mois"
        },
        {
          name: "Agent Documentation",
          tasks: ["Génération mandats", "Préparation compromis", "Checklist documents", "Archivage automatique"],
          timeSaved: "25h/mois",
          roi: "250%",
          integrations: ["DocuSign", "Google Drive", "Dropbox", "CRM"],
          cost: "199€/mois"
        }
      ]
    },
    {
      id: "trades",
      name: "Artisan / Plomberie",
      icon: Wrench,
      color: "text-orange-600",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      agents: [
        {
          name: "Agent Devis Instantané",
          tasks: ["Génération devis automatique", "Envoi immédiat", "Relance si pas de réponse", "Conversion en commande"],
          timeSaved: "60h/mois",
          revenue: "+40% de signature",
          integrations: ["Site web", "Email", "SMS", "Facturation"],
          cost: "299€/mois"
        },
        {
          name: "Agent Planning Techniciens",
          tasks: ["Optimisation tournées", "Gestion urgences", "Rappels RDV", "Temps de trajet calculé"],
          timeSaved: "30h/mois",
          roi: "350%",
          integrations: ["Google Maps", "Calendrier", "SMS", "CRM"],
          cost: "249€/mois"
        },
        {
          name: "Agent Facturation Auto",
          tasks: ["Facture après intervention", "Envoi automatique", "Relances paiement", "Export comptable"],
          timeSaved: "40h/mois",
          roi: "420%",
          integrations: ["Stripe", "PayPal", "Email", "Comptabilité"],
          cost: "199€/mois"
        }
      ]
    },
    {
      id: "lawyer",
      name: "Cabinet Avocat",
      icon: Scale,
      color: "text-gray-600",
      bgColor: "bg-gray-500/10",
      borderColor: "border-gray-500/30",
      agents: [
        {
          name: "Agent Pré-qualification Dossiers",
          tasks: ["Analyse demande initiale", "Évaluation complexité", "Estimation honoraires", "Planification consultation"],
          timeSaved: "50h/mois",
          revenue: "+28% de dossiers qualifiés",
          integrations: ["Site web", "Email", "Calendrier", "CRM"],
          cost: "349€/mois"
        },
        {
          name: "Agent Recherche Juridique",
          tasks: ["Jurisprudence pertinente", "Résumés arrêts", "Veille légale", "Citations automatiques"],
          timeSaved: "70h/mois",
          roi: "500%",
          integrations: ["Legifrance", "Dalloz", "LexisNexis", "Word"],
          cost: "449€/mois"
        },
        {
          name: "Agent Suivi Dossiers",
          tasks: ["Rappels échéances", "Mise à jour clients", "Gestion délais", "Reporting avancement"],
          timeSaved: "35h/mois",
          roi: "320%",
          integrations: ["CRM juridique", "Email", "Calendrier", "SMS"],
          cost: "249€/mois"
        }
      ]
    },
    {
      id: "marketing",
      name: "Agence Marketing",
      icon: Megaphone,
      color: "text-pink-600",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/30",
      agents: [
        {
          name: "Agent Génération Contenu",
          tasks: ["Posts LinkedIn/Instagram", "Articles de blog SEO", "Newsletters clients", "Idées créatives"],
          timeSaved: "80h/mois",
          roi: "550%",
          integrations: ["LinkedIn", "Instagram", "WordPress", "Mailchimp"],
          cost: "399€/mois"
        },
        {
          name: "Agent Analyse Performance",
          tasks: ["Rapports campagnes", "Analyse ROI", "Tableaux de bord", "Alertes anomalies"],
          timeSaved: "40h/mois",
          roi: "380%",
          integrations: ["Google Analytics", "Meta Ads", "LinkedIn Ads", "Looker"],
          cost: "299€/mois"
        },
        {
          name: "Agent Lead Nurturing",
          tasks: ["Séquences email automatiques", "Scoring leads", "Relances intelligentes", "Personnalisation messages"],
          timeSaved: "50h/mois",
          revenue: "+45% de conversion",
          integrations: ["HubSpot", "Salesforce", "Mailchimp", "Zapier"],
          cost: "349€/mois"
        }
      ]
    },
    {
      id: "healthcare",
      name: "Cabinet Médical",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      agents: [
        {
          name: "Agent Prise RDV",
          tasks: ["Réservation en ligne 24/7", "Rappels patients", "Gestion annulations", "Optimisation planning"],
          timeSaved: "60h/mois",
          roi: "450%",
          integrations: ["Doctolib", "Calendrier", "SMS", "Email"],
          cost: "299€/mois"
        },
        {
          name: "Agent Administratif",
          tasks: ["Formulaires patients", "Gestion ordonnances", "Courriers médicaux", "Tiers-payant automatique"],
          timeSaved: "45h/mois",
          roi: "380%",
          integrations: ["Logiciel médical", "CPAM", "Email", "Imprimante"],
          cost: "349€/mois"
        },
        {
          name: "Agent Suivi Patients",
          tasks: ["Rappels rendez-vous", "Suivi post-consultation", "Relances examens", "Satisfaction patients"],
          timeSaved: "30h/mois",
          roi: "280%",
          integrations: ["CRM médical", "SMS", "Email", "Téléphone"],
          cost: "249€/mois"
        }
      ]
    },
    {
      id: "driving-school",
      name: "Auto-École",
      icon: GraduationCap,
      color: "text-indigo-600",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/30",
      agents: [
        {
          name: "Agent Inscription Élèves",
          tasks: ["Formulaire en ligne", "Constitution dossier", "Gestion pièces justificatives", "Suivi ANTS"],
          timeSaved: "50h/mois",
          roi: "400%",
          integrations: ["Site web", "Email", "ANTS", "Google Drive"],
          cost: "299€/mois"
        },
        {
          name: "Agent Planning Leçons",
          tasks: ["Réservation créneaux", "Optimisation moniteurs", "Rappels élèves", "Gestion annulations"],
          timeSaved: "40h/mois",
          roi: "350%",
          integrations: ["Calendrier", "SMS", "Email", "CRM"],
          cost: "249€/mois"
        },
        {
          name: "Agent Facturation & Paiements",
          tasks: ["Factures automatiques", "Paiements échelonnés", "Relances impayés", "Comptabilité"],
          timeSaved: "25h/mois",
          roi: "280%",
          integrations: ["Stripe", "Email", "Comptabilité", "CRM"],
          cost: "199€/mois"
        }
      ]
    },
    {
      id: "gym",
      name: "Salle de Sport",
      icon: Dumbbell,
      color: "text-cyan-600",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/30",
      agents: [
        {
          name: "Agent Inscription Membres",
          tasks: ["Inscription en ligne", "Gestion abonnements", "Renouvellements automatiques", "Bienvenue nouveaux"],
          timeSaved: "35h/mois",
          roi: "320%",
          integrations: ["Site web", "Stripe", "Email", "CRM"],
          cost: "249€/mois"
        },
        {
          name: "Agent Réservation Cours",
          tasks: ["Planification cours collectifs", "Gestion coachs", "Rappels membres", "Optimisation remplissage"],
          timeSaved: "30h/mois",
          roi: "290%",
          integrations: ["Calendrier", "SMS", "App mobile", "Email"],
          cost: "249€/mois"
        },
        {
          name: "Agent Relance Engagement",
          tasks: ["Suivi assiduité", "Encouragements personnalisés", "Offres réengagement", "Programmes adaptés"],
          timeSaved: "20h/mois",
          revenue: "+18% de rétention",
          integrations: ["CRM", "Email", "SMS", "App"],
          cost: "199€/mois"
        }
      ]
    },
    {
      id: "salon",
      name: "Coiffeur / Esthétique",
      icon: Scissors,
      color: "text-rose-600",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-500/30",
      agents: [
        {
          name: "Agent Réservation en Ligne",
          tasks: ["Prise RDV 24/7", "Choix prestations", "Rappels automatiques", "Gestion annulations"],
          timeSaved: "40h/mois",
          revenue: "+35% de réservations",
          integrations: ["Site web", "SMS", "Email", "Calendrier"],
          cost: "249€/mois"
        },
        {
          name: "Agent Fidélisation Client",
          tasks: ["Cartes fidélité digitales", "Offres anniversaire", "Promotions personnalisées", "Programmes parrainage"],
          timeSaved: "25h/mois",
          revenue: "+22% de clients récurrents",
          integrations: ["CRM", "Email", "SMS", "WhatsApp"],
          cost: "199€/mois"
        },
        {
          name: "Agent Stock & Commandes",
          tasks: ["Suivi produits", "Alertes rupture", "Commandes automatiques", "Gestion fournisseurs"],
          timeSaved: "15h/mois",
          roi: "200%",
          integrations: ["Excel", "Email", "Fournisseurs", "Caisse"],
          cost: "149€/mois"
        }
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent-success text-white border-2 border-black shadow-[2px_2px_0px_#000000]">
              <Users className="w-4 h-4 mr-2" />
              Cas d'Usage par Secteur
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Votre secteur est là. Votre solution aussi.
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              15+ secteurs, 45+ agents IA, des centaines d'heures économisées chaque mois
            </p>
          </div>

          {/* Industries Tabs */}
          <Tabs defaultValue="ecommerce" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2 h-auto bg-transparent mb-8">
              {industries.map((industry) => {
                const Icon = industry.icon;
                return (
                  <TabsTrigger 
                    key={industry.id}
                    value={industry.id}
                    className="flex flex-col items-center gap-2 p-3 data-[state=active]:bg-primary data-[state=active]:text-white border-2 data-[state=active]:border-black data-[state=active]:shadow-[2px_2px_0px_#000000]"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-medium text-center leading-tight">
                      {industry.name}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <TabsContent key={industry.id} value={industry.id} className="mt-0">
                  <div className="space-y-6">
                    
                    {/* Industry Header */}
                    <div className={`${industry.bgColor} ${industry.borderColor} border-2 rounded-lg p-6`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`${industry.bgColor} ${industry.borderColor} border-2 rounded-full p-3`}>
                          <Icon className={`w-6 h-6 ${industry.color}`} />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">{industry.name}</h3>
                      </div>
                      <p className="text-muted-foreground">
                        {industry.agents.length} agents IA spécialisés • Économisez jusqu'à{" "}
                        {industry.agents.reduce((acc, agent) => {
                          const hours = parseInt(agent.timeSaved);
                          return acc + (isNaN(hours) ? 0 : hours);
                        }, 0)}h/mois
                      </p>
                    </div>

                    {/* Agents Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                      {industry.agents.map((agent, idx) => (
                        <Card key={idx} className="border-2 hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="mb-4">
                              <h4 className="text-lg font-bold text-foreground mb-2">{agent.name}</h4>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-xs">
                                  ⏱️ {agent.timeSaved}
                                </Badge>
                                {agent.roi && (
                                  <Badge variant="outline" className="text-xs bg-accent-success/10 text-accent-success border-accent-success/30">
                                    💰 ROI {agent.roi}
                                  </Badge>
                                )}
                                {agent.revenue && (
                                  <Badge variant="outline" className="text-xs bg-accent-warning/10 text-accent-warning border-accent-warning/30">
                                    📈 {agent.revenue}
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div className="mb-4">
                              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Tâches automatisées</p>
                              <ul className="space-y-1.5">
                                {agent.tasks.map((task, taskIdx) => (
                                  <li key={taskIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="text-accent-success mt-0.5">→</span>
                                    <span>{task}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="mb-4">
                              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Intégrations</p>
                              <div className="flex flex-wrap gap-1">
                                {agent.integrations.map((integration, intIdx) => (
                                  <span key={intIdx} className="text-xs px-2 py-1 bg-secondary rounded text-foreground">
                                    {integration}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="pt-4 border-t border-border">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-muted-foreground">À partir de</span>
                                <span className="text-xl font-bold text-foreground">{agent.cost}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center pt-6">
                      <p className="text-sm text-muted-foreground mb-4">
                        Découvrez exactement quels agents sont prioritaires pour votre entreprise
                      </p>
                      <button 
                        onClick={() => {
                          const element = document.getElementById('audit-form');
                          if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Faire mon audit gratuit
                        <span className="text-lg">→</span>
                      </button>
                    </div>

                  </div>
                </TabsContent>
              );
            })}
          </Tabs>

          {/* Bottom CTA */}
          <div className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-accent-success/10 rounded-2xl border-2 border-primary/20 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Votre secteur n'est pas dans la liste ?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Nous créons des agents IA sur-mesure pour tous les secteurs. 
              Faites l'audit gratuit et nous vous proposerons des solutions adaptées à votre activité spécifique.
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('audit-form');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-black text-white px-8 py-4 rounded-lg font-bold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Audit Personnalisé Gratuit
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UseCasesByIndustry;
