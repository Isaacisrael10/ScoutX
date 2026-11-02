# ScoutX · descoberta de talentos do futebol de base

**Challenge Pelé Academia · FIAP · 1º ano de Engenharia de Software · 2026**
Entrega final (Sprint 4): **MVP concierge** com entrega de valor de ponta a ponta.

| | |
|---|---|
| Deploy (produção) | https://isaacisrael10.github.io/ScoutX/ |
| Styleguide vivo | https://isaacisrael10.github.io/ScoutX/design-system/ |
| Repositório | https://github.com/Isaacisrael10/ScoutX |
| Vídeo demonstrativo (Sprint 4) | _(link do vídeo)_ |
| Figma | Não usamos Figma: o protótipo é a própria interface implementada e publicada |
| Stack | HTML5 + **Tailwind CSS v4** + JavaScript (Vanilla) + Node/npm (build do CSS) |

---

## 1. O que é o ScoutX

Plataforma da Pelé Academia que **descentraliza a descoberta de talentos** do futebol de base e dá **visibilidade nacional** a jovens de todas as regiões. A própria comunidade descobre e valoriza os talentos pelo engajamento, traduzido no **Índice da Comunidade**. Como os atletas são menores de idade, todo contato é **intermediado pela plataforma** e o responsável legal é sempre avisado.

## 2. Usuários e fluxos principais

Três personas, cada uma com um fluxo próprio:

| Usuário | Quem é | Objetivo |
|---|---|---|
| **Atleta** (11 a 17 anos) | Talento de base, com responsável legal | Mostrar-se e ser descoberto com segurança |
| **Olheiro** (assinante) | Recrutador de clube ou agência | Descobrir talento e iniciar contato intermediado |
| **Recrutador Pelé** (interno) | Equipe da academia | Acompanhar tendências e operar peneiras |

## 3. Modelo de MVP: concierge

O ScoutX entrega valor de ponta a ponta no modelo **concierge**: a interface é real e envia cada pedido para um **canal monitorado pela equipe**, que opera os bastidores manualmente dentro de **prazos reais** mostrados na tela.

**Escopo do MVP (o valor prometido):**

| Fluxo | Quem | Tela | O que acontece de verdade |
|---|---|---|---|
| **Inscrição em peneira** (fluxo principal) | Atleta + responsável | `app/peneiras.html` → `app/inscricao-peneira.html` | O pedido chega no e-mail da equipe com protocolo. A equipe confere dados e vídeo e escreve ao responsável em até **2 dias úteis** |
| **Pedido de contato intermediado** | Olheiro | `app/catalogo.html` → `app/atleta-detalhe.html` → `app/solicitar-contato.html` | A equipe confere o clube, leva a proposta ao responsável e retorna ao olheiro em até **2 dias úteis** |
| Denúncia de conversa | Atleta | `app/mensagens-atleta.html` → `app/denunciar.html` | Análise pela equipe em até **1 dia útil** |
| Recuperar senha | Todos | `app/entrar.html` → `app/recuperar-senha.html` | Link enviado em até **1 dia útil** |

**Bastidores (como a equipe opera):**

1. O formulário valida os campos no navegador e envia por `fetch` (JSON) para a API do **FormSubmit**, que entrega no e-mail da equipe (`assets/js/concierge.js`, canal configurado em `assets/js/concierge-config.js`).
2. Cada pedido recebe um **protocolo** (`SX-AAAAMMDD-XXXX`) e um **prazo calculado em dias úteis**.
3. A equipe responde ao responsável ou ao olheiro citando o protocolo, dentro do prazo.
4. O pedido também fica salvo no navegador e aparece em **Minhas inscrições** / **Meus pedidos de contato**, com o prazo de retorno.

**Estados de interface** em todos os envios: **vazio** (formulário e listas sem pedidos), **carregando** (botão com spinner, campos travados, `aria-busy`), **erro** (por campo, e falha de envio com mensagem clara e canal alternativo, sem perder os dados digitados) e **sucesso** (tela com protocolo, prazo e próximos passos). Não há botões mortos: links que antes apontavam para `#` viraram telas ou ações reais.

## 4. Fluxos

