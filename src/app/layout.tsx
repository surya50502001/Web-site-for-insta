import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Cormorant_Garamond, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Postfolio — Your Instagram is Already Your Portfolio",
  description:
    "Turn your photography Instagram account into a professional, self-updating portfolio website. Zero maintenance, editorial typography, instant auto-sync.",
  keywords: [
    "photographer portfolio",
    "instagram portfolio generator",
    "wedding photography website",
    "portrait photographer portfolio",
    "auto updating website",
    "zero maintenance portfolio",
  ],
  authors: [{ name: "Postfolio Studio" }],
  openGraph: {
    title: "Postfolio — The Zero-Maintenance Photographer Portfolio",
    description:
      "Keep posting on Instagram. Your professional portfolio updates itself.",
    url: "https://postfolio.site",
    siteName: "Postfolio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1600&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Postfolio — Instagram to Editorial Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Postfolio — Keep posting on Instagram. Your portfolio updates itself.",
    description:
      "Turn your photography Instagram into a high-end editorial website with automatic synchronization.",
    images: ["https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1600&auto=format&fit=crop"],
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
      className={`${plusJakarta.variable} ${playfair.variable} ${cormorant.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="font-sans bg-[#FBF9F5] text-[#141413] antialiased selection:bg-[#E87A5D]/20 selection:text-[#141413]">
        {children}
      </body>
    </html>
  );
}
