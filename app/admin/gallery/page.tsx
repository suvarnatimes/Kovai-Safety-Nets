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
    let successCount = 0;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      setUploadProgress(`Uploading image ${i + 1} of ${fileList.length}... (${file.name})`);

      // Check size limit (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`Skipping ${file.name}: file size exceeds 5MB limit.`);
        continue;
      }

      try {
        // Step 1: Upload to Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "kovai-safety-nets/gallery");

        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok || !uploadData.success) {
          alert(`Failed to upload ${file.name}: ${uploadData.error}`);
          continue;
        }

        // Step 2: Save metadata to MongoDB
        const dbRes = await fetch("/api/admin/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageUrl: uploadData.imageUrl,
            publicId: uploadData.publicId,
            caption: captionInput || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
          }),
        });

        if (dbRes.ok) {
          const newDoc = await dbRes.json();
          setImages((prev) => [newDoc, ...prev]);
          successCount++;
        }
      } catch (err) {
        console.error("Upload error:", err);
      }
    }

    setUploadProgress("");
    setUploading(false);
    setCaptionInput("");
    e.target.value = ""; // reset file input
  };

  const handleDeleteImage = async (id: string, publicId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this image? It will be deleted from Cloudinary first, and then removed from MongoDB."
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
          Upload multi-file photo installations directly to Cloudinary storage and sync with MongoDB Atlas.
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
              <span>📷 Select Files (Multi-Upload)</span>
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
            Click trash button to destroy from Cloudinary & DB
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
                  {/* Delete Badge Overlay */}
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
