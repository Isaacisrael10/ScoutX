# Sprint 4 · Tarefa de cada integrante (PR obrigatório)

**Regra da sprint:** quem não tiver pelo menos **uma branch própria mergeada na `main` via Pull Request nesta sprint** fica com **nota individual zero**. Commit direto na `main` não vale.

Cada tarefa abaixo é pequena (30 a 60 min) e real. Se o teste com usuários gerar um ajuste, o Isaac passa o ajuste para você e ele **substitui** a tarefa abaixo (vira o seu "antes e depois").

---

## Passo a passo do Git (igual para todos)

```bash
# 1. baixar o projeto (só na primeira vez)
git clone https://github.com/Isaacisrael10/ScoutX.git
cd ScoutX
npm install

# 2. criar SUA branch a partir da main atualizada
git checkout main
git pull
git checkout -b feature/SEU-NOME-tarefa       # ex.: feature/bernardo-mensagens

# 3. fazer a tarefa, testar abrindo o HTML no navegador
#    se mexer em CSS: npm run build:css

# 4. salvar e enviar
git add .
git commit -m "feat: descreva o que você fez"
git push -u origin feature/SEU-NOME-tarefa
```

5. Abra o link que o `git push` mostrar (ou GitHub → **Pull requests → New pull request**), base `main`, compare a sua branch, escreva o que fez e clique **Create pull request**.
6. Avise no grupo. O Isaac revisa e faz o merge. **Não apague a branch depois do merge** (o histórico precisa ficar).
7. Edite o `README.md` na sua branch e preencha a sua linha na tabela **Contribuições · Sprint 4** (branch, link do PR, o que entregou).

Se pedir login no `git push`, use o login do GitHub no navegador que abrir. Se não tiver acesso de escrita, peça ao Isaac para te adicionar como colaborador.

---

## Bernardo · Mensagem bloqueada sem `alert()`

**Arquivo:** `assets/js/messages.js` (por volta da linha 55).

Hoje, quando alguém tenta mandar telefone ou rede social no chat, aparece um `window.alert()` nativo do navegador. Isso trava a tela, não segue o design system e é ruim para leitor de tela.

**Fazer:** trocar o `alert()` por uma mensagem dentro da conversa, abaixo do campo de texto, usando o componente de aviso que já existe:

```html
<div class="alert alert--danger" role="alert">Por segurança, não envie telefone nem rede social. O contato é sempre intermediado pelo ScoutX.</div>
```

A mensagem some quando a pessoa voltar a digitar. **Teste:** em `app/mensagens.html`, escreva `meu zap 11 99999-8888` e envie.

## Heitor · Máscara do WhatsApp na inscrição

**Arquivos:** `assets/js/concierge.js` (ou um novo `assets/js/mascara.js`) e `app/inscricao-peneira.html`.

O campo **WhatsApp do responsável** aceita qualquer coisa. **Fazer:** enquanto a pessoa digita, formatar como `(21) 99999-0000` (só números, máximo 11 dígitos). Ouvir o evento `input` no campo com o atributo `data-tel`.

**Teste:** digite `21999990000` e veja virar `(21) 99999-0000`. Envie o formulário vazio e confira se o erro "Informe DDD + número." ainda aparece.

## Henrique · "Encerra em X dias" calculado de verdade

**Arquivos:** `app/peneiras.html` e um script novo `assets/js/prazos.js`.

Os cards de peneira mostram "inscrições até 30/11" escrito à mão. **Fazer:** colocar em cada card um atributo com a data limite, por exemplo `data-prazo="2026-11-30"`, e um script que escreve "encerra em 12 dias" (ou "encerra hoje", ou "inscrições encerradas", desabilitando o botão) calculando a partir da data de hoje.

**Teste:** mude uma das datas para ontem e veja o card mudar para "inscrições encerradas".

## Matheus · Painel "Bastidores do concierge" no painel do Recrutador Pelé

**Arquivo:** `app/gestor-dashboard.html`.

O MVP é concierge: as solicitações chegam por e-mail para a equipe, que opera manualmente. A banca precisa ver esse bastidor na interface. **Fazer:** um novo `<section class="panel">` (siga o padrão dos painéis que já existem, com `panel__kick` e `panel__head`) chamado **"Bastidores do concierge"**, com:

- os 4 tipos de pedido e o prazo de cada um (inscrição em peneira: 2 dias úteis; pedido de contato: 2; recuperar senha: 1; denúncia: 1);
- os passos que a equipe segue: recebe no e-mail → confere dados e vídeo → fala com o responsável → responde citando o protocolo;
- um link para `../design-system/#estados`.

**Teste:** abrir `app/gestor-dashboard.html` no celular (F12 → modo dispositivo) e conferir que não tem scroll lateral.
