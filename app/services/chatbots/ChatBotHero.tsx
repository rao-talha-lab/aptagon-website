"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// --- Typewriter Component ---
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
    const timeout = setTimeout(
      () => setSubIndex((prev) => prev + (reverse ? -1 : 1)),
      reverse ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-[#335ECE]">
      {`${words[index].substring(0, subIndex)}`}
      <span
        className={`inline-block w-1 h-10 md:h-14 ml-2 bg-[#666666] align-middle ${blink ? "opacity-100" : "opacity-0"
          }`}
      />
    </span>
  );
};

// --- Counter Component ---
const Counter = ({
  target,
  duration = 2,
  suffix = "",
}: {
  target: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = duration * 60;
    const counter = setInterval(() => {
      frame++;
      setCount(Math.floor(target * (frame / totalFrames)));
      if (frame === totalFrames) clearInterval(counter);
    }, 1000 / 60);
    return () => clearInterval(counter);
  }, [target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

// --- Particle Type ---
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  glow: number;
}

// --- Aptagon Chatbot Component ---
const AptagonChatbot = () => {
  const [input, setInput] = useState("");

  return (
    <div className="flex items-center justify-center w-full h-full py-10 lg:py-0">
      <div className="relative flex items-center justify-center w-full max-w-[500px]">
        {/* Main Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-[400px] xs:w-[430px] max-w-full h-[400px] bg-[#FFFFFF] rounded-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.10)] relative flex flex-col"
        >
          {/* Header Section */}
          <div className="bg-[#335ECE] p-4 flex items-center gap-3 rounded-t-[27px] flex-shrink-0">
            <div className="w-10 h-10 bg-[#FFFFFF] rounded-full flex items-center justify-center shadow-inner overflow-hidden">
              <Image
                src="/hero-right/mainAiicon.svg"
                alt="Aptagon Assistant"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-[#FFFFFF] text-[16px] font-bold tracking-wide">
                Aptagon AI Assistant
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-[#0EBAB0] rounded-full animate-pulse"></span>
                <p className="text-[#FFFFFF] text-[10px] font-medium tracking-wider">
                  Online • GPT-powered
                </p>
              </div>
            </div>
          </div>

          {/* Messages Section */}
          <div className="flex-initial p-4 space-y-4 overflow-y-auto pb-2 overflow-x-hidden">
            {/* Bot Greeting */}
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 bg-[#335ECE]/5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 overflow-hidden">
                <Image
                  src="/hero-right/Aisubheading.svg"
                  alt="Bot"
                  width={16}
                  height={16}
                  className="object-contain opacity-80"
                />
              </div>
              <div className="bg-[#335ECE]/5 text-[#335ECE] text-[12.5px] font-medium py-2.5 px-3.5 rounded-[18px] rounded-tl-sm max-w-[80%] leading-relaxed">
                Hi! How can I help your business today?
              </div>
            </div>

            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-gradient-to-r from-[#335ECE] to-[#132B68] text-[#FFFFFF] text-[12.5px] font-medium py-2.5 px-4 rounded-[18px] rounded-tr-sm max-w-[80%] leading-relaxed">
                Show me last month&apos;s sales report.
              </div>
            </div>

            {/* Bot Card Response */}
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 bg-[#335ECE]/5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 overflow-hidden">
                <Image
                  src="/hero-right/Aisubheading.svg"
                  alt="Bot"
                  width={16}
                  height={16}
                  className="object-contain opacity-80"
                />
              </div>

              {/* October Sales Card */}
              <div className="bg-[#335ECE]/5 p-3 rounded-[20px] w-[145px] flex-shrink-0 overflow-hidden">
                <div className="flex items-center gap-1.5 text-[#335ECE] mb-2.5 w-full">
                  <span className="text-[10.5px] font-bold tracking-wide whitespace-nowrap block truncate">
                    📊 October Sales
                  </span>
                </div>
                <div className="flex gap-1.5 justify-center w-full">
                  <div className="bg-[#FFFFFF] rounded-lg flex-1 h-[58px] flex flex-col items-center justify-center border border-gray-100 min-w-0">
                    <p className="text-[#335ECE] font-extrabold text-[11.5px] leading-tight">
                      $48k
                    </p>
                    <span className="text-[#666666] text-[8px] block font-bold mt-1">
                      Revenue
                    </span>
                  </div>
                  <div className="bg-[#FFFFFF] rounded-lg flex-1 h-[58px] flex flex-col items-center justify-center border border-gray-100 min-w-0">
                    <p className="text-[#335ECE] font-extrabold text-[11.5px] leading-tight">
                      +22%
                    </p>
                    <span className="text-[#666666] text-[8px] block font-bold mt-1">
                      Growth
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Input Box Area */}
          <div className="pr-4 pl-4 pb-6 mt-[4px] bg-[#FFFFFF] rounded-b-[20px] relative flex-shrink-0">
            <div className="relative flex items-center bg-[#FFFFFF] border border-[#335ECE] rounded-[24px] px-3.5 py-3 shadow-sm">
              <input
                type="text"
                placeholder="Ask anything........."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-transparent text-[10px] font-medium text-[#335ECE] placeholder-[#335ECE] outline-none pr-12"
              />
              <button className="absolute right-3 w-7 h-7 bg-[#335ECE] text-[#FFFFFF] rounded-full hover:bg-[#0A79AE] transition-all flex items-center justify-center shadow-sm">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Floating Badge */}
            <div className="absolute bottom-[-9px] right-[-10px] sm:right-[-25px] transform translate-y-1/2 bg-[#FFFFFF] rounded-xl px-5 sm:px-8 py-3 sm:py-4 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#073A53]/20 flex items-center gap-2 w-max z-30">
              <Image
                src="/hero-right/Aibadge.svg"
                alt="lightning icon"
                width={16}
                height={16}
                className="object-contain text-[#335ECE]"
              />
              <span className="text-[#666666] text-[10px] font-bold tracking-wide">
                24/7 · Multi-language
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Main Hero ---
const BusinessHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const handleExploreClick = () => {
    window.dispatchEvent(new CustomEvent("openNavbarDropdown"));
  };

  // --- Particle Background ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 100;
    const mouseRadius = 300;

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


      <section className="relative flex items-center overflow-hidden bg-[#FFFFFF] dark:bg-[#0a0a0a] min-h-screen">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 pointer-events-none opacity-40"
        />
        <div className="relative z-10 container mx-auto px-6 ">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Left Content */}
            <div className="flex-1 max-w-3xl text-left lg:mt-10 pt-20 lg:pt-30 pb-5 lg:pb-10">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-3 text-[#666666] font-['Poppins'] font-semibold tracking-wide text-[15px]"
              >
                Chatbot Development
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-[48px] font-black text-[#666666] dark:text-white leading-[1.25] mb-6 tracking-tighter"
              >
                Enhancing <br /> Engagement <br />
                <TypewriterEffect
                  words={[
                    "Powered by AI",
                    "Streamline Operation",
                    "Enterprise Integration",
                  ]}
                />
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[20px] text-[#666666] dark:text-slate-400 mb-10 leading-wide font-medium"
              >
                Designing intelligent chatbots that improve customer interactions, support, and operational efficiency.
              </motion.p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
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
                  className="inline-flex items-center justify-center px-8 h-14 text-[#666666] text-[16px] border-[1.5px] border-[#666666] font-medium font-inter rounded-[10px] hover:text-[#335ECE] transition-all"
                >
                  Explore Services
                </motion.button>
              </div>
            </div>

            {/* Right — Aptagon Chatbot */}
            <div className="flex-1 flex items-center justify-center w-full lg:mt-20 hidden lg:flex">
              <AptagonChatbot />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessHero;