"use client";

import React from "react";
import { motion } from "framer-motion";

interface Position {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

interface AnimatedGlowCircleProps {
  size?: number;
  color?: string;
  pulseSpeed?: number;
  borderSpeed?: number;
  className?: string;
  opacity?: number;
  blur?: number;
  position?: Position;
}

export const AnimatedGlowCircle: React.FC<AnimatedGlowCircleProps> = ({
  size = 420, // minimum size when contracted
  color = "#0EBAB0", // 🔥 bright cyan-blue
  pulseSpeed = 8,
  borderSpeed = 6,
  className = "",
  opacity = 1,
  blur = 90,
  position = { top: "50%", left: "50%" },
}) => {
  const positionStyle = {
    ...position,
    transform:
      position.top === "50%" && position.left === "50%"
        ? "translate(-50%, -50%)"
        : undefined,
  };

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={positionStyle}
    >
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        animate={{
          // ⬇️ Expand to near full screen, then contract
          scale: [2.2, 1, 2.2],
          opacity: [opacity * 50, opacity, opacity * 50],
        }}
        transition={{
          duration: pulseSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Bright outer glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(
              circle,
              ${color}55 0%,
              ${color}25 35%,
              transparent 70%
            )`,
            filter: `blur(${blur}px)`,
          }}
        />

        {/* Hollow center ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(
              circle,
              transparent 48%,
              ${color}90 55%,
              transparent 65%
            )`,
          }}
        />

        {/* Rotating bright border */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ transform: "rotate(-90deg)" }}
        >
          <motion.circle
            cx="50%"
            cy="50%"
            r={size / 2 - 8}
            fill="none"
            stroke={`url(#glow-gradient-${size})`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="260 900"
            style={{
              filter: `
                drop-shadow(0 0 10px ${color})
                drop-shadow(0 0 20px ${color})
              `,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: borderSpeed,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <defs>
            <linearGradient
              id={`glow-gradient-${size}`}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={color} stopOpacity="0" />
              <stop offset="50%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
};
