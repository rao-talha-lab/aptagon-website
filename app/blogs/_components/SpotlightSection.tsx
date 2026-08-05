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
    // Base Section Wrapper
    <section className="py-10 w-full">
     
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#666666] text-left">
          <span className="text-[#335ECE]">{HeadingFirstPart} </span>
          <span className="text-[#666666] dark:text-white">
            {HeadingSecondPart}
          </span>
        </h2>
      </div>

      
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-5">
        <div className={`grid ${gridColsClass} gap-3 md:gap-4 w-full`}>
          {items.map((item) => (
            <Link key={item.id} href={item.href} className="group block w-full">
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 ease-out transform group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-blue-500/10 h-full flex flex-col relative">
                
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.titleFirstPart + item.titleSecondPart}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                <div className="p-3.5 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1">
                      {item.type}
                    </span>

                    <h3 className="text-xs md:text-sm font-bold mb-1.5 leading-snug">
                      <span className="text-[#335ECE] group-hover:text-[#666666] dark:group-hover:text-white transition-colors duration-200">
                        {item.titleFirstPart}
                      </span>
                      <span className="text-[#666666] dark:text-white group-hover:text-[#335ECE] transition-colors duration-200">
                        {item.titleSecondPart}
                      </span>
                    </h3>

                    <p className="text-gray-400 dark:text-gray-400 text-[11px] md:text-xs leading-relaxed mb-2">
                      {item.description}
                    </p>
                  </div>

                  {item.author && (
                    <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mt-1">
                      {item.author}
                    </p>
                  )}
                </div>

                <div className="h-1 w-0 group-hover:w-full bg-[#335ECE] transition-all duration-300 ease-in-out absolute bottom-0 left-0"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpotlightSection;