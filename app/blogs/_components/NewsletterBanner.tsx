// "use client";
// import React from "react";
// import { motion } from "framer-motion";

// const NewsletterSection = () => {
//   return (
//     <section className="w-full flex justify-center py-10 bg-[#FFFFFF]">
//       {/* Container: 80% Width, Tight Height, Border Radius 3px */}
//       <div
//         className="relative w-[70%] md:w-[75%] h-[320px] md:h-[400px] rounded-[20px] overflow-hidden shadow-2xl flex items-center"
//         style={{
//           backgroundImage: `url('/logos/full.png')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         {/* Dark Overlay for Text Readability - Matching image gradient */}
//         {/* Bright Royal Blue Overlay matching Image 2 */}
//         <div className="absolute inset-0 md:bg-transparent md:bg-gradient-to-r md:from-[#335ECE] md:via-[#335ECE]/95 md:to-transparent z-0" />

//         {/* Content Box - Reduced width and smaller content to match */}
//         <div className="relative z-10 px-8 md:px-14 max-w-lg">

//           <motion.h2
//             initial={{ opacity: 0, y: 15 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2 tracking-tighter"
//           >
//             Get Aptagon’s <br /> Newsletter
//           </motion.h2>

//           {/* Smaller, more compact content */}
//           <motion.p
//             initial={{ opacity: 0, y: 15 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.15 }}
//             className="text-[#FFFFFF] text-xs md:text-[13px] font-medium mb-6 max-w-[320px] leading-relaxed"
//           >
//             Sign up to get expert tips, updates, and the latest from Aptagon.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 15 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="flex flex-col gap-3 w-full sm:max-w-sm"
//           >
//             {/* Input Field - Styled same-to-same */}
//             <div className="relative">
//               <input
//                 type="email"
//                 placeholder="Enter the mail"
//                 className="w-full bg-[#335ECE] border border-[#FFFFFF] backdrop-blur-sm rounded-lg px-5 py-3 text-white placeholder:text-[#FFFFFF] focus:outline-none focus:border-[#666666]/60 transition-all text-[13px]"
//               />
//             </div>

//             {/* Sign Up Button - Teal Gradient matching image */}
//             <motion.button
//               whileHover={{ scale: 1.01 }}
//               whileTap={{ scale: 0.99 }}
//               className="w-full bg-[#FFFFFF] text-[] font-black py-3 rounded-lg shadow-md uppercase tracking-widest text-[12px] transition-all"
//             >
//               Sign Up
//             </motion.button>
//           </motion.div>
//         </div>


//       </div>
//     </section>
//   );
// };

// export default NewsletterSection;


"use client";
import React from "react";
import { motion } from "framer-motion";

const NewsletterSection = () => {
  return (
    <section className="w-full flex justify-center py-10 bg-[#FFFFFF]">
      {/* 
        Container:
        - Added inline style backgroundColor to guarantee the blue renders.
      */}
      <div 
        className="relative w-[70%] md:w-[75%] h-[320px] md:h-[400px] rounded-[20px] overflow-hidden shadow-2xl flex items-center"
        style={{ 
          backgroundColor: "#3D66F5" 
        }}
      >
        
        {/* 
          1. FULL-WIDTH BACKGROUND & GRADIENT BLEND LAYER:
          - Spans 100% width to prevent harsh dividing lines.
          - The gradient starts as pure solid blue (#3D66F5) on the left to cover the text area,
            then smoothly transitions to reveal the laptop image on the right.
        */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
          <div 
            className="absolute inset-0 z-10 w-full h-full"
            style={{
              backgroundImage: "linear-gradient(to right, #3D66F5 0%, #3D66F5 45%, rgba(61, 102, 245, 0.9) 60%, rgba(29, 233, 182, 0.15) 100%)",
            }}
          />
          <img 
            src="/logos/full.png" 
            alt="Workspace" 
            className="w-full h-full object-cover object-right"
          />
        </div>

        {/* 
          2. CONTENT BOX:
          - Z-index elevated to stay crisply readable on top of the background image.
        */}
        <div className="relative z-20 px-8 md:px-14 max-w-lg">
          
          {/* Heading with Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-2"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight tracking-tighter">
              <span className="relative inline-block">
                Get Aptagon’s
              </span>
              <br /> 
              <span className="relative inline-block">
                Newsletter
              </span>
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-[#FFFFFF] text-xs md:text-[13px] font-medium mb-6 max-w-[320px] leading-relaxed"
          >
            Sign up to get expert tips, updates, and the latest from Aptagon.
          </motion.p>

          {/* Form Controls */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-3 w-full sm:max-w-sm"
          >
            {/* Input Field */}
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter the mail"
                className="w-full bg-[#3D66F5] border border-[#FFFFFF] rounded-lg px-5 py-3 text-white placeholder:text-[#FFFFFF] focus:outline-none focus:border-[#FFFFFF] transition-all text-[13px]"
              />
            </div>

            {/* Button */}
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-[#FFFFFF] text-[#3D66F5] font-black py-3 rounded-lg shadow-md uppercase tracking-widest text-[12px] transition-all hover:bg-white/95"
            >
              Sign Up
            </motion.button>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default NewsletterSection;