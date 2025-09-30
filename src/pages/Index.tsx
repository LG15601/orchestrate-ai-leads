import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import AIAgentExplanation from "@/components/AIAgentExplanation";
import RealTestimonials from "@/components/RealTestimonials";
import AuditForm from "@/components/AuditForm";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import AgentRequestForm from "@/components/AgentRequestForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <PainPoints />
      <AIAgentExplanation />
      <RealTestimonials />
      <AuditForm />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
      <AgentRequestForm />
      <Footer />
    </div>
  );
};

export default Index;
