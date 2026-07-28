"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// ── TYPES ──
interface Item {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

// ── DATA ──
const items: Item[] = [
  {
    id: "01",
    title: "Curiosity",
    desc: "We explore new ideas and challenge assumptions to find better solutions.",
    icon: "/about-us/curiosity.png",
  },
  {
    id: "02",
    title: "Craft",
    desc: "We dedicate ourselves to delivering high-quality, thoughtful work.",
    icon: "/about-us/craft.png",
  },
  {
    id: "03",
    title: "Collaboration",
    desc: "We believe in the power of working together to achieve common goals.",
    icon: "/about-us/collab.png",
  },
  {
    id: "04",
    title: "Impact",
    desc: "We strive to make a meaningful difference in everything we do.",
    icon: "/about-us/impact.png",
  },
];

// ── CARD COMPONENT ──
const DriveCard = ({ item, index }: { item: Item; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const [burst, setBurst] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => {
        setHovered(true);
        setBurst(true);
        setTimeout(() => setBurst(false), 750);
      }}
      onMouseLeave={() => setHovered(false)}
      className="relative h-[300px]"
    >
      {/* Outer Card Wrapper */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          borderRadius: "10px",
          background: "#FFFFFF",
          border: hovered ? "1px solid #335ECE" : "none",
          boxShadow: hovered
            ? "0 20px 40px rgba(51, 94, 206, 0.2)"
            : "10px 10px 28px rgba(0, 0, 0, 0.3)",
          overflow: "hidden",
          transition: "border 0.3s ease, box-shadow 0.4s ease, transform 0.3s ease",
          display: "flex",
          flexDirection: "column",
          transform: hovered ? "translateY(-4px)" : "translateY(0px)",
        }}
      >
        {/* Fill Sweep Animation (Bottom-Up) */}
        <motion.div
          initial={false}
          animate={{ scaleY: hovered ? 1 : 0 }}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(160deg, #335ECE 0%, #2548A8 100%)",
            transformOrigin: "bottom",
            borderRadius: "10px",
            zIndex: 0,
          }}
        />

        {/* Particles Effect on Hover */}
        {burst &&
          Array.from({ length: 8 }).map((_, i) => {
            const rad = ((i / 8) * 360 * Math.PI) / 180;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  x: Math.cos(rad) * 65,
                  y: Math.sin(rad) * 65,
                  scale: [0, 1.3, 0],
                }}
                transition={{ duration: 0.65, delay: i * 0.03, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "38%",
                  width: 7,
                  height: 7,
                  marginLeft: -3.5,
                  marginTop: -3.5,
                  borderRadius: "50%",
                  background: "#FFFFFF",
                  zIndex: 20,
                  pointerEvents: "none",
                }}
              />
            );
          })}

        {/* CONTENT */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "1.8rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* Top Header Row: Icon (Far Left) & ID Number (Far Right) */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between", // Pushes Icon Left & ID Right
              alignItems: "center",
              width: "100%", // Explicit full width ensures space-between works reliably
              marginBottom: "1.75rem",
              height: 58,
            }}
          >
            {/* Circular Icon Container */}
            <div
              style={{
                width: 63,
                height: 63,
                borderRadius: "50%",
                border: hovered ? "2px solid #FFFFFF" : "2px solid #335ECE",
                background: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                boxShadow: hovered ? "0 6px 18px rgba(0,0,0,0.15)" : "none",
                flexShrink: 0,
              }}
            >
              <Image
                src={item.icon}
                alt={item.title}
                height={38}
                width={38}
                style={{
                  objectFit: "cover",
                  transition: "filter 0.3s ease",
                }}
              />
            </div>

            {/* Faded Large ID Number - Right Aligned */}
            <span
              style={{
                fontSize: "3rem",
                fontWeight: 700,
                color: hovered ? "rgba(255, 255, 255, 0.35)" : "#335ECE26",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                transition: "color 0.3s ease",
              }}
            >
              {item.id}
            </span>
          </div>

          {/* Card Title */}
          <h3
            style={{
              fontSize: "1.30rem",
              fontWeight: 750,
              color: hovered ? "#FFFFFF" : "#335ECE",
              marginBottom: "0.80rem",
              letterSpacing: "-0.01em",
              transition: "color 0.3s ease",
            }}
          >
            {item.title}
          </h3>

          {/* Card Description */}
          <p
          className="text-justify"
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.65,
              color: hovered ? "rgba(255, 255, 255, 0.9)" : "#666666",
              fontWeight: 400,
              flexGrow: 1,
              transition: "color 0.3s ease",
            }}
          >
            {item.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ── MAIN SECTION COMPONENT ──
export default function WhatDrivesUsForward() {
  return (
    <section style={{ position: "relative", padding: "5rem 1.5rem", background: "#FFFFFF", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2
            style={{
              fontWeight: 900,
              fontSize: "2.75rem",
              color: "#335ECE",
              letterSpacing: "-0.02em",
            }}
          >
            What Drives Us Forward
          </h2>
        </div>

        {/* Responsive Grid with Reduced Gap (`gap-3.5`) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {items.map((item, i) => (
            <DriveCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
// ── COUNTER COMPONENT ──
// Types added to fix parameter errors
// function Counter({ value, trigger }: { value: string; trigger: boolean }) {
//   const ref = useRef<HTMLSpanElement>(null);
//   const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
//   const suffix = value.replace(/[0-9.]/g, "");

//   useEffect(() => {
//     if (!trigger) return;

//     const controls = animate(0, numericValue, {
//       duration: 1.4,
//       ease: [0.22, 1, 0.36, 1],
//       onUpdate(v) {
//         if (ref.current) {
//           ref.current.textContent = (Number.isInteger(numericValue) ? Math.floor(v) : v.toFixed(0)) + suffix;
//         }
//       },
//     });
//     return () => controls.stop();
//   }, [trigger, numericValue, suffix]);

//   return <span ref={ref}>0{suffix}</span>;
// }

// // ── CARD COMPONENT ──
// const DriveCard = ({ item, index }: { item: Item; index: number }) => {
//   const [hovered, setHovered] = useState(false);
//   const [burst, setBurst] = useState(false);
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
//       onMouseEnter={() => { setHovered(true); setBurst(true); setTimeout(() => setBurst(false), 750); }}
//       onMouseLeave={() => setHovered(false)}
//       className="relative h-full"
//     >
//       {/* Glow border */}
//       <div style={{
//         position: "absolute", inset: -2, borderRadius: 32,
//         background: "linear-gradient(135deg, #335ECE, #335ECE, #335ECE)",
//         opacity: hovered ? 1 : 0, transition: "opacity 0.4s ease", zIndex: 0,
//       }} />

//       {/* Card shell */}
//       <div style={{
//         position: "relative", zIndex: 1, height: "100%",
//         borderRadius: 30, background: "#fff",
//          border: "1px solid #335ECE",  // fixed here
//         overflow: "hidden", transition: "box-shadow 0.4s ease",
//         display: "flex", flexDirection: "column",
//       }}>

//         {/* Fill sweep */}
//         <motion.div
//           initial={false}
//           animate={{ scaleY: hovered ? 1 : 0 }}
//           transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
//           style={{
//             position: "absolute", inset: 0,
//             background: "linear-gradient(160deg, #335ECE 0%, #335ECE 70%)",
//             transformOrigin: "bottom", borderRadius: 30, zIndex: 0,
//           }}
//         />

//         {/* Particles Effect */}
//         {burst && Array.from({ length: 8 }).map((_, i) => {
//           const rad = ((i / 8) * 360 * Math.PI) / 180;
//           return (
//             <motion.div key={i}
//               initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
//               animate={{ opacity: [0, 1, 0], x: Math.cos(rad) * 65, y: Math.sin(rad) * 65, scale: [0, 1.3, 0] }}
//               transition={{ duration: 0.65, delay: i * 0.03, ease: "easeOut" }}
//               style={{
//                 position: "absolute", left: "50%", top: "38%",
//                 width: 7, height: 7, marginLeft: -3.5, marginTop: -3.5,
//                 borderRadius: "50%", background: "#FFFFFF", zIndex: 20, pointerEvents: "none",
//               }}
//             />
//           );
//         })}

//         {/* CONTENT */}
//         <div style={{ position: "relative", zIndex: 2, padding: "2rem", display: "flex", flexDirection: "column", height: "100%" }}>

//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.8rem" }}>
//             <span style={{
//               color: hovered? "#FFFFFF" : "#335ECE",
//               fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase",
//               padding: "0.28rem 0.75rem", borderRadius: 999,
//               border: hovered ? "1px solid rgba(255,255,255,1)" : "1px solid rgba(51,94,206,0.2) " ,
//               background: hovered ? "rgba(51,94,206,0.2)" : "rgba(51,94,206,0.08)",
//             }}>{item.tag}</span>

//             <div style={{
//               width: 52, height: 52, borderRadius: 16,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               background: hovered ? "#FFFFFF" : "#335ECE",
//               boxShadow: hovered ? "0 6px 20px rgba(14,186,176,0.35)" : "0 2px 8px rgba(14,186,176,0.12)",
//               color: hovered ? "#335ECE" : "#FFFFFF"
//             }}>
//               {item.icon}
//             </div>
//           </div>

//           <h3 style={{
//             fontSize: "24px", fontWeight: 900, letterSpacing: "-0.03em",
//             color: hovered ? "#FFFFFF" : "#335ECE",
//             marginBottom: "1rem"
//           }}>{item.title}</h3>

//           <p className="text-justify"

//           style={{ fontSize: "0.9rem", lineHeight: 1.76, flexGrow: 1, color: hovered ? "#FFFFFF" : "#666666" }}>
//             {item.desc}
//           </p>

//           <div style={{ marginTop: "1.6rem" }}>
//             <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
//               <span style={{ fontSize: "2.1rem", fontWeight: 900, color:hovered ? "#FFFFFF" : "#335ECE", lineHeight: 1 }}>
//                 {/* Fixed Prop Name */}
//                 <Counter value={item.stat} trigger={hovered || inView} />
//               </span>
//               <span style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: hovered ? "#FFFFFF" : "#335ECE" }}>
//                 {item.statLabel}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ── MAIN COMPONENT ──
// export default function WhatDrivesUsForward() {
//   const headerRef = useRef(null);

//   return (
//     <section style={{ position: "relative", padding: "6rem 1.5rem 7rem", background: "#FFFFFF", overflow: "hidden" }}>
//       <div style={{ position: "relative", zIndex: 10, maxWidth: 1300, margin: "0 auto" }}>
//         {/* Header */}
//         <div ref={headerRef} style={{ textAlign: "center", marginBottom: "4.5rem" }}>
//          <h2 className="text-[#335ECE]" style={{ fontWeight: 900, fontSize: "3rem", lineHeight: 1.06 }}>
//           What Drives Us Forward
//         </h2>
//         </div>

//         {/* Grid Responsive Fix */}
{/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {items.map((item, i) => (
    <DriveCard key={item.id} item={item} index={i} />
  ))}
</div> */}
//       </div>
//     </section>
//   );
// }