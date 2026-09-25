// Migra os arquivos CSS autorais do ScoutX para Tailwind v4.
// Estrategia: cores, fontes e escala tipografica viram tokens reais do
// Tailwind (@theme) -- gerando utilitarios (bg-navy, text-ouro, font-display...)
// e variaveis CSS reais (--color-navy) usadas por TODO o CSS legado.
// Espacamento/raio/sombra/transicao continuam como custom properties (nao
// colidem com a escala numerica padrao do Tailwind) -- decisao documentada
// no README.
const fs = require("fs");
const path = require("path");

const CSS_DIR = path.join(__dirname, "..", "assets", "css");

// Ordem importa: nomes mais longos primeiro, pra nao corromper "--navy-900"
// ao tentar substituir soh "--navy".
const RENAMES = [
  ["--navy-900", "--color-navy-900"],
  ["--navy-800", "--color-navy-800"],
  ["--navy-700", "--color-navy-700"],
  ["--navy-line", "--color-navy-line"],
  ["--navy-soft", "--color-navy-soft"],
  ["--navy", "--color-navy"],
  ["--ouro-dk", "--color-ouro-dk"],
  ["--ouro-lt", "--color-ouro-lt"],
  ["--ouro-soft", "--color-ouro-soft"],
  ["--ouro", "--color-ouro"],
  ["--paper-2", "--color-paper-2"],
  ["--paper-line", "--color-paper-line"],
  ["--paper", "--color-paper"],
  ["--ink-soft", "--color-ink-soft"],
  ["--ink-mute", "--color-ink-mute"],
  ["--ink", "--color-ink"],
  ["--on-navy", "--color-on-navy"],
  ["--mist-dim", "--color-mist-dim"],
  ["--mist", "--color-mist"],
  ["--verde-dk", "--color-verde-dk"],
  ["--verde-soft", "--color-verde-soft"],
  ["--verde", "--color-verde"],
  ["--amarelo", "--color-amarelo"],
  ["--vermelho-dk", "--color-vermelho-dk"],
  ["--vermelho-soft", "--color-vermelho-soft"],
  ["--vermelho", "--color-vermelho"],
  ["--focus-ring", "--color-focus-ring"],
  ["--display", "--font-display"],
  ["--ui", "--font-ui"],
  ["--stat", "--font-stat"],
  ["--body", "--font-body"],
  ["--logo", "--font-logo"],
  ["--fs-xs", "--text-xs"],
  ["--fs-sm", "--text-sm"],
  ["--fs-base", "--text-base"],
  ["--fs-md", "--text-md"],
  ["--fs-lg", "--text-lg"],
  ["--fs-xl", "--text-xl"],
  ["--fs-2xl", "--text-2xl"],
  ["--fs-3xl", "--text-3xl"],
  ["--fs-4xl", "--text-4xl"],
  ["--fw-medium", "--font-weight-medium"],
  ["--fw-semibold", "--font-weight-semibold"],
  ["--fw-bold", "--font-weight-bold"],
  ["--fw-extra", "--font-weight-extra"],
  ["--fw-black", "--font-weight-black"],
  ["--radius-sm", "--radius-sm"],
  ["--radius-md", "--radius-md"],
  ["--radius-lg", "--radius-lg"],
  ["--radius-pill", "--radius-pill"],
];

function renameTokens(css) {
  let out = css;
  for (const [from, to] of RENAMES) {
    // troca "var(--nome)" (e soh essa forma) preservando o resto da linha
    const re = new RegExp("var\\(" + from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\)", "g");
    out = out.replace(re, "var(" + to + ")");
  }
  return out;
}

const files = ["base.css", "components.css", "landing.css", "app.css", "interactive.css"];

