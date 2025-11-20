import { db } from "../config/db";
import { categories, Category, NewCategory } from "../config/schema";
import { eq } from "drizzle-orm";

export class CategoryModel {
  static async getAll(): Promise<Category[]> {
    return db.select().from(categories);
  }

  static async create(data: NewCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(data).returning();
    return newCategory;
  }

  static async update(id: number, data: Partial<NewCategory>): Promise<Category | null> {
    const [updated] = await db
      .update(categories)
      .set({
        ...data,
        updatedAt: new Date(), // ✅ luôn cập nhật lại thời gian hiện tại
      })
      .where(eq(categories.id, id))
      .returning();
    return updated ?? null;
  }

  static async delete(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(categories)
      .where(eq(categories.id, id))
      .returning();
    return !!deleted;
  }
}
