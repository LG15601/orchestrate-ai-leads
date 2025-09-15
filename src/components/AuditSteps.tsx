import React from 'react';
import { CheckCircle, Clock, Target, BarChart } from 'lucide-react';

interface AuditStepsProps {
  currentStep: number;
}

const steps = [
  {
    id: 1,
    title: "Soumettez votre site web",
    description: "Indiquez simplement l'URL de votre site. Notre IA commence son analyse pour comprendre votre métier.",
    icon: Target,
    color: "accent-success"
  },
  {
    id: 2,
    title: "L'IA identifie vos opportunités", 
    description: "Notre technologie scanne vos activités, identifie les tâches chronophages et les potentiels stratégiques inexploités.",
    icon: Clock,
    color: "accent-warning"
  },
  {
    id: 3,
    title: "Recevez votre plan d'action",
    description: "Obtenez un rapport clair avec votre pourcentage d'automatisation, le temps que vous pouvez gagner et les agents IA recommandés pour y parvenir.",
    icon: BarChart,
    color: "accent-orange"
  }
];

const AuditSteps = ({ currentStep }: AuditStepsProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Le rapport d'optimisation personnalisé, en 3 étapes simples
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Notre IA analyse votre activité en profondeur pour vous proposer des solutions sur-mesure
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep >= step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="relative">
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-px bg-border transform translate-x-8 -translate-y-1/2 z-0">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          currentStep > step.id ? 'bg-accent-success w-full' : 'bg-border w-0'
                        }`}
                      />
                    </div>
                  )}

                  <div className={`card-bold p-8 text-center relative z-10 transition-all duration-500 ${
                    isActive ? 'interactive-hover' : 'opacity-60'
                  }`}>
                    {/* Step Number & Icon */}
                    <div className="relative mb-6">
                      <div className={`w-16 h-16 mx-auto rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                        isCompleted 
                          ? 'bg-accent-success border-accent-success text-accent-success-foreground' 
                          : isActive 
                            ? `bg-${step.color} border-${step.color} text-${step.color}-foreground`
                            : 'bg-secondary border-border text-muted-foreground'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-8 h-8" />
                        ) : (
                          <IconComponent className="w-8 h-8" />
                        )}
                      </div>
                      <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                        isActive ? 'bg-accent-warning text-accent-warning-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {step.id}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    {/* Progress Indicator */}
                    {isActive && !isCompleted && (
                      <div className="mt-6">
                        <div className="w-8 h-1 bg-accent-warning mx-auto rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuditSteps;