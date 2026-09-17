# jvsalles — vitrine

Portfólio e vitrine de serviços de automação e IA.
Next.js 15 App Router · TypeScript · Tailwind · deploy Vercel.

## Regra zero
Este arquivo manda no visual. Não invente cor, fonte, espaçamento,
raio ou biblioteca fora do que está aqui. Em dúvida, pergunte.

## Tokens
--ink:#0E1116  --surface:#171B22  --line:#252A33
--gold:#E4B860 --sand:#F5F2EC     --muted:#8A929E
O fundo domina. Dourado é o que o olho procura — pode virar área,
brilho e gradiente, mas não espalhe: se está em tudo, não destaca nada.

## Tipografia
Space Grotesk (display 300/500/600) · Inter (texto 400/500/600)
JetBrains Mono (rótulo, número, dado — caixa alta, tracking +16%)
Carregar com next/font/google, subset latin, display swap.

## Escala e piso de tamanho
display 72/72/-3%/600 · h1 48/50/-3%/600 · h2 32/37/-2%/600
h3 24/31/-1%/500 · corpo 18/29/400 · pequeno 15/24/400
rótulo mono 12/14/+16%/500 — caixa alta, no máximo 6 palavras

O piso de 15px vale para todo texto de leitura. A única exceção é o
rótulo mono em caixa alta, que pode ir a 12px e nunca abaixo.
Nunca 12px em frase, parágrafo, label de formulário ou mensagem de erro.
Mobile: display 44, h1 34. Corpo permanece 18.

## Grade
12 colunas · goteira 24 · margem 64. Tablet 8 col. Mobile 4 col.
Largura máxima de conteúdo 1200px. Texto corrido nunca passa de 72 caracteres.
Espaçamento base 8: 4 · 8 · 16 · 24 · 48 · 96.

## Logo
Componente Logo.tsx já existe. O chevron é um path com class="jvs-chevron"
e é o único elemento do logo que anima. A palavra herda currentColor.
Nunca separar o chevron do nome no lockup horizontal.

Geometria do chevron, viewBox 0 0 555.43 486:
M120.25 0 L0 69.43 L240.51 486 L314.92 486 L555.43 69.43 L435.17 0 L277.71 272.73 Z
Chanfro da base: 74 unidades de largura (240.51 → 314.92).

## Movimento
GSAP 3 — core mais ScrollTrigger, SplitText e DrawSVG, todos já dentro do pacote gsap.
@gsap/react para o hook useGSAP. É ele que faz o cleanup no unmount.
Registre só os plugins que o componente usa, no próprio componente.
Cada plugin não usado é peso que todo visitante baixa. ScrollTrigger,
SplitText e DrawSVG entram por import dinâmico quando a seção que
os usa existir.
Lenis para scroll suave.
Hover, foco e mudança de estado: transition do CSS, sem biblioteca.
Easing padrão cubic-bezier(0.2,0.8,0.2,1). Duração 400–700ms.
Nada acima de 1s, exceto o campo generativo, que é contínuo, e a
coreografia de entrada do hero, que vai até 2,4s no total.
Toda animação precisa de caminho alternativo em prefers-reduced-motion: reduce.
Sem exceção — vale para GSAP, Lenis, transition de CSS e o campo generativo.

Exceção ao GSAP: animação de entrada que roda uma vez, acima da dobra,
vai em @keyframes de CSS. CSS anima antes da hidratação; GSAP espera o
JavaScript e atrasaria o LCP. As keyframes ficam no globals.css, nunca
injetadas no componente.

Exceção à exceção: coreografia cuja rota depende de geometria medida
em tempo de execução (getBoundingClientRect, getScreenCTM) usa GSAP.
@keyframes não calcula posição de destino. Mesmo nesses casos, o
elemento que for o LCP nunca anima opacidade — só transform.

Uma biblioteca de animação só. Não instale uma segunda.
Se aparecer um caso que o GSAP não resolve, pare e pergunte antes de instalar.

## Campo de chevrons — assinatura do site
Canvas 2D. Nunca WebGL, nunca three.js.
Partícula = o chevron da marca, desenhado uma vez como Path2D e reusado
com setTransform. 60fps, devicePixelRatio no máximo 2.
Alvo aproximado de 1800 partículas num desktop grande com 8 ou mais núcleos.
A contagem final é adaptativa: cai por área de tela, largura abaixo
de 640px e navigator.hardwareConcurrency. Celular fica perto de 120.
Teto seguro medido com CPU 6x: 6 mil partículas. Não passe disso.
Orientação por campo de fluxo (simplex ou seno composto).
Cursor perturba: rotação em direção ao movimento + dourado por proximidade.
Cor em repouso: --line. Cor no pico: --gold.
Só comece o rAF com a página ociosa (requestIdleCallback, teto de 2s)
e o canvas na viewport. Antes disso, um quadro estático.
Pausar o rAF quando a aba está oculta e quando o canvas sai da viewport.
aria-hidden="true". Não pode ser o elemento de LCP.
prefers-reduced-motion: renderiza um quadro estático e para.

## Proibido
Ícone de robô, cérebro, chip, circuito ou rede neural.
Emoji no lugar de ícone. Texto de leitura abaixo de 15px.
Lorem ipsum — se faltar texto, pergunte.
Instalar biblioteca de componentes inteira para usar um efeito: copie o componente.

## Tom de voz
Primeira pessoa do singular — é uma pessoa, não uma empresa.
Frase curta. Número no lugar de adjetivo. Verbo na voz ativa.
O problema do cliente vem antes da tecnologia. Diga prazo e preço.
Nunca: "solução inovadora", "revolucionar", "transformação digital",
"de ponta", "sinergia", "potencializar".

## Meta de entrega
Lighthouse ≥ 90 em Performance, Acessibilidade e SEO. LCP abaixo de 2,5s.
