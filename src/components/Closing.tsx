'use client';

import { motion } from 'framer-motion';
import { SunDisk, Cartouche, Wing } from './Ornaments';
import { FadeUp, LetterRise } from './Motion';
import ThemePlayer from './ThemePlayer';

/**
 * The Vow — the closing manifesto, centered, ceremonial.
 */
export function Vow() {
  return (
    // Tall section + sticky inner: content stays on-screen for the full cascade,
    // so the user never scrolls past it mid-animation. overflow-hidden moved to the
    // sticky inner — putting it on the section would establish a new flow root and
    // break sticky in some browsers.
    <section className="relative w-full bg-obsidian">
      <div className="sticky top-0 flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-16 md:px-12 md:py-20">
        {/* Centered rotating sun behind */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gold/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 200, ease: 'linear', repeat: Infinity }}
        >
          <SunDisk size={900} />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <FadeUp>
            <div className="flex items-center justify-center gap-4 text-gold-light">
              <span className="h-px w-12 bg-gold/60" />
              <span className="text-codex">The Final Word</span>
              <span className="h-px w-12 bg-gold/60" />
            </div>
          </FadeUp>

          <h2 className="mt-10 font-display text-4xl font-medium uppercase leading-[0.95] tracking-[0.04em] text-ivory md:text-7xl">
            <LetterRise text="If the Darkin" stagger={0.035} />
            <br />
            <LetterRise text="cannot be saved," delay={0.25} stagger={0.035} />
            <br />
            <span className="text-gold-leaf">
              <LetterRise text="then we must be" delay={0.5} stagger={0.035} />
            </span>
            <br />
            <em className="font-cormorant italic font-medium">
              <LetterRise text="silenced." delay={0.75} stagger={0.035} />
            </em>
          </h2>

          <FadeUp delay={0.6} className="mt-12">
            <p className="mx-auto max-w-2xl font-cormorant text-lg italic leading-relaxed text-ivory-dim md:text-2xl">
              &ldquo;If I am called again, I will save this world — or finish what we began.&rdquo;
            </p>
          </FadeUp>

          <FadeUp delay={0.8} className="mt-10">
            <div className="text-gold inline-block">
              <Cartouche>
                <span className="font-display tracking-[0.4em] text-xl">ZAAHEN</span>
              </Cartouche>
            </div>
          </FadeUp>
        </div>
      </div>
      {/* Scroll runway — gives the sticky content enough pinned dwell so the
          cascade lands fully before the user moves on. */}
      <div aria-hidden className="h-[120vh] w-full" />
    </section>
  );
}

/**
 * Marquee — the name and epithets, drifting endlessly across a thin band.
 */
export function Marquee() {
  const phrase = 'ZAAHEN · THE UNSUNDERED · OF THE FIRST HOST · SILVER-WINGED · SUN-CROWNED ·';
  return (
    <div className="relative w-full overflow-hidden border-y border-gold/25 bg-obsidian py-8">
      <div className="flex whitespace-nowrap animate-marquee">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="mx-12 font-display text-4xl font-light uppercase tracking-[0.32em] text-gold md:text-6xl"
          >
            {phrase}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Footer — temple-foot, contact, credits.
 */
export function Footer() {
  return (
    <footer className="relative w-full bg-obsidian px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          {/* Sigil column */}
          <div className="col-span-1 md:col-span-4">
            <motion.div
              className="text-gold"
              animate={{ rotate: 360 }}
              transition={{ duration: 180, ease: 'linear', repeat: Infinity }}
            >
              <SunDisk size={140} />
            </motion.div>
            <p className="mt-8 font-display text-3xl font-medium uppercase tracking-[0.18em] text-ivory">
              Zaahen
            </p>
            <p className="text-codex mt-2 text-gold-light">The Unsundered</p>
            <p className="mt-6 max-w-xs font-cormorant italic text-ivory-dim">
              Bound in the blade. Vigil unending. Awaiting the call.
            </p>
          </div>

          {/* Columns */}
          <div className="col-span-1 grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-3">
            <FooterCol
              label="The Binding"
              items={[
                ['I — The Steps', '#codex'],
                ['II — The Calling', '#codex'],
                ['III — The Mountaintop', '#codex'],
                ['IV — The Wound', '#codex'],
                ['V — The Glaive', '#codex'],
              ]}
            />
            <FooterCol
              label="The Path"
              items={[
                ['The Vow', '#manifesto'],
                ['Rhaast', '#duel'],
                ['The Host', '#brethren'],
                ['GitHub', 'https://github.com/hams-i/zaahen'],
              ]}
            />
            <FooterCol
              label="Of Shurima"
              items={[
                ['The Sun Disc', '#'],
                ['The Ascended', '#'],
                ['The Darkin', '#'],
                ['Setaka', '#'],
              ]}
            />
          </div>
        </div>

        {/* Wing flourish */}
        <div className="mt-20 flex items-center justify-center gap-6 text-gold/40">
          <Wing size={140} />
          <SunDisk size={28} className="text-gold" />
          <Wing size={140} mirror />
        </div>

        <div className="divider-gold mt-12" />

        <div className="mt-8 flex items-end justify-between gap-6">
          <div className="flex items-center gap-4 text-codex text-ivory-ash">
            <span>Fan making</span>
            <a
              href="https://github.com/hams-i/zaahen"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-ivory-ash transition-colors hover:text-gold"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
              </svg>
            </a>
          </div>
          <ThemePlayer />
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ label, items }: { label: string; items: [string, string][] }) {
  return (
    <div>
      <p className="text-codex text-gold-light">{label}</p>
      <ul className="mt-4 space-y-2 font-cormorant text-ivory">
        {items.map(([txt, href]) => (
          <li key={txt}>
            <a
              href={href}
              className="hover-grow-line inline-block text-base hover:text-gold"
              {...(href.startsWith('http')
                ? { target: '_blank', rel: 'noreferrer' }
                : {})}
            >
              {txt}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
