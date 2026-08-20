import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  folder: string = "kovai-safety-nets/gallery"
): Promise<{ secure_url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result: UploadApiResponse | undefined) => {
        if (error || !result) {
          return reject(error || new Error("Cloudinary upload failed"));
        }
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok" || result.result === "not found";
  } catch (error) {
    console.error("Cloudinary destroy error:", error);
    return false;
  }
}

/**
 * Transforms Cloudinary image URLs on the fly to use auto format (WebP/AVIF),
 * auto compression quality, and max dimensions to drastically improve loading speed.
 */
export function optimizeCloudinaryUrl(
  url: string | undefined | null,
  options: { width?: number; quality?: string; format?: string } = {}
): string {
  if (!url || typeof url !== "string") return "";
  if (!url.includes("res.cloudinary.com")) return url;
  if (url.includes("/f_auto") || url.includes("/q_auto") || url.includes("/w_")) return url;

  const { width = 800, quality = "auto", format = "auto" } = options;
  const transform = `f_${format},q_${quality},w_${width},c_limit`;

  return url.replace("/image/upload/", `/image/upload/${transform}/`);
}

export default cloudinary;
