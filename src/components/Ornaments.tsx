'use client';

import { motion } from 'framer-motion';

/**
 * Sun-disk emblem — concentric rings with radial rays.
 * The Ascended carry the sun. This is Zaahen's mark.
 */
export function SunDisk({
  className = '',
  size = 200,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Outer rays */}
      <g stroke="currentColor" strokeWidth="0.6" opacity="0.7">
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i * 360) / 36;
          const long = i % 3 === 0;
          const r1 = long ? 88 : 92;
          const r2 = long ? 99 : 96;
          const x1 = 100 + Math.cos((a * Math.PI) / 180) * r1;
          const y1 = 100 + Math.sin((a * Math.PI) / 180) * r1;
          const x2 = 100 + Math.cos((a * Math.PI) / 180) * r2;
          const y2 = 100 + Math.sin((a * Math.PI) / 180) * r2;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      {/* Concentric rings */}
      <circle cx="100" cy="100" r="84" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <circle cx="100" cy="100" r="68" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="0.4" opacity="0.6" />
      <circle cx="100" cy="100" r="42" stroke="currentColor" strokeWidth="0.6" />
      {/* Inner mark */}
      <circle cx="100" cy="100" r="14" fill="currentColor" opacity="0.85" />
      <circle cx="100" cy="100" r="6" fill="var(--obsidian)" />
    </svg>
  );
}

/**
 * Wing emblem — silver-winged god. Single wing, mirrored.
 */
export function Wing({
  className = '',
  size = 180,
  mirror = false,
}: {
  className?: string;
  size?: number;
  mirror?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: mirror ? 'scaleX(-1)' : undefined }}
      aria-hidden
    >
      <g stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.85">
        {/* Wing arc */}
        <path d="M120 80 Q60 50 12 78" />
        <path d="M120 80 Q70 60 18 88" />
        <path d="M120 80 Q72 70 24 98" />
        {/* Feathers */}
        {Array.from({ length: 14 }).map((_, i) => {
          const t = i / 13;
          const startX = 118 - t * 100;
          const startY = 80 - t * 14;
          const endX = startX - 18 - t * 12;
          const endY = startY + 18 + t * 16;
          return (
            <path
              key={i}
              d={`M${startX} ${startY} Q${startX - 12} ${startY + 6} ${endX} ${endY}`}
              strokeWidth={0.7 - t * 0.2}
            />
          );
        })}
        {/* Spine */}
        <path d="M120 80 L20 82" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

/**
 * Glaive — Zaahen's weapon, his prison.
 * Double-bladed Egyptian polearm in profile.
 */
export function Glaive({
  className = '',
  size = 600,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size * 0.18}
      viewBox="0 0 1000 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g stroke="currentColor" strokeWidth="1.4" fill="none">
        {/* Left blade */}
        <path d="M40 90 L120 50 L180 70 L210 90 L180 110 L120 130 Z" />
        <path d="M120 50 L120 130" strokeWidth="0.6" opacity="0.6" />
        <path d="M70 70 L70 110" strokeWidth="0.5" opacity="0.5" />
        {/* Right blade (mirrored) */}
        <path d="M960 90 L880 50 L820 70 L790 90 L820 110 L880 130 Z" />
        <path d="M880 50 L880 130" strokeWidth="0.6" opacity="0.6" />
        <path d="M930 70 L930 110" strokeWidth="0.5" opacity="0.5" />
        {/* Shaft */}
        <line x1="210" y1="90" x2="790" y2="90" strokeWidth="1.6" />
        {/* Shaft wraps */}
        {Array.from({ length: 12 }).map((_, i) => {
          const x = 230 + i * 45;
          return <line key={i} x1={x} y1="84" x2={x + 6} y2="96" strokeWidth="0.5" />;
        })}
        {/* Center medallion */}
        <circle cx="500" cy="90" r="14" />
        <circle cx="500" cy="90" r="6" fill="currentColor" opacity="0.5" />
      </g>
    </svg>
  );
}

/**
 * Cartouche — Egyptian name plate, oval with the Ascended's mark.
 */
export function Cartouche({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg
        viewBox="0 0 400 120"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <rect
          x="20"
          y="10"
          width="360"
          height="100"
          rx="50"
          ry="50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line x1="10" y1="60" x2="20" y2="60" stroke="currentColor" strokeWidth="2" />
        <line x1="380" y1="60" x2="390" y2="60" stroke="currentColor" strokeWidth="2" />
      </svg>
      <div className="relative px-12 py-4">{children}</div>
    </div>
  );
}

/**
 * Frame ornament — corner brackets that look engraved.
 */
export function FrameBrackets({ className = '' }: { className?: string }) {
  return (
    <>
      <svg
        className={`pointer-events-none absolute left-0 top-0 ${className}`}
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden
      >
        <path d="M2 24 L2 2 L24 2" stroke="currentColor" strokeWidth="1" />
        <path d="M8 14 L8 8 L14 8" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
      </svg>
      <svg
        className={`pointer-events-none absolute right-0 top-0 ${className}`}
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden
      >
        <path d="M54 24 L54 2 L32 2" stroke="currentColor" strokeWidth="1" />
        <path d="M48 14 L48 8 L42 8" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
      </svg>
      <svg
        className={`pointer-events-none absolute bottom-0 left-0 ${className}`}
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden
      >
        <path d="M2 32 L2 54 L24 54" stroke="currentColor" strokeWidth="1" />
        <path d="M8 42 L8 48 L14 48" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
      </svg>
      <svg
        className={`pointer-events-none absolute bottom-0 right-0 ${className}`}
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden
      >
        <path d="M54 32 L54 54 L32 54" stroke="currentColor" strokeWidth="1" />
        <path d="M48 42 L48 48 L42 48" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
      </svg>
    </>
  );
}

/**
 * Rotating sun-disk — for hero loading state / continuous motion
 */
export function RotatingSun({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 90, ease: 'linear', repeat: Infinity }}
    >
      <SunDisk size={400} className="text-gold/40" />
    </motion.div>
  );
}
