"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

const MotionLink = motion(Link);

// --- Typewriter Component (Fixed height & inline cursor to prevent layout jump) ---
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
    <span className="text-[#335ECE] whitespace-normal inline-block">
      {`${words[index].substring(0, subIndex)}`}
      <span
        className={`inline-block w-[3px] h-[30px] md:h-[42px] ml-1 bg-[#666666] align-middle ${
          blink ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
};

// --- Right Side: 4-Card Grid ---
const ReachUsGrid = () => {
  const cards = [
    { src: "/hero-right/message.svg", alt: "message", border: "border-[#335ED1]" },
    { src: "/hero-right/envelop.svg", alt: "mail", border: "border-[#335ECE]" },
    { src: "/hero-right/location.svg", alt: "location", border: "border-[#335ECE]" },
    { src: "/hero-right/phone.svg", alt: "phone", border: "border-[#335ECE]" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
      className="hidden lg:flex flex-1 items-center justify-center"
    >
      <div className="relative">
        {/* CENTER CIRCLE */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-[#335ECE] bg-white z-20 flex items-center justify-center shadow-md">
          <div className="w-12 h-12 rounded-full bg-[#335ECE]" />
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-2 gap-6 relative z-10">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 30px rgba(51,94,206,0.25)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`w-40 h-40 rounded-3xl border ${card.border} bg-white flex items-center justify-center shadow-[0_4px_20px_#0000002A] cursor-pointer`}
            >
              <Image src={card.src} alt={card.alt} width={48} height={48} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ReachUsHero = () => {
  return (
    <div className="relative z-30 bg-white shadow-[0_20px_30px_-10px_rgba(0,0,0,0.10)]">
      {/* Navbar se spacing dene ke liye pt-36 lg:pt-44 set kiya hai */}
      <section className="relative pt-36 pb-16 lg:pt-44 lg:pb-24 flex items-center overflow-hidden bg-[#FFFFFF]">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* LEFT SIDE CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="flex-1 text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-1 py-1 rounded-full mb-3"
              >
                <p className="text-[#666666] font-semibold uppercase tracking-wide text-[15px]">
                  Lets Connect For Innovation
                </p>
              </motion.div>

              {/* Heading */}
              <h1 className="text-[28px] md:text-[42px] font-black leading-[1.25] text-[#666666] mb-6 tracking-tighter min-h-[110px] md:min-h-[120px]">
                <span className="block">Partner With Us To</span>
                <TypewriterEffect
                  words={[
                    "Build Your Digital Future",
                    "Accelerate Business Growth",
                    "Transform Ideas Into Reality",
                  ]}
                />
              </h1>

              {/* Description */}
              <p className="text-[#666666] text-[18px] md:text-[20px] font-medium mb-8 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Turn your visionary ideas into scalable reality with our expert
                team of tech strategists and engineers.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <MotionLink
                  href="/schedule-call"
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center justify-center px-8 h-14 bg-[#355ED1] text-[16px] font-inter text-white font-medium rounded-[10px] shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    Get a Free Consultation
                    <HiArrowRight />
                  </span>
                </MotionLink>

                <MotionLink
                  href="/schedule-call"
                  whileHover={{ borderColor: "#335ECE", scale: 1.05 }}
                  className="inline-flex items-center justify-center px-14 h-14 text-[#666666] font-semibold text-[16px] border-[1.5px] border-[#666666] font-medium font-inter rounded-[10px] hover:text-[#335ECE] transition-all cursor-pointer"
                >
                  Start a Project
                </MotionLink>
              </div>
            </motion.div>

            {/* RIGHT SIDE GRID */}
            <ReachUsGrid />

          </div>
        </div>
      </section>
    </div>
  );
};

export default ReachUsHero;