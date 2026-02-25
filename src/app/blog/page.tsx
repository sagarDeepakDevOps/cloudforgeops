import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { BlogCard } from "@/components/sections/BlogCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";

const pageTitle = `Blog | ${siteConfig.name}`;
const pageDesc =
  "Technical deep-dives on DevOps, cloud infrastructure, Kubernetes, Terraform, CI/CD, and platform engineering — from real engagements.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDesc,
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: pageTitle,
    description: pageDesc,
    url: `${siteConfig.url}/blog`,
    type: "website",
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Blog`,
      },
    ],
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      {/* ── Page header ── */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Writing"
            heading="Blog"
            description="Practical guides on cloud infrastructure, Kubernetes, Terraform, and DevOps patterns from real production environments."
            align="center"
          />
        </div>
      </section>

      {/* ── Post grid ── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-[var(--muted)]">No posts published yet — check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
