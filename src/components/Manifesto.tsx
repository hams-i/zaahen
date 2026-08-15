'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { WordRise } from './Motion';

/**
 * Manifesto — Zaahen speaks. A single statement, scroll-linked
 * word opacity reveal. Big serif italic over near-black.
 */
export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Scroll-linked background color shift — black to bloodied black
  const bg = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['rgb(8,7,10)', 'rgb(20,8,10)', 'rgb(8,7,10)']
  );

  // Full statement split into words for per-word scroll-linked opacity
  const statement =
    'I REMEMBER EVERY VOW. EVERY FACE. EVERY FAILURE. IF I AM CALLED AGAIN, I WILL SAVE THIS WORLD — OR FINISH WHAT WE BEGAN.';
  const words = statement.split(' ');

  return (
    <motion.section
      id="manifesto"
      ref={ref}
      style={{ background: bg }}
      className="relative min-h-[170vh] w-full"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center px-6 md:px-16">
        <div className="relative w-full max-w-6xl">
          {/* Top mark */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-10 flex items-center justify-center gap-6 text-gold md:mb-16"
          >
            <span className="h-px w-20 bg-gold-ember md:w-32" />
            <span className="text-codex text-gold-light">The Vow</span>
            <span className="h-px w-20 bg-gold-ember md:w-32" />
          </motion.div>

          {/* The statement — words illuminate as scroll progresses */}
          <h2 className="text-center font-display text-3xl font-medium uppercase leading-[1.15] tracking-[0.06em] md:text-6xl lg:text-7xl">
            {words.map((word, i) => {
              const start = 0.08 + (i / words.length) * 0.55;
              const end = start + 0.12;
              return <ScrollWord key={i} word={word} start={start} end={end} progress={scrollYProgress} />;
            })}
          </h2>

          {/* Attribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 flex items-center justify-center gap-4 text-ivory-ash md:mt-20"
          >
            <span className="h-px w-12 bg-ivory-ash/40" />
            <span className="font-cormorant italic">— Zaahen, in the prison-glaive</span>
            <span className="h-px w-12 bg-ivory-ash/40" />
          </motion.div>
        </div>

        {/* Side codex labels — vertical */}
        <div className="absolute bottom-12 left-6 hidden flex-col gap-4 md:flex">
          <span
            className="text-codex text-ivory-ash"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Chapter · 00
          </span>
        </div>
        <div className="absolute bottom-12 right-6 hidden flex-col gap-4 md:flex">
          <span
            className="text-codex text-ivory-ash"
            style={{ writingMode: 'vertical-rl' }}
          >
            The Unsundered
          </span>
        </div>
      </div>
    </motion.section>
  );
}

function ScrollWord({
  word,
  start,
  end,
  progress,
}: {
  word: string;
  start: number;
  end: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const blur = useTransform(progress, [start, end], ['blur(6px)', 'blur(0px)']);

  // Highlight key words in gold
  const goldWords = ['VOW.', 'FACE.', 'FAILURE.', 'WORLD', 'BEGAN.'];
  const isGold = goldWords.includes(word);

  return (
    <motion.span
      style={{ opacity, filter: blur }}
      className={`mx-[0.18em] inline-block ${
        isGold ? 'text-gold-leaf' : 'text-ivory'
      }`}
    >
      {word}
    </motion.span>
  );
}
