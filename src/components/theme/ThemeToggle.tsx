'use client';

import React from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from './ThemeContext';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = true }) => {
  const { theme, toggleTheme } = useTheme();

  const getThemeInfo = () => {
    switch (theme) {
      case 'light':
        return {
          icon: <Sun size={15} />,
          label: 'Claro',
          nextLabel: 'Gris',
        };
      case 'gray':
        return {
          icon: <Palette size={15} />,
          label: 'Gris',
          nextLabel: 'Oscuro',
        };
      case 'dark':
      default:
        return {
          icon: <Moon size={15} />,
          label: 'Oscuro',
          nextLabel: 'Claro',
        };
    }
  };

  const info = getThemeInfo();

  return (
    <button
      type="button"
      className={`${styles.toggleBtn} ${className}`}
      onClick={toggleTheme}
      title={`Tema actual: ${info.label} · Clic para cambiar a ${info.nextLabel}`}
      aria-label={`Cambiar tema. Actual: ${info.label}`}
    >
      <span className={styles.iconWrapper}>
        {info.icon}
      </span>
      {showLabel && (
        <span className={styles.themeLabel}>
          {info.label}
        </span>
      )}
    </button>
  );
};
