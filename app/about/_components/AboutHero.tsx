"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ─── Typewriter ───────────────────────────────────────────────────────────────
const TypewriterEffect = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkTimer = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(blinkTimer);
  }, []);

  useEffect(() => {
    if (!reverse && subIndex === words[index].length) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }
    if (reverse && subIndex === 0) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(
      () => setSubIndex((prev) => prev + (reverse ? -1 : 1)),
      reverse ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-[#335ECE]">
      {words[index].substring(0, subIndex)}
      <span
        className={`inline-block w-1 h-10 md:h-14 ml-2 bg-[#335ECE] align-middle ${
          blink ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
};

// ─── Particle Interface ───────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  glow: number;
}

// ─── EvolutionCard ────────────────────────────────────────────────────────────
const EvolutionCard = () => {
  return (
    <div className="w-[450px] h-[410px] bg-[#FFFFFF] rounded-xl p-7 flex flex-col relative font-sans shadow-[0_10px_40px_rgba(51,94,206,0.25)]">

      {/* Header */}
      <div className="mb-3">
        <p className="text-[#666666] font-['Poppins'] text-[13.24px] font-bold uppercase tracking-widest">
          Who We Are
        </p>
        <h3 className="text-[#335ECE] font-['Poppins'] text-[20.81px] font-bold">
          Aptagon At A Glance
        </h3>
      </div>

      {/* Info Icon */}
      <div className="absolute top-8 right-6 bg-[#335ECE] text-[#FFFFFF] rounded-2xl shadow-md">
        <Image
          src="/hero-right/i.svg"
          alt="info"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-[#FFFFFF] rounded-lg p-4 text-center border border-gray-100 shadow-lg">
          <p className="text-[18.83px] font-['Poppins'] font-bold text-[#335ECE]">50+</p>
          <p className="text-[12.55px] font-['Poppins'] font-medium text-[#666666] uppercase tracking-widest">Clients</p>
        </div>
        <div className="bg-[#FFFFFF] rounded-lg p-4 text-center border border-gray-100 shadow-lg">
          <p className="text-[18.83px] font-['Poppins'] font-bold text-[#335ECE]">120+</p>
          <p className="text-[12.55px] font-['Poppins'] font-medium text-[#666666] uppercase tracking-widest">Projects</p>
        </div>
        <div className="bg-[#FFFFFF] rounded-lg p-4 text-center border border-gray-100 shadow-lg">
          <p className="text-[18.83px] font-['Poppins'] font-bold text-[#335ECE]">8+</p>
          <p className="text-[12.55px] font-['Poppins'] font-medium text-[#666666] uppercase tracking-widest">Years</p>
        </div>
      </div>

      {/* List Items */}
      <div className="space-y-2">
        <div className="flex items-center gap-4 bg-[#002892]/5 rounded-lg p-2 transition-all hover:bg-[#002892]/10">
          <div className="w-10 h-10 flex-shrink-0 overflow-hidden rounded-lg">
            <Image src="/hero-right/missiondriven.svg" alt="Mission Driven" width={40} height={40} className="w-full h-full" />
          </div>
          <div>
            <p className="text-[11.14px] font-['Poppins'] font-bold text-[#335ECE]">Mission-Driven</p>
            <p className="text-[11px] font-['Poppins'] font-light text-[#666666]">Outcomes that move business forward</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-[#002892]/5 rounded-lg p-2 transition-all hover:bg-[#002892]/10">
          <div className="w-10 h-10 flex-shrink-0 overflow-hidden rounded-lg">
            <Image src="/hero-right/people1st.svg" alt="People First" width={40} height={40} className="w-full h-full" />
          </div>
          <div>
            <p className="text-[11.14px] font-['Poppins'] font-bold text-[#335ECE]">People First</p>
            <p className="text-[11px] font-['Poppins'] font-light text-[#666666]">Cross-functional senior team</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-[#002892]/5 rounded-lg p-2 transition-all hover:bg-[#002892]/10">
          <div className="w-10 h-10 flex-shrink-0 overflow-hidden rounded-lg">
            <Image src="/hero-right/quality.svg" alt="Quality Obsessed" width={40} height={40} className="w-full h-full" />
          </div>
          <div>
            <p className="text-[11.14px] font-['Poppins'] font-bold text-[#335ECE]">Quality Obsessed</p>
            <p className="text-[11px] font-['Poppins'] font-light text-[#666666]">ISO-grade delivery standards</p>
          </div>
        </div>
      </div>

      {/* Badge */}
      <div className="absolute -bottom-5 w-[205px] h-[55px] left-[-64px] bg-[#FAFAFA] shadow-[0_4px_16px_rgba(51,94,206,0.18)] rounded-lg p-2 flex items-center gap-2 border border-gray-100">
        <div className="flex pl-2 -space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#335ECE] border-1 border-white shadow-sm"></div>
          <div className="w-8 h-8 rounded-full bg-[#335ECE] border-1 border-white shadow-sm"></div>
          <div className="w-8 h-8 rounded-full bg-[#335ECE] border-1 border-white shadow-sm"></div>
        </div>
        <p className="text-[15px] font-semibold text-[#666666] pr-2 tracking-tighter">Trusted Team</p>
      </div>
    </div>
  );
};

// ─── AboutHero ────────────────────────────────────────────────────────────────
const AboutHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

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
    <div className="relative z-10 shadow-[0_5px_10px_rgba(0,0,0,0.1)]">
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#ffffff] pt-14 pb-5 lg:pt-17 ">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-50"
      />

      {/* Gradient Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#0EBAB0]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#073A53]/10 rounded-full blur-[120px] animate-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-8">

          {/* ── LEFT CONTENT ── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 lg:basis-1/2 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <span className="text-[#666666] font-['Poppins'] font-medium tracking-widest text-[18.91px] md:text-[15px] mt-4">
                Who We Are
              </span>
            </motion.div>

            <motion.h1 className="text-[50px] md:text-[60px] font-['Poppins'] font-bold text-[#666666] leading-[1.1] tracking-tighter">
              Driven by <br /> Innovation,
              <br />
              <TypewriterEffect
                words={[
                  "Defined by Excellence",
                  "Engineering the Future",
                  "Built for Growth",
                ]}
              />
            </motion.h1>

            <p className="text-[15px] md:text-[21px] font-['Poppins'] font-medium mb-10 leading-relaxed mx-auto lg:mx-0 max-w-2xl text-[#666666] mt-2">
              Your trusted technology partner for innovative digital solutions that drive real business impact.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-5">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-[#355ED1] text-white font-semibold rounded-xl shadow-[0_20px_40px_-10px_rgba(7,58,83,0.3)] transition-all uppercase tracking-wider text-s"
              >
                <Link href="/schedule-call">
                  <span>Get In Touch →</span>
                </Link>
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(51,94,206,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("team")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-10 py-5 border-2 border-[#666666] text-[#666666] font-semibold rounded-xl transition-all uppercase tracking-wider text-s"
              >
                Meet Our Team
              </motion.button>
            </div>
          </motion.div>

          {/* ── RIGHT SIDE: EVOLUTION CARD ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 lg:basis-1/2 hidden lg:flex items-center justify-center mt-12 lg:mt-0"
          >
            {/* ml-16 compensates for the badge's left-[-64px] offset so card appears centered */}
            <div className="ml-12 mt-5 mb-8">
              <EvolutionCard />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
    </div>
  );
};

export default AboutHero;