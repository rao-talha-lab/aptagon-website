"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

// --- Internal Typewriter Component ---
const TypewriterEffect = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => { setBlink((prev) => !prev); }, 500);
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
      <span className={`inline-block w-1 h-8 md:h-12 ml-2 bg-[#666666] align-middle ${blink ? 'opacity-100' : 'opacity-0'}`} />
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

interface AnimatedHeroSectionProps {
  tagline?: string;
  heading?: string;
  description?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaHref?: string;
  height?: string;
  showSearchBar?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
}

const BlogHero: React.FC<AnimatedHeroSectionProps> = ({
  tagline = "Aptagon Insights",
  heading = "Building Scalable & Impactful Software",
  description = "Explore how technology, design, and strategy shape the digital future with Aptagon’s expert insights.",
  height = "min-h-[85vh]",
  showSearchBar = true,
  searchPlaceholder = "Search Articles",
  searchValue = "",
  onSearchChange = () => { },
  onSearchSubmit = () => { },
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 120;
    const mouseRadius = 250;

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
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          size: Math.random() * 2.5 + 1,
          opacity: Math.random() * 0.4 + 0.2,
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
          p.x -= dx * force * 0.03;
          p.y -= dy * force * 0.03;
          p.glow = Math.min(force, 1);
        } else {
          p.glow *= 0.9;
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
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative z-30 shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
      <section className={`relative flex items-center justify-center overflow-hidden bg-[#FFFFFF] ${height}`}>
        {/* Dynamic Particle Background */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />

        {/* Decorative Blobs */}
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#0EBAB0]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#073A53]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="max-w-4xl w-full flex flex-col items-center"
          >
            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-5xl font-black text-[#666666] leading-[1.15] mb-6 tracking-tighter"
            >
              Building Scalable &
              <TypewriterEffect
                words={[" Impactful Software", " Strategic Solutions", " Digital Futures"]}
              />
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-[#666666] mb-10 max-w-2xl leading-relaxed"
            >
              {description}
            </motion.p>

            {/* Prominent Search Bar Matched with Screenshot */}
            {showSearchBar && (
              <motion.div
                variants={itemVariants}
                className="w-full max-w-md relative"
              >
                <div className="relative flex items-center bg-white rounded-full h-13 px-6 shadow-[0_12px_30px_rgba(51,94,206,0.20)] border border-[#E2E8F0] hover:border-[#335ECE]/30 transition-all duration-300">
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && onSearchSubmit(searchValue)}
                    className="flex-1 h-full text-sm md:text-base text-[#666666] placeholder-[#A0AEC0] outline-none bg-transparent font-medium"
                  />
                  <button 
                    onClick={() => onSearchSubmit(searchValue)}
                    className="text-[#666666] hover:text-[#335ECE] transition-colors focus:outline-none pl-2"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogHero;