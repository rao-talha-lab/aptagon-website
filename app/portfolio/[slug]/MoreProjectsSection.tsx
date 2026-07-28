"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/app/lib/caseStudies";

interface MoreProjectsSectionProps {
  otherCaseStudies: CaseStudy[];
  currentSlug: string;
}

export default function MoreProjectsSection({
  otherCaseStudies,
  currentSlug,
}: MoreProjectsSectionProps) {
  const [showMoreProjects, setShowMoreProjects] = useState(false);
  const displayedProjects = showMoreProjects
    ? otherCaseStudies
    : otherCaseStudies.slice(0, 3);

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hover: { y: -8, transition: { duration: 0.3 } },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-[#FFFFFF] dark:bg-[#0f0f0f]"
    >
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#335ECE] dark:text-white mb-8">
            More projects
          </h2>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8"
          >
            {displayedProjects.map((project) => (
              <motion.div
                key={project.slug}
                variants={cardVariants}
                whileHover="hover"
                className="group cursor-pointer h-full"
              >
                <Link href={`/portfolio/${project.slug}`} className="block h-full">
                  <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden border border-gray-100 dark:border-gray-800">
                    
                    {/* Card Image Container with Dynamic Background Color */}
                    <div
                      style={{ backgroundColor: project.bgColor || "#F2F4F7" }}
                      className="relative w-full h-56 md:h-64 flex items-center justify-center p-6 overflow-hidden transition-colors duration-300"
                    >
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={project.heroImages[0]}
                          alt={project.title}
                          fill
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex flex-col grow justify-between">
                      <div>
                        {/* Category Label */}
                        <span className=" text-[15px] font-semibold text-[#666666] dark:text-gray-400 uppercase tracking-wider mb-5">
                          {project.category}
                        </span>

                        {/* Title */}
                        <h3 className="text-[15px] md:text-[20px] font-bold text-[#335ECE] dark:text-[#5383FF] group-hover:text-[#2849a5] transition-colors duration-300 leading-snug">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Show More / Show Less Button */}
          {otherCaseStudies.length > 3 && (
            <motion.div
              variants={itemVariants}
              className="flex justify-end"
            >
              <button
                onClick={() => setShowMoreProjects(!showMoreProjects)}
                className="px-6 py-2 border-2 border-[#335ECE] text-[#335ECE] font-bold rounded-full hover:bg-[#335ECE]/10 transition-all duration-300 text-sm"
              >
                {showMoreProjects ? "Show less" : "Show more"}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}