```
Atleta:   Início → Entrar → Feed → Peneiras (filtros) → Inscrição → Sucesso (protocolo) → Minhas inscrições
Olheiro:  Início → Entrar → Descoberta (filtros) → Carta do atleta → Solicitar contato → Sucesso → Meus pedidos
                                                              └→ Salvar no radar
Pelé:     Entrar → Painel do recrutador → Radar de tendências / Intermediação (aprovar, abrir, revisar) → Criar peneira
```

## 5. Direção visual

Conceito **"A Carta do Atleta"**: cada atleta vira uma carta com foto, Índice da Comunidade, identidade e números verificados, unindo o legado da marca Pelé (azul-marinho e dourado) ao rigor dos dados.

- Moodboard e direção visual: [`moodboard.html`](moodboard.html)
- **Styleguide vivo:** [`/design-system`](https://isaacisrael10.github.io/ScoutX/design-system/) com os tokens lidos ao vivo do Tailwind e todos os componentes em seus estados reais (default, hover, foco, pressionado, desativado, carregando, erro) e os estados de sistema do concierge
- Paleta: Navy `#0B2A6B` · Dourado `#E0A92E` · Papel `#F4EFE3` · Tinta `#16120B`
- Tipografia: Archivo Expanded (manchetes), Saira Condensed (números), Inter (corpo)

## 6. Telas

| Tela | Arquivo | Para quem |
|---|---|---|
| Landing | `index.html` | Público |
| Feed do atleta | `app/atleta-feed.html` | Atleta |
| Perfil do atleta | `app/atleta-perfil.html` | Atleta |
| Peneiras | `app/peneiras.html` / `app/peneira.html` | Atleta |
| Feed de descoberta | `app/catalogo.html` | Olheiro |
| Detalhe do atleta | `app/atleta-detalhe.html` | Olheiro |
| Mensagens intermediadas | `app/mensagens.html` | Olheiro / Atleta |
| Painel do recrutador | `app/gestor-dashboard.html` | Pelé Academia |
| Criar peneira | `app/criar-peneira.html` | Pelé Academia |
| Inscrição na peneira (concierge) | `app/inscricao-peneira.html` | Atleta + responsável |
| Solicitar contato (concierge) | `app/solicitar-contato.html` | Olheiro |
| Denunciar conversa | `app/denunciar.html` | Atleta |
| Recuperar senha | `app/recuperar-senha.html` | Todos |
| Termos e privacidade | `app/termos.html` | Todos |
| Design System | `design-system/index.html` | Equipe / banca |

## 7. Tailwind CSS & Design System

O projeto roda inteiramente sobre **Tailwind CSS v4**. Os tokens do design system da Sprint 1 (cor, tipografia, escala de texto, raios) viram tokens reais do Tailwind via **`@theme`** em `assets/css/tailwind-input.css` — cada um gera automaticamente utilitários (`bg-navy`, `text-ouro-lt`, `font-display`, `text-lg`...) e uma CSS var real (`--color-navy`) consumida pelo resto do CSS.

```css
/* assets/css/tailwind-input.css */
@import "tailwindcss";

@theme {
  --color-navy: #0B2A6B;
  --color-ouro: #E0A92E;
  --color-ouro-lt: #F2C964;
  --color-paper: #F4EFE3;
  --color-ink: #16120B;
  /* ...+19 cores, --font-display/ui/stat/body/logo, --text-xs..4xl, --radius-sm/md/lg */
}
```

**Decisão de arquitetura (documentada, como pede o enunciado):** em vez de reescrever as ~145 classes de componente (`.btn`, `.card`, `.carta`, `.igpost`...) linha a linha como utilitários soltos no HTML — o que reescreveria as 17 telas do zero sem tempo hábil — os arquivos autorais das sprints anteriores (`tokens.css`, `base.css`, `components.css`, `landing.css`, `app.css`, `interactive.css`) foram **portados para dentro do pipeline do Tailwind**: todo valor de cor/fonte/tamanho de texto que antes era uma variável CSS solta (`var(--navy)`) agora referencia o token real do Tailwind (`var(--color-navy)`), gerado pelo `@theme` acima. Isso elimina os valores mágicos e centraliza o design system numa fonte única — sem recriar do zero cada componente já testado e responsivo.

Esse CSS portado é **intencionalmente colocado fora de `@layer components`**: o Tailwind faz *content-detection* automático no HTML e reconheceu nomes como `bg-navy`/`grid`/`center` (usados como classes semânticas nossas desde a Sprint 1) como padrões válidos de utilitário, gerando utilitários com o mesmo nome. CSS fora de qualquer `@layer` tem prioridade sobre *qualquer* `@layer` na cascata (spec de CSS Cascade Layers), então manter o CSS autoral sem layer garante que ele sempre vence sobre o utilitário homônimo gerado — sem precisar renomear classes no HTML existente nem quebrar nenhuma tela já pronta.

- `assets/css/tailwind-input.css` — fonte: `@theme` + todo o CSS autoral das sprints anteriores, já com os tokens migrados.
- `assets/css/tailwind.css` — **saída compilada**, é o único arquivo linkado pelas páginas (`npm run build:css` regenera).
- Variantes de estado (`hover:`, `focus:`, `disabled:`) e responsividade (`sm:`, `md:`, `lg:`) do Tailwind são usadas diretamente como utilitários nas telas novas da Sprint 3; as telas herdadas das sprints anteriores mantêm seus próprios seletores de estado (`:hover`, `:focus-visible`, `:disabled`), agora todos referenciando os tokens do `@theme`.
- Espaçamento, raio "pill", sombras e transições continuam como *custom properties* simples (`--space-4`, `--shadow-md`...) fora do `@theme` — a escala de espaçamento da Sprint 1 (`--space-7: 3rem` etc.) não bate número-a-número com a escala numérica padrão do Tailwind, então mapeá-la geraria confusão sem ganho real; ficou documentada aqui em vez de forçada.

## 8. Responsividade

Layout fluido com breakpoints em **1000px**, **900px**, **760px** e **600px**, cobrindo desktop, tablet e celular até 360px. As grades colapsam, a navegação vira barra inferior no mobile (CSS puro) e os blocos se reempilham por viewport.

## 9. Acessibilidade e performance

- HTML **semântico** (`header`, `main`, `section`, `nav`, `article`, `aside`) e **landmarks**.
- **Skip-link** "pular para o conteúdo" em todas as páginas.
- **Foco visível** (`:focus-visible` global), nunca removido sem substituto.
- **Contraste** dentro do AA nos pares texto/fundo.
- **`alt`** em todas as imagens (decorativas com `alt=""`).
- Hierarquia de headings consistente e `lang="pt-br"`.
- Navegação **100% por teclado**, incluindo o popover de notificações (abre com Enter, fecha com Esc) e os formulários (o foco vai para o primeiro campo com erro e para o título da tela de sucesso).
- Erros ligados aos campos por `aria-describedby`, `aria-invalid` e avisos com `role="alert"`.
- **Lighthouse (Sprint 4):** Acessibilidade **100** e Performance **82 a 97** nas telas principais. Prints em produção no PDF de entrega.

**Performance:** CSS do Tailwind minificado (118 KB, 20 KB com gzip), fontes carregadas sem bloquear a renderização, imagem principal com `fetchpriority="high"` e demais imagens com `loading="lazy"`. Console sem erros.

## 10. Validação com usuários

Não realizada nesta entrega. O roteiro de teste por persona, a escala de severidade e o questionário SUS ficaram preparados para uma próxima rodada: [`docs/sprint4/roteiro-teste.md`](docs/sprint4/roteiro-teste.md) e [`/teste/sus.html`](https://isaacisrael10.github.io/ScoutX/teste/sus.html).

## Manual de Interatividade (JavaScript)

Onde clicar e o que esperar de cada simulação em JavaScript. Os scripts são modulares (`assets/js/`) e usam aprimoramento progressivo: o conteúdo estático continua funcionando, e o JS adiciona a camada viva.

**1. Validação dos formulários** · `app/cadastro.html`, `app/entrar.html`, `app/cadastro-olheiro.html`, `app/entrar-olheiro.html`, `app/entrar-pele.html` (`validation.js`)
- Clique em **"Criar conta"** ou **"Entrar"** com campos vazios → os campos ficam vermelhos com "⚠ Campo obrigatório" e aparece um aviso (toast).
- Digite um **e-mail inválido** → "Digite um e-mail válido."; senha com menos de 6 caracteres → erro.
- No cadastro, coloque uma **data de nascimento fora da faixa da base** (maior de 17) → erro explicando a regra do menor.
- Preencha tudo certo + aceite os termos → toast **"Tudo certo! Entrando…"** e redireciona após ~1,2s (`setTimeout`).

**2. Filtros funcionais** · `app/peneiras.html` e `app/rankings.html` (`filters.js`)
- Mude os **selects** (Formato / Categoria / Região) → a lista filtra na hora e um toast mostra **quantos resultados** sobraram.
- Combine filtros sem resultado → aparece **"Nenhum resultado para esses filtros."**

**3. Feed do atleta e do olheiro** · `app/atleta-feed.html` e `app/catalogo.html` (`feed.js`, `votes.js`)
- **Confirmar característica** (o coração do ScoutX): clique numa tag do post (ex.: "Finalizador", "Passe") → ela fica **dourada**, o contador da comunidade sobe e um **"+1"** aparece, alimentando os dados do atleta. As mesmas características aparecem no perfil (`atleta-perfil.html` / `atleta-detalhe.html`). *Não altera o Índice, que é calculado.*
- Clique no **ícone de votar** (estrela) → a contagem de votos do lance sobe (+1) e o ícone fica dourado; clique de novo para desfazer.
- Clique em **"Seguir"** no cabeçalho do post → vira **"Seguindo"**.
- Use as **abas** (Para você / Seguindo / Em alta / Minha região). No feed do olheiro, a **lateral** ainda filtra por **posição** (chips) e **região** (select), tudo combinável.
- No feed do olheiro, clique no ícone **"Adicionar ao radar"** (alvo) de um post → salva no seu radar (toast); clique de novo para remover.

**4. Mensagens intermediadas** · `app/mensagens.html` e `app/mensagens-atleta.html` (`messages.js`)
- Escreva no campo e clique em **enviar** (ou tecle **Enter**) → sua mensagem aparece na conversa e o **responsável responde** após ~1,6s (`setTimeout`), com um toast.
- Tente enviar um **telefone ou rede social** (ex.: `meu zap 11 99999-8888`) → um **alerta nativo do navegador** bloqueia, pois o contato é intermediado.

**5. Criar peneira (prévia ao vivo)** · `app/criar-peneira.html` e `app/criar-peneira-olheiro.html` (`criar-peneira.js`)
- Edite o **nome, categoria, chips** (posição/formato/alcance), **data**, **vagas** ou envie uma **capa** → o **card de prévia** à direita atualiza na hora. "Publicar peneira" dá um toast de confirmação.

**6. Página da peneira** · `app/peneira.html` (`peneira.js`)
- O **prazo** mostra uma contagem regressiva real até o fim das inscrições (30/11/2026). Depois da data, o botão vira "Inscrições encerradas".
- **"Inscrever-se"** leva ao formulário concierge (`app/inscricao-peneira.html`), que envia de verdade para a equipe.

**7. Concierge** · formulários com `data-concierge` (`concierge.js`)
- Envie vazio: cada campo mostra o erro e o foco vai para o primeiro. Envie preenchido: botão em carregamento, depois a tela de sucesso com protocolo e prazo.
- Sem internet ou com o canal fora do ar: aviso de erro, os dados continuam no formulário e dá para tentar de novo.

**8. Ações rápidas** · `acoes.js`
- **Sino** abre as notificações (Esc fecha). **Salvar no meu radar** e **Compartilhar carta** funcionam. No painel Pelé, **Aprovar** muda o status da conversa.

> Notificações (toast) e o destaque ao vivo são criados dinamicamente no DOM por `assets/js/ui.js`.

## 11. Estrutura do repositório

```
ScoutX/
├── index.html              # Landing
├── design-system/          # Styleguide vivo (/design-system)
├── teste/sus.html          # Questionário SUS do teste com usuários
├── componentes.html        # redireciona para /design-system
├── moodboard.html          # Moodboard e direção visual (Sprint 1)
├── entrega-sprint2.html    # Documento de entrega (fonte do PDF)
├── README.md
├── integrantes.txt         # identificação da equipe (nomes + RM)
├── PROMPTS.md              # uso de IA generativa
├── app/                    # Telas internas (atleta, olheiro, recrutador Pelé)
├── assets/
│   ├── css/                # tailwind-input.css (fonte) + tailwind.css (compilado, linkado pelas paginas)
│   ├── js/                 # concierge (envio real), acoes, ui, validation, filters, feed, votes, messages, criar-peneira, peneira, criar-post
│   └── img/                # imagens
├── scripts/                # scripts de migração (documentação do processo Sprint 3)
├── package.json            # dependências do Tailwind + scripts de build
└── docs/                   # PDFs de entrega, prints e docs/sprint4 (teste com usuários)
```

## 12. Como executar (setup local)

O HTML/CSS/JS continuam **sem bundler** — basta abrir qualquer página no navegador, o `assets/css/tailwind.css` já vem **compilado e versionado** no repositório. Só é preciso instalar/rodar o Tailwind se for **alterar** o design system:

```bash
npm install                # instala o Tailwind CSS v4
npm run build:css          # compila tailwind-input.css -> tailwind.css (uma vez)
npm run watch:css          # ou: recompila automaticamente a cada alteração
```

Para navegar localmente sem quebrar caminhos relativos, um servidor estático (não obrigatório, mas recomendado):

```bash
# opção 1: extensão "Live Server" do VS Code
# opção 2: Python
python -m http.server 8000
# depois acesse http://localhost:8000
```

## 13. Deploy

Publicado no **GitHub Pages** a partir da branch `main` (pasta raiz). Todo merge na `main` atualiza o site em 1 a 2 minutos. O CSS compilado (`assets/css/tailwind.css`) é versionado, então o Pages não precisa de build.

Para o canal do concierge funcionar, o e-mail da equipe fica em `assets/js/concierge-config.js`. Na primeira solicitação, o FormSubmit envia um e-mail de ativação para essa caixa; depois de ativado, todos os pedidos chegam direto.

## Integrantes

- Bernardo de Paula Rodrigues, RM 572376
- Heitor Anacleto Araújo, RM 573599
- Henrique Nunes Mororó, RM 574073
- Isaac Israel Rosa Coimbra, RM 570072
- Matheus Henrique Pedersen Guerra, RM 571197

## Contribuições · Sprint 4

> Regra: cada integrante tem **pelo menos uma branch própria mergeada na `main` via Pull Request** nesta sprint, sem commits diretos na `main`. As branches ficam preservadas após o merge. Passo a passo: [`docs/sprint4/tarefas-integrantes.md`](docs/sprint4/tarefas-integrantes.md).

| Integrante | RM | Branch(es) Sprint 4 | PR(s) | Telas/Componentes |
|---|---|---|---|---|
| Isaac Israel Rosa Coimbra | 570072 | `feature/mvp-concierge`, `feature/design-system`, `feature/performance`, `feature/kit-teste` | [#2](https://github.com/Isaacisrael10/ScoutX/pull/2), [#3](https://github.com/Isaacisrael10/ScoutX/pull/3), [#4](https://github.com/Isaacisrael10/ScoutX/pull/4), [#5](https://github.com/Isaacisrael10/ScoutX/pull/5) | Fluxo concierge (inscrição, contato, denúncia, recuperar senha, termos), estados de interface, rota `/design-system`, performance, roteiro de teste + SUS |
| Bernardo de Paula Rodrigues | 572376 | _(preencher)_ | _(preencher)_ | |
| Heitor Anacleto Araújo | 573599 | _(preencher)_ | _(preencher)_ | |
| Henrique Nunes Mororó | 574073 | _(preencher)_ | _(preencher)_ | |
| Matheus Henrique Pedersen Guerra | 571197 | _(preencher)_ | _(preencher)_ | |

### Sprint 3 (histórico)

| Integrante | Branch | PR | Entrega |
|---|---|---|---|
| Isaac Israel Rosa Coimbra | `feature/tailwind-migration` | [#1](https://github.com/Isaacisrael10/ScoutX/pull/1) | Migração do CSS para Tailwind v4 com os tokens da Sprint 1 |
