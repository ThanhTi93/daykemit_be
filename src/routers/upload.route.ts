import { Router } from "express";
import { UploadController } from "../controllers/upload.controller";
import { uploadImageMiddleware } from "../config/multer";

const router = Router();

// POST /api/upload/image
router.post(
  "/image",
  uploadImageMiddleware.single("image"),
  UploadController.uploadImage
);

export default router;
