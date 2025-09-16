import { Resend } from 'resend';

const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Fonction de test pour vérifier la configuration Resend
export const testResendConfiguration = async () => {
  if (!resend) {
    console.error('❌ Resend non configuré - VITE_RESEND_API_KEY manquante');
    return false;
  }

  try {
    console.log('🔍 Test de la configuration Resend...');
    console.log('📧 Clé API:', resendApiKey ? `${resendApiKey.substring(0, 10)}...` : 'Non définie');
    
    // Test simple d'envoi
    const { data, error } = await resend.emails.send({
      from: 'contact@orchestraconnect.fr',
      to: ['test@example.com'],
      subject: 'Test de configuration Resend',
      html: '<p>Ceci est un test de configuration.</p>',
    });

    if (error) {
      console.error('❌ Erreur de configuration Resend:', error);
      return false;
    }

    console.log('✅ Configuration Resend OK:', data);
    return true;
  } catch (error) {
    console.error('❌ Erreur lors du test Resend:', error);
    return false;
  }
};

// Template HTML pour les emails avec le style du site
const getEmailTemplate = (title: string, content: string, isAuditReport = false) => `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #f5ff7d;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #1a1a1a;
            margin-bottom: 10px;
        }
        .tagline {
            color: #666;
            font-size: 16px;
        }
        .content {
            margin-bottom: 30px;
        }
        .highlight {
            background: linear-gradient(135deg, #f5ff7d 0%, #e8f5a8 100%);
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #f5ff7d;
        }
        .cta-button {
            display: inline-block;
            background: #1a1a1a;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 14px;
        }
        .audit-score {
            background: linear-gradient(135deg, #f5ff7d 0%, #e8f5a8 100%);
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            margin: 20px 0;
        }
        .score-number {
            font-size: 48px;
            font-weight: bold;
            color: #1a1a1a;
            margin: 10px 0;
        }
        .recommendations {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .recommendation-item {
            background: white;
            padding: 15px;
            margin: 10px 0;
            border-radius: 6px;
            border-left: 4px solid #f5ff7d;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🤖 OrchestraConnect</div>
            <div class="tagline">Votre partenaire en automatisation intelligente</div>
        </div>
        
        <div class="content">
            ${content}
        </div>
        
        <div class="footer">
            <p>Merci de nous faire confiance pour transformer votre entreprise avec l'IA.</p>
            <p><strong>Alex</strong><br>
            OrchestraConnect<br>
            <a href="mailto:contact@orchestraconnect.fr">contact@orchestraconnect.fr</a></p>
        </div>
    </div>
</body>
</html>`;

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export const sendEmail = async (emailData: EmailData) => {
  if (!resend) {
    console.warn('Resend API key not configured. Email not sent:', emailData.subject);
    console.warn('Pour activer l\'envoi d\'emails, ajoutez VITE_RESEND_API_KEY dans votre fichier .env');
    // En mode développement, on simule l'envoi réussi
    return { id: 'dev-mode', to: emailData.to, subject: emailData.subject };
  }

  try {
    console.log('Tentative d\'envoi d\'email:', {
      to: emailData.to,
      subject: emailData.subject,
      from: emailData.from || 'contact@orchestraconnect.fr'
    });

    const { data, error } = await resend.emails.send({
      from: emailData.from || 'contact@orchestraconnect.fr',
      to: [emailData.to],
      subject: emailData.subject,
      html: emailData.html,
    });

    if (error) {
      console.error('Erreur Resend:', error);
      throw new Error(`Erreur Resend: ${error.message || 'Erreur inconnue'}`);
    }

    console.log('Email envoyé avec succès:', data);
    return data;
  } catch (error) {
    console.error('Erreur dans sendEmail:', error);
    throw error;
  }
};

