# ScoutX — Plataforma de Gestão e Valorização de Talentos

**Challenge Pelé Academia · FIAP · 1º ano de Engenharia de Software (Semipresencial) · Rio de Janeiro · 2026**
Entrega de **Front-End Design (FED)** — interface visual em **HTML + CSS** (sem JavaScript). Este repositório é a base para a disciplina de **Web Development (WD)**, que adiciona a interatividade depois.

> 🔗 Repositório: https://github.com/Isaacisrael10/ScoutX
> ▶️ Protótipo publicado: _[adicionar link Vercel/Netlify/GitHub Pages aqui]_

---

## 1. O que é o ScoutX

O ScoutX é a plataforma da **Pelé Academia** que dá **visibilidade nacional** a jovens atletas do futebol de base, **mede o potencial com inteligência de dados** e **media com segurança** todo contato entre olheiros e atletas. Responde à dor histórica do futebol brasileiro: talentos invisíveis e a perda de valor de quem forma o craque.

## 2. Usuário e tarefa crítica

A interface foi desenhada para **três usuários reais**, cada um com uma decisão a tomar em segundos:

| Usuário | Quem é | Decisão crítica |
|---|---|---|
| **Jovem Atleta** (11–17) | Talento de base, com responsável legal | *“Como me mostro e evoluo pra ser descoberto?”* — ver score, mídias e peneiras num relance |
| **Olheiro** (assinante) | Recrutador de clube/agência | *“Esse atleta vale meu contato?”* — filtrar o catálogo, ler a análise de IA e iniciar conversa **mediada** |
| **Recrutador da Pelé** (interno) | Staff da academia | *“Quem priorizar e mediar agora?”* — alertas de retenção, fila de mediação e visão da operação |

A direção visual inteira responde a esses usuários: leitura rápida, hierarquia clara e o dado virando decisão.

## 3. Direção visual

Conceito: **“A Carta do Atleta”** — cada atleta é uma carta/dossiê (foto, score, atributos, coroa de elite), unindo o **legado da marca Pelé** (azul-marinho + dourado) ao **rigor dos dados**. Frase-síntese: *“A plataforma séria da Pelé Academia que enxerga, mede e valoriza o próximo craque brasileiro.”*

- **Moodboard + análise crítica de referências:** [`moodboard.html`](moodboard.html)
- **Direção de arte detalhada:** [`docs/ART-DIRECTION.md`](docs/ART-DIRECTION.md)
- **Paleta:** Navy `#0B2A6B` (dominante) · Dourado `#E0A92E` · Papel `#F4EFE3` · Tinta `#16120B` · acentos verde/amarelo/vermelho.
- **Tipografia:** Archivo Expanded (manchetes) · Saira Condensed (números/placar) · Inter (corpo).

## 4. Telas

| Tela | Arquivo | Para quem |
|---|---|---|
| Landing | `index.html` | Público |
| Perfil do atleta | `app/atleta-perfil.html` | Atleta |
| Página da peneira | `app/peneira.html` | Atleta |
| Catálogo de talentos | `app/catalogo.html` | Olheiro |
| Detalhe do atleta + conversa mediada | `app/atleta-detalhe.html` | Olheiro |
| Painel do recrutador | `app/gestor-dashboard.html` | Pelé Academia |
| Criar peneira | `app/criar-peneira.html` | Pelé Academia |

## 5. Sistema de design (CSS)

CSS organizado por camadas, **sem estilo inline espalhado** e com componentes reutilizáveis:

- `assets/css/tokens.css` — variáveis (cor, tipografia, espaçamento, raios, sombras).
- `assets/css/base.css` — reset, tipografia, acessibilidade e utilitários de layout.
- `assets/css/components.css` — botões, campos, badges, alertas, **a Carta do Atleta**, score, etc. (com estados).
- `assets/css/landing.css` — específico da landing.
- `assets/css/app.css` — específico das telas logadas (dashboard, catálogo, perfil, etc.).

## 6. Responsividade

Layout fluido com breakpoints definidos: **1000px**, **900px**, **760px** e **600px** — cobrindo desktop, tablet e mobile. Grades colapsam, a navegação vira menu (CSS puro, sem JS) e os blocos reempilham por viewport.

## 7. Acessibilidade

- HTML **semântico** (`header`, `main`, `section`, `nav`, `article`, `aside`) e **landmarks**.
- **Skip-link** “pular para o conteúdo”.
- **Foco visível** (anel dourado) — nunca removido sem substituto.
- **Contraste WCAG AA** nos pares texto/fundo.
- **`alt`** em todas as imagens (decorativas com `alt=""`).
- Respeito a **`prefers-reduced-motion`** e hierarquia de headings consistente.

## 8. Estrutura do repositório

```
ScoutX/
├── index.html              # Landing
├── moodboard.html          # Moodboard + direção visual
├── README.md
├── integrantes.txt
├── app/                    # Telas logadas (atleta, olheiro, recrutador)
├── assets/
│   ├── css/                # tokens, base, components, landing, app
│   └── img/                # fotos dos atletas, campo e referências
├── docs/
│   └── ART-DIRECTION.md    # direção de arte detalhada
└── pitch/                  # material complementar de storytelling (SIE)
```

## 9. Como abrir

Não há etapa de build. Basta abrir **`index.html`** no navegador (dois cliques). Para navegar com os caminhos relativos sempre corretos, recomenda-se um servidor local:

```bash
# opção 1: extensão "Live Server" do VS Code
# opção 2: Python
python -m http.server 8000
# depois acesse http://localhost:8000
```

## 10. Preparação para Web Development (WD)

O FED entrega **estrutura e estilo** — sem JavaScript. A interatividade é da disciplina de **WD**, neste mesmo repositório, em `assets/js/`. Pontos já preparados para o WD:

- **Menu** e **modais** (mediação/inscrição) feitos em **CSS puro** — o WD pode evoluir conforme necessário.
- **Preview ao vivo** em *Criar peneira*, **filtros** do catálogo e **assistente de IA** (“Pergunte à IA”, marcado como *Em breve*) são ganchos de UI prontos para receber o JS.

## Integrantes

- Bernardo de Paula Rodrigues — RM 572376
- Heitor Anacleto Araújo — RM 573599
- Henrique Nunes Mororó — RM 574073
- Isaac Israel Rosa Coimbra — RM 570072
- Matheus Henrique Pedersen Guerra — RM 571197
