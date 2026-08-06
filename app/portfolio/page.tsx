"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/app/lib/caseStudies";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mounted, setMounted] = useState(false);

  // Ensure component is fully hydrated before rendering motion animations
  useEffect(() => {
    setMounted(true);
  }, []);

  const allProjects = caseStudies;

  // Extract unique categories safely
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(allProjects.map((p) => p.category?.trim())))],
    [allProjects]
  );

  // Robust Case-insensitive Filtering
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return allProjects;
    return allProjects.filter(
      (p) => p.category?.trim().toLowerCase() === activeCategory.trim().toLowerCase()
    );
  }, [activeCategory, allProjects]);

  // Featured Projects
  const featuredProjects = useMemo(
    () =>
      [
        allProjects.find((p) => p.slug === "pvp-gaming") ||
          allProjects.find((p) => p.slug === "northwave-commerce"),
        allProjects.find((p) => p.slug === "finlight-personal-finance"),
        allProjects.find((p) => p.slug === "savor-restaurant-booking"),
      ].filter((p): p is (typeof allProjects)[0] => Boolean(p)),
    [allProjects]
  );

  const cardImages: Record<string, string> = {
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
    2: "/portfolio-images/Card-images/card-img-6.png",
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
            <div className="container mx-auto text-center mb-12">
              <p className="inline-block px-5 py-1.5 bg-[#002892]/10 border border-[#335ECE] text-[#335ECE] font-semibold text-sm md:text-base rounded-full mb-4">
                Portfolio
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#666666] dark:text-white mb-6">
                Our work that <span className="text-[#335ECE]">drives results.</span>
              </h1>
              <p className="text-[#666666] dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
                A selection of brands, products and campaigns we've shaped —
                across industries, stages and ambitions.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <button
                  onClick={() => {
                    document.getElementById("case-study")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="px-8 py-4 bg-[#335ECE] text-[16px] text-white font-bold rounded-[10px] shadow-lg cursor-pointer hover:bg-[#284cb8] transition-all"
                >
                  View Case Studies
                </button>

                <Link href="/schedule-call">
                  <button className="px-8 py-4 border-2 border-[#666666] text-[#666666] font-semibold text-[16px] rounded-[10px] cursor-pointer hover:border-[#335ECE] hover:text-[#335ECE] transition-all">
                    Start your Project →
                  </button>
                </Link>
              </div>
            </div>
          </motion.section>
        </div>

        {/* ALL CASE STUDIES SECTION */}
        <section
          className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-[#FFFFFF] dark:bg-[#0f0f0f]"
          id="case-study"
        >
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-10">
              <div className="shrink-0">
                <h2 className="text-3xl font-bold text-[#335ECE] dark:text-white mb-2">
                  All Case Studies
                </h2>
                <p className="text-[#666666] dark:text-gray-400 text-base">
                  Filter by what you're curious about.
                </p>
              </div>

              {/* FILTER BUTTONS */}
              <div className="flex items-center gap-2 md:gap-3 overflow-x-auto scrollbar-none py-1 min-w-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`whitespace-nowrap shrink-0 px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer ${
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

            {/* GRID OF PROJECTS WITH ANIMATE PRESENCE */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 min-h-[300px]"
            >
              {mounted && (
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, idx) => (
                    <motion.div
                      key={project.slug}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="group cursor-pointer h-full flex flex-col"
                    >
                      <Link href={`/portfolio/${project.slug}`} className="h-full flex flex-col">
                        <div className="relative overflow-hidden rounded-2xl bg-[#FFFFFF] dark:bg-[#1a1a1a] border border-gray-100 shadow-lg dark:border-gray-800 transition-all duration-300 h-full w-full flex flex-col grow">
                          {/* Image Box */}
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
                                priority={idx < 3}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                                style={{ objectFit: "contain", objectPosition: "center" }}
                                className="group-hover:scale-105 transition-transform duration-500 ease-out"
                              />
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-4 md:p-5 flex flex-col grow justify-between bg-white dark:bg-[#1a1a1a]">
                            <div>
                              <span className="text-[#888888] dark:text-gray-400 text-xs font-medium block mb-1">
                                {project.category}
                              </span>
                              <h3 className="text-base md:text-md font-bold text-[#335ECE] dark:text-white mb-2 group-hover:text-[#2547a8] transition-colors duration-300">
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
                  ))}
                </AnimatePresence>
              )}
            </motion.div>
          </div>
        </section>

        {/* FEATURED STORIES SECTION */}
        <section className="-mt-6 md:-mt-10 py-8 md:py-12 px-4 md:px-6 lg:px-8 bg-[#FFFFFF] dark:bg-[#1a1a1a]">
          <div className="container mx-auto">
            <h2 className="text-[#666666] text-[20px] font-semibold tracking-wider mb-2">
              Featured
            </h2>
            <p className="text-1xl md:text-2xl lg:text-3xl font-bold text-[#335ECE] dark:text-white mb-12">
              Stories we're proud of.
            </p>

            <div className="space-y-8 md:space-y-12">
              {featuredProjects.map((project, index) => (
                <div key={project.slug} className="group">
                  <Link href={`/portfolio/${project.slug}`}>
                    <div
                      className={`rounded-2xl mx-2 md:mx-10 overflow-hidden transition-all duration-300 flex flex-col ${
                        index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                      }`}
                      style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
                    >
                      {/* Image Wrapper */}
                      <div
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
                          priority={index === 0}
                          sizes="(max-width: 1024px) 100vw, 800px"
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Content Wrapper */}
                      <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center bg-[#FFFFFF] dark:bg-[#1a1a1a]">
                        <p className="text-[#666666] dark:text-gray-400 font-medium text-base md:text-md mb-1">
                          {project.category}
                        </p>
                        <h3 className="text-1xl md:text-2xl lg:text-3xl font-bold text-[#335ECE] dark:text-white mb-4">
                          {project.f_title || project.title}
                        </h3>
                        <p className="text-[#666666] dark:text-gray-400 text-base md:text-md mb-6 line-clamp-3">
                          {project.description}
                        </p>

                        {/* Dynamic Stats Row */}
                        {project.stats && project.stats.length > 0 && (
                          <div className="grid grid-cols-3 gap-4 mb-8">
                            {project.stats.map(
                              (stat: { value: string; label: string }, sIdx: number) => (
                                <div key={sIdx} className="min-w-0 text-center">
                                  <p className="text-md sm:text-2xl md:text-2xl font-extrabold text-[#335ECE] dark:text-blue-400 whitespace-nowrap">
                                    {stat.value}
                                  </p>
                                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                                    {stat.label}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-[#666666] dark:text-gray-300 font-bold text-base md:text-lg group-hover:translate-x-2 transition-transform duration-300 w-fit hover:text-[#335ECE]">
                          <span>Read Case Study</span>
                          <span className="text-lg">→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default PortfolioPage;