# ScoutX · Roteiro do teste de usabilidade (Sprint 4)

**Objetivo:** verificar se as pessoas das três personas conseguem receber o valor do ScoutX de ponta a ponta, sem ajuda: **inscrever um atleta numa peneira** e **pedir contato intermediado com um atleta**.

**Formato:** presencial ou remoto (Google Meet com tela compartilhada). Duração de 15 a 20 minutos por pessoa. Um moderador lê as tarefas e um anotador cronometra e marca a planilha.

**Mínimo:** 5 participantes externos ao grupo e à FIAP, aderentes às personas:

| Código | Perfil | Persona | Faz as tarefas |
|---|---|---|---|
| P1, P2 | Jovem de 11 a 17 anos que joga bola (com o responsável junto) | Atleta | T1, T2, T3 |
| P3 | Pai, mãe ou responsável de um jovem atleta | Atleta (responsável) | T1, T2, T3 |
| P4, P5 | Técnico de escolinha, preparador ou olheiro | Olheiro | T4, T5, T6 |

> Participante menor de idade: só com o responsável presente e de acordo. Não gravar o rosto do menor; gravar só a tela.

---

## 1. Antes de começar (moderador lê)

> "Obrigado por ajudar! Vamos testar um site, não você. Não existe resposta errada, e se algo for difícil é culpa do site. Vou te pedir algumas tarefas. Pensa em voz alta: fala o que está procurando e o que espera que aconteça. Eu não vou poder te ajudar durante as tarefas, tá bom? Pode usar dados de teste nos formulários: o e-mail pode ser o seu de verdade, assim você vê a resposta da equipe."

- Link inicial: **https://isaacisrael10.github.io/ScoutX/**
- Deixe o participante começar na **página inicial**. Não mostre onde clicar.
- Cronômetro começa quando terminar de ler a tarefa e para quando a pessoa chegar na tela de sucesso (ou desistir).
- **Não intervir.** Se a pessoa travar por mais de 2 minutos ou pedir ajuda, marque "travou" e passe para a próxima tarefa.

## 2. Tarefas

### Atleta / responsável

**T1 · Inscrever-se numa peneira**
> "Você (ou seu filho) é atacante, tem 12 anos e mora no Nordeste. Encontre uma peneira para ele e faça a inscrição."
- Sucesso: chegar na tela **"Inscrição recebida"** com protocolo.
- Caminho esperado: Início → Sou atleta → Peneiras → filtro (Nordeste / Sub-13) → Inscrever-se → formulário → Enviar.

**T2 · Acompanhar a inscrição**
> "Agora descubra até quando a equipe vai responder sobre essa inscrição."
- Sucesso: encontrar **Minhas inscrições** (em Peneiras ou pelo sino) e dizer a data de retorno.

**T3 · Denunciar uma conversa**
> "Um olheiro mandou uma mensagem pedindo seu WhatsApp. Você ficou desconfortável. Denuncie essa conversa."
- Sucesso: chegar na tela **"Denúncia recebida"**.

### Olheiro

**T4 · Encontrar um talento**
> "Você é olheiro de um clube. Encontre um atacante do Nordeste com Índice da Comunidade alto e abra a carta dele."
- Sucesso: abrir a página do atleta (ex.: Gabriel Pereira).

**T5 · Pedir contato**
> "Você quer convidar esse atleta para uma avaliação. Peça o contato."
- Sucesso: chegar na tela **"Pedido enviado à equipe"** com protocolo.

**T6 · Guardar para depois**
> "Salve esse atleta para acompanhar a evolução dele."
- Sucesso: botão muda para **"No seu radar"**.

## 3. Depois das tarefas

1. Abrir **https://isaacisrael10.github.io/ScoutX/teste/sus.html** e pedir que a pessoa responda o questionário SUS (10 frases). A nota é calculada e enviada sozinha para o e-mail da equipe.
2. Perguntas abertas (anotar as respostas):
   - "O que foi mais fácil?"
   - "Em que momento você ficou em dúvida?"
   - "Você confiaria nesse site para inscrever seu filho / procurar atletas? Por quê?"

## 4. Métricas (preencher `metricas-teste.csv`)

| Métrica | Como medir |
|---|---|
| **Conclusão** | `sim` (chegou ao sucesso sozinho), `parcial` (chegou com um tropeço grande), `nao` (desistiu ou travou) |
| **Tempo** | segundos, do fim da leitura da tarefa até a tela de sucesso |
| **Erros** | cada clique em lugar errado que obrigou a voltar + cada erro de validação no formulário |
| **Travamentos** | vezes que parou mais de 30 s sem saber o que fazer ou pediu ajuda |
| **SUS** | nota de 0 a 100 do questionário (média do grupo; acima de 68 = acima da média) |

**Taxa de conclusão** = tarefas `sim` ÷ total de tarefas tentadas.

## 5. Severidade dos achados (escala de Nielsen)

| Nota | Significado |
|---|---|
| 0 | Não é problema |
| 1 | Cosmético: corrigir se sobrar tempo |
| 2 | Menor: atrasou, mas a pessoa concluiu |
| 3 | Grave: causou erro ou travamento, corrigir antes da entrega |
| 4 | Catástrofe: impediu de concluir, corrigir obrigatoriamente |

Cada achado vai para a tabela de `achados-teste.md` com: participante, tarefa, o que aconteceu, severidade e ajuste proposto. Os **3 ajustes** de maior severidade viram PRs (um por integrante) com print de **antes e depois**.
