import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/categories.service";

export class CategoryController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getAll();
      res.json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newCategory = await CategoryService.create(req.body);
      res.status(201).json(newCategory);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await CategoryService.update(Number(req.params.id), req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await CategoryService.delete(Number(req.params.id));
      res.json({ message: "Category deleted" });
    } catch (err) {
      next(err);
    }
  }
}
