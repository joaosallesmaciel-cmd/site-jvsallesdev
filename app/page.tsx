// Ícone por ícone, nunca a biblioteca inteira.
import {
  Database,
  EyeOff,
  LayoutDashboard,
  MessageCircle,
  MessageSquareText,
  Repeat,
  TrendingDown,
  Unlink,
  UserRound,
  Workflow,
} from "lucide-react";

import { Button } from "@/components/button";
import { ChevronField } from "@/components/chevron-field";
import { FlowStep } from "@/components/flow-step";
import { HeroIntro } from "@/components/hero-intro";
import { Logo } from "@/components/Logo";
import { Service } from "@/components/service";
import { Stat } from "@/components/stat";

const servicos = [
  {
    icon: TrendingDown,
    title: "Dinheiro vazando sem ninguém ver",
    cost: "Cobrança duplicada e pagamento sem nota somem entre centenas de lançamentos.",
    delivery: "Relatório com cada furo, o valor e a prova.",
  },
  {
    icon: EyeOff,
    title: "Decisão tomada no escuro",
    cost: "O relatório chega quando a decisão já foi tomada.",
    delivery: "Painel com o número atualizado, sem planilha manual.",
  },
  {
    icon: Unlink,
    title: "Dado que some entre sistemas",
    cost: "ERP, planilha e vendedor contam três versões diferentes.",
    delivery: "O dado entra uma vez e aparece em todo lugar.",
  },
  {
    icon: Repeat,
    title: "Trabalho que ninguém automatizou",
    cost: "Copiar, conferir e montar o mesmo relatório todo mês.",
    delivery: "Automação do processo, com a pessoa só onde precisa julgar.",
  },
];

// Único projeto da seção. Autoral, não é cliente: a ressalva vem no
// cabeçalho, antes do diagrama, e não como nota de rodapé.
const aexum = {
  descritor:
    "Plataforma de atendimento por WhatsApp com agente de IA que atende, qualifica e agenda.",
  meta: "2026 · Projeto autoral",
};

// O caminho de uma mensagem, em cinco etapas. Sem imagem e sem JS: os
// fios da grade são o fundo --line aparecendo pelo vão de 1px.
const etapas = [
  {
    numero: "01",
    icon: MessageCircle,
    titulo: "WhatsApp",
    rotulo: "Entrada",
    descricao: "O cliente escreve no número de sempre.",
    chips: ["Z-API"],
  },
  {
    numero: "02",
    icon: Workflow,
    titulo: "Orquestração",
    rotulo: "n8n",
    descricao: "Decide: responder, agendar ou chamar alguém.",
    chips: ["n8n", "Google Calendar"],
  },
  {
    numero: "03",
    icon: MessageSquareText,
    titulo: "Agente de IA",
    rotulo: "Camada de resposta",
    descricao: "Responde com o material da empresa. Não inventa.",
    chips: ["Claude", "GPT"],
  },
  {
    numero: "04",
    icon: Database,
    titulo: "Banco com RAG",
    rotulo: "Memória e conhecimento",
    descricao: "Guarda tudo e acha o trecho certo.",
    chips: ["PostgreSQL", "pgvector", "RLS", "Redis"],
  },
  {
    numero: "05",
    icon: LayoutDashboard,
    titulo: "Painel",
    rotulo: "O que o dono vê",
    descricao: "O dono vê tudo e assume quando quiser.",
    chips: ["Next.js", "React"],
  },
];

// Hover e foco com transition do CSS, como manda o AGENTS.md.
const linkRodape =
  "text-[15px] leading-[24px] text-muted transition-colors duration-[400ms] " +
  "ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none hover:text-sand " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

