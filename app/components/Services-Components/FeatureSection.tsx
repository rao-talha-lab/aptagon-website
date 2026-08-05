"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/services/${card.slug}`);
  };

  return (
    <div 
      onClick={handleNavigation} 
      className="block mt-8 h-[350px] cursor-pointer"
    >
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
        className="group relative bg-white hover:bg-[#335ECE] 
        rounded-[1rem] rounded-tl-[5rem]
        border-2 border-[#335ECE] pt-16 pb-8 px-5 text-center
        shadow-[0_10px_30px_rgba(51,94,206,0.05)] 
        hover:shadow-[0_20px_40px_rgba(51,94,206,0.15)]
        transition-all duration-500 h-full flex flex-col justify-between"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Icon */}
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-20">
          <div className="w-20 h-20 bg-gradient-to-br from-[#1E40AF] to-[#335ECE] 
                         rotate-45 rounded-2xl flex items-center justify-center 
                         shadow-[0_8px_20px_rgba(51,94,206,0.3)]
                         group-hover:from-white group-hover:to-white group-hover:scale-110 
                         transition-all duration-300">
            <div className="-rotate-45 flex items-center justify-center">
              <div
                className="w-10 h-10 bg-white group-hover:bg-[#335ECE] transition-colors duration-300"
                style={{
                  maskImage: `url(${card.image})`,
                  WebkitMaskImage: `url(${card.image})`,
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                }}
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
          <p className="text-[14px] text-center leading-relaxed text-[#666666] group-hover:text-white/80 transition-colors">
            {card.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default function FeatureSection({
  heading,
  description,
  cards,
  currentSlug,
  relevantSlugs,
}: FeatureSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleCards = showAll ? cards : cards.slice(0, 4);

  return (
    <section className="relative py-15 px-1 md:px-2 bg-[#FFFFFF] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#335ECE]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[#335ECE]/5 rounded-full blur-[120px]" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mb-16 text-center md:text-left">
          <h2 className="text-[25px] md:text-[32px] font-['Poppins'] font-bold text-[#335ECE] mb-6">
            {heading}
          </h2>
          <p className="text-[17px] text-[#666666]">{description}</p>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 pb-4">
            {visibleCards.map((card, index) => (
              <FeatureCard key={card.slug} card={card} index={index} />
            ))}
          </div>
        </div>

        {cards.length > 4 && (
          <div className="flex justify-end mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-5 py-2 rounded-full border border-[#335ECE] text-[#335ECE]
                         hover:bg-[#335ECE] hover:text-white transition-all duration-300 text-sm font-medium shadow-md cursor-pointer"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}