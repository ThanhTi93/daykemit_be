import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Course } from "./course.entity";

@Entity("course_images")
export class CourseImage {
  // 👉 id tự tăng
  @PrimaryGeneratedColumn()
  id: number;

  // 👉 url ảnh
  @Column({ type: "text", nullable: false })
  imgUrl: string;

  // 👉 publicId từ Cloudinary
  @Column({ type: "varchar", length: 255, unique: true })
  publicId: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  // 👉 N ảnh thuộc về 1 course
  @ManyToOne(() => Course, (course) => course.images, {
    onDelete: "CASCADE",
  })
  
  @JoinColumn({ name: "course_id" })
  course: Course;
}