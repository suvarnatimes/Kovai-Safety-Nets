import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL, BUSINESS, PHONE_URL, WHATSAPP_URL } from "@/lib/constants";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import connectToDatabase from "@/lib/db";
import BlogPost from "@/lib/models/BlogPost";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  await connectToDatabase();
  const post = await BlogPost.findOne({ slug, status: "published" }).lean();
  if (!post) return {};

  const excerpt = post.content.replace(/##\s+/g, "").slice(0, 160) + "...";

  return {
    title: `${post.title} | Kovai Safety Nets Blog`,
    description: excerpt,
    alternates: { canonical: `${SITE_URL}/blog/${slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: excerpt,
      url: `${SITE_URL}/blog/${slug}/`,
      publishedTime: new Date(post.createdAt).toISOString(),
      authors: [BUSINESS.name],
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectToDatabase();

  const post = await BlogPost.findOne({ slug, status: "published" }).lean();

  if (!post) {
    notFound();
  }

  const date = new Date(post.createdAt).toISOString().split("T")[0];
  const contentBlocks = post.content.split("\n\n").filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: date,
    author: { "@type": "Organization", name: BUSINESS.name },
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.webp` },
    },
    url: `${SITE_URL}/blog/${slug}/`,
    image: post.coverImageUrl || undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

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
              {new Date(post.createdAt).toLocaleDateString("en-IN", {
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
                src={post.coverImageUrl}
                alt={post.title}
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
