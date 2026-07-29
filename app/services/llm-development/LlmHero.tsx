"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
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
      <span className={`inline-block w-1 h-10 md:h-14 ml-2 bg-[#666666] align-middle ${blink ? 'opacity-100' : 'opacity-0'}`} />
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
    let start = 0;
    const end = target;
    let totalFrames = duration * 60;
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setCount(Math.floor(end * progress));
      if (frame === totalFrames) clearInterval(counter);
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
};

// --- LLM Engine Card (static, pixel-matched design — replaces the old 3D hub) ---
const LLMEngineCard = () => {
  const cols = [110, 340, 570, 800];
  const rows = [60, 165, 270];

  const connectedNodes: { x: number; y: number }[] = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      connectedNodes.push({ x: cols[c], y: rows[r] });
    }
  }
  const edges: [{ x: number; y: number }, { x: number; y: number }][] = [];
  for (let i = 0; i < connectedNodes.length; i++) {
    for (let j = i + 1; j < connectedNodes.length; j++) {
      edges.push([connectedNodes[i], connectedNodes[j]]);
    }
  }

  const isolatedNodes = rows.map((y) => ({ x: cols[3], y }));
  const highlighted = { x: cols[2], y: rows[1] };

  return (
    <div className="card">
      {/* Header */}
      <div className="header">
        <div>
          <p className="eyebrow">LLM ENGINE</p>
          <h1 className="title">Custom Model &middot; v2.4</h1>
        </div>

        <div className="iconBox">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="2" stroke="white" strokeWidth="1.4" />
            <circle cx="7" cy="9" r="1.6" stroke="white" strokeWidth="1.3" />
            <circle cx="21" cy="9" r="1.6" stroke="white" strokeWidth="1.3" />
            <circle cx="7" cy="19" r="1.6" stroke="white" strokeWidth="1.3" />
            <circle cx="21" cy="19" r="1.6" stroke="white" strokeWidth="1.3" />
            <circle cx="14" cy="5" r="1.6" stroke="white" strokeWidth="1.3" />
            <circle cx="14" cy="23" r="1.6" stroke="white" strokeWidth="1.3" />
            <path
              d="M14 12 L7 9 M14 12 L21 9 M14 12 L7 19 M14 12 L21 19 M14 12 L14 5 M14 12 L14 23 M7 9 L14 5 M21 9 L14 5 M7 19 L14 23 M21 19 L14 23"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.9"
            />
          </svg>
        </div>
      </div>

      {/* Network diagram */}
      <div className="diagramBox">
        <svg viewBox="0 0 900 330" className="diagramSvg" preserveAspectRatio="xMidYMid meet">
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#00AAA040"
              strokeWidth="1.5"
              opacity="0.45"
            />
          ))}

          {connectedNodes.map((n, i) => {
            const isHighlighted = n.x === highlighted.x && n.y === highlighted.y;
            return (
              <circle
                key={i}
                cx={n.x}
                cy={n.y}
                r={isHighlighted ? 15 : 13}
                fill={isHighlighted ? "#666666" : "#335ECE"}
              />
            );
          })}

          {isolatedNodes.map((n, i) => (
            <circle key={`iso-${i}`} cx={n.x} cy={n.y} r="13" fill="#335ECE" />
          ))}
        </svg>
      </div>

      {/* Stats */}
      <div className="statsRow">
        <div className="statCard">
          <span className="statValue">13B</span>
          <span className="statLabel">PARAMS</span>
        </div>
        <div className="statCard">
          <span className="statValue">8K</span>
          <span className="statLabel">CONTEXT</span>
        </div>
        <div className="statCard">
          <span className="statValue">99%</span>
          <span className="statLabel">ACCURACY</span>
        </div>
      </div>

      {/* Tags */}
      <div className="tagsRow">
        <span className="tag">Fine-tuning</span>
        <span className="tag">RAG</span>
        <span className="tag">Embeddings</span>
        <span className="tag">Multi-modal</span>
      </div>

      <style jsx>{`
        .card {
          width: 100%;
          max-width: 420px;
          background: #FFFFFF;
          border-radius: 22px;
          padding: 24px;
          box-shadow: 0 16px 36px rgba(51, 94, 206, 0.2),
            0 3px 10px rgba(20, 40, 50, 0.04);
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, sans-serif;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .eyebrow {
          margin: 0 0 6px 0;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #666666;
        }

        .title {
          margin: 0;
          font-size: 19px;
          font-weight: 800;
          color: #335ECE;
          letter-spacing: -0.2px;
        }

        .iconBox {
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #335ECE;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .iconBox :global(svg) {
          width: 20px;
          height: 20px;
        }

        .diagramBox {
          background: #335ECE0D;
          border: 1px solid #335ED199;
          border-radius: 14px;
          padding: 8px 6px;
          margin-bottom: 14px;
        }

        .diagramSvg {
          width: 100%;
          height: 128px;
          display: block;
        }

        .statsRow {
          display: flex;
          gap: 10px;
          margin-bottom: 14px;
        }

        .statCard {
          flex: 1;
          background: #ffffff;
          border-radius: 12px;
          padding: 12px 6px;
          box-shadow: 0 5px 12px rgba(20, 40, 50, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .statValue {
          font-size: 17px;
          font-weight: 800;
          color: #335ECE;
          margin-bottom: 2px;
        }

        .statLabel {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.4px;
          color: #666666;
        }

        .tagsRow {
          display: flex;
          flex-wrap: nowrap;
          gap: 6px;
        }

        .tag {
          flex: 1;
          padding: 7px 4px;
          border-radius: 999px;
          border: 1.2px solid #335ECE;
          color: #335ECE;
          font-size: 10.5px;
          font-weight: 700;
          background: #0028921A;
          white-space: nowrap;
          text-align: center;
        }

        @media (max-width: 1200px) {
          .card {
            max-width: 380px;
            padding: 20px;
          }
          .tag {
            font-size: 9.5px;
            padding: 6px 3px;
          }
        }
      `}</style>
    </div>
  );
};

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

