import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BlogSection = () => {
  const blogPosts = [
    {
      category: "Automatisation",
      title: "Comment l'IA peut réduire vos coûts opérationnels de 40%",
      excerpt: "Découvrez les stratégies concrètes pour implémenter l'IA et générer des économies significatives dès les premiers mois.",
      readTime: "5 min",
      date: "15 Mars 2024"
    },
    {
      category: "Productivité", 
      title: "Guide complet : Automatiser votre service client avec des agents IA",
      excerpt: "De la configuration initiale aux résultats mesurables, suivez notre méthode éprouvée pour transformer votre support client.",
      readTime: "8 min",
      date: "12 Mars 2024"
    },
    {
      category: "ROI",
      title: "ROI des agents IA : études de cas secteur par secteur",
      excerpt: "Analyses détaillées des retours sur investissement obtenus par nos clients dans différents secteurs d'activité.",
      readTime: "6 min",
      date: "10 Mars 2024"
    },
    {
      category: "Études de cas",
      title: "Les 10 processus les plus chronophages à automatiser en 2024",
      excerpt: "Identifiez rapidement les processus de votre entreprise qui bénéficieraient le plus d'une automatisation par IA.",
      readTime: "4 min",
      date: "8 Mars 2024"
    }
  ];

  const categories = ["Automatisation", "Productivité", "ROI", "Études de cas"];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            Ressources &{" "}
            <span className="text-primary font-normal">Insights</span>
          </h2>
          <p className="text-muted-foreground font-light max-w-2xl mx-auto">
            Découvrez comment l'IA transforme les entreprises à travers nos analyses, guides pratiques et études de cas
          </p>
          <div className="w-16 h-px bg-primary mx-auto mt-6"></div>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button className="px-4 py-2 border border-primary bg-primary/5 text-primary rounded-full text-sm font-light transition-all duration-300">
            Tous
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 border border-border/40 text-muted-foreground rounded-full text-sm font-light hover:border-primary/40 hover:text-primary transition-all duration-300"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <Card key={index} className="card-minimal group cursor-pointer">
              <CardHeader className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs text-primary font-light tracking-widest uppercase">
                    {post.category}
                  </span>
                  <div className="w-1 h-1 bg-border rounded-full"></div>
                  <span className="text-xs text-muted-foreground font-light">
                    {post.readTime} de lecture
                  </span>
                </div>
                
                <h3 className="text-lg font-normal text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {post.excerpt}
                </p>
              </CardHeader>
              
              <CardContent className="px-6 pb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-light">
                    {post.date}
                  </span>
                  <div className="w-6 h-px bg-border group-hover:w-8 group-hover:bg-primary transition-all duration-300"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-2xl mx-auto">
          <Card className="card-accent">
            <CardContent className="p-8 text-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
              </div>
              
              <h3 className="text-xl font-normal text-foreground mb-3">
                Restez à la Pointe de l'IA
              </h3>
              
              <p className="text-muted-foreground font-light mb-6 leading-relaxed">
                Recevez chaque semaine nos dernières analyses, guides pratiques et innovations en matière d'agents IA
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  className="input-minimal flex-1"
                />
                <Button className="btn-minimal-primary">
                  S'abonner
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4 font-light">
                Pas de spam. Désabonnement en un clic.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;