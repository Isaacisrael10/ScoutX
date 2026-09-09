/* =====================================================================
   ScoutX · ui.js  (Web Development)
   Utilitários compartilhados por todos os scripts: atalhos de seleção
   e um "toast" (notificação não-bloqueante) feito por manipulação do DOM.
   Exposto em window.ScoutX para os demais módulos usarem.
   ===================================================================== */
(function () {
  "use strict";

  // Atalhos de seleção de elementos (querySelector / querySelectorAll)
  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /**
   * Mostra um aviso flutuante criado dinamicamente no DOM.
   * @param {string} msg  Texto da notificação
   * @param {string} type "ok" | "alert" | "" (cor da barra lateral)
   * @param {number} ms   Tempo na tela (BOM: setTimeout)
   */
  function toast(msg, type, ms) {
    let t = $(".toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "toast";
      t.setAttribute("role", "status");
      t.setAttribute("aria-live", "polite");
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.className = "toast" + (type ? " toast--" + type : "");
    void t.offsetWidth;            // força reflow p/ reiniciar a animação
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove("show"), ms || 3200);
  }

  // Publica os utilitários no escopo global
  window.ScoutX = { $, $$, toast };
})();
