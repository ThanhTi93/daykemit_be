import { Router } from "express";
import { CourseController } from "../controllers/course.controller";
import { validateDTO } from "../middlewares/validate.middleware";
import { CourseDto } from "../dtos/course.dto";
import { upload } from "../config/multer";

const router = Router();
const controller = new CourseController();

router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getOne.bind(controller));
router.post("/",upload.single("imgUrl") , validateDTO(CourseDto),  controller.create.bind(controller));
router.patch("/:id", validateDTO(CourseDto), controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;
