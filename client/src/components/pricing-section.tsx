import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, DollarSign, Users, Lock } from "lucide-react";

const pricingTiers = [
  {
    name: "Limited",
    description: "Basic donor information",
    features: [
      "Age and physical characteristics",
      "Blood type and CMV status",
      "Basic health screening",
      "Standard availability",
    ],
    popular: false,
  },
  {
    name: "Standard",
    description: "Comprehensive donor profiles",
    features: [
      "All Limited tier features",
      "Educational background",
      "Family medical history",
      "Extended genetic screening",
      "Priority availability",
    ],
    popular: true,
  },
  {
    name: "Full Profile",
    description: "Complete donor documentation",
    features: [
      "All Standard tier features",
      "Audio interview",
      "Childhood photos",
      "Staff impressions",
      "Exclusive availability options",
    ],
    popular: false,
  },
];

const pricingInfo = [
  {
    icon: DollarSign,
    title: "Access Fee",
    description: "Required for verified institutions to access our inventory platform",
  },
  {
    icon: Users,
    title: "Per-Sample Pricing",
    description: "Pricing varies based on tier and quality specifications",
  },
  {
    icon: DollarSign,
    title: "Volume Discounts",
    description: "Bulk and repeat procurement pricing available for institutions",
  },
  {
    icon: Lock,
    title: "Exclusivity Options",
    description: "Donor exclusivity by region or institution upon request",
  },
];

export function PricingSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-16 sm:py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
            Pricing Framework
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing structure designed for fertility clinics and reproductive health institutions.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 mb-12">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.name} 
              className={`border-border relative ${tier.popular ? 'ring-2 ring-primary' : ''}`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={tier.popular ? "default" : "outline"} 
                  className="w-full"
                  onClick={() => scrollToSection("request")}
                  data-testid={`button-request-${tier.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  Request Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border bg-muted/30">
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
              Pricing Structure
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {pricingInfo.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button 
                size="lg"
                onClick={() => scrollToSection("request")}
                data-testid="button-request-pricing-info"
              >
                Request Pricing & Info Packet
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
