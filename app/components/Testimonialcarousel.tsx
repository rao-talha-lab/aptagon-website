"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  metric?: string;
  metricLabel?: string;
}

const testimonials: Testimonial[] = [
  { id: 1, name: "John Miller", role: "CEO", company: "TechNova Solutions", metric: "3×", metricLabel: "Revenue Growth", quote: "Working with Aptagon Technologies was a game-changer for our business. Their team delivered our web app on time with excellent design and functionality. Every detail was considered — from micro-interactions to load performance." },
  { id: 2, name: "Sarah Khan", role: "Manager", company: "Digital Wave", metric: "3×", metricLabel: "User Engagement", quote: "The attention to detail and professionalism Aptagon brought to our project exceeded every expectation. Our platform saw a 3× increase in user engagement post-launch. I wouldn't trust any other team with our product." },
  { id: 3, name: "Robert Fox", role: "Founder", company: "Fox Capital", metric: "99%", metricLabel: "Uptime Delivered", quote: "Aptagon built our fintech dashboard from scratch. The UI is stunning, the performance is rock-solid, and the team was a pleasure to work with throughout the entire engagement." },
  { id: 4, name: "Emily Blunt", role: "COO", company: "Global Systems", metric: "60%", metricLabel: "Faster Delivery", quote: "From discovery to delivery, Aptagon's process was seamless. They translated complex requirements into an intuitive product our team loves. Communication was flawless from day one to launch." },
  { id: 5, name: "David Goggins", role: "Director", company: "Stay Hard Inc", metric: "#1", metricLabel: "Industry Rank", quote: "Aptagon didn't just build software — they built a competitive advantage. The quality of their code and their UX thinking is genuinely world-class. No shortcuts, no compromises." },
  { id: 6, name: "Aisha Patel", role: "CTO", company: "NexGen Labs", metric: "0", metricLabel: "Launch Downtime", quote: "The engineering rigour Aptagon applied to our AI product was impressive. Clean architecture, thorough documentation, and zero downtime on launch day. Simply the best team I've worked with." },
  { id: 7, name: "Carlos Mendez", role: "VP Product", company: "Orbis Tech", metric: "−20%", metricLabel: "Under Budget", quote: "Our redesign project was delivered two weeks early and 20% under budget. Aptagon sets the gold standard for what a technology partner should look like." },
  { id: 8, name: "Lena Fischer", role: "CMO", company: "Bright Commerce", metric: "+40%", metricLabel: "Conversion Rate", quote: "The e-commerce solution Aptagon delivered boosted our conversion rate by 40% in the first quarter. Exceptional design meets exceptional engineering — that is the Aptagon formula." },
  { id: 9, name: "James Okonkwo", role: "Founder", company: "Strata Health", metric: "100%", metricLabel: "Compliance Met", quote: "Regulatory-compliant healthcare software is notoriously hard. Aptagon navigated every challenge with expertise and delivered on time. Remarkable team, remarkable results." },
  { id: 10, name: "Mei Ling", role: "CEO", company: "PacRim Ventures", metric: "3rd", metricLabel: "Project Together", quote: "We've worked with agencies on three continents. Aptagon is the only partner we've brought back for a second and third project. Their consistency and quality are unmatched in the industry." },
];

/* ── Avatar ─────────────────────────────────────────────────────────────── */
const Avatar = ({ name }: { name: string }) => {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  const palettes: [string, string][] = [
    ["#335ECE", "#073A53"], ["#073A53", "#335ECE"], ["#0a4f6e", "#4b75e0"],
    ["#264ca8", "#073A53"], ["#335ECE", "#0a6e8a"], ["#073A53", "#3d6de3"],
    ["#0a3d55", "#335ECE"], ["#335ECE", "#1f3d8c"], ["#284fa6", "#073A53"], ["#335ECE", "#073A53"],
  ];
  const [from, to] = palettes[name.charCodeAt(0) % palettes.length];
  return (
    <div style={{
      width: 52, height: 52, borderRadius: 16, flexShrink: 0,
      background: `linear-gradient(135deg,${from},${to})`,
      boxShadow: `0 6px 20px ${from}55`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 900, fontSize: 17,
      position: "relative", overflow: "hidden",
      fontFamily: "'Montserrat',sans-serif",
    }}>
      {initials}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(255,255,255,0.25),transparent 55%)" }} />
    </div>
  );
};

