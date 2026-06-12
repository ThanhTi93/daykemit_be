import { Router } from "express";
import multer from "multer";

import { MentorController } from "../controllers/mentor.controller";
import { validateDTO } from "../middlewares/validate.middleware";
import { MentorDto } from "../dtos/mentor.dto";

const router = Router();

const controller = new MentorController();

const upload = multer({
  storage: multer.memoryStorage(),
});

// GET ALL
router.get(
  "/",
  controller.getAll.bind(controller)
);

// GET BY ID
router.get(
  "/:id",
  controller.getById.bind(controller)
);

// CREATE
router.post(
  "/",
  upload.single("cv"),
  validateDTO(MentorDto),
  controller.create.bind(controller)
);

// UPDATE
router.patch(
  "/:id",
  upload.single("cv"),
  validateDTO(MentorDto),
  controller.update.bind(controller)
);

// DELETE
router.delete(
  "/:id",
  controller.delete.bind(controller)
);

export default router;