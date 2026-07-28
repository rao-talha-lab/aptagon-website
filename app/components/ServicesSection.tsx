"use client";
import React from 'react';
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

// ─────────────────────────────────────────────
//  SERVICE CARD ICONS
// ─────────────────────────────────────────────

function BPAIcon({ active }: { active: boolean }) {
  return (
    <Image src="/services-images/services-icons/bpa.png" alt="Business Process Automation" width={48} height={48} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
  );
}

function UIUXIcon({ active }: { active: boolean }) {
  return (
    <Image src="/services-images/services-icons/uiux.png" alt="UI/UX Designing" width={48} height={48} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
  );
}

function ChatbotIcon({ active }: { active: boolean }) {
  return (
    <Image src="/services-images/services-icons/chatbot.png" alt="Chatbot Development" width={48} height={48} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
  );
}

function SQAIcon({ active }: { active: boolean }) {
  return (
    <Image src="/services-images/services-icons/sqa.png" alt="Software Quality Assurance" width={48} height={48} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
  );
}

function WebDevIcon({ active }: { active: boolean }) {
  return (
    <Image src="/services-images/services-icons/webdev.png" alt="Web Development" width={48} height={48} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
  );
}

function AIGenIcon({ active }: { active: boolean }) {
  return (
    <Image src="/services-images/services-icons/aigen.png" alt="AI & Generative Solutions" width={48} height={48} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
  );
}

// ─────────────────────────────────────────────
//  TOOL LOGOS
// ─────────────────────────────────────────────

const ZapierLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><path d="M22 4v36M4 22h36M7.5 7.5l29 29M36.5 7.5l-29 29" stroke="#FF4A00" strokeWidth="4.5" strokeLinecap="round" /></svg>;
const UiPathLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><rect width="44" height="44" rx="7" fill="#FA4616" /><text x="8" y="31" fontSize="19" fontWeight="700" fill="white" fontFamily="Arial,sans-serif">Ui</text></svg>;
const MakeLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><rect width="44" height="44" rx="7" fill="#6D00CC" /><path d="M9 15h26M9 22h26M9 29h26" stroke="white" strokeWidth="3.2" strokeLinecap="round" /></svg>;
const AsanaLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><circle cx="22" cy="14" r="8.5" fill="#F06A6A" /><circle cx="10" cy="30" r="8.5" fill="#F06A6A" /><circle cx="34" cy="30" r="8.5" fill="#F06A6A" /></svg>;
const JiraLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><rect width="44" height="44" rx="7" fill="#0052CC" /><path d="M22 6L36 22L22 38L15 31L25 22L15 13Z" fill="white" opacity="0.4" /><path d="M22 6L8 22L22 38L29 31L19 22L29 13Z" fill="white" /></svg>;
const TrelloLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><rect width="44" height="44" rx="7" fill="#0079BF" /><rect x="8" y="8" width="12" height="24" rx="2.5" fill="white" /><rect x="24" y="8" width="12" height="17" rx="2.5" fill="white" /></svg>;
const FigmaLogo = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M142 159.8C142 106.9 184.9 64 237.8 64L402.2 64C455.1 64 498 106.9 498 159.8C498 193.3 480.8 222.8 454.8 239.9C480.8 257 498 286.5 498 320C498 372.9 455.1 415.8 402.2 415.8L400.1 415.8C375.3 415.8 352.7 406.4 335.7 390.9L335.7 479.2C335.7 532.8 291.7 576 238.3 576C185.5 576 142 533.2 142 480.2C142 446.7 159.2 417.2 185.2 400.1C159.2 383 142 353.5 142 320C142 286.5 159.2 257 185.2 239.9C159.2 222.8 142 193.3 142 159.8zM304.3 255.6L237.8 255.6C202.2 255.6 173.4 284.4 173.4 320C173.4 355.4 202 384.2 237.4 384.4L304.3 384.4L304.3 255.6zM335.7 320C335.7 355.6 364.5 384.4 400.1 384.4L402.2 384.4C437.8 384.4 466.6 355.6 466.6 320C466.6 284.4 437.8 255.6 402.2 255.6L400.1 255.6C364.5 255.6 335.7 284.4 335.7 320zM237.8 415.8L237.4 415.8C202 416 173.4 444.8 173.4 480.2C173.4 515.6 202.6 544.6 238.3 544.6C274.6 544.6 304.3 515.2 304.3 479.1L304.3 415.7L237.8 415.7zM237.8 95.4C202.2 95.4 173.4 124.2 173.4 159.8C173.4 195.4 202.2 224.2 237.8 224.2L304.3 224.2L304.3 95.4L237.8 95.4zM335.7 224.2L402.2 224.2C437.8 224.2 466.6 195.4 466.6 159.8C466.6 124.2 437.8 95.4 402.2 95.4L335.7 95.4L335.7 224.2z" /></svg>;
const AdobeXDLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><rect width="44" height="44" rx="7" fill="#470137" /><text x="7" y="30" fontSize="16" fontWeight="700" fill="#FF61F6" fontFamily="Arial,sans-serif">XD</text></svg>;
const SketchLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><circle cx="22" cy="22" r="22" fill="#F7B500" /><polygon points="22,7 35,16 30,33 14,33 9,16" fill="white" opacity="0.93" /></svg>;
const ZeplinLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><circle cx="22" cy="22" r="22" fill="#FDBD39" /><text x="12" y="30" fontSize="22" fontWeight="700" fill="white" fontFamily="Arial,sans-serif">Z</text></svg>;
const InVisionLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><circle cx="22" cy="22" r="22" fill="#FF3366" /><text x="11" y="30" fontSize="17" fontWeight="700" fill="white" fontFamily="Arial,sans-serif">In</text></svg>;
const MazeLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><rect width="44" height="44" rx="9" fill="#7C4DFF" /><path d="M10 22h10v-10h14v20H20v-10H10z" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const SeleniumLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><circle cx="22" cy="22" r="22" fill="#43B02A" /><text x="8" y="29" fontSize="14" fontWeight="700" fill="white" fontFamily="Arial,sans-serif">Se</text></svg>;
const JestLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><circle cx="22" cy="22" r="22" fill="#C21325" /><text x="7" y="29" fontSize="13" fontWeight="700" fill="white" fontFamily="Arial,sans-serif">Jest</text></svg>;
const CypressLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><circle cx="22" cy="22" r="22" fill="#1B1E2E" /><circle cx="22" cy="22" r="10" stroke="#69D3A7" strokeWidth="2.5" fill="none" /><circle cx="22" cy="22" r="4" fill="#69D3A7" /></svg>;
const PostmanLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><circle cx="22" cy="22" r="22" fill="#FF6C37" /><circle cx="22" cy="22" r="11" fill="white" opacity="0.9" /><circle cx="22" cy="22" r="5" fill="#FF6C37" /></svg>;
const TestRailLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><rect width="44" height="44" rx="9" fill="#65C179" /><path d="M10 22l8 8 16-16" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const BrowserStackLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><circle cx="22" cy="22" r="22" fill="#FF6C37" /><circle cx="22" cy="22" r="12" fill="white" /><circle cx="22" cy="22" r="6" fill="#FF6C37" /><circle cx="22" cy="22" r="2.5" fill="white" /></svg>;
const ReactLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><circle cx="22" cy="22" r="22" fill="#20232A" /><ellipse cx="22" cy="22" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="2" /><ellipse cx="22" cy="22" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="2" transform="rotate(60 22 22)" /><ellipse cx="22" cy="22" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="2" transform="rotate(120 22 22)" /><circle cx="22" cy="22" r="3" fill="#61DAFB" /></svg>;
const NextjsLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><circle cx="22" cy="22" r="22" fill="#000" /><path d="M13 30V16l20 20h-5.5L13 20v10z" fill="white" /><path d="M28.5 16h4.5v12" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const NodeLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><circle cx="22" cy="22" r="22" fill="#339933" /><text x="7" y="27" fontSize="12" fontWeight="700" fill="white" fontFamily="Arial,sans-serif">Node</text></svg>;
const TypeScriptLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><rect width="44" height="44" rx="5" fill="#3178C6" /><text x="8" y="30" fontSize="16" fontWeight="700" fill="white" fontFamily="Arial,sans-serif">TS</text></svg>;
const TailwindLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><rect width="44" height="44" rx="9" fill="#06B6D4" /><path d="M10 22c2-9 8-12 12-10s6 10 4 14c3-9 9-12 13-10" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" /></svg>;
const MongoLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><rect width="44" height="44" rx="9" fill="#47A248" /><path d="M22 8v28" stroke="white" strokeWidth="3" strokeLinecap="round" /><path d="M22 8c-7 6-8 17 0 21" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" /><path d="M22 8c7 6 8 17 0 21" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.55" /></svg>;
const OpenAILogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><circle cx="22" cy="22" r="22" fill="#1A1A1A" /><path d="M22 10a12 12 0 00-9 20M22 34a12 12 0 009-20M10 15.5l24 13M10 28.5l24-13M22 10v24" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" /></svg>;
const AnthropicLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><circle cx="22" cy="22" r="22" fill="#CC785C" /><text x="13" y="30" fontSize="22" fontWeight="700" fill="white" fontFamily="Georgia,serif">A</text></svg>;
const LangChainLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><rect width="44" height="44" rx="9" fill="#1C3C3C" /><path d="M8 22h7l5-10 6 20 5-10h5" stroke="#00D4AA" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const HuggingFaceLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><circle cx="22" cy="22" r="22" fill="#FFD21E" /><circle cx="16.5" cy="19.5" r="3" fill="#333" /><circle cx="27.5" cy="19.5" r="3" fill="#333" /><path d="M14.5 28c2 4 13 4 15 0" stroke="#333" strokeWidth="2.2" fill="none" strokeLinecap="round" /><path d="M14 15c0-3 3-4.5 5-3" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M30 15c0-3-3-4.5-5-3" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>;
const PineconeLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><circle cx="22" cy="22" r="22" fill="#000" /><path d="M22 8l9 14-9 14-9-14z" fill="#00C4B4" /><circle cx="22" cy="22" r="4" fill="#000" /></svg>;
const ReplicateLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><circle cx="22" cy="22" r="22" fill="#000" /><rect x="11" y="11" width="11" height="11" rx="2.5" fill="white" /><rect x="23" y="23" width="11" height="11" rx="2.5" fill="white" opacity="0.5" /><rect x="23" y="11" width="11" height="11" rx="2.5" fill="white" opacity="0.25" /></svg>;
const DialogflowLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><circle cx="22" cy="22" r="22" fill="#FF6D00" /><path d="M12 30l4-14h12l4 14H12z" fill="white" opacity="0.9" /><path d="M16 30l2-7h8l2 7" fill="#FF6D00" /><circle cx="22" cy="19" r="2.8" fill="white" /></svg>;
const RasaLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><rect width="44" height="44" rx="8" fill="#5A17EE" /><text x="9" y="30" fontSize="16" fontWeight="700" fill="white" fontFamily="Arial,sans-serif">Ra</text></svg>;
const BotpressLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><rect width="44" height="44" rx="8" fill="#1B9EDB" /><rect x="9" y="14" width="26" height="18" rx="4" fill="white" opacity="0.95" /><circle cx="17" cy="23" r="2.5" fill="#1B9EDB" /><circle cx="27" cy="23" r="2.5" fill="#1B9EDB" /><path d="M17 10v4M27 10v4" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>;
const IntercomLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><rect width="44" height="44" rx="8" fill="#1F8DED" /><rect x="9" y="9" width="26" height="20" rx="3" fill="white" opacity="0.95" /><path d="M13 32l4-3h14" stroke="white" strokeWidth="2.2" strokeLinecap="round" /><path d="M14 15h16M14 20h16M14 25h10" stroke="#1F8DED" strokeWidth="2" strokeLinecap="round" /></svg>;
const DriftLogo = () => <svg viewBox="0 0 44 44" className="w-full h-full" fill="none"><circle cx="22" cy="22" r="22" fill="#173AC3" /><path d="M12 29c0-6 4-11 10-11s10 5 10 11H12z" fill="white" opacity="0.9" /><circle cx="22" cy="17" r="3.2" fill="white" /></svg>;

