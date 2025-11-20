import { db } from "../config/db";
import { courses, type NewCourse, type Course, CourseWithCategoryIds } from "../config/schema";
import { eq, sql } from "drizzle-orm";
import { getAllCoursesWithCategoryIds } from "../queries/courses.sql";

export class CourseModel {
  static async getAll(): Promise<CourseWithCategoryIds[]> {
    const result = await db.execute<CourseWithCategoryIds>(getAllCoursesWithCategoryIds);

    return result.rows; // ✅ Đúng kiểu: CourseWithCategoryIds[]
  }

  static async getById(id: number): Promise<Course | null> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course ?? null;
  }

  static async create(data: NewCourse): Promise<Course> {
    const [newCourse] = await db.insert(courses).values(data).returning();
    return newCourse;
  }

  static async update(data: Partial<NewCourse>): Promise<Course | null> {
       const [updated] = await db
         .update(courses)
         .set({
           ...data,
           updated_at: new Date(), // ✅ luôn cập nhật lại thời gian hiện tại
         })
         .where(eq(courses.id, data.id!))
         .returning();
       return updated ?? null;
  }

  static async delete(id: number): Promise<boolean> {
    const [deleted] = await db.delete(courses).where(eq(courses.id, id)).returning();
    return !!deleted;
  }
}
