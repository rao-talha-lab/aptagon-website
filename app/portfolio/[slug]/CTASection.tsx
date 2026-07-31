"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
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
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-12 md:py-16 px-4 md:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        <div className="bg-[#335ECE] dark:bg-[#0f3a47] rounded-3xl px-8 md:px-12 lg:px-16 py-16 md:py-24 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFFFFF] mb-6"
            >
              Have a project in mind?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-[#FFFFFF] text-base sm:text-lg md:text-xl mb-10 max-w-none w-full text-center md:whitespace-nowrap"
            >
              "Let's build something great together — on time, on budget, and beyond expectations."
            </motion.p>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/reach-us"
                className="inline-block px-8 md:px-10 py-3 md:py-4 bg-[#FFFFFF] text-[#335ECE] font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Let's Work Together →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
