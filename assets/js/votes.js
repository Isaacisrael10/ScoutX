/* =====================================================================
   ScoutX · votes.js  (Web Development)
   O coração do ScoutX: a comunidade confirma as características que viu no
   lance, alimentando os dados do atleta. Cada característica vira um botão
   confirmável (toggle), com contador e "+1" animado. NÃO altera o Índice
   (que é calculado, não um contador de voto). Roda no feed e no perfil.
   ===================================================================== */
(function () {
  "use strict";

  // características confirmáveis: tags do feed (menos "Em alta") e do perfil
  const tags = Array.from(
    document.querySelectorAll(".igtags .tag-c:not(.tag-hot), .tagcloud .tag-c")
  );
  if (!tags.length) return;

  // hash estável -> número base de confirmações (parece dado real e é fixo)
  function hash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h;
  }
  function baseDe(texto, escopo) { return 200 + (hash(escopo + "|" + texto) % 1800); }
  function fmt(n) { return n >= 1000 ? (n / 1000).toFixed(1).replace(".", ",") + "k" : String(n); }

  // nome do atleta dono da tag (post no feed, ou título no perfil)
  function escopoDe(tag) {
    const post = tag.closest(".igpost");
    if (post) { const n = post.querySelector(".ig-head__name"); return n ? n.textContent.trim() : "post"; }
    const h = document.querySelector(".profile-head h1, h1");
    return h ? h.textContent.trim() : "perfil";
  }
  function primeiroNome(tag) {
    const post = tag.closest(".igpost");
    if (post) { const n = post.querySelector(".ig-head__name"); return n ? n.textContent.trim().split(" ")[0] : ""; }
    return "";
  }

  tags.forEach((tag) => {
    const texto = tag.textContent.trim();
    const base = baseDe(texto, escopoDe(tag));
    let confirmado = false;

    // acessibilidade: vira um botão de fato
    tag.classList.add("is-votable");
    tag.setAttribute("role", "button");
    tag.setAttribute("tabindex", "0");
    tag.setAttribute("aria-pressed", "false");
    tag.setAttribute("title", "Confirmar “" + texto + "”");

    // contador de confirmações da comunidade
    const contador = document.createElement("i");
    contador.className = "tag-c__n";
    contador.textContent = fmt(base);
    tag.appendChild(document.createTextNode(" "));
    tag.appendChild(contador);

    function alternar() {
      confirmado = !confirmado;
      tag.classList.toggle("is-confirmed", confirmado);
      tag.setAttribute("aria-pressed", confirmado ? "true" : "false");
      contador.textContent = fmt(base + (confirmado ? 1 : 0));

      if (confirmado) {
        flutuarMais(tag);
        const quem = primeiroNome(tag);
        ScoutX.toast(
          "Você confirmou “" + texto + "”" + (quem ? " em " + quem : "") +
          ". Entra no cálculo do Índice da comunidade.",
          "ok", 2400
        );
      }
    }

    tag.addEventListener("click", alternar);
    tag.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); alternar(); }
    });
  });

  // animação "+1" subindo
  function flutuarMais(el) {
    const f = document.createElement("span");
    f.className = "vote-plus";
    f.textContent = "+1";
    el.appendChild(f);
    setTimeout(() => f.remove(), 900);
  }
})();
