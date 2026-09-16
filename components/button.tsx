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
  "inline-flex items-center justify-center rounded-[2px] px-6 py-4 text-[15px] leading-[24px] font-medium " +
  "transition-colors duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

const variants = {
  primary: "bg-gold text-ink hover:bg-sand",
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
