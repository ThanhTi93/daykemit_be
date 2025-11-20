import { db } from "../config/db";
import { courseCategories, CourseCategory, NewCourseCategory } from "../config/schema";
import { eq } from "drizzle-orm";

export class CourseCategoryModel {
  static async getAll(): Promise<CourseCategory[]> {
    return db.select().from(courseCategories);
  }

  static async create(data: NewCourseCategory): Promise<CourseCategory> {
    const [newItem] = await db.insert(courseCategories).values(data).returning();
    return newItem;
  }

  static async update(id: number, data: Partial<NewCourseCategory>): Promise<CourseCategory | null> {
    const [updated] = await db
      .update(courseCategories)
      .set(data)
      .where(eq(courseCategories.id, id))
      .returning();
    return updated ?? null;
  }

  static async delete(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(courseCategories)
      .where(eq(courseCategories.id, id))
      .returning();
    return !!deleted;
  }
}
