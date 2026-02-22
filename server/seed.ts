import { db } from "./db";
import { donors, users } from "@shared/schema";
import { sql } from "drizzle-orm";
import bcrypt from "bcrypt";

const seedDonors = [
  {
    id: "LN-A384",
    age: 27,
    bloodType: "O+",
    cmvStatus: "Neg",
    tier: "Full Profile",
    vialsAvailable: 12,
    ethnicity: "Caucasian",
    education: "Masters in Engineering",
    hairColor: "Brown",
    eyeColor: "Blue",
    height: "6'1\"",
    weight: "185 lbs",
    medicalHistory:
      "No significant medical history. Family history clear of hereditary conditions. Annual physical exams consistently normal.",
    geneticScreening:
      "Full panel completed — negative for cystic fibrosis, sickle cell, spinal muscular atrophy, and 274 additional conditions.",
    personalityNotes:
      "Athletic, enjoys hiking and playing guitar. Described as thoughtful and calm by staff.",
    active: true,
  },
  {
    id: "LN-B218",
    age: 32,
    bloodType: "A-",
    cmvStatus: "Pos",
    tier: "Standard",
    vialsAvailable: 8,
    ethnicity: "Asian",
    education: "PhD in Biochemistry",
    hairColor: "Black",
    eyeColor: "Brown",
    height: "5'10\"",
    weight: "170 lbs",
    medicalHistory:
      "Mild seasonal allergies. No surgeries. No chronic conditions. Family history unremarkable.",
    geneticScreening:
      "Expanded carrier screening completed — carrier for one recessive condition (non-clinical significance). Negative for all high-risk conditions.",
    personalityNotes:
      "Highly intellectual, enjoys reading and chess. Warm demeanor during staff interactions.",
    active: true,
  },
  {
    id: "LN-C147",
    age: 25,
    bloodType: "B+",
    cmvStatus: "Neg",
    tier: "Limited",
    vialsAvailable: 20,
    ethnicity: "Hispanic",
    education: "Bachelors in Business",
    hairColor: "Dark Brown",
    eyeColor: "Brown",
    height: "5'9\"",
    weight: "165 lbs",
    medicalHistory:
      "No medical history of note. Childhood vaccinations up to date. No hospitalizations.",
    geneticScreening:
      "Basic carrier screening completed — no carriers detected for tested conditions.",
    personalityNotes:
      "Outgoing and social. Enjoys soccer and community volunteering.",
    active: true,
  },
  {
    id: "LN-D592",
    age: 29,
    bloodType: "AB+",
    cmvStatus: "Neg",
    tier: "Full Profile",
    vialsAvailable: 6,
    ethnicity: "African American",
    education: "JD - Law Degree",
    hairColor: "Black",
    eyeColor: "Dark Brown",
    height: "6'3\"",
    weight: "200 lbs",
    medicalHistory:
      "No significant findings. Family history includes controlled hypertension in paternal grandfather (age 72). All other family history unremarkable.",
    geneticScreening:
      "Full panel completed — negative for sickle cell trait, cystic fibrosis, and 280 additional conditions tested.",
    personalityNotes:
      "Articulate and driven. Enjoys debate, swimming, and mentoring youth programs.",
    active: true,
  },
  {
    id: "LN-E831",
    age: 26,
    bloodType: "O-",
    cmvStatus: "Neg",
    tier: "Standard",
    vialsAvailable: 15,
    ethnicity: "Caucasian",
    education: "Masters in Education",
    hairColor: "Blonde",
    eyeColor: "Green",
    height: "5'11\"",
    weight: "175 lbs",
    medicalHistory:
      "Appendectomy at age 12, no complications. No chronic conditions. Family medical history clear.",
    geneticScreening:
      "Expanded carrier screening — negative for all 283 conditions tested.",
    personalityNotes:
      "Creative and patient. Enjoys painting, woodworking, and coaching little league.",
    active: true,
  },
  {
    id: "LN-F276",
    age: 30,
    bloodType: "A+",
    cmvStatus: "Pos",
    tier: "Full Profile",
    vialsAvailable: 10,
    ethnicity: "Mixed - Caucasian/Asian",
    education: "Masters in Computer Science",
    hairColor: "Dark Brown",
    eyeColor: "Hazel",
    height: "5'10\"",
    weight: "168 lbs",
    medicalHistory:
      "No significant medical history. Wears corrective lenses (-2.0 prescription). Family history unremarkable.",
    geneticScreening:
      "Full panel completed — carrier for one benign recessive trait. Negative for all clinical conditions.",
    personalityNotes:
      "Analytical and curious. Enjoys coding side projects, cycling, and cooking international cuisine.",
    active: true,
  },
  {
    id: "LN-G419",
    age: 28,
    bloodType: "B-",
    cmvStatus: "Neg",
    tier: "Limited",
    vialsAvailable: 18,
    ethnicity: "South Asian",
    education: "Bachelors in Biology",
    hairColor: "Black",
    eyeColor: "Brown",
    height: "5'8\"",
    weight: "155 lbs",
    medicalHistory:
      "No medical conditions. All standard lab work within normal ranges. No family history of genetic conditions.",
    geneticScreening:
      "Basic panel completed — negative for all conditions tested including thalassemia trait.",
    personalityNotes:
      "Studious and compassionate. Volunteers at animal shelters and enjoys photography.",
    active: true,
  },
  {
    id: "LN-H053",
    age: 31,
    bloodType: "O+",
    cmvStatus: "Pos",
    tier: "Standard",
    vialsAvailable: 9,
    ethnicity: "Caucasian",
    education: "Bachelors in Kinesiology",
    hairColor: "Red",
    eyeColor: "Blue",
    height: "6'0\"",
    weight: "190 lbs",
    medicalHistory:
      "No chronic conditions. Minor sports-related knee strain (fully resolved). Family history clear of major hereditary conditions.",
    geneticScreening:
      "Expanded panel completed — negative for all 275 conditions tested.",
    personalityNotes:
      "Energetic and personable. Former collegiate athlete. Enjoys coaching, outdoor activities, and travel.",
    active: true,
  },
];

export async function seedDatabase() {
  try {
    const existingDonors = await db
      .select({ count: sql<number>`count(*)` })
      .from(donors);
    const donorCount = Number(existingDonors[0].count);

    if (donorCount === 0) {
      console.log("Seeding database with initial donor data...");
      await db.insert(donors).values(seedDonors);
      console.log(`Seeded ${seedDonors.length} donors.`);
    }

    const existingAdmin = await db
      .select({ count: sql<number>`count(*)` })
      .from(users);
    const userCount = Number(existingAdmin[0].count);

    if (userCount === 0) {
      console.log("Seeding admin account...");
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await db.insert(users).values({
        username: "admin",
        password: hashedPassword,
        role: "admin",
        institutionName: "Lineage by Legacy",
        contactEmail: "admin@givelegacy.com",
        verified: true,
      });
      console.log(
        "Admin account created (username: admin, password: admin123).",
      );
    }
  } catch (error) {
    console.error("Database seeding error:", error);
  }
}
