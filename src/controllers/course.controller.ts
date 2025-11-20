import { Request, Response, NextFunction } from "express";
import { CourseService } from "../services/course.service";

export class CourseController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CourseService.getAll();
      res.json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CourseService.getById(Number(req.params.id));
      res.json(data);
    } catch (err) {
      next(err);
    }
  }

static async create(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await CourseService.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      
      const data = await CourseService.update(Number(req.params.id),req.body);
      res.json(data);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await CourseService.delete(Number(req.params.id));
      res.json({ message: "Course deleted" });
    } catch (err) {
      next(err);
    }
  }
}
