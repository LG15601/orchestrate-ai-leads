import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { 
  Send, 
  Bot, 
  User, 
  Globe, 
  Search,
  Loader2,
  CheckCircle,
  MessageSquare,
  Brain,
  FileText
} from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'analysis' | 'question' | 'insight' | 'recommendation';
}

interface ConversationalAgentProps {
  onComplete: (report: any) => void;
}

const ConversationalAgent = ({ onComplete }: ConversationalAgentProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'url' | 'analysis' | 'conversation' | 'report'>('url');
  const [url, setUrl] = useState('');
  const [analysisData, setAnalysisData] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (role: 'user' | 'assistant', content: string, type?: Message['type']) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleUrlSubmit = async () => {
    if (!url || !url.startsWith('https://')) {
      toast({
        title: "URL invalide",
        description: "Veuillez entrer une URL complète commençant par https://",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    setCurrentPhase('analysis');
    
    // Message d'accueil de l'agent
    addMessage('assistant', `Bonjour ! Je suis votre agent IA spécialisé en audit business. Je vais analyser ${url} en profondeur pour comprendre votre entreprise et identifier les opportunités d'automatisation.`, 'analysis');
    
    addMessage('assistant', '🔍 Phase 1: Analyse du site web en cours...', 'analysis');

    try {
      // Analyse via Supabase avec Firecrawl
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      const response = await fetch(`${supabaseUrl}/functions/v1/ai-audit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({ 
          url: url,
          auditType: 'conversational'
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur d'analyse: ${response.status}`);
      }

      const responseData = await response.json();
      
      if (responseData.success && responseData.data) {
        setAnalysisData(responseData.data);
        
        // Messages d'analyse
        addMessage('assistant', `✅ Analyse terminée ! J'ai identifié que vous évoluez dans le secteur **${responseData.data.sector}** avec un modèle économique **${responseData.data.business_model}**.`, 'insight');
        
        addMessage('assistant', `📊 Votre potentiel d'automatisation est de **${responseData.data.score}%**. J'ai identifié ${responseData.data.key_processes?.length || 3} processus clés et ${responseData.data.pain_points?.length || 3} points de friction.`, 'insight');
        
        addMessage('assistant', `💡 Maintenant, j'aimerais vous poser quelques questions pour affiner mon analyse et vous proposer des recommandations personnalisées. Êtes-vous prêt à commencer ?`, 'question');
        
        setCurrentPhase('conversation');
      } else {
        throw new Error('Aucune donnée d\'analyse reçue');
      }
    } catch (error) {
      console.error('Erreur d\'analyse:', error);
      addMessage('assistant', '❌ Désolé, j\'ai rencontré un problème lors de l\'analyse de votre site. Pouvez-vous réessayer ?', 'question');
      setCurrentPhase('url');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    addMessage('user', userMessage);

    setIsLoading(true);

    try {
      // Simulation de la réponse de l'agent basée sur l'analyse
      await new Promise(resolve => setTimeout(resolve, 1500));

      let response = '';
      let messageType: Message['type'] = 'question';

      // Logique de conversation basée sur le contenu
      if (userMessage.toLowerCase().includes('oui') || userMessage.toLowerCase().includes('prêt')) {
        response = `Parfait ! Commençons par valider mon analyse. D'après ce que j'ai vu sur votre site, vous êtes dans le secteur **${analysisData.sector}**. Cette analyse est-elle correcte ?`;
        messageType = 'question';
      } else if (userMessage.toLowerCase().includes('secteur') || userMessage.toLowerCase().includes('activité')) {
        response = `Excellent ! Maintenant, parmi ces processus que j'ai identifiés : **${analysisData.key_processes?.join(', ') || 'vente, support, marketing'}**, lequel vous prend le plus de temps actuellement ?`;
        messageType = 'question';
      } else if (userMessage.toLowerCase().includes('processus') || userMessage.toLowerCase().includes('temps')) {
        response = `Je comprends. Basé sur votre secteur et vos processus, je pense que vos principaux défis sont : **${analysisData.pain_points?.join(', ') || 'tâches répétitives, gestion du temps'}**. Lequel vous impacte le plus ?`;
        messageType = 'question';
      } else if (userMessage.toLowerCase().includes('défi') || userMessage.toLowerCase().includes('problème')) {
        response = `Parfait ! Maintenant, parmi ces opportunités d'automatisation que j'ai identifiées pour votre business : **${analysisData.automation_opportunities?.join(', ') || 'chatbot, email marketing, CRM'}**, laquelle vous ferait gagner le plus de temps ?`;
        messageType = 'question';
      } else if (userMessage.toLowerCase().includes('automatisation') || userMessage.toLowerCase().includes('opportunité')) {
        response = `Excellent ! J'ai maintenant toutes les informations nécessaires. Je vais générer votre rapport personnalisé avec des recommandations précises basées sur notre conversation. Un instant...`;
        messageType = 'analysis';
        
        // Générer le rapport
        setTimeout(() => {
          generateReport();
        }, 2000);
      } else {
        response = `Merci pour cette information. Pouvez-vous me dire quel est votre plus gros défi actuel dans votre business ?`;
        messageType = 'question';
      }

      addMessage('assistant', response, messageType);
    } catch (error) {
      addMessage('assistant', 'Désolé, j\'ai rencontré un problème. Pouvez-vous reformuler votre question ?', 'question');
    } finally {
      setIsLoading(false);
    }
  };

  const generateReport = async () => {
    setCurrentPhase('report');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      const report = {
        companyName: analysisData.company_name || 'Votre entreprise',
        url: analysisData.url || url,
        score: analysisData.score || 75,
        businessContext: {
          sector: analysisData.sector,
          businessModel: analysisData.business_model,
          teamSize: analysisData.team_size,
          currentMaturity: analysisData.current_maturity
        },
        insights: analysisData.strategic_insights || "Basé sur notre conversation, votre entreprise présente un fort potentiel d'automatisation dans plusieurs domaines clés.",
        recommendations: analysisData.specialized_agents?.map((agent: any) => ({
          title: agent.name,
          description: agent.role,
          impact: agent.business_impact,
          timeSaved: agent.time_saved,
          priority: 'Haute',
          tasks: agent.key_tasks,
          integrations: agent.integrations,
          roiTimeline: agent.roi_timeline
        })) || [
          {
            title: "Agent IA de Support Client",
            description: "Automatisez 80% des questions clients récurrentes",
            impact: "Économisez 15h/semaine",
            priority: "Haute",
            tasks: ["Réponses automatiques", "Qualification des leads", "Planification de rendez-vous"],
            integrations: ["Site web", "Email", "Calendrier"],
            roiTimeline: "ROI en 2 mois"
          }
        ],
        roi: analysisData.roi_estimate || "300% en 6 mois",
        timeSaved: analysisData.time_saved || "25h/semaine",
        competitiveAdvantage: analysisData.competitive_advantage || "L'automatisation vous donnera un avantage concurrentiel significatif",
        nextSteps: analysisData.implementation_roadmap || [
          "Planification d'un appel de découverte personnalisé",
          "Déploiement du premier agent IA adapté à votre secteur",
          "Formation de l'équipe et intégration des outils existants"
        ]
      };

      addMessage('assistant', '🎉 Votre rapport personnalisé est prêt ! J\'ai créé des recommandations spécifiques basées sur notre analyse et notre conversation.', 'recommendation');
      
      onComplete(report);
    } catch (error) {
      addMessage('assistant', 'Erreur lors de la génération du rapport. Veuillez réessayer.', 'question');
    } finally {
      setIsLoading(false);
    }
  };

  const renderUrlStep = () => (
    <Card className="card-bold bg-white">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-accent-success rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
            <Globe className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-black">Étape 1/3</span>
        </div>
        
        <CardTitle className="text-2xl font-bold text-black mb-2">
          Votre site web
        </CardTitle>
        <p className="text-black/70 font-medium">
          Entrez l'URL de votre site pour que votre agent IA puisse l'analyser en profondeur
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <Input
          type="url"
          placeholder="https://votre-entreprise.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full h-12 text-base border-2 border-black shadow-[2px_2px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200"
        />

        <Button
          onClick={handleUrlSubmit}
          disabled={!url || isLoading}
          className="w-full bg-accent-success text-white hover:bg-accent-success/90 font-bold px-6 py-3 border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyse en cours...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Analyser avec l'agent IA
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );

  const renderConversation = () => (
    <div className="max-w-4xl mx-auto">
      <Card className="card-bold bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-black flex items-center gap-2">
            <Brain className="w-5 h-5 text-accent-success" />
            Conversation avec votre agent IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg border-2 border-black">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg border-2 shadow-[2px_2px_0px_#000000] ${
                    message.role === 'user'
                      ? 'bg-accent-success text-white border-black'
                      : 'bg-white text-black border-black'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                    <span className="text-xs font-bold">
                      {message.role === 'user' ? 'Vous' : 'Agent IA'}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-black border-2 border-black rounded-lg p-3 shadow-[2px_2px_0px_#000000]">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    <span className="text-xs font-bold">Agent IA</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">En train de réfléchir...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tapez votre réponse..."
              disabled={isLoading}
              className="flex-1 border-2 border-black shadow-[2px_2px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-accent-success text-white hover:bg-accent-success/90 border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (currentPhase === 'url') {
    return renderUrlStep();
  }

  if (currentPhase === 'analysis') {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="card-bold bg-white">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent-success rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-black">Étape 2/3</span>
            </div>
            
            <CardTitle className="text-2xl font-bold text-black mb-2">
              Agent IA en action
            </CardTitle>
            <p className="text-black/70 font-medium">
              Votre agent IA analyse votre site web et prépare la conversation...
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-accent-success" />
              <span className="text-lg font-medium text-black">Analyse en cours...</span>
            </div>
            
            <div className="space-y-3 text-sm text-black/70">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent-success" />
                <span>Extraction du contenu avec Firecrawl</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent-success" />
                <span>Analyse du secteur et du business model</span>
              </div>
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-accent-success" />
                <span>Préparation de la conversation personnalisée</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentPhase === 'conversation') {
    return renderConversation();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="card-bold bg-white">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-accent-success rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-black">Étape 3/3</span>
          </div>
          
          <CardTitle className="text-2xl font-bold text-black mb-2">
            Génération du rapport
          </CardTitle>
          <p className="text-black/70 font-medium">
            Votre agent IA finalise votre rapport personnalisé...
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-accent-success" />
            <span className="text-lg font-medium text-black">Génération en cours...</span>
          </div>
          
          <div className="space-y-3 text-sm text-black/70">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent-success" />
              <span>Analyse de notre conversation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent-success" />
              <span>Calcul du ROI personnalisé</span>
            </div>
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-accent-success" />
              <span>Génération des recommandations finales</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationalAgent;
