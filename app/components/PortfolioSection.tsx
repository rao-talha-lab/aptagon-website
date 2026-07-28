"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const portfolioItems = [
  { id: "1", image: "/logos/port1.png", title: "Strategic Growth Partners" },
  { id: "2", image: "/logos/port2.png", title: "Food & Dining UI/UX" },
  { id: "3", image: "/logos/port3.png", title: "Mobile Accessories Store" },
  { id: "4", image: "/logos/port6.png", title: "Windsor – Your Gateway to Global Education" },
  { id: "5", image: "/logos/port5.png", title: "Study Abroad Consultancy UI/UX" },
];

const TOTAL = portfolioItems.length;

export default function PortfolioSection() {
  const curtainLeft  = useRef<HTMLDivElement>(null);
  const curtainRight = useRef<HTMLDivElement>(null);
  const introOverlay = useRef<HTMLDivElement>(null);
  const sectionRef   = useRef<HTMLDivElement>(null);

  const [active, setActive]   = useState(0);
  // phase: "curtain" | "intro" | "gallery"
  const [phase, setPhase]     = useState<"curtain" | "intro" | "gallery">("curtain");

  const prev = useCallback(() => setActive(i => Math.max(0, i - 1)), []);
  const next = useCallback(() => setActive(i => Math.min(TOTAL - 1, i + 1)), []);

  /* ── Keyboard navigation ─────────────────────────────────────────────── */
  useEffect(() => {
    if (phase !== "gallery") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, prev, next]);

  /* ── Intro sequence on mount ─────────────────────────────────────────── */
  useGSAP(() => {
    const tl = gsap.timeline();

    // Step 1 — curtains split open
    tl.to(curtainLeft.current,  { x: "-100%", duration: 1.2, ease: "power2.inOut" }, 0)
      .to(curtainRight.current, { x: "100%",  duration: 1.2, ease: "power2.inOut" }, 0)

    // Step 2 — intro text reveals
      .fromTo(".zoom-p",
        { y: 50, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.8 }, 0.7)
      .fromTo(".zoom-h1",
        { scale: 0.85, opacity: 0, filter: "blur(20px)" },
        { scale: 1,    opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out" }, 1.0)

      // mark intro phase so the text is readable
      .call(() => setPhase("intro"), [], 1.5)

    // Step 3 — slide intro overlay up to reveal gallery
      .to(introOverlay.current, { y: "-100%", duration: 1.0, ease: "expo.inOut" }, "+=1.2")
      .call(() => setPhase("gallery"), [], "+=0.1");
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0EBAB033]"
      style={{ minHeight: "100vh" }}
    >
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 z-0 bg-[#0EBAB033]" />

      {/* ════════════════════════════════════════════════════════
          CURTAINS  (z-100, always mounted, slide off on load)
      ════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[100] flex pointer-events-none">
        <div
          ref={curtainLeft}
          className="w-1/2 h-full bg-white flex items-center justify-end overflow-hidden"
        >
          <h2 className="text-[15vw] font-black text-[#1a365d] translate-x-[5%] pr-10 select-none">
            PORT
          </h2>
        </div>
        <div
          ref={curtainRight}
          className="w-1/2 h-full bg-white flex items-center justify-start overflow-hidden"
        >
          <h2 className="text-[15vw] pl-10 font-black text-[#1a365d] -translate-x-[5%] select-none">
            FOLIO
          </h2>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          INTRO OVERLAY  (z-90, slides up after text is shown)
      ════════════════════════════════════════════════════════ */}
      <div
        ref={introOverlay}
        className="absolute inset-0 z-[90] bg-white flex items-center justify-center text-center px-10"
      >
        <div className="will-change-transform max-w-5xl">
          <p className="zoom-p text-[#0EBAB0] font-bold uppercase tracking-[0.3em] text-lg mb-6">
            The highlights of our creations
          </p>
          <h1 className="zoom-h1 text-3xl md:text-5xl font-black text-[#1a365d] leading-[1.1] tracking-tight">
            Transforming Ideas into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a365d] to-[#0EBAB0]">
              Powerful Digital Product
            </span>
          </h1>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          GALLERY  (z-20, revealed after intro slides away)
      ════════════════════════════════════════════════════════ */}
      <div
        className="relative z-20 flex flex-col items-center justify-center"
        style={{
          minHeight: "100vh",
          paddingTop: 40,
          paddingBottom: 48,
          opacity: phase === "gallery" ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        {/* Section label */}
        <div className="flex items-center gap-3 mb-3">
          <span style={{
            display: "block", height: 1.5, width: 32,
            background: "linear-gradient(90deg,transparent,#0EBAB0)",
            borderRadius: 2,
          }}/>
          <p className="text-[#0EBAB0] font-bold uppercase tracking-[0.3em] text-xs md:text-sm select-none">
            Our Portfolio
          </p>
          <span style={{
            display: "block", height: 1.5, width: 32,
            background: "linear-gradient(90deg,#0EBAB0,transparent)",
            borderRadius: 2,
          }}/>
        </div>

        {/* Heading */}
        <h2 className="text-[#1a365d] font-black text-center tracking-tight leading-tight mb-8"
          style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)" }}>
          Transforming Ideas into{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a365d] to-[#0EBAB0]">
            Powerful Digital Products
          </span>
        </h2>

        {/* ── IMAGE CARD ── */}
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            width:     "min(70vw, 820px)",
            height:    "min(48vh, 480px)",
            minWidth:  260,
            minHeight: 200,
          }}
        >
          {portfolioItems.map((item, i) => (
            <div
              key={item.id}
              style={{
                position: "absolute", inset: 0,
                opacity:   i === active ? 1 : 0,
                transform: i === active ? "scale(1)" : "scale(0.97)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                pointerEvents: i === active ? "auto" : "none",
              }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 80vw, 60vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* ── TITLE ── */}
        <div className="mt-6 mb-4 text-center px-4">
          <h3
            className="text-[#1a365d] font-bold tracking-tighter uppercase"
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 2rem)",
              transition: "opacity 0.4s ease",
            }}
          >
            {portfolioItems[active].title}
          </h3>
        </div>

        {/* ── DOTS ── */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
          {portfolioItems.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                border: "none", cursor: "pointer", padding: 0,
                height: 7, borderRadius: 4,
                width:   i === active ? 30 : 8,
                opacity: i === active ? 1 : 0.35,
                background: i === active
                  ? "linear-gradient(90deg,#0EBAB0,#1a365d)"
                  : "rgba(14,186,176,0.35)",
                transition: "all 0.35s ease",
              }}
            />
          ))}
        </div>

        {/* ── ARROWS + COUNTER ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Prev */}
          <button
            onClick={prev}
            disabled={active === 0}
            style={{
              width: 48, height: 48, borderRadius: 16, border: "none",
              cursor: active === 0 ? "not-allowed" : "pointer",
              background: active === 0
                ? "rgba(14,186,176,0.08)"
                : "linear-gradient(135deg,#1a365d,#0a5570)",
              boxShadow: active === 0 ? "none" : "0 8px 24px rgba(26,54,93,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: active === 0 ? 0.35 : 1,
              transition: "all 0.2s ease",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke={active === 0 ? "#0EBAB0" : "#fff"}
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          {/* Counter */}
          <span style={{
            fontSize: 13, fontWeight: 700, color: "#1a365d", opacity: 0.5,
            fontFamily: "Montserrat, sans-serif", letterSpacing: "0.08em",
            minWidth: 48, textAlign: "center",
          }}>
            {active + 1} / {TOTAL}
          </span>

          {/* Next */}
          <button
            onClick={next}
            disabled={active === TOTAL - 1}
            style={{
              width: 48, height: 48, borderRadius: 16, border: "none",
              cursor: active === TOTAL - 1 ? "not-allowed" : "pointer",
              background: active === TOTAL - 1
                ? "rgba(14,186,176,0.08)"
                : "linear-gradient(135deg,#1a365d,#0a5570)",
              boxShadow: active === TOTAL - 1 ? "none" : "0 8px 24px rgba(26,54,93,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: active === TOTAL - 1 ? 0.35 : 1,
              transition: "all 0.2s ease",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke={active === TOTAL - 1 ? "#0EBAB0" : "#fff"}
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}