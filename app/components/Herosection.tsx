"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const mobile = "/hero-right/mobile.svg";
const webplatform = "/hero-right/webplatform.svg";
const aiIcon = "/hero-right/ai.svg";
const automation = "/hero-right/automation.svg";
const deployed = "/hero-right/deployed.svg";
const shipped = "/hero-right/shipped.svg";
const launched = "/hero-right/launched.svg";
const star = "/hero-right/star.svg";

// --- Typewriter Component ---

interface TypewriterEffectProps {
  words: string[];
  firstWordColor?: string;
  restColor?: string; 
}

const TypewriterEffect = ({ 
  words, 
  firstWordColor = "text-[#666666]", 
  restColor = "text-[#335ECE]"     
}: TypewriterEffectProps) => {
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

  const currentFullText = words[index];
  const typedText = currentFullText.substring(0, subIndex);
  
  const firstSpaceIndex = currentFullText.indexOf(" ");
  
  let firstWordTyped = "";
  let restOfTextTyped = "";

  if (firstSpaceIndex === -1) {
    firstWordTyped = typedText;
  } else {

    const firstWordTotalLength = firstSpaceIndex + 1;

    if (subIndex <= firstWordTotalLength) {
      firstWordTyped = typedText;
    } else {
      firstWordTyped = currentFullText.substring(0, firstWordTotalLength);
      restOfTextTyped = currentFullText.substring(firstWordTotalLength, subIndex);
    }
  }

  return (
<span className="inline-block text-[52px] font-bold md:text-[62px] lg:text-[68px] ...">
        <span className={firstWordColor}>{firstWordTyped}</span>

      <span className={restColor}>{restOfTextTyped}</span>

      <span
        className={`inline-block w-1 h-10 md:h-14 ml-1 bg-[#666666] align-middle ${
          blink ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
};

// ================= ABOUT SECTION SUB-COMPONENTS =================

const TechTag = ({ label }: { label: string }) => (
  <div className="relative flex items-center justify-center rounded-full border border-[#002892] bg-[#002892]/10 px-5 py-1 -right-4">
    <span className=" text-[9px] text-center font-bold text-[#002892]">
      {label}
    </span>
  </div>
);

const StatItem = ({ label, sub }: { label: string; sub: string }) => (
  <div className="h-[76px] flex flex-col items-center justify-center text-center bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-[11.5px]">
    <p className="font-['Poppins'] text-[17.26px] font-bold text-[#335ECE] leading-tight">{label}</p>
    <p className="font-['Poppins'] text-[12.92px] text-[#073A53] font-medium mt-0.5">{sub}</p>
  </div>
);

const ServiceItem = ({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) => (
  <div className="flex items-center gap-3 p-3 border border-[#073A53]/20 bg-white rounded-[11.5px] shadow-[0_2px_8px_rgba(1,164,154,0.1)]">
    <Image src={icon} alt={title} width={24} height={24} className="w-6 h-6" />
    <div>
      <p className="font-['Poppins'] text-[9.59px] text-[#335ECE] font-semibold">{title}</p>
      <p className="font-['Poppins'] text-[6.71px] text-[#666666] font-medium">{desc}</p>
    </div>
  </div>
);

const DeliveryItem = ({
  icon,
  status,
  title,
  time,
}: {
  icon: string;
  status: string;
  title: string;
  time: string;
}) => (
  <div className="flex justify-between items-center py-1.5">
    <div className="flex items-center gap-2">
      <Image src={icon} alt={status} width={14} height={14} className="w-3.5 h-3.5" />
      <p className="font-['Poppins'] text-[10px] text-[#355ECE] font-bold">
        {status} - <span className="font-['Poppins'] text-[10px] text-[#666666] font-medium">{title}</span>
      </p>
    </div>
    <p className="text-[10px] text-[#666666]">{time}</p>
  </div>
);

// ================= ABOUT SECTION =================

const AboutSection = () => {
  return (
    <div className="relative w-full max-w-[440px] xl:max-w-[460px] bg-[#FAFAFA] rounded-[28px] border border-gray-200/60 p-6 shadow-[0_10px_35px_rgba(1,164,154,0.12)]">

      {/* TECH TAGS */}
      <div className="absolute -right-5 top-[230px] flex flex-col gap-1.5 z-30">
        <TechTag label="React" />
        <TechTag label="Node" />
        <TechTag label="AI" />
      </div>

      {/* CARD */}
      {/* <div className="relative w-[340px] flex-col items-center justify-center bg-[#FAFAFA] h-auto p-2"> */}

        {/* TOP BADGE */}
        <div className="absolute -top-4 -left-6 flex items-center gap-2 px-3.5 py-2 bg-[#FAFAFA] border-[0.9px] border-[#073A53]/20 shadow-[0_4px_16px_rgba(1,164,154,0.18)] rounded-[11.5px] z-20">
          <Image src={star} alt="Star rating" width={28} height={28} className="w-7 h-7" />
          <div className="flex flex-col leading-tight">
            <span className="font-inter text-[11.5px] font-extrabold text-[#335ECE]">4.9 / 5.0</span>
            <span className="text-[10px] font-medium font-inter text-[#666666]">200+ Reviews</span>
          </div>
        </div>
      <div className="w-full flex flex-col gap-2">
        {/* HEADER */}
        <div className="pt-2">
          <p className="font-['Poppins'] text-[12.7px] font-bold text-[#666666] uppercase tracking-wider">
            Aptagon Studio
          </p>
          <h2 className="font-['Poppins'] text-[17.26px] font-bold mt-0.5 text-[#335ECE]">
            Engineering Digital Impact
          </h2>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-2">
          <StatItem label="540+" sub="Projects" />
          <StatItem label="98%" sub="Retention" />
          <StatItem label="12+" sub="Countries" />
          <StatItem label="50+" sub="Experts" />
        </div>

        {/* SERVICES */}
        <div className="grid grid-cols-2 gap-2">
          <ServiceItem icon={mobile} title="Mobile Apps" desc="iOS - Android" />
          <ServiceItem icon={webplatform} title="Web Platforms" desc="Full-stack" />
          <ServiceItem icon={aiIcon} title="AI / LLM" desc="Custom models" />
          <ServiceItem icon={automation} title="Automation" desc="Workflows" />
        </div>

        {/* GROWTH */}
        <div className="border border-[#073A53]/20 rounded-xl p-3.5 ">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-['Poppins'] text-[9.59px] text-[#585858]">Client Growth</p>
              <p className="font-['Poppins'] text-[16.3px] font-bold text-[#043248]">
                +184% YoY
              </p>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-semibold text-[#002892]">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-[#002892] stroke-2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              Trending
            </div>
          </div>
          <div className="flex items-end justify-between h-11 gap-1.5 mt-2">
            {[50, 80, 55, 110, 100, 140, 90, 120].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="flex-1 bg-gradient-to-r from-[#355ED1] to-[#0A297E] rounded-[9.59px]"
              />
            ))}
          </div>
        </div>

        {/* DELIVERY */}
        <div className="border border-[#073A53]/20 rounded-xl p-3.5">
          <div className="flex justify-between items-center mb-1">
            <p className="font-['Poppins'] text-[9.59px] text-[#585858]/80">Recent Deliveries</p>
            <div className="flex items-center gap-1 text-[8px] font-semibold text-[#335ECE]">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-[#335ECE] stroke-2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              Trending
            </div>
          </div>
          <DeliveryItem icon={deployed} status="Deployed" title="Fintech Dashboard" time="2m ago" />
          <DeliveryItem icon={shipped} status="Shipped" title="AI Support Bot" time="1h ago" />
          <DeliveryItem icon={launched} status="Launched" title="E-commerce App" time="Today" />
        </div>
        </div>
      {/* </div> */}

      {/* BOTTOM BANNER */}
      <div className="absolute -bottom-5 -right-6 px-4 py-2 bg-[#FAFAFA] border border-[#073A53]/20 rounded-xl flex items-center gap-2.5 z-30 shadow-[0_4px_16px_rgba(1,164,154,0.18)]">
        <Image src={star} alt="Support" width={24} height={24} className="w-6 h-6" />
        <div className="flex flex-col leading-tight">
          <span className="font-['Inter'] text-[11.5px] font-extrabold text-[#002892]">Systems Online</span>
          <span className="font-['Poppins'] text-[8px] font-medium text-[#666666] mt-1">24/7 Global Support</span>
        </div>
      </div>

    </div>
  );
};

// ================= INTERFACES =================

interface AnimatedHeroSectionProps {
  tagline?: string;
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

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  glow: number;
}

// ================= MAIN HERO =================

const AnimatedHeroSection: React.FC<AnimatedHeroSectionProps> = ({
  tagline = "Empowering Businesses Through Innovation",
  description = "Transforming businesses with innovative technology solutions, strategic consulting, and world-class digital experiences.",
  primaryCtaText = "Explore Services",
  secondaryCtaText = "Let's Collaborate",
  primaryCtaHref = "#services",
  secondaryCtaHref = "/schedule-call",
  height = "min-h-screen",
  alignment = "left",
  showSearchBar = false,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange = () => {},
  onSearchSubmit = () => {},
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
    const particleCount = 65;
    const connectionDistance = 180;
    const mouseRadius = 300;
    const themeColors = { primary: "#335ECE" };

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

        ctx.beginPath();
        ctx.shadowBlur = p.glow * 8;
        ctx.shadowColor = themeColors.primary;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.glow > 0.1
            ? `rgba(51,94,222,${0.5 + p.glow})`
            : `rgba(51,94,222,${p.opacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < connectionDistance) {
            ctx.beginPath();
            const alpha = (1 - dist2 / connectionDistance) * 0.32;
            ctx.strokeStyle = `rgba(51,94,222,${alpha})`;
            ctx.lineWidth = 1.0;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
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
    <section className={`relative flex items-center overflow-hidden bg-white ${height} `}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-15">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="flex flex-col lg:flex-row items-center justify-center gap-6 xl:gap-10"
        >

          {/* ── LEFT SIDE (unchanged) ── */}
          <div className="w-full lg:w-[52%] flex flex-col items-start shrink-0">
            <motion.p
              variants={itemVariants}
              className="font-['Poppins'] text-[18.91px] mb-3 text-[#666666] font-medium "
            >
              {tagline}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-[36px] md:text-[48px] lg:text-[54px] font-['Poppins'] font-bold text-[#355ED1] mb-2 tracking-tighter leading-none"
            >
              We Build Digital <br />
              <span className="lg:whitespace-nowrap">
              <TypewriterEffect
                words={[
                  "Solutions That Matter",
                  "Ecosystems That Scale",
                  "Experiences That Inspire",
                ]}
              />
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-[18px] lg:text-[20px] font-['Poppins'] text-[#666666] font-medium mb-8 max-w-xl text-justify">
              {description}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              {showSearchBar ? (
                <div className="w-full max-w-md flex gap-2">
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && onSearchSubmit(searchValue)}
                    className="flex-1 px-6 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#335ECE]"
                  />
                  <button
                    onClick={() => onSearchSubmit(searchValue)}
                    className="px-8 py-3 bg-[#335ECE] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  >
                    Search
                  </button>
                </div>
              ) : (
                <>
                  <motion.a
                    href={primaryCtaHref}
                    whileHover={{ scale: 1.05 }}
                  onClick={handleExploreClick}
                    className="px-8 py-4 bg-[#355ED1] text-[21.05px] fonr-inter text-white font-medium rounded-[10px] shadow-lg"
                  >
                    {primaryCtaText} →
                  </motion.a>
                  <motion.a
                    href={secondaryCtaHref}
                    whileHover={{ borderColor: "#335ECE"}}
                    className="text-[#666666] text-[21.05px] px-8 py-4 border-[1.5px] border-[#666666] font-medium font-inter rounded-[10px]"
                  >
                    {secondaryCtaText}
                  </motion.a>
                </>
              )}
            </motion.div>
          </div>

          {/* ── RIGHT SIDE → AboutSection ── */}
          {alignment === "left" && (
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="w-full lg:max-[48%] flex items-center justify-center lg:justify-center pt-20 lg:pt-28 pb-12"
            >
              <AboutSection />
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedHeroSection;