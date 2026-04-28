import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Category } from "./category.entity";
import { CourseImage } from "./course_images.entity";

@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @Column({ type: "boolean", default: true })
  status: boolean;

  // ⭐ Many-to-Many với Category
  @ManyToMany(() => Category, (category) => category.courses, {
    cascade: true, // tự insert category mới nếu cần
  })
  @JoinTable() // bảng trung gian tự tạo: course_categories_category
  categories: Category[];

  @OneToMany(() => CourseImage, (image) => image.course)
 images: CourseImage[];
 
}
