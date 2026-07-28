"use client";

import { motion } from "framer-motion";

interface ProblemSolutionSectionProps {
  client: string;
  problem: string;
  solution: string;
}

export default function ProblemSolutionSection({
  client,
  problem,
  solution,
}: ProblemSolutionSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  };

  return (
    /* White background — no gray section bg, matches image */
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="py-5 px-4 mb-13 md:px-6 lg:px-8 bg-[#FFFFFF] dark:bg-[#1a1a1a]"
    >
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <motion.div
            variants={itemVariants}
            className="
              bg-[#FFFFFF] dark:bg-[#1a1a1a]
              border-2 border-[#002892]/20 dark:border-[#0EBAB0]/30 hover:border-[#335ECE]
              shadow-[#002892]/10 shadow-lg
              hover:scale-101
              rounded-2xl
              p-7 md:p-9
              flex flex-col gap-3
            "
          >
            {/* Label */}
            <span className="text-[#666666] text-[15px] font-bold uppercase tracking-widest">
              Problem
            </span>
            {/* Client name as bold heading */}
            <h3 className="text-[#335ECE] dark:text-white text-[18px] md:text-[25px] font-bold leading-snug">
              {client}
            </h3>
            {/* Problem text — dark, readable */}
            <p className="text-[#666666] dark:text-gray-300 text-[14px] md:text-[17px] leading-relaxed">
              {problem}
            </p>
          </motion.div>

          {/* ── SOLUTION CARD ──
              Deep navy bg, teal label, white text — matches image */}
          <motion.div
            variants={itemVariants}
            className="
              bg-[#335ECE] dark:bg-[#0a1e2b]
              shadow-[#002892]/10 shadow-lg
              hover:scale-101
              rounded-2xl
              p-7 md:p-9
              flex flex-col gap-3
            "
          >
            {/* Label */}
            <span className="text-[#FFFFFF] text-[15px] font-bold uppercase tracking-widest">
              Solution
            </span>
            {/* "What we did" heading */}
            <h3 className="text-[#FFFFFF] text-[18px] md:text-[25px] font-bold leading-snug">
              What we did
            </h3>
            {/* Solution text */}
            <p className="text-[#FFFFFF] text-[14px] md:text-[17px] leading-relaxed">
              {solution}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}