import Footer from "@/app/components/Footer";
import TransparentNavbar from "@/app/components/Navbar";
import FeatureSection from "@/app/components/Services-Components/FeatureSection";
import InfiniteMovingCards from "@/app/components/Services-Components/InfiniteServiceCards";
import CoreTechnologies from "@/app/components/CoreTechnologies";
import TwoSectionCTA from "@/app/components/Services-Components/TwoSectionCTA";
import React from "react";
import AiHero from "./AiHero";

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
    image: "/services-images/ai-infinite/image-1.svg",
    title: "Strategy & AI Roadmap",
    description: "Identify high-impact AI use cases and define clear technical objectives.",
  },
  {
    image: "/services-images/ai-infinite/image-2.svg",
    title: "Data Engineering",
    description:
      "Acquire and refine high-quality datasets to ensure model accuracy and ethics.",
  },
  {
    image: "/services-images/ai-infinite/image-3.svg",
    title: "Model Architecture",
    description: "Design bespoke neural networks and algorithms tailored to your industry.",
  },
  {
    image: "/services-images/ai-infinite/image-4.svg",
    title: "Fine-Tuning & Validation",
    description: "Optimize AI model performance through rigorous training and feedback loops.",
  },
];

function page() {
  return (
    <>
      <TransparentNavbar />
      <AiHero />
      <TwoSectionCTA
        tagline="AI & Generative Solutions"
        heading="Unlock Creativity, Automate Content, and Drive Next-Generation Innovation"
        description={[
          "At Aptagon Technologies, we help businesses harness Artificial Intelligence and Generative AI to innovate, automate, and scale. Our AI-powered solutions integrate seamlessly into business operations, transforming complex processes into smarter, faster, and more efficient workflows. From custom AI models and LLM applications to NLP systems and generative solutions, we build intelligent technologies that analyze, create, and optimize with precision. The result is greater efficiency, improved accuracy, lower operational costs, and scalable growth. Whether automating workflows or developing next-generation AI products, we deliver intelligent solutions that turn innovation into measurable business value."
        ]}
        imageSrc="/services-images/ai.png"
        buttonText="Get Started"
        buttonLink="/schedule-call"
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
          speed={60}
          heading="Our AI Development Lifecycle"
          subheading="We follow a strategic, data-centric approach to design, train, and deploy generative models that deliver tangible business value and innovation."
        />
      </section>
      <Footer />
    </>
  );
}

export default page;