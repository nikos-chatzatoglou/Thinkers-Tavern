import type React from "react";
import type { Metadata } from "next";
import { Cormorant_Garamond, Cormorant_SC, Caveat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const cormorantSC = Cormorant_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant-sc",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Philosophical Dialogues",
  description:
    "Engage in deep conversations with history's greatest philosophers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${cormorant.variable} ${cormorantSC.variable} ${caveat.variable} font-serif antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
