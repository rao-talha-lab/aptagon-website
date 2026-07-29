"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

const clients = [
  { name: "WickenSoft", url: "www.wickensoft.com", desc: "Worked with WickenSoft to deliver reliable and innovative technology solutions.", img: "/logos/wicken.png", color: "#335ECE" },
  { name: "Windsor", url: "www.windsor.com", desc: "Collaborated with Windsor to deliver technology solutions for their education consultancy.", img: "/logos/windsor.png", color: "#335ECE" },
  { name: "Free Word Unscrambler", url: "www.wordunscramble.com", desc: "Delivered a reliable digital solution to enhance Free Word Unscrambler performance and usability.", img: "/logos/trendbost.png", color: "#335ECE" },
  { name: "Sadsan", url: "www.sadsantechnologies.com", desc: "Provided modern digital solutions to support efficient business operations and platform performance.", img: "/logos/sadsan.png", color: "#335ECE" },
  { name: "PVP.com", url: "www.pvp.com", desc: "Delivered reliable digital solutions to enhance platform performance and user experience.", img: "/logos/PVP.png", color: "#335ECE" },
  { name: "PSG (Proximus)", url: "www.psg.com", desc: "Worked with PSG to deliver reliable technology solutions that support their digital growth.", img: "/logos/PSG.png", color: "#335ECE" },
  { name: "Infinex", url: "www.zetastudy.com", desc: "Worked with Zeta Study to deliver reliable digital solutions for their education consultancy platform.", img: "/logos/ZZETA.png", color: "#335ECE" },
  { name: "DataCore", url: "www.datacore.com", desc: "Managing massive data ecosystems with enterprise-grade cloud storage and security protocols.", img: "/logos/Word.png", color: "#335ECE" },
];

const CARD_W = 200;
const CARD_H = 230;
const RADIUS = 460;
const TOTAL = clients.length;

export default function ClientsSection3D() {
  const angleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const [, setTick] = useState(0);

  useEffect(() => {
    let last = performance.now();
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!isDragging.current) targetAngleRef.current += dt * 10;
      angleRef.current += (targetAngleRef.current - angleRef.current) * 0.055;
      setTick((t) => t + 1);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    targetAngleRef.current -= (e.clientX - lastX.current) * 0.22;
    lastX.current = e.clientX;
  };
  const onPointerUp = () => {
    isDragging.current = false;
  };

  return (
    <>
      <style>{`
        @keyframes cs-shimmer  { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes cs-dotpulse { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(2.2);opacity:1} }
        @keyframes cs-gridmv   { to{background-position:60px 60px} }
      `}</style>

      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          paddingTop: "90px",
          paddingBottom: "90px",
          background: "rgba(51,94,206,0.04)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "grab",
          userSelect: "none",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* ── Deep space bg grid ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "linear-gradient(#335ECE 1px,transparent 1px),linear-gradient(90deg,#335ECE 1px,transparent 1px)",
            backgroundSize: "60px 60px",
            animation: "cs-gridmv 25s linear infinite",
            pointerEvents: "none",
          }}
        />

        {/* ── HEADING ── */}
        <div
          style={{
            position: "absolute",
            top: "7%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            textAlign: "center",
            pointerEvents: "none",
            width: "100%",
            maxWidth: 640,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                height: 1,
                width: 40,
                background: "linear-gradient(90deg,transparent,rgba(51,94,206,0.6))",
              }}
            />
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#335ECE",
                animation: "cs-dotpulse 2.2s ease-in-out infinite",
                boxShadow: "0 0 10px #335ECE",
              }}
            />
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.45em",
                fontWeight: 700,
                color: "#335ECE",
                textTransform: "uppercase",
              }}
            >
              Trusted Worldwide
            </span>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "rgba(51,94,206,0.4)",
                boxShadow: "0 0 8px rgba(51,94,206,0.4)",
              }}
            />
            <div
              style={{
                height: 1,
                width: 40,
                background: "linear-gradient(90deg,rgba(51,94,206,0.6),transparent)",
              }}
            />
          </div>
          <h2
            style={{
              fontSize: "clamp(34px,5vw,60px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              margin: "0 0 0",
              color: "transparent",
              background:
                "linear-gradient(120deg,#073A53 0%,#335ECE 50%,#073A53 100%)",
              backgroundSize: "250% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              animation: "cs-shimmer 6s linear infinite",
            }}
          >
            Our Global Clients
          </h2>
        </div>

        {/* ── 3D CAROUSEL CONTAINER ── */}
        <div
          style={{
            position: "relative",
            width: CARD_W,
            height: CARD_H,
            perspective: 1200,
            zIndex: 10,
            marginTop: 70,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: CARD_W,
              height: CARD_H,
              transformStyle: "preserve-3d",
              transform: "rotateX(-3deg)",
            }}
          >
            {clients.map((client, i) => {
              const angle = angleRef.current + (i / TOTAL) * 360;
              const rad = (angle * Math.PI) / 180;
              const x = Math.sin(rad) * RADIUS;
              const z = Math.cos(rad) * RADIUS;
              const normalizedZ = (z + RADIUS) / (RADIUS * 2);

              const scale = 0.85 + normalizedZ * 0.15;
              const opacity = Math.max(0.3, normalizedZ);
              const blur = (1 - normalizedZ) * 4; // Added missing blur calculation
              const isActive = z > RADIUS * 0.3;

              return (
                <div
                  key={client.name}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: CARD_W,
                    height: CARD_H,
                    transform: `translate3d(-50%, -50%, 0px) translate3d(${x}px, 0px, ${z}px) scale(${scale})`,
                    opacity,
                    filter: blur > 0.5 ? `blur(${blur}px)` : "none",
                    zIndex: Math.round(normalizedZ * 100),
                    willChange: "transform, opacity",
                    backfaceVisibility: "hidden",
                    WebkitFontSmoothing: "antialiased",
                  }}
                >
                  {/* CARD CONTAINER */}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 24,
                      position: "relative",
                      overflow: "hidden",
                      background: "#ffffff",
                      border: isActive
                        ? "2px solid #335ECE"
                        : "1.5px solid rgba(7,58,83,0.15)",
                      boxShadow: isActive
                        ? "0 20px 45px rgba(51,94,206,0.18), 0 4px 16px rgba(7,58,83,0.08)"
                        : "0 4px 16px rgba(7,58,83,0.05)",
                      display: "flex",
                      flexDirection: "column",
                      transform: "translateZ(0)",
                    }}
                  >
                    {/* LOGO ZONE */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: 85,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "18px 20px 10px",
                        background: "transparent",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Image
                          src={client.img}
                          alt={client.name}
                          fill
                          sizes="220px"
                          priority={i < 4}
                          style={{
                            objectFit: "contain",
                            objectPosition: "center",
                          }}
                        />
                      </div>
                    </div>

                    {/* DIVIDER */}
                    <div
                      style={{
                        width: "85%",
                        height: 1,
                        background: "rgba(51,94,206,0.25)",
                        margin: "0 auto",
                      }}
                    />

                    {/* URL */}
                    <div style={{ padding: "10px 16px 0", textAlign: "center" }}>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: "#335ECE",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {client.url}
                      </span>
                    </div>

                    {/* DESCRIPTION */}
                    <div
                      style={{
                        padding: "6px 16px 16px",
                        textAlign: "center",
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 10.5,
                          lineHeight: 1.6,
                          color: "#073A53",
                          fontWeight: 600,
                          margin: 0,
                          WebkitFontSmoothing: "antialiased",
                        }}
                      >
                        {client.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}