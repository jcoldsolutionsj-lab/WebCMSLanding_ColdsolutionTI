'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Navbar.module.css';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, PhoneCall, ChevronDown } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';

export interface NavChild {
  id: string;
  label: string;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  children?: NavChild[];
}

const defaultNavItems: NavItem[] = [
  { id: 'inicio', label: 'Inicio', href: '#hero' },
  {
    id: 'nosotros',
    label: 'Nosotros',
    href: '#dolores',
    children: [
      { id: 'dolores', label: '¿Te Pasa Esto?', href: '#dolores' },
      { id: 'voz', label: 'Voz del Cliente', href: '#voz-del-cliente' },
      { id: 'propuesta', label: 'Nuestro Enfoque', href: '#propuesta-valor' },
      { id: 'cierre', label: 'Filosofía & Cierre', href: '#cierre' },
    ],
  },
  {
    id: 'soluciones',
    label: 'Soluciones',
    href: '#servicios',
    children: [
      { id: 'servicios', label: 'Servicios', href: '#servicios' },
      { id: 'especialidades', label: 'Especialidades', href: '#especialidades' },
      { id: 'niveles', label: 'Niveles de Solución', href: '#soluciones' },
    ],
  },
  { id: 'proceso', label: 'Proceso', href: '#proceso' },
  { id: 'casos', label: 'Casos de Éxito', href: '#casos-de-exito' },
  { id: 'contacto', label: 'Contacto', href: '#contacto' },
];

// Flatten all navigable IDs for scroll spy
function getAllIds(items: NavItem[]): { id: string; href: string }[] {
  const result: { id: string; href: string }[] = [];
  for (const item of items) {
    if (item.children) {
      for (const child of item.children) {
        result.push({ id: child.id, href: child.href });
      }
    } else {
      result.push({ id: item.id, href: item.href });
    }
  }
  return result;
}

// Find the parent group ID for a given active child ID
function getParentId(items: NavItem[], childId: string): string | null {
  for (const item of items) {
    if (item.children) {
      if (item.children.some((c) => c.id === childId)) {
        return item.id;
      }
    }
  }
  return null;
}

interface NavbarProps {
  items?: NavItem[];
}

