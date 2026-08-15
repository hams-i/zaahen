'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { publicAsset } from '@/lib/publicAsset';

/**
 * Visage — a full-bleed look at Zaahen.
 * Scroll moves the camera (scale + y), text peels in/out.
 */
export default function Visage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.0, 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const labelsOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.7, 0.9], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={ref}
      className="relative h-[180vh] w-full overflow-hidden bg-obsidian"
      aria-label="The Visage of Zaahen"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Splash with scroll-driven camera */}
        <motion.div
          className="absolute inset-0"
          style={{ scale, y }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("${publicAsset('/Zaahen-Wallpaper.jpg')}")`,
              backgroundPosition: 'center center',
            }}
          />
          {/* Cinematic black bars */}
          <div className="absolute inset-x-0 top-0 h-[10vh] bg-gradient-to-b from-obsidian to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[15vh] bg-gradient-to-t from-obsidian to-transparent" />
          {/* Gold tint */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blood/10 via-transparent to-gold/10 mix-blend-overlay" />
        </motion.div>

        {/* Top label */}
        <motion.div
          className="absolute left-0 right-0 top-10 z-10 flex items-center justify-between px-6 md:top-16 md:px-16"
          style={{ opacity: labelsOpacity }}
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-gold/60" />
            <span className="text-codex text-gold-light">Visage · Profile MMXXVI</span>
          </div>
          <span className="text-codex text-ivory-ash">Recorded by the Vigilant</span>
        </motion.div>

        {/* Centered side title */}
        <motion.div
          className="absolute inset-0 z-10 flex items-end px-6 pb-16 md:px-16 md:pb-24"
          style={{ y: titleY }}
        >
          <div className="flex w-full items-end justify-between gap-8">
            <div className="max-w-md">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4 }}
              >
                <p className="text-codex mb-3 text-gold-light">The Form</p>
                <h2 className="font-display text-5xl font-medium uppercase leading-[0.9] tracking-[0.04em] text-ivory md:text-7xl">
                  Silver{' '}
                  <span className="font-cormorant italic text-gold-leaf">winged.</span>
                  <br />
                  Sun{' '}
                  <span className="font-cormorant italic text-gold-leaf">crowned.</span>
                  <br />
                  Bound in{' '}
                  <span className="font-cormorant italic text-blood-bright">blood.</span>
                </h2>
              </motion.div>
            </div>

            {/* Right callouts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.3 }}
              className="hidden max-w-xs space-y-6 md:block"
            >
              <Callout n="01" label="Crown of Ascension" body="A circlet of forged sun-gold. The mark of his first vow." />
              <Callout n="02" label="The Glaive" body="His weapon. His prison. Forged when the Darkin were sealed." />
              <Callout n="03" label="Cloak of Embers" body="Dyed in the iron of every brother and sister he could not save." />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function Callout({ n, label, body }: { n: string; label: string; body: string }) {
  return (
    <div className="border-l border-gold/40 pl-5">
      <div className="text-codex flex items-center gap-2 text-gold-light">
        <span className="font-display text-2xl font-light">{n}</span>
        <span className="h-px w-6 bg-gold/40" />
        <span>{label}</span>
      </div>
      <p className="mt-2 font-cormorant text-base leading-snug italic text-ivory-dim">
        {body}
      </p>
    </div>
  );
}
