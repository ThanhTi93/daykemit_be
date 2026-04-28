import { AppDataSource } from "../config/data-source";
import { Course } from "../entities/course.entity";
import { Category } from "../entities/category.entity";
import { CourseImage } from "../entities/course_images.entity";
import { In } from "typeorm";
import { UploadService } from "./upload.service";


export class CourseService {
  private courseRepo = AppDataSource.getRepository(Course);
  private categoryRepo = AppDataSource.getRepository(Category);
  private imageRepo = AppDataSource.getRepository(CourseImage);

  async findAll() {
    return this.courseRepo.find({ relations: ["categories", "images"], order: { id: "DESC" } });
  }

  // ✅ GET BY ID
  async getCourseById(id: number) {
    const course = await this.courseRepo.findOne({
      where: { id },
      relations: ["categories", "images"],
    });

    if (!course) throw new Error("Course not found");

    return course;
  }

  // ✅ CREATE COURSE + IMAGES
  async createCourse(
    data: any,
    files: Express.Multer.File[]
  ) {
    const { name, description, categoryIds } = data;

    // 👉 parse categoryIds
    const ids = Array.isArray(categoryIds)
      ? categoryIds.map(Number)
      : categoryIds?.split(",").map(Number);

    const categories = await this.categoryRepo.find({
      where: { id: In(ids || []) },
    });

    // 👉 tạo course
    const course = this.courseRepo.create({
      name,
      description,
      categories,
    });

    const savedCourse = await this.courseRepo.save(course);

    // 👉 upload ảnh
    const uploads = await UploadService.uploadMultiple(files);

    // 👉 lưu ảnh vào DB
    const images = uploads.map((item) =>
      this.imageRepo.create({
        imgUrl: item.url,
        publicId: item.publicId,
        course: savedCourse,
      })
    );

    await this.imageRepo.save(images);

    return await this.getCourseById(savedCourse.id);
  }

  async updateCourse(
    id: number,
    data: any,
    files?: Express.Multer.File[]
  ) {
    const course = await this.courseRepo.findOne({
      where: { id },
      relations: ["categories", "images"],
    });

    if (!course) throw new Error("Course not found");

    const { name, description, categoryIds } = data;

    // 👉 update basic info
    if (name) course.name = name;
    if (description) course.description = description;

    // 👉 update categories
    if (categoryIds) {
      const ids = Array.isArray(categoryIds)
        ? categoryIds.map(Number)
        : categoryIds.split(",").map(Number);

      const categories = await this.categoryRepo.find({
        where: { id: In(ids) },
      });
    }
    const savedCourse = await this.courseRepo.save(course);
    // 👉 nếu có upload ảnh mới
    if (files && files.length > 0) {
      // ❌ xóa ảnh cũ trên cloud (song song + safe)
      await Promise.all(
        course.images.map((img) =>
          UploadService.deleteImage(img.publicId).catch(() => null)
        )
      );

      // ❌ xóa DB ảnh cũ
      await this.imageRepo.remove(course.images);
      console.log(files);

      // ✅ upload ảnh mới
      const uploads = await UploadService.uploadMultiple(files);
      console.log(uploads);

      const newImages = uploads.map((item) =>
        this.imageRepo.create({
          imgUrl: item.url,
          publicId: item.publicId,
          course: savedCourse,
        })
      );

      await this.imageRepo.save(newImages);
    }

    return await this.getCourseById(id);
  }

  async deleteCourse(id: number) {
    const course = await this.courseRepo.findOne({
      where: { id },
      relations: ["images"],
    });

    if (!course) throw new Error("Course not found");

    // ❌ xóa ảnh trên cloud (song song)
    await Promise.all(
      course.images.map((img) =>
        UploadService.deleteImage(img.publicId)
      )
    );

    // ❌ xóa ảnh trong DB
    await this.imageRepo.remove(course.images);

    // ❌ xóa course
    await this.courseRepo.remove(course);

    return { message: "Deleted successfully" };
  }

}
