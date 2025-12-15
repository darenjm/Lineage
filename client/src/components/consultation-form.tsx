import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertConsultationRequestSchema, type InsertConsultationRequest } from "@shared/schema";
import { Clock, Shield, Loader2, CheckCircle } from "lucide-react";

const formSchema = insertConsultationRequestSchema.extend({
  name: insertConsultationRequestSchema.shape.name.min(2, "Name must be at least 2 characters"),
  email: insertConsultationRequestSchema.shape.email.email("Please enter a valid email address"),
});

export function ConsultationForm() {
  const { toast } = useToast();
  
  const form = useForm<InsertConsultationRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      institution: "",
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertConsultationRequest) => {
      const response = await apiRequest("POST", "/api/consultation-requests", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted",
        description: "We'll be in touch within 1-2 business days.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertConsultationRequest) => {
    mutation.mutate(data);
  };

  return (
    <section id="request" className="py-16 sm:py-20 bg-muted/30">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
            Ready to explore the inventory?
          </h2>
          <p className="text-muted-foreground">
            Submit your institution info. We'll follow up in 1–2 business days.
          </p>
        </div>

        <Card className="border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-center">Request a Consultation</CardTitle>
            <CardDescription className="text-center">
              All fields marked with * are required
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Dr. Jane Smith" 
                          {...field} 
                          data-testid="input-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="institution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Boston Fertility Center" 
                          {...field} 
                          value={field.value ?? ""}
                          data-testid="input-institution"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Email *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="jane.smith@fertilitycenter.com" 
                          {...field}
                          data-testid="input-email" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={mutation.isPending}
                  data-testid="button-submit-consultation"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : mutation.isSuccess ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Submitted!
                    </>
                  ) : (
                    "Request a Consultation"
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Response within 1-2 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-3.5 w-3.5" />
                  <span>HIPAA Compliant</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
