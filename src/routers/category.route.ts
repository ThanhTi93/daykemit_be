import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { validateDTO } from "../middlewares/validate.middleware";
import { CategoryDto } from "../dtos/category.dto";


const router = Router();
const controller = new CategoryController();

router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getOne.bind(controller));
router.post("/", validateDTO(CategoryDto), controller.create.bind(controller));
router.put("/:id", validateDTO(CategoryDto), controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;
