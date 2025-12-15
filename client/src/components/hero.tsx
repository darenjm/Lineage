import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, CheckCircle } from "lucide-react";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
        <Badge variant="secondary" className="mb-6 px-4 py-1.5">
          <Building2 className="h-3.5 w-3.5 mr-2" />
          Trusted by 50+ Fertility Clinics
        </Badge>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
          Lineage by Legacy
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Clinically tested, cryopreserved donor sperm inventory — ready for procurement without the delay of donor recruitment.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button 
            size="lg" 
            onClick={() => scrollToSection("request")}
            className="w-full sm:w-auto px-8"
            data-testid="button-request-access-hero"
          >
            Request Inventory Access
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => scrollToSection("inventory")}
            className="w-full sm:w-auto px-8"
            data-testid="button-view-samples-hero"
          >
            View Sample Inventory
          </Button>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>CLIA-Certified Testing</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>FDA Registered</span>
          </div>
        </div>
      </div>
    </section>
  );
}
