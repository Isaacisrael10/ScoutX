/* =====================================================================
   ScoutX · validation.js  (Web Development)
   Validação dos formulários de acesso (cadastro de atleta, cadastro de
   olheiro e telas de login). Demonstra: escuta de eventos, condicionais,
   laços, manipulação do DOM (mensagens de erro) e BOM (setTimeout).
   É genérico: roda em qualquer página que tenha um .auth-card.
   ===================================================================== */
(function () {
  "use strict";

  const card = document.querySelector(".auth-card");
  if (!card) return;                       // página sem formulário de acesso

  // O botão de ação é um <a> estilizado como botão (ex.: "Entrar"/"Criar conta")
  const submit = card.querySelector("a.btn--block") || card.querySelector("a.btn--gold");
  if (!submit) return;

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ---- helpers de erro (manipulação do DOM) -------------------------------
  const wrapOf = (el) => el.closest(".auth-field") || el.closest(".auth-check") || el.parentElement;

  function setError(el, msg) {
    const w = wrapOf(el);
    w.classList.add("invalid");
    let e = w.querySelector(".auth-err");
    if (!e) {
      e = document.createElement("span");
      e.className = "auth-err";
      w.appendChild(e);
    }
    e.textContent = msg;
    el.setAttribute("aria-invalid", "true");
  }

  function clearError(el) {
    const w = wrapOf(el);
    w.classList.remove("invalid");
    const e = w.querySelector(".auth-err");
    if (e) e.remove();
    el.removeAttribute("aria-invalid");
  }

  // Calcula idade a partir de uma data (yyyy-mm-dd), usada na regra do menor
  function idade(dateStr) {
    const d = new Date(dateStr), now = new Date();
    let a = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) a--;
    return a;
  }

  // Limpa o erro do campo assim que o usuário corrige (escuta de eventos)
  card.querySelectorAll("input, select").forEach((el) => {
    el.addEventListener("input", () => clearError(el));
    el.addEventListener("change", () => clearError(el));
  });

  // ---- validação ----------------------------------------------------------
  function validate() {
    let first = null;

    // 1) campos de texto/e-mail/senha/data: obrigatórios + regras por tipo
    const campos = card.querySelectorAll('input:not([type="checkbox"]), select');
    campos.forEach((el) => {
      clearError(el);
      const val = (el.value || "").trim();

      if (!val) {
        setError(el, "Campo obrigatório.");
        first = first || el;
        return;
      }
      if (el.type === "email" && !EMAIL_RE.test(val)) {
        setError(el, "Digite um e-mail válido.");
        first = first || el;
        return;
      }
      if (el.type === "password" && val.length < 6) {
        setError(el, "A senha precisa ter ao menos 6 caracteres.");
        first = first || el;
        return;
      }
    });

    // 2) regra do menor: se há data de nascimento, o atleta deve ser da base
    const nasc = card.querySelector("#nasc");
    if (nasc && nasc.value && !wrapOf(nasc).classList.contains("invalid")) {
      const i = idade(nasc.value);
      if (i < 5 || i > 17) {
        setError(nasc, "O ScoutX é para atletas da base (até 17 anos), com responsável.");
        first = first || nasc;
      }
    }

    // 3) aceite dos termos (checkbox), quando existir
    const check = card.querySelector('.auth-check input[type="checkbox"]');
    if (check && !check.checked) {
      const w = check.closest(".auth-check");
      w.classList.add("invalid");
      if (!w.querySelector(".auth-err")) {
        const e = document.createElement("span");
        e.className = "auth-err";
        e.textContent = "Você precisa aceitar os termos para continuar.";
        w.appendChild(e);
      }
      first = first || check;
    }

    return first;   // primeiro campo inválido, ou null se tudo ok
  }

  // ---- envio --------------------------------------------------------------
  submit.addEventListener("click", function (e) {
    e.preventDefault();                    // não navega antes de validar
    const invalido = validate();

    if (invalido) {
      invalido.focus();
      ScoutX.toast("Confira os campos destacados.", "alert");
      return;
    }

    // tudo certo: feedback e redireciona com uma pequena latência (BOM)
    const href = submit.getAttribute("href");
    submit.classList.add("is-loading");
    ScoutX.toast("Tudo certo! Entrando…", "ok");
    setTimeout(() => { if (href) window.location.href = href; }, 1200);
  });
})();
