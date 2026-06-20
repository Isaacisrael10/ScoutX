# ScoutX — Ideação (v2, pivot completo)

> Documento de ideação do projeto **ScoutX**, do Challenge Pelé Academia (FIAP).
> Esta versão substitui a ideação anterior (centrada em "IA que ranqueia talento por vídeo"), que foi descartada por **inviabilidade técnica e desalinhamento com a missão**. O novo conceito é uma **rede social de descoberta de talentos da base, com proteção ao menor**, operada pela Pelé Academia.

---

## 1. A dor (o problema real)

O futebol de base brasileiro é o maior celeiro de talento do mundo — e o mais **invisível e desorganizado**:

- Milhares de jovens com potencial **nunca são vistos** porque estão longe dos grandes centros (barreira **geográfica**) ou não têm contato/dinheiro pra circular (barreira **econômica**).
- Quem quer descobrir talento (olheiro, clube, a própria Pelé) precisa **garimpar** no caos: perfis não verificados, dado inflado, sem organização.
- O jovem que se expõe hoje faz isso **no TikTok/Instagram aberto, sem nenhuma proteção** — terreno perigoso para um menor de idade.

Resultado: talento se perde, oportunidade não chega, e o menor fica desprotegido.

## 2. O que a Pelé pediu (e a nossa fidelidade a isso)

Do documento de kickoff *"O Rei do Futebol e a Protagonista da Tecnologia"*, o desafio é **"descentralizar a captação de talentos e fortalecer a presença da marca Pelé"**, com quatro pilares e um coração:

| Pilar da Pelé | Texto do doc |
|---|---|
| Sites e Aplicações | *"plataformas digitais que ampliam a visibilidade e o alcance da marca em todo o Brasil"* |
| Agendamento de Peneiras | *"organizar seletivas, encontros e eventos"* |
| Visibilidade de Talentos | *"jovens atletas de diferentes regiões serem descobertos"* |
| Gestão de Informações | *"organização inteligente de dados"* |

**Coração:** transformação social — *"ampliar oportunidades, democratizar acessos, remover barreiras geográficas e econômicas e construir futuros possíveis para milhares de jovens"*.

> Note o que a Pelé **não** pediu: IA de talento, score de mercado, comissão sobre transação. Esses foram acréscimos do nosso escopo antigo — e estamos livres para soltá-los.

## 3. O insight que define o projeto

A Pelé quer dar futuro a **"milhares de jovens"**. Mas a Pelé **é finita**: ela não consegue absorver milhares de atletas. Logo:

> **Visibilidade sem oportunidade é vazia. Para escalar a missão, a Pelé não pode ser só recrutadora — ela precisa ser a _plataforma_ que conecta cada jovem a _todas_ as oportunidades do Brasil.**

É daí que nasce o ScoutX: a Pelé como **palco e ponte**, não como gargalo.

## 4. A solução: ScoutX

**ScoutX é a rede social do futebol de base brasileiro — onde todo craque começa visível, e com segurança.**

- Qualquer jovem atleta, de qualquer região, cria perfil e sobe vídeos **de graça**.
- A **comunidade** (torcedores, fãs de futebol) assiste, curte, vota e marca características — e esse engajamento forma, de baixo pra cima, um **ranking orgânico** de quem está se destacando.
- **Olheiros** (da Pelé e externos) usam esse ranking + filtros pra descobrir talento **sem garimpar**.
- Todo contato com o atleta é **mediado e protegido** pela Pelé.
- As **peneiras** (da Pelé e parceiros) são o **destino do funil**: o talento descoberto vira oportunidade real.

A "organização inteligente de dados" que a Pelé pediu é o **Índice da Comunidade** + filtros + dados verificados — não uma IA mágica.

## 5. O motor do ranking (sem IA que julga talento)

Descartamos a ideia de uma IA que "assiste vídeo e dá nota de talento": é inviável (exige visão computacional treinada com milhares de vídeos rotulados — nível de pesquisa) e imprecisa. Em vez disso, três fontes **honestas e escaláveis**:

1. **Sabedoria da multidão** — engajamento da comunidade (views, curtidas, votos, tags de característica). Escala sozinho, é como YouTube/TikTok revelam talento, e não depende de autoavaliação.
2. **Dados verificáveis** — idade/identidade/elegibilidade conferidas, histórico de competição (proxy de nível, não digitado pelo atleta).
3. **Índice computado** — uma fórmula ponderada (rodando em **Python**) que combina (1) e (2) num ranking explicável.

O ranking é um **primeiro filtro**, nunca um veredito: o olho humano sempre decide vendo o vídeo. E é importante: **popularidade ≠ talento** — por isso o olheiro tem filtros profissionais por cima do buzz.

> **A IA volta como roadmap honesto:** conforme a plataforma registra **resultados reais** (quem foi contatado, quem avançou em peneiras, quem foi contratado), esse histórico vira o único dataset legítimo para, no futuro, treinar uma recomendação. A IA nasce **do uso**, não de uma promessa.

## 6. Personas

1. **Jovem Atleta (+ responsável legal)** — 11 a 17 anos, de qualquer região. *Quer ser visto e descoberto, com segurança e sem custo.*
2. **Comunidade / Torcedor** — fã de futebol que curte ver lances e "descobrir o próximo craque antes de todo mundo". *É quem move o ranking* (persona nova, central no novo modelo).
3. **Olheiro / Recrutador externo (assinante)** — clube, agência ou olheiro autônomo. *Quer achar talento relevante sem garimpar.*
4. **Recrutador da Pelé (a casa)** — staff interno. *Tem vantagem de dado (radar de tendência) e recruta para as peneiras/academia da Pelé.*

## 7. Jornadas do usuário

- **Atleta:** cadastra com o responsável → monta perfil + sobe vídeos → ganha visibilidade e engajamento → recebe interesse **mediado** / convite de peneira → participa da peneira → oportunidade.
- **Torcedor:** entra → vê o feed de lances → curte/vota/segue/compartilha → ajuda a revelar talentos (e amplia a visibilidade viralizando).
- **Olheiro externo:** assina → filtra por região/posição/idade → assiste aos vídeos → pede contato **mediado** → peneira/contrato.
- **Recrutador Pelé:** acessa o **radar de tendências** (vê quem sobe antes do mercado) → identifica cedo → convida pra peneira da Pelé → recruta.

## 8. Diferencial competitivo

A maioria dos grupos vai construir *"a Pelé acha atletas"* (ferramenta fechada de scouting). O ScoutX é **outra liga**:

