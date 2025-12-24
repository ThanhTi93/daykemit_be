import { Request, Response } from "express";
import { CategoryService } from "../services/categories.service";

const service = new CategoryService();

export class CategoryController {
  async getAll(req: Request, res: Response) {
    const data = await service.findAll();
    return res.json(data);
  }

  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await service.findOne(id);
    return res.json(data);
  }

  async create(req: Request, res: Response) {
    const data = await service.create(req.body);
    return res.status(201).json(data);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await service.update(id, req.body);
    return res.json(data);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await service.delete(id);
    return res.json(data);
  }
}
