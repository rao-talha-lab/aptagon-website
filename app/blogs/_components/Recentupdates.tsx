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
}) => {
  return (
    /* Changed to bg-white and added w-full to ensure background covers the screen width */
    <section className="w-full bg-white py-16">
      <div className="ml-3 px-6 mb-10 text-start">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          <span className="text-[#335ECE]">Recent </span>
          <span className="text-[#666666]">Updates</span>
        </h2>
      </div>
      <div className="max-w-6xl mx-auto px-3">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-11 gap-12 items-start"
        >
          {/* Left Featured */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-6 bg-[#FFFFFF] overflow-hidden"
          >
            {/* Banner (FULL WIDTH) */}
            <div className="relative w-full bg-[#335ECE] text-[#FFFFFF] text-center py-4">
              <h3 className="text-xl md:text-2xl font-bold uppercase leading-tight">
                Software License Management
              </h3>
              <p className="text-lg md:text-xl italic opacity-90">
                managing your license effectively
              </p>
            </div>

            {/* Image (NARROWER) */}
            <div className="flex justify-center">
              <div className="relative mx-auto w-[85%] h-64 shadow-lg">
                <Image
                  src={mainImage}
                  alt={mainTitle}
                  fill
                  className="object-cover"
                />

                {/* Gradient overlay using your theme color */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#335ECE]/80 via-[#335ECE]/25 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Content (NARROWER) */}
            <div className="flex">
              <div className="px-10 w-[95%] text-start py-6">
                <h2 className="text-base md:text-2xl text-start font-bold text-[#335ECE] leading-tight">
                  {mainTitle} {":"}{" "}
                  <span className="text-[#666666] font-medium">{mainDescription}</span>
                </h2>
              </div>
            </div>
          </motion.div>

          {/* Right Updates List */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {updates.map((update, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="group flex items-start gap-4 p-3 transition-colors hover:bg-gray-50"
              >
                <div className="w-40 h-28 relative shrink-0 overflow-hidden shadow-sm">
                  <Image
                    src={update.image}
                    alt={update.title1}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#335ECE]/60 via-[#335ECE]/10 to-transparent"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#335ECE] text-base md:text-lg leading-snug">
                    {update.title1}{" "}
                    <span className="text-[#666666]">{update.title2}</span>
                  </h3>
                  <p className="text-[#CCCCCC] text-xs md:text-sm mt-1 font-medium opacity-0.01">
                    {update.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecentUpdates;