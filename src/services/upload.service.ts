import cloudinary from "../config/cloudinary";

export interface UploadImageResult {
  url: string;
  publicId: string;
}

export class UploadService {
  // ✅ upload 1 ảnh (dùng buffer)
  static async uploadSingle(
    file: Express.Multer.File
  ): Promise<UploadImageResult> {
    if (!file || !file.buffer) {
      throw new Error("File not found");
    }

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "courses",
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error("Upload failed"));
          }

          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      );

      // 👉 đẩy buffer vào stream
      stream.end(file.buffer);
    });
  }

  // ✅ upload nhiều ảnh
  static async uploadMultiple(
    files: Express.Multer.File[]
  ): Promise<UploadImageResult[]> {
    if (!files || files.length === 0) return [];

    const validFiles = files.filter((f) => f && f.buffer);

    return Promise.all(validFiles.map((file) => this.uploadSingle(file)));
  }

  // ✅ xoá ảnh
  static async deleteImage(publicId: string) {
    if (!publicId) return;

    try {
      return await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error("Delete error:", error);
    }
  }
}