- **Rede social** → visibilidade em massa e viralização (o pilar #1 e #3 da Pelé no máximo).
- **Aberto a olheiros externos** → multiplica as oportunidades além da capacidade finita da Pelé (é o que faz a missão **escalar de dezenas para milhares**).
- **A Pelé é a casa** → ganha em qualquer cenário (ver §10) e tem vantagem de dado.
- **Proteção do menor como pilar** → diferencia da exposição selvagem das redes abertas.

## 9. Modelo de negócio (sustentabilidade da missão)

A receita existe para **sustentar a missão social**, nunca como o ponto. Duas fontes, ambas à prova de desintermediação:

1. **Assinatura de olheiros/clubes externos** — pagam por **acesso recorrente** ao catálogo e às ferramentas (tiers: básico / pro com mais dados). O atleta é **sempre gratuito** (democratização não pode ter paywall). Como a cobrança não é por jogador, "fechar por fora" um atleta **não economiza nada** — o modelo do Wyscout/Transfermarkt.
2. **Receita legítima da Pelé sobre quem ela forma** — apenas atletas que a Pelé **de fato desenvolve/representa**: mecanismo de solidariedade / compensação de formação (regulado pela FIFA/CBF, **legal**, ao contrário do TPO/passe) e contratos de representação assinados com o responsável.

> Nunca cobramos "% sobre quem só apresentamos" — isso seria TPO (ilegal) e furável. A % só existe onde existe **formação real**.

(Futuro: a audiência social abre receita de patrocínio/engajamento, independente da transação.)

## 10. A vantagem da Pelé: a casa

Numa rede social ao vivo, **não dá** para garantir que "a Pelé recruta os melhores primeiro" — os talentos sobem todos juntos e quem pegar pegou. Então a vantagem da Pelé **não é prioridade decretada**, é estrutural:

- **Vantagem de informação:** os recrutadores da Pelé veem o que o assinante externo não vê — velocidade de tendência (radar de quem vai estourar), dados de engajamento crus, comparativos cross-região, histórico.
- **A casa lucra em qualquer disputa:** olheiro externo pegou um craque? A Pelé ganhou (assinatura) e o atleta teve oportunidade (missão). A Pelé não precisa vencer toda disputa — ela ganha em todo giro.
- **Compete na oferta:** marca Pelé + peneira + formação estruturada é uma oferta que olheiro externo não replica.

Conclusão: a competição entre olheiros deixa de ser um problema e vira o **motor** — mais olheiros disputando = mais assinaturas + mais oportunidades pros jovens. Os dois objetivos crescem juntos.

## 11. Proteção do menor (pilar inegociável)

A Pelé é uma marca **social, de criança**. A camada social só se sustenta **com trava de segurança**:

- Consentimento do **responsável** obrigatório no cadastro.
- **Sem mensagem direta** para o atleta; **todo contato é mediado** pela Pelé.
- **Identidade protegida** para não-assinantes (nome parcial, sem dados de contato) — reduz exposição e "fechar por fora".
- Moderação de conteúdo e comentários.
- Conformidade **LGPD + ECA**.

Posicionamento: *"os moleques já se expõem nas redes abertas sem proteção — o ScoutX dá a mesma visibilidade, com segurança."*

## 12. Anti-desintermediação (resumo)

Não dá pra impedir 100% dois adultos de conversarem por fora — então **não cobramos no momento do fechamento**. As travas reais:

- Receita por **assinatura** (não % de transação) → driblar não economiza nada.
- Mediação como **serviço de segurança e compliance** com menor → caminho legal e cheio de valor.
- Solidariedade/formação → **regulada e automática** (impossível de furar) — mas só para atletas formados pela Pelé.

## 13. Requisitos (atualizados)

**Funcionais (RF):**
- RF-01 Cadastro de atleta **com responsável legal** (consentimento).
- RF-02 Perfil do atleta + **upload de vídeos**.
- RF-03 **Feed social** + engajamento (curtir, votar, marcar características).
- RF-04 **Índice da Comunidade** (ranking calculado em Python).
- RF-05 **Busca e filtros** profissionais (posição, idade, região, pé, nível de competição).
- RF-06 **Peneiras** descentralizadas: divulgação, agendamento e inscrição.
- RF-07 **Mediação** de contato olheiro↔atleta (sem contato direto).
- RF-08 **Painel do recrutador Pelé** com radar de tendências (vantagem de dado).
- RF-09 **Assinatura / controle de acesso** por tier (atleta sempre grátis).
- RF-10 **Verificação** de idade/identidade/elegibilidade.

**Não funcionais (RNF):**
- RNF-01 Privacidade e proteção do menor (LGPD/ECA).
- RNF-02 Acessibilidade (WCAG AA).
- RNF-03 Responsividade (mobile-first — é rede social).
- RNF-04 Desempenho e escalabilidade (feed de vídeo).
- RNF-05 Moderação e segurança de conteúdo.

## 14. Roadmap

1. **Sprint atual (protótipo):** front (HTML/CSS no FED, JS no WD), Python no console (cálculo do Índice da Comunidade). Sem integração real — coerência de dados.
2. **Próximas sprints:** integração front↔back, autenticação, feed real, mediação funcional.
3. **Futuro:** recomendação treinada nos **resultados reais** acumulados; parecer textual gerado por IA a partir dos dados; receita de patrocínio na camada social.

## 15. Rastreabilidade com os pilares da Pelé

| Pilar da Pelé | Como o ScoutX entrega |
|---|---|
| Visibilidade e alcance da marca | Rede social → alcance e viralização nacionais |
| Agendamento de peneiras | RF-06: divulgação, agendamento e inscrição |
| Jovens de diferentes regiões descobertos | Feed + Índice da Comunidade democratizam a descoberta |
| Organização inteligente de dados | Índice + filtros + dados verificados (Python) |
| Transformação social / democratizar acesso | Atleta sempre grátis; olheiros externos multiplicam oportunidades; proteção do menor |

## 16. Riscos e mitigações

| Risco | Mitigação |
|---|---|
| Popularidade ≠ talento | Ranking é 1º filtro; olheiro tem filtros profissionais + vídeo; decisão é humana |
| Manipulação de votos | Ponderação por reputação/conta verificada; voto de olheiro pesa mais |
| Exposição/segurança do menor | Consentimento, sem DM, contato mediado, identidade protegida, moderação, LGPD/ECA |
| Fechar por fora (desintermediação) | Receita por assinatura (não % por jogador); mediação como valor legal; solidariedade regulada |
| Parecer "mercado de crianças" | Enquadramento social-first; atleta grátis; "ferramentas pro olheiro", não "acesso a crianças" |
| Cold start de rede social | Marca e alcance da Pelé como semente |

---

**Frase-síntese:** *ScoutX — todo craque começa visível. A rede social que a Pelé Academia usa para descentralizar a captação, dar visibilidade a milhares de jovens do Brasil inteiro e conectá-los a oportunidades reais, com segurança.*
