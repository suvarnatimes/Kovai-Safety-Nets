"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import slugify from "slugify";

export default function CreateBlogPostPage() {
  const router = typeof window !== "undefined" ? require("next/navigation").useRouter() : null;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [customSlug, setCustomSlug] = useState(false);
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("published");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [coverImagePublicId, setCoverImagePublicId] = useState("");

  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!customSlug) {
      setSlug(slugify(val, { lower: true, strict: true }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image file size must be less than 5MB.");
      return;
    }

    setUploadingImage(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "kovai-safety-nets/blog");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCoverImageUrl(data.imageUrl);
        setCoverImagePublicId(data.publicId);
      } else {
        setError(data.error || "Failed to upload image.");
      }
    } catch (err: any) {
      setError("An error occurred while uploading image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          content,
          coverImageUrl,
          coverImagePublicId,
          status,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/admin/blog");
      } else {
        setError(data.error || "Failed to create article.");
      }
    } catch (err: any) {
      setError("An error occurred while saving article.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Create New Blog Post
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Publish advice, customer guides, and safety net tips for Coimbatore.
          </p>
        </div>
        <Link
          href="/admin/blog"
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
        >
          ← Back to List
        </Link>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Article Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. How to Choose the Right Safety Net for Your Balcony in Coimbatore"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Slug */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                URL Slug *
              </label>
              <button
                type="button"
                onClick={() => setCustomSlug(!customSlug)}
                className="text-xs text-orange-400 hover:underline"
              >
                {customSlug ? "Auto-generate from title" : "Edit slug manually"}
              </button>
            </div>
            <div className="flex items-center rounded-xl bg-slate-900 border border-slate-700 px-4 py-3">
              <span className="text-slate-500 text-xs select-none">/blog/</span>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => {
                  setCustomSlug(true);
                  setSlug(e.target.value);
                }}
                className="flex-1 bg-transparent text-white text-sm focus:outline-none ml-1"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Cover Image (Cloudinary Upload)
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {coverImageUrl ? (
                <div className="relative w-32 h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 group">
                  <img src={coverImageUrl} alt="Cover preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setCoverImageUrl("");
                      setCoverImagePublicId("");
                    }}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold flex items-center justify-center"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer px-4 py-3 rounded-xl bg-slate-900 border border-dashed border-slate-700 hover:border-orange-500 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors">
                  <span>📷</span>
                  <span>{uploadingImage ? "Uploading to Cloudinary..." : "Choose Image (Max 5MB)"}</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    disabled={uploadingImage}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Publication Status
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={status === "published"}
                  onChange={() => setStatus("published")}
                  className="accent-orange-500"
                />
                <span className="text-emerald-400 font-semibold">🟢 Published</span> (Visible on public site)
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={status === "draft"}
                  onChange={() => setStatus("draft")}
                  className="accent-orange-500"
                />
                <span className="text-amber-400 font-semibold">🟡 Draft</span> (Hidden from public site)
              </label>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Article Content * (Supports Paragraphs & Markdown headers like ## Heading)
            </label>
            <textarea
              required
              rows={14}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post here... Use ## Heading for sections, bullet points, and paragraphs."
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/blog"
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting || uploadingImage}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50"
          >
            {submitting ? "Publishing Article..." : "Save Blog Post →"}
          </button>
        </div>
      </form>
    </div>
  );
}
