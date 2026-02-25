import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description:
    `${siteConfig.name} — freelance DevOps & cloud engineering. I design, build, and operate production infrastructure for engineering teams — AWS, Azure, Kubernetes, Terraform, CI/CD, and observability.`,
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description:
      "Specialist DevOps consulting — cloud infrastructure, Kubernetes, IaC, CI/CD, and monitoring stacks built for production.",
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `About ${siteConfig.name}`,
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
