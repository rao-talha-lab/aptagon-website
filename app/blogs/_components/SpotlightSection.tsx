"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface SpotlightItem {
  id: string;
  type: string;
  titleFirstPart: string;
  titleSecondPart: string;
  description: string;
  author?: string;
  image: string;
  href: string;
}

interface SpotlightSectionProps {
  HeadingFirstPart: string;
  HeadingSecondPart: string;
  items?: SpotlightItem[];
  columns?: 3 | 4;
}

const SpotlightSection: React.FC<SpotlightSectionProps> = ({
  HeadingFirstPart,
  HeadingSecondPart,
  items = [],
  columns,
}) => {
  const activeCols = columns || (items.length === 3 ? 3 : 4);

  const gridColsClass =
    activeCols === 3
      ? "grid-cols-1 md:grid-cols-3"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="py-10 px-4 md:px-8 max-w-7xl mx-auto w-full border-gray-200">
      {/* Heading Container */}
      <div className="mb-8 -mx-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#335ECE] mb-2">
          {HeadingFirstPart}
          <span className="text-[#666666] dark:text-white">
            {HeadingSecondPart}
          </span>
        </h2>
      </div>

      {/* Grid Layout */}
      <div className={`grid ${gridColsClass} gap-4 md:gap-5 w-full`}>
        {items.map((item) => (
          <Link key={item.id} href={item.href} className="group block w-full">
            {/* Card Container with Enhanced Hover & Glow */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 ease-out transform group-hover:-translate-y-2 group-hover:shadow-3xl group-hover:shadow-blue-500/10 group-hover:border-blue-200 dark:group-hover:border-blue-900/40 h-full flex flex-col relative">
              
              {/* Image Container with Smooth Zoom */}
              <div className="relative w-full h-40 md:h-44 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.titleFirstPart + item.titleSecondPart}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Card Content Body */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-xs font-semibold text-gray-500 capitalize tracking-normal block mb-2">
                    {item.type}
                  </span>

                  <h3 className="text-base md:text-lg font-bold mb-2.5 leading-snug">
                    <span className="text-[#666666] dark:text-white group-hover:text-[#335ECE] transition-colors duration-200">
                      {item.titleFirstPart}{" "}
                    </span>
                    <span className="text-[#335ECE] group-hover:text-[#666666] dark:group-hover:text-white transition-colors duration-200">
                      {item.titleSecondPart}
                    </span>
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>

                {item.author && (
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-2">
                    {item.author}
                  </p>
                )}
              </div>

              {/* Animated Bottom Line Accent */}
              <div className="h-1 w-0 group-hover:w-full bg-[#335ECE] transition-all duration-300 ease-in-out absolute bottom-0 left-0"></div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SpotlightSection;