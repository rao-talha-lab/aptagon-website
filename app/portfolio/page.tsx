"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/app/lib/caseStudies";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const allProjects = caseStudies;

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(allProjects.map((p) => p.category)))],
    [allProjects]
  );

  const filteredProjects = useMemo(
    () =>
      activeCategory === "All"
        ? allProjects
        : allProjects.filter((p) => p.category === activeCategory),
    [activeCategory, allProjects]
  );

  // NOTE: Ensure these slugs match the exact slugs in your `caseStudies.ts` file
  const featuredProjects = useMemo(
    () =>
      [
        allProjects.find((p) => p.slug === "pvp-gaming") || allProjects.find((p) => p.slug === "northwave-commerce"),
        allProjects.find((p) => p.slug === "finlight-personal-finance"),
        allProjects.find((p) => p.slug === "savor-restaurant-booking"),
      ].filter((p): p is (typeof allProjects)[0] => Boolean(p)),
    [allProjects]
  );

  const cardImages: Record<string, string> = {
    // "northwave-commerce": "/portfolio-images/Card-images/card-image-1.png",
    "pvp-gaming": "/portfolio-images/Card-images/card-image-1.png",
    "finlight-personal-finance": "/portfolio-images/Card-images/card-image-2.png",
    "evergreen-brand-identity": "/portfolio-images/Card-images/card-images-3.png",
    "pulse-analytics-dashboard": "/portfolio-images/Card-images/card-image-4.png",
    "lumen-social-campaign": "/portfolio-images/Card-images/card-img-5.png",
    "savor-restaurant-booking": "/portfolio-images/Card-images/card-img-6.png",
  };

  const cardBgColors: Record<string, string> = {
    "northwave-commerce": "bg-[#5383FF]",
    "pvp-gaming": "bg-[#5383FF]",
    "finlight-personal-finance": "bg-[#8EAEFF]",
   "evergreen-brand-identity": "bg-[#C7D9FF]",
    "pulse-analytics-dashboard": "bg-[#A5B4FC]",
    "lumen-social-campaign": "bg-[#8EAEFF]",
    "savor-restaurant-booking": "bg-[#D7E2FF]",
  };

  const featuredImages: Record<number, string> = {
    0: "/portfolio-images/Card-images/card-image-1.png",
    1: "/portfolio-images/Card-images/card-image-2.png",
    2: "/portfolio-images/Card-images/card-image-6.png",
  };

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
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#1a1a1a] transition-colors duration-300 pt-32">
        <div className="relative z-30 shadow-[0_5px_15px_rgba(0,0,0,0.10)]">
          {/* HERO SECTION */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative py-12 px-4 md:py-16 md:px-6 lg:px-8 overflow-hidden"
          >
            <div className="container mx-auto">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-center mb-12"
              >
                <motion.p
                  variants={itemVariants}
                  className="inline-block px-5 py-1.5 bg-[#002892]/10 border border-[#335ECE] text-[#335ECE] font-semibold text-sm md:text-base rounded-full mb-4"
                >
                  Portfolio
                </motion.p>
                <motion.h1
                  variants={itemVariants}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#666666] dark:text-white mb-6"
                >
                  Our work that <span className="text-[#335ECE]">drives results.</span>
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="text-[#666666] dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8"
                >
                  A selection of brands, products and campaigns we've shaped —
                  across industries, stages and ambitions.
                </motion.p>

             <motion.div
  variants={itemVariants}
  className="flex flex-wrap justify-center gap-4 mb-8"
>
  <motion.button
    whileHover={{ scale: 1.05 }}
    onClick={() => {
      document.getElementById("case-study")?.scrollIntoView({
        behavior: "smooth",
      });
    }}
    className="px-8 py-4 bg-[#335ECE] text-[16px] text-white font-bold rounded-[10px] shadow-lg hover:cursor-pointer transition-all"
  >
    View Case Studies
  </motion.button>

  <Link href="/schedule-call">
    <motion.button
      whileHover={{ scale: 1.05 }}
      className="px-8 py-4 border-2 border-[#666666] text-[#666666] font-semibold text-[16px] rounded-[10px] hover:cursor-pointer hover:border-[#335ECE] hover:text-[#335ECE] transition-all"
    >
      Start your Project →
    </motion.button>
  </Link>
</motion.div>
              </motion.div>
            </div>
          </motion.section>
        </div>

        {/* ALL CASE STUDIES SECTION */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-[#FFFFFF] dark:bg-[#0f0f0f]"
          id="case-study"
        >
          <div className="container mx-auto max-w-7xl">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12"
            >
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-10">
                <div className="shrink-0">
                  <h2 className="text-3xl font-bold text-[#335ECE] dark:text-white mb-2">
                    All Case Studies
                  </h2>
                  <p className="text-[#666666] dark:text-gray-400 text-base">
                    Filter by what you're curious about.
                  </p>
                </div>

                <div className="flex items-center gap-2 md:gap-3 overflow-x-auto scrollbar-none py-1 min-w-0">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`whitespace-nowrap shrink-0 px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                        activeCategory === category
                          ? "bg-[#335ECE] text-white shadow-sm"
                          : "border border-[#335ECE]/40 text-[#335ECE] hover:bg-[#335ECE] hover:text-white"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Projects */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
              >
                {filteredProjects.map((project) => {
                  return (
                    <motion.div
                      key={project.slug}
                      variants={cardVariants}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="group cursor-pointer h-full flex flex-col"
                    >
                      <Link href={`/portfolio/${project.slug}`} className="h-full flex flex-col">
                        <div className="relative overflow-hidden rounded-2xl bg-[#FFFFFF] dark:bg-[#1a1a1a] border border-gray-100 shadow-lg dark:border-gray-800 transition-all duration-300 h-full w-full flex flex-col grow">
                          {/* Image Box Container */}
                          <div
                            className={`relative w-full aspect-[4/3] rounded-t-2xl overflow-hidden flex items-center justify-center p-3 sm:p-4 ${
                              cardBgColors[project.slug] || "bg-[#5182FF]"
                            }`}
                          >
                            <div className="relative z-10 w-full h-full flex items-center justify-center">
                              <Image
                                src={
                                  cardImages[project.slug] ||
                                  "/portfolio-images/Card-images/card-image-1.png"
                                }
                                alt={project.title}
                                fill
                                quality={95}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                                style={{ objectFit: "contain", objectPosition: "center" }}
                                className="group-hover:scale-105 transition-transform duration-500 ease-out"
                              />
                            </div>
                          </div>

                          {/* Card Content Wrapper */}
                          <div className="p-4 md:p-5 flex flex-col grow justify-between bg-white dark:bg-[#1a1a1a]">
                            <div>
                              <span className="text-[#888888] dark:text-gray-400 text-xs font-medium block mb-1">
                                {project.category}
                              </span>
                              <h3 className="text-lg md:text-xl font-bold text-[#335ECE] dark:text-white mb-2 group-hover:text-[#2547a8] transition-colors duration-300">
                                {project.title}
                              </h3>
                              <p className="text-[#666666] dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                                {project.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* FEATURED STORIES SECTION */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="-mt-6 md:-mt-10 py-8 md:py-12 px-4 md:px-6 lg:px-8 bg-[#FFFFFF] dark:bg-[#1a1a1a]"
        >
          <div className="container mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-[#666666] text-[20px] font-semibold tracking-wider mb-2">
                Featured
              </h2>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#335ECE] dark:text-white mb-12">
                Stories we're proud of.
              </p>

              <div className="space-y-8 md:space-y-12">
                {featuredProjects.map((project, index) => (
                  <motion.div key={project.slug} variants={itemVariants} className="group">
                    <Link href={`/portfolio/${project.slug}`}>
                      <div
                        className={`rounded-2xl mx-2 md:mx-10 overflow-hidden transition-all duration-300 flex flex-col ${
                          index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                        }`}
                        style={{
                          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                        }}
                      >
                        {/* Image Wrapper */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className={`relative w-full lg:w-1/2 h-72 md:h-96 lg:h-[450px] overflow-hidden flex items-center justify-center ${
                            cardBgColors[project.slug] || "bg-[#5383FF]"
                          }`}
                        >
                          <Image
                            src={
                              featuredImages[index] ||
                              cardImages[project.slug] ||
                              (project.heroImages && project.heroImages[0]) ||
                              "/portfolio-images/Card-images/card-image-1.png"
                            }
                            alt={project.title}
                            fill
                            quality={95}
                            sizes="(max-width: 1024px) 100vw, 800px"
                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          />
                        </motion.div>

                        {/* Content Wrapper */}
                        <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center bg-[#FFFFFF] dark:bg-[#1a1a1a]">
                          <p className="text-[#666666] dark:text-gray-400 font-medium text-base md:text-lg mb-1">
                            {project.category}
                          </p>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#335ECE] dark:text-white mb-4">
                            {project.f_title || project.title}
                          </h3>
                          <p className="text-[#666666] dark:text-gray-400 text-base md:text-lg mb-6 line-clamp-3">
                            {project.description}
                          </p>

                          {/* Dynamic Stats Row */}
                         {/* Dynamic Stats Row */}
{/* Dynamic Stats Row */}
{project.stats && project.stats.length > 0 && (
  <div className="grid grid-cols-3 gap-4 mb-8">
    {project.stats.map((stat: { value: string; label: string }, sIdx: number) => (
      <div key={sIdx} className="min-w-0 text-center">
        {/* Top Value Line (Centered) */}
        <p className="text-xl sm:text-2xl md:text-2xl font-extrabold text-[#335ECE] dark:text-blue-400 whitespace-nowrap">
          {stat.value}
        </p>

        {/* Bottom Label Line (Centered) */}
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
          {stat.label}
        </p>
      </div>
    ))}
  </div>
)}

                          <div className="flex items-center gap-2 text-[#666666] dark:text-gray-300 font-bold text-base md:text-lg group-hover:translate-x-2 transition-transform duration-300 w-fit hover:text-[#335ECE]">
                            <span>Read Case Study</span>
                            <span className="text-lg">→</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </>
  );
};

export default PortfolioPage;