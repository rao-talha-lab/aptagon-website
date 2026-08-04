"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineChatAlt2, HiArrowRight } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

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

// --- Internal Typewriter Component ---
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

// --- Counter Component ---
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

// --- Replaced Right Side: 4-Card ReachUs Grid ---
const ReachUsGrid = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
      className="hidden lg:flex flex-1 items-center justify-center pt-10"
    >
      <div className="relative">

        {/* CENTER CIRCLE */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-[#335ECE] bg-white z-20 flex items-center justify-center shadow-md">
          <div className="w-12 h-12 rounded-full bg-[#335ECE]" />
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-2 gap-6 relative z-10">

          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(51,94,206,0.25)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-40 h-40 rounded-3xl border border-[#335ED1] bg-white flex items-center justify-center shadow-[0_4px_20px_#0000002A] cursor-pointer"
          >
            <Image
              src="/hero-right/message.svg"
              alt="message"
              width={48}
              height={48}
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(51,94,206,0.25)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-40 h-40 rounded-3xl border border-[#335ECE] bg-white flex items-center justify-center shadow-[0_4px_20px_#0000002A] cursor-pointer"
          >
            <Image
              src="/hero-right/envelop.svg"
              alt="mail"
              width={48}
              height={48}
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(51,94,206,0.25)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-40 h-40 rounded-3xl border border-[#335ECE] bg-white flex items-center justify-center shadow-[0_4px_20px_#0000002A] cursor-pointer"
          >
            <Image
              src="/hero-right/location.svg"
              alt="location"
              width={48}
              height={48}
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(51,94,206,0.25)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-40 h-40 rounded-3xl border border-[#335ECE] bg-white flex items-center justify-center shadow-[0_4px_20px_#0000002A] cursor-pointer"
          >
            <Image
              src="/hero-right/phone.svg"
              alt="phone"
              width={48}
              height={48}
            />
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

const ReachUsHero = () => {
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
    <div className="relative z-30 shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FFFFFF]">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />

      <div className="container mx-auto px-6 relative z-10 py-2 lg:py-0">
        <div className="flex flex-col lg:flex-row lg:mt-0 items-center justify-between gap-16">

          {/* --- LEFT SIDE CONTENT (unchanged) --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex-1 mt-10 text-center lg:text-left"
          >
            {/* Pulsing Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-1 py-1 rounded-full  mb-4"
            >
              <p className="text-[#666666] font-semibold uppercase tracking-wide text-[16px]">
                Lets Connect For Innovation
              </p>
            </motion.div>

            {/* Heading */}
            <h1 className="text-30 md:text-[50px] font-black leading-[1.25] text-[#666666] leading-[1.05] mb-8 tracking-tighter">
              <span className="block">Partner With Us To</span>
              <span className="block">
                <TypewriterEffect words={[
                  "Build Your Digital Future",
                  "Accelerate Business Growth",
                  "Transform Ideas Into Reality",
                ]} />
              </span>
            </h1>

            {/* Description */}
            <p className="text-[#666666] text-[25px] md:text-[21px] font-medium mb-9 max-w-2xl leading-relaxed mx-auto lg:mx-0">
            Turn your visionary ideas into scalable reality with our expert team of tech strategists and engineers.</p>

            {/* Buttons */}
       <div className="flex flex-wrap justify-center lg:justify-start gap-4">
  {/* Primary CTA Button */}
  <motion.a
    href="/schedule-call"
    whileHover={{ scale: 1.05 }}
    className="inline-flex items-center justify-center px-8 h-14 bg-[#355ED1] text-[16px] font-inter text-white font-medium rounded-[10px] shadow-md hover:shadow-lg transition-all"
  >
    <span className="flex items-center gap-2">
      Get a Free Consultation
      <HiArrowRight />
    </span>
  </motion.a>

  {/* Secondary CTA Button */}
  <motion.a
    href="/schedule-call"
    whileHover={{ borderColor: "#335ECE", scale: 1.05 }}
    className="inline-flex items-center justify-center px-14 h-14 text-[#666666] text-[16px] border-[1.5px] border-[#666666] font-medium font-inter rounded-[10px] hover:text-[#335ECE] transition-all"
  >
    Start a Project
  </motion.a>
</div>

            {/* Social Proof */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 flex items-center justify-center lg:justify-start gap-4 text-slate-400"
            >
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=150&h=150&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&h=150&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&h=150&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=150&h=150&auto=format&fit=crop"
                ].map((imgUrl, i) => (
                  <div key={i} className="relative w-10 h-10">
                    <img
                      src={imgUrl}
                      alt={`Professional Partner ${i + 1}`}
                      className="w-full h-full rounded-full object-cover shadow-lg grayscale-[20%] hover:grayscale-0 transition-all duration-300"
                      style={{ border: "none", backgroundColor: "#073A53" }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#073A53]">
                  Trusted by 200+ Global Partners
                </p>
                <div className="flex gap-1 mt-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-[#0EBAB0] text-[9px]">★</span>
                  ))}
                </div>
              </div>
            </motion.div> */}
          </motion.div>

          {/* --- RIGHT SIDE: Replaced with 4-Card Grid --- */}
          <ReachUsGrid />

        </div>
      </div>
    </section>
    </div>
  );
};

export default ReachUsHero;