"use client";

import { Card } from "@/components/ui/card";
import { SplineScene } from "@/components/ui/splite";
import { CursorSmoke } from "@/components/ui/cursor-smoke";
import Link from "next/link";
import { PiSparkleFill } from "react-icons/pi";

export function SplineSceneBasic() {
  return (
    <Card className="w-full h-screen top-20 sm:top-20 sm:mb-10 md:top-10  bg-[#DAEDFF] dark:bg-black relative overflow-hidden">
      {/* Smoke background */}
      <CursorSmoke />

      <div className="flex flex-col  md:flex-row h-full relative z-10 md:gap-10 md:space-x-0 lg:-space-x-80">
        {/* Spline Scene - Shows first on mobile */}
        <div className="w-full ml-15 md:ml-0 md:pt-0 pt-10 h-[60vh] md:hidden overflow-hidden">
          <SplineScene
            scene="https://prod.spline.design/6S7nZ7LL-qN0XpjX/scene.splinecode"
            className="w-full h-full scale-170"
          />
        </div>

        {/* Left content */}
        <div className="w-full md:w-[55%] lg:w-[50%] h-[40vh] md:h-full p-8 md:p-12 lg:p-16 flex flex-col justify-center items-center md:items-start text-center md:text-left relative z-20">
          <span className="uppercase text-sm md:text-lg text-[#335ECE] font-semibold mb-4 block">
            Empowering Businesses Through Innovation
          </span>
          <h1 className="text-4xl md:text-5xl md:max-w-xl font-bold text-neutral-800 dark:text-white leading-tight mb-6">
            Transforming Concepts Into{" "}
            <span className="text-[#335ECE]">Powerful Digital Solutions</span>
          </h1>
          <Link
            href="/reach-us"
            className="px-6 py-3 md:px-8 md:py-2 bg-[#00B8D4] text-white text-sm md:text-lg font-bold rounded-lg hover:bg-[#00A0C0] transition-all duration-300 ease-in-out hover:shadow-xl w-fit flex items-center gap-2"
          >
            Let's Collaborate
            <span>→</span>
          </Link>
        </div>

        {/* Right content - Hidden on mobile, side by side on desktop */}
        <div className="hidden md:block md:relative w-full md:w-[45%] lg:w-[65%] overflow-hidden z-10">
          <SplineScene
            scene="https://prod.spline.design/6S7nZ7LL-qN0XpjX/scene.splinecode"
            className="w-full h-full"
          />

          {/* Text overlay on bottom right */}
          <div className="hidden lg:block absolute bottom-32 lg:bottom-30 right-8 lg:right-0 z-20">
            <div className=" max-w-82.5">
              <div className="flex items-center bg-white dark:bg-black w-fit px-4 rounded-lg gap-3 mb-3 py-2">
                <span className="text-[#335ECE] text-xl">
                  <PiSparkleFill />
                </span>
                <span className="dark:text-white text-lg font-semibold text-[#335ECE]">
                  AI-Driven Solutions
                </span>
              </div>
              <p className="text-lg dark:text-white text-neutral-600">
                From idea to execution, Aptagon Technologies builds intelligent
                software that simplifies operations and scales businesses
              </p>
            </div>
          </div>

          {/* Hide Spline watermark */}
          <div className="absolute bottom-0 right-0 w-40 h-20 bg-[#DAEDFF] dark:bg-black z-50" />
        </div>
      </div>
    </Card>
  );
}
