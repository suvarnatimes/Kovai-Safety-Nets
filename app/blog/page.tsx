import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

export const metadata: Metadata = {
  title: "Safety Net Tips & Local SEO Blog – Kovai Safety Nets Coimbatore",
  description:
    "Expert articles on safety nets, home safety, and local news from Kovai Safety Nets. Read tips on choosing the right safety net for your Coimbatore home.",
  alternates: { canonical: `${SITE_URL}/blog/` },
};

// CMS-ready: In production, replace this with data from a headless CMS (Contentful, Sanity, etc.)
const BLOG_POSTS = [
  {
    slug: "how-to-choose-the-right-safety-net-for-your-balcony",
    title: "How to Choose the Right Safety Net for Your Balcony",
    excerpt:
      "Not all safety nets are the same. Learn about mesh sizes, materials (HDPE vs. PP), UV rating, and how to pick the right net for your balcony type and usage.",
    date: "2024-03-15",
    readTime: "5 min read",
    category: "Buying Guide",
  },
  {
    slug: "invisible-grills-vs-safety-nets-which-is-better",
    title: "Invisible Grills vs Safety Nets — Which Is Better for Coimbatore Apartments?",
    excerpt:
      "A detailed comparison of stainless steel invisible grills and nylon safety nets for balconies. We cover cost, aesthetics, durability, and safety for each option.",
    date: "2024-02-20",
    readTime: "7 min read",
    category: "Comparison",
  },
  {
    slug: "monkey-menace-in-coimbatore-how-to-protect-your-home",
    title: "Monkey Menace in Coimbatore — How to Protect Your Home Effectively",
    excerpt:
      "Hillside areas like Kovaipudur and Vadavalli face increasing monkey intrusion. Here's everything you need to know about humane, effective monkey-proofing solutions.",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Pest Control",
  },
  {
    slug: "top-5-safety-net-mistakes-to-avoid",
    title: "Top 5 Safety Net Mistakes Homeowners Make (and How to Avoid Them)",
    excerpt:
      "From using the wrong mesh size to skipping on anchor quality — these common mistakes can compromise your safety net's effectiveness. We explain how to avoid them.",
    date: "2023-12-05",
    readTime: "4 min read",
    category: "Tips",
  },
  {
    slug: "pet-safety-nets-complete-guide-coimbatore",
    title: "Pet Safety Nets in Coimbatore — A Complete Guide for Cat & Dog Owners",
    excerpt:
      "Your cat's curiosity can be dangerous on an apartment balcony. Read our complete guide on choosing, installing, and maintaining pet safety nets for cats and dogs.",
    date: "2023-11-18",
    readTime: "8 min read",
    category: "Pet Safety",
  },
  {
    slug: "industrial-safety-nets-is-11057-compliance-guide",
    title: "Industrial Safety Nets — IS 11057 & EN 1263 Compliance Guide for Coimbatore Sites",
    excerpt:
      "A practical guide to safety net compliance for construction site managers in Coimbatore. Covers IS 11057, EN 1263, NBC Part 7, and inspection requirements.",
    date: "2023-10-30",
    readTime: "10 min read",
    category: "Industrial Safety",
  },
];

export default function BlogIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog/" },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold mt-6 mb-4">
            Safety Net Tips &amp; Resources
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Expert advice on home safety, net types, and local guides for Coimbatore homeowners.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-white" aria-label="Blog posts">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 stagger">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="card group flex flex-col"
              >
                <div className="bg-gradient-to-br from-brand-blue/10 to-orange-50 h-32 flex items-center justify-center text-5xl">
                  📰
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="badge-orange text-xs">{post.category}</span>
                    <span className="text-xs text-gray-400">{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-bold text-brand-navy mb-2 leading-tight group-hover:text-orange-500 transition-colors">
                    <Link href={`/blog/${post.slug}/`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <time className="text-xs text-gray-400" dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <Link
                      href={`/blog/${post.slug}/`}
                      className="text-orange-500 text-sm font-semibold hover:text-orange-600 transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CMS note banner */}
      <section className="py-8 bg-brand-light">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            📚 This blog is CMS-ready — connect to Contentful, Sanity, or any headless CMS to manage posts. 
            <Link href="/contact/" className="text-orange-500 hover:underline ml-1">Contact us</Link> to get started.
          </p>
        </div>
      </section>
    </>
  );
}
