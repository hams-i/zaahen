import SmoothScroll from '@/components/SmoothScroll';
import Grain from '@/components/Grain';
import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import Codex from '@/components/Codex';
import Duel from '@/components/Duel';
import Visage from '@/components/Visage';
import Brethren from '@/components/Brethren';
import { Vow, Marquee, Footer } from '@/components/Closing';
import ThemeAudioProvider from '@/components/ThemeAudioProvider';

export default function Page() {
  return (
    <ThemeAudioProvider>
      <SmoothScroll />
      <Grain />
      <main className="relative">
        <Hero />
        <Manifesto />
        <Codex />
        <Duel />
        <Visage />
        <Brethren />
        <Marquee />
        <Vow />
        <Footer />
      </main>
    </ThemeAudioProvider>
  );
}
