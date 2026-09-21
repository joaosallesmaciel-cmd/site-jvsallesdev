import { Button } from "@/components/button";
import { ChevronField } from "@/components/chevron-field";
import { HeroIntro } from "@/components/hero-intro";
import { Logo } from "@/components/Logo";
import { Service } from "@/components/service";
import { Stat } from "@/components/stat";

const servicos = [
  {
    title: "Dinheiro vazando sem ninguém ver",
    cost: "Cobrança duplicada, assinatura esquecida, fornecedor que subiu preço sem avisar, pagamento sem nota. Some no meio de centenas de lançamentos e ninguém tem tempo de conferir.",
    delivery:
      "Sistema que cruza extrato, notas e contas, e entrega um relatório com cada furo, o valor e a evidência.",
  },
  {
    title: "Decisão tomada no escuro",
    cost: "Você sabe quanto entrou, mas não sabe de onde nem por quê. O relatório chega quando o mês já acabou e a decisão já foi tomada.",
    delivery:
      "Painel que consolida as fontes que você já usa e mostra o número atualizado, sem alguém montando planilha toda segunda.",
  },
  {
    title: "Dado que some entre sistemas",
    cost: "O que está no ERP não bate com a planilha, que não bate com o que o vendedor anotou. Cada troca de sistema é uma chance de perder informação.",
    delivery:
      "Integração entre o que você já tem, com o dado entrando uma vez e aparecendo em todo lugar.",
  },
  {
    title: "Trabalho que existe só porque ninguém automatizou",
    cost: "Copiar de um sistema para outro, conferir documento linha a linha, montar o mesmo relatório todo mês. Trabalho que ocupa gente boa e não produz nada.",
    delivery:
      "Automação do processo inteiro, com a pessoa entrando só onde precisa de julgamento.",
  },
];

export default function Home() {
  return (
    <>
      <HeroIntro />

      {/* O campo cobre só o hero: preso a este bloco, não à viewport. */}
      <div className="relative">
        <ChevronField className="field-mask absolute inset-0 -z-10" />

        <div className="mx-auto flex min-h-dvh w-full max-w-[1200px] flex-col px-6 md:px-16">
          <header className="py-4 md:py-6">
            <Logo height={28} intro />
          </header>

          <main className="flex flex-1 items-center py-4 md:py-12">
            <div className="grid w-full grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
              <div className="col-span-4 md:col-span-8 lg:col-span-7">
                <h1 data-intro="h1" className="font-display text-[44px] leading-[44px] font-semibold tracking-[-0.03em] text-sand md:text-[72px] md:leading-[72px]">
                  Processo manual custa caro. Eu automatizo o seu.
                </h1>

                <p
                  data-intro="support"
                  className="mt-6 max-w-[72ch] text-[18px] leading-[29px] text-muted"
                >
                  Automatizo processos que travam sua empresa por dentro: financeiro, gestão,
                  controle e dados.
                </p>

                <div className="mt-6 flex flex-wrap gap-4 md:mt-12">
                  <Button
                    href="https://wa.me/5563992300944"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Falar sobre seu processo
                  </Button>
                  <Button variant="tertiary" href="#servicos">
                    Ver o que eu faço →
                  </Button>
                </div>
              </div>

              <div className="col-span-4 border-t border-line pt-6 md:col-span-8 lg:col-span-12">
                <p className="font-mono text-[12px] leading-[14px] font-medium tracking-[0.16em] text-muted uppercase">
                  O custo do processo manual
                </p>

                <div className="mt-6 grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
                  <div className="col-span-2 md:col-span-3 lg:col-span-4">
                    <Stat value="3,5h" label="Tarefas manuais por dia" />
                  </div>
                  <div className="col-span-2 md:col-span-3 lg:col-span-4">
                    <Stat value="39%" label="Faturas com erro" />
                  </div>
                  <div className="col-span-4 md:col-span-2 lg:col-span-4">
                    <Stat value="15-25%" label="Receita perdida com dado ruim" />
                  </div>
                </div>

                <p className="mt-6 font-mono text-[12px] leading-[14px] font-medium tracking-[0.16em] text-muted uppercase">
                  Automation Anywhere/OnePoll · IOFM · MIT Sloan Management Review
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>

      <section
        id="servicos"
        className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-6 py-24 md:px-16"
      >
        <header className="mb-12">
          <p className="font-mono text-[12px] leading-[14px] font-medium tracking-[0.16em] text-muted uppercase">
            Onde o processo trava
          </p>
          <h2 className="mt-4 max-w-[24ch] font-display text-[32px] leading-[37px] font-semibold tracking-[-0.02em] text-sand">
            Quatro lugares onde sua empresa perde dinheiro sem ver.
          </h2>
        </header>

        <div className="grid grid-cols-4 gap-x-6 gap-y-12 md:grid-cols-8 lg:grid-cols-12">
          {servicos.map((servico) => (
            <div key={servico.title} className="col-span-4 md:col-span-8 lg:col-span-6">
              <Service {...servico} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
