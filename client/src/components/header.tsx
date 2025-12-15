import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="h-4 w-4 text-primary" />
            <span>CLIA-Certified</span>
          </div>
          <span className="text-muted-foreground/50">|</span>
          <span className="text-muted-foreground">Institutional Use Only</span>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">L</span>
            </div>
            <div>
              <span className="font-semibold text-lg text-foreground">Lineage</span>
              <span className="text-muted-foreground text-sm ml-1">by Legacy</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection("why-lineage")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-why-lineage"
            >
              Why Lineage
            </button>
            <button 
              onClick={() => scrollToSection("inventory")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-inventory"
            >
              Inventory
            </button>
            <button 
              onClick={() => scrollToSection("pricing")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-pricing"
            >
              Pricing
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Button 
              onClick={() => scrollToSection("request")}
              className="hidden sm:flex"
              data-testid="button-request-access-header"
            >
              Request Access
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 flex flex-col gap-2 border-t border-border mt-4">
            <button 
              onClick={() => scrollToSection("why-lineage")}
              className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-why-lineage-mobile"
            >
              Why Lineage
            </button>
            <button 
              onClick={() => scrollToSection("inventory")}
              className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-inventory-mobile"
            >
              Inventory
            </button>
            <button 
              onClick={() => scrollToSection("pricing")}
              className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-pricing-mobile"
            >
              Pricing
            </button>
            <Button 
              onClick={() => scrollToSection("request")}
              className="mt-2"
              data-testid="button-request-access-mobile"
            >
              Request Access
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
