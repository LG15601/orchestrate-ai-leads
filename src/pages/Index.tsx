import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AIAgentExplanation from "@/components/AIAgentExplanation";
import AuditForm from "@/components/AuditForm";
import AgentRequestForm from "@/components/AgentRequestForm";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <AIAgentExplanation />
      <AuditForm />
      <AgentRequestForm />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Index;
