import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter, Eye, AlertCircle } from "lucide-react";
import type { Donor } from "@shared/schema";

export function InventorySection() {
  const [bloodTypeFilter, setBloodTypeFilter] = useState<string>("all");
  const [cmvFilter, setCmvFilter] = useState<string>("all");
  const [tierFilter, setTierFilter] = useState<string>("all");

  const { data: donors = [], isLoading, error } = useQuery<Donor[]>({
    queryKey: ["/api/donors"],
  });

  const filteredDonors = donors.filter((donor) => {
    if (bloodTypeFilter !== "all" && donor.bloodType !== bloodTypeFilter) return false;
    if (cmvFilter !== "all" && donor.cmvStatus !== cmvFilter) return false;
    if (tierFilter !== "all" && donor.tier !== tierFilter) return false;
    return true;
  });

  const getTierBadgeVariant = (tier: string) => {
    switch (tier) {
      case "Full Profile":
        return "default";
      case "Standard":
        return "secondary";
      case "Limited":
        return "outline";
      default:
        return "secondary";
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inventory" className="py-16 sm:py-20 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
            Sample Inventory
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Preview our available donor inventory. Request access for complete profiles and detailed information.
          </p>
        </div>

        <Card className="border-border">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                Filter Donors
              </CardTitle>
              <Badge variant="secondary" className="w-fit">
                {filteredDonors.length} donors available
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Blood Type
                </label>
                <Select value={bloodTypeFilter} onValueChange={setBloodTypeFilter}>
                  <SelectTrigger data-testid="select-blood-type">
                    <SelectValue placeholder="All Blood Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Blood Types</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  CMV Status
                </label>
                <Select value={cmvFilter} onValueChange={setCmvFilter}>
                  <SelectTrigger data-testid="select-cmv-status">
                    <SelectValue placeholder="All CMV Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All CMV Status</SelectItem>
                    <SelectItem value="Neg">Negative</SelectItem>
                    <SelectItem value="Pos">Positive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Tier
                </label>
                <Select value={tierFilter} onValueChange={setTierFilter}>
                  <SelectTrigger data-testid="select-tier">
                    <SelectValue placeholder="All Tiers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tiers</SelectItem>
                    <SelectItem value="Full Profile">Full Profile</SelectItem>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Limited">Limited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle className="h-10 w-10 text-destructive mb-4" />
                <p className="text-foreground font-medium mb-2">Unable to load inventory</p>
                <p className="text-sm text-muted-foreground">Please try refreshing the page</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-md border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Donor ID</TableHead>
                      <TableHead className="font-semibold">Age</TableHead>
                      <TableHead className="font-semibold">Blood Type</TableHead>
                      <TableHead className="font-semibold">CMV</TableHead>
                      <TableHead className="font-semibold">Tier</TableHead>
                      <TableHead className="font-semibold text-right">Vials</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                          <TableCell><Skeleton className="h-5 w-10" /></TableCell>
                          <TableCell><Skeleton className="h-5 w-12" /></TableCell>
                          <TableCell><Skeleton className="h-5 w-10" /></TableCell>
                          <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                          <TableCell><Skeleton className="h-5 w-8 ml-auto" /></TableCell>
                        </TableRow>
                      ))
                    ) : filteredDonors.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No donors match your filter criteria. Try adjusting your filters.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDonors.map((donor) => (
                        <TableRow 
                          key={donor.id} 
                          className="hover:bg-muted/30 transition-colors"
                          data-testid={`row-donor-${donor.id}`}
                        >
                          <TableCell className="font-medium" data-testid={`text-donor-id-${donor.id}`}>
                            {donor.id}
                          </TableCell>
                          <TableCell>{donor.age}</TableCell>
                          <TableCell>{donor.bloodType}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={donor.cmvStatus === "Neg" ? "secondary" : "outline"}
                              className="text-xs"
                            >
                              {donor.cmvStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getTierBadgeVariant(donor.tier)}>
                              {donor.tier}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {donor.vialsAvailable}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Full donor profiles available upon verification
              </p>
              <Button 
                onClick={() => scrollToSection("request")}
                data-testid="button-request-full-inventory"
              >
                <Eye className="h-4 w-4 mr-2" />
                Request Full Inventory Access
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
