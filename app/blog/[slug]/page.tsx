import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, BUSINESS } from "@/lib/constants";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

// Blog post data — replace with CMS fetch in production
const BLOG_POSTS: Record<
  string,
  {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    content: string[];
    author: string;
  }
> = {
  "how-to-choose-the-right-safety-net-for-your-balcony": {
    title: "How to Choose the Right Safety Net for Your Balcony",
    excerpt: "Not all safety nets are the same. Learn about mesh sizes, materials, UV rating, and how to pick the right net for your balcony.",
    date: "2024-03-15",
    readTime: "5 min read",
    category: "Buying Guide",
    author: "Kovai Safety Nets Team",
    content: [
      "Choosing the right safety net for your balcony can feel overwhelming with the many options available in the market. In this guide, we break down everything you need to know to make an informed decision.",
      "## Material: HDPE vs. Nylon vs. Polypropylene",
      "The three most common materials for balcony safety nets are HDPE (high-density polyethylene), nylon (polyamide), and polypropylene (PP). HDPE offers the best balance of UV resistance, strength, and cost — making it our top recommendation for residential balconies in Coimbatore's sunny climate. Nylon is stronger per strand but costs more and has slightly lower UV resistance. PP is used primarily for industrial applications.",
      "## Mesh Size: Matching to Your Purpose",
      "For child safety nets: 25 mm mesh or smaller — no gaps for small hands or feet. For pet nets (cats): 30 mm mesh — no escape gaps for most cat breeds. For pigeon/bird exclusion: 20 mm mesh. For general fall protection (adults): 50–100 mm mesh. For industrial: 100 mm, IS 11057 rated.",
      "## UV Stabilisation: Essential for Coimbatore's Climate",
      "Coimbatore receives intense UV radiation year-round. An un-stabilised net can become brittle and fail within 1–2 years. Always ask for UV-stabilised nets with a minimum 5-year UV warranty. All nets supplied by Kovai Safety Nets carry a minimum 3-year UV warranty.",
      "## Hardware: SS 304 vs. Galvanised vs. Mild Steel",
      "The frame hardware (hooks, eye bolts, thimbles) is as important as the net. SS 304 stainless steel is our standard recommendation — it resists corrosion for decades. Galvanised steel is acceptable for inland areas. Mild (plain) steel hooks should be avoided as they rust rapidly in Coimbatore's humid climate.",
      "## Professional Installation vs. DIY",
      "While DIY net kits are available online, we strongly recommend professional installation for any balcony above the ground floor. The anchor points must be properly selected and installed into structural concrete — not tiles or false ceilings — to withstand the loads involved. Our professional installation comes with a written 1-year warranty.",
      "Ready to choose the right safety net? Call Kovai Safety Nets at 7708414857 for a free consultation and site measurement.",
    ],
  },
  "invisible-grills-vs-safety-nets-which-is-better": {
    title: "Invisible Grills vs Safety Nets — Which Is Better for Coimbatore Apartments?",
    excerpt: "A detailed comparison of stainless steel invisible grills and nylon safety nets for balconies in Coimbatore.",
    date: "2024-02-20",
    readTime: "7 min read",
    category: "Comparison",
    author: "Kovai Safety Nets Team",
    content: [
      "Two of our most popular services — invisible grills and safety nets — are often compared by customers. Here's a detailed breakdown to help you decide which is right for your home.",
      "## What Are Invisible Grills?",
      "Invisible grills use tensioned stainless steel cables (3 mm, 7×7 strand) run vertically between aluminium top and bottom tracks. The cables are spaced 75–100 mm apart, providing a nearly invisible barrier that meets child safety standards. They are permanently fixed structures.",
      "## What Are Safety Nets?",
      "Safety nets use nylon or HDPE mesh stretched across the balcony opening using a wire rope or stainless steel frame. They are softer, can be removed and reinstalled, and are available in a range of mesh sizes for different applications.",
      "## Cost Comparison",
      "Safety nets are generally more affordable than invisible grills for the same balcony area. The cost difference can range from 30–60% depending on the specific configuration. However, invisible grills have a much longer service life (20+ years vs. 5–10 years for nets).",
      "## Aesthetics",
      "Both options are designed to be minimally visible. Invisible grills win on pure aesthetics — the individual cables are thinner than net strands and the overall appearance is more premium. Safety nets, especially in black, are also very unobtrusive from a distance.",
      "## Safety Performance",
      "Both meet child safety requirements when properly installed. Safety nets are softer and will not injure a child who falls into them. Invisible grill cables are rigid but spaced to prevent a child from fitting through.",
      "## Our Recommendation",
      "For a premium, permanent solution with a view: Choose invisible grills. For a budget-friendly, removable, or pet-specific solution: Choose safety nets. Many of our customers choose invisible grills for the main balcony and safety nets for secondary balconies or windows.",
      "Contact Kovai Safety Nets at 7708414857 for a free consultation and measurement.",
    ],
  },
};

// SSG params
export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];
  if (!post) return {};

  return {
    title: `${post.title} | Kovai Safety Nets Blog`,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/blog/${slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${slug}/`,
      publishedTime: post.date,
      authors: [BUSINESS.name],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];

  // For slugs not in our static map, render a "coming soon" page
  const title = post?.title ?? "Blog Post Coming Soon";
  const date = post?.date ?? new Date().toISOString().split("T")[0];
  const category = post?.category ?? "Tips";
  const readTime = post?.readTime ?? "5 min read";
  const author = post?.author ?? BUSINESS.name;
  const content = post?.content ?? [
    "This article is being written by our team. Check back soon, or call us at 7708414857 for immediate advice.",
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    datePublished: date,
    author: { "@type": "Organization", name: BUSINESS.name },
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.webp` },
    },
    url: `${SITE_URL}/blog/${slug}/`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="gradient-hero text-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog/" },
              { label: title, href: `/blog/${slug}/` },
            ]}
          />
          <div className="flex items-center gap-2 mt-6 mb-4">
            <span className="badge bg-orange-500/20 text-orange-300 border border-orange-400/30">
              {category}
            </span>
            <span className="text-blue-300 text-sm">{readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
            {title}
          </h1>
          <div className="flex items-center gap-3 text-blue-300 text-sm">
            <span>✍️ {author}</span>
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

      {/* Content */}
      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-headings:text-brand-navy prose-a:text-orange-500">
            {content.map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-2xl font-bold text-brand-navy mt-10 mb-4">
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              return (
                <p key={i} className="text-gray-700 leading-relaxed mb-5">
                  {block}
                </p>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 p-6 bg-brand-light rounded-3xl border border-orange-100">
            <h3 className="text-xl font-bold text-brand-navy mb-2">
              Need expert help? We&apos;re a call away.
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Kovai Safety Nets provides free site visits and quotes across Coimbatore. Same-day service available.
            </p>
            <div className="flex gap-3">
              <a href={`tel:${BUSINESS.phone}`} className="btn-primary text-sm">
                📞 Call {BUSINESS.phone}
              </a>
              <a
                href={`https://wa.me/${BUSINESS.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-sm"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Back to blog */}
      <div className="py-8 bg-brand-light text-center">
        <Link href="/blog/" className="btn-secondary inline-flex">
          ← Back to Blog
        </Link>
      </div>
    </>
  );
}
