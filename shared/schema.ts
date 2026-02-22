import { pgTable, text, varchar, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("clinic"),
  institutionName: text("institution_name"),
  contactEmail: text("contact_email"),
  verified: boolean("verified").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const donors = pgTable("donors", {
  id: varchar("id", { length: 20 }).primaryKey(),
  age: integer("age").notNull(),
  bloodType: text("blood_type").notNull(),
  cmvStatus: text("cmv_status").notNull(),
  tier: text("tier").notNull(),
  vialsAvailable: integer("vials_available").notNull(),
  ethnicity: text("ethnicity"),
  education: text("education"),
  hairColor: text("hair_color"),
  eyeColor: text("eye_color"),
  height: text("height"),
  weight: text("weight"),
  medicalHistory: text("medical_history"),
  geneticScreening: text("genetic_screening"),
  personalityNotes: text("personality_notes"),
  active: boolean("active").notNull().default(true),
});

export const consultationRequests = pgTable("consultation_requests", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  institution: text("institution"),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const reservations = pgTable("reservations", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull(),
  donorId: varchar("donor_id", { length: 20 }).notNull(),
  vialsRequested: integer("vials_requested").notNull(),
  status: text("status").notNull().default("pending"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  institutionName: true,
  contactEmail: true,
});

export const insertDonorSchema = createInsertSchema(donors);
export const insertConsultationRequestSchema = createInsertSchema(consultationRequests);
export const insertReservationSchema = createInsertSchema(reservations);

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Donor = typeof donors.$inferSelect;
export type InsertDonor = z.infer<typeof insertDonorSchema>;
export type ConsultationRequest = typeof consultationRequests.$inferSelect;
export type InsertConsultationRequest = z.infer<typeof insertConsultationRequestSchema>;
export type Reservation = typeof reservations.$inferSelect;
export type InsertReservation = z.infer<typeof insertReservationSchema>;
