'use client';

import { HTMLMotionProps, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, forwardRef } from 'react';

export const TiltCard = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>((props, ref) => {
  const { children, style, ...rest } = props;
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  useEffect(() => {
    const matchMedia = window.matchMedia('(pointer: coarse)');
    setIsMobile(matchMedia.matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    
    if (props.onMouseMove) {
      props.onMouseMove(e);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
    
    if (props.onMouseLeave) {
      props.onMouseLeave(e);
    }
  };

  return (
    <motion.div
      ref={ref}
      {...rest}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <div style={{ transform: isMobile ? 'none' : "translateZ(30px)" }}>
        {children as React.ReactNode}
      </div>
    </motion.div>
  );
});

TiltCard.displayName = "TiltCard";
