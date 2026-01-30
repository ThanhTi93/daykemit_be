import { Request, Response } from "express";
import { UploadService } from "../services/upload.service";

export class UploadController {
  static uploadImage(req: Request, res: Response) {
    try {
      const result = UploadService.uploadSingleImage(req.file);

      return res.status(200).json({
        message: "Upload image successfully",
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Upload failed",
      });
    }
  }
}
