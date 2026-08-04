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
      <span
        className={`inline-block w-1 h-8 md:h-12 ml-2 bg-[#666666] align-middle ${blink ? "opacity-100" : "opacity-0"
          }`}
      />
    </span>
  );
};

const SchedualHero = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    /* SOFT BOTTOM SHADOW FOR SECTION TRANSITION */
    <div className="relative z-30 bg-white shadow-[0_20px_30px_-10px_rgba(0,0,0,0.10)]">
      {/* Background Soft Glow Orb */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* --- HERO SECTION --- */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden min-h-[85vh] pt-36 pb-16 md:pt-44 md:pb-18">
        <div className="relative z-10 container mx-auto px-6 sm:px-12 lg:px-10 flex flex-col items-center text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="max-w-4xl w-full flex flex-col items-center"
          >
            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-[32px] sm:text-[45px] lg:text-[52px] font-extrabold text-[#555555] leading-[1.15] mb-5 tracking-tight"
            >
              Book a Strategy Session <br />
              <TypewriterEffect
                words={["With Our Tech Experts", "With Our Strategists", "With Our Team"]}
              />
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-[17px] md:text-[19px] text-[#666666] mb-10 max-w-2xl leading-relaxed font-normal text-center"
            >
              Pick a time that works for you to discuss your project requirements and explore
              how our digital solutions can scale your business.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0px 10px 25px rgba(51,94,206,0.3)" }}
                whileTap={{ scale: 0.96 }}
                onClick={() =>
                  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full sm:w-auto px-9 h-14 bg-[#335ECE] text-white font-bold rounded-[10px] shadow-lg transition-all cursor-pointer"
              >
                Check Availability
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, borderColor: "#335ECE", color: "#335ECE" }}
                whileTap={{ scale: 0.96 }}
                onClick={() => window.open("https://wa.me/923704640036", "_blank")}
                className="inline-flex items-center justify-center px-8 h-14 text-[#666666] text-[16px] border-[1.5px] border-[#666666] font-semibold  rounded-[10px] hover:text-[#335ECE] transition-all cursor-pointer"
              >
                Contact Support
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SchedualHero;