const themeHeader = `@import "tailwindcss";

/* =====================================================================
   ScoutX · Tailwind v4 · tokens do design system (Sprint 1) como @theme.
   Gera utilitarios reais (bg-navy, text-ouro-lt, font-display, text-lg...)
   e expoe cada token como CSS var (--color-navy) consumida pelo CSS
   componentizado abaixo via @apply/var(). Espacamento, raio e sombra
   continuam como custom properties simples (nao remapeados pra escala
   numerica do Tailwind) -- ver README > "Tailwind & Design System".
   ===================================================================== */
@theme {
  --color-navy-900: #071B45;
  --color-navy-800: #0a2356;
  --color-navy: #0B2A6B;
  --color-navy-700: #0e3a86;
  --color-navy-line: #1b3f86;
  --color-navy-soft: #13357d;

  --color-ouro-dk: #A6781B;
  --color-ouro: #E0A92E;
  --color-ouro-lt: #F2C964;
  --color-ouro-soft: #fbf0d2;

  --color-paper: #F4EFE3;
  --color-paper-2: #EBE3D2;
  --color-paper-line: #ddd2bd;
  --color-ink: #16120B;
  --color-ink-soft: #4b4334;
  --color-ink-mute: #7a715f;

  --color-on-navy: #ffffff;
  --color-mist: #cdd8f1;
  --color-mist-dim: #92a4cc;

  --color-verde: #1FA05A;
  --color-verde-dk: #0E7A3D;
  --color-verde-soft: #e3f6ec;
  --color-amarelo: #FFCB05;
  --color-vermelho: #D12F2F;
  --color-vermelho-dk: #a82424;
  --color-vermelho-soft: #fde6e6;
  --color-focus-ring: #E0A92E;

  --font-display: "Archivo Expanded", "Archivo", "Segoe UI", sans-serif;
  --font-ui: "Archivo", "Segoe UI", sans-serif;
  --font-stat: "Saira Condensed", "Archivo", sans-serif;
  --font-body: "Inter", "Segoe UI", sans-serif;
  --font-logo: "Space Grotesk", "Archivo", sans-serif;

  --text-xs: .75rem;
  --text-sm: .875rem;
  --text-base: 1rem;
  --text-md: 1.125rem;
  --text-lg: 1.375rem;
  --text-xl: 1.75rem;
  --text-2xl: 2.5rem;
  --text-3xl: 3.5rem;
  --text-4xl: 5rem;

  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extra: 800;
  --font-weight-black: 900;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 14px;
  --radius-pill: 999px;
}

/* ---- escala nao remapeada pro Tailwind (ver README): espacamento,
   raio (alias antigo), sombra, transicao, medidas de layout ---- */
:root {
  --lh-tight: .98;
  --lh-normal: 1.6;

  --space-1: .25rem; --space-2: .5rem; --space-3: .75rem; --space-4: 1rem;
  --space-5: 1.5rem; --space-6: 2rem; --space-7: 3rem; --space-8: 4rem; --space-9: 6rem;

  --shadow-sm: 0 1px 3px rgba(7,27,69,.10);
  --shadow-md: 0 10px 28px rgba(7,27,69,.14);
  --shadow-lg: 0 30px 64px rgba(7,27,69,.30);

  --transition-fast: 120ms ease;
  --transition-base: 220ms cubic-bezier(.2,.7,.3,1);

  --container: 1200px;
  --header-h: 74px;
}

`;

// IMPORTANTE: nao envolvemos isso em @layer components. O Tailwind faz
// content-detection automatico e encontrou nomes como "bg-navy"/"card"/
// "grid" usados como classes no HTML -- que TAMBEM sao padroes validos de
// utilitario (bg-{cor}) e colidiam com nossas classes autorais dentro de
// @layer (utilities sempre vence @layer components na cascata). CSS fora
// de qualquer @layer tem prioridade sobre QUALQUER @layer, entao mantendo
// o CSS legado sem @layer garantimos que ele sempre vence -- sem precisar
// renomear classe nenhuma no HTML existente.
let body = "";
for (const file of files) {
  const raw = fs.readFileSync(path.join(CSS_DIR, file), "utf8");
  body += `\n/* ============================== ${file} ============================== */\n`;
  body += `${renameTokens(raw)}\n`;
}

fs.writeFileSync(path.join(CSS_DIR, "tailwind-input.css"), themeHeader + body);
console.log("tailwind-input.css gerado:", (themeHeader + body).length, "bytes");
