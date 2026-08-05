import Footer from "@/app/components/Footer";
import AnimatedHeroSection from "@/app/components/Herosection";
import TransparentNavbar from "@/app/components/Navbar";
import FeatureSection from "@/app/components/Services-Components/FeatureSection";
import InfiniteMovingCards from "@/app/components/Services-Components/InfiniteServiceCards";
import CoreTechnologies from "@/app/components/CoreTechnologies";
import TwoSectionCTA from "@/app/components/Services-Components/TwoSectionCTA";
import React from "react";
import LlmHero from "./LlmHero";

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
    image: "/services-images/llm-infinite/image-1.svg",
    title: "Custom Model Development",
    description:
      "Build LLMs tailored to your specific business data and needs.",
  },
  {
    image: "/services-images/llm-infinite/image-2.svg",
    title: "Model Fine-Tuning",
    description:
      "Optimize existing models like GPT, LLaMA, or Falcon for industry-specific use cases",
  },
  {
    image: "/services-images/llm-infinite/image-3.svg",
    title: "Prompt Engineering",
    description:
      "Design effective prompt structures for accurate, contextual responses.",
  },
  {
    image: "/services-images/llm-infinite/image-4.svg",
    title: "Data Preparation & Training",
    description:
      "Curate and preprocess high-quality datasets for efficient model training.",
  },

];

function page() {
  return (
    <>
      <TransparentNavbar />
      {/* <AnimatedHeroSection
        heading="LLM Development & Training"
        description="Empowering businesses with intelligent, domain-specific LLMs designed to understand context, generate insights, and automate complex tasks with precision."
        contentAlignment="center"
        height="h-[550px]"
      /> */}
      <LlmHero />
      <TwoSectionCTA
        tagline="LLM Development & Training"
        heading="Empower Your Business with Intelligent AI Solutions"
        description="At Aptagon Technologies, we build and fine-tune Large Language Models (LLMs) tailored to your business goals. Our AI experts use machine learning, NLP, and deep learning to create intelligent systems that understand and respond to human language with accuracy. From custom chatbots to AI automation, content generation, and data analysis, we design scalable solutions that boost efficiency and innovation. With responsible AI practices and domain-focused training, we partner with you to bring generative AI into your workflow and lead the next wave of intelligent transformation."
        imageSrc="/services-images/llm.png"
        buttonLink="/reach-us"
      />
       <FeatureSection
        heading="Top Custom Software Development Services"
        description="Aptagon Technologies transforms your vision..."
        cards={cardsData}
      />

      <CoreTechnologies />
      <section className="py-10 bg-white">
        <InfiniteMovingCards
          cards={Infintecards}
          speed={60} // optional, defaults to 60
          heading="Our AI Development Process"
          subheading="We follow a strategic, data-driven approach to design, train, and deploy AI models that deliver real business value."
        />
      </section>
      <Footer />
    </>
  );
}

export default page;
