"use client";

import { useEffect, useRef } from "react";

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  angle: number;
  birthTime: number;
}

export function CursorSmoke() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<SmokeParticle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;

      // Calculate mouse velocity
      const dx = mouseRef.current.x - mouseRef.current.prevX;
      const dy = mouseRef.current.y - mouseRef.current.prevY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Emit particles continuously on movement
      const particleCount = Math.min(Math.ceil(distance / 5), 8);

      for (let i = 0; i < particleCount; i++) {
        const spread = 8; // Tighter initial spread
        const offset = i / particleCount - 0.5; // Distribute along trail

        particlesRef.current.push({
          x:
            mouseRef.current.x +
            (Math.random() - 0.5) * spread -
            dx * offset * 0.3,
          y:
            mouseRef.current.y +
            (Math.random() - 0.5) * spread -
            dy * offset * 0.3,
          vx: (Math.random() - 0.5) * 0.8 - dx * 0.02,
          vy: (Math.random() - 0.5) * 0.8 - dy * 0.02,
          life: 1,
          maxLife: 1,
          size: Math.random() * 20 + 10, // Start smaller
          angle: Math.random() * Math.PI * 2,
          birthTime: timeRef.current,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      // Clear canvas completely for crisp smoke
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      timeRef.current += 0.016; // ~60fps

      // Sort particles by age (newer particles on top)
      particlesRef.current.sort((a, b) => b.birthTime - a.birthTime);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        // Update particle physics
        particle.x += particle.vx;
        particle.y += particle.vy;

        // More pronounced organic swirling motion for wispy effect
        const swirl = Math.sin(timeRef.current * 3 + particle.angle) * 0.15;
        particle.vx += swirl;
        particle.vy += Math.cos(timeRef.current * 3 + particle.angle) * 0.15;

        // Stronger upward drift (smoke rises)
        particle.vy -= 0.08;

        // Less friction to maintain flowing motion
        particle.vx *= 0.96;
        particle.vy *= 0.96;

        // Faster expansion for wispy effect
        particle.size += 0.8;

        // Slower fade for longer trails
        particle.life -= 0.008;

        if (particle.life <= 0) return false;

        // Calculate distance from mouse for proximity-based opacity
        const dx = particle.x - mouseRef.current.x;
        const dy = particle.y - mouseRef.current.y;
        const distanceFromMouse = Math.sqrt(dx * dx + dy * dy);

        // Longer visible trail
        const proximityFactor = Math.max(0, 1 - distanceFromMouse / 350);

        // More visible opacity
        const baseOpacity = particle.life * 0.6;
        const finalOpacity = baseOpacity * (0.2 + proximityFactor * 0.8);

        // Light gradient: Bright Teal → Light Blue → Soft Indigo
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size,
        );

        // Bright Teal core (Teal-400/500)
        gradient.addColorStop(0, `rgba(45, 212, 191, ${finalOpacity})`);

        // Light Blue mid (Sky-400)
        gradient.addColorStop(0.5, `rgba(56, 189, 248, ${finalOpacity * 0.7})`);

        // Soft Indigo outer edge (Indigo-400)
        gradient.addColorStop(1, `rgba(129, 140, 248, 0)`);

        ctx.save();
        ctx.globalCompositeOperation = "source-over"; // Changed to source-over for cleaner colors
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return true;
      });

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        filter: "blur(25px)",
        mixBlendMode: "normal",
        opacity: 0.9,
      }}
    />
  );
}
