"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
  title: string;
  bgColor?: string;
}

const FALLBACK_IMAGES = [
  "https://placehold.co/1200x700/B8F0E6/214F65?text=Project+Preview+1",
  "https://placehold.co/1200x700/7EE8DB/214F65?text=Project+Preview+2",
  "https://placehold.co/1200x700/A0EEE5/214F65?text=Project+Preview+3",
];

export default function ImageCarousel({
  images,
  title,
  bgColor = "#5383FF",
}: ImageCarouselProps) {
  const displayImages = images && images.length > 0 ? images : FALLBACK_IMAGES;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0); 

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ backgroundColor: bgColor }}
      className="relative rounded-2xl overflow-hidden transition-colors duration-300 w-full flex items-center justify-center p-8 md:p-12 lg:p-16 min-h-[450px] md:min-h-[550px]"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentImageIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative w-full h-[350px] sm:h-[420px] md:h-[480px] flex items-center justify-center"
          >
            <Image
              src={displayImages[currentImageIndex]}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-contain drop-shadow-xl my-auto"
              priority={currentImageIndex === 0}
              sizes="(max-width: 768px) 100vw, 90vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}