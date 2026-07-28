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
  searchPlaceholder = "Search Articles......",
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
    const connectionDistance = 180;
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

        // ctx.beginPath();
        // ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // ctx.fillStyle = `rgba(14, 186, 176, ${p.opacity + p.glow})`;
        // ctx.fill();

        // for (let j = i + 1; j < particles.length; j++) {
        //   const p2 = particles[j];
        //   const dx2 = p.x - p2.x;
        //   const dy2 = p.y - p2.y;
        //   const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        //   if (dist2 < connectionDistance) {
        //     ctx.beginPath();
        //     const alpha = (1 - dist2 / connectionDistance) * 0.3;
        //     ctx.strokeStyle = `rgba(7, 58, 83, ${alpha})`;
        //     ctx.lineWidth = 0.8;
        //     ctx.moveTo(p.x, p.y);
        //     ctx.lineTo(p2.x, p2.y);
        //     ctx.stroke();
        //   }
        // }
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
            className="text-lg md:text-xl text-[#666666] mb-12 max-w-2xl leading-relaxed"
          >
            {description}
          </motion.p>

          {/* Prominent Search Bar */}
          {showSearchBar && (
            <motion.div
              variants={itemVariants}
              className="w-full max-w-2xl relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-[#355ED1] to-[#073A53] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative flex items-center bg-white rounded-full h-15 shadow-23xl border border-slate-100 overflow-hidden">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && onSearchSubmit(searchValue)}
                  className="flex-1 h-full px-4 text-lg text-[#073A53] placeholder-[#AEAEAE] outline-none rounded-full"
                />
                <div className="pl-2 pr-6 text-slate-400 flex-shrink-0">
                  <svg onClick={() => onSearchSubmit(searchValue)} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                </div>
                {/* <button
        onClick={() => onSearchSubmit(searchValue)}
        className="hidden md:block px-6 mx-3 h-10 bg-[#073A53] text-white font-black rounded-full hover:bg-[#0EBAB0] shadow-lg transition-all active:scale-95"
      >
        Search
      </button> */}
              </div>

              {/* Mobile Search Button */}
              <button
                onClick={() => onSearchSubmit(searchValue)}
                className="md:hidden mt-4 w-full h-12 bg-[#073A53] text-white font-black rounded-full shadow-lg"
              >
                Search Articles
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
    </div>
  );
};

export default BlogHero;