const LlmHero: React.FC<AnimatedHeroSectionProps> = ({
  tagline = "LLM Development & Training",
  heading = "LLM Development & Training",
  description = "Delivering tailored LLM solutions and training to enhance automation, efficiency, and AI-driven insights.",
  primaryCtaText = "Start Training",
  secondaryCtaText = "Our Models",
  primaryCtaHref = "#",
  secondaryCtaHref = "#",
  height = "min-h-screen",
  alignment = "left",
  contentAlignment = "left",
  showSearchBar = false,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange = () => { },
  onSearchSubmit = () => { },
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
    const connectionDistance = 200;
    const mouseRadius = 300;
    const themeColors = { primary: "#0EBAB0" };

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

  // --- Right side: LLM Engine Card. Hidden below 1024px (lg), vertically centered ---
  const LLMEngineCardSection = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="hidden lg:flex flex-1 self-center items-center justify-center w-full"
    >
      <div className="w-full max-w-[450px]">
        <LLMEngineCard />
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


      <section className={`relative flex items-center overflow-hidden bg-[#FFFFFF] ${height}`}>
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
        <div className="relative lg:mt-10 z-10 container mx-auto px-6 pt-20 lg:pt-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className={`flex flex-col lg:flex-row items-center gap-12`}
          >
            <div className="max-w-3xl flex flex-col items-start">
              <motion.p variants={itemVariants} className="mb-3 text-[15px] text-[#666666] font-['Poppins'] font-semibold tracking-wide">
                {tagline}
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-[50px] font-black text-[#666666] leading-[1.2] mb-6 tracking-tighter"
              >
                Smart Business, <br /> Powered{" "}
                <TypewriterEffect
                  words={[
                    "by LLMs",
                    "by AI Agents",
                    "by Automations"
                  ]}
                />
              </motion.h1>

              <motion.p variants={itemVariants} className="text-[20px] text-[#666666] mb-10 leading-wide">
                {description}
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
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
              </motion.div>
            </div>

            {alignment === "left" && <LLMEngineCardSection />}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LlmHero;