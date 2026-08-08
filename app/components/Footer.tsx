"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/providers/ThemeProvider";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import LocationMap from "./LocationMap";

// --- Custom Social Icon Component ---
const SocialIcon = ({ Icon, name, color, link }: { Icon: any; name: string; color: string; link: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute bottom-full mb-2 px-3 py-1 rounded-md text-[10px] font-bold text-white z-50 shadow-lg"
            style={{ backgroundColor: color }}
          >
            {name}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
              style={{ borderTopColor: color }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -4, backgroundColor: color, color: "#FFFFFF" }}
        className="w-8 h-8 flex items-center justify-center bg-white dark:bg-white rounded-full transition-all duration-300 shadow-md"
      >
        <Icon size={14} className={isHovered ? "text-white" : "text-[#335ECE] dark:text-[#335ECE]"} />
      </motion.a>
    </div>
  );
};

const Footer: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="bg-[#335ECE] dark:bg-[#335ECE] text-white transition-colors duration-500 overflow-hidden">
      {/* Top Section */}
      <div className="max-w-10xl px-4 sm:px-6 lg:px-24 py-10 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.2fr] gap-4 lg:gap-12 items-center">

          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div whileHover={{ scale: 1.02 }} className="inline-block cursor-pointer">
              <Image
                src="/logos/footer-new-logo.png"
                width={212}
                height={63}
                alt="Aptagon Technologies Logo"
                className="mb-2 object-contain"
                priority
              />
            </motion.div>

            <p className="text-[14px] leading-relaxed text-[#ffffff] dark:text-[#ffffff] max-w-sm font-light text-justify">
              Aptagon Technologies is a software house committed to delivering innovative digital solutions that empower businesses to grow and succeed globally. We specialize in web development, mobile applications, business process automation, and digital transformation.
            </p>

            {/* --- CONNECT WITH US ROW (EXACT LAYOUT FROM REFERENCE IMAGE) --- */}
           
           
            <div className="pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                {/* Column 1: Title & Email Stacked */}
                <div className="grid grid-rows-2 gap-2">
                  <h3 className="font-bold text-white text-[16px] flex items-center pb-2">Connect With Us</h3>
                  <div className="flex items-end gap-2">
                    <div className="w-6 h-6 flex items-center justify-center shrink-0 pb-4">
                      <Image src="/footer/mail-icon.png" alt="mail" height={32} width={32} className="object-contain" />
                    </div>
                    <span className="font-medium text-white text-[12.9px] pb-2">info@aptagon.com</span>
                  </div>
                </div>

                {/* Column 2: Phone Numbers */}
                <div className="grid grid-rows-2 gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                      <Image src="/footer/phone.png" alt="call" height={22} width={22} className="object-contain" />
                    </div>
                    <span className="font-medium text-white text-[12.9px]">03704640036</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                      <Image src="/footer/phone.png" alt="call" height={22} width={22} className="object-contain" />
                    </div>
                    <span className="font-medium text-white text-[12.9px]">+447882610679</span>
                  </div>
                </div>

                {/* Column 3: Locations */}
                <div className="grid grid-rows-2 gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                      <Image src="/footer/locat.png" alt="location" height={28} width={28} className="object-contain" />
                    </div>
                    <span className="font-medium text-white text-[12.9px]">Clearwater, FL, USA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                      <Image src="/footer/locat.png" alt="location" height={28} width={28} className="object-contain" />
                    </div>
                    <span className="font-medium text-white text-[12.9px]">Poole, UK</span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Right Side - Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative flex items-center justify-center w-full min-h-[340px] overflow-hidden"
          >
            <LocationMap />
            <div className="absolute inset-0 pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white"></div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Copyright */}
          <p className="text-[12px] font-medium text-white order-2 sm:order-1">
            © 2026 Aptagon Technologies. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4 order-1 sm:order-2">
            <SocialIcon Icon={FaFacebookF} name="Facebook" color="#1877F2" link="https://www.facebook.com/aptagon/" />
            <SocialIcon Icon={FaInstagram} name="Instagram" color="#E4405F" link="https://www.instagram.com/aptagon/" />
            <SocialIcon Icon={FaLinkedinIn} name="LinkedIn" color="#0A66C2" link="https://www.linkedin.com/company/aptagon" />
            <SocialIcon Icon={FaXTwitter} name="Twitter" color="#000000" link="#" />
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;