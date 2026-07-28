"use client";

import React, { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useAnimationFrame,
} from "framer-motion";

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  pulsePhase: number;
}

interface CursorTrailPoint {
  x: number;
  y: number;
  timestamp: number;
}

interface HeroBackgroundAnimationProps {
  nodeCount?: number;
  connectionDistance?: number;
  cursorInfluence?: number;
  nodeSpeed?: number;
  accentColor?: string;
  lineOpacity?: number;
  cursorAttractionStrength?: number;
}

const HeroBackgroundAnimation: React.FC<HeroBackgroundAnimationProps> = ({
  nodeCount = 50,
  connectionDistance = 200,
  cursorInfluence = 180,
  nodeSpeed = 0.5,
  accentColor = "59, 130, 246", // RGB for blue-500
  lineOpacity = 0.5,
  cursorAttractionStrength = 1.5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorTrailRef = useRef<CursorTrailPoint[]>([]);
  const MAX_TRAIL_LENGTH = 15; // Number of trail points to keep

  // Smooth cursor tracking - more responsive
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 15, stiffness: 150 }); // More responsive
  const smoothMouseY = useSpring(mouseY, { damping: 15, stiffness: 150 });

  // Track if mouse is active
  const isMouseActive = useRef(false);
  const lastMouseTime = useRef(0);

  // Initialize nodes
  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;
    const adjustedNodeCount = isMobile
      ? Math.floor(nodeCount * 0.5)
      : nodeCount;

    nodesRef.current = Array.from({ length: adjustedNodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * nodeSpeed,
      vy: (Math.random() - 0.5) * nodeSpeed,
      baseX: Math.random() * rect.width,
      baseY: Math.random() * rect.height,
      size: Math.random() * 4 + 4, // Larger nodes: 4-8px
      opacity: Math.random() * 0.3 + 0.6, // Higher opacity: 0.6-0.9
      pulsePhase: Math.random() * Math.PI * 2,
    }));
  }, [nodeCount, nodeSpeed]);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      mouseX.set(currentX);
      mouseY.set(currentY);

      isMouseActive.current = true;
      lastMouseTime.current = Date.now();

      // Add to cursor trail
      cursorTrailRef.current.push({
        x: currentX,
        y: currentY,
        timestamp: Date.now(),
      });

      // Keep only recent trail points
      if (cursorTrailRef.current.length > MAX_TRAIL_LENGTH) {
        cursorTrailRef.current.shift();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Deactivate mouse influence after inactivity
    const checkActivity = setInterval(() => {
      if (Date.now() - lastMouseTime.current > 2000) {
        isMouseActive.current = false;
        cursorTrailRef.current = []; // Clear trail when inactive
      }
    }, 500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(checkActivity);
    };
  }, [mouseX, mouseY, MAX_TRAIL_LENGTH]);

  // Animation loop
  useAnimationFrame((time, delta) => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = containerRef.current.getBoundingClientRect();
    const cursorX = smoothMouseX.get();
    const cursorY = smoothMouseY.get();

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw nodes
    nodesRef.current.forEach((node) => {
      // Gentle drift towards base position (very weak)
      const driftX = (node.baseX - node.x) * 0.0005;
      const driftY = (node.baseY - node.y) * 0.0005;

      // Strong cursor ATTRACTION (not repulsion)
      let cursorForceX = 0;
      let cursorForceY = 0;

      if (isMouseActive.current) {
        const dx = cursorX - node.x; // Reversed: attract TO cursor
        const dy = cursorY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < cursorInfluence && distance > 0) {
          // Stronger force that increases as we get closer
          const force =
            (1 - distance / cursorInfluence) * cursorAttractionStrength;
          cursorForceX = (dx / distance) * force;
          cursorForceY = (dy / distance) * force;
        }
      }

      // Update velocity with less damping for more visible movement
      node.vx += driftX + cursorForceX;
      node.vy += driftY + cursorForceY;
      node.vx *= 0.92; // Less damping = more momentum
      node.vy *= 0.92;

      // Update position
      node.x += node.vx;
      node.y += node.vy;

      // Boundary wrapping
      if (node.x < 0) node.x = rect.width;
      if (node.x > rect.width) node.x = 0;
      if (node.y < 0) node.y = rect.height;
      if (node.y > rect.height) node.y = 0;

      // Pulse animation - more prominent
      node.pulsePhase += 0.03;
      const pulse = Math.sin(node.pulsePhase) * 0.4 + 0.8; // Stronger pulse
      const currentSize = node.size * pulse;
      const currentOpacity = node.opacity * pulse;

      // Draw node
      ctx.beginPath();
      ctx.arc(node.x, node.y, currentSize, 0, Math.PI * 2);

      // Gradient for glow effect
      const gradient = ctx.createRadialGradient(
        node.x,
        node.y,
        0,
        node.x,
        node.y,
        currentSize * 3
      );
      gradient.addColorStop(0, `rgba(${accentColor}, ${currentOpacity})`);
      gradient.addColorStop(
        0.5,
        `rgba(${accentColor}, ${currentOpacity * 0.5})`
      );
      gradient.addColorStop(1, `rgba(${accentColor}, 0)`);

      ctx.fillStyle = gradient;
      ctx.fill();

      // Core node
      ctx.beginPath();
      ctx.arc(node.x, node.y, currentSize * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${accentColor}, ${currentOpacity * 1.2})`;
      ctx.fill();
    });

    // Draw connections - thicker lines
    ctx.strokeStyle = `rgba(${accentColor}, ${lineOpacity})`;
    ctx.lineWidth = 2; // Thicker lines

    for (let i = 0; i < nodesRef.current.length; i++) {
      for (let j = i + 1; j < nodesRef.current.length; j++) {
        const nodeA = nodesRef.current[i];
        const nodeB = nodesRef.current[j];

        const dx = nodeA.x - nodeB.x;
        const dy = nodeA.y - nodeB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * lineOpacity;

          // Gradient line
          const gradient = ctx.createLinearGradient(
            nodeA.x,
            nodeA.y,
            nodeB.x,
            nodeB.y
          );
          gradient.addColorStop(
            0,
            `rgba(${accentColor}, ${opacity * nodeA.opacity})`
          );
          gradient.addColorStop(
            1,
            `rgba(${accentColor}, ${opacity * nodeB.opacity})`
          );

          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.stroke();
        }
      }
    }

    // Draw triangles from connected triplets - more visible
    ctx.fillStyle = `rgba(${accentColor}, 0.08)`; // More opaque

    for (let i = 0; i < nodesRef.current.length; i++) {
      for (let j = i + 1; j < nodesRef.current.length; j++) {
        for (let k = j + 1; k < nodesRef.current.length; k++) {
          const nodeA = nodesRef.current[i];
          const nodeB = nodesRef.current[j];
          const nodeC = nodesRef.current[k];

          const distAB = Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y);
          const distBC = Math.hypot(nodeB.x - nodeC.x, nodeB.y - nodeC.y);
          const distCA = Math.hypot(nodeC.x - nodeA.x, nodeC.y - nodeA.y);

          if (
            distAB < connectionDistance * 0.7 &&
            distBC < connectionDistance * 0.7 &&
            distCA < connectionDistance * 0.7
          ) {
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.lineTo(nodeC.x, nodeC.y);
            ctx.closePath();
            ctx.fill();
          }
        }
      }
    }

    // Draw cursor trail lines
    if (isMouseActive.current && cursorTrailRef.current.length > 1) {
      const currentTime = Date.now();
      const trail = cursorTrailRef.current;

      // Draw the trail path
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);

      for (let i = 1; i < trail.length; i++) {
        ctx.lineTo(trail[i].x, trail[i].y);
      }

      // Create gradient along the trail
      const gradient = ctx.createLinearGradient(
        trail[0].x,
        trail[0].y,
        trail[trail.length - 1].x,
        trail[trail.length - 1].y
      );
      gradient.addColorStop(0, `rgba(${accentColor}, 0.1)`);
      gradient.addColorStop(0.5, `rgba(${accentColor}, 0.4)`);
      gradient.addColorStop(1, `rgba(${accentColor}, 0.7)`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // Draw lines from cursor to nearby nodes
      const cursorPos = trail[trail.length - 1];
      ctx.lineWidth = 2;

      nodesRef.current.forEach((node) => {
        const dx = node.x - cursorPos.x;
        const dy = node.y - cursorPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < cursorInfluence * 0.6) {
          const opacity = (1 - distance / (cursorInfluence * 0.6)) * 0.6;

          const lineGradient = ctx.createLinearGradient(
            cursorPos.x,
            cursorPos.y,
            node.x,
            node.y
          );
          lineGradient.addColorStop(0, `rgba(${accentColor}, ${opacity})`);
          lineGradient.addColorStop(
            1,
            `rgba(${accentColor}, ${opacity * 0.3})`
          );

          ctx.beginPath();
          ctx.strokeStyle = lineGradient;
          ctx.moveTo(cursorPos.x, cursorPos.y);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();
        }
      });

      // Draw glowing dots along the trail
      trail.forEach((point, index) => {
        const age = currentTime - point.timestamp;
        const maxAge = 1000; // 1 second
        const ageRatio = 1 - age / maxAge;

        if (ageRatio > 0) {
          const size = 3 + ageRatio * 2;
          const opacity = ageRatio * 0.8;

          // Glow
          const glowGradient = ctx.createRadialGradient(
            point.x,
            point.y,
            0,
            point.x,
            point.y,
            size * 2
          );
          glowGradient.addColorStop(0, `rgba(${accentColor}, ${opacity})`);
          glowGradient.addColorStop(1, `rgba(${accentColor}, 0)`);

          ctx.beginPath();
          ctx.arc(point.x, point.y, size * 2, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${accentColor}, ${opacity})`;
          ctx.fill();
        }
      });
    }
  });

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      canvasRef.current.width = rect.width;
      canvasRef.current.height = rect.height;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-950/50 via-blue-900/30 to-blue-950/50" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="hero-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(147, 197, 253, 0.3)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>
      {/* Main animation canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Cursor glow effect - larger and more visible */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle, rgba(${accentColor}, 0.25) 0%, rgba(${accentColor}, 0.1) 40%, transparent 70%)`,
          filter: "blur(50px)",
          x: smoothMouseX,
          y: smoothMouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
};

export default HeroBackgroundAnimation;
