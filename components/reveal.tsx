"use client";

import { useEffect } from "react";

// Revela um pouco antes de encostar na borda de baixo: o elemento já
// chega animando, em vez de aparecer depois de visível.
const ROOT_MARGIN = "0px 0px -10% 0px";

/**
 * Observa todo [data-reveal] da página com um IntersectionObserver só.
 * Não renderiza nada e não envolve ninguém: os alvos continuam sendo
 * filhos diretos das grades, então nenhum layout muda.
 *
 * O estado escondido mora no CSS, sob a classe .js-reveal que o script
 * do layout põe no <html>. Sem JavaScript a classe não existe e a
 * página inteira aparece.
 */
export function Reveal() {
  useEffect(() => {
    const alvos = document.querySelectorAll<HTMLElement>(
      "[data-reveal]:not([data-revealed])",
    );

    // Sem IntersectionObserver, revela tudo de uma vez em vez de
    // deixar o conteúdo preso em opacidade 0.
    if (typeof IntersectionObserver === "undefined") {
      alvos.forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          entrada.target.setAttribute("data-revealed", "");
          // Anima uma vez só.
          observador.unobserve(entrada.target);
        }
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 },
    );

    alvos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, []);

  return null;
}
