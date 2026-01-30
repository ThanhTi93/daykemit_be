export interface UploadImageResult {
  url: string;
  publicId: string;
}

export class UploadService {
  static uploadSingleImage(
    file?: Express.Multer.File
  ): UploadImageResult {
    if (!file) {
      throw new Error("File not found");
    }

    return {
      url: file.path,         // Cloudinary secure_url
      publicId: file.filename // public_id
    };
  }
}
