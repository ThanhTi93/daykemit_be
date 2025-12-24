import { Request, Response } from "express";
import { AccountService } from "../services/account.service";

export const AccountController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const accounts = await AccountService.findAll();
      res.json(accounts);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  getOne: async (req: Request, res: Response) => {
    try {
      const account = await AccountService.findOne(Number(req.params.id));
      res.json(account);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const account = await AccountService.create(req.body);
      res.status(201).json(account);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      
      const account = await AccountService.create(req.body);
      res.json(account);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  softDelete: async (req: Request, res: Response) => {
    try {
      const updated = await AccountService.softDelete(Number(req.params.id));
      res.json({ message: "Account soft deleted", data: updated });
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  },

  hardDelete: async (req: Request, res: Response) => {
    try {
      await AccountService.hardDelete(Number(req.params.id));
      res.json({ message: "Account hard deleted" });
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  },
};
