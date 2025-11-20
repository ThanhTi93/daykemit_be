import { CourseModel } from "../models/course.model";
import { courseCategories, type Course, type NewCourse, type CourseWithCategoryIds } from "../config/schema";
import { db } from "../config/db";
import { eq } from "drizzle-orm";

export class CourseService {
  static async getAll(): Promise<CourseWithCategoryIds[]> {
    return CourseModel.getAll(); // ✅ Đã có categoryIds
  }
  static async getById(id: number): Promise<Course> {
    const course = await CourseModel.getById(id);
    if (!course) throw { status: 404, message: "Course not found" };
    return course;
  }

static async create(data: CourseWithCategoryIds): Promise<CourseWithCategoryIds> {
  const { categoryIds, ...courseData } = data;

  // Step 1: Insert course
  const course = await CourseModel.create(courseData);

  // Step 2: Insert course_categories (không trong transaction)
  const categoryLinks = categoryIds.map((categoryId) => ({
    courseId: course.id,
    categoryId,
  }));
  
  await db.insert(courseCategories).values(categoryLinks);

  // Step 3: Return merged
  return {
    ...course,
    categoryIds,
  };
}
static async update(id: number,
  data: Partial<CourseWithCategoryIds>
): Promise<CourseWithCategoryIds> {
  const { categoryIds, ...courseData } = data;

  if (!id) {
    throw new Error("Course ID is required for update");
  }

    // Step 1: Insert course
  const course = await CourseModel.update(courseData);
  if (!course) {
    throw new Error(`Course with id ${courseData.id} not found.`);
  }

  // Step 2: Update categories (không trong transaction)
  if (categoryIds) {
    await db.delete(courseCategories).where(eq(courseCategories.courseId,id));

    const categoryLinks = categoryIds.map((categoryId) => ({
      courseId: courseData.id!,
      categoryId,
    }));

    await db.insert(courseCategories).values(categoryLinks);
  }

  return {
    ...course,
    categoryIds: categoryIds ?? [],
  };
}

  static async delete(id: number): Promise<void> {
    const deleted = await CourseModel.delete(id);
    if (!deleted) throw { status: 404, message: "Course not found" };
  }
}
