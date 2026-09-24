/* =====================================================================
   ScoutX · criar-post.js  (Web Development)
   Modal "Novo lance": escolher vídeo (FileReader/Object URL), legenda,
   tags do lance, e publicar. Insere um post real no topo do feed
   (atleta-feed.html) ou um tile no grid de vídeos (atleta-perfil.html).
   Modal abre/fecha via :target (app.css); este script só cuida do
   conteúdo de dentro dele.
   ===================================================================== */
(function () {
  "use strict";

  const modal = document.getElementById("criar-post");
  if (!modal) return;

  const fileInput = document.getElementById("cp-file");
  const drop = document.getElementById("cp-drop");
  const preview = document.getElementById("cp-preview");
  const video = document.getElementById("cp-video");
  const swapBtn = document.getElementById("cp-swap");
  const caption = document.getElementById("cp-caption");
  const tagsWrap = document.getElementById("cp-tags");
  const submitBtn = document.getElementById("cp-submit");

  let objectUrl = null;

  function reset() {
    fileInput.value = "";
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = null;
    video.removeAttribute("src");
    preview.hidden = true;
    drop.hidden = false;
    caption.value = "";
    tagsWrap.querySelectorAll(".chip-toggle").forEach((c) => c.setAttribute("aria-pressed", "false"));
    submitBtn.disabled = true;
  }

  function escolherArquivo(f) {
    if (!f) return;
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = URL.createObjectURL(f);
    video.src = objectUrl;
    drop.hidden = true;
    preview.hidden = false;
    submitBtn.disabled = false;
  }

  fileInput.addEventListener("change", () => escolherArquivo(fileInput.files && fileInput.files[0]));
  if (swapBtn) swapBtn.addEventListener("click", () => fileInput.click());

  // drag & drop no dropzone
  ["dragover", "dragenter"].forEach((ev) =>
    drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add("is-drag"); })
  );
  ["dragleave", "drop"].forEach((ev) =>
    drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove("is-drag"); })
  );
  drop.addEventListener("drop", (e) => {
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) escolherArquivo(f);
  });

  tagsWrap.querySelectorAll(".chip-toggle").forEach((chip) => {
    chip.addEventListener("click", () => {
      chip.setAttribute("aria-pressed", chip.getAttribute("aria-pressed") === "true" ? "false" : "true");
    });
  });

  function tagsAtivas() {
    return Array.from(tagsWrap.querySelectorAll('.chip-toggle[aria-pressed="true"]')).map((c) => c.textContent.trim());
  }

  // fechar o modal por JS (independente do :target, evita corrida com o hash)
  function fechar() {
    modal.classList.add("js-closed");
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
  // reabrir via :target (clique no composer/"Enviar vídeo") tem que soltar o travamento
  window.addEventListener("hashchange", () => {
    if (window.location.hash === "#criar-post") modal.classList.remove("js-closed");
  });
  modal.querySelector(".modal__overlay").addEventListener("click", (e) => { e.preventDefault(); fechar(); reset(); });
  modal.querySelector(".modal__close").addEventListener("click", (e) => { e.preventDefault(); fechar(); reset(); });

  const votoSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.3l3.9 2.9-1.5 4.6H9.6L8.1 10.2z"/></svg>';
  const comentarSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 01-8.5 8.5 8.5 8.5 0 01-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 01-.9-3.8A8.4 8.4 0 0112.5 3 8.4 8.4 0 0121 11.5z"/></svg>';
  const compartilharSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.4l6.8 4M15.4 6.6l-6.8 4"/></svg>';
  const seloSVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#E0A92E"/><path d="M8 12.4l2.6 2.6 5-5.6" fill="none" stroke="#0B2A6B" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function wireVoto(btn, contadorEl) {
    let votado = false;
    btn.addEventListener("click", () => {
      votado = !votado;
      btn.classList.toggle("is-voted", votado);
      btn.setAttribute("aria-pressed", votado ? "true" : "false");
      contadorEl.textContent = votado ? "1" : "0";
      if (votado) ScoutX.toast("Voto computado! Você ajuda a revelar o talento.", "ok", 1800);
    });
  }

  function publicarNoFeed(feedCol, tags, texto) {
    const article = document.createElement("article");
    article.className = "igpost is-new";
    article.innerHTML =
      '<header class="ig-head">' +
        '<span class="ig-head__av"><img src="../assets/img/craque-hero.jpg" alt="Gabriel Pereira"></span>' +
        '<span class="ig-head__id">' +
          '<span class="ig-head__name">Gabriel Pereira ' + seloSVG + '</span>' +
          '<span class="ig-head__meta">ATA · Recife/PE · agora</span>' +
        '</span>' +
        '<span class="ig-head__idx"><b>92</b> Índice</span>' +
      '</header>' +
      '<div class="igpost__media">' +
        '<video src="' + objectUrl + '" muted loop autoplay playsinline controls style="width:100%;height:100%;object-fit:cover;display:block;background:#000"></video>' +
      '</div>' +
      '<div class="igbar">' +
        '<div class="igbar__metric"><span><b class="cp-votos">0</b> votos</span><span><b>1</b> view</span></div>' +
        '<button class="igact igact--vote" aria-label="Votar neste lance">' + votoSVG + '</button>' +
        '<button class="igact" aria-label="Comentar">' + comentarSVG + '</button>' +
        '<button class="igact" aria-label="Compartilhar">' + compartilharSVG + '</button>' +
      '</div>' +
      '<div class="post-body">' +
        '<p class="post-cap"><b>Gabriel Pereira</b> ' + (texto || "Novo lance") + '</p>' +
        '<div class="igtags">' + (tags.length ? tags.map((t) => '<span class="tag-c">' + t + '</span>').join("") : '<span class="tag-c" style="opacity:.7">Aguardando a comunidade avaliar</span>') + '</div>' +
        '<button class="post-analises">Ver as análises da comunidade</button>' +
      '</div>';

    feedCol.insertBefore(article, feedCol.querySelector(".igpost"));
    wireVoto(article.querySelector(".igact--vote"), article.querySelector(".cp-votos"));
    article.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function publicarNoGrid(grid, tags, texto) {
    const tile = document.createElement("div");
    tile.className = "media-tile is-new";
    tile.innerHTML =
      '<video src="' + objectUrl + '" muted loop autoplay playsinline style="width:100%;height:100%;object-fit:cover"></video>' +
      '<span class="media-tile__eng"><span aria-label="1 visualização"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>1</span></span>' +
      '<span class="media-tile__tag">' + (tags[0] || "Novo lance") + ' · agora</span>';
    grid.insertBefore(tile, grid.firstElementChild);
    tile.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  submitBtn.addEventListener("click", () => {
    if (submitBtn.disabled || !objectUrl) return;
    const tags = tagsAtivas();
    const texto = caption.value.trim();
    const feedCol = document.querySelector(".feed-col");
    const grid = document.querySelector(".media-grid");
    const usedUrl = objectUrl;

    if (feedCol) publicarNoFeed(feedCol, tags, texto);
    else if (grid) publicarNoGrid(grid, tags, texto);

    objectUrl = null; // evita revogar a URL que acabou de entrar no DOM
    fechar();
    fileInput.value = "";
    video.removeAttribute("src");
    preview.hidden = true;
    drop.hidden = false;
    caption.value = "";
    tagsWrap.querySelectorAll(".chip-toggle").forEach((c) => c.setAttribute("aria-pressed", "false"));
    submitBtn.disabled = true;

    ScoutX.toast("Lance publicado! Agora é com a comunidade avaliar.", "ok", 2600);
  });
})();
