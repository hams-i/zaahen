'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { SunDisk, Wing, Glaive } from './Ornaments';

const chapters = [
  {
    n: 'I',
    title: 'The Ascension Steps',
    epigraph: 'Wreathed in golden light, glaive in hand.',
    body: `I once stood upon the Ascension steps, a silver-winged god. A nascent Shurima stretched before me, destined for empire. Ritual drums resonated; thunderous ovation rose from an audience ten-thousand strong. Among them, a host of god-warriors, resplendent in their armor, rejoiced as I joined their ranks.`,
    glyph: 'sun',
  },
  {
    n: 'II',
    title: 'The Calling',
    epigraph: 'My duty, my honor, the calling that earned me the dais.',
    body: `I had led many to these same steps. I came to them in what would be their last days of mortality, gave the word of their worthiness to become gods, and swore guidance to deliver them unto eternity. Rhaast, his wit and ambition sharp as his scythe. Xolaani, gentle-hearted. Varus, the voice of reason. Setaka, lion-hearted — to whom I pledged my blade.`,
    glyph: 'wing',
  },
  {
    n: 'III',
    title: 'The Mountaintop',
    epigraph: 'Each strike of our blades rattled the heavens.',
    body: `Rhaast and I circle one another on a flattened mountaintop. We have fought for many days and nights, unflagging even when the mortal armies far below us rest to count their dead. Malice makes his features cruel, sharpening him almost beyond recognition. Almost.`,
    glyph: 'glaive',
  },
  {
    n: 'IV',
    title: 'The Wound',
    epigraph: 'I drag my talons through the wound, drawing blood from blood.',
    body: `Flesh tears. My chest blooms with blood, a wound deep enough to be fatal. Warmth spreads through me; my divinity surges, working desperately to heal the gash. Not enough. I fell to one knee. Blood stains my feathers. The stench of iron chokes the air. And then — I hear my name, shouted from far below.`,
    glyph: 'wound',
  },
  {
    n: 'V',
    title: 'The Prison',
    epigraph: 'This memory fades, leaving only the emptiness of my prison.',
    body: `The weapon that binds me. Beyond its confines, I sense movement — footsteps echoing through the temple halls. The tread of an ally, my old friend, ever vigilant. She often comes close, or so it seems, but never crosses the threshold. Does she think to free me? She cannot. She must not.`,
    glyph: 'sun-eclipsed',
  },
] as const;

