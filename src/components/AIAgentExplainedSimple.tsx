import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Mail, Brain, Zap, CheckCircle2, Users, Clock, Euro } from "lucide-react";
import { useState } from "react";

const AIAgentExplainedSimple = () => {
  const [selectedLevel, setSelectedLevel] = useState<'simple' | 'detailed' | 'technical'>('simple');

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary text-white border-2 border-black shadow-[2px_2px_0px_#000000]">
              <Brain className="w-4 h-4 mr-2" />
              Comprendre en 2 minutes
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              C'est quoi VRAIMENT un Agent IA ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Oubliez le jargon technique. Voici l'explication la plus simple du monde.
            </p>
            
            {/* Level Selector */}
            <div className="inline-flex gap-2 p-1 bg-secondary rounded-lg">
              <button
                onClick={() => setSelectedLevel('simple')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedLevel === 'simple' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Version Simple
              </button>
              <button
                onClick={() => setSelectedLevel('detailed')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedLevel === 'detailed' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Version Détaillée
              </button>
              <button
                onClick={() => setSelectedLevel('technical')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedLevel === 'technical' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Version Technique
              </button>
            </div>
          </div>

          {/* Simple Explanation */}
          {selectedLevel === 'simple' && (
            <div className="space-y-12">
              
              {/* Analogie */}
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-block p-6 bg-accent-success/10 rounded-2xl border-2 border-accent-success/30 mb-6">
                  <p className="text-xl font-semibold text-foreground mb-4">
                    💡 Imaginez un employé virtuel qui travaille 24h/24
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Un Agent IA, c'est comme avoir un employé super intelligent qui ne dort jamais, 
                    ne fait jamais d'erreurs, et qui coûte 10x moins cher qu'un humain.
                  </p>
                </div>
              </div>

              {/* Exemple Concret : Email */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
                  Exemple concret : Agent Email
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* AVANT */}
                  <Card className="border-2 border-red-500/30 bg-red-500/5">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                          <Users className="w-4 h-4 text-red-600" />
                        </div>
                        <h4 className="font-bold text-foreground">AVANT (Vous)</h4>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-xs font-bold text-red-600">1</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">📧 Email arrive</p>
                            <p className="text-xs text-muted-foreground">"Bonjour, quel est le prix de votre produit X ?"</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-xs font-bold text-red-600">2</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">👀 Vous lisez l'email</p>
                            <p className="text-xs text-muted-foreground">Entre 2 réunions, vous voyez la notif</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-xs font-bold text-red-600">3</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">🔍 Vous cherchez l'info</p>
                            <p className="text-xs text-muted-foreground">Dans votre CRM, dans vos fichiers...</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-xs font-bold text-red-600">4</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">✍️ Vous rédigez la réponse</p>
                            <p className="text-xs text-muted-foreground">"Bonjour Monsieur, le prix est..."</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-xs font-bold text-red-600">5</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">📤 Vous envoyez</p>
                            <p className="text-xs text-muted-foreground">Et vous recommencez pour le suivant...</p>
                          </div>
                        </div>

                        <div className="pt-4 border-t-2 border-red-500/20">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-foreground">Temps total</span>
                            <span className="text-2xl font-bold text-red-600">5 min</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            × 50 emails/jour = <strong>4h de travail</strong>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* APRÈS */}
                  <Card className="border-2 border-accent-success bg-accent-success/5">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-accent-success/20 flex items-center justify-center">
                          <Brain className="w-4 h-4 text-accent-success" />
                        </div>
                        <h4 className="font-bold text-foreground">APRÈS (Agent IA)</h4>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-accent-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <CheckCircle2 className="w-4 h-4 text-accent-success" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">📧 Email arrive</p>
                            <p className="text-xs text-muted-foreground">"Bonjour, quel est le prix de votre produit X ?"</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-accent-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <CheckCircle2 className="w-4 h-4 text-accent-success" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">🤖 Agent IA analyse</p>
                            <p className="text-xs text-muted-foreground">Il comprend : "Question sur prix produit X"</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-accent-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <CheckCircle2 className="w-4 h-4 text-accent-success" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">🔍 Il cherche automatiquement</p>
                            <p className="text-xs text-muted-foreground">Dans votre base de données, CRM, catalogue</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-accent-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <CheckCircle2 className="w-4 h-4 text-accent-success" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">✍️ Il rédige la réponse</p>
                            <p className="text-xs text-muted-foreground">Ton personnalisé, infos correctes</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-accent-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <CheckCircle2 className="w-4 h-4 text-accent-success" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">📤 Il envoie instantanément</p>
                            <p className="text-xs text-muted-foreground">Client satisfait en 30 secondes</p>
                          </div>
                        </div>

                        <div className="pt-4 border-t-2 border-accent-success/30">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-foreground">Temps total</span>
                            <span className="text-2xl font-bold text-accent-success">30 sec</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            × 50 emails/jour = <strong>25 minutes de travail</strong>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Résultat */}
                <div className="mt-6 p-6 bg-gradient-to-r from-accent-success/10 to-primary/10 rounded-lg border-2 border-accent-success/30">
                  <div className="text-center">
                    <p className="text-xl font-bold text-foreground mb-2">
                      Résultat : Vous économisez <span className="text-accent-success">3h45 par jour</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Soit <strong>75 heures par mois</strong> que vous pouvez consacrer à développer votre business
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Points */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-2">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">Travaille 24/7</h4>
                    <p className="text-sm text-muted-foreground">
                      Même la nuit, même le week-end, même pendant vos vacances
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-accent-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-6 h-6 text-accent-success" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">0 erreur</h4>
                    <p className="text-sm text-muted-foreground">
                      Toujours les bonnes infos, toujours le bon ton, toujours cohérent
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-accent-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Euro className="w-6 h-6 text-accent-warning" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">10x moins cher</h4>
                    <p className="text-sm text-muted-foreground">
                      299€/mois vs 2500€/mois pour un employé temps partiel
                    </p>
                  </CardContent>
                </Card>
              </div>

            </div>
          )}

          {/* Detailed Explanation */}
          {selectedLevel === 'detailed' && (
            <div className="space-y-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Un <strong>Agent IA</strong> est un programme informatique intelligent qui combine :
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 not-prose mt-8">
                  <Card className="border-2">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                        <Brain className="w-5 h-5 text-primary" />
                        1. Intelligence Artificielle
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-accent-success mt-0.5">•</span>
                          <span><strong>Comprend</strong> le langage naturel (comme ChatGPT)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent-success mt-0.5">•</span>
                          <span><strong>Analyse</strong> le contexte et l'intention</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent-success mt-0.5">•</span>
                          <span><strong>Apprend</strong> de vos données spécifiques</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent-success mt-0.5">•</span>
                          <span><strong>Raisonne</strong> pour prendre des décisions</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-accent-success" />
                        2. Capacité d'Action
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-accent-success mt-0.5">•</span>
                          <span><strong>Accède</strong> à vos outils (email, CRM, facturation)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent-success mt-0.5">•</span>
                          <span><strong>Exécute</strong> des tâches concrètes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent-success mt-0.5">•</span>
                          <span><strong>S'adapte</strong> selon la situation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent-success mt-0.5">•</span>
                          <span><strong>Rapporte</strong> les résultats</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 p-6 bg-primary/5 rounded-lg border-2 border-primary/20 not-prose">
                  <h4 className="text-lg font-bold text-foreground mb-4">
                    La différence avec ChatGPT ou Claude ?
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">❌ ChatGPT/Claude</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Vous devez lui demander quelque chose</li>
                        <li>• Il répond et attend votre prochaine question</li>
                        <li>• Ne peut pas agir dans vos outils</li>
                        <li>• Vous devez copier-coller partout</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">✅ Agent IA AgentConnect</p>
                      <ul className="text-sm text-accent-success space-y-1">
                        <li>• Surveille vos emails automatiquement</li>
                        <li>• Prend l'initiative de répondre</li>
                        <li>• Agit directement dans vos outils</li>
                        <li>• Tout est automatique, vous validez si besoin</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Technical Explanation */}
          {selectedLevel === 'technical' && (
            <div className="space-y-6">
              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Architecture Technique</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">🧠 Couche Intelligence (LLM)</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>Modèles GPT-4 / Claude 3.5 fine-tunés sur votre secteur</li>
                        <li>RAG (Retrieval Augmented Generation) sur votre base de connaissance</li>
                        <li>Embeddings vectoriels pour recherche sémantique</li>
                        <li>Agents multi-étapes avec Chain-of-Thought</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">⚡ Couche Orchestration</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>Event-driven architecture (webhooks, queues)</li>
                        <li>Workflow automation (Temporal / n8n)</li>
                        <li>State management distribué (Redis)</li>
                        <li>Retry logic et error handling</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">🔌 Couche Intégrations</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>API REST/GraphQL vers vos outils (CRM, Email, etc.)</li>
                        <li>OAuth2 / API keys sécurisés (vault chiffré)</li>
                        <li>Sync bidirectionnelle temps réel</li>
                        <li>Rate limiting et caching intelligent</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">🛡️ Sécurité & Conformité</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>Hébergement France (OVH/Scaleway) - RGPD compliant</li>
                        <li>Chiffrement end-to-end (AES-256)</li>
                        <li>Audit logs complets</li>
                        <li>Validation humaine configurable (human-in-the-loop)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 bg-accent-success/5 border-accent-success/30">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-foreground mb-4">Stack Technique Type</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-foreground mb-2">Frontend</p>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Next.js / React</li>
                        <li>• TypeScript</li>
                        <li>• Tailwind CSS</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">Backend</p>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Python (FastAPI)</li>
                        <li>• LangChain / LlamaIndex</li>
                        <li>• PostgreSQL + pgvector</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-2">IA/ML</p>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• OpenAI GPT-4</li>
                        <li>• Anthropic Claude 3.5</li>
                        <li>• Mistral (modèles EU)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default AIAgentExplainedSimple;
