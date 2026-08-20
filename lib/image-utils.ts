/**
 * Transforms Cloudinary image URLs on the fly to use auto format (WebP/AVIF),
 * auto compression quality, and max dimensions to drastically improve loading speed.
 * Safe for both Server and Client components (no Node.js dependencies).
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