export const Navbar: React.FC<NavbarProps> = ({ items = defaultNavItems }) => {
  const [activeId, setActiveId] = useState<string>('inicio');
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null);
  const isScrolling = useRef(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const allIds = getAllIds(items);

  // Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      if (isScrolling.current) return;

      // Bottom of page → last navigable item
      if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 50) {
        const last = allIds[allIds.length - 1];
        setActiveId(last.id);
        return;
      }

      const scrollPosition = window.scrollY + 200;
      for (let i = allIds.length - 1; i >= 0; i--) {
        const { id, href } = allIds[i];
        const section = document.querySelector(href);
        if (section) {
          const top = (section as HTMLElement).offsetTop;
          if (scrollPosition >= top) {
            setActiveId(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [allIds]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setActiveId(id);
    setIsMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpandedGroup(null);

    const targetElement = document.querySelector(href);
    if (targetElement) {
      isScrolling.current = true;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 80;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let start: number | null = null;

      const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const ratio = Math.min(progress / duration, 1);
        const ease = easeInOutCubic(ratio);
        window.scrollTo(0, startPosition + distance * ease);
        if (progress < duration) {
          window.requestAnimationFrame(step);
        } else {
          setTimeout(() => { isScrolling.current = false; }, 100);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, []);

  // Desktop dropdown hover handlers
  const handleDropdownEnter = (id: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(id);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  // Mobile group expand toggle
  const toggleMobileGroup = (id: string) => {
    setMobileExpandedGroup((prev) => (prev === id ? null : id));
  };

  // Get the currently active parent ID for the tab highlight
  const activeParentId = getParentId(items, activeId);

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.container}>
        {/* Brand Logo */}
        <a
          href="#hero"
          className={styles.brand}
          onClick={(e) => handleNavClick(e, '#hero', 'inicio')}
        >
          <BrandLogo animate={true} />
        </a>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Navegación Principal">
          <div className={styles.tabsTrack}>
            {items.map((item) => {
              const isActive = activeId === item.id || activeParentId === item.id;
              const hasChildren = !!item.children;
              const isDropdownOpen = openDropdown === item.id;

              return (
                <div
                  key={item.id}
                  className={styles.tabGroup}
                  onMouseEnter={hasChildren ? () => handleDropdownEnter(item.id) : undefined}
                  onMouseLeave={hasChildren ? handleDropdownLeave : undefined}
                >
                  <a
                    href={item.href}
                    className={`${styles.tabItem} ${isActive ? styles.tabItemActive : ''}`}
                    onClick={(e) => {
                      if (hasChildren) {
                        e.preventDefault();
                        setOpenDropdown(isDropdownOpen ? null : item.id);
                      } else {
                        handleNavClick(e, item.href, item.id);
                      }
                    }}
                  >
                    <span className={styles.tabLabel}>
                      {item.label}
                      {hasChildren && <ChevronDown size={14} className={`${styles.chevron} ${isDropdownOpen ? styles.chevronOpen : ''}`} />}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className={styles.activeTabBg}
                        transition={{ type: 'spring' as const, stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>

                  {/* Desktop Dropdown */}
                  {hasChildren && (
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          className={styles.dropdown}
                          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.children!.map((child) => (
                            <a
                              key={child.id}
                              href={child.href}
                              className={`${styles.dropdownItem} ${activeId === child.id ? styles.dropdownItemActive : ''}`}
                              onClick={(e) => handleNavClick(e, child.href, child.id)}
                            >
                              {child.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* CTA Button */}
        <div className={styles.ctaWrapper}>
          <a
            href="#contacto"
            className={styles.headerCtaBtn}
            onClick={(e) => handleNavClick(e, '#contacto', 'contacto')}
          >
            <PhoneCall size={16} />
            <span>Contacto</span>
          </a>

          {/* Mobile Hamburger */}
          <button
            className={styles.mobileToggle}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className={styles.mobileDrawer}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className={styles.mobileNav}>
              {items.map((item) => {
                const hasChildren = !!item.children;
                const isGroupExpanded = mobileExpandedGroup === item.id;
                const isActive = activeId === item.id || activeParentId === item.id;

                return (
                  <div key={item.id} className={styles.mobileGroup}>
                    {hasChildren ? (
                      <>
                        <button
                          className={`${styles.mobileNavItem} ${isActive ? styles.mobileNavItemActive : ''}`}
                          onClick={() => toggleMobileGroup(item.id)}
                          type="button"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            size={18}
                            className={`${styles.mobileChevron} ${isGroupExpanded ? styles.mobileChevronOpen : ''}`}
                          />
                        </button>
                        <AnimatePresence>
                          {isGroupExpanded && (
                            <motion.div
                              className={styles.mobileSubItems}
                              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
                              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              {item.children!.map((child) => (
                                <a
                                  key={child.id}
                                  href={child.href}
                                  className={`${styles.mobileSubItem} ${activeId === child.id ? styles.mobileSubItemActive : ''}`}
                                  onClick={(e) => handleNavClick(e, child.href, child.id)}
                                >
                                  <span>{child.label}</span>
                                  {activeId === child.id && <span className={styles.mobileActiveDot} />}
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a
                        href={item.href}
                        className={`${styles.mobileNavItem} ${activeId === item.id ? styles.mobileNavItemActive : ''}`}
                        onClick={(e) => handleNavClick(e, item.href, item.id)}
                      >
                        <span>{item.label}</span>
                        {activeId === item.id && <span className={styles.mobileActiveDot} />}
                      </a>
                    )}
                  </div>
                );
              })}

              {/* Mobile CTA */}
              <a
                href="#contacto"
                className={styles.mobileCtaBtn}
                onClick={(e) => handleNavClick(e, '#contacto', 'contacto')}
              >
                <PhoneCall size={18} />
                <span>Solicitar Diagnóstico</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
