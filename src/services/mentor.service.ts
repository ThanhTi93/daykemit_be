import { AppDataSource } from "../config/data-source";
import { Mentor } from "../entities/mentor.entity";
import { Category } from "../entities/category.entity";
import { In } from "typeorm";
import { UploadService } from "./upload.service";

export class MentorService {
  private mentorRepo = AppDataSource.getRepository(Mentor);
  private categoryRepo = AppDataSource.getRepository(Category);

  // =========================
  // GET ALL
  // =========================

  async findAll() {
    return this.mentorRepo.find({
      relations: ["account", "categories"],
      order: {
        id: "DESC",
      },
    });
  }

  // =========================
  // GET BY ID
  // =========================

  async findById(id: number) {
    const mentor = await this.mentorRepo.findOne({
      where: { id },
      relations: ["account", "categories"],
    });

    if (!mentor) {
      throw new Error("Mentor not found");
    }

    return mentor;
  }

  // =========================
  // CREATE
  // =========================

  async createMentor(
    data: any,
    file?: Express.Multer.File
  ) {
    const {
      description,
      experienceYears,
      socialLinks,
      accountId,
      categoryIds,
    } = data;

    // categories
    const ids = Array.isArray(categoryIds)
      ? categoryIds.map(Number)
      : categoryIds?.split(",").map(Number);

    const categories = await this.categoryRepo.find({
      where: {
        id: In(ids || []),
      },
    });

    // upload cv
    let cvUrl = "";

    if (file) {
      const upload = await UploadService.uploadSingle(file);

      cvUrl = upload.url;
    }

    const mentor = this.mentorRepo.create({
      description,
      experienceYears,
      socialLinks,
      accountId: Number(accountId),
      cvUrl,
      categories,
    });

    return await this.mentorRepo.save(mentor);
  }

  // =========================
  // UPDATE
  // =========================

  async updateMentor(
    id: number,
    data: any,
    file?: Express.Multer.File
  ) {
    const mentor = await this.findById(id);

    const {
      description,
      experienceYears,
      socialLinks,
      categoryIds,
    } = data;

    if (description !== undefined) {
      mentor.description = description;
    }

    if (experienceYears !== undefined) {
      mentor.experienceYears = Number(
        experienceYears
      );
    }

    if (socialLinks !== undefined) {
      mentor.socialLinks = socialLinks;
    }

    // categories
    if (categoryIds) {
      const ids = Array.isArray(categoryIds)
        ? categoryIds.map(Number)
        : categoryIds.split(",").map(Number);

      const categories =
        await this.categoryRepo.find({
          where: {
            id: In(ids),
          },
        });

      mentor.categories = categories;
    }

    // update cv
    if (file) {
      // xóa cv cũ nếu có
      if (mentor.cvUrl) {
        try {
          const publicId =
            mentor.cvUrl.split("/").pop()?.split(".")[0];

          if (publicId) {
            await UploadService.deleteImage(
              `courses/${publicId}`
            );
          }
        } catch (error) {
          console.log(error);
        }
      }

      const upload =
        await UploadService.uploadSingle(file);

      mentor.cvUrl = upload.url;
    }

    return await this.mentorRepo.save(mentor);
  }

  // =========================
  // APPROVE
  // =========================

  async approveMentor(id: number) {
    const mentor = await this.findById(id);

    mentor.approvalStatus = "approved";
    mentor.rejectReason = "";

    return await this.mentorRepo.save(mentor);
  }

  // =========================
  // REJECT
  // =========================

  async rejectMentor(
    id: number,
    reason: string
  ) {
    const mentor = await this.findById(id);

    mentor.approvalStatus = "rejected";
    mentor.rejectReason = reason;

    return await this.mentorRepo.save(mentor);
  }

  // =========================
  // DELETE
  // =========================

  async deleteMentor(id: number) {
    const mentor = await this.findById(id);

    await this.mentorRepo.remove(mentor);

    return {
      message: "Deleted successfully",
    };
  }
}