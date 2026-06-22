/* =====================================================================
   ScoutX · feed.js  (Web Development)
   Interações sociais do feed: votar, seguir e filtrar (abas + chips de
   posição + select de região, quando existirem na lateral). Demonstra
   escuta de eventos, condicionais, laços e manipulação dinâmica do DOM.
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
      contador.textContent = votado ? (base + 1).toLocaleString("pt-BR") : textoOriginal;

      const alvo = contador.parentElement;               // pisca o contador
      alvo.classList.remove("is-live-update");
      void alvo.offsetWidth;
      alvo.classList.add("is-live-update");

      if (votado) ScoutX.toast("Voto computado! Você ajuda a revelar o talento.", "ok", 1800);
    });
  });

  function parseVotos(t) {                               // "1,9 mil" -> 1900
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
      const post = btn.closest(".igpost");
      if (post) post.dataset.following = seguindo ? "" : "1";
      aplicarFiltros();   // se estiver na aba "Seguindo", atualiza na hora
    });
  });

  // ---- ADICIONAR AO RADAR (feed do olheiro) ---------------------------
  feed.querySelectorAll('.igact[aria-label="Adicionar ao radar"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const noRadar = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", noRadar ? "false" : "true");
      btn.classList.toggle("is-radar", !noRadar);
      ScoutX.toast(noRadar ? "Removido do radar." : "Adicionado ao seu radar.", noRadar ? "alert" : "ok", 1600);
    });
  });

  // ---- FILTROS (abas + posição + região) ------------------------------
  const abas = Array.from(feed.querySelectorAll(".feed-tab"));
  const discover = feed.closest(".discover") || document;
  const chips = Array.from(discover.querySelectorAll(".rail .chip-toggle"));
  const regiaoSel = discover.querySelector(".rail .filter-group select");

  function abaAtiva() {
    const a = abas.find((x) => x.getAttribute("aria-selected") === "true");
    return a ? a.textContent.trim().toLowerCase() : "para você";
  }
  function posicoesAtivas() {
    return chips.filter((c) => c.getAttribute("aria-pressed") === "true")
                .map((c) => c.textContent.trim().toLowerCase());
  }
  function regiaoAtiva() {
    if (!regiaoSel || regiaoSel.selectedIndex === 0) return "";
    return regiaoSel.options[regiaoSel.selectedIndex].text.trim().toLowerCase();
  }

  function aplicarFiltros() {
    const aba = abaAtiva();
    const poss = posicoesAtivas();
    const reg = regiaoAtiva();
    let visiveis = 0;

    posts.forEach((p) => {
      let ok = true;
      if (aba === "seguindo") ok = p.dataset.following === "1";
      else if (aba === "em alta") ok = !!p.querySelector(".tag-hot");

      if (ok && poss.length) ok = poss.includes((p.dataset.pos || "").toLowerCase());
      if (ok && reg) ok = (p.dataset.regiao || "").toLowerCase() === reg;

      p.style.display = ok ? "" : "none";
      if (ok) visiveis++;
    });

    vazio(visiveis === 0, aba);
  }

  function vazio(mostrar, aba) {
    let m = document.getElementById("feed-empty");
    if (mostrar) {
      if (!m) {
        m = document.createElement("p");
        m.id = "feed-empty";
        m.className = "filter-empty";
        feed.appendChild(m);
      }
      m.textContent = aba === "seguindo"
        ? "Você ainda não segue ninguém. Toque em “Seguir” num atleta."
        : "Nenhum atleta com esses filtros.";
    } else if (m) {
      m.remove();
    }
  }

  abas.forEach((aba) => {
    aba.addEventListener("click", () => {
      abas.forEach((x) => x.setAttribute("aria-selected", "false"));
      aba.setAttribute("aria-selected", "true");
      aplicarFiltros();
    });
  });
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const on = chip.getAttribute("aria-pressed") === "true";
      chip.setAttribute("aria-pressed", on ? "false" : "true");
      aplicarFiltros();
    });
  });
  if (regiaoSel) regiaoSel.addEventListener("change", aplicarFiltros);
})();
