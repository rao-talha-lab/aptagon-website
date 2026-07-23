"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Card {
  image: string;
  title: string;
  slug: string;
  description: string;
}

interface FeatureSectionProps {
  heading: string;
  description: string;
  cards: Card[];
}

const FeatureCard = ({ card, index }: { card: Card; index: number }) => {
  return (
    <Link href={`/services/${card.slug}`} className="block mt-8 h-[400px]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{
          y: -12,
          rotateX: 4,
          rotateY: -4,
          transition: { duration: 0.3 },
        }}
        className="group relative cursor-pointer bg-white hover:bg-[#335ECE] 
        rounded-[1rem] rounded-tl-[5rem]
        border-2 border-[#335ECE] pt-16 pb-8 px-5 text-center
        shadow-[0_10px_30px_rgba(51,94,206,0.05)] 
        hover:shadow-[0_20px_40px_rgba(51,94,206,0.15)]
        transition-all duration-500 h-full flex flex-col justify-between"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Gradient Hover Background */}
        {/* <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#073A53] via-[#335ECE]/200 to-[#335ECE]" /> */}

        {/* Border Glow */}
        {/* <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 border-[2px] border-[#335ECE] rounded-[2rem]" /> */}

        {/* Icon */}
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-20">
          <div className="w-20 h-20 bg-gradient-to-br from-[#1E40AF] to-[#335ECE] 
                       rotate-45 rounded-2xl flex items-center justify-center 
                       shadow-[0_8px_20px_rgba(51,94,206,0.3)]
                       group-hover:from-white group-hover:to-white group-hover:scale-110 
                       transition-all duration-300">
            <div className="-rotate-45 flex items-center justify-center">
              <img
                src={card.image}
                alt={card.title}
                className="w-10 h-10 object-contain brightness-0 invert group-hover:[filter:invert(32%)_sepia(89%)_saturate(1883%)_hue-rotate(212deg)_brightness(94%)_contrast(92%)] transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-[#335ECE] mb-3 group-hover:text-white transition-colors">
            {card.title}
          </h3>
          <div className="w-18 h-[4px] bg-[#335ECE] group-hover:bg-white mb-5 rounded-full mx-auto transition-colors duration-300" />
          <p className="text-[17px] text-center leading-relaxed text-[#666666] leading-relaxed group-hover:text-white/80 transition-colors">
            {card.description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default function FeatureSection({
  heading,
  description,
  cards,
}: FeatureSectionProps) {
  const [showAll, setShowAll] = useState(false);

  // 👇 Control visible cards
  const visibleCards = showAll ? cards : cards.slice(0, 4);

  return (
    <section className="relative py-15 px-8 md:px-10 bg-[#FFFFFF] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#335ECE]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[#335ECE]/5 rounded-full blur-[120px]" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 text-center md:text-left">
          <h2 className="text-[25px] md:text-[33.5px] font-['Poppins'] font-bold text-[#335ECE] mb-6">
            {heading}
          </h2>

          <p className="text-[18px] text-[#666666]">{description}</p>
        </div>

        {/* Cards Grid */}
        <motion.div layout>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-4">
            {visibleCards.map((card, index) => (
              <FeatureCard key={index} card={card} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Button */}
        {cards.length > 3 && (
          <div className="flex justify-end mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-5 py-2 rounded-full border border-[#335ECE] text-[#335ECE]
                         hover:bg-[#335ECE] hover:text-white transition-all duration-300 text-sm font-medium shadow-md"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}