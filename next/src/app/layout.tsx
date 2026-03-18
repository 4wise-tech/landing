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
  title: "4wise • AI Agents & Enterprise Software",
  description:
    "4wise builds AI agents, scalable software, and enterprise AI solutions. From discovery to production, end-to-end delivery with run & support.",
  metadataBase: new URL("https://4wise.ai"),
  openGraph: {
    title: "4wise • AI Agents & Enterprise Software",
    description:
      "AI agents, scalable software, and enterprise AI solutions. End-to-end delivery from discovery to production.",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
