import { Request, Response } from "express";
import { CourseService } from "../services/course.service";

const service = new CourseService();

export class CourseController {
  async getAll(req: Request, res: Response) {
    const data = await service.findAll();
    res.json(data);
  }

  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await service.findOne(id);
    res.json(data);
  }

 async create(req: Request, res: Response) {
  try {
    const payload = req.body;
    const file = req.file;

    const data = await service.create(payload, file);

    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}


  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await service.update(id, req.body);
    res.json(data);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await service.delete(id);
    res.json(data);
  }
}
