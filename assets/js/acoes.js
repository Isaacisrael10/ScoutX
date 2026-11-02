/* =====================================================================
   ScoutX · acoes.js  (Sprint 4)
   Ações pequenas que antes eram botões mortos:
   - sino de notificações (popover acessível, fecha com Esc)
   - "Salvar no meu radar" (persistido no navegador)
   - "Compartilhar carta" (Web Share API ou copia o link)
   - aprovação de conversas no painel do Recrutador Pelé
   ===================================================================== */
(function () {
  "use strict";
  const toast = (m, t, ms) => window.ScoutX && ScoutX.toast(m, t, ms);

  // ---------- notificações ----------
  const NOTIFS = {
    atleta: [
      ["peneiras.html#minhas", "Acompanhe suas inscrições em peneiras", "Status e prazo de retorno"],
      ["mensagens-atleta.html", "Ricardo S. (olheiro) mandou uma mensagem", "Sua responsável acompanha a conversa"]
    ],
    olheiro: [
      ["catalogo.html#minhas", "Acompanhe seus pedidos de contato", "Retorno da equipe em até 2 dias úteis"],
      ["atleta-detalhe.html", "Gabriel Pereira subiu no Índice", "+250% de engajamento na semana"]
    ],
    pele: [
      ["mensagens.html", "1 conversa aguardando revisão", "Clube parceiro com Gabriel Pereira"],
      ["criar-peneira.html", "Crie a próxima peneira", "As inscrições chegam no e-mail da equipe"]
    ]
  };
  function perfil() {
    const ctx = (document.querySelector(".app-ctx") || {}).textContent || "";
    if (/olheiro/i.test(ctx)) return "olheiro";
    if (/pel[eé]|recrutador|gestor/i.test(ctx)) return "pele";
    return "atleta";
  }
  document.querySelectorAll(".bell").forEach((bell, i) => {
    const pop = document.createElement("div");
    pop.className = "notif-pop";
    pop.id = "notif-pop-" + i;
    pop.hidden = true;
    pop.setAttribute("role", "region");
    pop.setAttribute("aria-label", "Notificações");
    pop.innerHTML = "<h2>Notificações</h2><ul></ul>";
    NOTIFS[perfil()].forEach(([href, t, s]) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = href;
      a.textContent = t;
      const sm = document.createElement("small");
      sm.textContent = s;
      a.appendChild(sm);
      li.appendChild(a);
      pop.querySelector("ul").appendChild(li);
    });
    bell.type = "button";
    bell.setAttribute("aria-expanded", "false");
    bell.setAttribute("aria-controls", pop.id);
    bell.insertAdjacentElement("afterend", pop);
    const fechar = () => { pop.hidden = true; bell.setAttribute("aria-expanded", "false"); };
    bell.addEventListener("click", (e) => {
      e.stopPropagation();
      const abrir = pop.hidden;
      pop.hidden = !abrir;
      bell.setAttribute("aria-expanded", String(abrir));
      const pip = bell.querySelector(".pip");
      if (abrir && pip) pip.remove();
    });
    document.addEventListener("click", (e) => { if (!pop.contains(e.target)) fechar(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !pop.hidden) { fechar(); bell.focus(); } });
  });

  // ---------- radar (shortlist) ----------
  const KEY = "scoutx.radar";
  const ler = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
  const gravar = (l) => { try { localStorage.setItem(KEY, JSON.stringify(l)); } catch (e) {} };
  document.querySelectorAll("[data-shortlist]").forEach((btn) => {
    const id = btn.dataset.shortlist;
    const pinta = (on) => {
      btn.setAttribute("aria-pressed", String(on));
      btn.textContent = on ? "No seu radar" : "Salvar no meu radar";
    };
    pinta(ler().includes(id));
    btn.addEventListener("click", () => {
      const l = ler();
      const on = !l.includes(id);
      gravar(on ? l.concat(id) : l.filter((x) => x !== id));
      pinta(on);
      toast(on ? "Atleta salvo no seu radar." : "Atleta removido do seu radar.", on ? "ok" : "");
    });
  });

  // ---------- compartilhar carta ----------
  document.querySelectorAll("[data-share]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const url = new URL(btn.dataset.share, location.href).href;
      const dados = { title: "Carta do atleta · ScoutX", text: "Confira a carta deste atleta no ScoutX", url: url };
      try {
        if (navigator.share) { await navigator.share(dados); return; }
        await navigator.clipboard.writeText(url);
        toast("Link da carta copiado.", "ok");
      } catch (e) {
        if (e && e.name === "AbortError") return;      // usuário cancelou
        toast("Não deu para copiar. Link: " + url, "alert", 6000);
      }
    });
  });

  // ---------- painel Pelé: aprovar conversa ----------
  document.querySelectorAll("[data-aprovar]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = btn.closest(".list-row");
      const badge = row && row.querySelector(".badge");
      if (badge) { badge.className = "badge badge--success"; badge.textContent = "Aprovada"; }
      const a = document.createElement("a");
      a.className = "btn btn--outline btn--sm";
      a.href = "mensagens.html";
      a.textContent = "Abrir";
      btn.replaceWith(a);
      a.focus();
      toast("Conversa aprovada. O responsável foi avisado.", "ok");
    });
  });
})();
