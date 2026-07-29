"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// --- Internal Typewriter Component ---
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
      <span className={`inline-block w-1 h-10 md:h-14 ml-2 bg-[#666666] align-middle ${blink ? "opacity-100" : "opacity-0"}`} />
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

const Counter = ({ target, duration = 2, suffix = "" }: { target: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = duration * 60;
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setCount(Math.floor(target * progress));
      if (frame === totalFrames) clearInterval(counter);
    }, 1000 / 60);
    return () => clearInterval(counter);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
};

interface AnimatedHeroSectionProps {
  tagline?: string;
  heading?: string;
  description?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  height?: string;
  alignment?: "left" | "center";
}

// --- QA Report Card ---
const QAReportCard = () => {
  const progress = [
    { title: "Functional Tests", value: "100%", width: "100%" },
    { title: "Performance", value: "98%", width: "98%" },
    { title: "Security Checks", value: "94%", width: "94%" },
    { title: "Accessibility", value: "89%", width: "89%" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="hidden lg:flex flex-1 items-center justify-center self-center"
    >
      <div className="w-[420px] xl:w-[460px] bg-[#FAFAFA] rounded-[18px] p-6 xl:p-7 shadow-[0_4px_15px_rgba(51,94,206,0.2)]">

        {/* TOP */}
        <div className="flex items-start justify-between mb-5 mt-1">
          <div>
            <p className="text-[12px] font-extrabold tracking-wider uppercase text-[#666666]">
              QA REPORT
            </p>
            <h2 className="text-[19px] xl:text-[21px] font-bold text-[#335ECE]">
              Test Coverage
            </h2>
          </div>
          <Image
            src="/hero-right/tick.svg"
            alt="QA icon"
            width={34}
            height={34}
          />
        </div>

        {/* SCORE BOX */}
        <div className="bg-gradient-to-r from-[#1B3887] to-[#335ED1] rounded-xl px-4 py-7 flex justify-between items-center text-[#FFFFFF] mb-6">
          <div>
            <p className="text-[10px] uppercase mb-2 -mt-4 tracking-wider">OVERALL SCORE</p>
            <h3 className="text-[25px] font-bold leading-none">
              98<span className="text-[17px] text-[#FFFFFFB2]">/100</span>
            </h3>
          </div>
          <div>
            <p className="text-[10px] uppercase mb-2 ml-8 -mt-4 tracking-wider">PASSED</p>
            <h3 className="text-[21px] font-bold leading-none">
              412<span className="text-[21px]">/420</span>
            </h3>
          </div>
        </div>

        {/* PROGRESS BARS */}
        <div className="space-y-4">
          {progress.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full">
                    <Image
                      src="/hero-right/tick1.svg"
                      width={14}
                      height={14}
                      alt="tick icon"
                    />
                  </div>
                  <p className="text-[13px] xl:text-[14px] font-medium text-[#666666]">
                    {item.title}
                  </p>
                </div>
                <p className="text-[12px] xl:text-[13px] font-semibold text-[#666666]">
                  {item.value}
                </p>
              </div>
              <div className="w-full h-[5px] bg-[#D9D9D9] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: item.width }}
                  transition={{ duration: 1.2, delay: index * 0.15, ease: "easeOut" }}
                  className="h-full bg-[#335ED1] rounded-full"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  );
};

const SqaHero: React.FC<AnimatedHeroSectionProps> = ({
  tagline = "Software Quality Assurance & Delivery",
  heading = "Reliable & High-Quality",
  description = "End-to-end QA and delivery services that guarantee seamless, bug-free, and scalable software — every time.",
  primaryCtaText = "Explore Services",
  secondaryCtaText = "Let's Collaborate",
  height = "min-h-screen",
  alignment = "left",
}) => {
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

    <section className={`relative flex items-center overflow-hidden bg-[#FFFFFF] ${height}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      <div className="relative lg:mt-20 z-10 container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          {/* LEFT — text content (unchanged) */}
          <div className="max-w-3xl flex flex-col items-start">
            <motion.p variants={itemVariants} className="mb-3 text-[15px] text-[#666666] font-['Poppins'] font-semibold tracking-wide">
              {tagline}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-[50px] font-black text-[#666666] leading-[1.25] mb-6 tracking-tighter"
            >
              {heading} <br />
              <TypewriterEffect words={["Software Solutions","QA Excellence", "Bug-Free Code", "Rapid Delivery"]} />
            </motion.h1>

            <motion.p variants={itemVariants} className="text-[20.5px] text-[#666666] mb-10 leading-relaxed font-medium">
              {description}
            </motion.p>

            <div className="flex flex-wrap gap-5">
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

          {/* RIGHT — QA Report Card (hidden below lg) */}
          {alignment === "left" && <QAReportCard />}
        </motion.div>
      </div>
    </section>
    </div>
  );
};

export default SqaHero;