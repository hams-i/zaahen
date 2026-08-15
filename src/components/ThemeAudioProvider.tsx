'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { publicAsset } from '@/lib/publicAsset';

type ThemeAudioContextValue = {
  playing: boolean;
  toggle: () => void;
  getAnalyser: () => AnalyserNode | null;
};

const ThemeAudioContext = createContext<ThemeAudioContextValue | null>(null);

const FADE_OUT_SEC = 0.8;
const FADE_IN_SEC = 0.55;

export function useThemeAudio() {
  const value = useContext(ThemeAudioContext);
  if (!value) {
    throw new Error('useThemeAudio must be used within ThemeAudioProvider');
  }
  return value;
}

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export default function ThemeAudioProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const fadeGenRef = useRef(0);
  const [playing, setPlaying] = useState(false);

  const getAnalyser = useCallback(() => analyserRef.current, []);

  const ensureGraph = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audioCtxRef.current) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new Ctx();
      const src = ctx.createMediaElementSource(audio);
      const gain = ctx.createGain();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      gain.gain.value = 0;
      src.connect(gain);
      gain.connect(analyser);
      analyser.connect(ctx.destination);
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = src;
      gainRef.current = gain;
    }

    if (audioCtxRef.current.state === 'suspended') {
      await audioCtxRef.current.resume();
    }
  }, []);

  const fadeGain = useCallback((value: number, seconds: number) => {
    const ctx = audioCtxRef.current;
    const gain = gainRef.current;
    if (!ctx || !gain) return;
    const now = ctx.currentTime;
    const current = gain.gain.value;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(current, now);
    gain.gain.linearRampToValueAtTime(value, now + seconds);
  }, []);

  const silence = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.muted = true;
      audio.volume = 0;
    }
    if (gainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      gainRef.current.gain.cancelScheduledValues(now);
      gainRef.current.gain.setValueAtTime(0, now);
    }
  }, []);

  const start = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    const gen = ++fadeGenRef.current;
    try {
      audio.muted = false;
      audio.volume = 1;
      await ensureGraph();
      if (gainRef.current && audioCtxRef.current) {
        const now = audioCtxRef.current.currentTime;
        gainRef.current.gain.cancelScheduledValues(now);
        gainRef.current.gain.setValueAtTime(0, now);
      }
      await audio.play();
      if (gen !== fadeGenRef.current) return false;
      setPlaying(true);
      fadeGain(1, FADE_IN_SEC);
      return true;
    } catch (e) {
      console.warn('play failed', e);
      return false;
    }
  }, [ensureGraph, fadeGain]);

  const stop = useCallback(async () => {
    const gen = ++fadeGenRef.current;
    setPlaying(false);
    fadeGain(0, FADE_OUT_SEC);
    await wait(FADE_OUT_SEC * 1000);
    if (gen !== fadeGenRef.current) return;
    silence();
  }, [fadeGain, silence]);

  const toggle = useCallback(() => {
    if (playing) {
      void stop();
      return;
    }
    void start();
  }, [playing, start, stop]);

  useEffect(() => {
    let unlocked = false;

    const tryStart = () => {
      if (unlocked) return;
      void start().then((ok) => {
        if (ok) {
          unlocked = true;
          release();
        }
      });
    };

    const release = () => {
      window.removeEventListener('pointerdown', tryStart);
      window.removeEventListener('keydown', tryStart);
      window.removeEventListener('touchstart', tryStart);
    };

    window.addEventListener('pointerdown', tryStart);
    window.addEventListener('keydown', tryStart);
    window.addEventListener('touchstart', tryStart, { passive: true });

    return () => {
      release();
    };
  }, [start]);

  useEffect(() => {
    return () => {
      fadeGenRef.current += 1;
      silence();
      sourceRef.current?.disconnect();
      gainRef.current?.disconnect();
      analyserRef.current?.disconnect();
      void audioCtxRef.current?.close();
    };
  }, [silence]);

  const value = useMemo<ThemeAudioContextValue>(
    () => ({
      playing,
      toggle,
      getAnalyser,
    }),
    [playing, toggle, getAnalyser],
  );

  return (
    <ThemeAudioContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        src={publicAsset('/Zaahen-Theme-Song.mp3')}
        preload="auto"
        loop
        playsInline
        crossOrigin="anonymous"
        className="hidden"
      />
    </ThemeAudioContext.Provider>
  );
}
