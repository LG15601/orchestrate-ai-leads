import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import { 
  Users, 
  Mail, 
  Building, 
  TrendingUp, 
  Calendar,
  Phone,
  Eye,
  Download,
  Send,
  MailOpen,
  MousePointer,
  AlertCircle,
  CheckCircle,
  Clock,
  Play,
  Pause,
  Settings,
  Plus
} from "lucide-react";

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  phone?: string;
  source: string;
  audit_score?: number;
  company_sector?: string;
  automation_opportunities?: string[];
  priority_agents?: string[];
  created_at: string;
  updated_at: string;
}

interface EmailLog {
  id: string;
  lead_id: string;
  email_address: string;
  subject: string;
  template_type: string;
  sent_at: string;
  resend_id?: string;
  status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'failed';
  opened_at?: string;
  clicked_at?: string;
  sequence_step: number;
  metadata?: any;
  lead?: Lead;
}

interface EmailSequence {
  id: string;
  name: string;
  description?: string;
  steps: any[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface LeadSequence {
  id: string;
  lead_id: string;
  sequence_id: string;
  current_step: number;
  started_at: string;
  completed_at?: string;
  paused_at?: string;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  lead?: Lead;
  sequence?: EmailSequence;
}

const LeadsDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [sequences, setSequences] = useState<EmailSequence[]>([]);
  const [leadSequences, setLeadSequences] = useState<LeadSequence[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [selectedSequence, setSelectedSequence] = useState<string>('');
  const [activeTab, setActiveTab] = useState('leads');
  const { toast } = useToast();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      await Promise.all([
        fetchLeads(),
        fetchEmailLogs(),
        fetchSequences(),
        fetchLeadSequences()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leads:', error);
      return;
    }

    setLeads(data || []);
  };

  const fetchEmailLogs = async () => {
    const { data, error } = await supabase
      .from('email_logs')
      .select(`
        *,
        lead:leads(*)
      `)
      .order('sent_at', { ascending: false });

    if (error) {
      console.error('Error fetching email logs:', error);
      return;
    }

    setEmailLogs(data || []);
  };

  const fetchSequences = async () => {
    const { data, error } = await supabase
      .from('email_sequences')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sequences:', error);
      return;
    }

    setSequences(data || []);
  };

  const fetchLeadSequences = async () => {
    const { data, error } = await supabase
      .from('lead_sequences')
      .select(`
        *,
        lead:leads(*),
        sequence:email_sequences(*)
      `)
      .order('started_at', { ascending: false });

    if (error) {
      console.error('Error fetching lead sequences:', error);
      return;
    }

    setLeadSequences(data || []);
  };

  const sendSingleEmail = async () => {
    if (!selectedLead || !emailSubject || !emailContent) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un lead et remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    try {
      // Call Supabase function to send email
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: selectedLead.email,
          subject: emailSubject,
          html: emailContent,
          leadId: selectedLead.id,
          templateType: 'custom'
        }
      });

      if (error) throw error;