// ─────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────

const SERVICES = [
  {
    id: 1,
    line1: "Business Process", line2: "Automation",
    titleBold: "Business Process", titleTeal: "Automation",
    slug: "/services/business-process-automation",
    buttonLabel: "Explore More",
    Icon: BPAIcon,
    description: "Cut manual work, reduce errors, and speed up operations with automation built around how your business actually runs.",
    tools: [
      { name: "Zapier", Logo: ZapierLogo },
      { name: "UiPath", Logo: UiPathLogo },
      { name: "Make", Logo: MakeLogo },
      { name: "Asana", Logo: AsanaLogo },
      { name: "Jira", Logo: JiraLogo },
      { name: "Trello", Logo: TrelloLogo },
    ],
  },
  {
    id: 2,
    line1: "UI/UX", line2: "Designing",
    titleBold: "UI/UX", titleTeal: "Designing",
    slug: "/services/ui-ux",
    buttonLabel: "Explore More",
    Icon: UIUXIcon,
    description: "Craft intuitive, user-friendly interfaces that engage and delight users. We combine beautiful design with seamless usability to create exceptional digital experiences.",
    tools: [
      { name: "Figma", Logo: FigmaLogo },
      { name: "Adobe XD", Logo: AdobeXDLogo },
      { name: "Sketch", Logo: SketchLogo },
      { name: "Zeplin", Logo: ZeplinLogo },
      { name: "InVision", Logo: InVisionLogo },
      { name: "Maze", Logo: MazeLogo },
    ],
  },
  {
    id: 3,
    line1: "Chatbot", line2: "Development",
    titleBold: "Chatbot", titleTeal: "Development",
    slug: "/services/chatbots",
    buttonLabel: "Explore More",
    Icon: ChatbotIcon,
    description: "Build intelligent chatbots that engage customers 24/7. From instant support to AI-powered conversations, we create bots that boost engagement and drive conversions.",
    tools: [
      { name: "Dialogflow", Logo: DialogflowLogo },
      { name: "Rasa", Logo: RasaLogo },
      { name: "OpenAI", Logo: OpenAILogo },
      { name: "Botpress", Logo: BotpressLogo },
      { name: "Intercom", Logo: IntercomLogo },
      { name: "Drift", Logo: DriftLogo },
    ],
  },
  {
    id: 4,
    line1: "Software Quality", line2: "Assurance",
    titleBold: "Software Quality", titleTeal: "Assurance",
    slug: "/services/sqa",
    buttonLabel: "Explore More",
    Icon: SQAIcon,
    description: "Deliver reliable, bug-free software with comprehensive quality assurance. We identify issues early, improve performance, and ensure every release is production-ready.",
    tools: [
      { name: "Selenium", Logo: SeleniumLogo },
      { name: "Jest", Logo: JestLogo },
      { name: "Cypress", Logo: CypressLogo },
      { name: "Postman", Logo: PostmanLogo },
      { name: "TestRail", Logo: TestRailLogo },
      { name: "BrowserStack", Logo: BrowserStackLogo },
    ],
  },
  {
    id: 5,
    line1: "Web", line2: "Development",
    titleBold: "Web", titleTeal: "Development",
    slug: "/services/web-development",
    buttonLabel: "Explore More",
    Icon: WebDevIcon,
    description: "Build fast, scalable, and modern web applications tailored to your business. From landing pages to complex platforms, we build reliable solutions that drive growth.",
    tools: [
      { name: "React", Logo: ReactLogo },
      { name: "Next.js", Logo: NextjsLogo },
      { name: "Node.js", Logo: NodeLogo },
      { name: "TypeScript", Logo: TypeScriptLogo },
      { name: "Tailwind", Logo: TailwindLogo },
      { name: "MongoDB", Logo: MongoLogo },
    ],
  },
  {
    id: 6,
    line1: "AI & Generative", line2: "Solutions",
    titleBold: "AI & Generative", titleTeal: "Solutions",
    slug: "/services/ai",
    buttonLabel: "Explore More",
    Icon: AIGenIcon,
    description: "Harness the power of generative AI to transform your business. From LLM integration to custom AI workflows, we build intelligent solutions that automate, adapt, and scale.",
    tools: [
      { name: "OpenAI", Logo: OpenAILogo },
      { name: "Anthropic", Logo: AnthropicLogo },
      { name: "LangChain", Logo: LangChainLogo },
      { name: "HuggingFace", Logo: HuggingFaceLogo },
      { name: "Pinecone", Logo: PineconeLogo },
      { name: "Replicate", Logo: ReplicateLogo },
    ],
  },
];

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────

