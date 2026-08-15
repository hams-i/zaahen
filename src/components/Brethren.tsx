'use client';

import { motion } from 'framer-motion';
import { SunDisk } from './Ornaments';
import { FadeUp, LetterRise } from './Motion';

const brethren = [
  {
    name: 'Rhaast',
    epithet: 'The Cutting Wit',
    line: 'his wit and ambition sharp as his scythe',
    weapon: 'Scythe',
    fate: 'Fallen — corrupted, became the brother on the mountaintop.',
    sigil: 'scythe',
  },
  {
    name: 'Xolaani',
    epithet: 'The Gentle-Hearted',
    line: 'gentle-hearted and weary of war',
    weapon: 'Twin Daggers',
    fate: 'Fallen — the weariness was prophecy.',
    sigil: 'lotus',
  },
  {
    name: 'Varus',
    epithet: 'The Voice of Reason',
    line: 'the voice of reason who guided us back to duty',
    weapon: 'Bow of Pillars',
    fate: 'Fallen — reason gave way to ruin.',
    sigil: 'arrow',
  },
  {
    name: 'Setaka',
    epithet: 'The Lion-Hearted',
    line: 'the pride of our kind, to whom I pledged my blade',
    weapon: 'Twin Blades',
    fate: 'Honored — the one to whom the vow was sworn.',
    sigil: 'lion',
  },
];

export default function Brethren() {
  return (
    <section
      id="brethren"
      className="relative w-full overflow-hidden bg-obsidian px-6 py-32 md:px-12 md:py-48"
    >
      {/* Faint rotating sun far behind */}
      <motion.div
        className="pointer-events-none absolute -right-[20rem] top-[40rem] text-gold/[0.035]"
        animate={{ rotate: -360 }}
        transition={{ duration: 300, ease: 'linear', repeat: Infinity }}
      >
        <SunDisk size={800} />
      </motion.div>

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeUp>
          <div className="flex items-center gap-4 text-gold-light">
            <span className="h-px w-12 bg-gold/60" />
            <span className="text-codex">The Host · Folio II Reprised</span>
          </div>
        </FadeUp>

        <div className="mt-6">
          <FadeUp delay={0.05}>
            <p className="font-display text-xl uppercase tracking-[0.4em] text-gold-light md:text-3xl">
              The
            </p>
          </FadeUp>
          <h2 className="mt-1 font-display text-7xl font-medium uppercase leading-[0.88] tracking-[0.02em] md:text-[11rem] lg:text-[14rem]">
            <LetterRise text="Brethren" />
          </h2>
          <FadeUp delay={0.4}>
            <p className="mt-8 max-w-md font-cormorant text-lg leading-relaxed italic text-ivory-dim md:max-w-xl md:text-xl">
              He stood upon the Ascension steps with them. He raised his glaive and swore to fight
              beside them. Of them, only one is unfallen.
            </p>
          </FadeUp>
        </div>

        <div className="divider-gold mt-16 md:mt-24" />

        {/* Grid */}
        <div className="mt-16 grid grid-cols-1 gap-px bg-gold/15 md:mt-24 md:grid-cols-2 md:gap-px">
          {brethren.map((b, i) => (
            <BrotherCard key={b.name} brother={b} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BrotherCard({
  brother,
  index,
}: {
  brother: (typeof brethren)[number];
  index: number;
}) {
  const isFallen = brother.name !== 'Setaka';

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{
        duration: 1.2,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden bg-obsidian px-8 py-12 md:px-12 md:py-16"
    >
      {/* Hover gold wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/0 to-blood/0 transition-all duration-700 group-hover:from-gold/[0.06] group-hover:to-blood/[0.04]" />

      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
        {/* Sigil */}
        <div className="col-span-1 md:col-span-4">
          <Sigil kind={brother.sigil} fallen={isFallen} />
        </div>

        {/* Text */}
        <div className="col-span-1 md:col-span-8">
          <div className="flex items-center gap-3">
            <span className="font-display text-3xl font-light text-gold-light">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="h-px flex-1 bg-gold/30" />
            <span
              className="text-codex"
              style={{ color: isFallen ? 'var(--blood-bright)' : 'var(--gold-light)' }}
            >
              {isFallen ? 'Fallen' : 'Unfallen'}
            </span>
          </div>

          <h3 className="mt-5 font-display text-5xl font-medium uppercase leading-[0.9] tracking-[0.04em] text-ivory md:text-6xl">
            <span className="inline-block transition-colors duration-500 group-hover:text-gold-leaf">
              {brother.name}
            </span>
          </h3>

          <p className="mt-2 font-cormorant text-xl italic text-gold-light md:text-2xl">
            {brother.epithet}
          </p>

          <p className="mt-6 font-cormorant text-base leading-relaxed text-ivory-dim md:text-lg">
            &ldquo;{brother.line}&rdquo;
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-gold/15 pt-6">
            <div>
              <dt className="text-codex text-ivory-ash">Weapon</dt>
              <dd className="mt-1 font-cormorant text-lg text-ivory">{brother.weapon}</dd>
            </div>
            <div>
              <dt className="text-codex text-ivory-ash">Fate</dt>
              <dd className="mt-1 font-cormorant text-lg italic text-ivory-dim">
                {brother.fate}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </motion.article>
  );
}

function Sigil({ kind, fallen }: { kind: string; fallen: boolean }) {
  const color = fallen ? 'text-blood' : 'text-gold';
  return (
    <div className={`flex items-center justify-center ${color}`}>
      <motion.svg
        viewBox="0 0 200 200"
        width="160"
        height="160"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 140, ease: 'linear', repeat: Infinity }}
      >
        <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
        <circle cx="100" cy="100" r="56" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
        {/* Hieroglyph slot */}
        {kind === 'scythe' && (
          <g stroke="currentColor" strokeWidth="1.4" fill="none">
            <path d="M70 140 Q70 70 130 70" />
            <line x1="70" y1="140" x2="70" y2="80" />
            <circle cx="130" cy="70" r="4" fill="currentColor" />
          </g>
        )}
        {kind === 'lotus' && (
          <g stroke="currentColor" strokeWidth="1.4" fill="none">
            <path d="M100 130 Q60 90 100 60 Q140 90 100 130" />
            <path d="M100 130 Q80 100 100 80 Q120 100 100 130" />
            <line x1="100" y1="130" x2="100" y2="150" />
          </g>
        )}
        {kind === 'arrow' && (
          <g stroke="currentColor" strokeWidth="1.4" fill="none">
            <line x1="55" y1="100" x2="145" y2="100" />
            <path d="M145 100 L130 90 L130 110 Z" fill="currentColor" />
            <path d="M55 100 L72 92 M55 100 L72 108" />
          </g>
        )}
        {kind === 'lion' && (
          <g stroke="currentColor" strokeWidth="1.4" fill="none">
            <circle cx="100" cy="100" r="22" />
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i * 360) / 12;
              const x1 = 100 + Math.cos((a * Math.PI) / 180) * 26;
              const y1 = 100 + Math.sin((a * Math.PI) / 180) * 26;
              const x2 = 100 + Math.cos((a * Math.PI) / 180) * 40;
              const y2 = 100 + Math.sin((a * Math.PI) / 180) * 40;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
          </g>
        )}
      </motion.svg>
    </div>
  );
}
