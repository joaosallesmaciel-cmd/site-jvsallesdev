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

// O h3 usa display 500. Instância separada, sem preload: ela é usada
// abaixo da dobra e não pode competir com a fonte do h1.
const spaceGroteskMedium = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
  preload: false,
  variable: "--font-space-grotesk-medium",
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
      className={`${spaceGrotesk.variable} ${spaceGroteskMedium.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Roda antes da primeira pintura. É esta classe, e só ela, que
            autoriza o CSS a esconder o conteúdo revelável. Sem
            JavaScript ela nunca aparece e a página inteira é visível. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js-reveal")`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
