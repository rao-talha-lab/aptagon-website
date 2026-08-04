"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineStar, HiOutlineLightningBolt, HiOutlineShieldCheck } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";

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

// --- Mobile App Section (Right Side) ---
const MobileAppSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="hidden lg:flex flex-1 items-center justify-center"
    >
      <div className="bg-transparent p-2 flex flex-col md:flex-row items-center justify-center gap-9 font-sans relative">

        {/* Mobile Mockup */}
        <div className="relative w-[235px] -left-7 h-[425px] bg-[#FFFFFF] rounded-[45px] border-[10px] border-[#335ECE] shadow-2xl overflow-hidden flex flex-col">

          {/* TOP BAR */}
          <div className="h-8 bg-[#FFFFFF] w-full flex justify-center items-end pt-2 pb-3">
            <div className="w-20 h-1.5 bg-[#D9D9D9] rounded-full"></div>
          </div>

          {/* DASHBOARD SECTION */}
          <div className="bg-gradient-to-b from-[#335ECE] to-[#043248] p-3 pb-3">
            <p className="text-[#FFFFFF] text-[9px] tracking-wider">Welcome back</p>
            <h2 className="text-[#FFFFFF] text-[18px] font-bold mb-2">Dashboard</h2>
            <div className="flex gap-3">
              {/* Revenue Card */}
              <div className="bg-[#FFFFFF]/30 backdrop-blur-md p-3 rounded-lg shadow-lg flex-1">
                <span className="text-[#FFFFFF] text-[9px] block leading-tight">Revenue</span>
                <p className="text-[#FFFFFF] font-bold text-[15px] mt-0.5">$24.8k</p>
              </div>
              {/* Users Card */}
              <div className="bg-[#FFFFFF]/30 backdrop-blur-md p-3 rounded-lg shadow-lg flex-1">
                <span className="text-[#FFFFFF] text-[9px] block leading-tight">Users</span>
                <p className="text-[#FFFFFF] font-bold text-[15px] mt-0.5">1,284</p>
              </div>
            </div>
          </div>

          {/* MENU SECTION */}
          <div className="flex-1 bg-[#FFFFFF] px-3 py-3 z-10">
            <div className="space-y-2.5">
              {[
                { name: "Analytics" },
                { name: "Orders" },
                { name: "Messages" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-full bg-[#335ECE]/10 rounded-lg p-2 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center">
                      <Image
                        src="/hero-right/orders.svg"
                        alt={`${item.name} icon`}
                        width={22}
                        height={22}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[#335ECE] text-[12px] font-[''Poppins] font-bold">{item.name}</span>
                  </div>
                  <Image
                    src="/hero-right/arrow.svg"
                    alt="arrow"
                    width={12}
                    height={12}
                    className="opacity-30"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM NAV */}
          <div className="p-4 flex justify-around bg-white border-t border-[#335ED1]">
            <Image src="/hero-right/mobilesection.svg" alt="nav" width={20} height={20} />
            <Image src="/hero-right/mobilearrow.svg" alt="nav" width={20} height={20} />
            <Image src="/hero-right/mobilecall.svg" alt="nav" width={20} height={20} />
            <Image src="/hero-right/mobile4thpic.svg" alt="nav" width={20} height={20} />
          </div>
        </div>

        {/* Right Side Cards */}
        <div className="flex flex-col gap-4 -ml-12 mr-auto">
          {/* First Card */}
          <div className="bg-white shadow-lg rounded-2xl p-5 w-40 border border-gray-50">
            <Image
              src="/hero-right/mobilestar.svg"
              alt="rating"
              width={28}
              height={28}
              className="mb-2"
            />
            <h3 className="text-[26.25px] font-['Poppins'] font-extrabold text-[#335ECE]">4.9</h3>
            <p className="text-[#666666] font-['Poppins'] text-[11.23px]">App Store Rating</p>
          </div>

          {/* Second Card */}
          <div className="bg-white shadow-lg rounded-2xl p-5 w-40 border border-gray-50">
            <Image
              src="/hero-right/mobilearrow2.svg"
              alt="analytics"
              width={28}
              height={28}
              className="mb-2"
            />
            <h3 className="text-[26.25px] font-['Poppins'] font-extrabold text-[#335ECE]">+18%</h3>
            <p className="text-[#666666] font-['Poppins'] text-[11.23px]">User Growth</p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

// --- Main Hero Props ---
interface AnimatedHeroSectionProps {
  description?: string;
  height?: string;
}

const MobileHero: React.FC<AnimatedHeroSectionProps> = ({
  height = "min-h-screen",
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


    <section className={`relative flex items-center overflow-hidden bg-[#FFFFFF] ${height}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-50" />
      <div className="relative lg:mt-7 z-10 container mx-auto px-6 pt-20 lg:pt-30 pb-5 lg:pb-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* LEFT SIDE — unchanged */}
          <div className="flex-1 max-w-3xl flex flex-col items-start text-left">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-3 text-[#666666] font-['Poppins'] font-semibold tracking-wide text-[15px] px-2 py-2"
            >
              Mobile App Development
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h2 className="text-[35px] md:text-[40px] lg:text-[47px] font-black text-[#666666] leading-[1.25] tracking-tighter">
                Delivering Engaging
                <br />
                <TypewriterEffect words={["Mobile Experiences", "Innovative App Ideas", "Smart App Features"]} />
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[15px] md:text-[22px] text-[#666666] mb-10 leading-relaxed font-medium"
            >
              Developing intuitive, high-performance mobile apps for iOS and Android to engage your users anywhere.
            </motion.p>

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

          {/* RIGHT SIDE — replaced with MobileAppSection */}
          <MobileAppSection />

        </div>
      </div>
    </section>
    </div>
  );
};

export default MobileHero;