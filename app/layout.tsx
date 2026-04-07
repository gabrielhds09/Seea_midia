import type { Metadata } from "next";
import { Jost, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import NoiseTexture from "@/components/NoiseTexture";

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://seea.com.br'),
  title: "SEEA | Gestão de Carreira e Imagem Além do Óbvio",
  description: "A SEEA cria estratégias audiovisuais que transformam rotina em posicionamento e presença em autoridade. Branding, conteúdo roteirizado e gestão estratégica.",
  keywords: ["gestão de carreira", "posicionamento digital", "branding audiovisual", "produção de conteúdo", "estratégia de imagem", "trafego pago", "reels", "roteiro"],
  authors: [{ name: "SEEA Mídia" }],
  creator: "SEEA Mídia",
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://seea.com.br',
    title: 'SEEA | Gestão de Carreira e Imagem',
    description: 'Transformamos rotina em posicionamento e presença em autoridade.',
    siteName: 'SEEA',
    images: [{
      url: '/logo-seea.png',
      width: 1200,
      height: 630,
      alt: 'SEEA Logo',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEEA | Gestão de Carreira e Imagem',
    description: 'Transformamos rotina em posicionamento e presença em autoridade.',
    images: ['/logo-seea.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;

}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${jost.variable} ${bodoni.variable}`}>
      <body className={jost.className} suppressHydrationWarning>
        <Preloader />
        <NoiseTexture />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
