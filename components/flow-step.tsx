type FlowStepProps = {
  /** Ordem da etapa. É o único dourado grande do cartão. */
  numero: string;
  /** Nome da etapa. */
  titulo: string;
  /** Rótulo mono em caixa alta, no máximo 6 palavras. */
  rotulo: string;
  /** O que acontece aqui, em texto pequeno. */
  descricao: string;
  /** Tecnologias, em mono minúsculo. */
  chips: string[];
  /** A última etapa não aponta para lugar nenhum. */
  ultima?: boolean;
};

export function FlowStep({
  numero,
  titulo,
  rotulo,
  descricao,
  chips,
  ultima,
}: FlowStepProps) {
  return (
    <li className="flex flex-col gap-4 bg-surface p-6 lg:p-4 xl:p-6">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-[32px] leading-[37px] font-medium text-gold">
          {numero}
        </span>
        {!ultima && (
          <span aria-hidden="true" className="text-[18px] leading-[29px] text-gold">
            →
          </span>
        )}
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
