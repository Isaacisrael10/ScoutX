/* =====================================================================
   ScoutX · filters.js  (Web Development)
   Filtros funcionais para Rankings e Peneiras. Lê os <select> da barra
   .rank-filters e mostra/esconde os itens marcados com [data-filter-item]
   conforme os atributos data-cat / data-regiao / data-formato.
   Demonstra: escuta de eventos (change), laços, condicionais e DOM.
   ===================================================================== */
(function () {
  "use strict";

  const barras = document.querySelectorAll(".rank-filters");
  if (!barras.length) return;

  const itens = Array.from(document.querySelectorAll("[data-filter-item]"));
  if (!itens.length) return;

  // mapeia o rótulo do select para a dimensão (data-*) do item
  const dimPorRotulo = {
    "categoria": "cat",
    "região": "regiao",
    "regiao": "regiao",
    "formato": "formato",
  };

  const selects = Array.from(document.querySelectorAll(".rank-filters select"));

  // Lê os filtros ativos (ignora "todas/todos" = primeira opção e Período)
  function filtrosAtivos() {
    const f = {};
    selects.forEach((sel) => {
      const rotulo = (sel.getAttribute("aria-label") || "").toLowerCase();
      const dim = dimPorRotulo[rotulo];
      if (!dim) return;                 // ex.: "Período" não filtra item
      if (sel.selectedIndex === 0) return; // primeira opção = sem filtro
      f[dim] = sel.options[sel.selectedIndex].text.trim().toLowerCase();
    });
    return f;
  }

  function aplicar() {
    const f = filtrosAtivos();
    let visiveis = 0;

    itens.forEach((it) => {
      let ok = true;
      for (const dim in f) {
        const val = (it.dataset[dim] || "").toLowerCase();
        // item sem valor nessa dimensão (ex.: peneira nacional/online) entra sempre
        if (val && !f[dim].includes(val) && !val.includes(f[dim])) {
          ok = false;
          break;
        }
      }
      it.style.display = ok ? "" : "none";
      if (ok) visiveis++;
    });

    mostrarVazio(visiveis === 0);
    ScoutX.toast(visiveis + (visiveis === 1 ? " resultado" : " resultados"), "ok", 1600);
  }

  // Mensagem de "nenhum resultado" (manipulação do DOM)
  function mostrarVazio(mostrar) {
    let m = document.getElementById("filter-empty");
    if (mostrar && !m) {
      m = document.createElement("p");
      m.id = "filter-empty";
      m.className = "filter-empty";
      m.textContent = "Nenhum resultado para esses filtros.";
      itens[0].parentElement.appendChild(m);
    } else if (!mostrar && m) {
      m.remove();
    }
  }

  selects.forEach((sel) => sel.addEventListener("change", aplicar));
})();
