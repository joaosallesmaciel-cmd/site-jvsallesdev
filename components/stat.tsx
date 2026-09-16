type StatProps = {
  /** Número ou dado. Fica em mono, grande. */
  value: string;
  /** Rótulo em caixa alta, no máximo 4 palavras. */
  label: string;
};

export function Stat({ value, label }: StatProps) {
  return (
    <div>
      <p className="font-mono text-[32px] leading-[37px] font-medium tracking-[-0.02em] text-sand">
        {value}
      </p>
      <p className="mt-2 font-mono text-[12px] leading-[14px] font-medium tracking-[0.16em] text-muted uppercase">
        {label}
      </p>
    </div>
  );
}
