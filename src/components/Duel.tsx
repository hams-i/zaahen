'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SunDisk } from './Ornaments';

const exchanges = [
  {
    speaker: 'RHAAST',
    side: 'right' as const,
    line: 'What we once were is nothing. What we are now, you deny. It sickens me.',
    note: 'The corrupted brother.',
  },
  {
    speaker: 'ZAAHEN',
    side: 'left' as const,
    line: 'You have fallen far, brother. But this is not who you are. Come, fight beside me — for what we once were.',
    note: 'A hand, offered to the lost.',
  },
  {
    speaker: 'RHAAST',
    side: 'right' as const,
    line: 'Why do you not join us, Zaahen? This world has forgotten its masters. It deserves to be ravaged.',
    note: 'The whisper Zaahen cannot quite silence.',
  },
  {
    speaker: 'ZAAHEN',
    side: 'left' as const,
    line: 'We are masters of nothing. We are Darkin. And we must all be destroyed.',
    note: 'The vow that bound him to the blade.',
  },
];

export default function Duel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Horizontal travel — 6 panels (intro + 4 exchanges + outro).
  // Each panel gets a short dwell before the row advances. That keeps the
  // side-anchored quotes readable instead of lingering in the empty space
  // between panels.
  const panels = 6;
  const x = useTransform(
    scrollYProgress,
    [0, 0.13, 0.174, 0.304, 0.348, 0.478, 0.522, 0.652, 0.696, 0.826, 0.87, 1],
    [
      '0%',
      '0%',
      '-16.6667%',
      '-16.6667%',
      '-33.3333%',
      '-33.3333%',
      '-50%',
      '-50%',
      '-66.6667%',
      '-66.6667%',
      `-${((panels - 1) / panels) * 100}%`,
      `-${((panels - 1) / panels) * 100}%`,
    ]
  );
  // Sky reddens as the duel proceeds
  const skyOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.45, 0.7]);

  return (
    <section
      id="duel"
      ref={containerRef}
      className="relative w-full bg-obsidian"
      // 6 panels worth of scroll runway, with the sticky stage pinned for the
      // active viewport.
      style={{ height: `${panels * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Bleeding sky — gradient overlay that intensifies */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at center top, rgba(139, 19, 24, 0.6), transparent 60%)',
            opacity: skyOpacity,
          }}
        />

        {/* Mountaintop horizon line */}
        <div className="pointer-events-none absolute left-0 right-0 top-[68%] z-[2]">
          <div className="divider-gold opacity-60" />
          <div className="mt-px h-[1px] w-full bg-blood/20" />
        </div>

        {/* Travelling row — explicit total width so percentage translateX is unambiguous */}
        <motion.div
          className="absolute top-0 left-0 flex h-full items-center"
          style={{ width: `${panels * 100}vw`, x }}
        >
          {/* Intro panel */}
          <div className="flex h-screen w-screen shrink-0 items-center justify-center px-6 md:px-20">
            <div className="max-w-2xl text-center">
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4 }}
                className="mx-auto h-px w-32 bg-blood"
              />
              <p className="text-codex mt-8 text-blood-bright">Chapter · III · Reprised</p>
              <h2 className="mt-6 font-display text-5xl font-medium uppercase leading-[0.95] tracking-[0.04em] md:text-8xl">
                <span className="text-gold-leaf">The</span>{' '}
                <span className="font-cormorant italic text-ivory">Duel</span>
              </h2>
              <p className="mt-8 font-cormorant text-xl italic leading-snug text-ivory-dim md:text-2xl">
                A god and his brother. Many days. Many nights. A flattened mountaintop, and the
                skies above weeping crimson.
              </p>
              <p className="text-codex mt-12 text-ivory-ash">scroll →</p>
            </div>
          </div>

          {/* Exchanges */}
          {exchanges.map((ex, i) => (
            <DuelPanel key={i} exchange={ex} index={i} />
          ))}

          {/* Outro panel */}
          <div className="flex h-screen w-screen shrink-0 items-center justify-center px-6 md:px-20">
            <div className="max-w-2xl text-center">
              <motion.div
                className="mx-auto mb-8 text-gold/80"
                animate={{ rotate: 360 }}
                transition={{ duration: 100, ease: 'linear', repeat: Infinity }}
              >
                <SunDisk size={180} />
              </motion.div>
              <p className="font-cormorant text-2xl italic leading-snug text-ivory-dim md:text-3xl">
                In this, he is whole. In this, he silences all disquiet. He carves away doubt. He
                rises above suffering.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4 text-gold-light">
                <span className="h-px w-12 bg-gold-ember" />
                <span className="h-px w-12 bg-gold-ember" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer indicator */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <ProgressTrack progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

function DuelPanel({
  exchange,
  index,
}: {
  exchange: (typeof exchanges)[number];
  index: number;
}) {
  const isLeft = exchange.side === 'left';
  const isZaahen = exchange.speaker === 'ZAAHEN';

  return (
    <div className="flex h-screen w-screen shrink-0 items-center px-6 md:px-24">
      <div
        className={`relative w-full max-w-4xl ${
          isLeft ? 'mr-auto text-left' : 'ml-auto text-right'
        }`}
      >
        {/* Big speaker name */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-30%' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className={`flex items-center gap-4 ${isLeft ? '' : 'justify-end'}`}
        >
          <span className="text-codex" style={{ color: isZaahen ? 'var(--gold-light)' : 'var(--blood-bright)' }}>
            {String(index + 1).padStart(2, '0')} ·{' '}
            {isZaahen ? 'The God-Warrior' : 'The Darkin'}
          </span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30%' }}
          transition={{ duration: 1.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-2 font-display text-7xl font-medium uppercase leading-[0.9] tracking-[0.04em] md:text-[10rem] ${
            isZaahen ? 'text-gold-leaf' : 'text-ivory'
          }`}
          style={
            !isZaahen
              ? {
                  WebkitTextStroke: '1px var(--blood)',
                  color: 'transparent',
                }
              : undefined
          }
        >
          {exchange.speaker}
        </motion.h3>

        {/* The line, large italic */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30%' }}
          transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-cormorant text-2xl italic leading-snug text-ivory md:text-4xl lg:text-5xl"
        >
          &ldquo;{exchange.line}&rdquo;
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-30%' }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="mt-6 text-codex text-ivory-ash"
        >
          — {exchange.note}
        </motion.p>

        {/* Side accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-30%' }}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute top-1/2 h-px w-32 md:w-56 ${
            isLeft ? '-left-40' : '-right-40'
          }`}
          style={{
            background: isZaahen
              ? 'linear-gradient(90deg, transparent, var(--gold))'
              : 'linear-gradient(90deg, var(--blood), transparent)',
            transformOrigin: isLeft ? 'right' : 'left',
          }}
        />
      </div>
    </div>
  );
}

function ProgressTrack({
  progress,
}: {
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const width = useTransform(progress, [0, 1], ['0%', '100%']);
  return (
    <div className="flex items-center gap-3">
      <span className="text-codex text-ivory-ash">duel</span>
      <div className="relative h-px w-32 bg-ivory-ash/30">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-gold via-blood to-gold"
          style={{ width }}
        />
      </div>
    </div>
  );
}
