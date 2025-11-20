import { CourseCategoryModel } from "../models/courseCategory.model";
import { CourseCategory, NewCourseCategory } from "../config/schema";

export class CourseCategoryService {
  static async getAll(): Promise<CourseCategory[]> {
    return CourseCategoryModel.getAll();
  }

  static async create(data: NewCourseCategory): Promise<CourseCategory> {
    return CourseCategoryModel.create(data);
  }

  static async update(id: number, data: Partial<NewCourseCategory>): Promise<CourseCategory> {
    const updated = await CourseCategoryModel.update(id, data);
    if (!updated) throw { status: 404, message: "CourseCategory not found" };
    return updated;
  }

  static async delete(id: number): Promise<void> {
    const deleted = await CourseCategoryModel.delete(id);
    if (!deleted) throw { status: 404, message: "CourseCategory not found" };
  }
}
