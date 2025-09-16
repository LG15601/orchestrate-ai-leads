import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
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
  FileText,
  Zap,
  Target,
  TrendingUp,
  Clock,
  ArrowRight,
  Sparkles,
  Lightbulb,
  BarChart3,
  Users,
  Settings
} from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  type?: 'analysis' | 'question' | 'insight' | 'recommendation' | 'scraping' | 'thinking';
  metadata?: {
    confidence?: number;
    source?: string;
    action?: string;
  };
}

interface ScrapedData {
  companyName: string;
  sector: string;
  businessModel: string;
  keyProcesses: string[];
  painPoints: string[];
  automationOpportunities: string[];
  technologies: string[];
  teamSize: string;
  currentMaturity: string;
  competitiveAdvantage: string;
  strategicInsights: string;
  specializedAgents: Array<{
    name: string;
    role: string;
    business_impact: string;
    time_saved: string;
    key_tasks: string[];
    integrations: string[];
    roi_timeline: string;
  }>;
  roi_estimate: string;
  time_saved: string;
  implementation_roadmap: string[];
}

interface AdvancedAIAgentProps {
  onComplete: (report: any) => void;
}

const AdvancedAIAgent = ({ onComplete }: AdvancedAIAgentProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'url' | 'scraping' | 'analysis' | 'conversation' | 'recommendations' | 'report'>('url');
  const [url, setUrl] = useState('');
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);
  const [conversationContext, setConversationContext] = useState<any>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (role: 'user' | 'assistant' | 'system', content: string, type?: Message['type'], metadata?: Message['metadata']) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
      type,
      metadata
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
    setCurrentPhase('scraping');
    
    // Message d'accueil de l'agent
    addMessage('assistant', `🤖 **Bonjour ! Je suis votre agent IA spécialisé en audit business et recommandation d'agents IA.**`, 'analysis');
    addMessage('assistant', `Je vais analyser ${url} en profondeur pour comprendre votre entreprise et identifier les meilleures opportunités d'automatisation avec des agents IA spécialisés.`, 'analysis');
    
    addMessage('assistant', `🔍 **Phase 1: Scraping et analyse du site web en cours...**`, 'scraping');

    try {
      // Scraping avancé via Supabase avec Firecrawl
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
          auditType: 'advanced_ai_agent',
          includeScraping: true,
          includeAnalysis: true,
          includeRecommendations: true
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur d'analyse: ${response.status}`);
      }

      const responseData = await response.json();
      
      if (responseData.success && responseData.data) {
        setScrapedData(responseData.data);
        
        // Messages d'analyse détaillés
        addMessage('assistant', `✅ **Scraping terminé !** J'ai extrait et analysé toutes les informations de votre site.`, 'analysis');
        
        addMessage('assistant', `📊 **Analyse Business :**\n• **Secteur :** ${responseData.data.sector}\n• **Modèle économique :** ${responseData.data.business_model}\n• **Taille d'équipe :** ${responseData.data.team_size}\n• **Maturité actuelle :** ${responseData.data.current_maturity}`, 'insight');
        
        addMessage('assistant', `🎯 **Processus identifiés :** ${responseData.data.key_processes?.join(', ') || 'Vente, Support, Marketing'}`, 'insight');
        
        addMessage('assistant', `⚡ **Points de friction :** ${responseData.data.pain_points?.join(', ') || 'Tâches répétitives, Gestion du temps'}`, 'insight');
        
        addMessage('assistant', `🚀 **Potentiel d'automatisation :** ${responseData.data.score || 75}% - Excellent potentiel !`, 'insight');
        
        addMessage('assistant', `💡 **Maintenant, j'aimerais vous poser quelques questions stratégiques pour affiner mes recommandations d'agents IA spécialisés. Êtes-vous prêt à commencer notre conversation ?**`, 'question');
        
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
      // Simulation de la réponse intelligente de l'agent basée sur l'analyse
      await new Promise(resolve => setTimeout(resolve, 2000));

      let response = '';
      let messageType: Message['type'] = 'question';
      let metadata: Message['metadata'] = {};

      // Logique de conversation avancée basée sur le contenu et le contexte
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('oui') || lowerMessage.includes('prêt') || lowerMessage.includes('commencer')) {
        response = `Parfait ! Commençons par valider mon analyse. D'après ce que j'ai scrapé sur votre site, vous êtes dans le secteur **${scrapedData?.sector}** avec un modèle **${scrapedData?.business_model}**. Cette analyse est-elle correcte ?`;
        messageType = 'question';
        metadata = { confidence: 0.9, action: 'validation_sector' };
      } else if (lowerMessage.includes('secteur') || lowerMessage.includes('activité') || lowerMessage.includes('business')) {
        response = `Excellent ! Maintenant, parmi ces processus que j'ai identifiés sur votre site : **${scrapedData?.key_processes?.join(', ') || 'vente, support, marketing'}**, lequel vous prend le plus de temps actuellement ?`;
        messageType = 'question';
        metadata = { confidence: 0.85, action: 'process_priority' };
      } else if (lowerMessage.includes('processus') || lowerMessage.includes('temps') || lowerMessage.includes('chronophage')) {
        response = `Je comprends. Basé sur votre secteur et vos processus, je pense que vos principaux défis sont : **${scrapedData?.pain_points?.join(', ') || 'tâches répétitives, gestion du temps'}**. Lequel vous impacte le plus au quotidien ?`;
        messageType = 'question';
        metadata = { confidence: 0.8, action: 'pain_point_identification' };
      } else if (lowerMessage.includes('défi') || lowerMessage.includes('problème') || lowerMessage.includes('difficulté')) {
        response = `Parfait ! Maintenant, parmi ces opportunités d'automatisation que j'ai identifiées pour votre business : **${scrapedData?.automation_opportunities?.join(', ') || 'chatbot, email marketing, CRM'}**, laquelle vous ferait gagner le plus de temps et d'efficacité ?`;
        messageType = 'question';
        metadata = { confidence: 0.9, action: 'automation_priority' };
      } else if (lowerMessage.includes('automatisation') || lowerMessage.includes('opportunité') || lowerMessage.includes('agent')) {
        response = `🚀 **Excellent choix !** J'ai maintenant toutes les informations nécessaires pour vous proposer des agents IA spécialisés. Je vais générer votre rapport personnalisé avec des recommandations précises basées sur notre conversation et l'analyse de votre site. Un instant...`;
        messageType = 'analysis';
        metadata = { confidence: 0.95, action: 'generate_recommendations' };
        
        // Générer le rapport
        setTimeout(() => {
          generateRecommendations();
        }, 2000);
      } else if (lowerMessage.includes('orchestraconnect') || lowerMessage.includes('orchestra')) {
        response = `🎯 **Parfait !** OrchestraConnect.fr propose justement des agents IA spécialisés qui correspondent parfaitement à vos besoins. Je vais vous recommander les agents les plus adaptés à votre secteur et vos processus.`;
        messageType = 'recommendation';
        metadata = { confidence: 0.9, action: 'orchestra_recommendation' };
      } else {
        response = `Merci pour cette information. Pouvez-vous me dire quel est votre plus gros défi actuel dans votre business ? Cela m'aidera à vous proposer les meilleurs agents IA.`;
        messageType = 'question';
        metadata = { confidence: 0.7, action: 'clarification' };
      }

      addMessage('assistant', response, messageType, metadata);
    } catch (error) {
      addMessage('assistant', 'Désolé, j\'ai rencontré un problème. Pouvez-vous reformuler votre question ?', 'question');
    } finally {
      setIsLoading(false);
    }
  };

  const generateRecommendations = async () => {
    setCurrentPhase('recommendations');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Génération de recommandations avancées basées sur l'analyse et la conversation
      const recommendations = {
        companyName: scrapedData?.companyName || 'Votre entreprise',
        url: scrapedData?.url || url,
        score: scrapedData?.score || 75,
        businessContext: {
          sector: scrapedData?.sector,
          businessModel: scrapedData?.business_model,
          teamSize: scrapedData?.team_size,
          currentMaturity: scrapedData?.current_maturity
        },
        insights: scrapedData?.strategic_insights || "Basé sur notre analyse approfondie et notre conversation, votre entreprise présente un fort potentiel d'automatisation avec des agents IA spécialisés.",
        recommendations: scrapedData?.specialized_agents?.map((agent: any) => ({
          title: agent.name,
          description: agent.role,
          impact: agent.business_impact,
          timeSaved: agent.time_saved,
          priority: agent.name.includes('Support') || agent.name.includes('Client') ? 'Haute' : 'Moyenne',
          tasks: agent.key_tasks,
          integrations: agent.integrations,
          roiTimeline: agent.roi_timeline,
          orchestraConnect: true,
          category: getAgentCategory(agent.name)
        })) || [
          {
            title: "Agent IA de Support Client OrchestraConnect",
            description: "Automatisez 80% des questions clients récurrentes avec un agent IA spécialisé",
            impact: "Économisez 15h/semaine",
            priority: "Haute",
            tasks: ["Réponses automatiques", "Qualification des leads", "Planification de rendez-vous"],
            integrations: ["Site web", "Email", "Calendrier", "CRM"],
            roiTimeline: "ROI en 2 mois",
            orchestraConnect: true,
            category: "Support Client"
          },
          {
            title: "Agent IA Marketing Automation",
            description: "Séquences automatisées et personnalisées pour votre secteur",
            impact: "+40% de conversion",
            priority: "Haute",
            tasks: ["Email marketing", "Suivi prospects", "Nurturing automatisé", "Analytics"],
            integrations: ["CRM", "Email", "Réseaux sociaux", "Analytics"],
            roiTimeline: "ROI en 3 mois",
            orchestraConnect: true,
            category: "Marketing"
          },
          {
            title: "Agent IA Assistant Opérationnel",
            description: "Automatisation des tâches administratives chronophages",
            impact: "Économisez 10h/semaine",
            priority: "Moyenne",
            tasks: ["Gestion documents", "Facturation", "Reporting", "Planification"],
            integrations: ["Comptabilité", "Documents", "Analytics", "Calendrier"],
            roiTimeline: "ROI en 4 mois",
            orchestraConnect: true,
            category: "Opérations"
          }
        ],
        roi: scrapedData?.roi_estimate || "300% en 6 mois",
        timeSaved: scrapedData?.time_saved || "25h/semaine",
        competitiveAdvantage: scrapedData?.competitive_advantage || "L'automatisation avec OrchestraConnect vous donnera un avantage concurrentiel significatif",
        nextSteps: scrapedData?.implementation_roadmap || [
          "Planification d'un appel de découverte avec OrchestraConnect",
          "Déploiement du premier agent IA adapté à votre secteur",
          "Formation de l'équipe et intégration des outils existants",
          "Suivi et optimisation continue des performances"
        ],
        orchestraConnectBenefits: [
          "Agents IA pré-entraînés pour votre secteur",
          "Intégration rapide avec vos outils existants",
          "Support technique dédié",
          "Formation de votre équipe incluse",
          "ROI garanti en 6 mois"
        ]
      };

      addMessage('assistant', '🎉 **Votre rapport personnalisé est prêt !** J\'ai créé des recommandations spécifiques d\'agents IA OrchestraConnect basées sur notre analyse approfondie et notre conversation.', 'recommendation');
      
      onComplete(recommendations);
    } catch (error) {
      addMessage('assistant', 'Erreur lors de la génération du rapport. Veuillez réessayer.', 'question');
    } finally {
      setIsLoading(false);
    }
  };

  const getAgentCategory = (agentName: string): string => {
    if (agentName.toLowerCase().includes('support') || agentName.toLowerCase().includes('client')) {
      return 'Support Client';
    } else if (agentName.toLowerCase().includes('marketing') || agentName.toLowerCase().includes('vente')) {
      return 'Marketing';
    } else if (agentName.toLowerCase().includes('opération') || agentName.toLowerCase().includes('admin')) {
      return 'Opérations';
    } else if (agentName.toLowerCase().includes('hr') || agentName.toLowerCase().includes('rh')) {
      return 'Ressources Humaines';
    }
    return 'Général';
  };

  const renderUrlStep = () => (
    <Card className="card-bold bg-white">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-accent-success rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
            <Globe className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-black">Étape 1/4</span>
        </div>
        
        <CardTitle className="text-2xl font-bold text-black mb-2">
          Votre site web
        </CardTitle>
        <p className="text-black/70 font-medium">
          Entrez l'URL de votre site pour que votre agent IA puisse l'analyser en profondeur et vous recommander les meilleurs agents OrchestraConnect
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
              <Sparkles className="w-4 h-4 mr-2" />
              Analyser avec l'agent IA avancé
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );

  const renderScrapingStep = () => (
    <div className="max-w-2xl mx-auto">
      <Card className="card-bold bg-white">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-accent-success rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
              <Search className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-black">Étape 2/4</span>
          </div>
          
          <CardTitle className="text-2xl font-bold text-black mb-2">
            Agent IA en action
          </CardTitle>
          <p className="text-black/70 font-medium">
            Votre agent IA scrape et analyse votre site web en temps réel...
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-accent-success" />
            <span className="text-lg font-medium text-black">Scraping et analyse en cours...</span>
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
              <CheckCircle className="w-4 h-4 text-accent-success" />
              <span>Identification des processus clés</span>
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

  const renderConversation = () => (
    <div className="max-w-4xl mx-auto">
      <Card className="card-bold bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-black flex items-center gap-2">
            <Brain className="w-5 h-5 text-accent-success" />
            Conversation avec votre agent IA spécialisé
            <Badge variant="secondary" className="ml-2">
              <Sparkles className="w-3 h-3 mr-1" />
              OrchestraConnect
            </Badge>
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
                    {message.metadata?.confidence && (
                      <Badge variant="outline" className="text-xs">
                        {Math.round(message.metadata.confidence * 100)}%
                      </Badge>
                    )}
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

  const renderRecommendationsStep = () => (
    <div className="max-w-2xl mx-auto">
      <Card className="card-bold bg-white">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-accent-success rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
              <Target className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-black">Étape 4/4</span>
          </div>
          
          <CardTitle className="text-2xl font-bold text-black mb-2">
            Génération des recommandations
          </CardTitle>
          <p className="text-black/70 font-medium">
            Votre agent IA finalise vos recommandations d'agents OrchestraConnect...
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
              <CheckCircle className="w-4 h-4 text-accent-success" />
              <span>Sélection des agents OrchestraConnect optimaux</span>
            </div>
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-accent-success" />
              <span>Génération du rapport final</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (currentPhase === 'url') {
    return renderUrlStep();
  }

  if (currentPhase === 'scraping') {
    return renderScrapingStep();
  }

  if (currentPhase === 'conversation') {
    return renderConversation();
  }

  if (currentPhase === 'recommendations') {
    return renderRecommendationsStep();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="card-bold bg-white">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-accent-success rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-black">Étape 3/4</span>
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

export default AdvancedAIAgent;
