import { Request, Response, NextFunction } from "express";
import { CourseCategoryService } from "../services/courseCategories.service";

export class CourseCategoryController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await CourseCategoryService.getAll();
      res.json(items);
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newItem = await CourseCategoryService.create(req.body);
      res.status(201).json(newItem);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await CourseCategoryService.update(Number(req.params.id), req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await CourseCategoryService.delete(Number(req.params.id));
      res.json({ message: "CourseCategory deleted" });
    } catch (err) {
      next(err);
    }
  }
}
