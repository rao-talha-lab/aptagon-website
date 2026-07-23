// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// interface StatementSectionProps {
//   title: string;
//   description: string;
//   backgroundImage: string;
// }

// export default function StatementSection({
//   title,
//   description,
//   backgroundImage,
// }: StatementSectionProps) {
//   const containerRef = useRef(null);

//   // Parallax Effect for Background Image
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"],
//   });

//   // Background smooth movement
//   const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

//   return (
//     <motion.section
//       ref={containerRef}
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       viewport={{ once: false }}
//       className="relative w-full overflow-hidden"
//     >
//       {/* PARALLAX IMAGE LAYER */}
//       <motion.div
//         style={{ 
//           backgroundImage: `url(${backgroundImage})`,
//           y,
//           scale: 1.2
//         }}
//         className="absolute inset-0 bg-cover bg-center will-change-transform"
//       />

//       {/* DYNAMIC OVERLAY (Navy to Teal Gradient) */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#335ECE]/90 via-[#335ECE]/85 to-[#335ECE]/90" />

//       {/* CONTENT (Original py-20 height maintained) */}
//       <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center text-white">
        
//         {/* Top Quote Icon - Changed to White */}
//         <motion.span 
//           initial={{ opacity: 0.8, scale: 0.5 }}
//           whileInView={{ opacity: 0.8, scale: 1 }}
//           className="absolute left-4 top-30 text-7xl md:text-9xl font-serif text-white select-none pointer-events-none"
//         >
//           “
//         </motion.span>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           {/* Title */}
//           <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
//             {title}
//           </h2>

//           {/* Divider */}
//           <div className="w-20 h-1 bg-[#FFFFFF] mx-auto mb-8 rounded-full shadow-[0_0_10px_rgba(14,186,176,0.5)]" />

//           {/* Description */}
//           <p className="text-center max-w-4xl mx-auto text-[10px] md:text-[19px] leading-relaxed text-white/90 font-medium">
//             {description}
//           </p>
//         </motion.div>

//         {/* Bottom Quote Icon - Changed to White */}
//         <motion.span 
//           initial={{ opacity: 0.8, scale: 0.5 }}
//           whileInView={{ opacity: 0.8, scale: 1 }}
//           className="absolute right-4 bottom-4 text-7xl md:text-9xl font-serif text-white select-none pointer-events-none"
//         >
//           ”
//         </motion.span>
//       </div>

//       {/* Grainy Texture for Premium Look */}
//       <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
//     </motion.section>
//   );
// }
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface StatementSectionProps {
  title: string;
  description: string;
  backgroundImage: string;
}

export default function StatementSection({
  title,
  description,
  backgroundImage,
}: StatementSectionProps) {
  const containerRef = useRef(null);

  // Parallax Effect for Background Image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Background smooth movement
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false }}
      className="relative w-full overflow-hidden"
    >
      {/* PARALLAX IMAGE LAYER */}
      <motion.div
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          y,
          scale: 1.2
        }}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
      />

      {/* DYNAMIC OVERLAY (Navy to Teal Gradient) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#335ECE]/90 via-[#335ECE]/85 to-[#335ECE]/90" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center text-white">
        
        {/* Top Left Quote Icon from Figma */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute left-6 md:left-15 top-8 md:top-25 select-none pointer-events-none"
        >
          <img
            src="/about-us/left.png" 
            alt="Quote Start"
            className="w-10 h-10 md:w-16 md:h-16 object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            {title}
          </h2>

          {/* Divider */}
          <div className="w-20 h-1 bg-[#FFFFFF] mx-auto mb-8 rounded-full shadow-[0_0_10px_rgba(14,186,176,0.5)]" />

          {/* Description */}
          <p className="text-center max-w-4xl mx-auto text-[14px] md:text-[19px] leading-relaxed text-white/90 font-medium">
            {description}
          </p>
        </motion.div>

        {/* Bottom Right Quote Icon from Figma */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute right-6 md:right-10 bottom-8 md:bottom-12 select-none pointer-events-none"
        >
          <img
            src="/about-us/right.png"
            alt="Quote End"
            className="w-10 h-10 md:w-16 md:h-16 object-contain"
          />
        </motion.div>
      </div>

      {/* Grainy Texture for Premium Look */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </motion.section>
  );
}