export default function ServicesSection() {
  const [activeId, setActiveId] = useState(1);
  const active = SERVICES.find((s) => s.id === activeId)!;

  return (
    <section className="w-full py-14 px-4 sm:px-8 lg:pl-12 lg:pr-20" style={{ backgroundColor: "#335ECE1A" }}>
      <div className="max-w-[1440px] mx-auto">

        {/* ── HEADER ─────────────────────────────────────── */}
        <h2
          className="text-3xl sm:text-4xl lg:text-[40px] font-inter font-bold tracking-tight mb-3"
          style={{ color: "#335ECE" }}
        >
          Delivering Excellence Through Our Services
        </h2>

        <p
          className="text-[15px] sm:text-[14px] font-inter font-medium leading-relaxed mb-10"
          style={{ color: "#666666", maxWidth: "600px" }}
        >
          From custom software development to AI-driven automation, we create
          solutions that move your business forward.
        </p>

        {/* ── BODY ───────────────────────────────────────── */}

        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-10">

          {/* LEFT — 3×2 card grid */}
          <div className="w-full lg:w-[48%] shrink-0">
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {SERVICES.map((svc) => {
                const isActive = svc.id === activeId;
                return (
                  <button
                    key={svc.id}
                    onClick={() => setActiveId(svc.id)}
                    className="flex flex-col items-center cursor-pointer justify-center rounded-xl transition-all duration-200 focus:outline-none"
                    style={{
                      backgroundColor: "white",
                      paddingTop: "26px",
                      paddingBottom: "26px",
                      paddingLeft: "12px",
                      paddingRight: "12px",
                      gap: "12px",
                      border: isActive ? "2px solid #335ECE" : "2px solid transparent",
                      boxShadow: isActive
                        ? "0 4px 18px rgba(13,158,150,0.13)"
                        : "0 1px 6px rgba(0,0,0,0.07)",
                    }}
                  >
                    <svc.Icon active={isActive} />
                    <span
                      className="text-[13px] sm:text-[14px] font-inter font-bold text-center"
                      style={{ color: "#666666", lineHeight: "1.35" }}
                    >
                      {svc.line1}
                      <br />
                      {svc.line2}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT — detail panel (Safe margin added from right screen edge) */}
          <div className="w-full lg:w-[48%] flex flex-col pt-0 lg:pr-6">

            {/* Title */}
            <h3
              className="text-2xl sm:text-[32px] font-extrabold leading-tight mb-4 mt-0"
              style={{ color: "#335ECE" }}
            >
              {active.titleBold}{" "}
              <span style={{ color: "#666666" }}>{active.titleTeal}</span>
            </h3>

            {/* Description */}
            <p
              className="text-[15px] sm:text-[17px] font-inter font-medium leading-relaxed mb-8 max-w-[500px]"
              style={{ color: "#666666" }}
            >
              {active.description}
            </p>

            {/* Tool logos */}
            <div className="flex items-center flex-wrap gap-4 mb-8 max-w-[480px]">
              {active.tools.map((tool) => (
                <div
                  key={tool.name}
                  title={tool.name}
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-110"
                >
                  <tool.Logo />
                </div>
              ))}
            </div>

            {/* CTA button */}
            <motion.a
              href={active.slug}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group relative flex items-center justify-center overflow-hidden rounded-xl px-9 py-3.5 text-[16px] font-semibold text-white shadow-md transition-all self-start bg-[#355ECE]"
            >
              <span className="relative z-10">{active.buttonLabel}</span>
            </motion.a>

          </div>
        </div>

      </div>
    </section>
  );
}