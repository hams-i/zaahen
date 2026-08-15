import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://zaahen.istanbul.black',
  ),
  title: 'Zaahen — The Unsundered',
  description:
    'A silver-winged god turned Darkin. Bound to the glaive. Sworn to silence the fallen. The tale of Zaahen, The Unsundered.',
  keywords: [
    'Zaahen',
    'The Unsundered',
    'Darkin',
    'League of Legends',
    'Shurima',
    'God-warrior',
  ],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    title: 'Zaahen — The Unsundered',
    description:
      'A silver-winged god turned Darkin. Bound to the glaive. Sworn to silence the fallen.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-obsidian text-ivory antialiased">{children}</body>
    </html>
  );
}
