import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Account } from "./account.entity";
import { Category } from "./category.entity";

@Entity("mentors")
export class Mentor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "int", default: 0 })
  experienceYears: number;

  @Column({ type: "text", nullable: true })
  socialLinks?: string;

  @Column({ type: "text", nullable: true })
  cvUrl?: string;

  @Column({ type: "varchar", length: 20, default: "pending" })
  approvalStatus: string;
  // pending | approved | rejected

  @Column({ type: "text", nullable: true })
  rejectReason?: string;

  @Column({ type: "boolean", default: true })
  status: boolean;

  @OneToOne(() => Account)
  @JoinColumn({ name: "account_id" })
  account: Account;

  @Column({ name: "account_id" })
  accountId: number;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
  })
  updatedAt: Date;

   // ⭐ Many-to-Many với Category
  @ManyToMany(() => Category, (category) => category.mentors, {
    cascade: true, // tự insert category mới nếu cần
  })

  @JoinTable() // bảng trung gian tự tạo: mentor_categories_category
  categories: Category[];
}