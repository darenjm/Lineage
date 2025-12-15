import { 
  type User, type InsertUser,
  type Donor, type InsertDonor,
  type ConsultationRequest, type InsertConsultationRequest 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getDonors(): Promise<Donor[]>;
  getDonor(id: string): Promise<Donor | undefined>;
  createDonor(donor: InsertDonor): Promise<Donor>;
  
  getConsultationRequests(): Promise<ConsultationRequest[]>;
  createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private donors: Map<string, Donor>;
  private consultationRequests: Map<string, ConsultationRequest>;

  constructor() {
    this.users = new Map();
    this.donors = new Map();
    this.consultationRequests = new Map();
    
    this.seedDonors();
  }

  private seedDonors() {
    const initialDonors: Donor[] = [
      { id: "LN-A384", age: 27, bloodType: "O+", cmvStatus: "Neg", tier: "Full Profile", vialsAvailable: 12 },
      { id: "LN-B218", age: 32, bloodType: "A-", cmvStatus: "Pos", tier: "Standard", vialsAvailable: 6 },
      { id: "LN-C147", age: 25, bloodType: "B+", cmvStatus: "Neg", tier: "Limited", vialsAvailable: 3 },
      { id: "LN-D092", age: 29, bloodType: "AB+", cmvStatus: "Neg", tier: "Full Profile", vialsAvailable: 8 },
      { id: "LN-E456", age: 31, bloodType: "O-", cmvStatus: "Neg", tier: "Standard", vialsAvailable: 5 },
      { id: "LN-F789", age: 28, bloodType: "A+", cmvStatus: "Neg", tier: "Full Profile", vialsAvailable: 10 },
      { id: "LN-G234", age: 26, bloodType: "B-", cmvStatus: "Pos", tier: "Limited", vialsAvailable: 2 },
      { id: "LN-H567", age: 30, bloodType: "O+", cmvStatus: "Neg", tier: "Standard", vialsAvailable: 7 },
    ];
    
    initialDonors.forEach(donor => {
      this.donors.set(donor.id, donor);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getDonors(): Promise<Donor[]> {
    return Array.from(this.donors.values());
  }

  async getDonor(id: string): Promise<Donor | undefined> {
    return this.donors.get(id);
  }

  async createDonor(insertDonor: InsertDonor): Promise<Donor> {
    const donor: Donor = { ...insertDonor };
    this.donors.set(donor.id, donor);
    return donor;
  }

  async getConsultationRequests(): Promise<ConsultationRequest[]> {
    return Array.from(this.consultationRequests.values());
  }

  async createConsultationRequest(insertRequest: InsertConsultationRequest): Promise<ConsultationRequest> {
    const id = randomUUID();
    const request: ConsultationRequest = { ...insertRequest, id };
    this.consultationRequests.set(id, request);
    return request;
  }
}

export const storage = new MemStorage();
