'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './HeroSection.module.css';
import { ArrowRight, ShieldCheck, Zap, Target } from 'lucide-react';

// ─── Carousel Slides + Impact Stories ───────────────────────────────────────
const SLIDES = [
  {
    src:       '/images/backgrounds/hero_logo.jpeg',
    alt:       'ColdSolution TI — Infraestructura tecnológica de vanguardia',
    eyebrow:   'Desarrollo Web Profesional',
    headline:  'Tu negocio merece una web que',
    highlight: 'venda mientras duermes',
    subtitle:  'Una empresa sin presencia digital no existe para el 87\u0025 de sus clientes. Diseñamos sitios web, landing pages y portales que generan confianza real, atraen consultas y convierten visitantes en clientes desde el primer día.',
  },
  {
    src:       '/images/backgrounds/hero_2.jpeg',
    alt:       'ColdSolution TI — Automatización de procesos empresariales',
    eyebrow:   'Automatización & RPA',
    headline:  'Cada tarea repetitiva que hoy hace una persona',
    highlight: 'puede hacerla un bot, sin errores',
    subtitle:  'Descargamos archivos, ordenamos datos, generamos reportes y enviamos información de forma automática. Tu equipo deja de perder horas en lo rutinario y se enfoca en lo que realmente importa.',
  },
  {
    src:       '/images/backgrounds/hero_3.jpeg',
    alt:       'ColdSolution TI — Business Intelligence y Datos',
    eyebrow:   'Datos & Business Intelligence',
    headline:  'Tus números ya existen — el problema es que',
    highlight: 'no los estás leyendo bien',
    subtitle:  'Conectamos tus fuentes de datos, construimos modelos en SQL y Power BI, y te entregamos dashboards que muestran exactamente qué está pasando en tu negocio. Decisiones basadas en evidencia, no en intuición.',
  },
  {
    src:       '/images/backgrounds/hero_4.jpeg',
    alt:       'ColdSolution TI — Aplicaciones Móviles',
    eyebrow:   'Aplicaciones Móviles',
    headline:  'Tu equipo necesita operar desde cualquier lugar —',
    highlight: 'donde sea, cuando sea',
    subtitle:  'Desarrollamos apps Android para vendedores, técnicos, repartidores y clientes. Registro de visitas, pedidos, mantenimiento e inventario desde el celular, sincronizado con tu plataforma central.',
  },
  {
    src:       '/images/backgrounds/hero_5.jpeg',
    alt:       'ColdSolution TI — Consultoría Tecnológica',
    eyebrow:   'Consultoría Tecnológica',
    headline:  'No siempre necesitas más tecnología —',
    highlight: 'necesitas la tecnología correcta',
    subtitle:  'Analizamos tu operación, identificamos los cuellos de botella reales y te proponemos una hoja de ruta proporcional a tu tamaño y presupuesto. Sin sobredimensionar. Sin vender lo que no necesitas.',
  },
];

// ─── Timing constants ────────────────────────────────────────────────────────
const DISPLAY_DURATION   = 9100; // ms image is fully visible
const FADE_DURATION      = 900;  // ms cross-fade between slides
const CYCLE_DURATION     = DISPLAY_DURATION + FADE_DURATION; // 10 000 ms total

// ─── Ken Burns config per slide (alternating to avoid monotony) ──────────────
const KB_PRESETS = [
  { startScale: 1.04, endScale: 1.00, startX:  '0%',   startY: '0%',   endX: '-0.5%', endY: '-0.5%' },
  { startScale: 1.00, endScale: 1.04, startX: '-1%',   startY: '-0.5%',endX:  '0%',   endY:  '0%'  },
  { startScale: 1.05, endScale: 1.01, startX:  '0.5%', startY:  '0.5%',endX: '-0.5%', endY:  '0%'  },
  { startScale: 1.01, endScale: 1.04, startX: '-0.5%', startY:  '0%',  endX:  '0.5%', endY: '-0.5%'},
  { startScale: 1.03, endScale: 1.00, startX:  '0%',   startY: '-0.5%',endX:  '0%',   endY:  '0.5%'},
];

