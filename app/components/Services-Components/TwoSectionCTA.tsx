"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface TwoSectionCTAProps {
  tagline: string;
  heading: string;
  description: string | string[];
  imageSrc: string;
  imageAlt?: string;
  buttonText?: string;
  buttonLink?: string;
  reverse?: boolean;
}

const textVariants: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const TwoSectionCTA = ({
  tagline,
  heading,
  description,
  imageSrc,
  imageAlt = "Section image",
  buttonText = "Get Started",
  buttonLink = "/schedule-call",
  reverse = false,
}: TwoSectionCTAProps) => {
  
  const descriptionArray = Array.isArray(description) 
    ? description 
    : (description ? [description] : []);

  return (
    <section className="w-full dark:bg-[#0a0a0a] text-[#666666] bg-[#FFFFFF] py-10 lg:py-14 overflow-hidden relative z-10">
      <div
        className={`container mx-auto px-4 md:px-6 flex flex-col gap-8 items-center 
        ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} justify-center lg:justify-between`}
      >
        {/* Left Content Section - Tight Spacing */}
        <motion.div
          className="w-full  lg:w-[52%] flex flex-col items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {tagline && (
            <motion.p 
              className="text-[16px] font-['Poppins'] font-semibold tracking-wide text-[#666666] mb-2"
              custom={0}
              variants={textVariants}
            >
              {tagline}
            </motion.p>
          )}

          <motion.h2
            className="text-[28px] md:text-[32px] font-bold text-[#335ECE] dark:text-white leading-[1.25] tracking-tight mb-6"
            custom={1}
            variants={textVariants}
          >
            {heading}
          </motion.h2>

          {/* Description Paragraphs - Direct Rendering */}
          <div className="space-y-4 w-full">
            {descriptionArray.map((para, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className="text-[17px] text-justify leading-relaxed  dark:text-gray-400 font-medium"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Right Image Section - Compact & Framed */}
        <motion.div
          className="w-full  lg:w-[43%] flex items-center justify-center lg:justify-end "
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          {/* Unique Frame Design */}
          <div className="relative  shadow-2xl overflow-hidden group rounded-[15px]">
            {/* Double Border Effect */}
            <div className="absolute inset-0  group-hover:opacity-100 transition duration-1000"></div>
            
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={600}
              height={400}
              className=" object-cover relative z-10"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TwoSectionCTA;