import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { insertConsultationRequestSchema, insertDonorSchema, insertReservationSchema } from "@shared/schema";
import { z } from "zod";

async function sendConsultationNotification(name: string, email: string, institution: string | null) {
  console.log("=== CONSULTATION REQUEST NOTIFICATION ===");
  console.log(`New consultation request received:`);
  console.log(`  Name: ${name}`);
  console.log(`  Email: ${email}`);
  console.log(`  Institution: ${institution || "Not provided"}`);
  console.log(`  Timestamp: ${new Date().toISOString()}`);
  console.log(`  [In production, email would be sent to: lineage@givelegacy.com]`);
  console.log("==========================================");
  return true;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get("/api/donors", async (req, res) => {
    try {
      const { bloodType, cmvStatus, tier, minAge, maxAge, ethnicity, education, hairColor, eyeColor } = req.query;
      const filters: any = {};
      if (bloodType && typeof bloodType === "string") filters.bloodType = bloodType;
      if (cmvStatus && typeof cmvStatus === "string") filters.cmvStatus = cmvStatus;
      if (tier && typeof tier === "string") filters.tier = tier;
      if (minAge) filters.minAge = parseInt(minAge as string);
      if (maxAge) filters.maxAge = parseInt(maxAge as string);
      if (ethnicity && typeof ethnicity === "string") filters.ethnicity = ethnicity;
      if (education && typeof education === "string") filters.education = education;
      if (hairColor && typeof hairColor === "string") filters.hairColor = hairColor;
      if (eyeColor && typeof eyeColor === "string") filters.eyeColor = eyeColor;

      const donors = await storage.getDonors(Object.keys(filters).length > 0 ? filters : undefined);
      res.json(donors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch donors" });
    }
  });

  app.get("/api/donors/:id", async (req, res) => {
    try {
      const donor = await storage.getDonor(req.params.id);
      if (!donor) {
        return res.status(404).json({ error: "Donor not found" });
      }
      res.json(donor);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch donor" });
    }
  });

  app.post("/api/consultation-requests", async (req, res) => {
    try {
      const schema = z.object({
        name: z.string().min(1),
        email: z.string().email(),
        institution: z.string().optional(),
      });
      const validatedData = schema.parse(req.body);
      const request = await storage.createConsultationRequest(validatedData);

      try {
        await sendConsultationNotification(
          validatedData.name,
          validatedData.email,
          validatedData.institution || null
        );
      } catch (notifyError) {
        console.error("Failed to send notification:", notifyError);
      }

      res.status(201).json(request);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create consultation request" });
    }
  });

  app.get("/api/consultation-requests", async (_req, res) => {
    try {
      const requests = await storage.getConsultationRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch consultation requests" });
    }
  });

  return httpServer;
}