export default function Codex() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="codex"
      ref={containerRef}
      className="relative w-full bg-obsidian"
      style={{ height: `${chapters.length * 110}vh` }}
    >
      {/* Top heading */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center md:px-12 md:py-48">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto h-px w-32 bg-gold/60"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-codex mt-8 text-gold-light"
        >
          Zaahen · V Folios
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl font-light leading-[0.95] tracking-[0.04em] text-ivory md:text-8xl"
        >
          What he <span className="font-cormorant italic font-medium text-gold-leaf">remembers</span>
        </motion.h2>
      </div>

      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full">
        <div className="relative h-full w-full overflow-hidden">
          {/* Background sun, slow rotating */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gold/[0.07]"
            animate={{ rotate: 360 }}
            transition={{ duration: 240, ease: 'linear', repeat: Infinity }}
          >
            <SunDisk size={1200} />
          </motion.div>

          {chapters.map((chapter, i) => (
            <ChapterPanel
              key={i}
              chapter={chapter}
              index={i}
              total={chapters.length}
              progress={scrollYProgress}
            />
          ))}

          {/* Chapter counter — fixed corner */}
          <ChapterCounter total={chapters.length} progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

function ChapterPanel({
  chapter,
  index,
  total,
  progress,
}: {
  chapter: (typeof chapters)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;
  const fadeIn = start + step * 0.15;
  const fadeOut = end - step * 0.15;

  const opacity = useTransform(
    progress,
    [start, fadeIn, fadeOut, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [start, end], [80, -80]);
  const yText = useTransform(progress, [start, end], [40, -40]);
  const blur = useTransform(
    progress,
    [start, fadeIn, fadeOut, end],
    ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)']
  );

  return (
    <motion.article
      className="absolute inset-0 flex items-center px-6 md:px-20"
      style={{ opacity, filter: blur }}
    >
      <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
        {/* Left — ornament */}
        <motion.div
          className="col-span-1 flex items-center justify-center md:col-span-5"
          style={{ y }}
        >
          <ChapterGlyph kind={chapter.glyph} />
        </motion.div>

        {/* Right — text */}
        <motion.div
          className="col-span-1 md:col-span-7"
          style={{ y: yText }}
        >
          <div className="mb-6 flex items-center gap-4 text-gold-light">
            <span className="font-display text-5xl font-light tracking-wider md:text-7xl">
              {chapter.n}
            </span>
            <div className="flex flex-col">
              <span className="text-codex text-ivory-ash">Folio · {chapter.n}</span>
              <span className="h-px w-16 bg-gold/40" />
            </div>
          </div>

          <h3 className="font-display text-4xl font-medium uppercase tracking-[0.08em] text-ivory md:text-6xl">
            {chapter.title}
          </h3>

          <p className="mt-6 max-w-2xl font-cormorant text-xl italic leading-snug text-gold-light md:text-3xl">
            &ldquo;{chapter.epigraph}&rdquo;
          </p>

          <p className="mt-8 max-w-2xl font-cormorant text-base leading-relaxed text-ivory-dim md:text-xl">
            {chapter.body}
          </p>
        </motion.div>
      </div>
    </motion.article>
  );
}

function ChapterGlyph({ kind }: { kind: string }) {
  switch (kind) {
    case 'sun':
      return (
        <div className="relative">
          <motion.div
            className="text-gold/70"
            animate={{ rotate: 360 }}
            transition={{ duration: 120, ease: 'linear', repeat: Infinity }}
          >
            <SunDisk size={420} />
          </motion.div>
        </div>
      );
    case 'wing':
      return (
        <div className="relative flex w-full justify-center">
          <motion.div
            className="text-ivory/80"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ margin: '-20%' }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Wing size={320} />
          </motion.div>
          <motion.div
            className="text-ivory/80"
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ margin: '-20%' }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Wing size={320} mirror />
          </motion.div>
        </div>
      );
    case 'glaive':
      return (
        <motion.div
          className="text-gold"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ margin: '-20%' }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'center' }}
        >
          <Glaive size={520} />
        </motion.div>
      );
    case 'wound':
      return (
        <div className="relative h-[420px] w-[420px]">
          <motion.div
            className="absolute inset-0 text-blood"
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 3.8, ease: 'easeInOut', repeat: Infinity }}
          >
            <SunDisk size={420} />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 200 200" width="200" height="200" className="text-blood-bright">
              <path
                d="M100 30 Q105 80 100 100 Q95 120 100 170"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M90 50 Q110 100 88 150"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                opacity="0.5"
              />
            </svg>
          </div>
        </div>
      );
    case 'sun-eclipsed':
      return (
        <div className="relative">
          <motion.div
            className="text-gold/40"
            animate={{ rotate: -360 }}
            transition={{ duration: 180, ease: 'linear', repeat: Infinity }}
          >
            <SunDisk size={420} />
          </motion.div>
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: '-20%' }}
            transition={{ duration: 1.6 }}
          >
            <div className="h-32 w-32 rounded-full bg-obsidian shadow-[0_0_60px_30px_rgba(8,7,10,1)]" />
          </motion.div>
        </div>
      );
    default:
      return null;
  }
}

function ChapterCounter({
  total,
  progress,
}: {
  total: number;
  progress: MotionValue<number>;
}) {
  return (
    <div className="absolute bottom-10 right-6 z-20 flex items-center gap-4 md:bottom-12 md:right-12">
      <div className="text-codex flex flex-col items-end text-ivory-ash">
        <span className="text-gold-light">Folio</span>
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <Tick key={i} index={i} total={total} progress={progress} />
        ))}
      </div>
    </div>
  );
}

function Tick({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;
  const scale = useTransform(progress, [start, end], [0.4, 1.2]);
  const opacity = useTransform(progress, [start, end], [0.3, 1]);

  return (
    <motion.span
      className="block h-px w-10 bg-gold"
      style={{ scaleX: scale, opacity, transformOrigin: 'right' }}
    />
  );
}
