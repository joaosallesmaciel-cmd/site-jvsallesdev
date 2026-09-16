"use client";

import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

// Geometria do chevron, AGENTS.md › Logo. Aponta para +y.
const CHEVRON_PATH =
  "M120.25 0 L0 69.43 L240.51 486 L314.92 486 L555.43 69.43 L435.17 0 L277.71 272.73 Z";
const VIEWBOX_W = 555.43;
const VIEWBOX_H = 486;
const CENTER_X = VIEWBOX_W / 2;
const CENTER_Y = VIEWBOX_H / 2;

// density 1 = maxParticles em 2560×1440. Telas menores recebem menos.
const TARGET_AREA = 2560 * 1440;
const MAX_DPR = 2;
const COLOR_STEPS = 32;
const TAU = Math.PI * 2;
// Espera no máximo 2s pela ociosidade antes de começar.
const IDLE_TIMEOUT = 2000;
// Abaixo desta largura a tela é de celular e leva menos partículas.
const SMALL_SCREEN = 640;
const SMALL_SCREEN_FACTOR = 0.75;

// Valores de --line e --gold, usados se os tokens não estiverem no CSS.
const FALLBACK_LINE = "#252a33";
const FALLBACK_GOLD = "#e4b860";

type ChevronFieldProps = {
  /** Teto de partículas, antes dos ajustes de tela e de CPU. */
  maxParticles?: number;
  /** Multiplicador da contagem. 1 = maxParticles em 2560×1440. */
  density?: number;
  /** Multiplicador da velocidade do campo de fluxo. */
  speed?: number;
  /** Raio de influência do cursor, em px CSS. */
  influenceRadius?: number;
  className?: string;
};

// Seno composto: ângulo em radianos para o ponto (x, y) no instante t.
function flow(x: number, y: number, t: number) {
  const u = x * 0.0018;
  const v = y * 0.0018;
  return (
    Math.sin(u * 1.7 + t * 0.21) * 1.2 +
    Math.cos(v * 2.3 - t * 0.17) * 1.0 +
    Math.sin((u + v) * 1.1 + t * 0.09) * 0.8
  );
}

// Menos partículas em máquina fraca. Sem a informação, assume o caso do meio.
function cpuFactor() {
  const cores = navigator.hardwareConcurrency;
  if (!cores) return 0.7;
  if (cores <= 2) return 0.35;
  if (cores <= 4) return 0.55;
  if (cores <= 6) return 0.8;
  return 1;
}

// Menor diferença angular, em [-π, π].
function wrap(a: number) {
  return a - TAU * Math.round(a / TAU);
}

