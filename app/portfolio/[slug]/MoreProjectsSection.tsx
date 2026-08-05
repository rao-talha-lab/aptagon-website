"use client";

import { useState } from "react";
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
  
  // Directly prepare rendered array
  const displayedProjects = showMoreProjects
    ? otherCaseStudies
    : otherCaseStudies.slice(0, 3);

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-[#FFFFFF] dark:bg-[#0f0f0f]">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#335ECE] dark:text-white mb-8">
          More projects
        </h2>

        {/* Projects Grid - Direct CSS transitions for zero JS animation lag */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedProjects.map((project, index) => (
            <div
              key={project.slug}
              className="group cursor-pointer h-full hover:-translate-y-2 transition-transform duration-200 ease-out"
            >
              <Link href={`/portfolio/${project.slug}`} className="block h-full">
                <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800">
                  
                  {/* Image Container */}
                  <div
                    style={{ backgroundColor: project.bgColor || "#F2F4F7" }}
                    className="relative w-full h-52 md:h-60 flex items-center justify-center p-6 overflow-hidden transition-colors duration-300 rounded-t-2xl"
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={project.heroImages[0]}
                        alt={project.title}
                        fill
                        priority={true} // Sabhi visual projects pehle se pre-fetch honge
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="px-5 py-4 flex flex-col justify-start">
                    <span className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 block">
                      {project.category}
                    </span>

                    <h3 className="text-[14px] md:text-[16px] font-bold text-[#335ECE] dark:text-[#5383FF] group-hover:text-[#2849a5] transition-colors duration-200 leading-snug">
                      {project.title}
                    </h3>
                  </div>

                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        {otherCaseStudies.length > 3 && (
          <div className="flex justify-end">
            <button
              onClick={() => setShowMoreProjects(!showMoreProjects)}
              className="px-6 py-2 border-2 border-[#335ECE] text-[#335ECE] font-bold rounded-full hover:bg-[#335ECE]/10 transition-all duration-200 text-sm cursor-pointer"
            >
              {showMoreProjects ? "Show less" : "Show more"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}