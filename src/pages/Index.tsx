import Hero from "@/components/Hero";
import AuditForm from "@/components/AuditForm";
import AgentRequestForm from "@/components/AgentRequestForm";
import BlogSection from "@/components/BlogSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <AuditForm />
      <AgentRequestForm />
      <BlogSection />
    </div>
  );
};

export default Index;
