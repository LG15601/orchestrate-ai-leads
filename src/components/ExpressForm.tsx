import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { sendLeadConfirmationEmail } from '@/services/emailService';
import { supabase } from '@/integrations/supabase/client';
import { 
  ArrowRight, 
  Zap, 
  Mail, 
  User,
  Building2,
  CheckCircle,
  FileText,
  Clock
} from "lucide-react";

interface ExpressFormProps {
  onComplete: (data: any) => void;
}

const ExpressForm = ({ onComplete }: ExpressFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    needs: '',
    isProfessional: '',
    siret: '',
    urgency: ''
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
    
    try {
      // Préparer les données pour la base de données
      const leadData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        company: formData.company,
        phone: formData.phone || null,
        source: 'express_form',
        needs: formData.needs,
        is_professional: formData.isProfessional,
        siret: formData.siret || null,
        urgency: formData.urgency,
        created_at: new Date().toISOString()
      };

      // Vérifier si le lead existe déjà
      const { data: existingLead } = await supabase
        .from('leads')
        .select('id, email')
        .eq('email', formData.email)
        .single();

      if (existingLead) {
        // Mettre à jour le lead existant
        const { error: updateError } = await supabase
          .from('leads')
          .update({
            first_name: formData.firstName,
            last_name: formData.lastName,
            company: formData.company,
            phone: formData.phone || null,
            needs: formData.needs,
            is_professional: formData.isProfessional,
            siret: formData.siret || null,
            urgency: formData.urgency,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingLead.id);

        if (updateError) {
          throw new Error('Erreur lors de la mise à jour');
        }
      } else {
        // Créer un nouveau lead
        const { error: insertError } = await supabase
          .from('leads')
          .insert(leadData);

        if (insertError) {
          throw new Error('Erreur lors de la sauvegarde');
        }
      }
      
      // Envoyer l'email de confirmation
      try {
        await sendLeadConfirmationEmail(formData.email, formData);
        
        toast({
          title: "🎉 Demande envoyée !",
          description: "Un email de confirmation a été envoyé à votre adresse.",
          duration: 5000,
        });
      } catch (emailError) {
        console.error('Erreur lors de l\'envoi de l\'email:', emailError);
        toast({
          title: "✅ Demande enregistrée !",
          description: "Votre demande a été enregistrée. L'email sera envoyé sous peu.",
          duration: 5000,
        });
      }
      
      setIsSubmitted(true);
      onComplete(formData);
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = formData.firstName && formData.lastName && formData.email && formData.company && formData.needs && formData.isProfessional && formData.urgency;

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
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-black mb-4">
          Demandez votre Agent IA
        </h2>
        <p className="text-lg text-gray-700">
          Remplissez ce formulaire rapide et recevez votre proposition personnalisée sous 24h
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-black mb-2 block">
              Prénom *
            </label>
            <Input
              type="text"
              placeholder="Jean"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="h-12 text-base border border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black/20 transition-all duration-200"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-black mb-2 block">
              Nom *
            </label>
            <Input
              type="text"
              placeholder="Dupont"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="h-12 text-base border border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black/20 transition-all duration-200"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-black mb-2 block">
            Email professionnel *
          </label>
          <Input
            type="email"
            placeholder="jean.dupont@entreprise.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="h-12 text-base border border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black/20 transition-all duration-200"
            required
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-black mb-2 block">
            Entreprise *
          </label>
          <Input
            type="text"
            placeholder="Mon Entreprise"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            className="h-12 text-base border border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black/20 transition-all duration-200"
            required
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-black mb-2 block">
            Téléphone (optionnel)
          </label>
          <Input
            type="tel"
            placeholder="+33 1 23 45 67 89"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="h-12 text-base border border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black/20 transition-all duration-200"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-black mb-2 block">
            <FileText className="w-4 h-4 inline mr-2" />
            Décrivez vos besoins en agents IA *
          </label>
          <Textarea
            placeholder="Ex: J'ai besoin d'un agent pour automatiser la gestion de mes emails, un autre pour la facturation, et un pour le suivi client..."
            value={formData.needs}
            onChange={(e) => handleInputChange('needs', e.target.value)}
            className="min-h-24 text-base border border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black/20 transition-all duration-200"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-black mb-2 block">
              <Building2 className="w-4 h-4 inline mr-2" />
              Statut professionnel *
            </label>
            <Select value={formData.isProfessional} onValueChange={(value) => handleInputChange('isProfessional', value)}>
              <SelectTrigger className="h-12 text-base border border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black/20">
                <SelectValue placeholder="Sélectionnez votre statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="particulier">Particulier</SelectItem>
                <SelectItem value="professionnel">Professionnel (avec SIRET)</SelectItem>
                <SelectItem value="entreprise">Entreprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-semibold text-black mb-2 block">
              <Clock className="w-4 h-4 inline mr-2" />
              Niveau d'urgence *
            </label>
            <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
              <SelectTrigger className="h-12 text-base border border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black/20">
                <SelectValue placeholder="Sélectionnez l'urgence" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="faible">Faible (1-2 mois)</SelectItem>
                <SelectItem value="moyenne">Moyenne (2-4 semaines)</SelectItem>
                <SelectItem value="haute">Haute (1-2 semaines)</SelectItem>
                <SelectItem value="critique">Critique (immédiat)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {formData.isProfessional === 'professionnel' && (
          <div>
            <label className="text-sm font-semibold text-black mb-2 block">
              Numéro SIRET (optionnel)
            </label>
            <Input
              type="text"
              placeholder="12345678901234"
              value={formData.siret}
              onChange={(e) => handleInputChange('siret', e.target.value)}
              className="h-12 text-base border border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black/20 transition-all duration-200"
            />
          </div>
        )}

        <Button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="w-full bg-black text-white hover:bg-gray-800 font-semibold h-12 text-base rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </form>

      <div className="mt-6 p-4 bg-[#f5ff7d]/20 rounded-lg border border-[#f5ff7d]">
        <p className="text-sm text-black font-medium text-center">
          <strong>⚡ Réponse rapide :</strong> Nous vous recontacterons sous 24h avec une proposition personnalisée pour votre agent IA.
        </p>
      </div>
    </div>
  );
};

export default ExpressForm;
