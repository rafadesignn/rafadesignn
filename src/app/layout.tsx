import type { Metadata, Viewport } from "next";
import { Syne, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Rafael Cavalcante — UX/UI & Product Designer",
  description:
    "Digital product designer crafting bold, human interfaces people remember. UX research, UI design, design systems, prototyping and AI-assisted design.",
  keywords: [
    "UX Designer",
    "UI Designer",
    "Product Designer",
    "Design Systems",
    "Portfolio",
    "Rafael Cavalcante",
  ],
  authors: [{ name: "Rafael Cavalcante" }],
  openGraph: {
    title: "Rafael Cavalcante — UX/UI & Product Designer",
    description:
      "Digital product designer crafting bold, human interfaces people remember.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#131318",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${manrope.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="noise min-h-full overflow-x-clip">{children}</body>
    </html>
  );
}