function parseHex(value: string, fallback: string) {
  const hex = (/^#[0-9a-f]{6}$/i.test(value) ? value : fallback).slice(1);
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
}

// Rampa de COLOR_STEPS cores de --line (repouso) a --gold (pico).
function buildRamp(el: Element) {
  const style = getComputedStyle(el);
  const line = parseHex(style.getPropertyValue("--line").trim(), FALLBACK_LINE);
  const gold = parseHex(style.getPropertyValue("--gold").trim(), FALLBACK_GOLD);
  return Array.from({ length: COLOR_STEPS }, (_, step) => {
    const k = step / (COLOR_STEPS - 1);
    const [r, g, b] = line.map((c, i) => Math.round(c + (gold[i] - c) * k));
    return `rgb(${r} ${g} ${b})`;
  });
}

export function ChevronField({
  maxParticles = 3000,
  density = 1,
  speed = 1,
  influenceRadius = 180,
  className,
}: ChevronFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef(speed);
  const radiusRef = useRef(influenceRadius);

  useEffect(() => {
    speedRef.current = speed;
    radiusRef.current = influenceRadius;
  }, [speed, influenceRadius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const chevron = new Path2D(CHEVRON_PATH);
    const colors = buildRamp(canvas);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let dpr = 1;
    let scale = 1;
    let count = 0;
    let posX = new Float32Array(0);
    let posY = new Float32Array(0);
    let angle = new Float32Array(0);
    let heat = new Float32Array(0);
    let bucket = new Uint8Array(0);
    let order = new Uint32Array(0);
    const bucketStart = new Uint32Array(COLOR_STEPS + 1);
    const bucketNext = new Uint32Array(COLOR_STEPS);

    const pointer = { x: 0, y: 0, prevX: 0, prevY: 0, vx: 0, vy: 0, active: false };
    let time = 0;
    let last = 0;
    let frame = 0;
    let visible = document.visibilityState === "visible";
    let inView = false;
    // Até a página ficar ociosa, o canvas mostra só um quadro estático.
    let idle = false;

    const layout = (nextWidth: number, nextHeight: number) => {
      const nextDpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      if (nextWidth === width && nextHeight === height && nextDpr === dpr) return;
      width = nextWidth;
      height = nextHeight;
      dpr = nextDpr;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      const area = width * height;
      const screenFactor = width < SMALL_SCREEN ? SMALL_SCREEN_FACTOR : 1;
      count =
        area > 0
          ? Math.round(
              maxParticles *
                density *
                Math.min(1, area / TARGET_AREA) *
                screenFactor *
                cpuFactor(),
            )
          : 0;
      posX = new Float32Array(count);
      posY = new Float32Array(count);
      angle = new Float32Array(count);
      heat = new Float32Array(count);
      bucket = new Uint8Array(count);
      order = new Uint32Array(count);

      if (count > 0) {
        // Grade com jitter: cobre a tela sem aglomerar. Sorteia `count` células.
        const cols = Math.ceil(Math.sqrt((count * width) / height));
        const rows = Math.ceil(count / cols);
        const cellW = width / cols;
        const cellH = height / rows;
        const cells = new Uint32Array(cols * rows).map((_, i) => i);
        for (let i = 0; i < count; i++) {
          const j = i + Math.floor(Math.random() * (cells.length - i));
          const cell = cells[j];
          cells[j] = cells[i];
          posX[i] = ((cell % cols) + 0.2 + Math.random() * 0.6) * cellW;
          posY[i] = (Math.floor(cell / cols) + 0.2 + Math.random() * 0.6) * cellH;
          angle[i] = flow(posX[i], posY[i], time);
        }
        scale = (Math.min(cellW, cellH) * 0.5) / VIEWBOX_W;
      }

      draw();
      sync();
    };

    const step = (dt: number) => {
      const radius = radiusRef.current;
      const radius2 = radius * radius;

      if (pointer.active) {
        const k = 1 - Math.exp(-dt * 10);
        pointer.vx += ((pointer.x - pointer.prevX) / dt - pointer.vx) * k;
        pointer.vy += ((pointer.y - pointer.prevY) / dt - pointer.vy) * k;
        pointer.prevX = pointer.x;
        pointer.prevY = pointer.y;
      } else {
        const decay = Math.exp(-dt * 6);
        pointer.vx *= decay;
        pointer.vy *= decay;
      }

      const moveAngle = Math.atan2(pointer.vy, pointer.vx);
      const moveAmount = Math.min(1, Math.hypot(pointer.vx, pointer.vy) / 600);
      const turnK = 1 - Math.exp(-dt * 5);
      const riseK = 1 - Math.exp(-dt * 14);
      const fallK = 1 - Math.exp(-dt * 2.5);

      for (let i = 0; i < count; i++) {
        const x = posX[i];
        const y = posY[i];
        let target = flow(x, y, time);
        let near = 0;

        if (pointer.active) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          if (dx < radius && dx > -radius && dy < radius && dy > -radius) {
            const d2 = dx * dx + dy * dy;
            if (d2 < radius2) {
              const f = 1 - Math.sqrt(d2) / radius;
              near = f * f * (3 - 2 * f);
            }
          }
        }

        if (near > 0 && moveAmount > 0) {
          target += wrap(moveAngle - target) * near * moveAmount;
        }
        angle[i] += wrap(target - angle[i]) * turnK;
        const h = heat[i];
        heat[i] = h + (near - h) * (near > h ? riseK : fallK);
      }
    };

    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (count === 0) return;

      // Agrupa por cor para trocar fillStyle no máximo COLOR_STEPS vezes.
      bucketStart.fill(0);
      for (let i = 0; i < count; i++) {
        const b = Math.min(COLOR_STEPS - 1, (heat[i] * COLOR_STEPS) | 0);
        bucket[i] = b;
        bucketStart[b + 1]++;
      }
      for (let b = 0; b < COLOR_STEPS; b++) {
        bucketStart[b + 1] += bucketStart[b];
        bucketNext[b] = bucketStart[b];
      }
      for (let i = 0; i < count; i++) order[bucketNext[bucket[i]]++] = i;

      const size = scale * dpr;
      for (let b = 0; b < COLOR_STEPS; b++) {
        const start = bucketStart[b];
        const end = bucketStart[b + 1];
        if (start === end) continue;
        ctx.fillStyle = colors[b];
        for (let j = start; j < end; j++) {
          const i = order[j];
          const rotation = angle[i] - Math.PI / 2;
          const cos = Math.cos(rotation) * size;
          const sin = Math.sin(rotation) * size;
          ctx.setTransform(
            cos,
            sin,
            -sin,
            cos,
            posX[i] * dpr - (cos * CENTER_X - sin * CENTER_Y),
            posY[i] * dpr - (sin * CENTER_X + cos * CENTER_Y),
          );
          ctx.fill(chevron);
        }
      }
    };

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 1 / 20) : 1 / 60;
      last = now;
      time += dt * speedRef.current;
      step(dt);
      draw();
      frame = requestAnimationFrame(tick);
    };

    const sync = () => {
      const shouldRun = idle && visible && inView && !reducedMotion.matches && count > 0;
      if (shouldRun && !frame) {
        last = 0;
        frame = requestAnimationFrame(tick);
      } else if (!shouldRun && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    // Quadro estático: campo sem cursor, sem dourado.
    const renderStatic = () => {
      for (let i = 0; i < count; i++) {
        angle[i] = flow(posX[i], posY[i], time);
        heat[i] = 0;
      }
      draw();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (!pointer.active) {
        pointer.prevX = x;
        pointer.prevY = y;
      }
      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") pointer.active = false;
    };
    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      sync();
    };
    const onMotionChange = () => {
      sync();
      if (reducedMotion.matches) renderStatic();
    };

    const resizeObserver = new ResizeObserver(([entry]) => {
      layout(entry.contentRect.width, entry.contentRect.height);
    });
    const intersectionObserver = new IntersectionObserver((entries) => {
      inView = entries[entries.length - 1].isIntersecting;
      sync();
    });

    // Só começa depois que a página fica ociosa. Sem requestIdleCallback
    // (Safari antigo), cai no timeout.
    const onIdle = () => {
      idle = true;
      sync();
    };
    const hasIdleCallback = typeof window.requestIdleCallback === "function";
    const idleHandle = hasIdleCallback
      ? window.requestIdleCallback(onIdle, { timeout: IDLE_TIMEOUT })
      : window.setTimeout(onIdle, IDLE_TIMEOUT);

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerLeave, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (hasIdleCallback) window.cancelIdleCallback(idleHandle);
      else clearTimeout(idleHandle);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerLeave);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, [density, maxParticles]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={twMerge("pointer-events-none block h-full w-full", className)}
    />
  );
}
