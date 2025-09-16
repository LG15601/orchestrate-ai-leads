import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, subject, html, from = 'contact@orchestraconnect.fr' } = await req.json()

    // Vérifier que les paramètres requis sont présents
    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({ error: 'Paramètres manquants: to, subject, html requis' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    // Récupérer la clé API Resend depuis les variables d'environnement
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY non configurée')
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Configuration email manquante',
          id: 'dev-mode'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200, // On retourne 200 pour ne pas faire planter l'app
        }
      )
    }

    // Envoyer l'email via Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
      }),
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json()
      console.error('Erreur Resend:', errorData)
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: errorData.message || 'Erreur lors de l\'envoi de l\'email',
          details: errorData
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      )
    }

    const emailData = await emailResponse.json()
    console.log('Email envoyé avec succès:', emailData)

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: emailData,
        id: emailData.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Erreur dans send-email function:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Erreur interne du serveur',
        details: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
