import { CategoryModel } from "../models/category.model";
import { Category, NewCategory } from "../config/schema";

export class CategoryService {
  static async getAll(): Promise<Category[]> {
    return CategoryModel.getAll();
  }

  static async create(data: NewCategory): Promise<Category> {
    return CategoryModel.create(data);
  }

  static async update(id: number, data: Partial<NewCategory>): Promise<Category> {
    const updated = await CategoryModel.update(id, data);
    if (!updated) throw { status: 404, message: "Category not found" };
    return updated;
  }

  static async delete(id: number): Promise<void> {
    const deleted = await CategoryModel.delete(id);
    if (!deleted) throw { status: 404, message: "Category not found" };
  }
}
