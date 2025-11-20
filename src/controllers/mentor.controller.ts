import { Request, Response, NextFunction } from "express";
import { MentorService } from "../services/mentor.service";

export class MentorController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await MentorService.getAll();
      res.json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await MentorService.getById(Number(req.params.id));
      res.json(data);
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await MentorService.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await MentorService.update(Number(req.params.id), req.body);
      res.json(data);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await MentorService.delete(Number(req.params.id));
      res.json({ message: "Mentor deleted" });
    } catch (err) {
      next(err);
    }
  }
}
