'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  distance = 50,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as const, // Smooth easing
      },
    },
  };

  if (direction === 'none') {
    variants.hidden = { opacity: 0, y: 0, x: 0 };
  }

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden', width: '100%' }}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={controls}
      >
        {children}
      </motion.div>
    </div>
  );
}
