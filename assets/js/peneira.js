/* =====================================================================
   ScoutX · peneira.js  (Web Development)
   Página da peneira: contagem regressiva até o prazo (setInterval/BOM) e
   inscrição (atualiza contadores e estado do botão). Demonstra BOM,
   condicionais e manipulação do DOM.
   ===================================================================== */
(function () {
  "use strict";

  // ---- contagem regressiva até o prazo de inscrição ----
  const prazoEl = Array.from(document.querySelectorAll(".facts .fact-row .v"))
    .find((v) => /encerra/i.test(v.textContent));

  if (prazoEl) {
    const alvo = new Date(2026, 5, 27, 23, 59, 59); // 27/06/2026 (mês 5 = junho)
    let timer;
    function tick() {
      const diff = alvo - new Date();
      if (diff <= 0) { prazoEl.textContent = "inscrições encerradas"; clearInterval(timer); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor(diff / 3600000) % 24;
      const m = Math.floor(diff / 60000) % 60;
      const s = Math.floor(diff / 1000) % 60;
      prazoEl.textContent = "encerra em " + d + "d " + h + "h " + m + "m " + s + "s";
    }
    tick();
    timer = setInterval(tick, 1000);
  }

  // ---- inscrição (mantém o modal de confirmação e atualiza os números) ----
  const btn = document.querySelector('.facts a[href="#modal-inscricao"]');
  if (btn) {
    let inscrito = false;
    btn.addEventListener("click", () => {
      if (inscrito) return;          // reabre o modal, mas não conta de novo
      inscrito = true;
      ajustarStat("inscritos", +1);  // 312 -> 313
      ajustarStat("vagas", -1);      // 50 -> 49
      btn.textContent = "Inscrito ✓";
      btn.classList.add("is-enrolled");
      ScoutX.toast("Inscrição registrada! Seu responsável foi notificado.", "ok", 2600);
    });
  }

  function ajustarStat(rotulo, delta) {
    const stat = Array.from(document.querySelectorAll(".pen-stat"))
      .find((s) => s.querySelector("span") && new RegExp(rotulo, "i").test(s.querySelector("span").textContent));
    if (!stat) return;
    const b = stat.querySelector("b");
    const n = parseInt((b.textContent || "").replace(/\D/g, ""), 10);
    if (!isNaN(n)) b.textContent = String(n + delta);
  }
})();
