import {
  type User, type InsertUser,
  type Donor, type InsertDonor,
  type ConsultationRequest, type InsertConsultationRequest,
  type Reservation, type InsertReservation,
  users, donors, consultationRequests, reservations,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, ilike, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getDonors(filters?: DonorFilters): Promise<Donor[]>;
  getDonor(id: string): Promise<Donor | undefined>;
  createDonor(donor: InsertDonor): Promise<Donor>;
  updateDonor(id: string, donor: Partial<InsertDonor>): Promise<Donor | undefined>;
  deleteDonor(id: string): Promise<boolean>;

  getConsultationRequests(): Promise<ConsultationRequest[]>;
  createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest>;

  getReservations(userId?: number): Promise<Reservation[]>;
  getReservation(id: number): Promise<Reservation | undefined>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  updateReservationStatus(id: number, status: string): Promise<Reservation | undefined>;
}

export interface DonorFilters {
  bloodType?: string;
  cmvStatus?: string;
  tier?: string;
  minAge?: number;
  maxAge?: number;
  ethnicity?: string;
  education?: string;
  hairColor?: string;
  eyeColor?: string;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getDonors(filters?: DonorFilters): Promise<Donor[]> {
    const conditions = [eq(donors.active, true)];

    if (filters?.bloodType) conditions.push(eq(donors.bloodType, filters.bloodType));
    if (filters?.cmvStatus) conditions.push(eq(donors.cmvStatus, filters.cmvStatus));
    if (filters?.tier) conditions.push(eq(donors.tier, filters.tier));
    if (filters?.minAge) conditions.push(gte(donors.age, filters.minAge));
    if (filters?.maxAge) conditions.push(lte(donors.age, filters.maxAge));
    if (filters?.ethnicity) conditions.push(eq(donors.ethnicity, filters.ethnicity));
    if (filters?.education) conditions.push(eq(donors.education, filters.education));
    if (filters?.hairColor) conditions.push(eq(donors.hairColor, filters.hairColor));
    if (filters?.eyeColor) conditions.push(eq(donors.eyeColor, filters.eyeColor));

    return db.select().from(donors).where(and(...conditions));
  }

  async getDonor(id: string): Promise<Donor | undefined> {
    const [donor] = await db.select().from(donors).where(eq(donors.id, id));
    return donor;
  }

  async createDonor(insertDonor: InsertDonor): Promise<Donor> {
    const [donor] = await db.insert(donors).values({ ...insertDonor, active: true }).returning();
    return donor;
  }

  async updateDonor(id: string, updates: Partial<InsertDonor>): Promise<Donor | undefined> {
    const [donor] = await db.update(donors).set(updates).where(eq(donors.id, id)).returning();
    return donor;
  }

  async deleteDonor(id: string): Promise<boolean> {
    const [donor] = await db.update(donors).set({ active: false }).where(eq(donors.id, id)).returning();
    return !!donor;
  }

  async getConsultationRequests(): Promise<ConsultationRequest[]> {
    return db.select().from(consultationRequests);
  }

  async createConsultationRequest(insertRequest: InsertConsultationRequest): Promise<ConsultationRequest> {
    const [request] = await db.insert(consultationRequests).values({
      name: insertRequest.name,
      email: insertRequest.email,
      institution: insertRequest.institution,
    }).returning();
    return request;
  }

  async getReservations(userId?: number): Promise<Reservation[]> {
    if (userId) {
      return db.select().from(reservations).where(eq(reservations.userId, userId));
    }
    return db.select().from(reservations);
  }

  async getReservation(id: number): Promise<Reservation | undefined> {
    const [reservation] = await db.select().from(reservations).where(eq(reservations.id, id));
    return reservation;
  }

  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const [reservation] = await db.insert(reservations).values({
      userId: insertReservation.userId,
      donorId: insertReservation.donorId,
      vialsRequested: insertReservation.vialsRequested,
      notes: insertReservation.notes,
    }).returning();
    return reservation;
  }

  async updateReservationStatus(id: number, status: string): Promise<Reservation | undefined> {
    const [reservation] = await db
      .update(reservations)
      .set({ status, updatedAt: new Date() })
      .where(eq(reservations.id, id))
      .returning();
    return reservation;
  }
}

export const storage = new DatabaseStorage();