/* ── Stars ───────────────────────────────────────────────────────────────── */
const Stars = ({ count = 5 }: { count?: number }) => (
  <div style={{ display: "flex", gap: 3 }}>
    {[...Array(count)].map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B"
        style={{ filter: "drop-shadow(0 0 3px rgba(245,158,11,0.5))" }}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

/* ── Single Testimonial Card ─────────────────────────────────────────────── */
const TestimonialCard = ({ t }: { t: Testimonial }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 330,
        flexShrink: 0,
        borderRadius: 32,
        overflow: "hidden",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        boxShadow: hovered
          ? "0 0 0 1.5px rgba(51,94,206,0.35), 0 32px 80px rgba(7,58,83,0.2), 0 8px 24px rgba(51,94,206,0.15)"
          : "0 0 0 1px rgba(51,94,206,0.12), 0 8px 32px rgba(7,58,83,0.1)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.2, 1, 0.3, 1)",
      }}
    >
      {/* TOP GRADIENT BAND */}
      <div style={{
        background: "linear-gradient(135deg, #1E3A8A 0%, #335ECE 100%)",
        padding: "22px 24px 20px", position: "relative", overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        flex: 1, // Ensures all top sections stretch equally to match container heights
      }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", bottom: -20, left: -10, width: 80, height: 80, borderRadius: "50%", background: "rgba(51,94,206,0.15)" }} />
        <div style={{
          position: "absolute", top: 8, right: 20, fontSize: "4.5rem", lineHeight: 1,
          color: "rgba(255,255,255,0.08)", fontFamily: "Georgia,serif", userSelect: "none" as const
        }}>❝</div>

        {t.metric && (
          <div style={{
            display: "inline-flex", flexDirection: "column", alignItems: "center",
            background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 16, padding: "8px 18px", marginBottom: 14,
            alignSelf: "flex-start",
          }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1, fontFamily: "'Montserrat',sans-serif" }}>
              {t.metric}
            </span>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 2 }}>
              {t.metricLabel}
            </span>
          </div>
        )}

        <p className="text-justify"
          style={{ margin: 0, fontSize: 13, lineHeight: 1.85, color: "rgba(255,255,255,0.9)", fontWeight: 400, position: "relative", flex: 1 }}>
          "{t.quote}"
        </p>

        {hovered && (
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            <motion.div
              animate={{ x: ["-120%", "220%"] }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{
                position: "absolute", top: 0, left: 0, width: "25%", height: "100%",
                background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)"
              }}
            />
          </div>
        )}
      </div>

      {/* BOTTOM WHITE SECTION */}
      <div style={{ padding: "18px 24px 22px", background: "#fff", marginTop: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <Stars />
          <span style={{
            fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em",
            color: "#335ECE", background: "rgba(51,94,206,0.08)",
            padding: "3px 10px", borderRadius: 99, border: "1px solid rgba(51,94,206,0.2)",
          }}>Verified ✓</span>
        </div>

        <div style={{
          height: 1, marginBottom: 16,
          background: "linear-gradient(90deg,transparent,rgba(51,94,206,0.4),transparent)"
        }} />

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar name={t.name} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'Montserrat','Arial Black',sans-serif",
              color: "#073A53", fontWeight: 900, fontSize: 15, letterSpacing: "-0.02em", marginBottom: 4
            }}>
              {t.name}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{
                fontSize: 10, color: "#335ECE", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.1em"
              }}>
                {t.role}
              </span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#335ECE", display: "inline-block", opacity: 0.6 }} />
              <span style={{ fontSize: 10, fontWeight: 600 }}>
                {t.company}
              </span>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 16, height: 2.5, borderRadius: 2,
          background: hovered
            ? "linear-gradient(90deg,transparent,#335ECE,#073A53,transparent)"
            : "linear-gradient(90deg,transparent,rgba(51,94,206,0.3),transparent)",
          transition: "background 0.4s ease",
        }} />
      </div>
    </div>
  );
};

/* ── Main Export ─────────────────────────────────────────────────────────── */
export default function TestimonialCarousel() {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const cardW = useRef(0);
  const CARD_GAP = 28;
  const SPEED = 50;

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const first = containerRef.current.querySelector<HTMLElement>(":scope > div");
        if (first) cardW.current = first.offsetWidth + CARD_GAP;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    let raf: number;
    let last = performance.now();

    const tick = (now: number) => {
      if (!isPaused.current && cardW.current > 0) {
        const delta = now - last;
        const move = (delta / 1000) * SPEED;
        const cur = x.get() - move;
        const resetAt = -(cardW.current * testimonials.length);
        x.set(cur <= resetAt ? cur - resetAt : cur);
      }
      last = now;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [x]);

  return (
    <div style={{
      position: "relative", width: "100%", background: "#E7EBF7",
      padding: "60px 0 72px", boxSizing: "border-box",
    }}>
      {/* Ambient */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 90% 50% at 50% -10%, rgba(14,186,176,0.13) 0%, transparent 60%)"
      }} />

      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.022,
        background: "radial-gradient(ellipse 90% 50% at 50% -10%, rgba(51,94,206,0.13) 0%, transparent 60%)",
        backgroundSize: "44px 44px"
      }} />

      {/* ── HEADER ── */}
      <div style={{
        position: "relative", zIndex: 2, textAlign: "center",
        padding: "0 24px", width: "100%", boxSizing: "border-box", marginBottom: 48,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 10 }}>
          <motion.div animate={{ width: [14, 30, 14], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ height: 1.5, background: "linear-gradient(90deg,transparent,#335ECE)", borderRadius: 2 }} />
          <span style={{
            fontSize: 11, fontWeight: 900, color: "#335ECE",
            textTransform: "uppercase", letterSpacing: "0.38em", fontFamily: "'Montserrat',sans-serif"
          }}>
            Success Stories
          </span>
          <motion.div animate={{ width: [14, 30, 14], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{ height: 1.5, background: "linear-gradient(90deg,#0EBAB0,transparent)", borderRadius: 2 }} />
        </div>

        <h2 style={{
          margin: 0,
          fontSize: "3rem",
          fontWeight: 700, color: "#666666", lineHeight: 1.2,
        }}>
          Trusted by{" "}
          <span style={{ color: "#335ECE", textShadow: "0 0 40px rgba(14,186,176,0.3)" }}>
            Businesses Worldwide
          </span>
        </h2>
      </div>

      {/* ── INFINITE SCROLL TRACK ── */}
      <div
        style={{ position: "relative", overflow: "hidden", padding: "20px 0" }}
        onMouseEnter={() => (isPaused.current = true)}
        onMouseLeave={() => (isPaused.current = false)}
      >
        <motion.div
          ref={containerRef}
          style={{ x, display: "flex", gap: CARD_GAP, width: "max-content", alignItems: "stretch" }}
        >
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}