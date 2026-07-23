"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const slideVariants = {
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
      style={{ backgroundColor: bgColor, minHeight: "600px" }}
      className="relative rounded-2xl overflow-hidden transition-colors duration-300"
    >
      
      <div
        className="relative w-full flex items-center justify-center px-16 py-10"
        style={{ minHeight: "500px" }}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentImageIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative w-full"
            style={{ height: "460px" }}
          >
            <Image
              src={displayImages[currentImageIndex]}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-contain drop-shadow-xl"
              priority={currentImageIndex === 0}
              sizes="(max-width: 768px) 100vw, 90vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}