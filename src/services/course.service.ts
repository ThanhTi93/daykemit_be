import { AppDataSource } from "../config/data-source";
import { Course } from "../entities/course.entity";
import { Category } from "../entities/category.entity";
import { CourseDto } from "../dtos/course.dto";
import cloudinary from "../config/cloudinary";


export class CourseService {
  private repo = AppDataSource.getRepository(Course);
  private categoryRepo = AppDataSource.getRepository(Category);

  async findAll() {
    return this.repo.find({ relations: ["categories"], order: { id: "DESC" } });
  }

  async findOne(id: number) {
    const course = await this.repo.findOne({
      where: { id },
      relations: ["categories"],
    });
    if (!course) throw new Error("Course not found");
    return course;
  }

async create(payload: CourseDto, file?: Express.Multer.File) {
  // 🔹 Parse categoryIds từ JSON string (FE gửi FormData)
  let categoryIds: number[] = [];
  if (payload.categoryIds) {
    if (typeof payload.categoryIds === "string") {
      try {
        categoryIds = JSON.parse(payload.categoryIds);
      } catch {
        categoryIds = [];
      }
    } else if (Array.isArray(payload.categoryIds)) {
      categoryIds = payload.categoryIds;
    }
  }
  // 🔹 Lấy danh sách category từ DB
  let categories: Category[] = [];
  if (categoryIds.length) {
    categories = await this.categoryRepo.findByIds(categoryIds);
  }

  // 🔹 Upload file nếu có
  let imgUrl: string | undefined;
  if (file) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "courses",
    });
    imgUrl = result.secure_url;
  }

  // 🔹 Tạo entity
  const course = this.repo.create({
    name: payload.name,
    description: payload.description,
    imgUrl,
    status: true,
    categories,
  });

  return this.repo.save(course);
}


  async update(id: number, payload: CourseDto) {
    const course = await this.repo.findOne({ where: { id }, relations: ["categories"] });
    if (!course) throw new Error("Course not found");

    // if (payload.categoryIds) {
    //   const categories = await this.categoryRepo.findByIds(payload.categoryIds);
    //   course.categories = categories;
    // }
    const { categoryIds, ...rest } = payload;
    Object.assign(course, rest);
    return this.repo.save(course);
  }

  async delete(id: number) {
    const course = await this.repo.findOne({ where: { id } });
    if (!course) throw new Error("Course not found");
    await this.repo.remove(course);
    return { message: "Course deleted" };
  }
}
