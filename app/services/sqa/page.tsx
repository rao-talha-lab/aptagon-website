import Footer from "@/app/components/Footer";
import AnimatedHeroSection from "@/app/components/Herosection";
import TransparentNavbar from "@/app/components/Navbar";
import FeatureSection from "@/app/components/Services-Components/FeatureSection";
import InfiniteMovingCards from "@/app/components/Services-Components/InfiniteServiceCards";
import CoreTechnologies from "@/app/components/CoreTechnologies";
import TwoSectionCTA from "@/app/components/Services-Components/TwoSectionCTA";
import React from "react";
import SqaHero from "./SqaHero"

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
    image: "/services-images/sqa-infinite/image-1.svg",
    title: "Requirement Analysis",
    description:
      "Understand software objectives, target users, and testing scope.",
  },
  {
    image: "/services-images/sqa-infinite/image-2.svg",
    title: "Test Planning",
    description: "Define strategies, tools, and test cases.",
  },
  {
    image: "/services-images/sqa-infinite/image-3.svg",
    title: "Testing Setup",
    description: "Prepare test data and simulation environments.",
  },
  {
    image: "/services-images/sqa-infinite/image-4.svg",
    title: "Execution & Reporting",
    description: "Conduct manual and automated tests, documenting results.",
  },
];
function page() {
  return (
    <>
      <TransparentNavbar />
      {/* <AnimatedHeroSection
        heading="Software Quality Assurance & Delivery"
        description="Ensuring excellence through continuous testing, quality assurance, and seamless, reliable software delivery."
        contentAlignment="center"
        height="h-[550px]"
      /> */}

      <SqaHero />
      <TwoSectionCTA
        tagline="Software Quality Assurance"
        heading="Build Trust, Minimize Risk, and Deliver Flawless Customer Experiences"
        description="At Aptagon Technologies, we transform how businesses deliver software through advanced QA methodologies and continuous delivery pipelines.
Our solutions integrate seamlessly across the entire SDLC — automating testing 24/7, conducting security audits, and analyzing performance data to ensure every release is reliable, secure, and fast.
Whether it's a mobile app, legacy system, or enterprise cloud solution — we deliver smart, stable, and human-centric software that reduces time-to-market and builds lasting customer trust."
        imageSrc="/services-images/sqa.png"
        buttonLink="/reach-us"
      />
      <FeatureSection
        heading="Comprehensive Quality Assurance & Delivery Services"
        description="From functionality to performance, we ensure your software meets the highest quality standards and delivers exceptional user experiences."
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
