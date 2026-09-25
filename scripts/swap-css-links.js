// Troca o bloco de <link> pros CSS autorais antigos por UM link pro
// tailwind.css compilado, em todos os HTMLs do projeto.
const fs = require("fs");
const glob = require("child_process").execSync;

const files = glob('grep -rl "tokens.css\\|base.css\\|components.css\\|app.css\\|landing.css" --include="*.html" .', { cwd: __dirname + "/..", encoding: "utf8" })
  .split("\n").map((s) => s.trim()).filter(Boolean);

const re = /(<link rel="stylesheet" href="(\.\.\/)?assets\/css\/(tokens|base|components|app|landing|interactive)\.css(\?v=\d+)?">\n?)+/g;

for (const rel of files) {
  const p = require("path").join(__dirname, "..", rel);
  const html = fs.readFileSync(p, "utf8");
  const prefix = rel.startsWith("./app/") ? "../" : "";
  const replacement = `<link rel="stylesheet" href="${prefix}assets/css/tailwind.css">\n`;
  const next = html.replace(re, replacement);
  if (next === html) {
    console.log("SEM MUDANCA (padrao nao bateu):", rel);
  } else {
    fs.writeFileSync(p, next);
    console.log("ok:", rel);
  }
}
