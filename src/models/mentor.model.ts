import { db } from "../config/db";
import { mentors, type Mentor, type NewMentor } from "../config/schema";
import { eq } from "drizzle-orm";

export class MentorModel {
  static async getAll(): Promise<Mentor[]> {
    return db.select().from(mentors);
  }

  static async getById(id: number): Promise<Mentor | null> {
    const [row] = await db.select().from(mentors).where(eq(mentors.id, id));
    return row ?? null;
  }

  static async create(data: NewMentor): Promise<Mentor> {
    const [newRow] = await db.insert(mentors).values(data).returning();
    return newRow;
  }

  static async update(id: number, data: Partial<NewMentor>): Promise<Mentor | null> {
    const [updated] = await db
      .update(mentors)
      .set(data)
      .where(eq(mentors.id, id))
      .returning();
    return updated ?? null;
  }

  static async delete(id: number): Promise<boolean> {
    const [deleted] = await db.delete(mentors).where(eq(mentors.id, id)).returning();
    return !!deleted;
  }
}
