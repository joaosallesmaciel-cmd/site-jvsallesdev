import { Button } from "@/components/button";
import { ChevronField } from "@/components/chevron-field";
import { FlowStep } from "@/components/flow-step";
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
    titulo: "WhatsApp",
    rotulo: "Entrada",
    descricao:
      "O cliente manda mensagem no número que a empresa já usa. Nada muda para ele.",
    chips: ["z-api", "webhook"],
  },
  {
    numero: "02",
    titulo: "Orquestração",
    rotulo: "n8n",
    descricao:
      "Identifica de quem é a conversa, junta o histórico e decide o caminho: responder, agendar ou chamar uma pessoa.",
    chips: ["n8n", "google calendar"],
  },
  {
    numero: "03",
    titulo: "Agente de IA",
    rotulo: "Camada de resposta",
    descricao:
      "Entende o pedido, consulta o material da empresa e escreve a resposta. Se não encontra no material, não inventa.",
    chips: ["claude", "gpt"],
  },
  {
    numero: "04",
    titulo: "Banco com RAG",
    rotulo: "Memória e conhecimento",
    descricao:
      "Guarda conversa, cliente e agendamento, e devolve o trecho certo do material que a empresa cadastrou.",
    chips: ["postgresql", "20 tabelas", "pgvector", "rls", "redis"],
  },
  {
    numero: "05",
    titulo: "Painel",
    rotulo: "O que o dono vê",
    descricao:
      "Conversas, leads qualificados e agenda. Dá para assumir a conversa a qualquer momento.",
    chips: ["next.js", "react", "typescript", "vercel"],
  },
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
            <p className="mt-4 max-w-[72ch] text-[18px] leading-[29px] text-muted">
              A mensagem entra pelo WhatsApp, passa pela orquestração, o agente monta a
              resposta a partir do material da empresa e tudo fica registrado no painel.
            </p>

            {/* Grade de fios: o container é --line e o vão de 1px deixa o
                fundo aparecer entre os cartões. Raio 0, sem sombra.
                Uma coluna ou cinco, nunca um número que deixe célula vazia. */}
            <ol className="mt-6 grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-5">
              {etapas.map((etapa, i) => (
                <FlowStep key={etapa.numero} {...etapa} ultima={i === etapas.length - 1} />
              ))}
            </ol>

            <div className="mt-6">
              <p className="font-mono text-[12px] leading-[14px] font-medium tracking-[0.16em] text-muted uppercase">
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
    </>
  );
}
