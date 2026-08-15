'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useThemeAudio } from './ThemeAudioProvider';

const BAR_COUNT = 28;
const DECAY_MS = 800;

function drawIdleLine(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  const dash = 3;
  const gap = 3;
  const thickness = 1.25;
  const y = (h - thickness) / 2;
  ctx.fillStyle = 'rgba(201, 169, 97, 0.72)';
  for (let x = 0; x < w; x += dash + gap) {
    ctx.fillRect(x, y, Math.min(dash, w - x), thickness);
  }
}

export default function ThemePlayer({ id }: { id?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();
  const heightsRef = useRef<number[]>(Array.from({ length: BAR_COUNT }, () => 0));
  const playingRef = useRef(false);
  const loopingRef = useRef(false);
  const startLoopRef = useRef<() => void>(() => {});
  const decayFromRef = useRef<number[]>(Array.from({ length: BAR_COUNT }, () => 0));
  const decayStartRef = useRef<number | null>(null);
  const { playing, toggle, getAnalyser } = useThemeAudio();

  playingRef.current = playing;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    const buffer = new Uint8Array(128);
    let running = true;

    const sizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawBars = (heights: number[]) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx2d.clearRect(0, 0, w, h);
      const gap = 2;
      const totalGap = (BAR_COUNT - 1) * gap;
      const barW = (w - totalGap) / BAR_COUNT;

      for (let i = 0; i < BAR_COUNT; i++) {
        const barH = Math.max(1, heights[i] * h * 0.85);
        const x = i * (barW + gap);
        const y = (h - barH) / 2;
        const grad = ctx2d.createLinearGradient(0, y, 0, y + barH);
        grad.addColorStop(0, 'rgba(230, 197, 114, 0.9)');
        grad.addColorStop(0.5, 'rgba(201, 169, 97, 1)');
        grad.addColorStop(1, 'rgba(138, 111, 46, 0.7)');
        ctx2d.fillStyle = grad;
        ctx2d.fillRect(x, y, barW, barH);
      }
    };

    const tick = () => {
      if (!running) return;
      const analyser = getAnalyser();
      const heights = heightsRef.current;

      if (analyser) {
        analyser.getByteFrequencyData(buffer);
      }

      if (playingRef.current) {
        decayStartRef.current = null;
        for (let i = 0; i < BAR_COUNT; i++) {
          const sample = analyser
            ? buffer[Math.floor((i / BAR_COUNT) * buffer.length)] / 255
            : 0;
          heights[i] += (sample - heights[i]) * 0.35;
        }
        drawBars(heights);
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (decayStartRef.current === null) {
        decayStartRef.current = performance.now();
        decayFromRef.current = heights.slice();
      }

      const t = Math.min(1, (performance.now() - decayStartRef.current) / DECAY_MS);
      const eased = t * t * (3 - 2 * t);
      for (let i = 0; i < BAR_COUNT; i++) {
        heights[i] = decayFromRef.current[i] * (1 - eased);
      }

      if (t >= 1) {
        drawIdleLine(ctx2d, canvas.clientWidth, canvas.clientHeight);
        loopingRef.current = false;
        decayStartRef.current = null;
        return;
      }

      drawBars(heights);
      rafRef.current = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (loopingRef.current) return;
      loopingRef.current = true;
      rafRef.current = requestAnimationFrame(tick);
    };
    startLoopRef.current = startLoop;

    sizeCanvas();
    if (playingRef.current) {
      startLoop();
    } else {
      drawIdleLine(ctx2d, canvas.clientWidth, canvas.clientHeight);
    }

    const onResize = () => {
      sizeCanvas();
      if (!loopingRef.current) {
        drawIdleLine(ctx2d, canvas.clientWidth, canvas.clientHeight);
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      running = false;
      loopingRef.current = false;
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [getAnalyser]);

  useEffect(() => {
    startLoopRef.current();
  }, [playing]);

  return (
    <div id={id} className="w-[11rem] sm:w-[13.5rem] md:w-[15.5rem]">
      <p className="font-cormorant text-sm italic text-ivory md:text-base">Zaahen</p>

      <div className="mt-1.5 flex items-center gap-3">
        <div className="relative h-7 min-w-0 flex-1 overflow-hidden">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>

        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
          aria-label={playing ? 'Stop' : 'Play'}
          className="group relative flex h-9 w-9 shrink-0 items-center justify-center transition-transform duration-300 hover:scale-105"
        >
          <div className="absolute inset-0 rounded-full border border-gold/60 transition-colors duration-300 group-hover:border-gold" />
          <motion.div
            className="absolute inset-0 rounded-full border border-gold/40"
            animate={playing ? { scale: [1, 1.4], opacity: [0.6, 0] } : {}}
            transition={{ duration: 2, ease: 'easeOut', repeat: Infinity }}
          />
          {playing ? (
            <svg width="11" height="13" viewBox="0 0 22 24" fill="none">
              <rect x="2" y="2" width="6" height="20" fill="currentColor" className="text-gold" />
              <rect x="14" y="2" width="6" height="20" fill="currentColor" className="text-gold" />
            </svg>
          ) : (
            <svg width="11" height="13" viewBox="0 0 22 24" fill="none">
              <path d="M2 2 L20 12 L2 22 Z" fill="currentColor" className="text-gold" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
