import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import connectToDatabase from "@/lib/db";
import BlogPost from "@/lib/models/BlogPost";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export const revalidate = 60; // Cache page for 60 seconds (ISR with instant revalidation on update)

export const metadata: Metadata = {
  title: "Safety Net Tips & Local SEO Blog – Kovai Safety Nets Coimbatore",
  description:
    "Expert articles on safety nets, home safety, and local news from Kovai Safety Nets. Read tips on choosing the right safety net for your Coimbatore home.",
  alternates: { canonical: `${SITE_URL}/blog/` },
};

const DEFAULT_BLOG_POSTS = [
  {
    _id: "default-1",
    slug: "how-to-choose-the-right-safety-net-for-your-balcony",
    title: "How to Choose the Right Safety Net for Your Balcony",
    content: "Not all safety nets are the same. Learn about mesh sizes, materials (HDPE vs. PP), UV rating, and how to pick the right net for your balcony type and usage in Coimbatore.",
    createdAt: "2024-03-15",
  },
  {
    _id: "default-2",
    slug: "invisible-grills-vs-safety-nets-which-is-better",
    title: "Invisible Grills vs Safety Nets — Which Is Better for Coimbatore Apartments?",
    content: "A detailed comparison of stainless steel invisible grills and nylon safety nets for balconies. We cover cost, aesthetics, durability, and safety for each option.",
    createdAt: "2024-02-20",
  },
  {
    _id: "default-3",
    slug: "monkey-menace-in-coimbatore-how-to-protect-your-home",
    title: "Monkey Menace in Coimbatore — How to Protect Your Home Effectively",
    content: "Hillside areas like Kovaipudur and Vadavalli face increasing monkey intrusion. Here is everything you need to know about humane, effective monkey-proofing solutions.",
    createdAt: "2024-01-10",
  },
];

export default async function BlogIndexPage() {
  let dbPosts: any[] = [];

  try {
    await connectToDatabase();
    dbPosts = await BlogPost.find({ status: "published" }, "title slug content coverImageUrl createdAt")
      .sort({ createdAt: -1 })
      .lean();
  } catch (err) {
    console.error("Blog DB fetch fallback triggered:", err);
  }

  const postsToRender = dbPosts.length > 0 ? dbPosts : DEFAULT_BLOG_POSTS;

  return (
    <>
      {/* Hero (DARK) */}
      <section data-theme="dark" className="section-dark relative overflow-hidden -mt-24 pt-32 md:pt-40 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog/" },
            ]}
          />
          <h1 className="headline-display text-white mt-6 mb-4">
            Safety Net Tips &amp; Resources
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl">
            Expert advice on home safety, net types, and local guides for Coimbatore homeowners.
          </p>
        </div>
      </section>

      {/* Blog Grid (LIGHT) */}
      <section data-theme="light" className="section-light py-20" aria-label="Blog posts">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 stagger">
            {postsToRender.map((post: any) => {
              const excerpt =
                post.content
                  .replace(/##\s+/g, "")
                  .replace(/\n+/g, " ")
                  .slice(0, 160) + "...";

              return (
                <article
                  key={post._id.toString()}
                  className="glass-card-light group flex flex-col p-6 rounded-[24px] overflow-hidden"
                >
                  {post.coverImageUrl && (
                    <div className="aspect-[16/9] w-full mb-4 rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={optimizeCloudinaryUrl(post.coverImageUrl, { width: 700 })}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-2 mb-3">
                    <span className="pill-badge-light text-xs" style={{ color: "var(--accent)" }}>
                      Safety Guide
                    </span>
                  </div>

                  <h2
                    className="text-lg md:text-xl font-bold mb-3 leading-snug tracking-tight hover:text-orange-500 transition-colors"
                    style={{ color: "#14161a" }}
                  >
                    <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                  </h2>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">{excerpt}</p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5">
                    <time className="text-xs font-semibold text-slate-500" dateTime={new Date(post.createdAt).toISOString()}>
                      {new Date(post.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <Link
                      href={`/blog/${post.slug}/`}
                      className="text-orange-500 text-xs font-bold hover:text-orange-600 transition-colors"
                    >
                      Read Article →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
