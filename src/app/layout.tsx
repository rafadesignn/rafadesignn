import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

/*
 * O preview do WhatsApp precisa ser neutro: nada de nomes, fotos ou
 * qualquer pista da surpresa. Só "Netflix" + fundo preto.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://hojenoflix-serie.vercel.app"),
  title: "Netflix",
  description: "Tem algo novo para assistir.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: "Netflix",
    description: "Tem algo novo para assistir.",
    type: "website",
    images: [{ url: "/branding/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Netflix",
    description: "Tem algo novo para assistir.",
    images: ["/branding/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={GeistSans.variable}>
      <body className="font-sans bg-black text-white">{children}</body>
    </html>
  );
}
