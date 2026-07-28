import Footer from "@/app/components/Footer";
import AnimatedHeroSection from "@/app/components/Herosection";
import TransparentNavbar from "@/app/components/Navbar";
import FeatureSection from "@/app/components/Services-Components/FeatureSection";
import InfiniteMovingCards from "@/app/components/Services-Components/InfiniteServiceCards";
import CoreTechnologies from "@/app/components/CoreTechnologies";
import TwoSectionCTA from "@/app/components/Services-Components/TwoSectionCTA";
import React from "react";
import ChatBotHero from "./ChatBotHero";

const cardsData = [
  {
    image: "/logos/web-development.png",
    title: "Web Development",
    slug: "web-development",
    description:
      "We build responsive, high-performance websites that blend creativity and technology — enhancing user experience and driving consistent business growth.",
  },
  {
    image: "/logos/mobile-app-development.png",
    title: "Mobile App Development",
    slug: "mobile-apps",
    description:
      "Crafting high-performance, intuitive mobile applications that deliver seamless experiences and drive user engagement across all devices. Our apps are designed to scale with your business needs.",
  },
  {
    image: "/logos/ui-ux-designing.png",
    title: "UI/UX Designing",
    slug: "ui-ux",
    description:
      "We design intuitive, visually engaging interfaces that combine creativity and strategy — enhancing user satisfaction and ensuring seamless interaction across every digital touchpoint.",
  },
  {
    image: "/logos/business-process-automation.png",
    title: "Business Process Automation",
    slug: "business-process-automation",
    description:
      "Streamline operations with intelligent automation solutions. We simplify workflows, cut manual tasks, and boost overall business efficiency and speed.",
  },
  {
    image: "/logos/software-quality-assurance.png",
    title: "Software Quality Assurance",
    slug: "sqa",
    description:
      "Ensure reliability through advanced QA testing services. We deliver secure, high-quality software that performs efficiently and flawlessly.",
  },
  {
    image: "/logos/LLM-development & training.png",
    title: "LLM Development & Training",
    slug: "llm-development",
    description:
      "Develop tailored Large Language Models that enhance automation, communication, and intelligent business decision-making.",
  },
  {
    image: "/logos/chatbot-development.png",
    title: "Chatbot Development",
    slug: "chatbots",
    description:
      "Engage customers 24/7 through advanced AI-powered chatbots that manage support, queries, and lead generation with smart precision.",
  },
  {
    image: "/logos/AI & generative-solutions.png",
    title: "AI & Generative Solutions",
    slug: "ai",
    description:
      "Empower your business with powerful AI-driven innovation. We deliver smart, generative solutions for automation, insights, and sustainable growth.",
  },
];
const Infintecards = [
  {
    image: "/services-images/web-infinite/image-1.png",
    title: "Requirement Analysis",
    description:
      "Identify business goals and use cases for chatbot implementation.",
  },
  {
    image: "/services-images/chatbot-infinite/image-2.png",
    title: "Conversation Design",
    description: "Create structured chat flows and interaction models.",
  },
  {
    image: "/services-images/bpa-infinite/image-3.png",
    title: "Development & Training",
    description: "Build the bot with AI, NLP, and custom logic",
  },
  {
    image: "/services-images/chatbot-infinite/image-4.png",
    title: "Integration",
    description: "Connect with CRM, social channels, and internal systems.",
  },
];

function page() {
  return (
    <>
      <TransparentNavbar />

      {/* <AnimatedHeroSection
        heading="Chatbot Development"
        description="We create smart conversational bots that streamline customer service, boost efficiency, and drive business growth across digital platforms."
        contentAlignment="center"
        height="h-[550px]"
      /> */}

      <ChatBotHero/>

      <TwoSectionCTA
        tagline="Chatbot Development"
        heading="Boost Engagement, Automate Support, Deliver Real-Time Help"
        description="At Aptagon Technologies, we transform the way businesses communicate by developing intelligent chatbot solutions that automate interactions, streamline support, and enhance customer experiences. Our AI-powered chatbots integrate seamlessly with your platforms providing instant, accurate, and personalized responses 24/7. From lead generation to customer service automation, we build chatbots that not only engage users but also optimize operations, reduce response time, and strengthen customer relationships."
        imageSrc="/services-images/chatbot.jpg"
        buttonLink="/reach-us"
      />

      <FeatureSection
        heading="Smart Chatbot Solutions for Every Business Need"
        description="From customer service to lead generation, we create intelligent bots that automate workflows and improve user experience."
        cards={cardsData}
      />

      <CoreTechnologies />

      <section className="py-10 bg-white dark:bg-[#1a1a1a] transition-colors duration-300">
        <InfiniteMovingCards
          cards={Infintecards}
          speed={60}
          heading="Our Chatbot Development Process"
          subheading="We follow a structured, AI-driven approach to design and deploy intelligent chatbots tailored to your business needs."
        />
      </section>

      <Footer />
    </>
  );
}

export default page;
