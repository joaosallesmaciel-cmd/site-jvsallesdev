import { Button } from "@/components/button";
import { ChevronField } from "@/components/chevron-field";
import { HeroIntro } from "@/components/hero-intro";
import { Logo } from "@/components/Logo";
import { Stat } from "@/components/stat";

export default function Home() {
  return (
    <>
      <ChevronField className="field-mask fixed inset-0 -z-10" />
      <HeroIntro />

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
    </>
  );
}
