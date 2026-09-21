import type { LucideIcon } from "lucide-react";

type FlowStepProps = {
  /** Ordem da etapa. Em --muted: o tamanho já dá a ordem, o dourado é do ícone. */
  numero: string;
  /** Ícone da etapa. Decorativo: o título ao lado já diz o que ele mostra. */
  icon: LucideIcon;
  /** Nome da etapa. */
  titulo: string;
  /** Rótulo mono em caixa alta, no máximo 6 palavras. */
  rotulo: string;
  /** O que acontece aqui, em texto pequeno. */
  descricao: string;
  /** Tecnologias. */
  chips: string[];
};

export function FlowStep({
  numero,
  icon: Icon,
  titulo,
  rotulo,
  descricao,
  chips,
}: FlowStepProps) {
  return (
    <li className="flex flex-col gap-4 bg-surface p-6 lg:p-4 xl:p-6">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[32px] leading-[37px] font-medium text-muted">
          {numero}
        </span>
        <Icon aria-hidden="true" size={24} strokeWidth={1.5} className="text-gold" />
      </div>

      <div>
        <p className="font-display-medium text-[18px] leading-[29px] font-medium text-sand">
          {titulo}
        </p>
        <p className="mt-1 font-mono text-[12px] leading-[14px] font-medium tracking-[0.16em] text-muted uppercase">
          {rotulo}
        </p>
      </div>

      <p className="text-[15px] leading-[24px] text-muted">{descricao}</p>

      <ul className="mt-auto flex flex-wrap gap-2 border-t border-line pt-4">
        {chips.map((chip) => (
          <li
            key={chip}
            className="border border-line px-2 py-1 font-mono text-[15px] leading-[24px] text-muted"
          >
            {chip}
          </li>
        ))}
      </ul>
    </li>
  );
}
