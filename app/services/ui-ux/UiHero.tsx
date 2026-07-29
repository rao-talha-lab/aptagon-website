"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- Types ---
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  glow: number;
}

// --- Typewriter Effect ---
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

// --- Digital Experience Card (right side replacement) ---
const DigitalExperienceCard = () => {
  return (
    <div className="hidden lg:flex flex-1 items-center justify-center">
      <div>
        {/* Main Card */}
        <div className="w-[500px] xl:w-[540px] bg-[#FFFFFF] rounded-[18px] p-6 shadow-[0_4px_40px_rgba(51,94,206,0.3)]">

          {/* Heading */}
          <p className="text-[#666666] text-[16px] font-['Poppins'] font-semibold mb-1 mt-5">
            UI/UX Design
          </p>
          <h2 className="text-[#335ECE] text-[23px] font-bold leading-tight mb-5">
            Component Library
          </h2>

          {/* Color Palette */}
          <div className="flex gap-3 mb-5">
            <div className="flex-1 h-[50px] rounded-xl bg-[#666666]" />
            <div className="flex-1 h-[50px] rounded-xl bg-[#2ABAEA]" />
            <div className="flex-1 h-[50px] rounded-xl bg-[#355ED1]" />
            <div className="flex-1 h-[50px] rounded-xl bg-[#ADC1CA]" />
            <div className="flex-1 h-[50px] rounded-xl bg-[#D6E9F5]" />
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-2 gap-4 mb-4">

            {/* Button Card */}
            <div className="border border-[#083A54]/30 rounded-xl p-3 bg-[#FFFFFF]">
              <p className="text-[10px] text-[#335ECE] mb-3 uppercase font-medium">
                Button
              </p>
              <button className="w-full h-[42px] rounded-[10px] bg-[#335ECE] text-[#FFFFFF] font-semibold text-[14px] mb-3">
                Get Started
              </button>
              <button className="w-full h-[42px] rounded-[10px] border border-[#335ECE] text-[#335ECE] font-semibold text-[14px]">
                Learn More
              </button>
            </div>

            {/* Input Card */}
            <div className="border border-[#083A54]/30 rounded-xl p-3 bg-[#FFFFFF]">
              <p className="text-[10px] text-[#015783] mb-3 uppercase font-medium">
                Input
              </p>
              <input
                type="text"
                placeholder="name@gmail.com"
                className="w-full h-[42px] rounded-[10px] border border-[#083A54] px-3 outline-none text-[13px] text-[#073A53] mb-4 placeholder:text-[#073A53]"
              />
              {/* Toggle */}
              <div className="flex items-center gap-2">
                <div className="w-[28px] h-[16px] bg-[#335ECE] rounded-full relative flex-shrink-0">
                  <div className="w-[12px] h-[12px] bg-[#FFFFFF] rounded-full absolute top-[2px] left-[14px]" />
                </div>
                <p className="text-[13px] text-[#083A54] font-medium">Toggle</p>
              </div>
            </div>
          </div>

          {/* Bottom Card */}
          <div className="border border-[#083A54]/30 rounded-xl p-5 bg-[#FFFFFF] flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Gradient box */}
              <div className="w-[50px] h-[48px] rounded-xl bg-[#335ECE] flex-shrink-0" />
              {/* Skeleton lines */}
              <div>
                <div className="w-[115px] h-[8px] rounded-full bg-[#D9D9D9] mb-3" />
                <div className="w-[160px] h-[8px] rounded-full bg-[#355ED1]/20" />
              </div>
            </div>
            <button className="px-4 py-1.5 rounded-full border border-[#335ECE] text-[#335ECE] text-[13px] font-medium bg-[#002892]/10 flex-shrink-0">
              Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Hero Section ---
const AnimatedHeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

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

  return (
    <div className="relative z-30 shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FFFFFF] pt-10 lg:pt-15 pb-5 lg:pb-10">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-[#335ECE]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col mt-20 lg:flex-row items-center gap-16 lg:gap-14">

          {/* ── Left: Text Content (unchanged) ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-left"
          >
            <span className="inline-block py-1 text-[#666666] text-[17px] font-black tracking-wider mb-7">
              UI/UX Design
            </span>

            <h1 className="text-[30px] lg:text-[50px] font-black text-[#666666] leading-[1.25] mb-8 tracking-tighter">
              Designing <br />
               Impactful
              <TypewriterEffect
                words={[
                  " User Experience Flow",
                  " Interface Innovation",
                  " Creative Strategy",
                ]}
              />
            </h1>

            <p className="text-[#666666] text-[18px] font-['Poppins'] mb-12 max-w-xl leading-relaxed font-medium">
            Creating visually stunning, user-centered designs that deliver seamless and engaging digital experiences.
            </p>

            <div className="flex flex-wrap gap-5">
            <Link href="/schedule-call">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                    }}
                    className="px-10 py-5 bg-[#335ECE] text-white font-semibold rounded-[10px] shadow-lg lg:shadow-2xl text-s tracking-wide group cursor-pointer"
                  >
                    Let&apos;s Collaborate
                    <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleExploreClick}
                  className="px-10 py-5 border-1 border-[#666666] dark:border-white/10 text-[#666666] dark:text-white font-semibold rounded-[10px] text-s tracking-wide cursor-pointer"
                >
                  Explore Services
                </motion.button>
            </div>
          </motion.div>

          {/* ── Right: Component Library Card (hidden below lg) ── */}
          <DigitalExperienceCard />
        </div>
      </div>
    </section>
    </div>
  );
};

export default AnimatedHeroSection;