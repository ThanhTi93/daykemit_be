import { MentorModel } from "../models/mentor.model";
import { type Mentor, type NewMentor } from "../config/schema";

export class MentorService {
  static async getAll(): Promise<Mentor[]> {
    return MentorModel.getAll();
  }

  static async getById(id: number): Promise<Mentor> {
    const data = await MentorModel.getById(id);
    if (!data) throw { status: 404, message: "Mentor not found" };
    return data;
  }

  static async create(data: NewMentor): Promise<Mentor> {
    return MentorModel.create(data);
  }

  static async update(id: number, data: Partial<NewMentor>): Promise<Mentor> {
    const updated = await MentorModel.update(id, data);
    if (!updated) throw { status: 404, message: "Mentor not found" };
    return updated;
  }

  static async delete(id: number): Promise<void> {
    const deleted = await MentorModel.delete(id);
    if (!deleted) throw { status: 404, message: "Mentor not found" };
  }
}
