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
  const metaData = [
    { label: "Client", value: client },
    { label: "Industry", value: industry },
    { label: "Timeline", value: timeline },
    { label: "Tools", value: tools },
  ];

  return (
    <section className="py-14 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {metaData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-[#f5f7fa] border border-[#bfdbfe] dark:border-[#335ECE]/30 rounded-xl px-4 py-3 flex flex-col justify-center min-h-[90px]"
          >
            <span className="text-[14px] text-gray-500 font-semibold mb-1">
              {item.label}
            </span>
            <h4 className="text-[16px] md:text-[15px] font-semibold text-[#2563eb] leading-tight">
              {item.value}
            </h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
}