"use client";

import dynamic from "next/dynamic";

// A coreografia inteira, com GSAP, CustomEase e useGSAP, vive num chunk
// separado que só é buscado depois da hidratação. Durante a primeira pintura
// a banda é do CSS e da fonte do h1, que é o LCP.
const HeroChoreography = dynamic(() => import("@/components/hero-choreography"), {
  ssr: false,
});

export function HeroIntro() {
  return <HeroChoreography />;
}
