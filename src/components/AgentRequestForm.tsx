import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Bot, Zap, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ExpressForm from "./ExpressForm";

interface AgentRequestData {
  companyName: string;
  contactEmail: string;
  businessNeeds: string;
  budget: string;
}

const AgentRequestForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<AgentRequestData>({
    companyName: "",
    contactEmail: "",
    businessNeeds: "",
    budget: ""
  });
  const { toast } = useToast();

  const handleExpressComplete = (data: any) => {
    setFormData({
      companyName: data.company,
      contactEmail: data.email,
      businessNeeds: "Demande via formulaire express",
      budget: "À définir"
    });
    setSubmitted(true);
    toast({
      title: "Demande envoyée !",
      description: "Notre équipe vous contactera sous 24h pour une démonstration personnalisée.",
    });
  };

  if (submitted) {
    return (
      <section id="agent-request-form" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="card-bold bg-white border-2 border-black shadow-[4px_4px_0px_#000000] p-8">
              <div className="flex flex-col items-center space-y-6">
                <div className="w-20 h-20 bg-accent-success rounded-full flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold text-black mb-4">Demande Reçue !</h2>
                  <p className="text-lg text-black mb-8">
                    Merci <strong>{formData.companyName}</strong> ! Notre équipe d'experts va analyser vos besoins et vous proposer un agent IA sur-mesure.
                  </p>
                </div>
                
                <div className="w-full bg-accent-success/10 border-2 border-accent-success rounded-lg p-6">
                  <h3 className="font-bold text-black mb-4 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-accent-success" />
                    Prochaines étapes
                  </h3>
                  <div className="space-y-4 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent-success rounded-full flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-black font-medium">Analyse de vos besoins (24h)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent-success rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-black font-medium">Conception de votre agent IA personnalisé</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent-success rounded-full flex items-center justify-center">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-black font-medium">Démonstration personnalisée en visio</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => window.open('https://orchestraconnect.fr', '_blank')}
                  className="btn-bold-primary font-bold text-lg px-8 py-3"
                >
                  Découvrir Orchestra Connect
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="agent-request-form" className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header Bold */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent-success text-white px-6 py-2 rounded-full font-bold text-sm mb-6 border-2 border-black shadow-[2px_2px_0px_#000000]">
              <Bot className="h-4 w-4" />
              CRÉATEUR D'AGENT IA
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">
              Créez Votre Agent IA 
              <span className="block text-accent-success">Sur-Mesure</span>
            </h2>
            <p className="text-base text-black font-medium max-w-2xl mx-auto">
              Décrivez vos besoins en 30 secondes. Notre équipe crée l'agent IA parfait pour votre entreprise.
            </p>
          </div>

          {/* Form Bold Design */}
          <Card className="card-bold bg-white border-2 border-black shadow-[8px_8px_0px_#000000] overflow-hidden">
            <CardHeader className="bg-black text-white p-8">
              <CardTitle className="text-2xl font-bold flex items-center">
                <Sparkles className="h-6 w-6 mr-3 text-accent-success" />
                Formulaire Express
              </CardTitle>
              <p className="text-white/90 font-medium">
                4 questions simples pour un agent IA qui transformera votre business
              </p>
            </CardHeader>
            
            <CardContent className="p-8">
              <ExpressForm onComplete={handleExpressComplete} />
            </CardContent>
          </Card>

          {/* Social Proof */}
          <div className="text-center mt-12">
            <p className="text-black font-medium mb-4">Ils nous font déjà confiance :</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <span className="text-black font-bold text-lg">TechCorp</span>
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span className="text-black font-bold text-lg">InnovSolutions</span>
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span className="text-black font-bold text-lg">FutureAI</span>
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span className="text-black font-bold text-lg">NextGen</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentRequestForm;