import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
  metadataBase: new URL("https://4wise.tech"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "4wise • AI Agents & Enterprise Software",
    description:
      "AI agents, scalable software, and enterprise AI solutions. End-to-end delivery from discovery to production.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "4wise • AI Agents & Enterprise Software",
    description:
      "AI agents, scalable software, and enterprise AI solutions. End-to-end delivery from discovery to production.",
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
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "4wise Tech OÜ",
    legalName: "4wise Tech OÜ",
    url: "https://4wise.tech",
    email: "hello@4wise.tech",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Veskiposti tn 2-1002",
      addressLocality: "Tallinn",
      addressRegion: "Harju maakond",
      postalCode: "10138",
      addressCountry: "EE",
    },
    identifier: "17445723",
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "4wise",
    url: "https://4wise.tech",
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6DTCDMF59D"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6DTCDMF59D');
          `}
        </Script>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
