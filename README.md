# Orchestrate AI Leads - Audit d'Automatisation IA

## Description du projet

Application web pour auditer le potentiel d'automatisation IA des entreprises. L'application analyse le site web d'une entreprise et génère un rapport personnalisé avec des recommandations d'automatisation.

## Fonctionnalités

- 🔍 Analyse automatique de sites web
- 🤖 Agent IA intégré (OpenAI GPT-4)
- 📊 Rapport d'audit personnalisé
- 🎯 Recommandations d'automatisation
- 📈 Calcul de ROI
- 🗺️ Roadmap d'implémentation
- 💾 Stockage des résultats dans Supabase

## Technologies utilisées

- **Frontend**: React + TypeScript + Vite
- **UI**: shadcn/ui + Tailwind CSS
- **Backend**: Supabase Edge Functions
- **IA**: OpenAI GPT-4
- **Base de données**: Supabase PostgreSQL
- **Scraping**: Firecrawl (optionnel)

## Configuration et Installation

### Prérequis

- Node.js 18+ et npm
- Compte Supabase
- Clé API OpenAI
- Clé API Firecrawl (optionnel)

### Installation

1. **Cloner le projet**
```bash
git clone <URL_DU_REPO>
cd orchestrate-ai-leads-main
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
# Copier le fichier d'exemple
cp env.example .env.local

# Éditer .env.local avec vos vraies clés API
```

4. **Configurer Supabase**
```bash
# Installer Supabase CLI
npm install -g supabase

# Se connecter à Supabase
supabase login

# Lier le projet
supabase link --project-ref jcbdlfccfyrnbvzihvse

# Déployer les fonctions Edge
supabase functions deploy ai-audit
```

5. **Lancer le projet en local**
```bash
npm run dev
```

### Variables d'environnement requises

Créez un fichier `.env.local` avec :

```env
VITE_SUPABASE_URL=https://jcbdlfccfyrnbvzihvse.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
OPENAI_API_KEY=your_openai_api_key_here
FIRECRAWL_API_KEY=your_firecrawl_api_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ddbca543-a06f-4dfc-93b6-b5a3cc2c9d8a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
