import type { Metadata } from 'next';
import { Outfit, Caveat, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { TransitionFlash } from '@/components/ui/TransitionFlash';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'ScamShield — Cyber Threat Investigation & Fraud Surveillance Grid',
  description:
    'Catch it before it catches you. A cinematic 3D aperture intro and interactive investigation caseboard for tracking, analyzing, and neutralizing AI deepfakes, phishing networks, and crypto fraud.',
  keywords: ['scam awareness', 'cybersecurity', 'fraud detection', 'AI deepfake prevention', 'investigation board'],
  openGraph: {
    title: 'ScamShield — Cyber Threat Investigation Grid',
    description: 'Catch it before it catches you. Interactive 3D aperture intro and fraud evidence pinboard.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakarta.variable} ${caveat.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <body className="bg-[#05050A] text-zinc-100 min-h-screen antialiased overflow-x-hidden selection:bg-red-500 selection:text-white font-sans">
        <CustomCursor />
        <TransitionFlash />
        {children}
      </body>
    </html>
  );
}
