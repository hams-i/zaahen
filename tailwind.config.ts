import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: 'var(--obsidian)',
        void: 'var(--void)',
        ink: 'var(--ink)',
        gold: {
          DEFAULT: 'var(--gold)',
          light: 'var(--gold-light)',
          dust: 'var(--gold-dust)',
          ember: 'var(--gold-ember)',
        },
        blood: {
          DEFAULT: 'var(--blood)',
          deep: 'var(--blood-deep)',
          bright: 'var(--blood-bright)',
        },
        ivory: {
          DEFAULT: 'var(--ivory)',
          dim: 'var(--ivory-dim)',
          ash: 'var(--ivory-ash)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      letterSpacing: {
        ceremonial: '0.32em',
        codex: '0.18em',
      },
    },
  },
  plugins: [],
};

export default config;
