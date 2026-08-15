'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import clsx from 'clsx';

/**
 * Letter-by-letter rise. Triggers on viewport entry.
 * Used for ceremonial titles.
 */
export function LetterRise({
  text,
  className = '',
  delay = 0,
  stagger = 0.05,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: '-10% 0px' });

  return (
    <span ref={ref} className={clsx('inline-block overflow-hidden align-baseline', className)}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '110%', opacity: 0 }}
          animate={inView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
          transition={{
            duration: 1.1,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * Word-by-word fade-up. Used for body text and statements.
 */
export function WordRise({
  text,
  className = '',
  delay = 0,
  stagger = 0.06,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: '-15% 0px' });

  return (
    <span ref={ref} className={clsx('inline', className)}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < text.split(' ').length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * Fade-up with simple opacity. Used for paragraphs.
 */
export function FadeUp({
  children,
  className = '',
  delay = 0,
  y = 24,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
