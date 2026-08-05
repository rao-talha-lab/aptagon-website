"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface HeroSectionProps {
  title: string;
  description: string;
  category: string;
}

export default function HeroSection({
  title,
  description,
  category,
}: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative pt-10 px-4 md:pt-12 md:px-6 lg:px-8 overflow-hidden"
    >
      <div className="container mx-auto">
        {/* Breadcrumb — all inline on the left, matching image */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3 mb-6"
        >
          <Link
            href="/portfolio"
            className="flex items-center gap-1.5 text-[#666666] dark:text-gray-400 hover:text-[#335ECE] transition-colors duration-300 text-sm font-medium"
          >
            <span className="text-[#666666]">→</span>
            <span className="text-[#666666]">Back to portfolio</span>
          </Link>
          <span className="text-[#335ECE] text-sm font-semibold">
            {category}
          </span>
        </motion.div>

        {/* Title & Description */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <motion.h1
            variants={itemVariants}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#335ECE] dark:text-white mb-3 leading-tight"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-[#666666] dark:text-gray-400 text-base max-w-2xl max-w-full"
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}