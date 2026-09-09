'use client';

import { motion, useMotionTemplate, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

export const CursorGlow = () => {
  const [isMobile, setIsMobile]   = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for outer ring
  const springConfig = { stiffness: 450, damping: 28 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  // Background spotlight gradient tracking cursor
  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(30, 167, 255, 0.07),
      transparent 80%
    )
  `;

  useEffect(() => {
    const matchMedia = window.matchMedia('(pointer: coarse)');
    if (matchMedia.matches) {
      setIsMobile(true);
      return;
    }
    setIsMobile(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest(
          'a, button, input, textarea, select, label, [role="button"], .interactive, button *'
        );
        setIsHovered(!!isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp   = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup',   handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup',   handleMouseUp);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      {/* Ambient background spotlight tracking cursor */}
      <motion.div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9990,
          background,
        }}
      />

      {/* Outer Brand Ring with smooth spring lag */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 38,
          height: 38,
          borderRadius: '50%',
          border: isHovered
            ? '1.5px solid rgba(56, 189, 248, 0.85)'
            : '1.5px solid rgba(30, 167, 255, 0.45)',
          backgroundColor: isHovered
            ? 'rgba(30, 167, 255, 0.16)'
            : 'rgba(30, 167, 255, 0.04)',
          boxShadow: isHovered
            ? '0 0 22px rgba(30, 167, 255, 0.45), inset 0 0 10px rgba(30, 167, 255, 0.25)'
            : '0 0 10px rgba(30, 167, 255, 0.15)',
          pointerEvents: 'none',
          zIndex: 9998,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isClicked ? 0.75 : isHovered ? 1.45 : 1,
          transition: 'border-color 0.2s, background-color 0.2s, box-shadow 0.2s, scale 0.15s ease-out',
        }}
      />

      {/* Central Sharp Glowing Dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: isHovered ? '#38bdf8' : '#1ea7ff',
          boxShadow: isHovered
            ? '0 0 12px #38bdf8, 0 0 24px #1ea7ff'
            : '0 0 8px #1ea7ff, 0 0 16px rgba(30, 167, 255, 0.6)',
          pointerEvents: 'none',
          zIndex: 9999,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isClicked ? 0.6 : isHovered ? 1.3 : 1,
          transition: 'background-color 0.15s, box-shadow 0.15s, scale 0.15s',
        }}
      />
    </>
  );
};
