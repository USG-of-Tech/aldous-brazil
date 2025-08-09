import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Bebas_Neue, Roboto } from 'next/font/google';
import "./globals.css";
import { getSupabaseUser } from "./utils/supabaseHelpers";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
});

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-roboto',
});


export const metadata: Metadata = {
  title: "Aldous - BMUN",
  description: "Registration for Berkeley Model United Nations Conference",
};

export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="aldous" className="bg-base-300">
      <body
        className={`${bebasNeue.variable} ${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
