"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// --- Internal Typewriter Component for the Heading ---
const TypewriterEffect = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
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
      <span
        className={`inline-block w-1 h-10 md:h-12 ml-2 bg-[#666666] align-middle ${
          blink ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
};

// --- Floating Tag Sub-Component ---
const FloatingTag = ({ label }: { label: string }) => (
  <div className="relative flex items-center justify-center rounded-full border border-[#335ECE] bg-[#002892]/10 px-3.5 py-1 shadow-sm">
    <span className="text-[9px] font-semibold text-[#335ECE] whitespace-nowrap">
      {label}
    </span>
  </div>
);

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
  alignment?: "left" | "center";
  contentAlignment?: "left" | "center";
  showSearchBar?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
}

const AiHero: React.FC<AnimatedHeroSectionProps> = ({
  tagline = "AI & Generative Solutions",
  description = "Implementing AI-powered solutions to transform business processes and create intelligent digital experiences.",
  height = "min-h-screen",
  alignment = "left",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  // Function to trigger Navbar dropdown via event
  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const event = new CustomEvent("openNavbarDropdown");
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 100;
    const mouseRadius = 300;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

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

  // --- RIGHT SIDE: TECHNOLOGIES CARD ---
  const TechnologiesCard = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="hidden lg:flex items-center justify-center relative w-full max-w-[460px] mx-auto mt-20 lg:mt-10"
    >
      {/* ── SEPARATE FLOATING TAGS CONTAINER (Right Side Stack) ── */}
      <div className="absolute -right-5 top-[170px] flex flex-col gap-2.5 z-30 pointer-events-none">
        <FloatingTag label="RAG" />
        <FloatingTag label="Fine-Tune" />
        <FloatingTag label="Agents" />
      </div>

      {/* ── MAIN CARD CONTAINER ── */}
      <div className="relative w-full bg-[#FFFFFF] rounded-[24px] border border-gray-200/60 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.06)]">
        {/* TOP FLOATING BANNER */}
        <div className="absolute -top-5 -left-1/5 bg-[#FFFFFF] border border-[#073A53]/20 rounded-[12px] px-3.5 py-2 w-[190px] shadow-md flex items-center gap-2.5 z-20">
          <div className="w-9 h-7 rounded-lg bg-[#002892]/10 flex items-center justify-center shrink-0">
            <Image
              src="/hero-right/design.svg"
              alt="sparkles"
              width={22}
              height={14}
              className="w-[20px] h-[14px] object-contain"
            />
          </div>
          <div>
            <h3 className="text-[#335ECE] text-[12px] font-bold leading-tight">
              Multi-Modal
            </h3>
            <p className="text-[#666666] text-[9px] mt-0.5">
              Text • Image • Code
            </p>
          </div>
        </div>

        {/* HEADING */}
        <div className="mt-4">
          <p className="text-[#666666] tracking-[2px] font-extrabold text-[11px] uppercase">
            Smart AI Systems
          </p>
          <h2 className="text-[19px] font-bold text-[#335ECE] leading-snug mt-1">
            Create • Automate • Innovate
          </h2>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-2.5 mt-5">
          <div className="bg-[#FFFFFF] rounded-[12px] py-3.5 border border-[#EAEAEA] shadow-sm text-center">
            <h3 className="text-[20px] font-['Poppins'] font-bold text-[#335ECE] leading-none">
              40+
            </h3>
            <p className="text-[#666666] text-[11px] mt-1 font-medium">Models</p>
          </div>

          <div className="bg-[#FFFFFF] rounded-[12px] py-3.5 border border-[#EAEAEA] shadow-sm text-center">
            <h3 className="text-[20px] font-['Poppins'] font-bold text-[#335ECE] leading-none">
              6.2s
            </h3>
            <p className="text-[#666666] text-[11px] mt-1 font-medium">Avg. Render</p>
          </div>

          <div className="bg-[#FFFFFF] rounded-[12px] py-3.5 border border-[#EAEAEA] shadow-sm text-center">
            <h3 className="text-[20px] font-['Poppins'] font-bold text-[#335ECE] leading-none">
              99.4%
            </h3>
            <p className="text-[#666666] text-[11px] mt-1 font-medium">Uptime</p>
          </div>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-2 gap-2.5 mt-4">
          {/* CARD 1 */}
          <div className="bg-[#FFFFFF] border border-[#073A53]/20 rounded-[12px] p-2.5 flex gap-2.5 items-center shadow-sm h-[52px]">
            <div className="w-8 h-8 rounded-lg bg-[#002892]/10 flex items-center justify-center shrink-0">
              <Image
                src="/hero-right/page.svg"
                alt="cpu"
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
            </div>
            <div>
              <h3 className="text-[#335ECE] text-[10.5px] font-bold leading-tight">
                Text Generation
              </h3>
              <p className="text-[#666666] text-[8px] mt-0.5">
                GPT • Claude • Llama
              </p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-[#FFFFFF] border border-[#073A53]/20 rounded-[12px] p-2.5 flex gap-2.5 items-center shadow-sm h-[52px]">
            <div className="w-8 h-8 rounded-lg bg-[#002892]/10 flex items-center justify-center shrink-0">
              <Image
                src="/hero-right/painting.svg"
                alt="image"
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
            </div>
            <div>
              <h3 className="text-[#335ECE] text-[10.5px] font-bold leading-tight">
                Image Synthesis
              </h3>
              <p className="text-[#666666] text-[8px] mt-0.5">Tool-using</p>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="bg-[#FFFFFF] border border-[#073A53]/20 rounded-[12px] p-2.5 flex gap-2.5 items-center shadow-sm h-[52px]">
            <div className="w-8 h-8 rounded-lg bg-[#002892]/10 flex items-center justify-center shrink-0">
              <Image
                src="/hero-right/arrow.svg"
                alt="code"
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
            </div>
            <div>
              <h3 className="text-[#335ECE] text-[10.5px] font-bold leading-tight">
                Code Copilot
              </h3>
              <p className="text-[#666666] text-[8px] mt-0.5">Autocompletion</p>
            </div>
          </div>

          {/* CARD 4 */}
          <div className="bg-[#FFFFFF] border border-[#073A53]/20 rounded-[12px] p-2.5 flex gap-2.5 items-center shadow-sm h-[52px]">
            <div className="w-8 h-8 rounded-lg bg-[#002892]/10 flex items-center justify-center shrink-0">
              <Image
                src="/hero-right/computer.svg"
                alt="bot"
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
            </div>
            <div>
              <h3 className="text-[#335ECE] text-[10.5px] font-bold leading-tight">
                AI Agents
              </h3>
              <p className="text-[#666666] text-[8px] mt-0.5">Tool-using</p>
            </div>
          </div>
        </div>

        {/* BOTTOM TERMINAL */}
        <div className="mt-4 bg-[#335ECE] rounded-[14px] p-3.5 text-[#FFFFFF] shadow-md">
          <div className="flex items-center gap-1.5 text-[10px]">
            <Image
              src="/hero-right/right.svg"
              alt="prompt"
              width={11}
              height={11}
              className="w-[11px] h-[11px] object-contain"
            />
            <span className="font-semibold">Prompt:</span>
            <span className="truncate opacity-90">
              Generate a marketing image for a new EV launch
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] mt-1">
            <Image
              src="/hero-right/left.svg"
              alt="output"
              width={11}
              height={11}
              className="w-[11px] h-[11px] object-contain"
            />
            <span className="font-semibold">Output:</span>
            <span className="opacity-90">4 hero variants generated in 6.2s</span>
          </div>

          <div className="h-[1px] bg-white/20 my-2"></div>

          <div className="flex items-center gap-1.5 text-[10px]">
            <Image
              src="/hero-right/square.svg"
              alt="inference"
              width={11}
              height={11}
              className="w-[11px] h-[11px] object-contain"
            />
            <span className="font-semibold">Inference:</span>
            <span className="opacity-90">12.4 tok/s • 2.1GB VRAM</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative z-30 shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
      <section className={`relative flex items-center overflow-hidden bg-[#FFFFFF] h-[650px]`}>
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 mt-20 lg:mt-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* LEFT SIDE CONTENT */}
            <div className="flex flex-col items-start w-full">
              <motion.p
                variants={itemVariants}
                className="mb-3 text-[15px] text-[#666666] font-semibold font-['Poppins'] tracking-wide"
              >
                {tagline}
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-[52px] font-black text-[#666666] leading-[1.15] mb-6 tracking-tight"
              >
                Driving Innovation <br /> With AI &amp;{" "}
                <TypewriterEffect
                  words={[
                    "Generative",
                    "Technologies",
                    "Intelligent Automation",
                    "Machine Learning",
                  ]}
                />
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-[17px] md:text-[19px] text-[#666666] mb-8 leading-relaxed font-normal max-w-xl"
              >
                {description}
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <Link href="/schedule-call">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3.5 bg-[#335ECE] text-white font-semibold rounded-[12px] shadow-md text-base tracking-wide group cursor-pointer flex items-center"
                  >
                    Let&apos;s Collaborate
                    <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExploreClick}
                  className="px-8 py-3.5 border border-[#666666]/40 text-[#666666] font-semibold rounded-[12px] text-base tracking-wide cursor-pointer bg-transparent"
                >
                  Explore Services
                </motion.button>
              </motion.div>
            </div>

            {/* RIGHT SIDE CONTENT */}
            {alignment === "left" && <TechnologiesCard />}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AiHero;