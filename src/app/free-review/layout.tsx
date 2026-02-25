import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const { freeReview } = siteConfig;

export const metadata: Metadata = {
  title: freeReview.headline,
  description: freeReview.subtext,
  alternates: {
    canonical: `${siteConfig.url}${freeReview.href}`,
  },
  openGraph: {
    title: freeReview.headline,
    description: freeReview.subtext,
    url: `${siteConfig.url}${freeReview.href}`,
    type: "website",
  },
};

export default function FreeReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
