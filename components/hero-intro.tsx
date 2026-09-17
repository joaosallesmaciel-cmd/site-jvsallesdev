"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import {
  CHEVRON_PATH,
  ChevronField,
  VIEWBOX_H,
  VIEWBOX_W,
  type ChevronFieldHandle,
} from "@/components/chevron-field";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin, CustomEase);
// Easing padrão do AGENTS.md: cubic-bezier(0.2,0.8,0.2,1).
CustomEase.create("jvs", "M0,0 C0.2,0.8 0.2,1 1,1");

// A coreografia espera no máximo isso pelo campo começar a rodar.
const FIELD_WAIT = 2000;
// Região onde o chevron viajante é escolhido: centro-alto da tela.
const PICK_RADIUS = 260;

export function HeroIntro() {
  const fieldRef = useRef<ChevronFieldHandle>(null);
  const flyerRef = useRef<HTMLDivElement>(null);
  const flyerPathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    const flyer = flyerRef.current;
    const flyerPath = flyerPathRef.current;
    const word = document.querySelector<SVGGElement>("[data-intro-word]");
    const chevron = document.querySelector<SVGPathElement>("[data-intro-chevron]");
    const title = document.querySelector<HTMLElement>('[data-intro="h1"]');
    const support = document.querySelector<HTMLElement>('[data-intro="support"]');
    if (!flyer || !flyerPath || !word || !chevron) return;

    const mm = gsap.matchMedia();

    // Sem movimento: estado final, sem animação e sem salto.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([word, chevron], { opacity: 1 });
      gsap.set(flyer, { display: "none" });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let raf = 0;
      let timeline: gsap.core.Timeline | null = null;
      const startedAt = performance.now();

      const gold =
        getComputedStyle(document.documentElement).getPropertyValue("--gold").trim() || "#E4B860";

      // O chevron do logo dá o destino: posição e tamanho já renderizados.
      const target = () => {
        const rect = chevron.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          scale: rect.width / VIEWBOX_W,
        };
      };

      const build = (from: {
        x: number;
        y: number;
        rotation: number;
        size: number;
        index: number | null;
      }) => {
        const to = target();
        if (from.index !== null) fieldRef.current?.focus(from.index, { dimRadius: PICK_RADIUS });

        gsap.set(flyer, {
          xPercent: -50,
          yPercent: -50,
          x: from.x,
          y: from.y,
          rotation: from.rotation,
          scale: from.size / VIEWBOX_W,
          opacity: 1,
        });

        const tl = gsap.timeline({ defaults: { ease: "jvs" } });
        timeline = tl;

        // 1. Acende em --gold enquanto as vizinhas escurecem.
        tl.to(flyerPath, { fill: gold, duration: 0.3 });

        // 2. Viaja até o lugar do "v", girando para a vertical.
        tl.to(flyer, {
          x: to.x,
          y: to.y,
          rotation: "0_short",
          scale: to.scale,
          duration: 0.7,
        });

        // 3. Trava: o chevron do logo assume no mesmo quadro.
        tl.add(() => {
          gsap.set(chevron, { opacity: 1 });
          gsap.set(flyer, { opacity: 0 });
          fieldRef.current?.release();
        });

        // 4. A palavra aparece ao redor dele.
        tl.to(word, { opacity: 1, duration: 0.35 });

        // 5. h1 e linha de apoio entram só com transform: o h1 é o LCP.
        if (title) tl.from(title, { y: 16, duration: 0.4 }, "<0.05");
        if (support) tl.from(support, { y: 16, duration: 0.4 }, "<0.05");

        // Redimensionar ou rolar move o alvo: salta para o estado final.
        const finish = () => tl.progress(1);
        window.addEventListener("resize", finish, { once: true });
        window.addEventListener("scroll", finish, { once: true, passive: true });
      };

      // Espera o campo começar. Sem partícula em FIELD_WAIT, parte de um ponto sintético.
      const wait = () => {
        const picked = fieldRef.current?.pick({
          x: window.innerWidth / 2,
          y: window.innerHeight * 0.3,
          radius: PICK_RADIUS,
        });
        if (picked) {
          build({ ...picked, index: picked.index });
          return;
        }
        if (performance.now() - startedAt > FIELD_WAIT) {
          build({
            x: window.innerWidth / 2,
            y: window.innerHeight * 0.3,
            rotation: 0,
            size: 24,
            index: null,
          });
          return;
        }
        raf = requestAnimationFrame(wait);
      };
      raf = requestAnimationFrame(wait);

      return () => {
        if (raf) cancelAnimationFrame(raf);
        timeline?.kill();
        fieldRef.current?.release();
      };
    });
  }, []);

  return (
    <>
      <ChevronField ref={fieldRef} className="fixed inset-0 -z-10" />

      <div
        ref={flyerRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-10 opacity-0"
        style={{ width: VIEWBOX_W, height: VIEWBOX_H }}
      >
        <svg viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`} width={VIEWBOX_W} height={VIEWBOX_H}>
          <path
            ref={flyerPathRef}
            d={CHEVRON_PATH}
            fill="var(--color-line, var(--line, #252A33))"
          />
        </svg>
      </div>
    </>
  );
}
