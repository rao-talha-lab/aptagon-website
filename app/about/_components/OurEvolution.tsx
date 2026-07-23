"use client";

import React from "react";
import { Play } from "lucide-react";

const OurEvolution: React.FC = () => {
  return (
    <section className="bg-[#FFFFFF] text-[#666666] pb-20">
      <div className="mx-auto max-w-8xl px-26">

        {/* TOP HEADING */}
        <div className="text-center mb-16 pt-10">
          <p className="text-[#666666] font-semibold tracking-wider text-sm pt-3 mb-3 uppercase">
            Our Story
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#355ED1]">
            Our Evolution
          </h2>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-18 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-4 text-s leading-relaxed text-[#4A6A7A]">

            <p className="text-justify">
              Every great company begins with a spark — ours ignited in 2022 with a clear vision: to build innovative, reliable, and impactful digital solutions. <br />
              Aptagon Technologies, based in Okara, started as a small team of passionate developers driven by creativity, quality, and a strong commitment to client success. From the very beginning, our focus has been on turning ideas into meaningful digital products that solve real-world problems. <br />
              Over the years, we have grown into a trusted software house, successfully partnering with startups, enterprises, and international clients. Our culture is defined by innovation, continuous learning, long-term client relationships, and solutions that are scalable, user-friendly, and purpose-driven.

            </p>

            {/* CEO SECTION */}
            <div className="pt-6">
              <h4 className="text-2xl font-bold text-[#355ED1] mb-3">
                Hear It From Our CEO
              </h4>

              <p className="text-base text-[#666666]">
                Listen to our CEO as he shares the story behind Aptagon Technologies, our mission, and our commitment to excellence.

              </p>
            </div>

          </div>

          {/* RIGHT VIDEO */}
          <div className="flex justify-center items-center">

            <div className="relative w-4xl rounded-xl overflow-hidden shadow-2xl group">

              {/* VIDEO */}
              <video
                className="w-4xl h-[400px] object-cover"
                poster="/about-us/about-us-img.png"
                controls
              >
                <source src="/about-us/ceo-video.mp4" type="video/mp4" />
              </video>

              {/* PLAY OVERLAY */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 bg-[#335ECE] rounded-full flex items-center justify-center shadow-xl">
                  <Play className="text-white w-8 h-8 ml-1" />
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default OurEvolution;