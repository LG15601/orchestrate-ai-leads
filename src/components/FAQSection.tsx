import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const FAQSection = () => {
  const faqs = [
    {
      question: "C'est trop technique pour moi, je ne suis pas un expert en IA",
      answer: "Justement ! AgentConnect est conçu pour les entrepreneurs, pas pour les ingénieurs. Si vous savez envoyer un email, vous saurez utiliser nos Agents IA. On s'occupe de TOUT l'aspect technique. Vous utilisez juste les résultats.",
      emoji: "🤔"
    },
    {
      question: "C'est trop cher pour une PME comme la mienne",
      answer: "299€/mois, c'est le prix de 2 déjeuners clients par semaine, 8x moins cher qu'un stagiaire, et 10x moins cher qu'un employé. Si votre heure vaut 50€ (calcul classique PME) et que vous récupérez 30-50h/mois, vous gagnez 1 500 à 2 500€/mois. Le ROI est mathématique. Bonus : Première semaine gratuite pour tester sans risque.",
      emoji: "💸"
    },
    {
      question: "Je n'ai pas le temps de mettre ça en place",
      answer: "C'est exactement votre problème ! Vous n'avez pas le temps PARCE QUE vous n'avez pas d'Agent IA. Le déploiement prend 1h de votre temps (vraiment). Ensuite, vous gagnez 30-120h/mois. Pour toujours. C'est l'investissement temps le plus rentable de votre vie d'entrepreneur.",
      emoji: "⏱️"
    },
    {
      question: "Mes données sont confidentielles, je ne peux pas les confier à une IA",
      answer: "Nous sommes 100% français, hébergés en France (OVH), conformes RGPD. Vos données ne sont JAMAIS utilisées pour entraîner des IA tierces, ne sortent JAMAIS de France, et vous pouvez les supprimer en 1 clic. Nous avons des clients experts-comptables, avocats, RH (secteurs ultra-sensibles). Nous sommes plus sécurisés que vos emails Gmail ou vos fichiers Dropbox.",
      emoji: "🔐"
    },
    {
      question: "Mon activité est trop spécifique, ça ne marchera pas pour moi",
      answer: "C'est ce que pensait Sophie (expert-comptable), Marc (immobilier), et Thomas (plombier). Ils ont tous été surpris. La vérité : 80% des tâches chronophages dans une PME sont identiques (emails, facturation, relances, CRM, reporting). Faites l'audit gratuit. En 15 min, vous saurez si on peut vous aider (spoiler : oui).",
      emoji: "🎯"
    },
    {
      question: "L'IA va remplacer mes employés ?",
      answer: "NON. L'IA remplace les TÂCHES répétitives et chronophages. Vos employés pourront enfin se concentrer sur le relationnel client, développer des projets stratégiques, être plus créatifs, se former, et être plus épanouis. Résultat : ils sont plus productifs, plus motivés, et vous les gardez plus longtemps. L'IA n'est pas un concurrent, c'est un assistant.",
      emoji: "🤖"
    },
    {
      question: "Et si ça ne marche pas ? Je perds mon argent ?",
      answer: "Garantie satisfait ou remboursé 30 jours. Si au bout de 30 jours, vous n'avez pas économisé au moins 20h et vous n'êtes pas satisfait, on vous rembourse. Intégralement. Sans discuter. Vous ne prenez AUCUN risque. Nous oui.",
      emoji: "⚠️"
    },
    {
      question: "Quelle est la différence avec ChatGPT ?",
      answer: "ChatGPT nécessite que VOUS lui demandiez de faire les choses, une par une. Nos Agents IA travaillent de manière AUTONOME : ils surveillent vos emails, génèrent vos factures, relancent vos clients, mettent à jour votre CRM... automatiquement, sans que vous ayez à demander. C'est la différence entre un assistant qui attend vos ordres et un employé qui prend des initiatives.",
      emoji: "🆚"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary text-white border-2 border-black shadow-[2px_2px_0px_#000000]">
              Questions fréquentes
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Les questions que vous vous posez
            </h2>
            <p className="text-lg text-muted-foreground">
              (Et nos réponses honnêtes)
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-2 border-border rounded-lg px-6 bg-secondary/20 hover:bg-secondary/40 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="flex items-start gap-3 text-base font-semibold text-foreground pr-4">
                    <span className="text-2xl flex-shrink-0">{faq.emoji}</span>
                    <span>{faq.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 pl-11">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Bottom CTA */}
          <div className="mt-12 text-center p-8 bg-gradient-to-r from-accent-success/10 to-primary/10 rounded-lg border-2 border-accent-success/20">
            <h3 className="text-xl font-bold text-foreground mb-3">
              Une autre question ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Faites l'audit gratuit, vous recevrez notre guide complet avec toutes les réponses
              <br />+ un accès direct à notre équipe par email
            </p>
            <p className="text-sm text-muted-foreground/70">
              Temps de réponse moyen : moins de 2h
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
