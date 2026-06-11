import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sandrä Costa — Astrologia, Numerologia & Tarot',
  description: 'Descubra sua análise diária personalizada com Astrologia, Numerologia Cabalística e Tarot. Luz e Sombra para guiar o seu dia.',
  keywords: 'astrologia, numerologia, tarot, arcanos maiores, constelação familiar, hipnose, regressão, oracle',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-[#0d0918] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
