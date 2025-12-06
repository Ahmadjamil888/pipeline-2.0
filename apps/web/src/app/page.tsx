import type { Metadata } from "next";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
// import { FeaturedSection } from "@/components/sections/featured-section";
// import { WhyIBuit } from "@/components/sections/why-i-built";
// import { WhatIsRag } from "@/components/sections/what-is-rag";
import { UseCases } from "@/components/sections/use-cases";
import { HowToUse } from "@/components/sections/how-to-use";
import { Testimonials } from "@/components/sections/testimonials";
import { Community } from "@/components/sections/community";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";
import { SenjaTestimonials } from "@/components/sections/senja-testimonials";
import { Statistics } from "@/components/sections/statistics";

export const metadata: Metadata = {
  description:
    "Pipeline AI - Full-Stack LLM Platform for Training and Deploying AI Models. Build RAG applications and train custom AI models with no code required.",
};

export default async function Home() {
  return (
    <main>
      <Header />
      <Hero />
      {/* <FeaturedSection /> */}
      {/* <WhyIBuit /> */}
      {/* <WhatIsRag /> */}
      <UseCases />
      <SenjaTestimonials />
      <HowToUse />
      <Statistics />
      <Testimonials />
      <Community />
      <CTA />
      <Footer />
    </main>
  );
}
