import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MaturityData {
  currentAiUsage: string;
  currentAutomation: string;
  businessPriority: string;
  teamSize: string;
}

interface MaturityQuestionsProps {
  maturityData: MaturityData;
  setMaturityData: React.Dispatch<React.SetStateAction<MaturityData>>;
}

const MaturityQuestions = ({ maturityData, setMaturityData }: MaturityQuestionsProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Affinons votre profil d'entreprise
        </h3>
        <p className="text-muted-foreground text-lg">
          Ces informations nous permettent de personnaliser parfaitement votre audit
        </p>
      </div>

      {/* Question 1: Current AI Usage */}
      <div className="card-bold p-8">
        <h4 className="text-xl font-semibold text-foreground mb-6">
          Utilisez-vous déjà des agents IA ou des outils similaires dans votre entreprise ?
        </h4>
        <RadioGroup 
          value={maturityData.currentAiUsage} 
          onValueChange={(value) => setMaturityData(prev => ({...prev, currentAiUsage: value}))}
          className="space-y-4"
        >
          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-transparent hover:border-accent-warning hover:bg-accent-warning/5 transition-all">
            <RadioGroupItem value="yes" id="ai-yes" className="border-2" />
            <Label htmlFor="ai-yes" className="text-base font-medium cursor-pointer flex-1">
              Oui, nous utilisons déjà des solutions IA
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-transparent hover:border-accent-warning hover:bg-accent-warning/5 transition-all">
            <RadioGroupItem value="no" id="ai-no" className="border-2" />
            <Label htmlFor="ai-no" className="text-base font-medium cursor-pointer flex-1">
              Non, nous n'utilisons pas encore d'IA
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-transparent hover:border-accent-warning hover:bg-accent-warning/5 transition-all">
            <RadioGroupItem value="unsure" id="ai-unsure" className="border-2" />
            <Label htmlFor="ai-unsure" className="text-base font-medium cursor-pointer flex-1">
              Je ne suis pas sûr(e)
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Question 2: Current Automation */}
      <div className="card-bold p-8">
        <h4 className="text-xl font-semibold text-foreground mb-6">
          Avez-vous déjà mis en place des automatisations (ex: Zapier, Make, etc.) ?
        </h4>
        <RadioGroup 
          value={maturityData.currentAutomation} 
          onValueChange={(value) => setMaturityData(prev => ({...prev, currentAutomation: value}))}
          className="space-y-4"
        >
          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-transparent hover:border-accent-warning hover:bg-accent-warning/5 transition-all">
            <RadioGroupItem value="some" id="auto-some" className="border-2" />
            <Label htmlFor="auto-some" className="text-base font-medium cursor-pointer flex-1">
              Oui, quelques automatisations
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-transparent hover:border-accent-warning hover:bg-accent-warning/5 transition-all">
            <RadioGroupItem value="intensive" id="auto-intensive" className="border-2" />
            <Label htmlFor="auto-intensive" className="text-base font-medium cursor-pointer flex-1">
              Oui, de manière intensive
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-transparent hover:border-accent-warning hover:bg-accent-warning/5 transition-all">
            <RadioGroupItem value="none" id="auto-none" className="border-2" />
            <Label htmlFor="auto-none" className="text-base font-medium cursor-pointer flex-1">
              Non, pas encore
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Question 3: Business Priority */}
      <div className="card-bold p-8">
        <h4 className="text-xl font-semibold text-foreground mb-6">
          Quelle est votre priorité business principale ?
        </h4>
        <Select 
          value={maturityData.businessPriority} 
          onValueChange={(value) => setMaturityData(prev => ({...prev, businessPriority: value}))}
        >
          <SelectTrigger className="input-bold h-14 text-base">
            <SelectValue placeholder="Sélectionnez votre priorité" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="efficiency">Améliorer l'efficacité opérationnelle</SelectItem>
            <SelectItem value="growth">Accélérer la croissance</SelectItem>
            <SelectItem value="costs">Réduire les coûts</SelectItem>
            <SelectItem value="innovation">Stimuler l'innovation</SelectItem>
            <SelectItem value="customer">Améliorer l'expérience client</SelectItem>
            <SelectItem value="competition">Rester compétitif</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Question 4: Team Size */}
      <div className="card-bold p-8">
        <h4 className="text-xl font-semibold text-foreground mb-6">
          Quelle est la taille de votre équipe ?
        </h4>
        <RadioGroup 
          value={maturityData.teamSize} 
          onValueChange={(value) => setMaturityData(prev => ({...prev, teamSize: value}))}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-transparent hover:border-accent-warning hover:bg-accent-warning/5 transition-all">
            <RadioGroupItem value="1-5" id="team-small" className="border-2" />
            <Label htmlFor="team-small" className="text-base font-medium cursor-pointer flex-1">
              1-5 personnes
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-transparent hover:border-accent-warning hover:bg-accent-warning/5 transition-all">
            <RadioGroupItem value="6-20" id="team-medium" className="border-2" />
            <Label htmlFor="team-medium" className="text-base font-medium cursor-pointer flex-1">
              6-20 personnes
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-transparent hover:border-accent-warning hover:bg-accent-warning/5 transition-all">
            <RadioGroupItem value="21-50" id="team-large" className="border-2" />
            <Label htmlFor="team-large" className="text-base font-medium cursor-pointer flex-1">
              21-50 personnes
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-transparent hover:border-accent-warning hover:bg-accent-warning/5 transition-all">
            <RadioGroupItem value="50+" id="team-enterprise" className="border-2" />
            <Label htmlFor="team-enterprise" className="text-base font-medium cursor-pointer flex-1">
              50+ personnes
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default MaturityQuestions;