import React from 'react';
import Image from 'next/image';

interface Metric {
  value: string;
  label: string;
}

interface OutcomeSectionProps {
  stats?: Metric[];
  features?: string[];
  image?: string;
  bgColor?: string;
}

export default function OutcomeSection({
  stats = [
    { value: '60+', label: 'Games Supported' },
    { value: '100K+', label: 'Community Users' },
    { value: 'Web & Mobile', label: 'Platform' },
  ],
  features = [
    'Algorithmically matched gaming community',
    'Real-time squad finding and voice chat',
    'Twitch Extension for creator monetization',
  ],
  image = '/portfolio-images/Card-images/card-image-1.png',
  bgColor = '#4C75EE',
}: OutcomeSectionProps) {
  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-12 font-sans">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8 text-left">
          <span className="text-[17px] sm:text-[18px] font-['Poppins'] font-bold tracking-widest text-[#666666] uppercase block mb-1">
            OUTCOME
          </span>
          <h2 className="text-[30px] sm:text-[35px] font-['Poppins'] font-bold text-[#335ECE] dark:text-[#5383FF]">
            Results that matter.
          </h2>
        </div>

        {/* Top Stat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats?.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-8 bg-white dark:bg-[#1a1a1a] border border-[#335ECE]/30 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center min-h-[140px]"
            >
              <span className="text-[20px] sm:text-[30px] font-['Poppins'] font-bold text-[#335ECE] dark:text-[#5383FF]">
                {stat.value}
              </span>
              <span className="text-[15px] sm:text-[18px] font-medium text-gray-600 dark:text-gray-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Main Lower Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Mockup Box */}
          <div
            style={{ backgroundColor: bgColor }}
            className="rounded-2xl p-6 sm:p-10 flex items-center justify-center relative min-h-[360px] sm:min-h-[400px] overflow-hidden shadow-sm transition-colors duration-300"
          >
            <div className="relative w-full max-w-md aspect-[16/10] flex items-center justify-center">
              <Image
                src={image}
                alt="Platform Showcase Mockup"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right: What Changed List */}
          <div className="bg-[#EBF0FA] dark:bg-[#111827] rounded-2xl p-8 sm:p-12 flex flex-col justify-center text-left">
            <h3 className="text-[20px] sm:text-[30px] font-['Poppins'] font-semibold text-[#335ECE] dark:text-[#5383FF] mb-8">
              What changed
            </h3>

            <ul className="space-y-5">
              {features && features.length > 0 ? (
                features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full border border-[#666666] dark:border-gray-500 flex items-center justify-center text-[#666666] dark:text-gray-300">
                      <svg
                        className="w-2 h-2 stroke-[5]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-[#666666] dark:text-gray-300 text-base sm:text-lg font-medium">
                      {feature}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic">No features listed.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}