import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Layers, Users } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Access",
    description: "Pre-screened samples ready for immediate procurement without lengthy donor recruitment delays.",
  },
  {
    icon: Shield,
    title: "CLIA-Certified Testing",
    description: "All samples undergo rigorous genetic screening and infectious disease testing at certified laboratories.",
  },
  {
    icon: Layers,
    title: "Tiered Inventory",
    description: "Choose from Full Profile, Standard, or Limited tiers based on your clinic's specific requirements.",
  },
  {
    icon: Users,
    title: "Built by Legacy",
    description: "Backed by Legacy's expertise in male fertility preservation and reproductive health solutions.",
  },
];

export function WhyLineage() {
  return (
    <section id="why-lineage" className="py-16 sm:py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
            Why Lineage
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A streamlined approach to donor sperm procurement for fertility clinics and reproductive health institutions.
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border hover-elevate transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2" data-testid={`text-feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
