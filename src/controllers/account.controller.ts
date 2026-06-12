import { Request, Response } from "express";
import { AccountService } from "../services/account.service";

const accountService = new AccountService();

export class AccountController {
  async getAll(req: Request, res: Response) {
    try {
      const accounts = await accountService.findAll();
      return res.json(accounts);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const account = await accountService.findOne(id);
      return res.json(account);
    } catch (err: any) {
      return res.status(404).json({ message: err.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const account = await accountService.create(req.body);
      return res.status(201).json(account);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const file = req.file;
      console.log(req.body);

      const account = await accountService.update(id, req.body, file); // ✅ fix
      return res.json(account);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async me(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const accessToken = authHeader.split(" ")[1];

      const user = await accountService.me(accessToken);

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(401).json({
        message: error.message || "Invalid token",
      });
    }
  }

  async softDelete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const updated = await accountService.softDelete(id);
      return res.json({ message: "Account soft deleted", data: updated });
    } catch (err: any) {
      return res.status(404).json({ message: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { accessToken, refreshToken, user } =
        await accountService.login(req.body);
      // 👉 lưu refresh token vào cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // 🔥
        sameSite: "lax", // 🔥 tránh lỗi cross-site khi dev
      });

      return res.json({ accessToken, user });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async logout(req: Request, res: Response) {
    try {
       console.log("vao day");
       
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      });

      return res.status(200).json({
        message: "Logout successful",
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Logout failed",
      });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const token = req.cookies.refreshToken;

      const data = await accountService.refresh(token);

      return res.json(data);
    } catch {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }

}