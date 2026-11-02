# Uso de IA generativa (PROMPTS.md)

Conforme o enunciado, listamos onde a IA generativa foi usada como apoio. Toda saída foi revisada, testada no navegador e ajustada pela equipe antes de entrar no repositório.

**Ferramenta:** Claude (Anthropic), via Claude Code, como assistente de programação.

| Sprint | Para quê | Exemplo de prompt | O que a equipe fez com a resposta |
|---|---|---|---|
| 3 | Migrar o CSS autoral para Tailwind v4 mantendo os tokens da Sprint 1 | "Migre os arquivos de CSS do projeto para o Tailwind v4, com os tokens no @theme, sem quebrar as telas" | Revisamos tela por tela, corrigimos 3 contrastes e documentamos a decisão de arquitetura no README |
| 4 | Planejar o MVP concierge a partir do enunciado | "Leia os critérios da Sprint 4 e diga o que falta no projeto para cumprir cada um" | Escolhemos o modelo concierge e o canal (e-mail da equipe via FormSubmit) |
| 4 | Implementar o envio real dos formulários com estados de interface | "Crie um módulo que envie os formulários por fetch para o canal da equipe, com estados vazio, carregando, erro e sucesso, protocolo e prazo em dias úteis" | Testamos os quatro estados no navegador, ajustamos textos e prazos que a equipe consegue cumprir |
| 4 | Rota de styleguide `/design-system` | "Monte uma página de design system que leia os tokens do Tailwind ao vivo e mostre os componentes em todos os estados" | Conferimos cada componente contra as telas reais |
| 4 | Performance e acessibilidade | "Rode o Lighthouse nas telas principais e corrija o que estiver abaixo de 80 em performance" | Validamos as notas em produção e registramos os prints |
| 4 | Roteiro do teste com usuários e questionário SUS | "Escreva um roteiro de teste de usabilidade com tarefas por persona, métricas e o SUS em português" | Aplicamos o teste com usuários reais; os dados e conclusões são da equipe |

**O que não foi feito por IA:** os testes com usuários (aplicados pela equipe com pessoas reais), as métricas coletadas e as decisões sobre quais ajustes fazer.
