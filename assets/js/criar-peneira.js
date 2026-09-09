/* =====================================================================
   ScoutX · criar-peneira.js  (Web Development)
   Pré-visualização ao vivo da peneira: enquanto o recrutador preenche o
   formulário (texto, selects, chips, data, capa), o card de prévia se
   atualiza na hora. Demonstra escuta de eventos de input/change, chips
   (single/multi), FileReader e manipulação do DOM.
   ===================================================================== */
(function () {
  "use strict";

  const grid = document.querySelector(".create-grid");
  if (!grid) return;

  const $ = (id) => document.getElementById(id);
  const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho",
                 "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

  function dataFmt(v) {
    if (!v) return "a definir";
    const p = v.split("-");
    return parseInt(p[2], 10) + " de " + (meses[parseInt(p[1], 10) - 1] || "");
  }
  function chipsAtivos(grupo) {
    return Array.from(document.querySelectorAll('[data-chips="' + grupo + '"] .chip-toggle'))
      .filter((c) => c.getAttribute("aria-pressed") === "true")
      .map((c) => c.textContent.trim());
  }

  function atualizar() {
    const nome = $("nome"), cat = $("cat"), data = $("data"), prazo = $("prazo"), vagas = $("vagas");
    if ($("pv-title") && nome) $("pv-title").textContent = nome.value || "Nome da peneira";

    const pos = chipsAtivos("pos");
    if ($("pv-cat") && cat) $("pv-cat").textContent = cat.value + (pos.length ? " · " + pos.join("/") : "");

    const formato = chipsAtivos("formato")[0] || "Presencial";
    if ($("pv-badge")) $("pv-badge").textContent = formato;

    if ($("pv-data") && data) $("pv-data").textContent = dataFmt(data.value);
    if ($("pv-prazo") && prazo) $("pv-prazo").textContent = dataFmt(prazo.value);

    const alcance = chipsAtivos("alcance")[0] || "Nacional";
    if ($("pv-vagas") && vagas) $("pv-vagas").textContent = (vagas.value || "0") + " · " + alcance;
  }

  // campos de texto/select/data/número
  ["nome", "cat", "data", "prazo", "vagas"].forEach((id) => {
    const el = $(id);
    if (el) { el.addEventListener("input", atualizar); el.addEventListener("change", atualizar); }
  });

  // chips: single-select (radio) por padrão; multi quando data-multi="true"
  document.querySelectorAll(".chip-set").forEach((set) => {
    const multi = set.getAttribute("data-multi") === "true";
    set.querySelectorAll(".chip-toggle").forEach((chip) => {
      chip.addEventListener("click", () => {
        if (multi) {
          chip.setAttribute("aria-pressed", chip.getAttribute("aria-pressed") === "true" ? "false" : "true");
        } else {
          set.querySelectorAll(".chip-toggle").forEach((c) => c.setAttribute("aria-pressed", "false"));
          chip.setAttribute("aria-pressed", "true");
        }
        atualizar();
      });
    });
  });

  // capa: lê o arquivo e mostra na prévia (BOM/FileReader)
  const capa = $("capa"), pvImg = $("pv-img");
  if (capa && pvImg) {
    capa.addEventListener("change", () => {
      const f = capa.files && capa.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = (e) => { pvImg.src = e.target.result; };
      r.readAsDataURL(f);
      ScoutX.toast("Capa atualizada na prévia.", "ok", 1600);
    });
  }

  // publicar
  const publicar = document.querySelector(".create-actions .btn--gold");
  if (publicar) {
    publicar.addEventListener("click", () => {
      const nome = $("nome");
      ScoutX.toast("Peneira “" + ((nome && nome.value) || "sem nome") + "” publicada!", "ok", 2600);
    });
  }

  atualizar();   // estado inicial coerente
})();
