"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  coverImageUrl?: string;
  coverImagePublicId?: string;
  createdAt: string;
}

export default function AdminBlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [search, setSearch] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/blog");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error("Failed to load posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This will also remove its cover image from Cloudinary.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPosts(posts.filter((p) => p._id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete post.");
      }
    } catch (err) {
      alert("Error deleting post.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesFilter = filter === "all" || post.status === filter;
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.slug.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Blog Posts
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage, edit, publish, or remove blog articles.
          </p>
        </div>

        <Link
          href="/admin/blog/new"
          className="py-3 px-5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 self-start"
        >
          <span>+ Create New Article</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-[#161b22] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === "all"
                ? "bg-slate-700 text-white"
                : "bg-slate-800/50 text-slate-400 hover:text-slate-200"
            }`}
          >
            All ({posts.length})
          </button>
          <button
            onClick={() => setFilter("published")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === "published"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-slate-800/50 text-slate-400 hover:text-slate-200"
            }`}
          >
            Published ({posts.filter((p) => p.status === "published").length})
          </button>
          <button
            onClick={() => setFilter("draft")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === "draft"
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : "bg-slate-800/50 text-slate-400 hover:text-slate-200"
            }`}
          >
            Drafts ({posts.filter((p) => p.status === "draft").length})
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by title or slug..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-orange-500"
        />
      </div>

      {/* Posts Table */}
      <div className="rounded-2xl bg-[#161b22] border border-slate-800 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">Loading articles...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No articles found matching criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/60 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Article</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 max-w-md">
                      <div className="flex items-center gap-3">
                        {post.coverImageUrl ? (
                          <img
                            src={post.coverImageUrl}
                            alt=""
                            className="w-12 h-10 object-cover rounded-lg bg-slate-900 border border-slate-700 shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-10 rounded-lg bg-slate-800 border border-slate-700 shrink-0 flex items-center justify-center text-xs text-slate-500">
                            No Img
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-white truncate">{post.title}</p>
                          <p className="text-xs text-slate-500 truncate">/blog/{post.slug}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                          post.status === "published"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-400">
                      {new Date(post.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>

                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        href={`/admin/blog/${post._id}`}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                      >
                        ✏️ Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post._id, post.title)}
                        disabled={deletingId === post._id}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-semibold text-red-400 transition-colors disabled:opacity-50"
                      >
                        {deletingId === post._id ? "Deleting..." : "🗑️ Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