// ─── Typewriter hook — retypes every time `text` changes ─────────────────────
function useTypewriter(text: string, durationMs: number) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone]           = useState(false);
  const rafRef                    = useRef<number | null>(null);
  const startRef                  = useRef<number | null>(null);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    startRef.current = null;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

    const total = text.length;
    const tick  = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed  = ts - startRef.current;
      const progress = Math.min(elapsed / durationMs, 1);
      setDisplayed(text.slice(0, Math.floor(progress * total)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayed(text);
        setDone(true);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return { displayed, done };
}

export const HeroSection = () => {
  const [current,   setCurrent]   = useState(0);
  const [previous,  setPrevious]  = useState<number | null>(null);
  const [progress,  setProgress]  = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const currentRef = useRef(current);
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  const tickRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slide = SLIDES[current];

  // ── Typewriter on subtitle ─────────────────────────────────────────────────
  const { displayed: typedSubtitle, done: subtitleDone } = useTypewriter(slide.subtitle, 3600);

  // ── Progress bar ───────────────────────────────────────────────────────────
  const startProgressBar = useCallback(() => {
    setProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
    const step = (30 / CYCLE_DURATION) * 100;
    progressRef.current = setInterval(() => {
      setProgress(p => { const n = p + step; return n >= 100 ? 100 : n; });
    }, 30);
  }, []);

  // ── Advance slide ──────────────────────────────────────────────────────────
  const goTo = useCallback((nextIdx: number, dir: 1 | -1 = 1) => {
    setPrevious(currentRef.current);
    setDirection(dir);
    setCurrent(nextIdx);
    startProgressBar();
  }, [startProgressBar]);

  const goNext = useCallback(() => {
    const nextIdx = (currentRef.current + 1) % SLIDES.length;
    goTo(nextIdx, 1);
  }, [goTo]);

  const goNextRef = useRef(goNext);
  useEffect(() => {
    goNextRef.current = goNext;
  }, [goNext]);

  // ── Auto-advance (ref-safe, continuous) ────────────────────────────────────
  useEffect(() => {
    if (tickRef.current)     clearInterval(tickRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    startProgressBar();
    tickRef.current = setInterval(() => {
      goNextRef.current();
    }, CYCLE_DURATION);

    return () => {
      if (tickRef.current)     clearInterval(tickRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [current, startProgressBar]);

  const kb = KB_PRESETS[current % KB_PRESETS.length];

  return (
    <section
      className={styles.container}
      id="hero"
    >
      {/* ── CAROUSEL BACKGROUND LAYER ─────────────────────────────────────── */}
      <div className={styles.carouselBg} aria-hidden="true">

        {/* Previous slide fading out */}
        {previous !== null && (
          <div key={`prev-${previous}`} className={styles.slideLayer} style={{ zIndex: 1 }}>
            <Image
              src={SLIDES[previous].src}
              alt={SLIDES[previous].alt}
              fill
              priority={previous === 0}
              className={styles.slideImg}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Current slide with Ken Burns + fade-in ──────────────────────────── */}
        <AnimatePresence mode="sync">
          <motion.div
            key={`slide-${current}`}
            className={styles.slideLayer}
            style={{ zIndex: 2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_DURATION / 1000, ease: 'easeInOut' }}
          >
            <motion.div
              className={styles.kenBurnsWrapper}
              initial={{
                scale: kb.startScale,
                x: kb.startX,
                y: kb.startY,
              }}
              animate={{
                scale: kb.endScale,
                x: kb.endX,
                y: kb.endY,
              }}
              transition={{
                duration: CYCLE_DURATION / 1000,
                ease: 'linear',
              }}
            >
              <Image
                src={SLIDES[current].src}
                alt={SLIDES[current].alt}
                fill
                priority={current === 0}
                className={styles.slideImg}
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Cinematic gradient overlay ───────────────────────────────────────── */}
        <div className={styles.cinematicOverlay} />
        <div className={styles.vignette} />
      </div>

      {/* ── CONTENT LAYER ─────────────────────────────────────────────────── */}
      <div className={styles.gridContainer}>
        {/* Left Column */}
        <motion.div
          className={styles.leftCol}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow tag — changes per slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`eyebrow-${current}`}
              className={styles.eyebrowTag}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
            >
              <span className={styles.pulseDot} />
              <span>{slide.eyebrow}</span>
            </motion.div>
          </AnimatePresence>

          {/* Headline — changes per slide */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`headline-${current}`}
              className={styles.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              {slide.headline}{' '}
              <span className={styles.highlightText}>{slide.highlight}</span>
            </motion.h1>
          </AnimatePresence>

          {/* Subtitle — typewriter per slide */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${current}`}
              className={styles.subtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {typedSubtitle}
              {!subtitleDone && (
                <span className={styles.subtitleCursor} aria-hidden="true" />
              )}
            </motion.p>
          </AnimatePresence>

          {/* CTAs — sequential spring-entrance after typewriter finishes */}
          <div className={styles.ctaGroup}>
            <AnimatePresence mode="wait">
              {subtitleDone && (
                <motion.div
                  key={`cta-wrapper-${current}`}
                  style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                >
                  <motion.a
                    href="#contacto"
                    className={styles.primaryCta}
                    initial={{ opacity: 0, y: 22, scale: 0.84 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 16,
                      mass: 0.75,
                      delay: 0,
                    }}
                  >
                    <span>Solicitar información</span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </motion.a>

                  <motion.a
                    href="#soluciones"
                    className={styles.secondaryCta}
                    initial={{ opacity: 0, y: 22, scale: 0.84 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 16,
                      mass: 0.75,
                      delay: 0.18,
                    }}
                  >
                    Ver Niveles de Solución
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trust Badges */}
          <div className={styles.trustBadges}>
            <div className={styles.badgeItem}>
              <Zap size={15} className={styles.badgeIcon} aria-hidden="true" />
              <span>Rápido</span>
            </div>
            <div className={styles.badgeItem}>
              <Target size={15} className={styles.badgeIcon} aria-hidden="true" />
              <span>A tu medida</span>
            </div>
            <div className={styles.badgeItem}>
              <ShieldCheck size={15} className={styles.badgeIcon} aria-hidden="true" />
              <span>Confiable</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: space intentional */}
        <div className={styles.rightCol} />
      </div>

      {/* ── CAROUSEL CONTROLS ──────────────────────────────────────────────── */}
      <div className={styles.carouselControls}>
        {/* Dot indicators with progress bar */}
        <div className={styles.dotsRow}>
          {SLIDES.map((slide, idx) => (
            <button
              key={idx}
              className={`${styles.dotBtn} ${idx === current ? styles.dotActive : ''}`}
              onClick={() => goTo(idx, idx > current ? 1 : -1)}
              aria-label={`Slide ${idx + 1}: ${slide.alt}`}
            >
              <span className={styles.dotInner}>
                {idx === current && (
                  <span
                    className={styles.dotProgress}
                    style={{ width: `${progress}%` }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