export const sendAuditReportEmail = async (email: string, auditResult: any, leadData: any) => {
  const content = `
    <h1>Votre rapport d'audit est prêt ! 📊</h1>
    
    <p>Bonjour ${leadData.firstName || leadData.first_name},</p>
    
    <p>Voici votre rapport d'audit personnalisé pour <strong>${leadData.company}</strong> :</p>
    
    <div class="audit-score">
        <h3>Score d'Automatisation</h3>
        <div class="score-number">${auditResult.score || 'XX'}%</div>
        <p>Votre entreprise peut automatiser <strong>${auditResult.score || 'XX'}%</strong> de ses processus</p>
    </div>
    
    <div class="highlight">
        <h3 style="margin-top: 0;">💼 Informations Entreprise</h3>
        <ul>
            <li><strong>Entreprise :</strong> ${leadData.company}</li>
            <li><strong>Secteur :</strong> ${auditResult.sector || 'Non spécifié'}</li>
            <li><strong>Modèle d'affaires :</strong> ${auditResult.business_model || 'Non spécifié'}</li>
        </ul>
    </div>
    
    <div class="recommendations">
        <h3>🎯 Agents IA Recommandés</h3>
        ${auditResult.specialized_agents?.map((agent: any) => `
            <div class="recommendation-item">
                <strong>${agent.name}</strong><br>
                ${agent.description}
            </div>
        `).join('') || '<p>Agents personnalisés en cours d\'analyse...</p>'}
    </div>
    
    <div class="highlight">
        <h3 style="margin-top: 0;">💰 Estimation ROI</h3>
        <p>${auditResult.roi_estimate || 'Calcul en cours...'}</p>
    </div>
    
    <div class="highlight">
        <h3 style="margin-top: 0;">⏰ Temps Récupéré</h3>
        <p>${auditResult.time_saved || 'Calcul en cours...'}</p>
    </div>
    
    <div class="highlight">
        <h3 style="margin-top: 0;">🚀 Prochaines Étapes</h3>
        <p>Notre équipe vous contactera dans les <strong>24h</strong> pour planifier une démonstration personnalisée et discuter de l'implémentation de vos agents IA.</p>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
        <a href="https://orchestraconnect.fr" class="cta-button">Découvrir nos solutions</a>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: `📊 Votre Rapport d'Audit OrchestraConnect - ${auditResult.score || 'XX'}% d'automatisation possible`,
    html: getEmailTemplate('Rapport d\'Audit Personnalisé', content, true),
  });
};

export const sendLeadConfirmationEmail = async (email: string, leadData: any) => {
  const content = `
    <h1>Merci pour votre demande, ${leadData.firstName || leadData.first_name} ! 🎉</h1>
    
    <p>Nous avons bien reçu votre demande d'agent IA personnalisé. Voici un récapitulatif de vos informations :</p>
    
    <div class="highlight">
        <h3 style="margin-top: 0;">Vos informations :</h3>
        <ul>
            <li><strong>Prénom :</strong> ${leadData.firstName || leadData.first_name}</li>
            <li><strong>Nom :</strong> ${leadData.lastName || leadData.last_name}</li>
            <li><strong>Email :</strong> ${leadData.email}</li>
            <li><strong>Entreprise :</strong> ${leadData.company}</li>
            <li><strong>Téléphone :</strong> ${leadData.phone || 'Non renseigné'}</li>
            <li><strong>Besoins en agents IA :</strong> ${leadData.needs || 'Non renseigné'}</li>
            <li><strong>Statut professionnel :</strong> ${leadData.isProfessional || 'Non renseigné'}</li>
            ${leadData.siret ? `<li><strong>SIRET :</strong> ${leadData.siret}</li>` : ''}
            <li><strong>Niveau d'urgence :</strong> ${leadData.urgency || 'Non renseigné'}</li>
        </ul>
    </div>
    
    <div class="highlight">
        <h3 style="margin-top: 0;">Prochaines étapes :</h3>
        <p>Un expert OrchestraConnect vous contactera dans les <strong>24 heures</strong> pour :</p>
        <ul>
            <li>Analyser vos besoins spécifiques</li>
            <li>Vous proposer une solution d'agent IA personnalisée</li>
            <li>Planifier une démonstration</li>
        </ul>
    </div>
    
    <p>En attendant, n'hésitez pas à explorer notre site pour découvrir nos solutions d'automatisation.</p>
    
    <div style="text-align: center; margin: 30px 0;">
        <a href="https://orchestraconnect.fr" class="cta-button">Découvrir nos solutions</a>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: 'Confirmation de votre demande d\'agent IA - OrchestraConnect',
    html: getEmailTemplate('Confirmation de votre demande', content),
  });
};
