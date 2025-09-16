import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  Mail, 
  Building, 
  TrendingUp, 
  Calendar,
  Phone,
  Eye,
  Download
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

const LeadsDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      // Supabase client is already imported
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching leads:', error);
        return;
      }

      setLeads(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent-success mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement des leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              📊 Dashboard Leads
            </h1>
            <p className="text-muted-foreground">
              {leads.length} leads capturés depuis le lancement
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

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="card-bold">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-accent-success mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">{leads.length}</h3>
              <p className="text-muted-foreground text-sm">Total Leads</p>
            </CardContent>
          </Card>
          
          <Card className="card-bold">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-accent-success mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">
                {leads.filter(lead => lead.audit_score && lead.audit_score > 70).length}
              </h3>
              <p className="text-muted-foreground text-sm">Score supérieur à 70%</p>
            </CardContent>
          </Card>
          
          <Card className="card-bold">
            <CardContent className="p-6 text-center">
              <Building className="w-8 h-8 text-accent-success mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">
                {new Set(leads.map(lead => lead.company)).size}
              </h3>
              <p className="text-muted-foreground text-sm">Entreprises</p>
            </CardContent>
          </Card>
          
          <Card className="card-bold">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-accent-success mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">
                {leads.filter(lead => {
                  const leadDate = new Date(lead.created_at);
                  const today = new Date();
                  const diffTime = Math.abs(today.getTime() - leadDate.getTime());
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays <= 7;
                }).length}
              </h3>
              <p className="text-muted-foreground text-sm">Cette semaine</p>
            </CardContent>
          </Card>
        </div>

        {/* Leads List */}
        <div className="grid gap-4">
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
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
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
                      <div className="mt-3">
                        <Badge className="bg-accent-success/10 text-accent-success border-accent-success">
                          {lead.company_sector}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {leads.length === 0 && (
          <Card className="card-bold">
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Aucun lead pour le moment
              </h3>
              <p className="text-muted-foreground">
                Les leads capturés via l'audit apparaîtront ici.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LeadsDashboard;
