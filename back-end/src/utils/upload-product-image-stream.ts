import { UploadApiResponse } from "cloudinary";
import { cloudinary } from "../lib/cloudinary";
import streamifier from "streamifier";

export const uploadProductImageStream = (
  buffer: Buffer,
  fileName: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "products-images",
        public_id: fileName.split(".")[0],
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result as UploadApiResponse);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};
