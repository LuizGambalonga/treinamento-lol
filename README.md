# Jungle Challenger

Página estática com um programa de treinamento para a rota da selva em League of Legends.

**🔗 [luizgambalonga.github.io/treinamento-lol](https://luizgambalonga.github.io/treinamento-lol/)**

## Conteúdo

Um percurso que vai do clear otimizado ao shotcalling de fim de jogo, organizado em dez seções:
mentalidade, fundamentos, mapa interativo, linha do tempo da partida, pathing, ganks e
contra-jungle, pool de campeões, métricas, roadmap de 12 semanas e FAQ.

Os destaques interativos:

- **Mapa de Summoner's Rift** em SVG, com 16 pontos clicáveis — cada camp mostra tempo de
  renascimento, experiência, ouro e a leitura tática de como usá-lo
- **Linha do tempo** da partida com o checklist de cada janela de decisão
- **Calculadora de renascimento** que devolve também a hora de iniciar o setup e de montar visão
- **20 campeões** com filtro por função, runas, ordem de itens e link para as estatísticas do patch atual
- **Roadmap de 12 semanas** com 32 tarefas e progresso salvo no navegador

## Stack

HTML, CSS e JavaScript puros. Sem build, sem dependências, sem framework.

```
index.html              página
assets/css/estilo.css   estilos
assets/js/dados.js      conteúdo (camps, campeões, roadmap, FAQ)
assets/js/app.js        interatividade
```

Para alterar qualquer conteúdo — incluir um campeão, ajustar um timer, adicionar uma tarefa —
basta editar `assets/js/dados.js`. A página se re-renderiza sozinha.

Ícones de campeões, itens e runas vêm do [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon),
o CDN oficial da Riot, com a versão do patch detectada automaticamente.

## Rodar localmente

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Aviso

Material de estudo independente, sem vínculo com a Riot Games. Tempos de objetivos e builds mudam
a cada atualização do jogo — confira sempre as notas do patch atual.

League of Legends © Riot Games, Inc.
