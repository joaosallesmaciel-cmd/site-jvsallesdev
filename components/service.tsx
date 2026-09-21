import type { LucideIcon } from "lucide-react";

type ServiceProps = {
  /** Ícone do bloco. Decorativo: o título já diz o que ele mostra. */
  icon: LucideIcon;
  /** A dor do cliente, não o nome da tecnologia. */
  title: string;
  /** O que esse problema custa hoje. */
  cost: string;
  /** O que eu entrego. Vem destacada, com a seta em --gold. */
  delivery: string;
  /** Atraso do escalonamento na revelação, em ms. */
  atraso?: number;
};

// O cartão não é clicável: o hover é só leitura, sem cursor e sem link.
const transicao =
  "transition-colors duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] " +
  "motion-reduce:transition-none";

export function Service({
  icon: Icon,
  title,
  cost,
  delivery,
  atraso = 0,
}: ServiceProps) {
  return (
    <div
      data-reveal
      style={{ transitionDelay: `${atraso}ms` }}
      className={`group bg-surface p-6 hover:bg-surface-2 focus-within:bg-surface-2 lg:p-12 ${transicao}`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center border border-line group-hover:border-gold group-focus-within:border-gold ${transicao}`}
      >
        <Icon aria-hidden="true" size={24} strokeWidth={1.5} className="text-gold" />
      </div>

      <h3 className="mt-6 font-display-medium text-[24px] leading-[31px] font-medium tracking-[-0.01em] text-sand">
        {title}
      </h3>

      <p className="mt-4 max-w-[72ch] text-[18px] leading-[29px] text-muted">{cost}</p>

      <p className="mt-6 flex max-w-[72ch] gap-2 text-[18px] leading-[29px] text-sand">
        <span aria-hidden="true" className="text-gold">
          →
        </span>
        {delivery}
      </p>
    </div>
  );
}
