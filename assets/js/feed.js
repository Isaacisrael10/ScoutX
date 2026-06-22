/* =====================================================================
   ScoutX · feed.js  (Web Development)
   Interações sociais do feed do atleta: votar num lance, seguir atletas
   e alternar as abas (Para você / Seguindo / Em alta). Demonstra escuta
   de eventos, condicionais, laços e manipulação dinâmica do DOM.
   ===================================================================== */
(function () {
  "use strict";

  const feed = document.querySelector(".feed-col");
  if (!feed) return;

  const posts = Array.from(feed.querySelectorAll(".igpost"));

  // ---- VOTAR ----------------------------------------------------------
  posts.forEach((post) => {
    const botao = post.querySelector(".igact--vote");
    const contador = post.querySelector(".igbar__metric span b"); // 1º <b> = votos
    if (!botao || !contador) return;

    const textoOriginal = contador.textContent;          // ex.: "1,9 mil"
    const base = parseVotos(textoOriginal);
    let votado = false;

    botao.addEventListener("click", () => {
      votado = !votado;
      botao.classList.toggle("is-voted", votado);
      botao.setAttribute("aria-pressed", votado ? "true" : "false");

      // ao votar mostra o número exato (+1); ao desfazer, volta ao original
      contador.textContent = votado ? (base + 1).toLocaleString("pt-BR") : textoOriginal;

      // pisca o contador (feedback visual)
      const alvo = contador.parentElement;
      alvo.classList.remove("is-live-update");
      void alvo.offsetWidth;
      alvo.classList.add("is-live-update");

      if (votado) ScoutX.toast("Voto computado! Você ajuda a revelar o talento.", "ok", 1800);
    });
  });

  // converte "1,9 mil" -> 1900 ; "850" -> 850
  function parseVotos(t) {
    t = t.trim().toLowerCase();
    if (t.includes("mil")) return Math.round(parseFloat(t.replace("mil", "").replace(",", ".")) * 1000);
    return parseInt(t.replace(/\D/g, ""), 10) || 0;
  }

  // ---- SEGUIR ---------------------------------------------------------
  feed.querySelectorAll(".ig-head__follow").forEach((btn) => {
    btn.addEventListener("click", () => {
      const seguindo = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", seguindo ? "false" : "true");
      btn.classList.toggle("is-following", !seguindo);
      btn.textContent = seguindo ? "Seguir" : "Seguindo";
      // marca o post p/ a aba "Seguindo"
      const post = btn.closest(".igpost");
      if (post) post.dataset.following = seguindo ? "" : "1";
    });
  });

  // ---- ABAS -----------------------------------------------------------
  const abas = Array.from(feed.querySelectorAll(".feed-tab"));

  function aplicarAba(rotulo) {
    let visiveis = 0;
    posts.forEach((p) => {
      let mostrar = true;
      if (rotulo === "seguindo") mostrar = p.dataset.following === "1";
      else if (rotulo === "em alta") mostrar = !!p.querySelector(".tag-hot");
      // "para você" e "minha região" mostram tudo
      p.style.display = mostrar ? "" : "none";
      if (mostrar) visiveis++;
    });
    vazio(visiveis === 0, rotulo);
  }

  function vazio(mostrar, rotulo) {
    let m = document.getElementById("feed-empty");
    if (mostrar) {
      if (!m) {
        m = document.createElement("p");
        m.id = "feed-empty";
        m.className = "filter-empty";
        feed.appendChild(m);
      }
      m.textContent = rotulo === "seguindo"
        ? "Você ainda não segue ninguém. Toque em “Seguir” num atleta."
        : "Nada por aqui ainda.";
    } else if (m) {
      m.remove();
    }
  }

  abas.forEach((aba) => {
    aba.addEventListener("click", () => {
      abas.forEach((x) => x.setAttribute("aria-selected", "false"));
      aba.setAttribute("aria-selected", "true");
      aplicarAba(aba.textContent.trim().toLowerCase());
    });
  });
})();
