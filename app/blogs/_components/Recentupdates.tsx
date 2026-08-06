
"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

interface UpdateItem {
  title1: string;
  title2: string;
  date: string;
  image: string;
}

interface RecentUpdatesProps {
  mainTitle: string;
  mainDescription: string;
  mainImage: string;
  updates: UpdateItem[];
  showMain?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const RecentUpdates: React.FC<RecentUpdatesProps> = ({
  mainTitle,
  mainDescription,
  mainImage,
  updates,
  showMain = true,
}) => {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10 text-start ml-3">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          <span className="text-[#335ECE]">Recent </span>
          <span className="text-[#666666]">Updates</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-11 gap-10 items-stretch"
        >
          {/* Left Featured (Only shows if search matches it or if search is empty) */}
          {showMain && (
            <motion.div
              variants={cardVariants}
              className={`${
                updates.length > 0 ? "md:col-span-6" : "md:col-span-11"
              } bg-[#FFFFFF] overflow-hidden`}
            >
              <div className="relative w-full bg-[#335ECE] text-[#FFFFFF] text-center py-8">
                <h3 className="text-xl md:text-2xl font-bold uppercase leading-tight">
                  {mainTitle}
                </h3>
                <p className="text-lg md:text-xl italic opacity-90">
                  managing your license effectively
                </p>
              </div>

              <div className="flex justify-center">
                <div className="relative mx-auto w-[82%] h-76 shadow-lg">
                  <Image
                    src={mainImage}
                    alt={mainTitle}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#335ECE]/80 via-[#335ECE]/25 to-transparent pointer-events-none" />
                </div>
              </div>

              <div className="flex">
                <div className="px-10 w-[95%] text-start py-6">
                  <h2 className="text-base md:text-2xl text-start font-bold text-[#335ECE] leading-tight">
                    {mainTitle} {":"}{" "}
                    <span className="text-[#666666] font-medium">
                      {mainDescription}
                    </span>
                  </h2>
                </div>
              </div>
            </motion.div>
          )}

          {/* Right Updates List */}
          {updates.length > 0 && (
            <div
              className={`${
                showMain ? "md:col-span-5" : "md:col-span-11"
              } flex flex-col`}
            >
              {updates.map((update, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="group flex items-start gap-5 pb-6 border-b border-gray-200/80 last:border-none"
                >
                  <div className="w-28 h-28 md:w-36 md:h-32 relative shrink-0 overflow-hidden shadow-sm rounded-md">
                    <Image
                      src={update.image}
                      alt={update.title1}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(51, 94, 206, 0.75) 0%, rgba(51, 94, 206, 0) 100%)",
                      }}
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between items-start py-0.5">
                    <div className="inline-block">
                      <h3 className="text-sm md:text-md font-bold leading-snug max-w-[260px]">
                        <span className="text-[#335ECE]">{update.title1}</span>
                        <span className="text-[#666666]">{update.title2}</span>
                      </h3>
                      <div className="pt-1.5 mt-1.5 border-t border-gray-200/90 w-full">
                        <div className="flex items-center gap-1.5 text-gray-300 text-xs font-normal">
                          <svg
                            className="w-3.5 h-3.5 text-gray-300 stroke-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <circle cx="12" cy="12" r="9" />
                            <polyline points="12 7 12 12 15 15" />
                          </svg>
                          <span>{update.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default RecentUpdates;