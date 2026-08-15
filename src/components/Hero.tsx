'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { publicAsset } from '@/lib/publicAsset';
import { SunDisk, FrameBrackets } from './Ornaments';
import ThemePlayer from './ThemePlayer';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: splash drifts up, scales, fades. Title rises slower.
  const splashY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);
  const splashScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const splashOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const sunRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const sunScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.7], [0.55, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative h-[120vh] w-full overflow-hidden bg-obsidian"
      aria-label="Zaahen — The Unsundered"
    >
      {/* ── Splash art layer ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: splashY, scale: splashScale, opacity: splashOpacity }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${publicAsset('/Zaahen-Wallpaper.jpg')}")`,
            backgroundPosition: 'center 30%',
          }}
        />
        {/* darken/desaturate to integrate with palette */}
        <div className="absolute inset-0 bg-obsidian/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-transparent to-obsidian" />
      </motion.div>

      {/* ── Cinematic vignette ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at center, transparent 28%, rgba(8,7,10,0.7) 78%, var(--obsidian) 100%)',
          opacity: vignetteOpacity,
        }}
      />

      {/* ── Rotating sun-disk halo behind the name ── */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[58%] z-[6] -translate-x-1/2 -translate-y-1/2 text-gold/30"
        style={{ rotate: sunRotate, scale: sunScale }}
      >
        <SunDisk size={760} className="opacity-50 mix-blend-screen md:scale-100 scale-[0.55]" />
      </motion.div>

      {/* ── Top crown UI ── */}
      <header className="absolute left-0 right-0 top-0 z-20 grid grid-cols-[1fr_auto_1fr] items-start px-16 py-11 md:px-24 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 text-gold"
        >
          <span className="text-codex text-gold-light">Shurima</span>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="hidden items-center gap-10 md:flex"
        >
          {[
            ['The Vow', '#manifesto'],
            ['The Binding', '#codex'],
            ['Rhaast', '#duel'],
            ['The Host', '#brethren'],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-codex hover-grow-line text-ivory-dim transition-colors hover:text-gold"
            >
              {label}
            </a>
          ))}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="justify-self-end"
        >
          <ThemePlayer id="theme" />
        </motion.div>
      </header>

      {/* ── Title block ── */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center will-change-transform"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex items-center gap-4 text-gold-light md:mb-12"
        >
          <span className="block h-px w-12 bg-gold/60 md:w-24" />
          <span className="text-codex text-[0.62rem] md:text-[0.72rem]">
            Of the Ascended · The First Host
          </span>
          <span className="block h-px w-12 bg-gold/60 md:w-24" />
        </motion.div>

        <h1 className="relative font-display text-[15vw] font-medium uppercase leading-none tracking-[0.18em] will-change-transform md:text-[11.5vw]">
          {'ZAAHEN'.split('').map((char, i) => (
            <motion.span
              key={i}
              className={`relative inline-block text-divine-name ${
                i === 0 ? 'text-[1.12em] tracking-[0.12em]' : ''
              }`}
              initial={{ y: '80%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{
                duration: 1.9,
                delay: 0.85 + i * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex items-center gap-5 md:mt-10"
        >
          <span className="block h-px w-8 bg-blood md:w-16" />
          <p className="font-cormorant italic text-xl text-ivory md:text-3xl">
            The Unsundered
          </p>
          <span className="block h-px w-8 bg-blood md:w-16" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 3 }}
          className="mt-10 max-w-md px-6 text-center font-cormorant text-base leading-relaxed text-ivory-dim md:max-w-xl md:text-lg"
        >
          A silver-winged god, bound to the blade that broke him. He remembers
          every vow. He remembers every fall. He waits.
        </motion.p>

        <motion.a
          href="#manifesto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 3.4 }}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-gold-light"
        >
          <span className="text-codex text-[0.62rem]">Descend</span>
          <motion.span
            className="block h-12 w-px bg-gold/60"
            animate={{ scaleY: [0.2, 1, 0.2], opacity: [0.3, 1, 0.3] }}
            style={{ transformOrigin: 'top' }}
            transition={{ duration: 2.6, ease: 'easeInOut', repeat: Infinity }}
          />
        </motion.a>
      </motion.div>

      {/* corner brackets */}
      <div className="pointer-events-none absolute inset-6 z-[8] text-gold/40 md:inset-10">
        <FrameBrackets />
      </div>
    </section>
  );
}
