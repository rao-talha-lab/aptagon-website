"use client";
import React, { useEffect, useState } from "react";
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
    <span className="text-[#335ECE] inline-block">
      {`${words[index].substring(0, subIndex)}`}
      <span className={`inline-block w-1 h-8 md:h-12 ml-2 bg-[#666666] align-middle ${blink ? 'opacity-100' : 'opacity-0'}`} />
    </span>
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
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative z-30 shadow-[0_20px_30px_-10px_rgba(0,0,0,0.10)]">
      <section className={`relative flex items-center justify-center overflow-hidden bg-[#FFFFFF] pt-32 pb-16 md:pt-40 md:pb-20 ${height}`}>
        {/* Soft Background Blobs (Optional for subtle depth) */}
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
            {/* 2-Line Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-5xl lg:text-[52px] font-black text-[#666666] leading-[1.2] mb-6 tracking-tight min-h-[100px] md:min-h-[120px]"
            >
              <span className="block mb-1">Building Scalable &</span>
              <TypewriterEffect
                words={["Impactful Software", "Strategic Solutions", "Digital Futures"]}
              />
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-[#666666] mb-10 max-w-2xl leading-relaxed font-normal"
            >
              {description}
            </motion.p>

            {/* Search Bar */}
            {showSearchBar && (
              <motion.div
                variants={itemVariants}
                className="w-full max-w-md relative"
              >
                <div className="relative flex items-center bg-white rounded-full h-13 px-6 shadow-[0_12px_30px_rgba(51,94,206,0.18)] border border-[#E2E8F0] hover:border-[#335ECE]/30 transition-all duration-300">
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
                    className="text-[#666666] hover:text-[#335ECE] transition-colors focus:outline-none pl-2 cursor-pointer"
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