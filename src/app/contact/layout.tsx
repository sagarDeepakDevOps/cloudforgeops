import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    `Get in touch with ${siteConfig.name}. Describe your infrastructure challenge and I'll respond within one business day — no sales pitch, just a direct technical conversation.`,
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description:
      "Start a conversation about your cloud infrastructure, Kubernetes, CI/CD, or DevOps challenges.",
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `Contact ${siteConfig.name}`,
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  robots: {
    index: false, // contact pages should not be indexed
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
