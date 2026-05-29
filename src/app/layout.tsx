import type { Metadata } from "next";
import { Noto_Serif_JP, Noto_Sans_JP, Inter } from "next/font/google";
import "./globals.css";

const serifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jp-serif",
  display: "swap",
});

const sansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-jp-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-en",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ヒトイロ｜あなたの色を、一枚に。",
  description:
    "完全オーダーメイドのLP型デジタル名刺サービス。NFCカードをかざすだけで、あなた専用のランディングページが立ち上がります。",
  openGraph: {
    title: "ヒトイロ｜あなたの色を、一枚に。",
    description:
      "完全オーダーメイドのLP型デジタル名刺。出会いを、忘れないものに。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${serifJP.variable} ${sansJP.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
