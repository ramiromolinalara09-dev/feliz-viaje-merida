import {
  HeroSection,
  BenefitsSection,
  ProcessSection,
  PackagesSection,
  FAQSection,
  CTASection,
} from "@/components/home";
import { WorldCupPromoBanner } from "@/components/home/world-cup-promo-banner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WorldCupPromoBanner />
      <BenefitsSection />
      <ProcessSection />
      <PackagesSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
