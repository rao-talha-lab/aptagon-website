"use client";

import ReachUs from "../components/ReachUs";
import Footer from "../components/Footer";
import TransparentNavbar from "../components/Navbar";
import ReachHero from "./ReachHero";
import Image from "next/image";

export default function ReachUsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a] transition-colors duration-300">
      <TransparentNavbar />
      
      {/* Main Content Area for Better SEO */}
      <main>
        {/* Reach Us Hero Section */}
        <ReachHero />

        {/* Contact Form / Info Section */}
        <ReachUs />

        {/* FULL WIDTH MAP CONTAINER */}
        <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden shadow-inner mt-8">
          <Image
            src="/reach-us/map.png"
            alt="Aptagon Technologies Location Map"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}