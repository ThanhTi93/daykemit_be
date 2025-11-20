import { Request, Response, NextFunction } from "express";
import { AccountService } from "../services/account.service";

export class AccountController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AccountService.getAll();
      res.json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AccountService.getById(Number(req.params.id));
      res.json(data);
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AccountService.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AccountService.update(Number(req.params.id), req.body);
      res.json(data);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await AccountService.delete(Number(req.params.id));
      res.json({ message: "Account deleted" });
    } catch (err) {
      next(err);
    }
  }
}
