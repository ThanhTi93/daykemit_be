import { pgTable, serial, text, varchar, integer, decimal, timestamp, boolean } from "drizzle-orm/pg-core";

// ================== Categories ==================
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export type Category = typeof categories.$inferSelect;   // type khi SELECT
export type NewCategory = typeof categories.$inferInsert; // type khi INSERT

// ================== Courses ==================
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  imgUrl: text("imgUrl"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  deleted_at: timestamp("deleted_at"),
});

export type Course = typeof courses.$inferSelect;   // type khi SELECT
export type CourseWithCategoryIds = Course & { categoryIds: number[] };
export type NewCourse = typeof courses.$inferInsert; // type khi INSERT

// ================== Course_Categories ==================
export const courseCategories = pgTable("course_categories", {
  id: serial("id").primaryKey(),
  categoryId: integer("id_category").references(() => categories.id).notNull(),
  courseId: integer("id_course").references(() => courses.id).notNull(),
});

export type CourseCategory = typeof courseCategories.$inferSelect;
export type NewCourseCategory = typeof courseCategories.$inferInsert;

// ================== Accounts ==================
export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  imgUrl: text("imgUrl"),
  phone: varchar("phone", { length: 20 }),
  role: varchar("role", { length: 50 }).notNull(), // admin | mentor | student
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export type Account = typeof accounts.$inferSelect;   // type khi SELECT
export type NewAccount = typeof accounts.$inferInsert; // type khi INSERT
// ================== Mentors ==================
export const mentors = pgTable("mentors", {
  id: serial("id").primaryKey(),
  description: text("description"),
  expertise: text("expertise"),
  experienceYears: integer("experience_years"),
  socialLinks: text("social_links"),
  accountId: integer("id_account").references(() => accounts.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Mentor = typeof mentors.$inferSelect;   // type khi SELECT
export type NewMentor = typeof mentors.$inferInsert; // type khi INSERT

// ================== Course_Offers ==================
export const courseOffers = pgTable("course_offers", {
  id: serial("id").primaryKey(),
  courseId: integer("id_course").references(() => courses.id).notNull(),
  mentorId: integer("id_mentor").references(() => mentors.id).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  discount: decimal("discount", { precision: 5, scale: 2 }).default("0.00"),
  description: text("description"),
  status: varchar("status", { length: 20 }).default("active"), // active | inactive
  capacity: integer("capacity"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

// ================== Enrollments ==================
export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  offerId: integer("id_offer").references(() => courseOffers.id).notNull(),
  studentId: integer("id_student").references(() => accounts.id).notNull(),
  status: varchar("status", { length: 50 }).default("pending"), // pending | active | cancelled
  paymentStatus: varchar("payment_status", { length: 50 }).default("unpaid"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

// ================== Payments ==================
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  enrollmentId: integer("id_enrollment").references(() => enrollments.id).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  method: varchar("method", { length: 50 }).notNull(), // e.g. momo, vnpay, paypal
  status: varchar("status", { length: 50 }).default("pending"),
  transactionCode: varchar("transaction_code", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ================== Reviews ==================
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  enrollmentId: integer("id_enrollment").references(() => enrollments.id).notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

// ================== Testimonials ==================
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  accountId: integer("id_account").references(() => accounts.id).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


// ================== Lessons ==================
// Các bài học chi tiết trong một khóa học
// export const lessons = pgTable("lessons", {
//   id: serial("id").primaryKey(),
//   courseId: integer("id_course").references(() => courses.id).notNull(),
//   title: varchar("title", { length: 255 }).notNull(),
//   content: text("content"),
//   videoUrl: text("video_url"),
//   order: integer("order"), // thứ tự trong khóa học
//   createdAt: timestamp("created_at").defaultNow(),
//   updatedAt: timestamp("updated_at").defaultNow(),
// });

// ================== Assignments ==================
// Bài tập/đề bài cho học viên
// export const assignments = pgTable("assignments", {
//   id: serial("id").primaryKey(),
//   lessonId: integer("id_lesson").references(() => lessons.id).notNull(),
//   title: varchar("title", { length: 255 }).notNull(),
//   description: text("description"),
//   dueDate: timestamp("due_date"),
//   createdAt: timestamp("created_at").defaultNow(),
//   updatedAt: timestamp("updated_at").defaultNow(),
// });

// ================== Submissions ==================
// Học viên nộp bài tập
// export const submissions = pgTable("submissions", {
//   id: serial("id").primaryKey(),
//   assignmentId: integer("id_assignment").references(() => assignments.id).notNull(),
//   studentId: integer("id_student").references(() => accounts.id).notNull(),
//   fileUrl: text("file_url"),
//   grade: decimal("grade", { precision: 5, scale: 2 }),
//   feedback: text("feedback"),
//   submittedAt: timestamp("submitted_at").defaultNow(),
//   updatedAt: timestamp("updated_at").defaultNow(),
// });

// ================== Certificates ==================
// Chứng chỉ học viên nhận được
// export const certificates = pgTable("certificates", {
//   id: serial("id").primaryKey(),
//   enrollmentId: integer("id_enrollment").references(() => enrollments.id).notNull(),
//   issuedAt: timestamp("issued_at").defaultNow(),
//   certificateUrl: text("certificate_url"),
// });

// ================== Messages ==================
// Tin nhắn trao đổi giữa mentor và student
// export const messages = pgTable("messages", {
//   id: serial("id").primaryKey(),
//   senderId: integer("id_sender").references(() => accounts.id).notNull(),
//   receiverId: integer("id_receiver").references(() => accounts.id).notNull(),
//   content: text("content").notNull(),
//   isRead: boolean("is_read").default(false),
//   createdAt: timestamp("created_at").defaultNow(),
// });

// ================== Notifications ==================
// Thông báo hệ thống
// export const notifications = pgTable("notifications", {
//   id: serial("id").primaryKey(),
//   accountId: integer("id_account").references(() => accounts.id).notNull(),
//   title: varchar("title", { length: 255 }).notNull(),
//   message: text("message"),
//   isRead: boolean("is_read").default(false),
//   createdAt: timestamp("created_at").defaultNow(),
// });

// ================== Favorites ==================
// Học viên lưu khóa học yêu thích
// export const favorites = pgTable("favorites", {
//   id: serial("id").primaryKey(),
//   studentId: integer("id_student").references(() => accounts.id).notNull(),
//   courseId: integer("id_course").references(() => courses.id).notNull(),
//   createdAt: timestamp("created_at").defaultNow(),
// });

// ================== Blogs ==================
// Bài viết chia sẻ từ admin/mentor
// export const blogs = pgTable("blogs", {
//   id: serial("id").primaryKey(),
//   authorId: integer("id_author").references(() => accounts.id).notNull(),
//   title: varchar("title", { length: 255 }).notNull(),
//   content: text("content").notNull(),
//   imgUrl: text("img_url"),
//   createdAt: timestamp("created_at").defaultNow(),
//   updatedAt: timestamp("updated_at").defaultNow(),
//   deletedAt: timestamp("deleted_at"),
// });

// ================== Blog_Comments ==================
// export const blogComments = pgTable("blog_comments", {
//   id: serial("id").primaryKey(),
//   blogId: integer("id_blog").references(() => blogs.id).notNull(),
//   accountId: integer("id_account").references(() => accounts.id).notNull(),
//   content: text("content").notNull(),
//   createdAt: timestamp("created_at").defaultNow(),
// });
