import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ConversationalAgent from "@/components/ConversationalAgent";
import AgentAuditResults from "@/components/AgentAuditResults";
import LeadCapture from "@/components/LeadCapture";
import AuditSteps from "./AuditSteps";
import ValueProposition from "./ValueProposition";


const AuditForm = () => {
  const { toast } = useToast();
  const [auditResult, setAuditResult] = useState<any>(null);
  const [formStep, setFormStep] = useState<'audit' | 'lead-capture' | 'results'>('audit');

  const handleAuditComplete = (recommendations: any) => {
    console.log('Audit completed with recommendations:', recommendations);
    setAuditResult(recommendations);
    setFormStep('lead-capture');
    toast({
      title: "🎉 Audit terminé !",
      description: "Remplissez vos coordonnées pour recevoir votre rapport",
      duration: 4000,
    });
  };

  const handleLeadCaptured = (leadData: any) => {
    console.log('Lead captured:', leadData);
    setFormStep('results');
    toast({
      title: "📧 Rapport envoyé !",
      description: "Votre rapport détaillé a été envoyé par email",
      duration: 4000,
    });
  };

  const handleNewAnalysis = () => {
    setAuditResult(null);
    setFormStep('audit');
  };

  if (formStep === 'lead-capture') {
    return (
      <>
        <AuditSteps currentStep={3} />
        <section className="py-16 bg-background" id="audit-form">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Votre audit est prêt ! 📊
              </h2>
              <p className="text-base text-muted-foreground">
                Remplissez vos coordonnées pour recevoir votre rapport détaillé par email
              </p>
            </div>
            <LeadCapture 
              onLeadCaptured={handleLeadCaptured}
              auditResult={auditResult}
            />
          </div>
        </section>
      </>
    );
  }

  if (formStep === 'results') {
    return (
      <>
        <AuditSteps currentStep={4} />
        <section className="py-16 bg-background" id="audit-form">
          <div className="container mx-auto px-6">
            <AgentAuditResults 
              recommendations={auditResult} 
              onNewAnalysis={handleNewAnalysis}
            />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <AuditSteps currentStep={1} />
      <ValueProposition />
      <section className="py-16 bg-background" id="audit-form">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Prêt à transformer votre productivité ?
              </h2>
            <p className="text-base text-muted-foreground">
              Conversationnez avec votre agent IA qui analyse votre site en profondeur et vous guide vers des recommandations personnalisées
              </p>
            </div>

          <ConversationalAgent 
            onComplete={handleAuditComplete}
          />
        </div>
      </section>
    </>
  );
};

export default AuditForm;