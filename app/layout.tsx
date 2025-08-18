import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neö",
  description: "Tienda de productos de cinta neón y LED",
  openGraph: {
    title: "Neö",
    description: "Tienda de productos de cinta neón y LED",
    url: "https://neobo.vercel.app",
    siteName: "Neö",
    images: [
      {
        url: "https://neobo.vercel.app/og-square.png",
        width: 1200,
        height: 630,
        alt: "Neö - Tienda de productos de cinta neón y LED",
      },
    ],
    locale: "es_BO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neö",
    description: "Tienda de productos de cinta neón y LED",
    images: ["https://neobo.vercel.app/og-image.png"],
    site: "@neonshop",
    creator: "@neonshop",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
