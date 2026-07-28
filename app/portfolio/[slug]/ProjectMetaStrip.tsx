"use client";

import { motion } from "framer-motion";

interface ProjectMetaStripProps {
  client: string;
  industry: string;
  timeline: string;
  tools: string;
}

export default function ProjectMetaStrip({
  client,
  industry,
  timeline,
  tools,
}: ProjectMetaStripProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-12 md:py-16 px-4 md:px-6 lg:px-8 dark:border-gray-700"
    >
      <div className="container mx-auto">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
        >
          {/* Client */}
          <motion.div variants={itemVariants} className="p-3 text-center md:text-left border-2 border-[#002892]/10 rounded-xl hover:border-[#335ECE] hover:scale-102">
            <p className="text-[15px] md:text-[17px] font-semibold text-[#666666] dark:text-gray-500 tracking-wider mb-2">
              Client
            </p>
            <p className="text-[15px] md:text-[18px] font-bold text-[#335ECE] dark:text-white">
              {client}
            </p>
          </motion.div>

          {/* Industry */}
          <motion.div variants={itemVariants} className="p-3 text-center md:text-left border-2 border-[#002892]/10 rounded-xl hover:border-[#335ECE] hover:scale-102">
            <p className="text-[15px] md:text-[17px] font-semibold text-[#666666] dark:text-gray-500 tracking-wider mb-2">
              Industry
            </p>
            <p className="text-[15px] md:text-[18px] font-bold text-[#335ECE] dark:text-white">
              {industry}
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div variants={itemVariants} className="p-3 text-center md:text-left border-2 border-[#002892]/10 rounded-xl hover:border-[#335ECE] hover:scale-102">
            <p className="text-[15px] md:text-[17px] font-semibold text-[#666666] dark:text-gray-500 tracking-wider mb-2">
              Timeline
            </p>
            <p className="text-[15px] md:text-[18px] font-bold text-[#335ECE] dark:text-white">
              {timeline}
            </p>
          </motion.div>

          {/* Tools */}
          <motion.div
            variants={itemVariants}
            className="p-3 text-center md:text-left col-span-2 md:col-span-1 border-2 border-[#002892]/10 rounded-xl hover:border-[#335ECE] hover:scale-102" 
          >
            <p className="text-s md:text-sm font-semibold text-[#666666] dark:text-gray-500 tracking-wider mb-2">
              Tools
            </p>
            <p className="text-sm md:text-lg font-bold text-[#335ECE] dark:text-white line-clamp-2">
              {tools}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
