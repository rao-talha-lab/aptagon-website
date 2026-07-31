"use client";
import React from "react";
import { motion } from "framer-motion";

const NewsletterSection = () => {
  // Exact 6 Columns × 15 Rows = 90 Dots
  const COLS = 6;
  const ROWS = 15;

  return (
    <section className="w-full flex justify-center py-16 px-4 bg-[#FFFFFF]">
      {/* Outer Wrapper for Dot Grid Positioning */}
      <div className="relative w-full max-w-5xl">

        {/* --- 1. DECORATIVE DOT GRID (Exact 6 Columns x 15 Rows) --- */}
        <div
          className="absolute -bottom-2 -left-18 z-0 pointer-events-none hidden sm:grid grid-cols-6 gap-[17px]"
          style={{ width: "110px" }}
        >
          {Array.from({ length: COLS * ROWS }).map((_, index) => (
            <span
              key={index}
              className="w-[6px] h-[6px] rounded-full bg-[#335ECE]/45 inline-block"
            />
          ))}
        </div>

        {/* --- 2. MAIN CARD CONTAINER --- */}
        <div className="relative z-10 w-full h-[380px] md:h-[420px] rounded-[24px] overflow-hidden shadow-xl bg-transparent flex items-center">

          {/* LAYER A: BACKGROUND WORKSPACE IMAGE */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
            <img
              src="/logos/Newsletter.png"
              alt="Workspace Laptop and Mobile"
              className="w-full h-full object-cover object-[75%_center] md:object-[80%_center]"
            />
          </div>

          {/* LAYER B: BLUE GRADIENT OVERLAY */}
          {/* LAYER B: Right side ka blue color drop / fade to transparent */}
          {/* LAYER B: Right side par halka sa (minor) blue tint */}
          <div
            className="absolute inset-0 z-10 w-full h-full pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #2B59FF 0%, #2B59FF 30%, rgba(43, 89, 255, 0.25) 55%, rgba(43, 89, 255, 0.10) 100%)",
            }}
          />

          {/* LAYER C: CONTENT AREA */}
          <div className="relative z-20 px-8 md:px-14 max-w-[500px]">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-2"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight tracking-tight">
                Get Aptagon’s <br /> Newsletter
              </h2>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-white/90 text-xs md:text-sm font-normal mb-6 max-w-[380px] leading-relaxed"
            >
              Sign up to get expert tips, updates, and the latest from Aptagon.
            </motion.p>

            {/* Form Inputs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-3.5 w-full sm:max-w-[380px]"
            >
              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter the mail"
                  className="w-full bg-[#2B59FF]/50 border border-white/70 rounded-xl px-4 py-3 text-white placeholder:text-white/80 focus:outline-none focus:border-white transition-all text-xs md:text-sm"
                />
              </div>

              {/* Sign Up Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-white text-[#2B59FF] font-bold py-3 rounded-xl shadow-md text-xs md:text-sm transition-all hover:bg-white/95"
              >
                Sign Up
              </motion.button>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default NewsletterSection;