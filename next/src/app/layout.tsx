import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "4wise • AI Agent & Kurumsal Yazılım",
  description:
    "4wise, AI agent’lar, ölçeklenebilir yazılımlar ve kurumsal yapay zeka çözümleri geliştirir. Bakım, destek ve sürekli geliştirme ile production odaklı teslim.",
  metadataBase: new URL("https://4wise.ai"),
  openGraph: {
    title: "4wise • AI Agent & Kurumsal Yazılım",
    description:
      "AI agent’lar, ölçeklenebilir yazılımlar ve kurumsal çözümler. Production odaklı uçtan uca teslim.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
