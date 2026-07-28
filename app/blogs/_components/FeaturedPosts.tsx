"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface FeaturedPost {
  id: number;
  title: string;
  image: string;
}

const featuredPosts: FeaturedPost[] = [
  { id: 1, title: "Smart UI for Businesses", image: "/blogs/feature-cards/image-1.jpg" },
  { id: 2, title: "Powering Insights with Data", image: "/blogs/feature-cards/image-2.jpg" },
  { id: 3, title: "Future of Business Automation", image: "/blogs/feature-cards/image-3.jpg" },
  { id: 4, title: "Smarter, Data-Driven Decisions", image: "/blogs/feature-cards/image-4.jpg" },
];

export default function FeaturedPosts() {
  return (
    <section className="w-full bg-[#335ECE] pt-12 pb-16 overflow-hidden relative">
      {/* Subtle Background Glow for Context */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#0EBAB0]/10 rounded-full blur-[110px] pointer-events-none" />
      
      {/* Strikng Header */}
      <div className="max-w-7xl px-6 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
          
            
          </div>
          <h2 className="text-4xl md:text-4xl font-black text-white mb-3 tracking-tighter leading-tight">
            Our Featured Posts
          </h2>
          <p className="max-w-2xl text-[20px] md:text-[17px] text-white font-medium">
            Discover how headless CMS empowers developers to build faster, 
            scalable websites with greater flexibility and control.
          </p>
        </motion.div>
      </div>

      {/* Infinite Marquee - Original Height (w-80 h-80) */}
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
          whileHover={{ animationPlayState: "paused" }} // Original request: Pause on hover
        >
          {[...featuredPosts, ...featuredPosts].map((post, index) => (
            <motion.div
              key={`${post.id}-${index}`}
              whileHover={{ 
                scale: 1.03, // Slight scale for prominence
                y: -10, // Elevate for prominence
                transition: { duration: 0.3 }
              }}
              className="group relative w-80 h-80 cursor-pointer overflow-hidden shrink-0 
                         border-2 border-[#FFFFFF] hover:border-[#FFFFFF] 
                         transition-all duration-300"
              style={{ perspective: "1000px" }}
            >
              {/* Outer Shadow - Highly Prominent */}
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_30px_60px_-15px_rgba(7,58,83,0.3)]" />

              {/* Image Layer - original Object Cover */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" // original zoom
                />
                
                {/* Advanced Multi-Gradient Overlay (Active Teal focused) */}
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[#073A53] opacity-80" />
                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_bottom,rgba(14,186,176,0.15)_0%,transparent_60%)]" /> // Focus on teal glow
              </div>

              {/* Title Content - 3D/Parallax effect for prominence */}
              <div className="absolute inset-x-0 bottom-0 z-30 p-6 flex flex-col items-center text-center transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500" style={{ transformStyle: "preserve-3d" }}>
                
                {/* original Title with Subtle Underglow (Theme Active Teal) */}
                <div className="relative" style={{ transform: "translateZ(30px)" }}>
                    {/* Hover Glow Behind Title */}
                    <div className="absolute -inset-x-8 -inset-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-[radial-gradient(circle_at_center,rgba(14,186,176,0.3)_0%,transparent_75%)]" />
                    
                    <h3 className="text-white text-xl font-semibold leading-snug tracking-tight group-hover:text-[#0EBAB0] transition-colors duration-300 relative z-10">
                    {post.title}
                    </h3>
                </div>

                {/* Interactive Arrow Line - for context on what to do next */}
                <motion.div className="h-[2px] w-0 group-hover:w-16 bg-[#0EBAB0] mt-4 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Subtle Bottom Reflector Line (Active Teal) */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0EBAB0]/25 to-transparent" />
    </section>
  );
}