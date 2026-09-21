import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "tertiary";
  /** Com href vira link. Sem href, continua button. */
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
};

const base =
  "group inline-flex items-center justify-center rounded-[2px] px-6 py-4 text-[15px] leading-[24px] font-medium " +
  // translate, não transform: o Tailwind v4 escreve na propriedade
  // translate, e transform sozinho não transiciona o deslocamento.
  "transition-[color,background-color,translate] duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] " +
  // Movimento reduzido mantém a cor e descarta o deslocamento.
  "motion-reduce:transition-[color,background-color]";

const variants = {
  // Sobe 1px no hover e assenta de volta no clique.
  primary:
    "bg-gold text-ink hover:bg-sand hover:-translate-y-px active:translate-y-0 " +
    "motion-reduce:hover:translate-y-0",
  tertiary: "text-muted hover:text-sand",
};

export function Button({
  children,
  variant = "primary",
  href,
  target,
  rel,
  className,
}: ButtonProps) {
  const classes = twMerge(base, variants[variant], className);
  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
}
