# ScoutX · a rede social do futebol de base

**Challenge Pelé Academia · FIAP · 1º ano de Engenharia de Software · 2026**
Entrega de **Frontend Design (FED)**: protótipo de alta fidelidade em **HTML + CSS** (a interatividade em JavaScript é tratada na disciplina de Web Development).

> Repositório: https://github.com/Isaacisrael10/ScoutX
> Protótipo publicado: https://isaacisrael10.github.io/ScoutX/

---

## 1. O que é o ScoutX

Rede social que dá visibilidade nacional a jovens do futebol de base. A própria comunidade descobre e valoriza os talentos pelo engajamento, traduzido no **Índice da Comunidade**. Como os atletas são menores de idade, todo contato é **intermediado pela plataforma** e o responsável legal é sempre avisado. A operação é da Pelé Academia.

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

## 8. Estrutura do repositório

```
ScoutX/
├── index.html              # Landing
├── componentes.html        # Vitrine do design system (componentes e estados)
├── moodboard.html          # Moodboard e direção visual (Sprint 1)
├── entrega-sprint2.html    # Documento de entrega (fonte do PDF)
├── README.md
├── app/                    # Telas internas (atleta, olheiro, recrutador Pelé)
├── assets/
│   ├── css/                # tokens, base, components, landing, app
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
