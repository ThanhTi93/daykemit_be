import { Router } from "express";
import { CourseImageController } from "../controllers/course_image.controller";

const router = Router();
const controller = new CourseImageController();

// 👉 Lấy tất cả ảnh
router.get("/", controller.getAll.bind(controller));

// 👉 Lấy 1 ảnh
router.get("/:id", controller.getOne.bind(controller));

// 👉 Tạo ảnh
router.post(
  "/",controller.create.bind(controller));

// 👉 Update ảnh
router.put("/:id", controller.update.bind(controller));

// 👉 Xóa ảnh
router.delete("/:id", controller.delete.bind(controller));

export default router;
