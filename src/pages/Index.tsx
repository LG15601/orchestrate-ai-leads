import HeaderLanding from "@/components/HeaderLanding";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import AIAgentExplainedSimple from "@/components/AIAgentExplainedSimple";
import UseCasesByIndustry from "@/components/UseCasesByIndustry";
import RealTestimonials from "@/components/RealTestimonials";
import AuditForm from "@/components/AuditForm";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen pt-16">
      <HeaderLanding />
      <Hero />
      <PainPoints />
      <AIAgentExplainedSimple />
      <UseCasesByIndustry />
      <RealTestimonials />
      <AuditForm />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
