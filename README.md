# ScoutX · descoberta de talentos do futebol de base

**Challenge Pelé Academia · FIAP · 1º ano de Engenharia de Software · 2026**
Entrega de **Frontend Design (FED)**: protótipo de alta fidelidade em **HTML + CSS** (a interatividade em JavaScript é tratada na disciplina de Web Development).

> Repositório: https://github.com/Isaacisrael10/ScoutX
> Protótipo publicado: https://isaacisrael10.github.io/ScoutX/

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

## 5. Sistema de design (CSS)

CSS organizado por camadas, com componentes reutilizáveis e seus estados:

- `assets/css/tokens.css`: variáveis (cor, tipografia, espaçamento, raios, sombras).
- `assets/css/base.css`: reset, tipografia, acessibilidade e utilitários de layout.
- `assets/css/components.css`: botões, campos, badges, alertas e a Carta do Atleta, com os estados (default, hover, focus, active, disabled, error).
- `assets/css/landing.css`: específico da landing.
- `assets/css/app.css`: específico das telas internas (feed, perfil, dashboard, etc.).

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
│   ├── css/                # tokens, base, components, landing, app, interactive
│   ├── js/                 # ui, validation, filters, feed, votes, messages, criar-peneira, peneira (Web Development)
│   └── img/                # imagens
└── docs/                   # PDF de entrega e prints da auditoria
```

## 9. Como executar

Não há etapa de build. Basta abrir **`index.html`** no navegador. Para os caminhos relativos funcionarem sempre, recomenda-se um servidor local:

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
