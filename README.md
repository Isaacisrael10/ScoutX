# ScoutX · descoberta de talentos do futebol de base

**Challenge Pelé Academia · FIAP · 1º ano de Engenharia de Software · 2026**
Entrega de **Frontend Design (FED)**: protótipo de alta fidelidade em **HTML + CSS** (a interatividade em JavaScript é tratada na disciplina de Web Development).

> Repositório: https://github.com/Isaacisrael10/ScoutX
> Protótipo publicado: https://isaacisrael10.github.io/ScoutX/
> Vídeo demonstrativo: https://youtu.be/o23w2S_gMTo
> Stack: HTML5 + **Tailwind CSS v4** + JavaScript (Vanilla, sem framework) + Node/npm (build do CSS)
>
> _Não há protótipo em Figma nesta entrega — o MVP visual é a própria interface implementada em HTML/Tailwind, navegável e publicada (é a opção que o enunciado da Sprint 3 aceita: "protótipo navegável (ex.: Figma interativo) **ou interface implementada**")._

> **Web Development (interatividade):** este branch `web-development` adiciona a camada de **JavaScript** sobre o protótipo. O FED estático (sem JS) permanece no branch `main`. Os scripts ficam em `assets/js/`. Veja o **Manual de Interatividade** abaixo.

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

## 3. Direção visual

Conceito **"A Carta do Atleta"**: cada atleta vira uma carta com foto, Índice da Comunidade, identidade e números verificados, unindo o legado da marca Pelé (azul-marinho e dourado) ao rigor dos dados.

- Moodboard e direção visual: [`moodboard.html`](moodboard.html)
- Vitrine de componentes com os 6 estados: [`componentes.html`](componentes.html)
- Paleta: Navy `#0B2A6B` · Dourado `#E0A92E` · Papel `#F4EFE3` · Tinta `#16120B`
- Tipografia: Archivo Expanded (manchetes), Saira Condensed (números), Inter (corpo)

## 4. Telas

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

## 5. Tailwind CSS & Design System (Sprint 3)

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

## 6. Responsividade

Layout fluido com breakpoints em **1000px**, **900px**, **760px** e **600px**, cobrindo desktop, tablet e celular até 360px. As grades colapsam, a navegação vira barra inferior no mobile (CSS puro) e os blocos se reempilham por viewport.

## 7. Acessibilidade (WCAG 2.1 AA)

- HTML **semântico** (`header`, `main`, `section`, `nav`, `article`, `aside`) e **landmarks**.
- **Skip-link** "pular para o conteúdo" em todas as páginas.
- **Foco visível** (`:focus-visible` global), nunca removido sem substituto.
- **Contraste** dentro do AA nos pares texto/fundo.
- **`alt`** em todas as imagens (decorativas com `alt=""`).
- Hierarquia de headings consistente e `lang="pt-br"`.
- Auditoria: **Lighthouse Acessibilidade 100** e **axe DevTools sem violações** (evidências em `docs/`).

## Manual de Interatividade (Web Development)

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
- O **prazo** mostra uma **contagem regressiva ao vivo** (dias/horas/min/seg, `setInterval`).
- Clique em **"Inscrever-se"** → confirma (modal), o nº de **inscritos sobe**, as **vagas baixam** e o botão vira **"Inscrito ✓"**.

> Notificações (toast) e o destaque ao vivo são criados dinamicamente no DOM por `assets/js/ui.js`.

## 8. Estrutura do repositório

```
ScoutX/
├── index.html              # Landing
├── componentes.html        # Vitrine do design system (componentes e estados)
├── moodboard.html          # Moodboard e direção visual (Sprint 1)
├── entrega-sprint2.html    # Documento de entrega (fonte do PDF)
├── README.md
├── integrantes.txt         # identificação da equipe (nomes + RM)
├── app/                    # Telas internas (atleta, olheiro, recrutador Pelé)
├── assets/
│   ├── css/                # tailwind-input.css (fonte) + tailwind.css (compilado, linkado pelas paginas)
│   ├── js/                 # ui, validation, filters, feed, votes, messages, criar-peneira, peneira, criar-post (Web Development)
│   └── img/                # imagens
├── scripts/                # scripts de migração (documentação do processo Sprint 3)
├── package.json            # dependências do Tailwind + scripts de build
└── docs/                   # PDF de entrega e prints da auditoria
```

## 9. Como executar

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

## Integrantes

- Bernardo de Paula Rodrigues, RM 572376
- Heitor Anacleto Araújo, RM 573599
- Henrique Nunes Mororó, RM 574073
- Isaac Israel Rosa Coimbra, RM 570072
- Matheus Henrique Pedersen Guerra, RM 571197

## Contribuições · Sprint 3 (Front-End Design)

> Cada integrante precisa de **pelo menos uma branch própria mergeada na `main` via Pull Request** nesta sprint — quem não tiver, zera individualmente o critério, mesmo com a nota do grupo em dia. Preencha sua linha ao abrir seu PR.

| Integrante | RM | Branch(es) | Pull Request(s) | Telas/Componentes entregues |
|---|---|---|---|---|
| Isaac Israel Rosa Coimbra | 570072 | `feature/tailwind-migration` | _(link do PR)_ | Migração completa do CSS pra Tailwind v4 (`@theme` com todos os tokens da Sprint 1), build (`npm run build:css`), atualização dos `<link>` nas 17 telas |
| Bernardo de Paula Rodrigues | 572376 | _(pendente)_ | _(pendente)_ | |
| Heitor Anacleto Araújo | 573599 | _(pendente)_ | _(pendente)_ | |
| Henrique Nunes Mororó | 574073 | _(pendente)_ | _(pendente)_ | |
| Matheus Henrique Pedersen Guerra | 571197 | _(pendente)_ | _(pendente)_ | |
