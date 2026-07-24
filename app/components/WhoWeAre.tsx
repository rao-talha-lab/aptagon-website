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
import { Compass, Hammer, Users, Target } from "lucide-react";

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#335ECE] text-[#335ECE]">
      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <span className="text-md font-medium text-[#666666]">
      {text}
    </span>
  </div>
);

const drives = [
  {
    num: "01",
    title: "Curiosity",
    desc: "We explore new ideas and challenge assumptions to find innovative solutions.",
    icon: Compass,
  },
  {
    num: "02",
    title: "Craft",
    desc: "We dedicate ourselves to delivering high-quality, thoughtful, and scalable work.",
    icon: Hammer,
  },
  {
    num: "03",
    title: "Collaboration",
    desc: "We believe in the power of working together to achieve common goals efficiently.",
    icon: Users,
  },
  {
    num: "04",
    title: "Impact",
    desc: "We strive to make a meaningful difference in everything we design and build.",
    icon: Target,
  },
];

export default function WhoWeAre() {
  const themeGradient = "linear-gradient(135deg, #335ECE 0%, #06544F 100%)";

  return (
    <section className="w-full bg-white py-20 px-6 sm:px-12 lg:px-16 overflow-hidden">
      <div className="mx-auto max-w-7xl space-y-24">

        {/* ── TOP SECTION (40% / 60% Layout) ── */}
        <div className="flex flex-col lg:flex-row items-center gap-12">

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
                className="w-full h-[450px] lg:h-[540px] object-cover transition-transform duration-700 hover:scale-105"
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
            className="w-full lg:w-[60%] space-y-8"
          >
            <div className="space-y-4">
              <h4 className="text-md font-bold tracking-wider text-[#666666]">
                About Us
              </h4>
              <h2 className="text-2xl font-extrabold text-[#335ECE] lg:text-3xl leading-tight">
                Driving Innovation Through Technology
              </h2>
            </div>

            <p className="text-md leading-relaxed text-[#666666]">
              At <span className=" text-[#666666]">Aptagon Technologies, </span>
              we transform ideas into <span className="font-bold text-[#666666]">intelligent digital experiences </span>
              that drive innovation and measurable success. Specializing in{" "}
              <span className="font-bold text-[#666666]">
                Web Development, Business Process Automation, AI & Generative Solutions, Chatbot Development,{" "}
              </span>
              and <span className="font-bold text-[#666666]">Software Quality Assurance, </span>
              we create scalable, high-performing, and future-ready digital solutions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureItem text="Industry-leading expertise" />
              <FeatureItem text="Agile development process" />
              <FeatureItem text="24/7 dedicated support" />
              <FeatureItem text="Proven track record" />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center justify-center overflow-hidden rounded-xl px-10 py-4 text-lg font-bold text-white shadow-lg transition-all"
              style={{ background: themeGradient }}
            >
              <Link href="/about" className="contents">
                <span className="relative z-10">Discover More</span>
              </Link>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </motion.button>
          </motion.div>

        </div>

        {/* ── BOTTOM SECTION (What Drives Us Forward) ── */}
        {/* <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-[#335ECE] lg:text-4xl">
              What Drives Us Forward
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {drives.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.num}
                  className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#335ECE] text-[#335ECE]">
                      <IconComponent className="h-7 w-7" />
                    </div>
                    <span className="text-3xl font-extrabold text-[#335ECE]/20">
                      {item.num}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#335ECE] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#666666] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div> */}

      </div>
    </section>
  );
}