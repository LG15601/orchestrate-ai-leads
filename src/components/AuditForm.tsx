import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ConversationalAgent from "@/components/ConversationalAgent";
import AgentAuditResults from "@/components/AgentAuditResults";
import AuditSteps from "./AuditSteps";
import ValueProposition from "./ValueProposition";


const AuditForm = () => {
  const { toast } = useToast();
  const [auditResult, setAuditResult] = useState<any>(null);
  const [formStep, setFormStep] = useState<'audit' | 'results'>('audit');

  const handleAuditComplete = (recommendations: any) => {
    console.log('Audit completed with recommendations:', recommendations);
    setAuditResult(recommendations);
    setFormStep('results');
    toast({
      title: "🎉 Audit terminé !",
      description: "Votre rapport personnalisé est prêt",
      duration: 4000,
    });
  };

  const handleNewAnalysis = () => {
    setAuditResult(null);
    setFormStep('audit');
  };

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