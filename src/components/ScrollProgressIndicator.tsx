'use client';

import { motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

export const ScrollProgressIndicator = () => {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        backgroundColor: 'var(--accent-primary)',
        transformOrigin: '0%',
        zIndex: 10001, // Above the navbar (9999) and mobile menu (10000)
      }}
    />
  );
};
