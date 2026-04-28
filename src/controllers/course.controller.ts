import { Request, Response } from "express";
import { CourseService } from "../services/course.service";

const courseService = new CourseService();

export class CourseController {

  // ✅ GET ALL
  async getAll(req: Request, res: Response) {
    try {
      const data = await courseService.findAll();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // ✅ GET BY ID
  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const course = await courseService.getCourseById(id);

      res.json(course);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  // ✅ CREATE
  async create(req: Request, res: Response) {
    try {
      const files = req.files as Express.Multer.File[];

      const course = await courseService.createCourse(
        req.body,
        files
      );

      res.status(201).json(course);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // ✅ UPDATE
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const files = req.files as Express.Multer.File[];

      const course = await courseService.updateCourse(
        id,
        req.body,
        files
      );

      res.json(course);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // ✅ DELETE
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const result = await courseService.deleteCourse(id);

      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}