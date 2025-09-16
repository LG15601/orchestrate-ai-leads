import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Bot, 
  User, 
  Globe, 
  Loader2,
  CheckCircle,
  Brain,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Phone,
  Mail,
  Target,
  TrendingUp,
  Clock,
  Zap,
  Lightbulb,
  MessageSquare,
  FileText,
  Settings,
  BarChart3,
  Users,
  Award,
  Shield,
  Rocket
} from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  type?: 'message' | 'analysis' | 'recommendation' | 'thinking' | 'url_request';
  metadata?: {
    confidence?: number;
    source?: string;
    action?: string;
    isTyping?: boolean;
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

interface FluidAIAgentProps {
  onComplete: (report: any) => void;
}

const FluidAIAgent = ({ onComplete }: FluidAIAgentProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);
  const [conversationContext, setConversationContext] = useState<any>({
    hasAskedForUrl: false,
    hasAnalyzedSite: false,
    hasDiscussedAgents: false,
    hasDiscussedPricing: false,
    userInterests: [],
    conversationStage: 'greeting' // greeting, exploring, analyzing, recommending
  });
  const [showRecommendations, setShowRecommendations] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  useEffect(() => {
    // Ne scroll que si on est déjà en bas ou si c'est un nouveau message
    const chatContainer = messagesEndRef.current?.parentElement;
    if (chatContainer) {
      const isNearBottom = chatContainer.scrollTop + chatContainer.clientHeight >= chatContainer.scrollHeight - 100;
      if (isNearBottom) {
        scrollToBottom();
      }
    }
  }, [messages]);

  useEffect(() => {
    // Message d'accueil initial
    if (messages.length === 0) {
      addMessage('assistant', `👋 Bonjour ! Je suis votre agent IA spécialisé en automatisation business.\n\nJe peux analyser votre site web et vous recommander les meilleurs agents OrchestraConnect pour automatiser votre entreprise.\n\nComment puis-je vous aider aujourd'hui ?`, 'message');
    }
  }, []);

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

  const addTypingMessage = () => {
    const typingMessage: Message = {
      id: 'typing',
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      type: 'thinking',
      metadata: { isTyping: true }
    };
    setMessages(prev => [...prev, typingMessage]);
  };

  const removeTypingMessage = () => {
    setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    addMessage('user', userMessage);

    setIsLoading(true);
    addTypingMessage();

    try {
      // Détecter si l'utilisateur veut analyser un site
      if (userMessage.toLowerCase().includes('http') || userMessage.toLowerCase().includes('www.') || userMessage.toLowerCase().includes('.com') || userMessage.toLowerCase().includes('site') || userMessage.toLowerCase().includes('analyser')) {
        await handleSiteAnalysis(userMessage);
      } else {
        await handleGeneralConversation(userMessage);
      }
    } catch (error) {
      removeTypingMessage();
      addMessage('assistant', 'Désolé, j\'ai rencontré un problème. Pouvez-vous reformuler votre question ?', 'message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSiteAnalysis = async (userMessage: string) => {
    removeTypingMessage();
    
    // Extraire l'URL du message
    const urlMatch = userMessage.match(/(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/);
    const url = urlMatch ? urlMatch[0] : null;

    if (!url) {
      addMessage('assistant', 'Je ne vois pas d\'URL dans votre message. Pouvez-vous me donner l\'adresse de votre site web ? (ex: https://votre-entreprise.com)', 'url_request');
      return;
    }

    // Normaliser l'URL
    let normalizedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      normalizedUrl = `https://${url}`;
    }

    addMessage('assistant', `🔍 Parfait ! Je vais analyser ${normalizedUrl} en profondeur.\n\nCela va prendre quelques instants...`, 'analysis');

    try {
      // Analyse via Supabase
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      const response = await fetch(`${supabaseUrl}/functions/v1/ai-audit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({ 
          url: normalizedUrl,
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
        addMessage('assistant', `✅ Analyse terminée ! J'ai extrait et analysé toutes les informations de votre site.`, 'analysis');
        
        addMessage('assistant', `📊 Voici ce que j'ai découvert :\n\n• Entreprise : ${responseData.data.company_name}\n• Secteur : ${responseData.data.sector}\n• Modèle : ${responseData.data.business_model}\n• Potentiel d'automatisation : ${responseData.data.score}%`, 'analysis');
        
        addMessage('assistant', `🎯 Processus identifiés : ${responseData.data.key_processes?.join(', ') || 'Vente, Support, Marketing'}`, 'analysis');
        
        addMessage('assistant', `⚡ Points d'amélioration : ${responseData.data.pain_points?.join(', ') || 'Tâches répétitives, Gestion du temps'}`, 'analysis');
        
        addMessage('assistant', `💡 Maintenant, j'aimerais vous poser quelques questions pour affiner mes recommandations d'agents IA OrchestraConnect. Êtes-vous prêt ?`, 'message');
        
        // Mise à jour du contexte après analyse
        setConversationContext(prev => ({
          ...prev,
          hasAnalyzedSite: true,
          conversationStage: 'recommending'
        }));
        
      } else {
        throw new Error('Aucune donnée d\'analyse reçue');
      }
    } catch (error) {
      console.error('Erreur d\'analyse:', error);
      addMessage('assistant', '❌ Désolé, j\'ai rencontré un problème lors de l\'analyse de votre site. Pouvez-vous vérifier l\'URL et réessayer ?', 'message');
    }
  };

  const handleGeneralConversation = async (userMessage: string) => {
    removeTypingMessage();
    
    // Simulation de la réponse intelligente de l'agent
    await new Promise(resolve => setTimeout(resolve, 1200));

    let response = '';
    let messageType: Message['type'] = 'message';
    let metadata: Message['metadata'] = {};

    const lowerMessage = userMessage.toLowerCase();
    
    // Mise à jour du contexte de conversation
    const updateContext = (updates: any) => {
      setConversationContext(prev => ({ ...prev, ...updates }));
    };

    // Logique intelligente basée sur le contexte
    if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
      if (conversationContext.conversationStage === 'greeting') {
        response = `👋 Bonjour ! Je suis là pour vous aider à automatiser votre business avec des agents IA OrchestraConnect.\n\nQue souhaitez-vous faire ?\n• Analyser votre site web\n• Découvrir nos agents IA\n• Obtenir des conseils personnalisés`;
        updateContext({ conversationStage: 'exploring' });
      } else {
        response = `👋 Bonjour ! Comment puis-je vous aider aujourd'hui ?`;
      }
    } else if (lowerMessage.includes('orchestraconnect') || lowerMessage.includes('orchestra')) {
      if (!conversationContext.hasDiscussedAgents) {
        response = `🚀 OrchestraConnect est notre plateforme d'agents IA spécialisés !\n\nNos agents peuvent :\n• Automatiser votre support client\n• Gérer vos campagnes marketing\n• Optimiser vos processus opérationnels\n• Analyser vos données business\n\nVoulez-vous que j'analyse votre site pour vous recommander les meilleurs agents ?`;
        updateContext({ hasDiscussedAgents: true, conversationStage: 'exploring' });
      } else {
        response = `🚀 OrchestraConnect peut vraiment transformer votre business !\n\nAvez-vous un site web que je pourrais analyser pour vous proposer des recommandations personnalisées ?`;
      }
    } else if (lowerMessage.includes('agent') || lowerMessage.includes('automatisation')) {
      if (!conversationContext.hasDiscussedAgents) {
        response = `🤖 Nos agents IA OrchestraConnect sont spécialisés par secteur :\n\n• Support Client - Réponses automatiques, qualification leads\n• Marketing - Campagnes automatisées, nurturing\n• Opérations - Gestion documents, facturation\n• Ventes - Prospection, suivi prospects\n\nQuel domaine vous intéresse le plus ?`;
        updateContext({ hasDiscussedAgents: true });
      } else {
        response = `🤖 Parfait ! Pour vous proposer l'agent le plus adapté, j'aimerais analyser votre site web.\n\nPouvez-vous me donner l'URL de votre site ?`;
        updateContext({ hasAskedForUrl: true });
      }
    } else if (lowerMessage.includes('prix') || lowerMessage.includes('coût') || lowerMessage.includes('tarif')) {
      if (!conversationContext.hasDiscussedPricing) {
        response = `💰 Nos tarifs sont adaptés à votre taille d'entreprise :\n\n• Startup (1-10 employés) - À partir de 299€/mois\n• PME (11-50 employés) - À partir de 599€/mois\n• Entreprise (50+ employés) - Sur mesure\n\nROI moyen : 300% en 6 mois\n\nVoulez-vous une estimation personnalisée ?`;
        updateContext({ hasDiscussedPricing: true });
      } else {
        response = `💰 Pour une estimation personnalisée, j'aimerais analyser votre site web et comprendre votre business.\n\nPouvez-vous me donner l'URL de votre site ?`;
        updateContext({ hasAskedForUrl: true });
      }
    } else if (lowerMessage.includes('oui') || lowerMessage.includes('prêt') || lowerMessage.includes('commencer')) {
      if (!conversationContext.hasAskedForUrl) {
        response = `🎯 Parfait ! Pour vous proposer les meilleurs agents IA, j'ai besoin d'analyser votre site web.\n\nPouvez-vous me donner l'URL de votre site ? (ex: https://votre-entreprise.com)`;
        updateContext({ hasAskedForUrl: true, conversationStage: 'analyzing' });
      } else {
        response = `🎯 Excellent ! J'ai hâte de découvrir votre site et de vous proposer des solutions personnalisées.\n\nQuelle est l'URL de votre site web ?`;
      }
    } else if (lowerMessage.includes('merci') || lowerMessage.includes('thanks')) {
      response = `😊 De rien ! Je suis là pour vous aider.\n\nN'hésitez pas si vous avez d'autres questions sur l'automatisation de votre business.`;
    } else if (lowerMessage.includes('aide') || lowerMessage.includes('help')) {
      response = `🤝 Je peux vous aider de plusieurs façons :\n\n• Analyser votre site web pour identifier les opportunités d'automatisation\n• Vous présenter nos agents IA OrchestraConnect\n• Vous donner des conseils personnalisés\n• Répondre à vos questions sur l'automatisation\n\nQue souhaitez-vous faire ?`;
    } else if (lowerMessage.includes('comment') || lowerMessage.includes('how')) {
      response = `💡 C'est simple ! Je vais analyser votre site web pour comprendre votre business et vous proposer les meilleurs agents IA OrchestraConnect.\n\nCommencez par me donner l'URL de votre site, et je ferai le reste !`;
    } else if (lowerMessage.includes('non') || lowerMessage.includes('pas maintenant') || lowerMessage.includes('plus tard')) {
      response = `😊 Pas de problème ! Prenez votre temps.\n\nJe reste à votre disposition quand vous serez prêt à automatiser votre business.`;
    } else {
      // Réponse contextuelle basée sur l'étape de conversation
      if (conversationContext.conversationStage === 'analyzing' && !conversationContext.hasAskedForUrl) {
        response = `🤔 Je comprends votre question.\n\nPour vous donner la meilleure réponse, j'aimerais analyser votre site web et comprendre votre business.\n\nPouvez-vous me donner l'URL de votre site ?`;
        updateContext({ hasAskedForUrl: true });
      } else if (conversationContext.hasAskedForUrl && !conversationContext.hasAnalyzedSite) {
        response = `🤔 Je vois que vous avez des questions.\n\nPour vous proposer des solutions vraiment adaptées, j'aimerais d'abord analyser votre site web.\n\nQuelle est l'URL de votre site ?`;
      } else {
        response = `🤔 Intéressant ! Pour vous donner une réponse précise, j'aimerais mieux comprendre votre business.\n\nAvez-vous un site web que je pourrais analyser ?`;
      }
    }

    addMessage('assistant', response, messageType, metadata);
  };

  const generateRecommendations = async () => {
    if (!scrapedData) return;

    setIsLoading(true);
    addTypingMessage();

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      removeTypingMessage();

      const recommendations = {
        companyName: scrapedData.companyName || 'Votre entreprise',
        url: scrapedData.url || '',
        score: scrapedData.score || 75,
        businessContext: {
          sector: scrapedData.sector,
          businessModel: scrapedData.business_model,
          teamSize: scrapedData.teamSize,
          currentMaturity: scrapedData.current_maturity
        },
        insights: scrapedData.strategic_insights || "Basé sur notre analyse approfondie, votre entreprise présente un fort potentiel d'automatisation.",
        recommendations: scrapedData.specialized_agents?.map((agent: any) => ({
          title: agent.name,
          description: agent.role,
          impact: agent.business_impact,
          timeSaved: agent.time_saved,
          priority: 'Haute',
          tasks: agent.key_tasks,
          integrations: agent.integrations,
          roiTimeline: agent.roi_timeline,
          orchestraConnect: true,
          category: getAgentCategory(agent.name)
        })) || [
          {
            title: "Agent IA de Support Client OrchestraConnect",
            description: "Automatisez 80% des questions clients récurrentes",
            impact: "Économisez 15h/semaine",
            priority: "Haute",
            tasks: ["Réponses automatiques", "Qualification des leads", "Planification de rendez-vous"],
            integrations: ["Site web", "Email", "Calendrier", "CRM"],
            roiTimeline: "ROI en 2 mois",
            orchestraConnect: true,
            category: "Support Client"
          }
        ],
        roi: scrapedData.roi_estimate || "300% en 6 mois",
        timeSaved: scrapedData.time_saved || "25h/semaine",
        competitiveAdvantage: scrapedData.competitive_advantage || "L'automatisation vous donnera un avantage concurrentiel significatif",
        nextSteps: scrapedData.implementation_roadmap || [
          "Planification d'un appel de découverte avec OrchestraConnect",
          "Déploiement du premier agent IA adapté à votre secteur",
          "Formation de l'équipe et intégration des outils existants"
        ],
        orchestraConnectBenefits: [
          "Agents IA pré-entraînés pour votre secteur",
          "Intégration rapide avec vos outils existants",
          "Support technique dédié",
          "Formation de votre équipe incluse",
          "ROI garanti en 6 mois"
        ]
      };

      addMessage('assistant', '🎉 Votre rapport personnalisé est prêt ! J\'ai créé des recommandations spécifiques d\'agents IA OrchestraConnect basées sur notre analyse.', 'recommendation');
      
      setShowRecommendations(true);
      onComplete(recommendations);
    } catch (error) {
      removeTypingMessage();
      addMessage('assistant', 'Erreur lors de la génération du rapport. Veuillez réessayer.', 'message');
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
    }
    return 'Général';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Chat Interface - Style cohérent avec le thème */}
      <Card className="card-bold bg-white border-2 border-black shadow-[4px_4px_0px_#000000]">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-accent-success px-6 py-4 border-b-2 border-black">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000000]">
                <Brain className="w-4 h-4 text-accent-success" />
              </div>
              <div>
                <h3 className="text-white font-bold">Agent IA OrchestraConnect</h3>
                <p className="text-white/90 text-sm font-medium">Spécialisé en automatisation business</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 scroll-smooth">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-black shadow-[2px_2px_0px_#000000] ${
                    message.role === 'user' 
                      ? 'bg-accent-success' 
                      : 'bg-white'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-accent-success" />
                    )}
                  </div>
                  
                  {/* Message Content */}
                  <div className={`rounded-lg px-4 py-3 border-2 border-black shadow-[2px_2px_0px_#000000] ${
                    message.role === 'user'
                      ? 'bg-accent-success text-white'
                      : 'bg-gray-50 text-black'
                  }`}>
                    {message.metadata?.isTyping ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm font-medium">En train de réfléchir...</span>
                      </div>
                    ) : (
                      <div className="text-sm whitespace-pre-wrap leading-relaxed font-medium">
                        {message.content}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t-2 border-black p-4 bg-gray-50">
            <div className="flex gap-3">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                disabled={isLoading}
                className="flex-1 border-2 border-black shadow-[2px_2px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-200"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-accent-success text-white hover:bg-accent-success/90 border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200 w-12 h-12 p-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputValue('Analyser mon site web')}
                className="text-xs border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
              >
                <Globe className="w-3 h-3 mr-1" />
                Analyser mon site
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputValue('Quels agents IA recommandez-vous ?')}
                className="text-xs border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
              >
                <Bot className="w-3 h-3 mr-1" />
                Voir les agents
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputValue('Quels sont vos tarifs ?')}
                className="text-xs border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                Tarifs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Preview */}
      {showRecommendations && scrapedData && (
        <div className="mt-8">
          <Card className="card-bold bg-gradient-to-r from-accent-success to-green-600 text-white">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">🎉 Votre rapport est prêt !</h3>
                <p className="text-sm opacity-90 mb-4">
                  J'ai analysé votre business et préparé des recommandations personnalisées d'agents IA OrchestraConnect.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => {
                      toast({
                        title: "Contact initié",
                        description: "Redirection vers OrchestraConnect...",
                        duration: 3000,
                      });
                    }}
                    className="bg-white text-accent-success hover:bg-gray-100 font-bold"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Planifier un appel
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-accent-success"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Recevoir par email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FluidAIAgent;
