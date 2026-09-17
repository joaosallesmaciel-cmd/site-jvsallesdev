import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

// O h1 é o LCP e usa só o peso 600. É a única fonte pré-carregada:
// preload em todas faria as três competirem pela mesma banda.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  preload: true,
  variable: "--font-space-grotesk",
});

// 400 no corpo, 500 nos botões. O 600 não é usado em lugar nenhum.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
  preload: false,
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "jvsalles",
  description:
    "Automatizo processos que travam sua empresa por dentro: financeiro, gestão, controle e dados. Desenvolvimento sob medida em Palmas-TO.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
