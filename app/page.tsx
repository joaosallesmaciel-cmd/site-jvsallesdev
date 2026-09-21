import Image from "next/image";
import type { CSSProperties } from "react";

// Ícone por ícone, nunca a biblioteca inteira.
import {
  CircleCheck,
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
import { Reveal } from "@/components/reveal";
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

// O mesmo link da chamada final, com a mensagem já preenchida.
const WHATSAPP =
  "https://wa.me/5563992300944?text=Ol%C3%A1%2C%20Jo%C3%A3o.%20Quero%20falar%20sobre%20um%20processo%20da%20minha%20empresa.";

// Hover e foco com transition do CSS, como manda o AGENTS.md.
// transition-[color] e não transition-colors: o transition-colors do
// Tailwind v4 inclui outline-color, e o contorno de foco ficaria
// esmaecendo por 400ms em vez de aparecer na hora.
const link =
  "text-[15px] leading-[24px] text-muted transition-[color] duration-[400ms] " +
  "ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none hover:text-sand " +
  "focus-visible:text-sand focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-gold";

// Fica acima da viewport até receber foco. Não é display:none: precisa
// continuar na ordem de tabulação e ser anunciado pelo leitor de tela.
const pular =
  "absolute top-2 left-6 z-10 -translate-y-[200%] bg-ink px-4 py-2 text-[15px] " +
  "leading-[24px] text-sand transition-transform duration-[400ms] " +
  "ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none focus:translate-y-0 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

const menu = [
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

// Ilustração do hero: um processo rodando, não uma promessa. O número
// da segunda linha é o que o olho precisa pegar.
const conciliacao = [
  { destaque: null, texto: "Extrato de agosto importado · 214 lançamentos" },
  { destaque: "3", texto: " cobranças duplicadas encontradas" },
  { destaque: null, texto: "Relatório enviado ao financeiro" },
];

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
      <Reveal />

      {/* Fundo sólido e z-50: o campo de chevrons passa por baixo sem
          borrar nada. Sem blur, sem sombra. */}
      <header className="sticky top-0 z-50 h-[var(--header-h)] border-b border-line bg-ink">
        <a className={pular} href="#conteudo">
          Pular para o conteúdo
        </a>

        <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between gap-6 px-6 md:px-16">
          {/* O mesmo logo de antes, movido do hero: a coreografia acha
              os alvos pelo documento inteiro, então segue funcionando. */}
          <Logo height={28} intro />

          <div className="flex items-center gap-8">
            <nav aria-label="Seções" className="hidden items-center gap-8 md:flex">
              {menu.map(({ href, label }) => (
                <a key={href} className={`link-menu ${link}`} href={href}>
                  {label}
                </a>
              ))}
            </nav>

            <Button
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2"
            >
              Falar comigo
            </Button>
          </div>
        </div>
      </header>

      {/* O campo cobre só o hero: preso a este bloco, não à viewport. */}
      <div className="relative">
        <ChevronField className="jvs-campo field-mask absolute inset-0 -z-10" />

        <div className="mx-auto flex min-h-[calc(100dvh-var(--header-h))] w-full max-w-[1200px] flex-col px-6 md:px-16">
          <main id="conteudo" className="flex flex-1 items-center py-4 md:py-12">
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
                    Ver o que eu faço{" "}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    >
                      →
                    </span>
                  </Button>
                </div>
              </div>

              {/* Só a partir de 1024px: no celular o hero precisa continuar
                  cabendo em 844px de altura. self-start alinha o topo do
                  cartão com o topo do h1, sem esticar. */}
              <div className="hidden border border-line bg-surface p-6 lg:col-span-5 lg:col-start-8 lg:block lg:self-start">
                <p className="font-mono text-[12px] leading-[14px] font-medium tracking-[0.16em] text-muted uppercase">
                  Exemplo · Conciliação
                </p>

                <ul className="mt-6 space-y-4">
                  {conciliacao.map(({ destaque, texto }, i) => (
                    <li
                      key={texto}
                      className="jvs-linha flex items-start gap-4 text-[15px] leading-[24px] text-sand"
                      style={{ "--i": i } as CSSProperties}
                    >
                      <CircleCheck
                        aria-hidden="true"
                        size={24}
                        strokeWidth={1.5}
                        className="shrink-0 text-gold"
                      />
                      <span>
                        {destaque && <span className="text-gold">{destaque}</span>}
                        {texto}
                      </span>
                    </li>
                  ))}
                </ul>
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
        className="mx-auto w-full max-w-[1200px] scroll-mt-[calc(var(--header-h)+24px)] px-6 pt-24 pb-12 md:px-16"
      >
        <header data-reveal className="mb-12">
          <p className="font-mono text-[12px] leading-[14px] font-medium tracking-[0.16em] text-muted uppercase">
            Onde o processo trava
          </p>
          <h2 className="mt-4 max-w-[24ch] font-display text-[32px] leading-[37px] font-semibold tracking-[-0.02em] text-sand">
            Quatro lugares onde sua empresa perde dinheiro sem ver.
          </h2>
        </header>

        {/* Mesma grade de fios do diagrama: o fio divisor é o fundo
            --line aparecendo pelo vão de 1px entre os cartões. */}
        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
          {servicos.map((servico, i) => (
            <Service key={servico.title} {...servico} atraso={i * 80} />
          ))}
        </div>
      </section>

      <section
        id="portfolio"
        className="mx-auto w-full max-w-[1200px] scroll-mt-[calc(var(--header-h)+24px)] px-6 py-12 md:px-16"
      >
        <header data-reveal>
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
          {/* Nome, descritor e meta numa linha só. No celular a meta cai
              para baixo do descritor; no desktop vai para a direita. */}
          <div
            data-reveal
            className="grid grid-cols-4 gap-x-6 gap-y-4 md:grid-cols-8 lg:grid-cols-12"
          >
            <div className="col-span-4 md:col-span-8 lg:col-span-8">
              <h3 className="font-display-medium text-[24px] leading-[31px] font-medium tracking-[-0.01em] text-sand">
                Aexum
              </h3>
              <p className="mt-2 max-w-[72ch] text-[18px] leading-[29px] text-muted">
                {aexum.descritor}
              </p>
            </div>
            <p className="col-span-4 font-mono text-[12px] leading-[14px] font-medium tracking-[0.16em] text-muted uppercase md:col-span-8 lg:col-span-4 lg:text-right">
              {aexum.meta}
            </p>
          </div>

          {/* Grade de fios: o container é --line e o vão de 1px deixa o
              fundo aparecer entre as células. Raio 0, sem sombra.
              Uma coluna ou cinco, nunca um número que deixe célula vazia.
              A regra de passagem é a sexta célula, de largura inteira. */}
          <ol className="mt-6 grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-5">
            {etapas.map((etapa, i) => (
              <FlowStep key={etapa.numero} {...etapa} atraso={i * 80} />
            ))}

            <li
              data-reveal
              style={{ transitionDelay: "400ms" }}
              className="flex flex-col gap-4 bg-surface p-6 lg:col-span-5 lg:p-4 xl:p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center border border-line">
                <UserRound
                  aria-hidden="true"
                  size={24}
                  strokeWidth={1.5}
                  className="text-gold"
                />
              </div>

              <h4 className="font-mono text-[12px] leading-[14px] font-medium tracking-[0.16em] text-muted uppercase">
                Quando passa para uma pessoa
              </h4>

              <ul className="grid gap-4 lg:grid-cols-2">
                {passagem.map(({ condicao, acao }) => (
                  <li
                    key={condicao}
                    className="max-w-[72ch] text-[18px] leading-[29px] text-sand"
                  >
                    {condicao} <span className="text-gold">→</span> {acao}
                  </li>
                ))}
              </ul>
            </li>
          </ol>
        </article>
      </section>


      <section
        id="sobre"
        className="mx-auto w-full max-w-[1200px] scroll-mt-[calc(var(--header-h)+24px)] px-6 pt-12 pb-24 md:px-16"
      >
        <div className="grid grid-cols-4 items-center gap-x-6 gap-y-12 md:grid-cols-8 lg:grid-cols-12">
          {/* A caixa 4:5 vem do CSS, então o espaço já está reservado
              antes de a imagem carregar: sem CLS. O recorte puxa o
              rosto para o terço superior. */}
          <Image
            data-reveal
            src="/joao.jpg"
            alt="João Victor Salles em frente ao computador"
            width={768}
            height={1376}
            loading="lazy"
            sizes="(min-width: 1024px) 440px, 100vw"
            className="col-span-4 aspect-[4/5] w-full border border-line object-cover object-[center_32%] md:col-span-8 lg:col-span-5"
          />

          <div
            data-reveal
            style={{ transitionDelay: "80ms" }}
            className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7"
          >
            <p className="font-mono text-[12px] leading-[14px] font-medium tracking-[0.16em] text-muted uppercase">
              Quem faz
            </p>

            <h2 className="mt-4 max-w-[24ch] font-display text-[32px] leading-[37px] font-semibold tracking-[-0.02em] text-sand">
              Um desenvolvedor, do começo ao fim.
            </h2>

            <p className="mt-6 max-w-[72ch] text-[18px] leading-[29px] text-muted">
              Sou o João. Antes de programar, trabalhei com operação, dados e tráfego
              pago — por isso começo pelo processo, não pela ferramenta.
            </p>

            <p className="mt-4 max-w-[72ch] text-[18px] leading-[29px] text-muted">
              Você fala comigo da primeira conversa à entrega. Sem repasse, sem
              intermediário.
            </p>

            <p className="mt-6 font-mono text-[12px] leading-[14px] font-medium tracking-[0.16em] text-muted uppercase">
              Palmas-TO · Atendimento remoto
            </p>
          </div>
        </div>
      </section>

      {/* A faixa em --surface vai de borda a borda: é a troca de fundo,
          não uma borda, que separa a chamada final do texto acima. */}
      <section id="contato" className="scroll-mt-[calc(var(--header-h)+24px)] bg-surface">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-24 md:px-16">
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
            <div
              data-reveal
              className="col-span-4 flex flex-col items-center text-center md:col-span-8 lg:col-span-8 lg:col-start-3"
            >
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
              <a className={link} href="tel:+5563992300944">
                (63) 99230-0944
              </a>
              <a className={link} href="mailto:joaosallesmaciel@gmail.com">
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
