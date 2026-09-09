'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const MagneticButton = ({ children, className, intensity = 40, ...rest }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  useEffect(() => {
    const matchMedia = window.matchMedia('(pointer: coarse)');
    setIsMobile(matchMedia.matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const hX = rect.left + rect.width / 2;
    const hY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - hX;
    const distanceY = e.clientY - hY;
    
    // Magnetic pull calculation based on distance from center
    x.set((distanceX / rect.width) * intensity);
    y.set((distanceY / rect.height) * intensity);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: isMobile ? 0 : mouseXSpring,
        y: isMobile ? 0 : mouseYSpring,
      }}
      whileTap={{ scale: 0.95 }}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  );
};
