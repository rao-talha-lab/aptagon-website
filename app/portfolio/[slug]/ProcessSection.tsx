"use client";

import { motion } from "framer-motion";

interface ProcessSectionProps {
  research?: string;
  wireframes?: string;
  uiDesign?: string;
  development?: string;
}

export default function ProcessSection({
  research,
  wireframes,
  uiDesign,
  development,
}: ProcessSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  /* Dynamic step items based on passed props with fallback defaults */
  const steps = [
    {
      step: "01",
      title: "Research",
      description:
        research,
    },
    {
      step: "02",
      title: "Wireframes",
      description:
        wireframes,
    },
    {
      step: "03",
      title: "UI Design",
      description:
        uiDesign ,
    },
    {
      step: "04",
      title: "Development",
      description:
        development,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="py-14 md:py-20 px-4 md:px-6 lg:px-8 bg-[#335ECE]/10 dark:bg-[#0d1f1e]"
    >
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Section Header */}
          <div className="mb-10 md:mb-12">
            <p className="text-[#666666] text-[18px] font-semibold uppercase tracking-[0.18em] mb-2">
              Process
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.4rem] font-bold text-[#335ECE] dark:text-white leading-tight">
              How we got there.
            </h2>
          </div>

          {/* Process Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((item) => (
              <motion.div
                key={item.step}
                variants={itemVariants}
                className="
                  bg-[#FFFFFF] dark:bg-[#112120]
                  rounded-2xl
                  border border-[#0000000D] dark:border-[#1e3534]
                  p-6 md:p-7
                  flex flex-col gap-3
                  shadow-md
                  shadow-[#0000001A]
                "
              >
                <span className="text-[#666666] font-bold text-[15px] md:text-[20px] leading-none">
                  {item.step}
                </span>
                <h3 className="text-[#335ECE] dark:text-white font-bold text-lg md:text-xl leading-snug">
                  {item.title}
                </h3>
                <p className="text-[#666666] dark:text-gray-400 text-sm leading-relaxed text-justify">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}