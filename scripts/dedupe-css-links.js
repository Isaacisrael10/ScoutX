const fs = require("fs");
const path = require("path");
const glob = require("child_process").execSync;

const files = glob('grep -rl "tailwind.css" --include="*.html" .', { cwd: path.join(__dirname, ".."), encoding: "utf8" })
  .split("\n").map((s) => s.trim()).filter(Boolean);

const re = /(<link rel="stylesheet" href="((\.\.\/)?assets\/css\/tailwind\.css)">\n\s*)+/g;

for (const rel of files) {
  const p = path.join(__dirname, "..", rel);
  const html = fs.readFileSync(p, "utf8");
  const next = html.replace(re, (m, _g1, href) => `<link rel="stylesheet" href="${href}">\n`);
  if (next !== html) {
    fs.writeFileSync(p, next);
    console.log("dedup:", rel);
  }
}
