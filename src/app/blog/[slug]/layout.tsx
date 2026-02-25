import type { Metadata } from "next";
import { getBlogPost } from "@/lib/blog";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Not Found" };

  const canonicalUrl = `${siteConfig.url}/blog/${slug}`;
  const description = post.metaDescription ?? post.excerpt;
  const fullTitle = `${post.title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    authors: [{ name: siteConfig.owner.name }],
    keywords: post.tags,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}${siteConfig.ogImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  const canonicalUrl = `${siteConfig.url}/blog/${slug}`;

  const blogPostingJsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription ?? post.excerpt,
        url: canonicalUrl,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          "@type": "Person",
          name: siteConfig.owner.name,
          url: siteConfig.url,
          jobTitle: siteConfig.owner.title,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        keywords: post.tags.join(", "),
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
      }
    : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
      ...(post
        ? [{ "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl }]
        : []),
    ],
  };

  return (
    <>
      {blogPostingJsonLd && <JsonLd data={blogPostingJsonLd} />}
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
