/* =====================================================================
   ScoutX · peneira.js
   Página da peneira: contagem regressiva real até o fim das inscrições
   (data fixa em data-countdown). A inscrição em si é o fluxo concierge
   em inscricao-peneira.html (concierge.js).
   ===================================================================== */
(function () {
  "use strict";
  const el = document.querySelector("[data-countdown]");
  if (!el) return;
  const alvo = new Date(el.dataset.countdown);
  const btn = document.querySelector('a[href^="inscricao-peneira.html"]');
  let timer;
  function tick() {
    const diff = alvo - new Date();
    if (diff <= 0) {
      el.textContent = "inscrições encerradas";
      if (btn) {
        btn.removeAttribute("href");
        btn.setAttribute("aria-disabled", "true");
        btn.textContent = "Inscrições encerradas";
      }
      clearInterval(timer);
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;
    el.textContent = "encerra em " + d + "d " + h + "h " + m + "min";
  }
  tick();
  timer = setInterval(tick, 30000);
})();
