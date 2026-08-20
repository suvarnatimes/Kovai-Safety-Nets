import Link from "next/link";
import connectToDatabase from "@/lib/db";
import BlogPost from "@/lib/models/BlogPost";
import GalleryImage from "@/lib/models/GalleryImage";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let totalPosts = 0;
  let publishedPosts = 0;
  let draftPosts = 0;
  let totalImages = 0;
  let recentPosts: any[] = [];
  let recentImages: any[] = [];

  try {
    await connectToDatabase();
    totalPosts = await BlogPost.countDocuments();
    publishedPosts = await BlogPost.countDocuments({ status: "published" });
    draftPosts = await BlogPost.countDocuments({ status: "draft" });
    totalImages = await GalleryImage.countDocuments();

    recentPosts = await BlogPost.find({}).sort({ createdAt: -1 }).limit(5).lean();
    recentImages = await GalleryImage.find({}).sort({ uploadedAt: -1 }).limit(6).lean();
  } catch (err) {
    console.warn("Admin dashboard data fetch warning:", err);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Dashboard
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Overview of blog articles, Cloudinary gallery storage, and quick administrative actions.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Total Posts</span>
            <span className="text-xl">📝</span>
          </div>
          <p className="text-3xl font-extrabold text-white">{totalPosts}</p>
          <p className="text-xs text-slate-400">Articles created</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Published</span>
            <span className="text-xl">🟢</span>
          </div>
          <p className="text-3xl font-extrabold text-emerald-400">{publishedPosts}</p>
          <p className="text-xs text-slate-400">Live on /blog</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Drafts</span>
            <span className="text-xl">🟡</span>
          </div>
          <p className="text-3xl font-extrabold text-amber-400">{draftPosts}</p>
          <p className="text-xs text-slate-400">In draft state</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Gallery Images</span>
            <span className="text-xl">🖼️</span>
          </div>
          <p className="text-3xl font-extrabold text-orange-400">{totalImages}</p>
          <p className="text-xs text-slate-400">Cloudinary hosted</p>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Blog Actions */}
        <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>📝</span> Blog Posts Management
            </h2>
            <Link
              href="/admin/blog/new"
              className="py-2 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-colors"
            >
              + Create Post
            </Link>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Publish advice articles, safety guides, and SEO news to educate homeowners in Coimbatore.
          </p>

          <div className="divide-y divide-slate-800 pt-2">
            {recentPosts.length === 0 ? (
              <p className="text-xs text-slate-500 py-3">No blog posts found.</p>
            ) : (
              recentPosts.map((post) => (
                <div key={post._id.toString()} className="py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-200 truncate">{post.title}</p>
                    <p className="text-[11px] text-slate-500">
                      {new Date(post.createdAt).toLocaleDateString("en-IN")} · /{post.slug}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      post.status === "published"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="pt-2">
            <Link
              href="/admin/blog"
              className="text-xs text-orange-400 hover:underline font-semibold block text-right"
            >
              Manage All Posts →
            </Link>
          </div>
        </div>

        {/* Gallery Actions */}
        <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🖼️</span> Gallery Management
            </h2>
            <Link
              href="/admin/gallery"
              className="py-2 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-colors"
            >
              + Upload Images
            </Link>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Upload new installation photos directly to Cloudinary and manage existing gallery items.
          </p>

          {/* Image Thumbnails preview */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {recentImages.length === 0 ? (
              <p className="text-xs text-slate-500 col-span-3 py-3">No images uploaded yet.</p>
            ) : (
              recentImages.map((img) => (
                <div key={img._id.toString()} className="aspect-square rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative group">
                  <img
                    src={img.imageUrl}
                    alt={img.caption || "Gallery"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))
            )}
          </div>

          <div className="pt-2">
            <Link
              href="/admin/gallery"
              className="text-xs text-orange-400 hover:underline font-semibold block text-right"
            >
              Manage Full Gallery Grid →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
