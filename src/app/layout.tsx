import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

const notoSerifJP = Noto_Serif_JP({
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
});

export const metadata: Metadata = {
  title: "Zen Nihongo - Listening Practice",
  description: "Japanese Listening Practice App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${notoSansJP.variable} ${notoSerifJP.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
