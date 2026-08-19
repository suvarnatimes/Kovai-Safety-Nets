"use client";

import { useEffect, useState } from "react";

interface GalleryImageItem {
  _id: string;
  imageUrl: string;
  publicId: string;
  caption?: string;
  uploadedAt: string;
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [captionInput, setCaptionInput] = useState("");

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch (err) {
      console.error("Failed to load gallery images", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleMultiFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const fileList = Array.from(files);

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      setUploadProgress(`Uploading ${i + 1} of ${fileList.length}: ${file.name}...`);

      // File size validation (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`Skipping ${file.name}: File exceeds 10MB size limit.`);
        continue;
      }

      try {
        let imageUrl = "";
        let publicId = "";

        // Attempt Direct Signed Upload to Cloudinary (Bypasses Vercel timeouts & payload limits)
        try {
          const sigRes = await fetch("/api/admin/cloudinary-signature?folder=kovai-safety-nets/gallery");
          if (sigRes.ok) {
            const sigData = await sigRes.json();
            const cldFormData = new FormData();
            cldFormData.append("file", file);
            cldFormData.append("api_key", sigData.apiKey);
            cldFormData.append("timestamp", sigData.timestamp);
            cldFormData.append("signature", sigData.signature);
            cldFormData.append("folder", sigData.folder);

            const cldRes = await fetch(
              `https://api.cloudinary.com/v1_1/${sigData.cloudName}/image/upload`,
              {
                method: "POST",
                body: cldFormData,
              }
            );

            if (cldRes.ok) {
              const cldJson = await cldRes.json();
              imageUrl = cldJson.secure_url;
              publicId = cldJson.public_id;
            }
          }
        } catch (cldErr) {
          console.warn("Direct Cloudinary upload failed, falling back to server route:", cldErr);
        }

        // Fallback to Server API upload if direct upload didn't succeed
        if (!imageUrl || !publicId) {
          const serverFormData = new FormData();
          serverFormData.append("file", file);
          serverFormData.append("folder", "kovai-safety-nets/gallery");

          const serverRes = await fetch("/api/admin/upload", {
            method: "POST",
            body: serverFormData,
          });

          const serverData = await serverRes.json();
          if (serverRes.ok && serverData.success) {
            imageUrl = serverData.imageUrl;
            publicId = serverData.publicId;
          } else {
            alert(`Failed to upload ${file.name}: ${serverData.error || "Upload error"}`);
            continue;
          }
        }

        // Save record to MongoDB Atlas
        const dbRes = await fetch("/api/admin/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageUrl,
            publicId,
            caption: captionInput || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
          }),
        });

        if (dbRes.ok) {
          const newDoc = await dbRes.json();
          setImages((prev) => [newDoc, ...prev]);
        }
      } catch (err) {
        console.error("Upload process error:", err);
      }
    }

    setUploadProgress("");
    setUploading(false);
    setCaptionInput("");
    e.target.value = "";
  };

  const handleDeleteImage = async (id: string, publicId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this image? It will be destroyed from Cloudinary first, and then deleted from MongoDB."
      )
    ) {
      return;
    }

    setDeletingId(id);

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setImages((prev) => prev.filter((img) => img._id !== id));
      } else {
        alert(data.error || "Failed to delete image.");
      }
    } catch (err) {
      alert("An error occurred while deleting the image.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Gallery Management
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Direct signed multi-photo uploads to Cloudinary storage, synchronized with MongoDB Atlas.
        </p>
      </div>

      {/* Upload Zone */}
      <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span>📤</span> Upload Installation Photos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Default Caption / Location Tag (Optional)
            </label>
            <input
              type="text"
              value={captionInput}
              onChange={(e) => setCaptionInput(e.target.value)}
              placeholder="e.g. Balcony Safety Net Installation in Vadavalli, Coimbatore"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="cursor-pointer py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 text-center disabled:opacity-50">
              <span>📷 Select Photos (Multi-Upload)</span>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                disabled={uploading}
                onChange={handleMultiFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {uploading && (
          <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs flex items-center gap-3">
            <svg className="animate-spin h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="font-semibold">{uploadProgress}</span>
          </div>
        )}
      </div>

      {/* Gallery Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">
            Uploaded Photos ({images.length})
          </h2>
          <span className="text-xs text-slate-400">
            Click trash icon to destroy from Cloudinary & DB
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">Loading gallery images...</div>
        ) : images.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#161b22] border border-slate-800 text-center text-slate-500 text-sm">
            No gallery images uploaded yet. Use the upload bar above to add images.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {images.map((img) => (
              <div
                key={img._id}
                className="group relative rounded-2xl overflow-hidden bg-[#161b22] border border-slate-800 shadow-md flex flex-col justify-between"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900 relative">
                  <img
                    src={img.imageUrl}
                    alt={img.caption || "Gallery item"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => handleDeleteImage(img._id, img.publicId)}
                    disabled={deletingId === img._id}
                    title="Delete image from Cloudinary & Database"
                    className="absolute top-3 right-3 p-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white shadow-lg backdrop-blur-md opacity-90 hover:opacity-100 transition-all disabled:opacity-50"
                  >
                    {deletingId === img._id ? (
                      <span className="text-xs font-bold animate-pulse">Deleting...</span>
                    ) : (
                      <span>🗑️</span>
                    )}
                  </button>
                </div>

                <div className="p-3.5 space-y-1 bg-[#161b22]">
                  <p className="text-xs font-medium text-slate-200 line-clamp-2">
                    {img.caption || "Installation Photo"}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span>
                      {new Date(img.uploadedAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <a
                      href={img.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:underline font-medium"
                    >
                      View Full →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
