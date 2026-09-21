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
};

export function Service({ icon: Icon, title, cost, delivery }: ServiceProps) {
  return (
    <div className="border-t border-line pt-6">
      <Icon aria-hidden="true" size={24} strokeWidth={1.5} className="text-gold" />

      <h3 className="mt-4 font-display-medium text-[24px] leading-[31px] font-medium tracking-[-0.01em] text-sand">
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
