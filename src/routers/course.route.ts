import { Router } from "express";
import { CourseController } from "../controllers/course.controller";
import { validateDTO } from "../middlewares/validate.middleware";
import { CourseDto } from "../dtos/course.dto";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(), // ❗ không lưu file nữa
});

const router = Router();
const controller = new CourseController();

// ✅ GET ALL
router.get("/", controller.getAll.bind(controller));

// ✅ GET BY ID
router.get("/:id", controller.getById.bind(controller));

// ✅ CREATE
router.post(
  "/",
  upload.array("images", 5),       // 1. upload file
  validateDTO(CourseDto),          // 2. validate body
  controller.create.bind(controller) // 3. xử lý
);

// ✅ UPDATE
router.put(
  "/:id",
  upload.array("images", 5),       // có thể update ảnh
  validateDTO(CourseDto),          // validate lại
  controller.update.bind(controller)
);

// ✅ DELETE
router.delete(
  "/:id",
  controller.delete.bind(controller)
);

export default router;