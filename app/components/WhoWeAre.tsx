"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#335ECE] text-[#335ECE]">
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className="text-sm sm:text-base font-medium text-[#666666]">
      {text}
    </span>
  </div>
);

export default function WhoWeAre() {
  return (
    <section className="w-full bg-white py-14 lg:py-20 px-4 sm:px-8 lg:px-10 overflow-hidden">
      <div className="mx-auto max-w-7xl">

        {/* 40% / 60% Layout with Vertically Centered Items */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">

          {/* LEFT - IMAGE (40%) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-[40%] relative"
          >
            <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] shadow-xl">
              <Image
                src="/teammeeting.png"
                alt="Aptagon Technologies Team"
                width={600}
                height={450}
                className="w-full h-[360px] sm:h-[420px] lg:h-[480px] object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          </motion.div>

          {/* RIGHT - CONTENT (60%) with Safe Right Padding for Floating Widgets */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-[60%] lg:pr-16 space-y-4" // 👈 Added lg:pr-16 to prevent right floating widget overlap
          >
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold tracking-wider text-[#666666] uppercase">
                About Us
              </h4>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#335ECE] leading-tight">
                Driving Innovation Through Technology
              </h2>
            </div>

            <p className="text-[16px] sm:text-[17px] font-inter font-normal leading-relaxed text-[#555555]">
              At Aptagon Technologies, we build web platforms, AI Automation, and digital products that solve real business problems — not just look good. From Web Development and Business Process Automation to AI & Generative Solutions, Chatbot Development, and Software QA, we're the technology partner that takes your idea from concept to launch.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <FeatureItem text="Industry-leading expertise" />
              <FeatureItem text="Agile development process" />
              <FeatureItem text="24/7 dedicated support" />
              <FeatureItem text="Proven track record" />
            </div>

            <div className="pt-4">
              <Link href="/about" className="inline-block">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative flex items-center justify-center overflow-hidden rounded-xl px-8 py-3.5 text-base font-bold text-white shadow-md transition-all cursor-pointer bg-[#335ECE]"
                >
                  <span className="relative z-10">Discover More</span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                </motion.div>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}