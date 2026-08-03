import Footer from "@/app/components/Footer";
import AnimatedHeroSection from "@/app/components/Herosection";
import TransparentNavbar from "@/app/components/Navbar";
import FeatureSection from "@/app/components/Services-Components/FeatureSection";
import InfiniteMovingCards from "@/app/components/Services-Components/InfiniteServiceCards";
import TwoSectionCTA from "@/app/components/Services-Components/TwoSectionCTA";
import CoreTechnologies from "@/app/components/CoreTechnologies";
import React from "react";
import UiUxHero from "./UiHero";

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
    image: "/services-images/uiux-infinite/image-1.svg",
    title: "Research & Discovery",
    description: "Understanding users, business goals, and competitors.",
  },
  {
    image: "/services-images/uiux-infinite/image-2.svg",
    title: "Information Architecture",
    description: "Structuring content and user flows for clarity.",
  },
  {
    image: "/services-images/uiux-infinite/image-3.svg",
    title: "Wireframing",
    description: "Low-fidelity layouts to define structure and usability.",
  },
  {
    image: "/services-images/uiux-infinite/image-4.svg",
    title: "Visual Design",
    description: "High-fidelity UI design aligned with brand identity.",
  },
];

function page() {
  return (
    <>
      <TransparentNavbar />

      {/* <AnimatedHeroSection
        heading="UI/UX Design"
        description="Designing intuitive, engaging, and user-centered digital experiences."
        contentAlignment="center"
        height="h-[550px]"
      /> */}
<UiUxHero/>
      <TwoSectionCTA
        tagline="User-Centered UI / UX Design"
        heading="Crafting Digital Experiences That Inspire Engagement"
        description="Our UI/UX design services are rooted in a deep understanding of user behavior, business objectives, and evolving market needs. We meticulously analyze user interactions and preferences to craft intuitive, visually engaging interfaces that truly resonate with your target audience. By combining thoughtful design principles with innovative strategies, we create seamless digital experiences that enhance usability, drive engagement, and boost customer satisfaction — delivering designs that are as functional as they are beautiful."
        imageSrc="/services-images/ui-ux.png"
        buttonLink="/reach-us"
      />

      <FeatureSection
        heading="Top Custom Software Development Services"
        description="Aptagon Technologies transforms your vision into powerful, scalable software solutions that drive innovation and deliver real business impact."
        cards={cardsData}
      />

      <CoreTechnologies />

      <InfiniteMovingCards
        cards={Infintecards}
        speed={60}
        heading="Our UI/UX Process"
        subheading="We follow a structured, agile process to ensure quality, transparency, and on-time delivery."
      />

      <Footer />
    </>
  );
}

export default page;
