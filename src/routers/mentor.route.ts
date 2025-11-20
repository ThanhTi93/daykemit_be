import { Router } from "express";
import { MentorController } from "../controllers/mentor.controller";

const router = Router();

router.get("/", MentorController.getAll);
router.get("/:id", MentorController.getById);
router.post("/", MentorController.create);
router.put("/:id", MentorController.update);
router.delete("/:id", MentorController.delete);

export default router;
