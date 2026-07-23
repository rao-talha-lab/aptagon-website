"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/app/lib/caseStudies";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const allProjects = caseStudies;

  const categories = [
    "All",
    ...Array.from(new Set(allProjects.map((p) => p.category))),
  ];

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  // Determine featured projects based on slug
  const featuredProjects = [
    allProjects.find((p) => p.slug === "northwave-commerce"),
    allProjects.find((p) => p.slug === "finlight-personal-finance"),
    allProjects.find((p) => p.slug === "savor-restaurant-booking"),
  ].filter((p): p is (typeof allProjects)[0] => Boolean(p));

  // Card images mapping
  const cardImages: Record<string, string> = {
    "northwave-commerce": "/portfolio-images/Card-images/card-img-1.png",
    "finlight-personal-finance":
      "/portfolio-images/Card-images/card-img-2.png",
    "evergreen-brand-identity":
      "/portfolio-images/Card-images/card-img-3.png",
    "pulse-analytics-dashboard":
      "/portfolio-images/Card-images/card-img-4.png",
    "lumen-social-campaign":
      "/portfolio-images/Card-images/card-img-5.png",
    "savor-restaurant-booking":
      "/portfolio-images/Card-images/card-img-6.png",
  };

  const cardBgColors: Record<string, string> = {
    "northwave-commerce": "bg-[#5383FF]",
    "finlight-personal-finance": "bg-[#8EAEFF]",
    "evergreen-brand-identity": "bg-[#F0EFED]",
    "pulse-analytics-dashboard": "bg-[#F0EFED]",
    "lumen-social-campaign": "bg-[#8EAEFF]",
    "savor-restaurant-booking": "bg-[#D7E2FF]",
  };

  const cardImageStyles: Record<string, { fit: string; padding: string }> = {
    "northwave-commerce": { fit: "object-contain", padding: "p-4" },
    "finlight-personal-finance": { fit: "object-contain", padding: "p-4" },
    "evergreen-brand-identity": { fit: "object-cover", padding: "p-4" },
    "pulse-analytics-dashboard": { fit: "object-cover", padding: "p-4" },
    "lumen-social-campaign": { fit: "object-contain", padding: "p-4" },
    "savor-restaurant-booking": { fit: "object-contain", padding: "p-4" },
  };


  const featuredImages: Record<number, string> = {
    0: "/portfolio-images/Card-images/card-img-1.png",
    1: "/portfolio-images/Card-images/card-img-2.png",
    2: "/portfolio-images/Card-images/card-img-6.png",
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
    hover: { y: -8, transition: { duration: 0.3 } },
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#1a1a1a] transition-colors duration-300 pt-24">
        <div className="relative z-30 shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
          {/* ================= PORTFOLIO HERO SECTION ================= */}
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
                  className="inline-block px-5 py-1.5 bg-[#002892]/10 border-1 border-[#335ECE] text-[#335ECE] font-semibold text-sm md:text-base rounded-full mb-4"
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

                {/* CTA Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap justify-center gap-4 mb-8"
                >
                  <button
                    onClick={() => {
                      document.getElementById("case-study")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className="px-8 py-4 bg-[#335ECE] text-[17px] text-white font-bold rounded-sm shadow-lg hover:cursor-pointer"
                  >
                    View Case Studies
                  </button>
                  <Link href="/schedule-call">
                    <button className="px-8 py-4 border-2 border-[#666666] text-[#666666] font-bold rounded-sm hover:cursor-pointer">
                      Start your Project →
                    </button>
                  </Link>
                </motion.div>

                {/* Stats Badge */}
                <motion.div variants={itemVariants} className="mb-8">
                  <div
                    className="inline-flex flex-wrap justify-center items-center gap-4 md:gap-8 px-6 md:px-10 py-4 border-2 border-[#335ECE] rounded-full shadow-lg"
                    style={{
                      boxShadow: "0 4.3px 21.5px 0 rgba(51,94,206,0.2)",
                    }}
                  >
                    <div className="flex items-baseline gap-1">
                      <span className="text-[#335ECE] font-bold text-lg md:text-xl">
                        50+
                      </span>
                      <span className="text-[#666666] dark:text-white font-semibold text-sm md:text-base">
                        Projects
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[#335ECE] font-bold text-lg md:text-xl">
                        20+
                      </span>
                      <span className="text-[#666666] dark:text-white font-semibold text-sm md:text-base">
                        Clients
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[#335ECE] font-bold text-lg md:text-xl">
                        5+
                      </span>
                      <span className="text-[#666666] dark:text-white font-semibold text-sm md:text-base">
                        Industries
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[#335ECE] font-bold text-lg md:text-xl">
                        6yr
                      </span>
                      <span className="text-[#666666] dark:text-white font-semibold text-sm md:text-base">
                        Experience
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>
        </div>

        {/* ================= ALL CASE STUDIES SECTION ================= */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-[#FFFFFF] dark:bg-[#0f0f0f]"
          id="case-study"
        >
          <div className="container mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#335ECE] dark:text-white mb-2">
                    All Case Studies
                  </h2>
                  <p className="text-[#666666] dark:text-gray-400 text-sm md:text-base">
                    Filter by what you're curious about.
                  </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 md:gap-3 justify-start md:justify-end">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                        activeCategory === category
                          ? "bg-[#335ECE] text-white"
                          : "border border-[#335ECE] text-[#335ECE] hover:bg-[#335ECE] hover:text-white"
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {filteredProjects.map((project) => {
                  const styleConfig = cardImageStyles[project.slug] || {
                    fit: "object-contain",
                    padding: "p-4",
                  };

                  return (
                    <motion.div
                      key={project.slug}
                      variants={cardVariants}
                      whileHover="hover"
                      className="group cursor-pointer h-full"
                    >
                      <Link href={`/portfolio/${project.slug}`}>
                        <div className="relative overflow-hidden rounded-2xl bg-[#FFFFFF] dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 h-full w-full flex flex-col">
                          <div
                            className={`relative w-full aspect-[4/3] overflow-hidden flex items-center justify-center ${
                              cardBgColors[project.slug] || "bg-[#5182FF]"
                            }`}
                          >
                            <Image
                              src={
                                cardImages[project.slug] ||
                                "/portfolio-images/Card-images/card-img-1.png"
                              }
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className={`${styleConfig.fit} ${styleConfig.padding} group-hover:scale-105 transition-transform duration-500`}
                            />
                          </div>

                          {/* Card Content */}
                          <div className="p-6 flex flex-col grow justify-between">
                            <div>
                              {/* Category Tag */}
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-[#888888] dark:text-gray-400 text-[20px] md:text-[15px] font-medium">
                                  {project.category}
                                </span>
                              </div>

                              {/* Title */}
                              <h3 className="text-lg md:text-xl font-bold text-[#335ECE] dark:text-white mb-2 group-hover:text-[#335ECE] transition-colors duration-300">
                                {project.title}
                              </h3>

                              {/* Description */}
                              <p className="text-[#666666] dark:text-gray-400 text-[15px] leading-relaxed line-clamp-2 text-justify">
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

        {/* ================= FEATURED STORIES SECTION ================= */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-8 md:py-12 px-4 md:px-6 lg:px-8 bg-[#FFFFFF] dark:bg-[#1a1a1a]"
        >
          <div className="container mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-[#666666] text-[20px] md:text-[20px] font-semibold tracking-wider mb-2">
                Featured
              </h2>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#335ECE] dark:text-white mb-12">
                Stories we're proud of.
              </p>

              {/* Featured Projects */}
              <div className="space-y-8 md:space-y-12">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    variants={itemVariants}
                    className="group"
                  >
                    <Link href={`/portfolio/${project.slug}`}>
                      <div
                        className={`rounded-2xl mx-10 overflow-hidden transition-all duration-300 flex flex-col ${
                          index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                        }`}
                        style={{
                          boxShadow:
                            "4px 4px 4px rgba(0, 0, 0, 0.1), 0 4px 4px 4px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className={`relative w-full lg:w-1/2 h-64 md:h-80 lg:h-auto min-h-120 overflow-hidden flex items-center justify-center ${
                            cardBgColors[project.slug] || "bg-[#5383FF]"
                          }`}
                        >
                          <Image
                            src={
                              featuredImages[index] ||
                              cardImages[project.slug] ||
                              project.heroImages[0]
                            }
                            alt={project.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                          />
                        </motion.div>

                        {/* Featured Content */}
                        <div className="w-full lg:w-1/2 p-4 md:p-6 lg:p-8 flex flex-col justify-center bg-[#FFFFFF] dark:bg-[#1a1a1a]">
                          <p className="text-[#666666] font-semibold text-[20px] md:text-[18px] tracking-wide mb-2">
                            {project.category}
                          </p>
                          <h3 className="text-[25px] md:text-[30px] lg:text-[35px] font-bold text-[#335ECE] dark:text-white mb-3 md:mb-4 group-hover:text-[#335ECE] transition-colors duration-300">
                            {project.f_title}
                          </h3>
                          <p className="text-[#666666] dark:text-gray-400 text-[18px] md:text-[21px] mb-6 md:mb-8 line-clamp-3">
                            {project.description}
                          </p>

                          {/* Stats/Metrics */}
                          <div className="grid grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                            {project.metrics && project.metrics.length > 0 ? (
                              project.metrics.map((metric, idx) => (
                                <div key={idx}>
                                  <p className="text-[#335ECE] text-center font-bold text-[20px] md:text-[24px]">
                                    {metric.value}
                                  </p>
                                  <p className="text-[#666666] text-center dark:text-gray-400 text-[16px] md:text-[19px] leading-tight">
                                    {metric.label}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <>
                                <div>
                                  <p className="text-[#335ECE] font-bold text-lg md:text-2xl">
                                    {project.timeline}
                                  </p>
                                  <p className="text-[#666666] dark:text-gray-400 text-xs md:text-sm">
                                    Timeline
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[#335ECE] font-bold text-lg md:text-2xl">
                                    {project.tools.length}+
                                  </p>
                                  <p className="text-[#666666] dark:text-gray-400 text-xs md:text-sm">
                                    Tools
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[#335ECE] font-bold text-lg md:text-2xl">
                                    3+
                                  </p>
                                  <p className="text-[#666666] dark:text-gray-400 text-xs md:text-sm">
                                    Phases
                                  </p>
                                </div>
                              </>
                            )}
                          </div>

                          {/* Read Case Study Link */}
                          <div className="flex items-center gap-2 text-[#666666] font-bold text-[15px] md:text-[18px] group-hover:translate-x-2 transition-transform duration-300 w-fit hover:text-[#335ECE]">
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

        {/* ================= TRUST SECTION ================= */}
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
              className="text-center"
            >
              <p className="text-[#666666] text-[18px] md:text-[23px] font-bold tracking-wide mb-2">
                Trusted by
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#335ECE] dark:text-white mb-12">
                Teams who trust our work.
              </h2>

              {/* Testimonials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-4">
                {[
                  {
                    quote:
                      "They redesigned our app and our retention. Senior craft from day one.",
                    name: "Maya R.",
                    title: "Head of Product, Finlight",
                  },
                  {
                    quote: "Best agency partner we've worked with. Period.",
                    name: "James K.",
                    title: "CEO, Northwave Co.",
                  },
                  {
                    quote:
                      "Their work feels expensive — without the price tag.",
                    name: "Priya S.",
                    title: "Founder, Lumen",
                  },
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-[#FFFFFF] dark:bg-[#1a1a1a] p-8 rounded-2xl shadow-2xl hover:shadow-md duration-300 text-left"
                  >
                    <div className="flex gap-0.5 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-[#335ECE] text-[20px]">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-[#000000]/40 dark:text-gray-400 text-[18px] mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <p className="font-semibold text-[#335ECE] dark:text-white text-s">
                      {testimonial.name}
                    </p>
                    <p className="text-[#000000]/40 dark:text-gray-400 text-s">
                      {testimonial.title}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ================= CTA SECTION ================= */}
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
                  className="text-[#FFFFFF] text-lg md:text-xl mb-10 max-w-2xl mx-auto"
                >
                  "Best agency partner we've worked with. Period."
                </motion.p>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/reach-us"
                    className="inline-block px-8 md:px-10 py-3 md:py-4 bg-[#FFFFFF] text-[#335ECE] font-bold rounded-lg hover:bg-[#335ECE]/10 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Let's Work Together →
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </>
  );
};

export default PortfolioPage;