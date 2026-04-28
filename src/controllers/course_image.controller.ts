import { Request, Response } from "express";
import { CourseImageService } from "../services/course_image.service";

const service = new CourseImageService();

export class CourseImageController {
  // 👉 Lấy tất cả ảnh
  async getAll(req: Request, res: Response) {
    const data = await service.findAll();
    return res.json(data);
  }

  // 👉 Lấy 1 ảnh
  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await service.findOne(id);
    return res.json(data);
  }

  // 👉 Tạo ảnh mới
  async create(req: Request, res: Response) {
    const data = await service.create(req.body);
    return res.status(201).json(data);
  }

  // 👉 Update ảnh
  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await service.update(id, req.body);
    return res.json(data);
  }

  // 👉 Xóa ảnh
  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await service.delete(id);
    return res.json(data);
  }
}

