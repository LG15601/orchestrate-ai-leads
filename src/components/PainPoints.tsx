import { Mail, FileText, Phone, Calendar, Clock } from "lucide-react";

const PainPoints = () => {
  const painPoints = [
    {
      icon: Mail,
      day: "Lundi 8h",
      title: "Boîte mail débordée",
      problem: "50 emails non lus depuis vendredi soir. Impossible de traiter tout ça avant midi.",
      solution: "Un Agent Email IA trie, classe et répond aux demandes courantes automatiquement"
    },
    {
      icon: FileText,
      day: "Mardi 14h",
      title: "Facturation en retard",
      problem: "Vous devez encore 15 factures depuis 3 semaines. Votre trésorerie en souffre.",
      solution: "Un Agent Facturation IA génère et envoie toutes vos factures automatiquement"
    },
    {
      icon: Phone,
      day: "Mercredi 10h",
      title: "Rappels clients",
      problem: "Vous devez relancer 30 devis non signés. Ça va encore prendre 2 heures.",
      solution: "Un Agent Commercial IA relance vos prospects au bon moment, avec le bon message"
    },
    {
      icon: Calendar,
      day: "Jeudi 16h",
      title: "RDV annulé",
      problem: "Vous étiez censé finaliser une grosse vente. Tout est à refaire.",
      solution: "Un Agent CRM IA maintient le lien avec vos clients et optimise votre pipeline"
    },
    {
      icon: Clock,
      day: "Vendredi 19h",
      title: "Encore au bureau",
      problem: "Votre famille vous attend pour le dîner. Mais il reste tant à faire...",
      solution: "Vos Agents IA travaillent 24h/24, week-end compris. Vous, vous pouvez vivre."
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="badge-neutral mb-6">Vous reconnaissez-vous ?</span>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
              La semaine type d'un entrepreneur épuisé
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Vous vous reconnaissez dans au moins 3 de ces situations ?
            </p>
          </div>

          {/* Pain Points Grid */}
          <div className="space-y-4 mb-16">
            {painPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div 
                  key={index} 
                  className="card-interactive animate-fade-in opacity-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Icon & Day */}
                    <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2 flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-green-50 transition-colors">
                        <Icon className="w-6 h-6 text-gray-600 group-hover:text-green-600 transition-colors" />
                      </div>
                      <span className="text-sm font-medium text-gray-500 md:text-center">
                        {point.day}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        {point.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {point.problem}
                      </p>
                      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                        <p className="text-sm text-gray-900 font-medium flex items-start gap-2">
                          <span className="text-green-600 flex-shrink-0 mt-0.5">→</span>
                          <span>{point.solution}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Emotional Conclusion */}
          <div className="card-premium bg-gradient-to-br from-green-50 to-blue-50 p-8 md:p-12 animate-fade-in opacity-0" style={{ animationDelay: "500ms" }}>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 text-center">
              Le pire dans tout ça ?
            </h3>
            <div className="space-y-4 text-lg text-gray-700 max-w-3xl mx-auto">
              <p>
                Vous <strong className="text-gray-900">SAVEZ</strong> que ces tâches ne font pas grandir votre entreprise.
              </p>
              <p>
                Vous <strong className="text-gray-900">SAVEZ</strong> que vous devriez être en rendez-vous client.
              </p>
              <p>
                Vous <strong className="text-gray-900">SAVEZ</strong> que vous devriez développer votre stratégie.
              </p>
              <p className="text-xl font-semibold text-gray-900 pt-4">
                Mais vous n'avez jamais le temps.<br />
                Parce que vous êtes seul.<br />
                Ou presque.
              </p>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
                Et si ce n'était plus le cas ?
              </p>
              <div className="inline-flex items-center gap-2 text-sm text-gray-600">
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
