/* =====================================================================
   ScoutX · concierge-config.js
   Configuração do MVP concierge (Sprint 4). Toda solicitação feita no app
   (inscrição em peneira, pedido de contato, recuperação de senha, denúncia)
   é enviada por fetch para a caixa de e-mail monitorada pela equipe, que
   opera os bastidores manualmente dentro dos prazos abaixo.

   Canal: FormSubmit (https://formsubmit.co), API gratuita de formulários.
   Na PRIMEIRA solicitação o FormSubmit manda um e-mail de ativação para a
   caixa abaixo; depois de clicar em "Activate", tudo chega direto.
   ===================================================================== */
window.SCOUTX_CONCIERGE = {
  // caixa monitorada pela equipe ScoutX
  email: "isaac.coimbraa@gmail.com",

  // prazos reais que a equipe se compromete a cumprir (dias úteis)
  prazos: {
    "inscricao-peneira": 2,   // confirmação ao responsável
    "contato-atleta": 2,      // equipe fala com o responsável e retorna ao olheiro
    "recuperar-senha": 1,     // link de redefinição enviado por e-mail
    "denuncia": 1             // análise da equipe de segurança
  },

  // canal alternativo exibido quando o envio falha
  fallbackLabel: "e-mail da equipe"
};
