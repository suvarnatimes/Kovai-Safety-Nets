import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL, BUSINESS, PHONE_URL, WHATSAPP_URL } from "@/lib/constants";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import connectToDatabase from "@/lib/db";
import BlogPost from "@/lib/models/BlogPost";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export const revalidate = 60; // Cache page for 60 seconds (ISR with instant revalidation on update)

const FALLBACK_POSTS: Record<string, { title: string; content: string }> = {
  "how-to-choose-the-right-safety-net-for-your-balcony": {
    title: "How to Choose the Right Safety Net for Your Balcony",
    content: `Choosing the right safety net for your balcony can feel overwhelming with the many options available in the market. In this guide, we break down everything you need to know to make an informed decision.

## Material: HDPE vs. Nylon vs. Polypropylene
The three most common materials for balcony safety nets are HDPE (high-density polyethylene), nylon (polyamide), and polypropylene (PP). HDPE offers the best balance of UV resistance, strength, and cost — making it our top recommendation for residential balconies in Coimbatore's sunny climate.

## Mesh Size: Matching to Your Purpose
For child safety nets: 25 mm mesh or smaller. For pet nets (cats): 30 mm mesh. For pigeon exclusion: 20 mm mesh. For general fall protection: 50–100 mm mesh.

## Professional Installation
Call Kovai Safety Nets at 7708414857 for a free site visit and measurement across Coimbatore.`,
  },
  "invisible-grills-vs-safety-nets-which-is-better": {
    title: "Invisible Grills vs Safety Nets — Which Is Better for Coimbatore Apartments?",
    content: `A detailed comparison of stainless steel invisible grills and nylon safety nets for balconies in Coimbatore.

## Invisible Grills
Invisible grills use tensioned stainless steel cables (3 mm, 7x7 strand) run vertically between aluminium top and bottom tracks. They are permanently fixed structures.

## Safety Nets
Safety nets use nylon or HDPE mesh stretched across the balcony opening. They are softer, removable, and budget-friendly.

Contact Kovai Safety Nets at 7708414857 for a free consultation and measurement.`,
  },
  "monkey-menace-in-coimbatore-how-to-protect-your-home": {
    title: "Monkey Menace in Coimbatore — How to Protect Your Home Effectively",
    content: `Hillside areas like Kovaipudur and Vadavalli face increasing monkey intrusion. Here is everything you need to know about humane, effective monkey-proofing solutions.

## Monkey Intrusion
Monkeys enter through balconies, open utility areas, and open terrace access doors in search of food.

## Heavy Duty Protection
Heavy-duty HDPE nets provide a safe, effective, and humane barrier.

Contact Kovai Safety Nets at 7708414857 for prompt installation.`,
  },
};

export async function generateStaticParams() {
  try {
    await connectToDatabase();
    const posts = await BlogPost.find({ status: "published" }, "slug").lean();
    if (posts && posts.length > 0) {
      return posts.map((post: any) => ({ slug: post.slug }));
    }
  } catch (err) {
    console.warn("generateStaticParams blog fetch fallback:", err);
  }
  return Object.keys(FALLBACK_POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let title = "Safety Net Article | Kovai Safety Nets Blog";
  let excerpt = "Read safety net tips and advice from Kovai Safety Nets Coimbatore.";
  let coverImageUrl = undefined;

  try {
    await connectToDatabase();
    const post = await BlogPost.findOne({ slug, status: "published" }).lean();
    if (post) {
      title = `${post.title} | Kovai Safety Nets Blog`;
      excerpt = post.content.replace(/##\s+/g, "").slice(0, 160) + "...";
      coverImageUrl = post.coverImageUrl || undefined;
    }
  } catch (err) {
    if (FALLBACK_POSTS[slug]) {
      title = `${FALLBACK_POSTS[slug].title} | Kovai Safety Nets Blog`;
    }
  }

  return {
    title,
    description: excerpt,
    alternates: { canonical: `${SITE_URL}/blog/${slug}/` },
    openGraph: {
      type: "article",
      title,
      description: excerpt,
      url: `${SITE_URL}/blog/${slug}/`,
      images: coverImageUrl ? [{ url: coverImageUrl }] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post: any = null;

  try {
    await connectToDatabase();
    post = await BlogPost.findOne({ slug, status: "published" }).lean();
  } catch (err) {
    console.error("Blog item DB fetch fallback triggered:", err);
  }

  if (!post && FALLBACK_POSTS[slug]) {
    post = {
      title: FALLBACK_POSTS[slug].title,
      content: FALLBACK_POSTS[slug].content,
      createdAt: new Date().toISOString(),
    };
  }

  if (!post) {
    notFound();
  }

  const date = post.createdAt ? new Date(post.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0];
  const contentBlocks = (post.content || "").split("\n\n").filter(Boolean);

  return (
    <>
      {/* Hero (DARK) */}
      <section data-theme="dark" className="section-dark relative overflow-hidden -mt-24 pt-32 md:pt-40 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog/" },
              { label: post.title, href: `/blog/${slug}/` },
            ]}
          />
          <div className="flex items-center gap-3 mt-6 mb-4">
            <span className="pill-badge-dark text-xs" style={{ color: "var(--accent)" }}>
              Safety Guide
            </span>
            <span className="text-slate-300 text-xs font-semibold">5 min read</span>
          </div>
          <h1 className="headline-display text-white mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-slate-300 text-xs sm:text-sm">
            <span>✍️ {BUSINESS.name} Team</span>
            <span>·</span>
            <time dateTime={date}>
              {new Date(date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>
      </section>

      {/* Content (LIGHT) */}
      <article data-theme="light" className="section-light py-16" style={{ color: "#14161a" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.coverImageUrl && (
            <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-black/5 bg-slate-100">
              <img
                src={optimizeCloudinaryUrl(post.coverImageUrl, { width: 1000 })}
                alt={post.title}
                decoding="async"
                className="w-full max-h-[450px] object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-slate-800">
            {contentBlocks.map((block: string, i: number) => {
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="text-2xl font-bold mt-10 mb-4 tracking-tight"
                    style={{ color: "#14161a", fontFamily: "var(--font-display)" }}
                  >
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              return (
                <p key={i} className="text-slate-700 leading-relaxed mb-6 text-base md:text-lg">
                  {block}
                </p>
              );
            })}
          </div>

          {/* CTA Box */}
          <div className="mt-12 p-8 glass-card-light rounded-[24px]">
            <h3 className="text-xl font-bold mb-2" style={{ color: "#14161a" }}>
              Need expert help? We&apos;re a call away.
            </h3>
            <p className="text-slate-600 text-sm mb-6">
              Kovai Safety Nets provides free site visits and quotes across Coimbatore. Same-day service available.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={PHONE_URL} className="btn-primary-light text-xs sm:text-sm">
                📞 Call {BUSINESS.phone}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-light text-xs sm:text-sm"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/blog/" className="btn-secondary-light">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
