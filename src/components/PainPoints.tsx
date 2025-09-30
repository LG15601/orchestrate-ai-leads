import { Card, CardContent } from "@/components/ui/card";
import { Mail, FileText, Phone, Calendar, Clock } from "lucide-react";

const PainPoints = () => {
  const painPoints = [
    {
      icon: Mail,
      day: "Lundi 8h",
      title: "Boîte mail débordée",
      problem: "50 emails non lus depuis vendredi soir. Impossible de traiter tout ça avant midi.",
      solution: "Un Agent Email IA trie, classe et répond aux demandes courantes automatiquement",
      color: "bg-red-500/10 border-red-500/20 text-red-700"
    },
    {
      icon: FileText,
      day: "Mardi 14h",
      title: "Facturation en retard",
      problem: "Vous devez encore 15 factures depuis 3 semaines. Votre trésorerie en souffre.",
      solution: "Un Agent Facturation IA génère et envoie toutes vos factures automatiquement",
      color: "bg-orange-500/10 border-orange-500/20 text-orange-700"
    },
    {
      icon: Phone,
      day: "Mercredi 10h",
      title: "Rappels clients",
      problem: "Vous devez relancer 30 devis non signés. Ça va encore prendre 2 heures.",
      solution: "Un Agent Commercial IA relance vos prospects au bon moment, avec le bon message",
      color: "bg-yellow-500/10 border-yellow-500/20 text-yellow-700"
    },
    {
      icon: Calendar,
      day: "Jeudi 16h",
      title: "RDV annulé",
      problem: "Vous étiez censé finaliser une grosse vente. Tout est à refaire.",
      solution: "Un Agent CRM IA maintient le lien avec vos clients et optimise votre pipeline",
      color: "bg-blue-500/10 border-blue-500/20 text-blue-700"
    },
    {
      icon: Clock,
      day: "Vendredi 19h",
      title: "Encore au bureau",
      problem: "Votre famille vous attend pour le dîner. Mais il reste tant à faire...",
      solution: "Vos Agents IA travaillent 24h/24, week-end compris. Vous, vous pouvez vivre.",
      color: "bg-purple-500/10 border-purple-500/20 text-purple-700"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Vous vous reconnaissez dans au moins 3 de ces situations ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              La semaine type d'un entrepreneur épuisé... Ça vous parle ?
            </p>
          </div>

          {/* Pain Points Grid */}
          <div className="space-y-6 mb-16">
            {painPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <Card 
                  key={index} 
                  className={`border-2 ${point.color} hover:scale-[1.02] transition-all duration-300`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Icon & Day */}
                      <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2 flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full ${point.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-bold text-muted-foreground md:text-center">
                          {point.day}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                          🔥 {point.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {point.problem}
                        </p>
                        <div className="bg-accent-success/10 border-l-4 border-accent-success p-4 rounded">
                          <p className="text-sm text-foreground font-medium flex items-start gap-2">
                            <span className="text-accent-success flex-shrink-0 mt-0.5">→</span>
                            <span>{point.solution}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Emotional Conclusion */}
          <div className="bg-gradient-to-br from-primary/10 to-accent-success/10 rounded-2xl p-8 md:p-12 border-2 border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              Le pire dans tout ça ?
            </h3>
            <div className="space-y-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              <p>
                Vous <strong>SAVEZ</strong> que ces tâches ne font pas grandir votre entreprise.
              </p>
              <p>
                Vous <strong>SAVEZ</strong> que vous devriez être en rendez-vous client.
              </p>
              <p>
                Vous <strong>SAVEZ</strong> que vous devriez développer votre stratégie.
              </p>
              <p className="text-xl font-semibold text-foreground pt-4">
                Mais vous n'avez jamais le temps.<br />
                Parce que vous êtes seul.<br />
                Ou presque.
              </p>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-2xl font-bold text-primary mb-6">
                Et si ce n'était plus le cas ?
              </p>
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <span className="animate-bounce">👇</span>
                <span>Découvrez comment en 15 minutes chrono</span>
                <span className="animate-bounce">👇</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PainPoints;
