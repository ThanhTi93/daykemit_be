import { AppDataSource } from "../config/data-source";
import { CourseImage } from "../entities/course_images.entity";
import { Course } from "../entities/course.entity";

export class CourseImageService {
  private repo = AppDataSource.getRepository(CourseImage);
  private courseRepo = AppDataSource.getRepository(Course);

  // 👉 Lấy tất cả ảnh
  async findAll() {
    return this.repo.find({
      relations: ["course"],
      order: { id: "DESC" },
    });
  }

  // 👉 Lấy 1 ảnh theo id
  async findOne(id: number) {
    const image = await this.repo.findOne({
      where: { id },
      relations: ["course"],
    });

    if (!image) {
      throw new Error("Course image not found");
    }

    return image;
  }

  // 👉 Tạo ảnh mới
  async create(payload: {
    imgUrl: string;
    publicId: string;
    courseId: number;
  }) {
    const course = await this.courseRepo.findOne({
      where: { id: payload.courseId },
    });

    if (!course) {
      throw new Error("Course not found");
    }

    const image = this.repo.create({
      imgUrl: payload.imgUrl,
      publicId: payload.publicId,
      course,
    });

    return this.repo.save(image);
  }

  // 👉 Update ảnh
  async update(
    id: number,
    payload: {
      imgUrl?: string;
      publicId?: string;
    }
  ) {
    const image = await this.repo.findOne({ where: { id } });

    if (!image) {
      throw new Error("Course image not found");
    }

    Object.assign(image, payload);
    return this.repo.save(image);
  }

  // 👉 Xóa ảnh
  async delete(id: number) {
    const image = await this.repo.findOne({ where: { id } });

    if (!image) {
      throw new Error("Course image not found");
    }

    await this.repo.remove(image);
    return { message: "Course image deleted" };
  }
}