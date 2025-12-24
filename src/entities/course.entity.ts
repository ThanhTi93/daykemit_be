import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./category.entity";

@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "text", nullable: true })
  imgUrl?: string;

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
}
