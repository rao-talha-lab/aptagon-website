"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/* ── Typewriter Component ── */
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
        className={`inline-block w-1 h-10 md:h-14 ml-2 bg-[#666666] align-middle ${
          blink ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  glow: number;
}

/* ── Counter Hook ── */
function useCounter(target: number, duration = 2, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const c = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.floor(v)),
    });
    return () => c.stop();
  }, [start, target, duration]);
  return count;
}

/* ── Right Side: Dashboard Card ── */
const WebDevelopmentDashboard = ({ inView }: { inView: boolean }) => {
  return (
    <div className="flex items-center justify-center w-full h-full py-10 lg:py-0">
      <div className="relative flex items-center justify-center w-full max-w-[520px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-[500px] max-w-full bg-[#FFFFFF] rounded-[25px] shadow-[0_15px_35px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden"
        >
          {/* 1. Top Navbar Strip */}
          <div className="w-full bg-[#002892]/10 px-5 pt-4 pb-3.5 flex items-center justify-between gap-4 border-b border-[#335ECE]/40">
            <div className="flex items-center gap-1.5 flex-shrink-0 h-3">
              <Image src="/hero-right/reddot.svg" alt="Red" width={12} height={12} className="object-contain" />
              <Image src="/hero-right/bluedot.svg" alt="Blue" width={12} height={12} className="object-contain" />
              <Image src="/hero-right/graydot.svg" alt="Gray" width={12} height={12} className="object-contain" />
            </div>
            <div className="flex-1 max-w-[220px] h-6 bg-[#FFFFFF] rounded-[5px] shadow-inner border border-[#6E6E6E]/50" />
            <div className="text-[#335EC1] font-['Poppins'] text-[18px] font-bold flex-shrink-0">
              {"</>"}
            </div>
          </div>

          {/* Inner card area */}
          <div className="px-5 pt-5 pb-5 flex flex-col gap-4 bg-[#FFFFFF]">
            {/* 2. Hero Cards Row */}
            <div className="grid grid-cols-3 gap-3.5">
              <div className="col-span-2 bg-gradient-to-r from-[#355ED1] to-[#0b3cb8] rounded-[20px] p-5 flex flex-col justify-between text-[#FFFFFF] min-h-[130px] relative overflow-hidden">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#FFFFFF]">Hero Section</p>
                  <h1 className="text-[19px] font-bold tracking-tight mt-1 leading-snug">
                    Build Fast, Scale Smart
                  </h1>
                </div>
                <button className="w-max bg-[#FFFFFF]/20 text-white font-semibold text-[12px] px-4 py-2 rounded-sm flex items-center gap-1.5 mt-2">
                  Live Preview
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </button>
              </div>

              <div className="bg-[#002892]/10 rounded-[24px] p-5 flex flex-col justify-between text-[#335ECE] min-h-[130px] overflow-hidden">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center p-1.5">
                  <Image
                    src="/hero-right/modular.svg"
                    alt="Modular Layout"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-[18px] font-bold tracking-tight text-[#002892] leading-none">Modular</h3>
                  <p className="text-[10px] font-semibold text-[#666666] mt-1">Components</p>
                </div>
              </div>
            </div>

            {/* 3. Metrics Row */}
            <div className="grid grid-cols-3 gap-3.5">
              {[
                { value: "98", label: "Performance" },
                { value: "100", label: "Responsive" },
                { value: "95", label: "SEO Ready" },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.12 }}
                  className="bg-[#FFFFFF] border border-[#666666]/70 rounded-[20px] p-4 shadow-sm flex flex-col justify-center min-h-[78px]"
                >
                  <div className="text-[20px] font-bold text-[#335ECE] tracking-tight leading-none">
                    {m.value}
                  </div>
                  <div className="text-[12px] font-semibold text-[#666666] uppercase tracking-wider mt-2">
                    {m.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 4. Bottom Tech Stack Belt */}
          <div className="w-full bg-[#335ED1] py-4 px-6 flex items-center justify-between text-[#FFFFFF] text-[11px] font-medium tracking-wide mt-auto">
            <span className="font-bold">{"</>"}</span>
            <span>React</span>
            <span>•</span>
            <span>Next</span>
            <span>•</span>
            <span>Tailwind</span>
            <span>•</span>
            <span>TypeScript</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ── Main Hero Section ── */
const WebDevHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  useCounter(200, 2.5, inView);
  useCounter(99, 2.2, inView);
  useCounter(8, 2.0, inView);

  const handleExploreClick = () => {
    window.dispatchEvent(new CustomEvent("openNavbarDropdown"));
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
      for (const p of particles) {
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
      <section
        ref={sectionRef}
        className="relative flex items-center overflow-hidden bg-[#FFFFFF] dark:bg-[#0a0a0a] min-h-screen"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 pointer-events-none opacity-40"
        />

        <div className="relative z-10 container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* ── Left Content ── */}
            <div className="flex-1 max-w-3xl text-left lg:mt-15 pt-30 lg:pt-20 pb-5 lg:pb-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-block mb-5 px-3 py-1"
              >
                <p className="text-[#666666] font-['Poppins'] font-semibold tracking-wide text-[15px]">
                  Web Development
                </p>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-[55px] font-black text-[#666666] dark:text-white leading-[1.25] mb-2 tracking-tighter"
              >
                Crafting Web <br />
                Experiences That <br />
                <TypewriterEffect
                  words={[
                    "Boost Performance",
                    "Spark Innovation",
                    "Deliver Excellence",
                  ]}
                />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[20px] text-[#666666] dark:text-slate-400 mb-6 leading-relaxed font-medium"
              >
                Crafting high-performance websites that deliver seamless
                experiences and drive business growth.
              </motion.p>

              {/* ── Buttons ── */}
              <div className="flex flex-wrap gap-4">
                <Link href="/schedule-call">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
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
                  className="px-8 h-14 border-[1.5px] border-[#666666] dark:border-white/10 text-[#666666] dark:text-white font-semibold rounded-[10px] text-s tracking-wide hover:text-[#335ECE] cursor-pointer"
                >
                  Explore Services
                </motion.button>
              </div>
            </div>

            {/* ── Right: Dashboard — hidden below lg ── */}
            <div className="flex-1 flex items-center justify-center w-full lg:mt-20 hidden lg:flex">
              <WebDevelopmentDashboard inView={inView} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebDevHero;