# ScoutX — Auditoria de Acessibilidade (WCAG 2.1 AA · Sprint 2)

Relatório de acessibilidade do protótipo ScoutX. Combina **boas práticas já
implementadas no código** com os **testes a executar** (ferramentas + manuais).

> **Para a banca:** este documento traz a checklist WCAG 2.1 AA mapeada ao código
> e os modelos de tabela. As seções marcadas **[RODAR]** dependem de executar as
> ferramentas e colar os prints/resultados (Lighthouse, axe, leitor de tela, vídeo).

---

## 1. Como executar a auditoria

1. **Lighthouse** (Chrome/Edge → DevTools → Lighthouse → categoria *Accessibility*, modo *Mobile* e *Desktop*). Meta: **≥ 90**.
   - Rodar em pelo menos: `index.html`, `app/atleta-feed.html`, `app/atleta-perfil.html`, `app/mensagens.html`, `componentes.html`.
2. **axe DevTools** (extensão) → *Scan all of my page* em cada tela acima.
3. **Teclado**: navegar só com `Tab`/`Shift+Tab`/`Enter`/`Esc`, sem mouse, em um fluxo completo (gravar vídeo).
4. **Leitor de tela**: NVDA (Windows) ou VoiceOver (Mac) em **pelo menos uma tela** (sugestão: `app/atleta-perfil.html` ou `cadastro.html`).
5. **Contraste**: WebAIM Contrast Checker nos pares de cor de texto.

---

## 2. Checklist WCAG 2.1 AA

Legenda: ✅ atendido no código · 🔎 verificar com ferramenta · 📹 evidência manual.

### Perceptível
| Critério | Status | Evidência no projeto |
|---|---|---|
| 1.1.1 Conteúdo não textual (alt) | ✅ | Toda `<img>` tem `alt`; imagens decorativas usam `alt=""`/`aria-hidden="true"`; ícones SVG decorativos com `aria-hidden`. |
| 1.3.1 Informação e relações | ✅ | HTML semântico (`header`, `nav`, `main`, `section`, `article`), headings hierárquicos, `label`/`for` nos campos, `aria-labelledby` em seções. |
| 1.3.4 Orientação | ✅ | Layout funciona em retrato e paisagem (responsivo). |
| 1.4.3 Contraste (mínimo) | 🔎 | Paleta navy/dourado/papel com texto escuro; **verificar** os cinzas claros (`--ink-mute`, `--mist-dim`) — ver §4. |
| 1.4.4 Redimensionar texto | ✅ | Unidades `rem`; layout não quebra com zoom 200%. |
| 1.4.10 Reflow (360px) | ✅ | Responsivo até 360px sem rolagem horizontal (`overflow-x:hidden`, grids viram bloco, mídia full-bleed). |
| 1.4.11 Contraste não textual | ✅ | Anel de foco 3px, bordas de campo 1.5px, ícones com contraste. |

### Operável
| Critério | Status | Evidência |
|---|---|---|
| 2.1.1 Teclado | ✅ | Tudo interativo é `a`/`button`/campo nativo; modais e abrir conversa via `:target` (sem armadilha de JS). |
| 2.1.2 Sem armadilha de teclado | ✅ | Nenhum captura de foco; `Esc`/links de fechar saem dos modais. |
| 2.4.1 Pular blocos | ✅ | `.skip-link` ("Pular para o conteúdo") em todas as páginas → `#conteudo`. |
| 2.4.2 Página com título | ✅ | `<title>` único e descritivo por página. |
| 2.4.3 Ordem de foco | ✅ | Ordem do DOM = ordem visual lógica. |
| 2.4.4 Finalidade do link | ✅ | Links com texto claro ou `aria-label` (ex.: logo "ScoutX, início", ícones de ação com `aria-label`). |
| 2.4.7 Foco visível | ✅ | `:focus-visible` **global** (`base.css`): `outline:3px solid var(--focus-ring)`. Único `outline:none` (campos) tem `box-shadow` substituto. |
| 2.5.3 Rótulo no nome | ✅ | Texto visível dos botões = nome acessível. |

### Compreensível
| Critério | Status | Evidência |
|---|---|---|
| 3.1.1 Idioma da página | ✅ | `<html lang="pt-br">` em todas as páginas. |
| 3.2.3 Navegação consistente | ✅ | Barra de navegação igual em cada persona (ordem padronizada). |
| 3.2.4 Identificação consistente | ✅ | Mesmos componentes com mesma aparência/rótulo em todo o site. |
| 3.3.1 Identificação de erro | ✅ | Estado `error` do campo: `.field--error` + `.field__error` + `aria-invalid` + `aria-describedby` (ver `componentes.html`). |
| 3.3.2 Rótulos ou instruções | ✅ | Todo campo tem `label`; dicas via `.field__hint`. |

### Robusto
| Critério | Status | Evidência |
|---|---|---|
| 4.1.2 Nome, função, valor | ✅ | Elementos nativos + `aria-current="page"`, `aria-selected`, `aria-pressed`, `aria-hidden` onde aplicável. |
| 4.1.3 Mensagens de status | 🔎 | Avisos em `.alert`/`.auth-note`; se houver feedback dinâmico, usar `aria-live` (não há JS nesta sprint). |

---

## 3. Tabela de violações [RODAR]

Preencher após rodar Lighthouse + axe. Modelo:

| # | Ferramenta | Tela | Violação (regra WCAG) | Gravidade | Status | Correção / Justificativa |
|---|---|---|---|---|---|---|
| 1 | axe | … | … | crítica/séria/moderada | corrigido / aberto | … |
| 2 | Lighthouse | … | … | … | … | … |

> Violações não corrigidas são aceitas **com justificativa** (ex.: limitação de protótipo estático sem backend).

---

## 4. Contraste — pares a verificar [RODAR]

Rodar no WebAIM Contrast Checker (meta AA: 4.5:1 texto normal, 3:1 texto grande/UI):

| Texto | Fundo | Onde | Observação |
|---|---|---|---|
| `--ink` (#16120B) | `--paper` (#F4EFE3) | corpo | tende a passar folgado |
| `--ink-mute` | `--paper` | dicas, metadados | **verificar** (cinza claro é o ponto de risco) |
| `--mist` / `--mist-dim` | `--navy` | textos sobre navy | **verificar** os mais claros |
| `--ouro-dk` | `--paper` | rótulos dourados | verificar |
| #fff | `--ouro` (botão dourado) | `.btn--gold` | verificar (texto navy no dourado é melhor — já usamos navy-900) |

Se algum par reprovar, escurecer o tom (ex.: subir `--ink-mute`/`--mist-dim`) — ajuste de uma variável no `tokens.css`.

---

## 5. Teste por teclado [📹 RODAR — vídeo]

Roteiro a gravar (sem mouse):
1. `Tab` na landing → usar o **skip-link** → pular pro conteúdo.
2. `Tab` até "Sou Atleta" → `Enter` → cadastro.
3. Percorrer os campos com `Tab` (ver o **anel de foco** em cada um), abrir o `select` com teclado.
4. Entrar no app, navegar a barra com `Tab`, abrir uma conversa (mobile) e **voltar**, tudo por teclado.
- **Confirmar:** foco sempre visível, ordem lógica, nada inacessível só por mouse.

---

## 6. Teste com leitor de tela [RODAR — relato]

Tela sugerida: `app/atleta-perfil.html` (ou `cadastro.html`).
Relatar:
- Os **landmarks** são anunciados (cabeçalho, navegação, principal)?
- Os **headings** dão a estrutura (h1 → h2 → h3)?
- As **imagens** decorativas são ignoradas e as informativas têm descrição útil?
- Os **campos** anunciam rótulo, obrigatoriedade e erro?
- O **skip-link** funciona?

---

## 7. Resumo

- **Já implementado:** foco visível global, skip-link, HTML semântico, landmarks, headings, `lang`, labels, estados de erro, responsividade a 360px, navegação consistente, `alt` em todas as imagens.
- **A executar/colar:** prints do Lighthouse (≥90), scan do axe, tabela de violações, verificação de contraste, vídeo de teclado e relato do leitor de tela.
