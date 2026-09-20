# Jungle Challenger · Roadmap de Treinamento (LoL)

Página estática (HTML + CSS + JavaScript puro, sem build e sem dependências) com um programa
completo de treinamento para a rota da selva em League of Legends.

## O que tem na página

| Seção | Conteúdo |
|---|---|
| **Mentalidade** | Os quatro princípios que separam elo médio de elo alto |
| **Fundamentos** | Kiting de camp, gestão de vida, uso de Smite + tabela de tempos |
| **Mapa interativo** | SVG clicável com 16 pontos — camps, caranguejos e covis de objetivo |
| **Linha do tempo** | 11 marcos da partida, de 0:00 a 25:00, com o checklist de cada janela |
| **Calculadora** | Renascimento, janela de setup, hora de colocar visão e de avisar o time |
| **Pathing** | Full clear, rota curta, invade nível 1 e adaptação no meio do clear |
| **Ganks** | Leitura de onda, ângulo de entrada e checklist de contra-jungle |
| **Campeões** | 20 campeões com filtros, runas, ordem de itens e link para o OP.GG |
| **Métricas** | 8 KPIs para medir depois de cada partida + rotina de treino |
| **Roadmap** | 32 tarefas em 4 fases — o progresso é salvo no navegador |
| **FAQ** | 8 perguntas frequentes respondidas |

## Estrutura

```
index.html              página (contém a configuração do Google Analytics)
assets/css/estilo.css   design system completo
assets/js/dados.js      todo o conteúdo: camps, timeline, campeões, roadmap, KPIs, FAQ
assets/js/app.js        interatividade + eventos de analytics
```

Para editar o conteúdo (adicionar um campeão, mudar um timer, incluir uma tarefa no roadmap),
mexa apenas em `assets/js/dados.js` — a página se re-renderiza sozinha.

## Como rodar localmente

Basta abrir `index.html` no navegador. Para evitar qualquer bloqueio do navegador com `file://`,
prefira servir por HTTP:

```bash
python -m http.server 8000
# depois acesse http://localhost:8000
```

## Google Analytics — ativar em 4 passos

1. Acesse <https://analytics.google.com> → **Admin** → **Criar propriedade**
2. Crie um **Fluxo de dados** do tipo **Web**, com a URL onde a página vai ficar hospedada
3. Copie o **ID de medição** (formato `G-XXXXXXXXXX`)
4. Abra `index.html`, localize a linha abaixo e cole o seu ID:

```js
var GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; /* <<<<<<<<<< TROQUE AQUI PELO SEU ID */
```

Enquanto o ID for o placeholder, nada é enviado para o Google — os eventos aparecem apenas no
console do navegador (`F12`), o que é útil para testar antes de publicar.

### Onde ver de onde as pessoas estão acessando

| Pergunta | Caminho no GA4 |
|---|---|
| De qual país / estado / cidade? | Relatórios → Dados demográficos → Detalhes demográficos |
| Vieram de onde (link, busca, direto)? | Relatórios → Aquisição → Aquisição de tráfego |
| Celular ou computador? Qual navegador? | Relatórios → Tecnologia → Detalhes |
| Quem está na página agora? | Relatórios → Tempo real |

> Dados de geolocalização e origem de tráfego são coletados automaticamente pelo GA4 — não é
> preciso configurar nada além do ID.

### Eventos personalizados já implementados

Além do `page_view` padrão, a página envia:

`camp_clicado` · `timeline_marco` · `calculadora_usada` · `aba_pathing` · `filtro_campeao` ·
`campeao_aberto` · `clique_opgg` · `tarefa_marcada` · `fase_aberta` · `progresso_zerado` ·
`faq_aberta` · `secao_vista` · `profundidade_rolagem` · `clique_cta` · `link_externo` ·
`navegacao_menu` · `tempo_na_pagina`

No GA4 eles aparecem em **Relatórios → Engajamento → Eventos** (leva até 24h para consolidar;
em **Tempo real** aparecem na hora). Para usar os parâmetros como filtro, registre-os em
**Admin → Definições personalizadas → Dimensões personalizadas**.

## Publicar no GitHub Pages

Com o repositório no ar, vá em **Settings → Pages**, selecione a branch `main` e a pasta `/root`.
A página fica disponível em `https://<usuario>.github.io/<repositorio>/` — use essa URL ao criar
o fluxo de dados no Google Analytics.

## Imagens

Ícones de campeões, itens e runas vêm do **Data Dragon**, o CDN oficial da Riot Games. A versão do
patch é detectada automaticamente em tempo de execução, com fallback definido em `dados.js`. Se
alguma imagem não existir mais naquele patch, ela é substituída por um marcador de texto em vez de
quebrar o layout.

## Aviso

Material de estudo independente, sem vínculo com a Riot Games. Tempos de objetivos e builds mudam a
cada atualização do jogo — confira sempre as notas do patch atual e os dados do OP.GG.

League of Legends © Riot Games, Inc.
