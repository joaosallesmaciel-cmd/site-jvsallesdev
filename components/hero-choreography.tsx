"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(useGSAP, CustomEase);
// Easing padrão do AGENTS.md: cubic-bezier(0.2,0.8,0.2,1).
CustomEase.create("jvs", "M0,0 C0.2,0.8 0.2,1 1,1");

// Espessura do traço do chevron, em unidades do viewBox do logo.
const STROKE_WIDTH = 22;

/**
 * Coreografia de entrada do hero. Não renderiza nada: anima o que já está
 * pintado. O chevron se desenha no lugar do "v", a palavra se firma e o h1
 * entra só com transform, porque é ele o LCP.
 */
export function HeroIntro() {
  useGSAP(() => {
    const word = document.querySelector<SVGGElement>("[data-intro-word]");
    const chevron = document.querySelector<SVGPathElement>("[data-intro-chevron]");
    const title = document.querySelector<HTMLElement>('[data-intro="h1"]');
    const support = document.querySelector<HTMLElement>('[data-intro="support"]');
    if (!word || !chevron) return;

    const gold =
      getComputedStyle(document.documentElement).getPropertyValue("--gold").trim() || "#E4B860";

    const mm = gsap.matchMedia();

    // Sem movimento: estado final, sem animação e sem salto.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([word, chevron], { opacity: 1 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let timeline: gsap.core.Timeline | null = null;
      let cancelled = false;

      // DrawSVG só é baixado aqui: fora desta coreografia não pesa na rota.
      import("gsap/DrawSVGPlugin").then(({ DrawSVGPlugin }) => {
        if (cancelled) return;
        gsap.registerPlugin(DrawSVGPlugin);

        gsap.set(chevron, {
          opacity: 1,
          fillOpacity: 0,
          stroke: gold,
          strokeWidth: STROKE_WIDTH,
          strokeOpacity: 1,
          drawSVG: "0%",
        });

        const tl = gsap.timeline({ defaults: { ease: "jvs" } });
        timeline = tl;

        // 1. O contorno se traça no lugar do "v".
        tl.to(chevron, { drawSVG: "100%", duration: 0.6 });

        // 2. Preenche em --gold e o traço se apaga.
        tl.to(chevron, { fillOpacity: 1, duration: 0.25 }, "-=0.05");
        tl.to(chevron, { strokeOpacity: 0, duration: 0.25 }, "<");

        // 3. A palavra se firma ao redor dele.
        tl.to(word, { opacity: 1, duration: 0.3 }, "<0.05");

        // 4. h1 e linha de apoio entram só com transform: o h1 é o LCP.
        if (title) tl.from(title, { y: 16, duration: 0.4 }, "<0.05");
        if (support) tl.from(support, { y: 16, duration: 0.4 }, "<0.05");
      });

      return () => {
        cancelled = true;
        timeline?.kill();
      };
    });
  }, []);

  return null;
}
