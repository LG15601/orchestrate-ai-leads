import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { sendAuditReportEmail, sendLeadConfirmationEmail } from '@/services/emailService';
import { CheckCircle, Mail, User, Building, Phone } from "lucide-react";

interface LeadCaptureProps {
  onLeadCaptured: (leadData: any) => void;
  auditResult?: any;
  className?: string;
}

const LeadCapture = ({ onLeadCaptured, auditResult, className = "" }: LeadCaptureProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    source: 'audit_website'
  });

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
      // Supabase client is already imported

      // Prepare lead data with audit context
      const leadData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        company: formData.company,
        phone: formData.phone || null,
        source: formData.source,
        audit_data: auditResult,
        audit_score: auditResult?.score || 0,
        company_sector: auditResult?.sector || '',
        automation_opportunities: auditResult?.automation_opportunities || [],
        priority_agents: auditResult?.priority_agents || []
      };

      // Check if lead already exists
      const { data: existingLead } = await supabase
        .from('leads')
        .select('id, email')
        .eq('email', formData.email)
        .single();

      if (existingLead) {
        // Update existing lead
        const { error: updateError } = await supabase
          .from('leads')
          .update({
            first_name: formData.firstName,
            last_name: formData.lastName,
            company: formData.company,
            phone: formData.phone || null,
            updated_at: new Date().toISOString(),
            audit_data: auditResult,
            audit_score: auditResult?.score || 0,
            company_sector: auditResult?.sector || '',
            automation_opportunities: auditResult?.automation_opportunities || [],
            priority_agents: auditResult?.priority_agents || []
          })
          .eq('id', existingLead.id);

        if (updateError) {
          throw new Error('Erreur lors de la mise à jour');
        }
      } else {
        // Create new lead
        const { error: insertError } = await supabase
          .from('leads')
          .insert(leadData);

        if (insertError) {
          throw new Error('Erreur lors de la sauvegarde');
        }
      }
      
      setIsSuccess(true);
      onLeadCaptured(leadData);
      
      // Envoyer l'email de confirmation
      try {
        await sendLeadConfirmationEmail(formData.email, leadData);
        
        // Si c'est un audit, envoyer aussi le rapport
        if (auditResult) {
          await sendAuditReportEmail(formData.email, auditResult, leadData);
        }
        
        toast({
          title: "🎉 Merci !",
          description: "Vos informations ont été enregistrées et un email de confirmation a été envoyé.",
          duration: 5000,
        });
      } catch (emailError) {
        console.error('Erreur lors de l\'envoi de l\'email:', emailError);
        toast({
          title: "✅ Enregistré !",
          description: "Vos informations ont été enregistrées. L'email sera envoyé sous peu.",
          duration: 5000,
        });
      }

    } catch (error) {
      console.error('Error capturing lead:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className={`card-bold ${className}`}>
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-accent-success mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">
            Parfait ! Votre audit est enregistré
          </h3>
          <p className="text-muted-foreground">
            Nous analysons votre profil et vous recontacterons dans les 24h avec des recommandations personnalisées.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`card-bold ${className}`}>
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold text-foreground">
          📧 Recevez votre rapport détaillé
        </CardTitle>
        <p className="text-center text-muted-foreground text-sm">
          Remplissez vos coordonnées pour recevoir votre analyse complète et être recontacté par nos experts
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                <User className="w-4 h-4 inline mr-2" />
                Prénom *
              </Label>
              <Input
                id="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="input-bold"
                placeholder="Votre prénom"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">
                <User className="w-4 h-4 inline mr-2" />
                Nom *
              </Label>
              <Input
                id="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="input-bold"
                placeholder="Votre nom"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              <Mail className="w-4 h-4 inline mr-2" />
              Email professionnel *
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="input-bold"
              placeholder="votre@entreprise.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium">
              <Building className="w-4 h-4 inline mr-2" />
              Entreprise *
            </Label>
            <Input
              id="company"
              type="text"
              required
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="input-bold"
              placeholder="Nom de votre entreprise"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              <Phone className="w-4 h-4 inline mr-2" />
              Téléphone (optionnel)
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="input-bold"
              placeholder="06 12 34 56 78"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent-success text-white hover:bg-accent-success/90 font-bold text-base py-3 border-2 border-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
          >
            {isSubmitting ? "Enregistrement..." : "Recevoir mon rapport détaillé"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            En soumettant ce formulaire, vous acceptez d'être recontacté par OrchestraConnect. 
            Vos données sont protégées et ne seront jamais partagées.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadCapture;
