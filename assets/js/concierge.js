/* =====================================================================
   ScoutX · concierge.js  (Sprint 4 · MVP concierge)
   Liga qualquer <form data-concierge="tipo"> ao canal real da equipe.

   Estados de interface:
     vazio    -> formulário limpo, botão pronto
     loading  -> botão em carregamento + aria-busy, campos travados
     erro     -> erros por campo (validação) OU aviso de falha de envio
                 com "Tentar de novo" e canal alternativo
     sucesso  -> painel [data-state="success"] com protocolo e prazo real

   Envio: fetch POST (JSON) para a API do FormSubmit -> e-mail da equipe.
   Cada pedido também fica salvo no navegador (localStorage) para a tela
   "Minhas solicitações".
   ===================================================================== */
(function () {
  "use strict";

  const CFG = window.SCOUTX_CONCIERGE || {};
  const STORE = "scoutx.solicitacoes";
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const TIMEOUT_MS = 15000;

  // ---------- utilidades ----------
  function protocolo() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, "0");
    const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
    return "SX-" + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + "-" + rnd;
  }

  // soma dias úteis (pula sábado e domingo)
  function somaDiasUteis(base, dias) {
    const d = new Date(base);
    let n = 0;
    while (n < dias) {
      d.setDate(d.getDate() + 1);
      const w = d.getDay();
      if (w !== 0 && w !== 6) n++;
    }
    return d;
  }

  function dataBR(d) {
    return d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });
  }

  function idade(str) {
    const d = new Date(str), now = new Date();
    let a = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) a--;
    return a;
  }

  function lerPedidos() {
    try { return JSON.parse(localStorage.getItem(STORE)) || []; } catch (e) { return []; }
  }
  function salvarPedido(p) {
    try {
      const l = lerPedidos();
      l.unshift(p);
      localStorage.setItem(STORE, JSON.stringify(l.slice(0, 30)));
    } catch (e) { /* navegador sem storage: segue sem histórico */ }
  }

  // ---------- erros por campo ----------
  const wrapOf = (el) => el.closest(".auth-field") || el.closest(".auth-check") || el.parentElement;

  function setError(el, msg) {
    const w = wrapOf(el);
    w.classList.add("invalid");
    let e = w.querySelector(".auth-err");
    if (!e) {
      e = document.createElement("span");
      e.className = "auth-err";
      e.id = (el.id || el.name) + "-err";
      w.appendChild(e);
    }
    e.textContent = msg;
    el.setAttribute("aria-invalid", "true");
    el.setAttribute("aria-describedby", e.id);
  }

  function clearError(el) {
    const w = wrapOf(el);
    w.classList.remove("invalid");
    const e = w.querySelector(".auth-err");
    if (e) e.remove();
    el.removeAttribute("aria-invalid");
    el.removeAttribute("aria-describedby");
  }

  function validar(form) {
    let primeiro = null;
    form.querySelectorAll("input, select, textarea").forEach((el) => {
      if (el.type === "hidden" || el.disabled) return;
      clearError(el);
      const v = (el.value || "").trim();
      const falha = (msg) => { setError(el, msg); primeiro = primeiro || el; };

      if (el.type === "checkbox") {
        if (el.required && !el.checked) falha("Marque para continuar.");
        return;
      }
      if (el.required && !v) return falha("Campo obrigatório.");
      if (!v) return;
      if (el.type === "email" && !EMAIL_RE.test(v)) return falha("Digite um e-mail válido.");
      if (el.type === "url" && !/^https?:\/\/\S+\.\S+/.test(v)) return falha("Cole o link completo, começando com https://");
      if (el.dataset.tel !== undefined && v.replace(/\D/g, "").length < 10) return falha("Informe DDD + número.");
      if (el.dataset.idadeMin || el.dataset.idadeMax) {
        const i = idade(v);
        const min = +el.dataset.idadeMin || 0, max = +el.dataset.idadeMax || 99;
        if (isNaN(i) || i < min || i > max) return falha("Esta peneira é para atletas de " + min + " a " + max + " anos.");
      }
      if (el.minLength > 0 && v.length < el.minLength) return falha("Escreva pelo menos " + el.minLength + " caracteres.");
    });
    return primeiro;
  }

  // ---------- envio real ----------
  async function enviar(tipo, dados) {
    if (!CFG.email || /CONFIGURE/.test(CFG.email)) {
      throw new Error("canal-nao-configurado");
    }
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch("https://formsubmit.co/ajax/" + encodeURIComponent(CFG.email), {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(Object.assign({
          _subject: "[ScoutX] " + tipo + " · " + dados.protocolo,
          _template: "table",
          _captcha: "false"
        }, dados)),
        signal: ctrl.signal
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) !== "true") {
        throw new Error(json.message || "falha-no-envio");
      }
      return json;
    } finally {
      clearTimeout(t);
    }
  }

  // ---------- liga cada formulário ----------
  document.querySelectorAll("form[data-concierge]").forEach((form) => {
    const tipo = form.dataset.concierge;
    const btn = form.querySelector('[type="submit"]');
    const boxErro = form.querySelector('[data-state="error"]');
    const painelOk = document.querySelector('[data-state="success"][data-for="' + form.id + '"]');

    form.setAttribute("novalidate", "");

    form.querySelectorAll("input, select, textarea").forEach((el) => {
      el.addEventListener("input", () => clearError(el));
      el.addEventListener("change", () => clearError(el));
    });

    function setLoading(on) {
      form.setAttribute("aria-busy", on ? "true" : "false");
      btn.classList.toggle("is-loading", on);
      btn.disabled = on;
      form.querySelectorAll("input, select, textarea").forEach((el) => { el.readOnly = on; });
    }

    function mostrarErro(msg) {
      if (!boxErro) { window.ScoutX && ScoutX.toast(msg, "alert", 5000); return; }
      boxErro.hidden = false;
      boxErro.querySelector("[data-msg]").textContent = msg;
      const mail = boxErro.querySelector("[data-fallback]");
      if (mail && CFG.email && !/CONFIGURE/.test(CFG.email)) {
        mail.href = "mailto:" + CFG.email + "?subject=" + encodeURIComponent("[ScoutX] " + tipo);
        mail.hidden = false;
      }
      boxErro.focus();
    }

    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      if (boxErro) boxErro.hidden = true;

      const invalido = validar(form);
      if (invalido) {
        invalido.focus();
        window.ScoutX && ScoutX.toast("Confira os campos destacados.", "alert");
        return;
      }

      const dados = { protocolo: protocolo(), tipo: tipo, enviado_em: new Date().toLocaleString("pt-BR") };
      new FormData(form).forEach((v, k) => { dados[k] = v; });
      if (form.dataset.contexto) dados.contexto = form.dataset.contexto;

      setLoading(true);
      try {
        await enviar(tipo, dados);
      } catch (err) {
        setLoading(false);
        const m = String(err && err.message);
        if (m === "canal-nao-configurado") {
          mostrarErro("O canal de atendimento ainda não foi configurado. Avise a equipe ScoutX.");
        } else if (err && err.name === "AbortError") {
          mostrarErro("A conexão demorou demais e o pedido não foi enviado. Seus dados continuam aqui, é só tentar de novo.");
        } else if (!navigator.onLine) {
          mostrarErro("Você está sem internet. Seus dados continuam aqui, tente de novo quando a conexão voltar.");
        } else {
          mostrarErro("Não conseguimos enviar seu pedido agora. Seus dados continuam aqui, tente de novo em instantes.");
        }
        return;
      }

      // sucesso: registra e mostra o painel com protocolo e prazo real
      const dias = (CFG.prazos && CFG.prazos[tipo]) || 2;
      const prazo = somaDiasUteis(new Date(), dias);
      salvarPedido({
        protocolo: dados.protocolo, tipo: tipo,
        titulo: form.dataset.titulo || tipo,
        quando: new Date().toISOString(), prazo: prazo.toISOString()
      });

      if (painelOk) {
        painelOk.querySelectorAll("[data-protocolo]").forEach((e) => { e.textContent = dados.protocolo; });
        painelOk.querySelectorAll("[data-prazo]").forEach((e) => { e.textContent = dataBR(prazo); });
        painelOk.querySelectorAll("[data-campo]").forEach((e) => { e.textContent = dados[e.dataset.campo] || ""; });
        form.hidden = true;
        painelOk.hidden = false;
        const h = painelOk.querySelector("h1, h2");
        if (h) { h.setAttribute("tabindex", "-1"); h.focus(); }
      } else {
        setLoading(false);
        form.reset();
        window.ScoutX && ScoutX.toast("Pedido enviado. Protocolo " + dados.protocolo + ".", "ok", 5000);
      }
    });
  });

  // ---------- "Minhas solicitações" (estado vazio / lista) ----------
  document.querySelectorAll("[data-minhas-solicitacoes]").forEach((box) => {
    const filtro = box.dataset.minhasSolicitacoes;   // "" = todos os tipos
    const lista = lerPedidos().filter((p) => !filtro || p.tipo === filtro);
    const vazio = box.querySelector("[data-empty]");
    const ul = box.querySelector("[data-list]");
    if (!lista.length) { if (vazio) vazio.hidden = false; return; }
    if (vazio) vazio.hidden = true;
    ul.hidden = false;
    lista.forEach((p) => {
      const li = document.createElement("li");
      li.className = "req-item";
      const prazo = new Date(p.prazo);
      const venceu = prazo < new Date();
      li.innerHTML =
        '<div><b></b><span class="req-item__meta"></span></div>' +
        '<span class="badge ' + (venceu ? "badge--navy" : "badge--gold") + '"></span>';
      li.querySelector("b").textContent = p.titulo;
      li.querySelector(".req-item__meta").textContent =
        "Protocolo " + p.protocolo + " · retorno até " + prazo.toLocaleDateString("pt-BR");
      li.querySelector(".badge").textContent = venceu ? "Aguardando retorno" : "Em análise pela equipe";
      ul.appendChild(li);
    });
  });

  window.ScoutXConcierge = { lerPedidos: lerPedidos };
})();
