import HeaderSimple from "@/components/HeaderSimple";
import HeroSimple from "@/components/HeroSimple";
import PainPoints from "@/components/PainPoints";
import AIAgentExplainedSimple from "@/components/AIAgentExplainedSimple";
import UseCasesByIndustry from "@/components/UseCasesByIndustry";
import RealTestimonials from "@/components/RealTestimonials";
import AuditForm from "@/components/AuditForm";
import Footer from "@/components/Footer";

export default function IndexSimple() {
  return (
    <div>
      <HeaderSimple />
      <HeroSimple />
      <PainPoints />
      <AIAgentExplainedSimple />
      <UseCasesByIndustry />
      <RealTestimonials />
      <AuditForm />
      <Footer />
    </div>
  );
}
