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
  currentSlug?: string;
  relevantSlugs?: string[];
}

const FeatureCard = ({ card, index }: { card: Card; index: number }) => {
  return (
    <div className="relative pt-10 h-full">
      <Link href={`/services/${card.slug}`} className="block h-full min-h-[320px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          whileHover={{
            y: -4,
            transition: { duration: 0.2 },
          }}
          className="group relative cursor-pointer bg-white hover:bg-[#335ECE] 
          rounded-[1rem] rounded-tl-[5rem]
          border-2 border-[#335ECE] pt-20 pb-6 px-4 text-center
          shadow-[0_10px_30px_rgba(51,94,206,0.05)] 
          hover:shadow-[0_20px_40px_rgba(51,94,206,0.15)]
          transition-all duration-300 h-full flex flex-col justify-between"
        >
          {/* Diamond Icon Badge */}
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-20">
            <div className="w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-br from-[#1E40AF] to-[#335ECE] 
                          rotate-45 rounded-2xl flex items-center justify-center 
                          shadow-[0_8px_20px_rgba(51,94,206,0.3)]
                          group-hover:from-[#EEF4FF] group-hover:to-[#DBEAFE] group-hover:scale-105 
                          transition-all duration-300 border-2 border-white">
              <div className="-rotate-45 flex items-center justify-center">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain brightness-0 invert group-hover:[filter:invert(32%)_sepia(89%)_saturate(1883%)_hue-rotate(212deg)_brightness(94%)_contrast(92%)] transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="relative z-10 flex flex-col items-center">
            <h3 className="text-lg font-bold text-[#335ECE] mb-2 group-hover:text-white transition-colors leading-snug">
              {card.title}
            </h3>
            <div className="w-14 h-[3px] bg-[#335ECE] group-hover:bg-white mb-3 rounded-full transition-colors duration-300" />
            
            <p className="text-[13px] text-center text-[#666666] leading-normal group-hover:text-white/90 transition-colors">
              {card.description}
            </p>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default function FeatureSection({
  heading,
  description,
  cards = [],
  currentSlug = "",
  relevantSlugs = [],
}: FeatureSectionProps) {
  const [showAll, setShowAll] = useState(false);

  let orderedCards = [...cards];

  if (currentSlug) {
    const targetSlug = currentSlug.trim().toLowerCase();
    
    // 1. Current Active Card
    const currentCard = cards.find((c) => c.slug?.trim().toLowerCase() === targetSlug);

    if (currentCard) {
      // 2. Target Relevant Cards specified by user
      const relevant = cards.filter(
        (c) =>
          c.slug?.trim().toLowerCase() !== targetSlug &&
          relevantSlugs.includes(c.slug?.trim().toLowerCase())
      );

      // 3. Rest of the cards
      const others = cards.filter(
        (c) =>
          c.slug?.trim().toLowerCase() !== targetSlug &&
          !relevantSlugs.includes(c.slug?.trim().toLowerCase())
      );

      // Combine: Active Card -> Relevant Cards -> Rest of the cards
      orderedCards = [currentCard, ...relevant, ...others];
    }
  }

  const visibleCards = showAll ? orderedCards : orderedCards.slice(0, 4);

  return (
    <section className="relative py-6 px-2 md:px-6 bg-[#FFFFFF] overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mb-8 text-center md:text-left">
          <h2 className="text-[25px] md:text-[32px] font-['Poppins'] font-bold text-[#335ECE] mb-4">
            {heading}
          </h2>
          <p className="text-[16px] md:text-[17px] text-[#666666]">{description}</p>
        </div>

        <motion.div layout>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 px-2 pb-4">
            {visibleCards.map((card, index) => (
              <FeatureCard key={`${card.slug}-${index}`} card={card} index={index} />
            ))}
          </div>
        </motion.div>

        {orderedCards.length > 4 && (
          <div className="flex justify-end mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 rounded-full border border-[#335ECE] text-[#335ECE]
                         hover:bg-[#335ECE] hover:text-white transition-all duration-300 text-sm font-semibold shadow-md cursor-pointer"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}