      if (data?.success) {
        toast({
          title: "✅ Email envoyé",
          description: `Email envoyé à ${selectedLead.first_name} ${selectedLead.last_name}`,
        });
        
        // Reset form
        setSelectedLead(null);
        setEmailSubject('');
        setEmailContent('');
        
        // Refresh email logs
        fetchEmailLogs();
      } else {
        throw new Error(data?.error || 'Failed to send email');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer l'email",
        variant: "destructive",
      });
    }
  };

  const startSequence = async (leadId: string, sequenceId: string) => {
    try {
      const { error } = await supabase
        .from('lead_sequences')
        .insert({
          lead_id: leadId,
          sequence_id: sequenceId,
          current_step: 1,
          status: 'active'
        });

      if (error) throw error;

      toast({
        title: "✅ Séquence démarrée",
        description: "La séquence email a été lancée pour ce lead",
      });

      fetchLeadSequences();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de démarrer la séquence",
        variant: "destructive",
      });
    }
  };

  const pauseSequence = async (leadSequenceId: string) => {
    try {
      const { error } = await supabase
        .from('lead_sequences')
        .update({ 
          status: 'paused',
          paused_at: new Date().toISOString()
        })
        .eq('id', leadSequenceId);

      if (error) throw error;

      toast({
        title: "⏸️ Séquence mise en pause",
        description: "La séquence a été mise en pause",
      });

      fetchLeadSequences();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre en pause la séquence",
        variant: "destructive",
      });
    }
  };

  const exportLeads = () => {
    const csvContent = [
      ['Nom', 'Prénom', 'Email', 'Entreprise', 'Téléphone', 'Score Audit', 'Secteur', 'Date'],
      ...leads.map(lead => [
        lead.last_name,
        lead.first_name,
        lead.email,
        lead.company,
        lead.phone || '',
        lead.audit_score || '',
        lead.company_sector || '',
        new Date(lead.created_at).toLocaleDateString('fr-FR')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Send className="w-4 h-4 text-blue-500" />;
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'opened': return <MailOpen className="w-4 h-4 text-green-600" />;
      case 'clicked': return <MousePointer className="w-4 h-4 text-purple-500" />;
      case 'bounced': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent-success mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              📊 Dashboard AgentConnect
            </h1>
            <p className="text-muted-foreground">
              Gestion complète des leads et campagnes email
            </p>
          </div>
          <Button
            onClick={exportLeads}
            className="bg-accent-success text-white hover:bg-accent-success/90 font-bold px-6 py-2 border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
          >
            <Download className="w-4 h-4 mr-2" />
            Exporter CSV
          </Button>
        </div>

        {/* Stats globales */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <Card className="card-bold">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-accent-success mx-auto mb-2" />
              <h3 className="text-xl font-bold text-foreground">{leads.length}</h3>
              <p className="text-muted-foreground text-xs">Total Leads</p>
            </CardContent>
          </Card>
          
          <Card className="card-bold">
            <CardContent className="p-4 text-center">
              <Mail className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <h3 className="text-xl font-bold text-foreground">{emailLogs.length}</h3>
              <p className="text-muted-foreground text-xs">Emails Envoyés</p>
            </CardContent>
          </Card>
          
          <Card className="card-bold">
            <CardContent className="p-4 text-center">
              <MailOpen className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <h3 className="text-xl font-bold text-foreground">
                {emailLogs.filter(log => log.status === 'opened').length}
              </h3>
              <p className="text-muted-foreground text-xs">Emails Ouverts</p>
            </CardContent>
          </Card>
          
          <Card className="card-bold">
            <CardContent className="p-4 text-center">
              <Play className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <h3 className="text-xl font-bold text-foreground">
                {leadSequences.filter(seq => seq.status === 'active').length}
              </h3>
              <p className="text-muted-foreground text-xs">Séquences Actives</p>
            </CardContent>
          </Card>
          
          <Card className="card-bold">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-accent-success mx-auto mb-2" />
              <h3 className="text-xl font-bold text-foreground">
                {leads.filter(lead => lead.audit_score && lead.audit_score > 70).length}
              </h3>
              <p className="text-muted-foreground text-xs">Leads Chauds</p>
            </CardContent>
          </Card>
        </div>

        {/* Onglets principaux */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Leads ({leads.length})
            </TabsTrigger>
            <TabsTrigger value="emails" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Emails ({emailLogs.length})
            </TabsTrigger>
            <TabsTrigger value="sequences" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Séquences ({leadSequences.length})
            </TabsTrigger>
            <TabsTrigger value="send" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Envoyer Email
            </TabsTrigger>
          </TabsList>

          {/* Onglet Leads */}
          <TabsContent value="leads" className="space-y-4">
            {leads.map((lead) => (
              <Card key={lead.id} className="card-bold">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-lg font-bold text-foreground">
                          {lead.first_name} {lead.last_name}
                        </h3>
                        {lead.audit_score && (
                          <Badge className={`px-3 py-1 text-sm font-bold border-2 ${
                            lead.audit_score > 70 ? 'bg-green-100 text-green-800 border-green-200' :
                            lead.audit_score > 50 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                            'bg-red-100 text-red-800 border-red-200'
                          }`}>
                            Score: {lead.audit_score}%
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{lead.email}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{lead.company}</span>
                        </div>
                        
                        {lead.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{lead.phone}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {new Date(lead.created_at).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>

                      {lead.company_sector && (
                        <div className="mb-4">
                          <Badge className="bg-accent-success/10 text-accent-success border-accent-success">
                            {lead.company_sector}
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-2 border-black shadow-[1px_1px_0px_#000000]"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Séquence
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Démarrer une séquence email</DialogTitle>
                            <DialogDescription>
                              Choisissez une séquence pour {lead.first_name} {lead.last_name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Select value={selectedSequence} onValueChange={setSelectedSequence}>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une séquence" />
                              </SelectTrigger>
                              <SelectContent>
                                {sequences.map((seq) => (
                                  <SelectItem key={seq.id} value={seq.id}>
                                    {seq.name} ({seq.steps.length} étapes)
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button 
                              onClick={() => selectedSequence && startSequence(lead.id, selectedSequence)}
                              className="w-full bg-accent-success text-white hover:bg-accent-success/90"
                            >
                              Démarrer la séquence
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        size="sm" 
                        onClick={() => setSelectedLead(lead)}
                        className="bg-black text-white hover:bg-gray-800 border-2 border-black shadow-[1px_1px_0px_#000000]"
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Onglet Emails */}
          <TabsContent value="emails" className="space-y-4">
            {emailLogs.map((log) => (
              <Card key={log.id} className="card-bold">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(log.status)}
                        <h3 className="font-bold text-foreground">{log.subject}</h3>
                        <Badge variant="outline" className="text-xs">
                          {log.template_type}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-2">
                        À: {log.email_address} • {new Date(log.sent_at).toLocaleDateString('fr-FR')} à {new Date(log.sent_at).toLocaleTimeString('fr-FR')}
                      </div>
                      
                      {log.lead && (
                        <div className="text-sm text-muted-foreground">
                          Lead: {log.lead.first_name} {log.lead.last_name} ({log.lead.company})
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <Badge className={`${
                        log.status === 'opened' ? 'bg-green-100 text-green-800' :
                        log.status === 'clicked' ? 'bg-purple-100 text-purple-800' :
                        log.status === 'bounced' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {log.status}
                      </Badge>
                      {log.opened_at && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Ouvert: {new Date(log.opened_at).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Onglet Séquences */}
          <TabsContent value="sequences" className="space-y-4">
            {leadSequences.map((leadSeq) => (
              <Card key={leadSeq.id} className="card-bold">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-foreground">
                          {leadSeq.sequence?.name}
                        </h3>
                        <Badge className={`${
                          leadSeq.status === 'active' ? 'bg-green-100 text-green-800' :
                          leadSeq.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                          leadSeq.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {leadSeq.status}
                        </Badge>
                      </div>
                      
                      {leadSeq.lead && (
                        <div className="text-sm text-muted-foreground mb-2">
                          Lead: {leadSeq.lead.first_name} {leadSeq.lead.last_name} ({leadSeq.lead.company})
                        </div>
                      )}
                      
                      <div className="text-sm text-muted-foreground">
                        Étape {leadSeq.current_step} / {leadSeq.sequence?.steps?.length || 0} • 
                        Démarrée le {new Date(leadSeq.started_at).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {leadSeq.status === 'active' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => pauseSequence(leadSeq.id)}
                          className="border-2 border-black shadow-[1px_1px_0px_#000000]"
                        >
                          <Pause className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Onglet Envoyer Email */}
          <TabsContent value="send" className="space-y-6">
            <Card className="card-bold">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Envoyer un email personnalisé
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Sélectionner un lead
                  </label>
                  <Select 
                    value={selectedLead?.id || ''} 
                    onValueChange={(value) => {
                      const lead = leads.find(l => l.id === value);
                      setSelectedLead(lead || null);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un lead" />
                    </SelectTrigger>
                    <SelectContent>
                      {leads.map((lead) => (
                        <SelectItem key={lead.id} value={lead.id}>
                          {lead.first_name} {lead.last_name} - {lead.company} ({lead.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Sujet de l'email
                  </label>
                  <Input
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Sujet de votre email..."
                    className="input-bold"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Contenu de l'email
                  </label>
                  <Textarea
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    placeholder="Contenu de votre email (HTML accepté)..."
                    rows={8}
                    className="input-bold"
                  />
                </div>

                <Button 
                  onClick={sendSingleEmail}
                  disabled={!selectedLead || !emailSubject || !emailContent}
                  className="w-full bg-accent-success text-white hover:bg-accent-success/90 font-bold py-3 border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer l'email
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LeadsDashboard;
