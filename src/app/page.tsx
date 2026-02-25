import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { DirectWithMe } from "@/components/sections/DirectWithMe";
import { FeaturedCaseStudy } from "@/components/sections/FeaturedCaseStudy";
import { FreeReviewCta } from "@/components/sections/FreeReviewCta";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getAllCaseStudies } from "@/lib/mdx";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    type: "website",
  },
};

export default function HomePage() {
  // Fetch live from MDX source — newest first
  const [featured] = getAllCaseStudies();

  return (
    <>
      <Hero />
      <Services />
      <DirectWithMe />
      <WhyUs />
      {featured && <FeaturedCaseStudy caseStudy={featured} />}
      <FreeReviewCta />
      <CtaBanner />
    </>
  );
}
