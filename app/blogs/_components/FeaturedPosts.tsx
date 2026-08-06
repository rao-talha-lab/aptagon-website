
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export interface FeaturedPost {
  id: number;
  title: string;
  image: string;
}

interface FeaturedPostsProps {
  items?: FeaturedPost[];
}

export default function FeaturedPosts({ items = [] }: FeaturedPostsProps) {
  if (!items || items.length === 0) return null;

  // Duplicate items for the infinite smooth marquee loop
  const displayPosts = [...items, ...items];

  return (
    <section className="w-full bg-[#335ECE] pt-12 pb-16 overflow-hidden relative -mx-8">
      <div className="max-w-7xl px-6 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tighter leading-tight">
            Our Featured Posts
          </h2>
          <p className="max-w-2xl text-[18px] md:text-[16px] text-white font-medium">
            Discover how headless CMS empowers developers to build faster, 
            scalable websites with greater flexibility and control.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden py-4">
        <motion.div
          className="flex w-max gap-8 px-6"
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear",
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {displayPosts.map((post, index) => (
            <motion.div
              key={`${post.id}-${index}`}
              whileHover={{ 
                scale: 1.03,
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative w-80 h-80 cursor-pointer overflow-hidden shrink-0 
                         border-2 border-[#FFFFFF] hover:border-[#FFFFFF] 
                         transition-all duration-300"
              style={{ perspective: "1000px" }}
            >
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_30px_60px_-15px_rgba(7,58,83,0.3)]" />

              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/20 to-[#073A53] opacity-85" />
              </div>

              <div className="absolute inset-x-0 bottom-0 z-30 p-6 flex flex-col items-center text-center transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500" style={{ transformStyle: "preserve-3d" }}>
                <div className="relative" style={{ transform: "translateZ(30px)" }}>
                  <h3 className="text-white text-xl font-semibold leading-snug tracking-tight relative z-10">
                    {post.title}
                  </h3>
                </div>
                <motion.div className="h-[2px] w-0 group-hover:w-16 bg-white mt-4 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}