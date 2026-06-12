import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Category } from "../entities/category.entity";
import { Course } from "../entities/course.entity";
import { Account } from "../entities/account.entity";
import { CourseImage } from "../entities/course_images.entity";
import { Mentor } from "../entities/mentor.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true, // PRODUCTION => false, dùng migration
  logging: false,
  entities: [Category, Course, Account,CourseImage, Mentor],
});
