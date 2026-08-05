import React from "react";
import Footer from "@/app/components/Footer";
import WebHero from "./WebHero";
import TransparentNavbar from "@/app/components/Navbar";
import FeatureSection from "@/app/components/Services-Components/FeatureSection";
import InfiniteMovingCards from "@/app/components/Services-Components/InfiniteServiceCards";
import CoreTechnologies from "@/app/components/CoreTechnologies";
import TwoSectionCTA from "@/app/components/Services-Components/TwoSectionCTA";

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
    image: "/services-images/web-infinite/image-1.svg",
    title: "Requirement Analysis",
    description: "Understanding business needs and defining project goals.",
  },
  {
    image: "/services-images/web-infinite/image-2.svg",
    title: "Planning & Design",
    description:
      "Creating wireframes, UI/UX prototypes, and tech architecture.",
  },
  {
    image: "/services-images/web-infinite/image-3.svg",
    title: "Development",
    description:
      "Coding scalable, clean, and efficient solutions using modern frameworks.",
  },
  {
    image: "/services-images/web-infinite/image-4.svg",
    title: "Testing & QA",
    description:
      "Ensuring functionality, performance, and security before launch.",
  },
];

export default function Page() {
  return (
    <>
      <TransparentNavbar />

      <WebHero />

      <TwoSectionCTA
        tagline="Custom Web Development"
        heading="Build Dynamic, Scalable, and High-Performance Web Applications"
        description="At Aptagon Technologies, we create custom web solutions that go beyond aesthetics — built to perform seamlessly across all devices and platforms. From responsive websites to enterprise-grade applications, our team delivers clean, efficient code, intuitive interfaces, and future-ready architectures. Whether you’re building from scratch or upgrading an existing system, we ensure your web solution enhances engagement, streamlines operations, and scales effortlessly with your business growth."
        imageSrc="/services-images/web.jpg"
        buttonLink="/reach-us"
      />

       <FeatureSection
        heading="Top Custom Software Development Services"
        description="Aptagon Technologies transforms your vision..."
        cards={cardsData}
      />

      <CoreTechnologies />

      <InfiniteMovingCards
        cards={Infintecards}
        speed={60}
        heading="Our Web Development Process"
        subheading="We follow a user-focused, agile process to design, develop, and deliver high-performance websites on time."
      />

      <Footer />
    </>
  );
}