"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface SpotlightItem {
  id: string;
  titleFirstPart: string;
  titleSecondPart: string;
  description: string;
  image: string;
  type?: string;
  href?: string;
}

interface SpotlightSectionProps {
  HeadingFirstPart?: string;
  HeadingSecondPart?: string;
  items: SpotlightItem[];
}

/* ---------------- Professional Animations ---------------- */

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1], // Premium Cubic Bezier
    },
  },
};

/* ---------------- Main Component ---------------- */

export default function SpotlightSection({
  HeadingFirstPart = "Today’s",
  HeadingSecondPart = "Spotlight",
  items,
}: SpotlightSectionProps) {
  return (
    <motion.section
      className="w-full py-24 px-6 md:px-12 bg-[#FFFFFF]"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto">
        <motion.h2
          variants={cardVariants}
          className="text-3xl md:text-4xl font-black mb-16 tracking-tight"
        >
          <span className="text-[#335ECE]">{HeadingFirstPart} </span>
          <span className="text-[#666666]">{HeadingSecondPart}</span>
        </motion.h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ 
                y: -12,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              className="
                group
                relative
                w-full
                rounded-[0.5rem]
                bg-white
                shadow-[0_10px_30px_rgba(0,0,0,0.1)]
                hover:shadow-[0_20px_50px_rgba(51,94,206,0.15)]
                border border-transparent
                hover:border-[#002892]/20
                transition-all
                duration-500
                overflow-hidden
              "
            >
              {item.href ? (
                <Link href={item.href} className="block h-full">
                  <CardInner item={item} />
                </Link>
              ) : (
                <CardInner item={item} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* ---------------- Inner Card Content ---------------- */

function CardInner({ item }: { item: SpotlightItem }) {
  return (
    <>
      {/* Image Container with Zoom Effect */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={item.image}
          alt={`${item.titleFirstPart} ${item.titleSecondPart}`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-[#073A53]/0 group-hover:bg-[#073A53]/5 transition-colors duration-500" />
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8">
        {item.type && (
          <p className="text-s font-semibold text-[#666666] tracking-wide mb-3">
            {item.type}
          </p>
        )}

        <h3 className="text-[15px] md:text-[19px] font-semibold leading-[1.2] mb-4 group-hover:text-[#214F65] transition-colors">
          <span className="text-[#666666]">{item.titleFirstPart}</span>
          <span className="text-[#335ECE]"> {item.titleSecondPart}</span>
        </h3>

        <p className="text-[#666666] leading-relaxed text-[16px] md:text-[18px] line-clamp-4 group-hover:text-gray-600 text-justify">
          {item.description}
        </p>
        
        {/* Animated Bottom Line */}
        <div className="mt-6 h-[2px] w-0 bg-[#335ECE] group-hover:w-full transition-all duration-500 rounded-full" />
      </div>
    </>
  );
}