import { Request, Response } from "express";
import { MentorService } from "../services/mentor.service";

const mentorService = new MentorService();

export class MentorController {

  // GET ALL
  async getAll(req: Request, res: Response) {
    try {
      const data = await mentorService.findAll();

      res.json(data);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  // GET BY ID
  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const mentor =
        await mentorService.findById(id);

      res.json(mentor);
    } catch (error: any) {
      res.status(404).json({
        message: error.message,
      });
    }
  }

  // CREATE
  async create(req: Request, res: Response) {
    try {
      const file = req.file;

      const mentor =
        await mentorService.createMentor(
          req.body,
          file
        );

      res.status(201).json(mentor);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  // UPDATE
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const file = req.file;

      const mentor =
        await mentorService.updateMentor(
          id,
          req.body,
          file
        );

      res.json(mentor);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  // APPROVE
  async approve(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const mentor =
        await mentorService.approveMentor(id);

      res.json(mentor);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  // REJECT
  async reject(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const mentor =
        await mentorService.rejectMentor(
          id,
          req.body.reason
        );

      res.json(mentor);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  // DELETE
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const result =
        await mentorService.deleteMentor(id);

      res.json(result);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}