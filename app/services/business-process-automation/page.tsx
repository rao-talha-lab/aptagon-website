"use client";

import Footer from "@/app/components/Footer";
import AnimatedHeroSection from "@/app/components/Herosection";
import TransparentNavbar from "@/app/components/Navbar";
import FeatureSection from "@/app/components/Services-Components/FeatureSection";
import InfiniteMovingCards from "@/app/components/Services-Components/InfiniteServiceCards";
import CoreTechnologies from "@/app/components/CoreTechnologies";
import TwoSectionCTA from "@/app/components/Services-Components/TwoSectionCTA";
import React from "react";
import BusinessHero from "./BusinessHero";

const cardsData = [
  {
    image: "/logos/web.svg",
    title: "Web Development",
    slug: "web-development",
    description:
      "We build responsive, high-performance websites that blend creativity and technology — enhancing user experience and driving consistent business growth.",
  },
  {
    image: "/logos/mobile.svg",
    title: "Mobile App Development",
    slug: "mobile-apps",
    description:
      "Crafting high-performance, intuitive mobile applications that deliver seamless experiences and drive user engagement across all devices. Our apps are designed to scale with your business needs.",
  },
  {
    image: "/logos/uiux.svg",
    title: "UI/UX Designing",
    slug: "ui-ux",
    description:
      "We design intuitive, visually engaging interfaces that combine creativity and strategy — enhancing user satisfaction and ensuring seamless interaction across every digital touchpoint.",
  },
  {
    image: "/logos/bpa.svg",
    title: "Business Process Automation",
    slug: "business-process-automation",
    description:
      "Streamline operations with intelligent automation solutions. We simplify workflows, cut manual tasks, and boost overall business efficiency and speed.",
  },
  {
    image: "/logos/sqa.svg",
    title: "Software Quality Assurance",
    slug: "sqa",
    description:
      "Ensure reliability through advanced QA testing services. We deliver secure, high-quality software that performs efficiently and flawlessly.",
  },
  {
    image: "/logos/llm.svg",
    title: "LLM Development & Training",
    slug: "llm-development",
    description:
      "Develop tailored Large Language Models that enhance automation, communication, and intelligent business decision-making.",
  },
  {
    image: "/logos/chatbot.svg",
    title: "Chatbot Development",
    slug: "chatbots",
    description:
      "Engage customers 24/7 through advanced AI-powered chatbots that manage support, queries, and lead generation with smart precision.",
  },
  {
    image: "/logos/ai.svg",
    title: "AI & Generative Solutions",
    slug: "ai",
    description:
      "Empower your business with powerful AI-driven innovation. We deliver smart, generative solutions for automation, insights, and sustainable growth.",
  },
];

const Infintecards = [
  {
    image: "/services-images/bpa-infinite/image-1.svg",
    title: "Process Discovery",
    description: "Analyzing business processes to identify automation opportunities and define clear objectives.",
  },
  {
    image: "/services-images/bpa-infinite/image-2.svg",
    title: "Solution Design",
    description:
      "Designing scalable solutions with wireframes, UI/UX prototypes, and technical architecture tailored to your workflow.",
  },
  {
    image: "/services-images/bpa-infinite/image-3.svg",
    title: "Development & Integration",
    description:
      "Building robust, efficient systems and integrating them seamlessly with your existing platforms using modern frameworks.",
  },
  {
    image: "/services-images/bpa-infinite/image-4.svg",
    title: "Testing & QA",
    description:
      "Ensuring every feature meets performance, security, and usability standards before launch.",
  },
];

function page() {
  return (
    <>
      <TransparentNavbar />

      {/* Business Hero Section */}
      <BusinessHero />

      {/* CTA Section */}
      <TwoSectionCTA
        tagline="Business Process Automation"
        heading="Streamline Operations, Boost Efficiency, and Unlock Smarter Workflows"
        description="At Aptagon Technologies, we revolutionize the way businesses operate by automating repetitive tasks and optimizing workflows. Our intelligent automation solutions integrate seamlessly into your existing systems — enhancing productivity, accuracy, and decision-making across every department.
From workflow optimization to AI-driven analytics, we design automation frameworks that reduce manual effort, eliminate bottlenecks, and empower your team to focus on what truly matters — innovation and growth."
        imageSrc="/services-images/bpa.jpg"
        buttonLink="/reach-us"
      />

      {/* Feature Section */}
   <FeatureSection
  heading="Top Custom Software Development Services"
  description="Aptagon Technologies transforms your vision..."
  cards={cardsData}
  currentSlug="ai"
  relevantSlugs={["sqa", "llm-development", "chatbots"]} 
/>

      {/* Core Technologies Section */}
      <CoreTechnologies />

      {/* Infinite Process Cards Section */}
      <section className="py-10 bg-white dark:bg-[#1a1a1a] transition-colors duration-300">
        <InfiniteMovingCards
          cards={Infintecards}
          speed={60}
          heading="Our Automation Process"
          subheading="We follow a structured, agile approach to ensure transparency, efficiency, and measurable business outcomes at every stage."
        />
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default page;