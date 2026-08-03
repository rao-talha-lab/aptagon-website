import Footer from "@/app/components/Footer";
import AnimatedHeroSection from "@/app/components/Herosection";
import TransparentNavbar from "@/app/components/Navbar";
import FeatureSection from "@/app/components/Services-Components/FeatureSection";
import InfiniteMovingCards from "@/app/components/Services-Components/InfiniteServiceCards";
import CoreTechnologies from "@/app/components/CoreTechnologies";
import TwoSectionCTA from "@/app/components/Services-Components/TwoSectionCTA";
import React from "react";
import MobileHero from "./MobileHero";

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

const InfiniteCards = [
  {
    image: "/services-images/mobile-infinite/image-1.svg",
    title: "Requirement Analysis",
    description:
      "Understanding user needs, business goals, and platform requirements.",
  },
  {
    image: "/services-images/mobile-infinite/image-2.svg",
    title: "UI/UX Design",
    description:
      "Designing intuitive user flows, wireframes, and interactive prototypes.",
  },
  {
    image: "/services-images/mobile-infinite/image-3.svg",
    title: "App Development",
    description:
      "Building scalable Android & iOS apps using modern frameworks.",
  },
  {
    image: "/services-images/mobile-infinite/image-4.svg",
    title: "Testing & QA",
    description: "Ensuring performance, security, and device compatibility.",
  },
];

function Page() {
  return (
    <>
      <TransparentNavbar />

      {/* <AnimatedHeroSection
        heading="Mobile App Development"
        description="Transforming ideas into scalable, secure, and high performance mobile applications."
        contentAlignment="center"
        height="h-[550px]"
      /> */}

      <MobileHero/>

      <TwoSectionCTA
        tagline="Custom Mobile App Development"
        heading="Build Powerful, Scalable, and User Focused Mobile Applications"
        description="We design and develop high-performance mobile applications that are strategically tailored to your unique business goals and user needs. From initial concept ideation and intuitive UI/UX design to robust development, rigorous testing, and smooth deployment, we manage the entire mobile app lifecycle with precision and care. Our solutions are engineered to deliver seamless, engaging user experiences, optimized performance, and long-term scalability—ensuring your application not only meets today’s demands but also grows effortlessly with your business in the future."
        imageSrc="/services-images/mobile-app-development.png"
        buttonLink="/reach-us"
      />

      <FeatureSection
        heading="Top Custom Software Development Services"
        description="Aptagon Technologies transforms your vision into powerful, scalable software solutions that drive innovation and deliver real business impact."
        cards={cardsData}
      />

      <CoreTechnologies />

      <section className="py-10 bg-white dark:bg-[#1a1a1a] transition-colors duration-300">
        <InfiniteMovingCards
          cards={InfiniteCards}
          speed={60}
          heading="Our App Development Process"
          subheading="We follow a streamlined, agile approach to design, develop, and launch mobile apps that perform seamlessly on every device."
        />
      </section>

      <Footer />
    </>
  );
}

export default Page;
