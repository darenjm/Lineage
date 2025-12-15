import { pgTable, text, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const donors = pgTable("donors", {
  id: varchar("id").primaryKey(),
  age: integer("age").notNull(),
  bloodType: text("blood_type").notNull(),
  cmvStatus: text("cmv_status").notNull(),
  tier: text("tier").notNull(),
  vialsAvailable: integer("vials_available").notNull(),
});

export const consultationRequests = pgTable("consultation_requests", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  institution: text("institution"),
  email: text("email").notNull(),
});

export const insertDonorSchema = createInsertSchema(donors);
export const insertConsultationRequestSchema = createInsertSchema(consultationRequests).omit({ id: true });

export type Donor = typeof donors.$inferSelect;
export type InsertDonor = z.infer<typeof insertDonorSchema>;
export type ConsultationRequest = typeof consultationRequests.$inferSelect;
export type InsertConsultationRequest = z.infer<typeof insertConsultationRequestSchema>;

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
