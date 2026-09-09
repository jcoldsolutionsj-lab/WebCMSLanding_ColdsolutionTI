'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BrandLogoProps {
  className?: string;
  animate?: boolean;
  style?: React.CSSProperties;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', animate = false, style }) => {
  const LogoContent = () => (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', height: '100%', ...style }}>
      {/* Logo circle */}
      <div style={{
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow: '0 0 16px rgba(30, 167, 255, 0.5)',
        border: '1.5px solid rgba(30, 167, 255, 0.7)',
        background: '#0c1b33',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <img
          src="/images/logoCompleto.png"
          alt="ColdSolutions TI Logo"
          style={{
            width: '150%',
            height: '120%',
            objectFit: 'cover',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Brand Text — Static without typewriter animation */}
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        color: '#ffffff',
        fontWeight: 800,
        fontSize: '1.25rem',
        letterSpacing: '-0.02em',
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}>
        ColdSolutions{' '}
        <span style={{ color: '#1ea7ff' }}>TI</span>
      </span>
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={className}
        style={{ display: 'inline-flex', alignItems: 'center', height: '100%' }}
      >
        <LogoContent />
      </motion.div>
    );
  }

  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center', height: '100%' }}>
      <LogoContent />
    </div>
  );
};
