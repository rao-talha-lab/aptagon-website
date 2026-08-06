"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  HiOutlineCog,
  HiOutlineRefresh,
  HiOutlineTrendingUp,
  HiOutlineLightningBolt
} from "react-icons/hi";

// --- Interfaces ---
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  glow: number;
}

interface AnimatedHeroSectionProps {
  tagline?: string;
  heading?: string;
  description?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaHref?: string;
  height?: string;
}

// --- Internal Components ---
const TypewriterEffect = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-[#335ECE]">
      {`${words[index].substring(0, subIndex)}`}
      <span className={`inline-block w-1 h-10 md:h-14 ml-2 bg-[#666666] align-middle ${blink ? 'opacity-100' : 'opacity-0'}`} />
    </span>
  );
};

// --- Smart Automation Pipeline (Right Side Replacement) ---
const pipelineSteps = [
  {
    id: "01",
    title: "Capture Input",
    desc: "Forms · API · Email",
    icon: "/hero-right/captureinput.svg",
  },
  {
    id: "02",
    title: "Process & Validate",
    desc: "Rules engine",
    icon: "/hero-right/process.svg",
  },
  {
    id: "03",
    title: "Route Decisions",
    desc: "Conditional logic",
    icon: "/hero-right/route.svg",
  },
  {
    id: "04",
    title: "Deliver Output",
    desc: "CRM · Slack · DB",
    icon: "/hero-right/deliver.svg",
  },
];

const SmartAutomation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: -5 }}
      transition={{ duration: 1.2 }}
      className="hidden lg:flex flex-1 items-center justify-center self-center pt-7"
    >
      <div className="w-full max-w-[450px] bg-[#FAFAFA] rounded-[22px] p-6  shadow-[0_4px_15px_rgba(51,94,206,0.2)]">

        {/* Heading */}
        <p className="text-[#666666] text-[12px] tracking-widest font-bold uppercase mt-1">
          Workflow
        </p>

        <h2 className="text-[20px] leading-[28px] font-bold text-[#335ECE] mb-4">
          Automated Pipeline
        </h2>

        {/* Steps */}
        <div className="space-y-2.5">
          {pipelineSteps.map((item) => (
            <div
              key={item.id}
              className="bg-[#002892]/5 rounded-[14px] px-4 py-3 flex items-center justify-between"
            >
              {/* Left Side */}
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="w-[38px] h-[38px] rounded-[10px] bg-[#335ECE]/20 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={18}
                    height={18}
                    className="object-contain filter-[brightness(0)_saturate(100%)_invert(31%)_sepia(87%)_saturate(1676%)_hue-rotate(210deg)_brightness(94%)_contrast(91%)]"
                  />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-[13px] font-semibold text-[#335ECE] mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#666666]">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Number */}
              <p className="text-[16px] font-bold text-[#335ECE]">
                {item.id}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {/* Card 1 */}
          <div className="bg-[#FFFFFF] rounded-[14px] py-3.5 flex flex-col items-center justify-center shadow-[0_4px_18px_rgba(0,0,0,0.05)]">
            <h2 className="text-[18px] font-bold text-[#335ECE] mb-0.5">
              80%
            </h2>
            <p className="text-[10px] tracking-[0.5px] text-[#666666] uppercase">
              Time Saved
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FFFFFF] rounded-[14px] py-3.5 flex flex-col items-center justify-center shadow-[0_4px_18px_rgba(0,0,0,0.05)]">
            <h2 className="text-[18px] font-bold text-[#335ECE] mb-0.5">
              24/7
            </h2>
            <p className="text-[10px] tracking-[0.5px] text-[#666666] uppercase">
              Uptime
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

const BusinessHero: React.FC<AnimatedHeroSectionProps> = ({
  description = "Streamlining workflows and automating repetitive tasks to boost productivity and reduce costs.",
  height = "min-h-screen",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const handleExploreClick = () => {
    window.dispatchEvent(new CustomEvent("openNavbarDropdown"));
  };

  // --- Background Particles Logic ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 100;
    const connectionDistance = 200;
    const mouseRadius = 300;
    const themeColors = { primary: "#0EBAB0" };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 3 + 1.5,
          opacity: Math.random() * 0.5 + 0.3,
          glow: 0,
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          p.x -= dx * force * 0.04;
          p.y -= dy * force * 0.04;
          p.glow = Math.min(force, 1);
        } else {
          p.glow *= 0.85;
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative z-30 shadow-[0_5px_15px_rgba(0,0,0,0.05)]">


      <section className={`relative flex items-center overflow-hidden bg-[#FFFFFF] dark:bg-[#0a0a0a] ${height}`}>
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />
        <div className="relative lg:mt-20 z-10 container mx-auto px-2 pt-20 lg:pt-10 pb-3 lg:pb-10">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="px-1 flex-1 max-w-3xl text-left">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-3 text-[#666666] font-semibold font-['Poppins'] tracking-wide text-[15px]">
                Business Process Automation
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-[50px] font-black text-[#666666] dark:text-white mb-6 leading-[1.25] tracking-tighter">
                Optimizing <br /> Operations With <br />
                <TypewriterEffect words={[

                  "Digital Transformation",
                  "Smart Automation",
                  "Agile Project Execution",

                ]} />
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[20px] text-[#666666] dark:text-slate-400 mb-10 leading-tight font-['Poppins'] font-medium">
                {description}
              </motion.p>

              {/* --- Buttons Section --- */}
              <div className="flex flex-wrap gap-4">
                {/* Explore Services Button */}
                <Link href="/schedule-call">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                    }}
                    className="px-8 h-14 bg-[#335ECE] text-white font-semibold rounded-[10px] shadow-lg lg:shadow-2xl text-s tracking-wide group cursor-pointer"
                  >
                    Let&apos;s Collaborate
                    <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ borderColor: "#335ECE", scale: 1.05 }}
                  onClick={handleExploreClick}
                  className="px-8 h-14 border-[1.5px] border-[#666666] dark:border-white/10 text-[#666666] dark:text-white font-semibold rounded-[10px] text-s hover:text-[#335ECE] tracking-wide cursor-pointer"
                >
                  Explore Services
                </motion.button>
              </div>
            </div>
            <SmartAutomation />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessHero;