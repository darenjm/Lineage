import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { WhyLineage } from "@/components/why-lineage";
import { InventorySection } from "@/components/inventory-section";
import { PricingSection } from "@/components/pricing-section";
import { ConsultationForm } from "@/components/consultation-form";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <WhyLineage />
        <InventorySection />
        <PricingSection />
        <ConsultationForm />
      </main>
      <Footer />
    </div>
  );
}