// A seta carrega o sentido da frase, então não leva aria-hidden:
// sem ela o leitor de tela perde o "então".
const passagem = [
  { condicao: "Achou a resposta no material", acao: "responde." },
  { condicao: "Não achou", acao: "passa para uma pessoa, com a conversa inteira." },
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
        className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-6 pt-24 pb-12 md:px-16"
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

      <section
        id="portfolio"
        className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-6 pt-12 pb-24 md:px-16"
      >
        <header>
          <p className="font-mono text-[12px] leading-[14px] font-medium tracking-[0.16em] text-muted uppercase">
            O que eu já construí
          </p>
          <h2 className="mt-4 max-w-[24ch] font-display text-[32px] leading-[37px] font-semibold tracking-[-0.02em] text-sand">
            Um sistema inteiro, do banco ao deploy.
          </h2>
          <p className="mt-6 max-w-[72ch] text-[18px] leading-[29px] text-muted">
            O Aexum é um projeto meu, não de cliente. Concebi, construí e coloquei em
            produção sozinho — o mesmo trabalho que eu faria no processo da sua empresa.
          </p>
        </header>

        <article className="mt-12 border-t border-line pt-6">
          {/* No celular a meta fica logo abaixo do nome; no desktop sobe para a
              direita, na mesma linha do h3. Um elemento só, sem duplicar. */}
          <div className="grid grid-cols-4 gap-x-6 gap-y-4 md:grid-cols-8 lg:grid-cols-12">
            <h3 className="col-span-4 font-display-medium text-[24px] leading-[31px] font-medium tracking-[-0.01em] text-sand md:col-span-8 lg:col-span-6">
              Aexum
            </h3>
            <p className="col-span-4 self-center font-mono text-[12px] leading-[14px] font-medium tracking-[0.16em] text-muted uppercase md:col-span-8 lg:col-span-6 lg:text-right">
              {aexum.meta}
            </p>
            <p className="col-span-4 max-w-[72ch] text-[18px] leading-[29px] text-muted md:col-span-8 lg:col-span-6">
              {aexum.descritor}
            </p>
          </div>

          <div className="mt-12">
            <h4 className="font-display-medium text-[24px] leading-[31px] font-medium tracking-[-0.01em] text-sand">
              Da mensagem no WhatsApp até o registro no painel.
            </h4>
            {/* Grade de fios: o container é --line e o vão de 1px deixa o
                fundo aparecer entre os cartões. Raio 0, sem sombra.
                Uma coluna ou cinco, nunca um número que deixe célula vazia. */}
            <ol className="mt-6 grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-5">
              {etapas.map((etapa) => (
                <FlowStep key={etapa.numero} {...etapa} />
              ))}
            </ol>

            <div className="mt-6">
              <UserRound
                aria-hidden="true"
                size={24}
                strokeWidth={1.5}
                className="text-gold"
              />
              <p className="mt-4 font-mono text-[12px] leading-[14px] font-medium tracking-[0.16em] text-muted uppercase">
                Quando passa para uma pessoa
              </p>
              <ul className="mt-4 space-y-4">
                {passagem.map(({ condicao, acao }) => (
                  <li
                    key={condicao}
                    className="max-w-[72ch] text-[18px] leading-[29px] text-sand"
                  >
                    {condicao} <span className="text-gold">→</span> {acao}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </section>

      {/* A faixa em --surface vai de borda a borda: é a troca de fundo,
          não uma borda, que separa a chamada final do texto acima. */}
      <section id="contato" className="scroll-mt-24 bg-surface">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-24 md:px-16">
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 flex flex-col items-center text-center md:col-span-8 lg:col-span-8 lg:col-start-3">
              <p className="font-mono text-[12px] leading-[14px] font-medium tracking-[0.16em] text-muted uppercase">
                Próximo passo
              </p>

              <h2 className="mt-4 font-display text-[32px] leading-[37px] font-semibold tracking-[-0.02em] text-sand">
                Onde o seu processo trava?
              </h2>

              <p className="mt-6 max-w-[72ch] text-[18px] leading-[29px] text-muted">
                Me conta em uma mensagem. Eu respondo e a gente vê se faz sentido
                automatizar.
              </p>

              <div className="mt-12 flex flex-wrap justify-center gap-4">
                <Button
                  href="https://wa.me/5563992300944?text=Ol%C3%A1%2C%20Jo%C3%A3o.%20Quero%20falar%20sobre%20um%20processo%20da%20minha%20empresa."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar no WhatsApp
                </Button>
                <Button variant="tertiary" href="mailto:joaosallesmaciel@gmail.com">
                  joaosallesmaciel@gmail.com
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-12 md:px-16">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              {/* A palavra herda currentColor; o chevron segue dourado. */}
              <Logo height={24} className="text-muted" />
              <p className="mt-4 text-[15px] leading-[24px] text-muted">
                Automação de processos para empresas · Palmas-TO
              </p>
            </div>

            <div className="col-span-4 flex flex-col gap-2 md:col-span-8 lg:col-span-6 lg:items-end">
              <a className={linkRodape} href="tel:+5563992300944">
                (63) 99230-0944
              </a>
              <a className={linkRodape} href="mailto:joaosallesmaciel@gmail.com">
                joaosallesmaciel@gmail.com
              </a>
            </div>
          </div>

          <p className="mt-12 text-[15px] leading-[24px] text-muted">
            © 2026 João Victor Salles
          </p>
        </div>
      </footer>
    </>
  );
}
