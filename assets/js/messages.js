/* =====================================================================
   ScoutX · messages.js  (Web Development)
   Envio de mensagens na conversa intermediada. Demonstra: escuta de
   eventos (clique e tecla Enter), condicionais (regra de segurança que
   bloqueia troca de contato pessoal, com alert() nativo), manipulação do
   DOM (nova bolha) e BOM (setTimeout p/ a resposta simulada).
   ===================================================================== */
(function () {
  "use strict";

  const compose = document.querySelector(".msg-compose");
  const body = document.querySelector(".msg-body");
  if (!compose || !body) return;

  const input = compose.querySelector(".msg-compose__in");
  const send = compose.querySelector(".msg-compose__send");
  if (!input || !send) return;

  // Padrões que indicam tentativa de contato direto (telefone, redes, links)
  const BLOQUEIO = /(\d[\s.-]?){8,}|whats|whatsapp|\bzap\b|telefone|celular|instagram|\binsta\b|t\.me|http|www\.|@/i;

  function horaAgora() {
    const d = new Date();
    const h = String(d.getHours()).padStart(2, "0");
    const m = String(d.getMinutes()).padStart(2, "0");
    return "Hoje · " + h + ":" + m;
  }

  // Evita injeção de HTML: insere o texto do usuário com segurança
  function escapeHtml(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function addBolha(classe, html) {
    const b = document.createElement("div");
    b.className = "bubble " + classe;
    b.innerHTML = html;
    body.appendChild(b);
    body.scrollTop = body.scrollHeight;   // rola pro fim
    return b;
  }

  function enviar() {
    const texto = input.value.trim();

    if (!texto) {
      ScoutX.toast("Escreva uma mensagem.", "alert");
      return;
    }

    // Regra de segurança: contato é intermediado (alerta nativo do navegador)
    if (BLOQUEIO.test(texto)) {
      window.alert(
        "Por segurança, não é permitido trocar telefone, redes sociais ou links.\n" +
        "Todo contato é intermediado pelo ScoutX e o responsável acompanha."
      );
      return;
    }

    // Mensagem válida: adiciona a bolha no DOM
    addBolha("bubble--out", escapeHtml(texto) + '<span class="bubble__t">' + horaAgora() + "</span>");
    input.value = "";
    input.focus();

    // Resposta simulada do responsável após uma latência (BOM)
    setTimeout(function () {
      addBolha(
        "bubble--in",
        "<b>Maria Pereira (responsável)</b><br>Recebido, obrigada! Vou conversar com o Gabriel." +
        '<span class="bubble__t">' + horaAgora() + "</span>"
      );
      ScoutX.toast("Nova resposta na conversa.", "ok", 2000);
    }, 1600);
  }

  send.addEventListener("click", enviar);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); enviar(); }
  });
})();
