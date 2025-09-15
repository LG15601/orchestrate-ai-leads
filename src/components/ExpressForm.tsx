import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowRight, 
  Zap, 
  Mail, 
  User,
  Building2,
  CheckCircle
} from "lucide-react";

interface ExpressFormProps {
  onComplete: (data: any) => void;
}

const ExpressForm = ({ onComplete }: ExpressFormProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler l'envoi
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    onComplete(formData);
    setIsSubmitting(false);
  };

  const canSubmit = formData.firstName && formData.lastName && formData.email && formData.company;

  if (isSubmitted) {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="card-bold bg-accent-success text-white">
          <CardContent className="text-center py-8">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black shadow-[4px_4px_0px_#000000]">
              <CheckCircle className="w-8 h-8 text-accent-success" />
            </div>
            <h3 className="text-xl font-bold mb-2">Demande envoyée !</h3>
            <p className="text-white/90 font-medium">
              Nous vous recontacterons sous 24h pour planifier votre agent IA personnalisé.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <Card className="card-bold bg-white">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 bg-accent-warning rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <span className="text-sm font-bold text-black">FORMULAIRE EXPRESS</span>
          </div>
          
          <CardTitle className="text-xl font-bold text-black mb-2">
            Demandez votre Agent IA
          </CardTitle>
          <p className="text-black/70 font-medium text-sm">
            Remplissez ce formulaire rapide et recevez votre proposition personnalisée sous 24h
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-black mb-1 block">
                  Prénom *
                </label>
                <Input
                  type="text"
                  placeholder="Jean"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="h-10 text-sm border-2 border-black shadow-[2px_2px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-black mb-1 block">
                  Nom *
                </label>
                <Input
                  type="text"
                  placeholder="Dupont"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="h-10 text-sm border-2 border-black shadow-[2px_2px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-black mb-1 block">
                Email professionnel *
              </label>
              <Input
                type="email"
                placeholder="jean.dupont@entreprise.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="h-10 text-sm border-2 border-black shadow-[2px_2px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-black mb-1 block">
                Entreprise *
              </label>
              <Input
                type="text"
                placeholder="Mon Entreprise"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="h-10 text-sm border-2 border-black shadow-[2px_2px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-black mb-1 block">
                Téléphone (optionnel)
              </label>
              <Input
                type="tel"
                placeholder="+33 1 23 45 67 89"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="h-10 text-sm border-2 border-black shadow-[2px_2px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200"
              />
            </div>

            <Button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="w-full bg-accent-success text-white hover:bg-accent-success/90 font-bold h-10 text-sm border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-4 p-3 bg-accent-warning/10 rounded-lg border border-accent-warning">
            <p className="text-xs text-black font-medium">
              <strong>⚡ Réponse rapide :</strong> Nous vous recontacterons sous 24h avec une proposition personnalisée pour votre agent IA.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpressForm;
