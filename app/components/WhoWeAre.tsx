// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";

// const FeatureItem = ({ text }: { text: string }) => (
//   <div className="flex items-center gap-3">
//     <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#335ECE] text-[#335ECE]">
//       <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
//         <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//       </svg>
//     </div>
//     <span className="text-md font-medium text-[#666666] ">
//       {text}
//     </span>
//   </div>
// );

// export default function WhoWeAre() {
//   const themeGradient = "linear-gradient(135deg, #335ECE 0%, #06544)";

//   return (
//     <section className="w-full bg-white py-20 px-3 sm:px-8 lg:px-10 overflow-hidden">
//       <div className="mx-auto max-w-7xl">

//         {/* 40% / 60% Layout */}
//         <div className="flex flex-col lg:flex-row items-center gap-12">

//           {/* LEFT - IMAGE (40%) */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="w-full lg:w-[40%] relative"
//           >
//             <div className="relative overflow-hidden rounded-[40px] shadow-2xl">
//               <Image
//                 src="/teammeeting.png"
//                 alt="Aptagon Technologies Team"
//                 width={600}
//                 height={450}
//                 className="w-full h-[400px] lg:h-[490px] object-cover transition-transform duration-700 hover:scale-105"
//                 priority
//               />
//             </div>
//           </motion.div>

//           {/* RIGHT - CONTENT (60%) */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: false }}
//             className="w-full lg:w-[60%] space-y-2"
//           >
//             <div className="space-y-2">
//               <h4 className="text-md font-bold tracking-wider text-[#666666]">
//                 About Us
//               </h4>
//               <h2 className="text-2xl font-extrabold text-[#335ECE] lg:text-3xl leading-tight">
//                 Driving Innovation Through Technology
//               </h2>
//             </div>

//             <p className="text-md leading-relaxed text-[#666666] text-justify">At Aptagon Technologies,
//               we build web plaforms, AI Automation, and digital products that solve real buisness problems — not just look good. From <span className="font-bold text-[#666666] dark:text-[#666666]">Web Development </span>
//               and <span className="font-bold text-[#666666] dark:text-[#666666]">Business Process Automation to AI & Generative Solutions, Chatbot Development, </span>and <span className="font-bold text-[#666666] dark:text-[#666666]">Software QA, </span>we're the technology partner that takes your idea from concept to launch.</p>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <FeatureItem text="Industry-leading expertise" />
//               <FeatureItem text="Agile development process" />
//               <FeatureItem text="24/7 dedicated support" />
//               <FeatureItem text="Proven track record" />
//             </div>



//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="group relative flex items-center justify-center overflow-hidden rounded-xl px-10 py-4 text-lg font-bold text-white shadow-lg transition-all"
//               style={{ background: "#335ECE" }}
//             >


//               <Link href="/about" className="contents">


//                 <span className="relative z-10">Discover More</span>


//               </Link>
//               <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
//             </motion.button>
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#335ECE] text-[#335ECE]">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className="text-md font-medium text-[#666666] ">
      {text}
    </span>
  </div>
);

export default function WhoWeAre() {
  const themeGradient = "linear-gradient(135deg, #335ECE 0%, #06544)";

  return (
    <section className="w-full bg-white py-16 lg:py-20 px-3 sm:px-8 lg:px-10 overflow-hidden">
      <div className="mx-auto max-w-7xl">

        {/* 40% / 60% Layout with items-start to eliminate empty space above text */}
        <div className="flex flex-col lg:flex-row items-start gap-12">

          {/* LEFT - IMAGE (40%) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-[40%] relative"
          >
            <div className="relative overflow-hidden rounded-[40px] shadow-2xl">
              <Image
                src="/teammeeting.png"
                alt="Aptagon Technologies Team"
                width={600}
                height={450}
                /* Restored full original image height & cover fitting */
                className="w-full h-[400px] lg:h-[490px] object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          </motion.div>

          {/* RIGHT - CONTENT (60%) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="w-full lg:w-[60%] space-y-4 pt-1"
          >
            <div className="space-y-2">
              <h4 className="text-md font-bold tracking-wider text-[#666666]">
                About Us
              </h4>
              <h2 className="text-2xl font-extrabold text-[#335ECE] lg:text-3xl leading-tight">
                Driving Innovation Through Technology
              </h2>
            </div>

            <p className="text-[18px] font-inter font-medium leading-relaxed text-[#666666] text-justify">At Aptagon Technologies,
              we build web plaforms, AI Automation, and digital products that solve real buisness problems — not just look good. From Web Development 
              and Business Process Automation to AI & Generative Solutions, Chatbot Development, and Software QA, we're the technology partner that takes your idea from concept to launch.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <FeatureItem text="Industry-leading expertise" />
              <FeatureItem text="Agile development process" />
              <FeatureItem text="24/7 dedicated support" />
              <FeatureItem text="Proven track record" />
            </div>

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center justify-center overflow-hidden rounded-xl px-10 py-4 text-lg font-bold text-white shadow-lg transition-all"
                style={{ background: "#335ECE" }}
              >
                <Link href="/about" className="contents">
                  <span className="relative z-10">Discover More</span>
                </Link>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}