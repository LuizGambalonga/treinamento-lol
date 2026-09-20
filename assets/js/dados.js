

var DDRAGON_FALLBACK = "14.24.1";
var DD_PERKS = "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/";

var RUNAS = {
  conquistador: { nome: "Conquistador",      img: DD_PERKS + "Precision/Conqueror/Conqueror.png" },
  tempoLetal:   { nome: "Tempo Letal",       img: DD_PERKS + "Precision/LethalTempo/LethalTempoTemp.png" },
  passoRapido:  { nome: "Passo Rapido",      img: DD_PERKS + "Precision/FleetFootwork/FleetFootwork.png" },
  ataquePleno:  { nome: "Ataque Pleno",      img: DD_PERKS + "Precision/PressTheAttack/PressTheAttack.png" },
  eletrocutar:  { nome: "Eletrocutar",       img: DD_PERKS + "Domination/Electrocute/Electrocute.png" },
  colheita:     { nome: "Colheita Sombria",  img: DD_PERKS + "Domination/DarkHarvest/DarkHarvest.png" },
  saraivada:    { nome: "Saraivada de Laminas", img: DD_PERKS + "Domination/HailOfBlades/HailOfBlades.png" },
  posChoque:    { nome: "Pos-Choque",        img: DD_PERKS + "Resolve/VeteranAftershock/VeteranAftershock.png" },
  agarre:       { nome: "Agarre do Morto-Vivo", img: DD_PERKS + "Resolve/GraspOfTheUndying/GraspOfTheUndying.png" },
  corridaFase:  { nome: "Corrida de Fase",   img: DD_PERKS + "Sorcery/PhaseRush/PhaseRush.png" },
  invocarAery:  { nome: "Invocar Aery",      img: DD_PERKS + "Sorcery/SummonAery/SummonAery.png" },
  primeiroAto:  { nome: "Primeiro Ataque",   img: DD_PERKS + "Inspiration/FirstStrike/FirstStrike.png" }
};

var CAMPS = [

  { id:"gromp-b",   nome:"Gromp",              lado:"Azul",     cor:"#3ddc84", x:118, y:252,
    respawn:"2:15", spawn:"1:30", xp:"~180 XP", ouro:"~86 g",
    dica:"Buff de Gromp da dano em area nos monstros. Muitos clears comecam ou terminam aqui para aproveitar o buff no proximo camp." },
  { id:"azul-b",    nome:"Sentinela Azul",     lado:"Azul",     cor:"#0596aa", x:156, y:316,
    respawn:"5:00", spawn:"1:30", xp:"~330 XP", ouro:"~90 g",
    dica:"Buff Azul dura 2:00 e devolve mana + reducao de recarga. Campeoes de mana dependem dele; ceder o segundo azul para o mid e jogada comum em comps de scaling." },
  { id:"lobos-b",   nome:"Lobos",              lado:"Azul",     cor:"#9d7cff", x:196, y:386,
    respawn:"2:15", spawn:"1:30", xp:"~190 XP", ouro:"~85 g",
    dica:"Camp mais perto da base e do mid. Ideal para recuperar tempo depois de uma morte ou de um retorno rapido a base." },
  { id:"aves-b",    nome:"Aves",               lado:"Azul",     cor:"#ff9d3c", x:286, y:432,
    respawn:"2:15", spawn:"1:30", xp:"~190 XP", ouro:"~85 g",
    dica:"O camp mais roubado do jogo: fica exposto ao mid inimigo. Warde as Aves para detectar invasoes e para rastrear o clear adversario." },
  { id:"verm-b",    nome:"Sentinela Vermelha", lado:"Azul",     cor:"#e84057", x:332, y:468,
    respawn:"5:00", spawn:"1:30", xp:"~330 XP", ouro:"~90 g",
    dica:"Buff Vermelho da dano continuo e lentidao nos ataques basicos. Transforma ganks: qualquer campeao com AA vira ameaca real com ele." },
  { id:"krugs-b",   nome:"Krugs",              lado:"Azul",     cor:"#c8aa6e", x:398, y:502,
    respawn:"2:15", spawn:"1:30", xp:"~330 XP", ouro:"~132 g",
    dica:"Maior XP e ouro do jungle, mas o clear mais lento. Pular Krugs para ganhar tempo e uma decisao legitima em nivel alto." },

  { id:"gromp-r",   nome:"Gromp",              lado:"Vermelho", cor:"#3ddc84", x:482, y:348,
    respawn:"2:15", spawn:"1:30", xp:"~180 XP", ouro:"~86 g",
    dica:"Do lado inimigo, so invada com visao do jungler adversario e rota de fuga pelo rio." },
  { id:"azul-r",    nome:"Sentinela Azul",     lado:"Vermelho", cor:"#0596aa", x:444, y:284,
    respawn:"5:00", spawn:"1:30", xp:"~330 XP", ouro:"~90 g",
    dica:"Roubar o Azul inimigo atrasa o clear dele em ~40s e pode quebrar o proximo pathing inteiro." },
  { id:"lobos-r",   nome:"Lobos",              lado:"Vermelho", cor:"#9d7cff", x:404, y:214,
    respawn:"2:15", spawn:"1:30", xp:"~190 XP", ouro:"~85 g",
    dica:"Camp mais profundo do lado inimigo. Invadir aqui exige visao dupla: entrada e saida." },
  { id:"aves-r",    nome:"Aves",               lado:"Vermelho", cor:"#ff9d3c", x:314, y:168,
    respawn:"2:15", spawn:"1:30", xp:"~190 XP", ouro:"~85 g",
    dica:"Alvo classico de contra-jungle com prioridade no mid. Rapido de limpar e volta em 2:15." },
  { id:"verm-r",    nome:"Sentinela Vermelha", lado:"Vermelho", cor:"#e84057", x:268, y:132,
    respawn:"5:00", spawn:"1:30", xp:"~330 XP", ouro:"~90 g",
    dica:"Roubar esse buff antes de uma luta de objetivo reduz muito o dano sustentado do jungler inimigo." },
  { id:"krugs-r",   nome:"Krugs",              lado:"Vermelho", cor:"#c8aa6e", x:202, y:98,
    respawn:"2:15", spawn:"1:30", xp:"~330 XP", ouro:"~132 g",
    dica:"Roubo de alto valor, porem o mais demorado. So compensa com o jungler inimigo morto ou do outro lado do mapa." },

  { id:"scuttle-t", nome:"Caranguejo (topo)",  lado:"Rio",      cor:"#0ac8b9", x:150, y:140,
    respawn:"2:30", spawn:"3:30", xp:"~110 XP", ouro:"~55 g",
    dica:"Da visao movel e um acelerador no rio. Primeiro caranguejo e o primeiro teste de prioridade do jogo: so dispute com lanes com prio." },
  { id:"scuttle-b", nome:"Caranguejo (base)",  lado:"Rio",      cor:"#0ac8b9", x:462, y:472,
    respawn:"2:30", spawn:"3:30", xp:"~110 XP", ouro:"~55 g",
    dica:"Controlar o caranguejo do lado do proximo objetivo vale mais que o ouro: e visao gratuita antes do setup." },
  { id:"pit-baron",  nome:"Covil do Barao / Vazio", lado:"Objetivo", cor:"#9d7cff", x:212, y:184,
    respawn:"6:00", spawn:"Larvas 6:00 · Arauto 16:00 · Barao 25:00", xp:"varia", ouro:"alto",
    dica:"O mesmo covil abriga Larvas do Vazio, Arauto e depois o Barao. Domine a visao nas duas entradas ANTES do objetivo nascer, nunca depois." },
  { id:"pit-drag",   nome:"Covil do Dragao",   lado:"Objetivo", cor:"#ff9d3c", x:404, y:424,
    respawn:"5:00", spawn:"5:00", xp:"alto", ouro:"~25 g/jogador",
    dica:"4 dragoes = Alma. O 2o e o 3o dragao decidem a Alma na pratica, e sao os que merecem o setup mais caro em tempo e visao." }
];

var TIMELINE = [
  { t:"0:00", rot:"Spawn / Leash", titulo:"Preparacao antes do minuto 1",
    txt:"Defina o lado do clear AINDA no carregamento. Pergunte no chat quem consegue dar leash e avise a rota de inicio. Se a comp inimiga tem jungler de invade (Xin Zhao, Rek'Sai, Elise), comece pelo camp mais protegido e peca visao no rio.",
    acoes:["Decidir lado do clear pela comp e pelo primeiro objetivo","Pedir leash e avisar rota no chat","Colocar a sentinela inicial na rota de invade provavel"] },
  { t:"1:30", rot:"Primeiro clear",titulo:"Clear otimizado e sem tempo morto",
    txt:"Todos os camps nascem em 1:30. Um clear limpo de 6 camps termina entre 3:15 e 3:30. Cada segundo parado entre camps e ouro e XP perdidos: mexa em direcao ao proximo camp enquanto o atual morre.",
    acoes:["Kitar o camp andando na direcao do proximo","Usar o Smite no camp que mais devolve vida quando precisar","Chegar no rio com nivel 3 antes do caranguejo"] },
  { t:"3:30", rot:"Caranguejo",   titulo:"Primeiro teste de prioridade",
    txt:"O caranguejo nasce em 3:30 nos dois rios. Nao e sobre o caranguejo: e sobre quem controla o rio quando as Larvas e o Dragao nascerem. Sem prioridade de lane, ceda e va para o outro lado do mapa fazer algo com valor.",
    acoes:["Checar quem tem prio antes de andar para o rio","Ceder o caranguejo e pegar o do lado oposto e jogada valida","Nunca lutar 1v1 no rio sem visao do 4o inimigo"] },
  { t:"5:00", rot:"Dragao",       titulo:"Primeiro dragao no mapa",
    txt:"O primeiro dragao nasce em 5:00 e respawna 5:00 depois de morto. O setup comeca ~60-90s antes: limpe os camps proximos, coloque visao nas duas entradas e empurre as ondas das lanes proximas.",
    acoes:["Iniciar setup em 3:40-4:00, nao em 5:00","Visao nas duas entradas do covil","Se nao da para pegar, force troca: Larvas ou torre do outro lado"] },
  { t:"6:00", rot:"Larvas",       titulo:"Larvas do Vazio (1o conjunto)",
    txt:"As Larvas convertem-se em dano contra estruturas. Em comps com pressao de mapa e split, valem mais que o primeiro dragao. Pegar as 3 exige dano de grupo: chame o mid e o top.",
    acoes:["Decidir Larvas vs Dragao pela comp, nao por habito","Chamar 2 aliados: sozinho o clear e lento demais","Converter em placas de torre imediatamente"] },
  { t:"8:00", rot:"Meio de jogo", titulo:"Conversao: ouro vira estrutura",
    txt:"Entre 8 e 14 minutos, todo gank bem-sucedido precisa virar torre, camp roubado ou objetivo. Gank que termina com voce voltando para o proprio jungle e tempo jogado fora.",
    acoes:["Todo kill vira: onda empurrada -> placa ou camp inimigo","Comprar sentinela de controle em toda volta a base","Rastrear o jungler inimigo a cada camp que voce limpa"] },
  { t:"14:00",rot:"Larvas 2",     titulo:"Segundo conjunto de Larvas e as placas",
    txt:"As placas de torre caem aos 14:00. Esse e o pico de valor das Larvas e de qualquer pressao de estrutura. Planeje onde o grupo vai estar em 13:30, nao em 14:00.",
    acoes:["Posicionar o time antes do timer, nao depois","Trocar objetivos entre lados do mapa quando nao da para contestar"] },
  { t:"16:00",rot:"Arauto",       titulo:"Arauto do Vazio",
    txt:"O Arauto e tempo comprimido: derruba torre e abre o mapa para visao. Use-o na lane onde voce quer JOGAR os proximos 5 minutos, nao na lane que esta mais facil.",
    acoes:["Soltar o Arauto na lane que abre caminho para o Barao","Nunca soltar sem a onda empurrada junto"] },
  { t:"25:00",rot:"Barao",        titulo:"Barao Na'shor e o fim de jogo",
    txt:"Barao nao e o objetivo: o objetivo e o que o buff do Barao compra (inibidor, fim de jogo). Sem ondas empurradas, o buff vira apenas 3 minutos de nada.",
    acoes:["Empurrar as 3 ondas ANTES de iniciar","Contar as ultimates inimigas e a recarga de Smite","Ter saida planejada se o time inimigo aparecer"] }
];

var CAMPEOES = [
  {
    k:"Viego", nome:"Viego", slug:"viego", papel:"Skirmisher / Carry", cat:["skirmisher","carry"],
    dif:"Alta", corDif:"t-orange",
    resumo:"Converte cada abate em uma segunda vida com o kit do alvo. Escala melhor do que quase qualquer jungler quando o jogador sabe escolher qual corpo possuir na luta.",
    clear:"Clear medio-rapido com sustain alto. Full clear em ~3:20 sem precisar voltar a base.",
    runa:[RUNAS.conquistador, RUNAS.tempoLetal],
    itens:[{id:3153,n:"Rei Destruido"},{id:3111,n:"Mercurio"},{id:3078,n:"Trinitaria"},{id:6333,n:"Danca da Morte"},{id:3053,n:"Sterak"}],
    pontos:["Possessao devolve vida cheia: lute trades que pareciam perdidas","Prioriza possuir o engage inimigo, nao o carry","Punicao alta se errar a ordem de possessao"]
  },
  {
    k:"LeeSin", nome:"Lee Sin", slug:"lee-sin", papel:"Skirmisher / Early game", cat:["skirmisher","assassino"],
    dif:"Muito alta", corDif:"t-red",
    resumo:"O jungler de maior teto mecanico do jogo. Domina os 10 primeiros minutos e cai de forca depois: se voce nao converter cedo, o jogo escapa.",
    clear:"Clear rapido com 3 camps + gank. Feito para pressao imediata, nao para farm.",
    runa:[RUNAS.conquistador, RUNAS.eletrocutar],
    itens:[{id:6692,n:"Eclipse"},{id:3047,n:"Placas de Aco"},{id:3053,n:"Sterak"},{id:6333,n:"Danca da Morte"},{id:3156,n:"Malmortius"}],
    pontos:["Treine Q-Flash, insec e ward-hop em modo customizado antes da ranqueada","Seu pico e nivel 3-6: force o mapa nessa janela","Sem vantagem aos 15min voce vira o pior campeao da partida"]
  },
  {
    k:"Vi", nome:"Vi", slug:"vi", papel:"Engage / Iniciante", cat:["engage","iniciante","skirmisher"],
    dif:"Baixa", corDif:"t-green",
    resumo:"Ultimate que trava um alvo sem chance de erro. Melhor campeao do jogo para aprender macro de jungle sem gastar atencao em mecanica.",
    clear:"Clear solido e seguro, com boa vida restante para ganks logo apos o 3o camp.",
    runa:[RUNAS.conquistador, RUNAS.posChoque],
    itens:[{id:3078,n:"Trinitaria"},{id:3047,n:"Placas de Aco"},{id:3053,n:"Sterak"},{id:3748,n:"Hidra Titanica"},{id:3742,n:"Placa do Morto"}],
    pontos:["Ultimate garantida: ideal para aprender a escolher ALVO, nao so a acertar","Otimo para treinar timing de objetivo sem risco mecanico","Pouca fuga: erro de posicao custa a vida"]
  },
  {
    k:"Hecarim", nome:"Hecarim", slug:"hecarim", papel:"Engage / Carry", cat:["engage","carry"],
    dif:"Media", corDif:"t-gold",
    resumo:"Mobilidade absurda no mapa somada a engage de longa distancia. Um dos melhores para punir lanes empurradas em qualquer elo.",
    clear:"Clear rapido com boa vida. Chega no rio cedo e com velocidade para contestar caranguejo.",
    runa:[RUNAS.conquistador, RUNAS.corridaFase],
    itens:[{id:3078,n:"Trinitaria"},{id:3111,n:"Mercurio"},{id:3742,n:"Placa do Morto"},{id:3053,n:"Sterak"},{id:3748,n:"Hidra Titanica"}],
    pontos:["Velocidade de movimento vira dano: itens de movimento nao sao luxo","Ultimate e ferramenta de iniciar E de fugir","Ganks longos pelo rio sao seu diferencial"]
  },
  {
    k:"KhaZix", nome:"Kha'Zix", slug:"kha-zix", papel:"Assassino", cat:["assassino","carry"],
    dif:"Media", corDif:"t-gold",
    resumo:"Especialista em isolar e deletar alvos sozinhos. Exige leitura de mapa: seu valor vem de escolher o momento, nao de lutar.",
    clear:"Clear rapido com Q evoluida. Excelente em roubar camps por causa do reset do salto.",
    runa:[RUNAS.eletrocutar, RUNAS.saraivada],
    itens:[{id:6701,n:"Oportunidade"},{id:3142,n:"Youmuu"},{id:6694,n:"Serylda"},{id:6676,n:"O Coletor"},{id:3814,n:"Fio da Noite"}],
    pontos:["Primeira evolucao quase sempre no Q (isolamento)","Nao inicie lutas: entre depois que o CC inimigo foi gasto","Invisibilidade do R e ferramenta de reposicionamento, nao de fuga"]
  },
  {
    k:"Nidalee", nome:"Nidalee", slug:"nidalee", papel:"AP / Alto teto", cat:["ap","carry","assassino"],
    dif:"Muito alta", corDif:"t-red",
    resumo:"O clear mais rapido do jogo e a lanca com maior alcance. Teto altissimo e piso baixissimo: punicao severa quando os acertos nao vem.",
    clear:"Clear extremamente rapido. Consegue full clear + contra-jungle antes do inimigo terminar o dele.",
    runa:[RUNAS.conquistador, RUNAS.eletrocutar],
    itens:[{id:6653,n:"Liandry"},{id:3020,n:"Sapatos do Feiticeiro"},{id:3157,n:"Zhonya"},{id:4645,n:"Chama das Sombras"},{id:3089,n:"Rabadon"}],
    pontos:["Velocidade de clear e a arma principal: use para ganhar niveis e roubar camps","Lanca em alvo com marca de caca causa dano por distancia percorrida","Sem acerto de lanca, voce e um jungler sem dano"]
  },
  {
    k:"Sejuani", nome:"Sejuani", slug:"sejuani", papel:"Tanque / Engage", cat:["tanque","engage","iniciante"],
    dif:"Baixa", corDif:"t-green",
    resumo:"Iniciar lutas em area com ultimate de longo alcance. Continua relevante mesmo atrasada, o que a torna segura para subir de elo.",
    clear:"Clear medio, sem problemas de vida. Forte em lutas de objetivo desde cedo.",
    runa:[RUNAS.posChoque, RUNAS.agarre],
    itens:[{id:3068,n:"Egide Solar"},{id:3111,n:"Mercurio"},{id:3065,n:"Veu Espiritual"},{id:3075,n:"Cota de Espinhos"},{id:3110,n:"Coracao Congelado"}],
    pontos:["Campeao que perdoa: util mesmo 0/4","Ultimate transcontinental: iniciar de angulos que ninguem espera","Construa contra a comp inimiga, nao no automatico"]
  },
  {
    k:"Maokai", nome:"Maokai", slug:"maokai", papel:"Tanque / Controle", cat:["tanque","engage","iniciante"],
    dif:"Baixa", corDif:"t-green",
    resumo:"Ganks impossiveis de escapar gracas ao CC em cadeia. O tanque mais simples de aprender mantendo alto impacto em objetivos.",
    clear:"Clear seguro com sustain muito alto. Quase nunca precisa voltar cedo.",
    runa:[RUNAS.posChoque, RUNAS.agarre],
    itens:[{id:3068,n:"Egide Solar"},{id:3047,n:"Placas de Aco"},{id:3065,n:"Veu Espiritual"},{id:3193,n:"Placa de Gargula"},{id:3075,n:"Cota de Espinhos"}],
    pontos:["Mudas dao visao: use como sentinelas gratuitas no rio","Ultimate e o melhor setup de luta de Barao do jogo","Foco total em setup, nao em dano"]
  },
  {
    k:"Kindred", nome:"Kindred", slug:"kindred", papel:"Atirador / Scaling", cat:["carry","skirmisher"],
    dif:"Alta", corDif:"t-orange",
    resumo:"Escala com marcas: cada pilha e um investimento no fim de jogo. Exige rastrear o jungler inimigo melhor do que qualquer outro campeao.",
    clear:"Clear rapido e seguro a distancia. Prioriza farm e marcas em vez de ganks.",
    runa:[RUNAS.tempoLetal, RUNAS.passoRapido],
    itens:[{id:6672,n:"Matador de Kraken"},{id:3006,n:"Grevas"},{id:3153,n:"Rei Destruido"},{id:3124,n:"Guinsoo"},{id:3072,n:"Sedento por Sangue"}],
    pontos:["Marcar camps inimigos exige saber onde o jungler adversario esta","Ultimate salva o time inteiro: segure para o momento certo","Sem marcas aos 20min, o jogo escapa"]
  },
  {
    k:"Graves", nome:"Graves", slug:"graves", papel:"Carry / Duelista", cat:["carry","skirmisher"],
    dif:"Alta", corDif:"t-orange",
    resumo:"Maior dano sustentado por segundo entre os junglers. Vence quase qualquer 1v1 no jungle com itens iguais, mas exige posicionamento fino.",
    clear:"Clear muito rapido. Contra-jungle agressivo e o padrao de jogo dele.",
    runa:[RUNAS.conquistador, RUNAS.passoRapido],
    itens:[{id:6676,n:"O Coletor"},{id:3006,n:"Grevas"},{id:3036,n:"Lorde Dominik"},{id:3031,n:"Gume do Infinito"},{id:3072,n:"Sedento por Sangue"}],
    pontos:["Duas municoes: nunca entre em trade com o pente vazio","Fumaca bloqueia visao inimiga em lutas de objetivo","Dano em cone: posicione para acertar varios alvos"]
  },
  {
    k:"Fiddlesticks", nome:"Fiddlesticks", slug:"fiddlesticks", papel:"AP / Teamfight", cat:["ap","engage"],
    dif:"Media", corDif:"t-gold",
    resumo:"Uma ultimate bem usada ganha a luta antes dela comecar. Controle de visao e a habilidade real: as sentinelas falsas fazem metade do trabalho.",
    clear:"Clear lento no inicio, muito rapido depois do primeiro item. Pico claro no meio de jogo.",
    runa:[RUNAS.colheita, RUNAS.conquistador],
    itens:[{id:6653,n:"Liandry"},{id:3020,n:"Sapatos do Feiticeiro"},{id:3157,n:"Zhonya"},{id:3116,n:"Rylai"},{id:3089,n:"Rabadon"}],
    pontos:["Sentinelas falsas escondem voce e dao visao: use sempre antes de objetivo","Medo em area e o melhor inicio de luta do jogo","Primeiros 6 minutos sao fracos: jogue seguro e farme"]
  },
  {
    k:"Zac", nome:"Zac", slug:"zac", papel:"Tanque / Engage", cat:["tanque","engage"],
    dif:"Media", corDif:"t-gold",
    resumo:"Engage de distancia enorme com o E, e retorno a vida com a passiva. Melhor campeao para ganks de angulo impossivel.",
    clear:"Clear sustentado com vida alta. Sempre pronto para gank apos qualquer camp.",
    runa:[RUNAS.posChoque, RUNAS.agarre],
    itens:[{id:3068,n:"Egide Solar"},{id:3111,n:"Mercurio"},{id:3065,n:"Veu Espiritual"},{id:3193,n:"Placa de Gargula"},{id:3110,n:"Coracao Congelado"}],
    pontos:["E carregado atravessa paredes: mapeie os angulos de gank de cada lane","Passiva de revivencia ganha lutas 4v5","Precisa de tempo para carregar: telegrafa o gank"]
  },
  {
    k:"JarvanIV", nome:"Jarvan IV", slug:"jarvan-iv", papel:"Engage / Iniciante", cat:["engage","iniciante","skirmisher"],
    dif:"Baixa", corDif:"t-green",
    resumo:"Combo E-Q de aprendizado rapido e ultimate que prende um alvo. Um dos caminhos mais curtos para aprender ganks bem executados.",
    clear:"Clear rapido e consistente, com boa vida restante para pressao pos-clear.",
    runa:[RUNAS.conquistador, RUNAS.posChoque],
    itens:[{id:3078,n:"Trinitaria"},{id:3047,n:"Placas de Aco"},{id:3053,n:"Sterak"},{id:3742,n:"Placa do Morto"},{id:3193,n:"Placa de Gargula"}],
    pontos:["Bandeira da visao e serve de fuga: use para checar arbustos","Ultimate pode isolar OU salvar aliado: escolha com intencao","Pico forte do nivel 6 ao 14"]
  },
  {
    k:"Elise", nome:"Elise", slug:"elise", papel:"Assassino / Early", cat:["assassino","ap","skirmisher"],
    dif:"Alta", corDif:"t-orange",
    resumo:"Melhor jungler de invade e de duelo nos primeiros niveis. Ganks com desprendimento aereo contornam qualquer barreira de terreno.",
    clear:"Clear rapido com troca de forma. Feita para invadir, nao para farmar.",
    runa:[RUNAS.eletrocutar, RUNAS.conquistador],
    itens:[{id:6653,n:"Liandry"},{id:3020,n:"Sapatos do Feiticeiro"},{id:3157,n:"Zhonya"},{id:3116,n:"Rylai"},{id:4645,n:"Chama das Sombras"}],
    pontos:["Gerencie as duas formas: humano para dano a distancia, aranha para perseguir","Pico absoluto nos minutos 2-10: force invade","Escala mal: converta a vantagem antes dos 20min"]
  },
  {
    k:"Karthus", nome:"Karthus", slug:"karthus", papel:"AP / Scaling", cat:["ap","carry"],
    dif:"Media", corDif:"t-gold",
    resumo:"Joga para o fim de jogo com ultimate global que fecha partidas. O jogo dele e farm e pressao de mapa, nao ganks.",
    clear:"Um dos clears mais rapidos do jogo. Vive de acumular niveis e itens.",
    runa:[RUNAS.conquistador, RUNAS.colheita],
    itens:[{id:6655,n:"Companheiro de Luden"},{id:3020,n:"Sapatos do Feiticeiro"},{id:3157,n:"Zhonya"},{id:3089,n:"Rabadon"},{id:3135,n:"Cajado do Vazio"}],
    pontos:["Passiva permite continuar lutando apos morrer: morrer bem e uma habilidade","Ultimate global finaliza inimigos em qualquer lane","Time precisa aguentar ate os 20min: comunique isso cedo"]
  },
  {
    k:"Warwick", nome:"Warwick", slug:"warwick", papel:"Iniciante / Duelista", cat:["iniciante","tanque","skirmisher"],
    dif:"Muito baixa", corDif:"t-green",
    resumo:"O melhor campeao para quem esta aprendendo a rota. Sustain enorme, ganks simples e ultimate que garante CC sem precisar de mira.",
    clear:"Clear com sustain quase infinito. Nunca precisa voltar por causa de vida.",
    runa:[RUNAS.conquistador, RUNAS.posChoque],
    itens:[{id:3153,n:"Rei Destruido"},{id:3047,n:"Placas de Aco"},{id:3065,n:"Veu Espiritual"},{id:3075,n:"Cota de Espinhos"},{id:3193,n:"Placa de Gargula"}],
    pontos:["Passiva detecta inimigos com pouca vida: use como radar de gank","Ultimate nao erra: perfeito para praticar escolha de alvo","Use os 70% de foco em macro, ja que a mecanica e simples"]
  },
  {
    k:"Belveth", nome:"Bel'Veth", slug:"bel-veth", papel:"Carry / Scaling", cat:["carry","skirmisher"],
    dif:"Alta", corDif:"t-orange",
    resumo:"Escala sem limite com as pilhas das Larvas. Duelista de fim de jogo capaz de vencer 1v3 quando bem alimentada.",
    clear:"Clear rapido apos os primeiros itens. Gosta de disputar objetivos de Vazio cedo.",
    runa:[RUNAS.conquistador, RUNAS.tempoLetal],
    itens:[{id:3153,n:"Rei Destruido"},{id:3006,n:"Grevas"},{id:3124,n:"Guinsoo"},{id:3153,n:"Hidra Ravaging"},{id:3072,n:"Sedento por Sangue"}],
    pontos:["Larvas do Vazio sao literalmente pilhas permanentes: priorize-as","Forma verdadeira muda o padrao de luta: saiba quando ativar","Inicio fraco: sobreviva ate o primeiro item"]
  },
  {
    k:"XinZhao", nome:"Xin Zhao", slug:"xin-zhao", papel:"Duelista / Iniciante", cat:["iniciante","skirmisher","engage"],
    dif:"Baixa", corDif:"t-green",
    resumo:"Duelo bruto nos primeiros niveis. Excelente para aprender a punir invades e a converter vantagem de early em objetivos.",
    clear:"Clear rapido com muito sustain. Pronto para lutar no rio desde o nivel 3.",
    runa:[RUNAS.conquistador, RUNAS.ataquePleno],
    itens:[{id:3153,n:"Rei Destruido"},{id:3047,n:"Placas de Aco"},{id:3053,n:"Sterak"},{id:6333,n:"Danca da Morte"},{id:3748,n:"Hidra Titanica"}],
    pontos:["Ultimate empurra todos menos o alvo marcado: ferramenta de peel e de foco","Vence a maioria dos duelos de nivel 3 no rio","Cai de forca no fim de jogo: force a decisao cedo"]
  },
  {
    k:"Nocturne", nome:"Nocturne", slug:"nocturne", papel:"Assassino / Pick", cat:["assassino","carry","iniciante"],
    dif:"Baixa", corDif:"t-green",
    resumo:"Ultimate global que cega o mapa inteiro e entrega um pick garantido. Simples de executar e devastador em elos medios.",
    clear:"Clear rapido com sustain do passivo. Pico claro no nivel 6.",
    runa:[RUNAS.eletrocutar, RUNAS.conquistador],
    itens:[{id:6701,n:"Oportunidade"},{id:3142,n:"Youmuu"},{id:3814,n:"Fio da Noite"},{id:6694,n:"Serylda"},{id:6676,n:"O Coletor"}],
    pontos:["Nivel 6 e nivel 11 sao janelas de jogo: avise o time antes","Escudo do E bloqueia o primeiro CC: use contra o engage inimigo","Sem ultimate, seu gank e muito mais fraco"]
  },
  {
    k:"Lillia", nome:"Lillia", slug:"lillia", papel:"AP / Scaling", cat:["ap","carry","skirmisher"],
    dif:"Media", corDif:"t-gold",
    resumo:"Dano continuo em area com mobilidade alta. Excelente para limpar o mapa rapido e aparecer em lutas de onde ninguem esperava.",
    clear:"Clear muito rapido e saudavel. Ideal para jogar por tempo e nivel.",
    runa:[RUNAS.conquistador, RUNAS.colheita],
    itens:[{id:3115,n:"Dente de Nashor"},{id:3158,n:"Botas Jonicas"},{id:6653,n:"Liandry"},{id:3116,n:"Rylai"},{id:3089,n:"Rabadon"}],
    pontos:["Ultimate adormece inimigos marcados: setup de luta em area","Velocidade de movimento permite ganks de angulo longo","Fragil: nunca inicie de frente"]
  }
];

var ROADMAP = [
  {
    fase:1, semanas:"Semanas 1 a 3", titulo:"Fundamentos e Consistencia Mecanica",
    mini:"Objetivo da fase: parar de perder ouro e XP por tempo morto. Nada de macro avancado ainda.",
    itens:[
      "Escolher 3 campeoes (1 tanque/engage, 1 duelista, 1 escalonador) e travar o pool por 3 semanas",
      "Fazer 20 clears cronometrados em partida personalizada: meta de 6 camps abaixo de 3:30",
      "Decorar os tempos de renascimento: camps pequenos 2:15, buffs 5:00, caranguejo 2:30",
      "Nunca terminar um camp parado: sempre kitar andando na direcao do proximo",
      "Registrar o CS de jungle aos 10 minutos em todas as partidas (meta inicial: 65+)",
      "Comprar sentinela de controle em 100% das voltas a base",
      "Assistir 3 VODs proprios, apenas os 10 primeiros minutos, anotando cada segundo parado",
      "Aprender a rota padrao dos dois lados do mapa (topo-primeiro e base-primeiro)"
    ]
  },
  {
    fase:2, semanas:"Semanas 4 a 6", titulo:"Rastreamento e Pathing Adaptativo",
    mini:"Objetivo da fase: sempre ter uma resposta para 'onde esta o jungler inimigo?'.",
    itens:[
      "Anotar mentalmente onde o jungler inimigo comecou em TODAS as partidas",
      "Colocar sentinela de rastreamento nas Aves inimigas antes de 2:30 em 10 partidas seguidas",
      "Praticar a regra dos 40 segundos: visto em um lado, ele chega ao outro lado em ~40-60s",
      "Escolher o lado do clear com base na comp e no primeiro objetivo, nunca por habito",
      "Adaptar o pathing no meio do clear quando aparecer informacao nova",
      "Fazer 5 contra-jungles limpas por semana: entrar com visao e sair com rota planejada",
      "Aprender a ler o estado das ondas antes de decidir o gank",
      "Meta de KPI: diferenca de ouro contra o jungler inimigo aos 10min positiva em 50% das partidas"
    ]
  },
  {
    fase:3, semanas:"Semanas 7 a 9", titulo:"Objetivos, Setup e Controle de Visao",
    mini:"Objetivo da fase: nenhum objetivo importante nasce com voce do lado errado do mapa.",
    itens:[
      "Iniciar o setup de todo objetivo 60 a 90 segundos antes do renascimento",
      "Avisar o time por ping/chat 30s antes de cada objetivo, sempre",
      "Limpar os camps proximos ao covil ANTES do objetivo, nunca durante",
      "Colocar visao nas duas entradas do covil antes de qualquer contestacao",
      "Praticar a troca de objetivos: nao da para pegar dragao? pegue Larvas ou torre do outro lado",
      "Treinar disputa de Smite em partida personalizada: calcular o dano do Smite pelo HP do objetivo",
      "Converter 100% dos ganks bem-sucedidos em placa de torre, camp roubado ou objetivo",
      "Meta de KPI: participacao em objetivos acima de 70%"
    ]
  },
  {
    fase:4, semanas:"Semanas 10 a 12", titulo:"Macro Tardio, Shotcalling e Revisao",
    mini:"Objetivo da fase: transformar vantagem em vitoria. A maior parte das partidas se perde aqui.",
    itens:[
      "Montar visao profunda para o Barao a partir dos 20 minutos, sempre antes do timer",
      "Antes de toda luta, contar Flashes e ultimates dos 5 inimigos",
      "Praticar o estado 1-3-1 e 1-4: saber quando agrupar e quando dividir",
      "Chamar as decisoes no chat com antecedencia, de forma curta e objetiva",
      "Nunca iniciar Barao sem as tres ondas empurradas",
      "Revisar 1 VOD completo por semana focando apenas nas decisoes apos os 20 minutos",
      "Manter um diario de partidas: 3 erros e 1 acerto por sessao de jogo",
      "Reavaliar o pool: manter os 2 campeoes com melhor desempenho e testar 1 novo"
    ]
  }
];

var KPIS = [
  { alvo:"70+",   nome:"CS de jungle aos 10min", txt:"Somando camps e minions. Abaixo de 60 indica tempo morto ou rota mal planejada." },
  { alvo:"≥70%",  nome:"Participacao em objetivos", txt:"Percentual de dragoes, larvas, arautos e baroes em que voce esteve presente." },
  { alvo:"≥1,0",  nome:"Pontuacao de visao / min", txt:"Jungler que nao coloca visao entrega o controle do mapa para o adversario." },
  { alvo:"≤4",    nome:"Mortes por partida", txt:"Cada morte de jungler custa camps, objetivo e tempo. E o KPI mais subestimado." },
  { alvo:"100%",  nome:"Conversao pos-gank", txt:"Todo gank com sucesso precisa virar torre, camp roubado ou objetivo." },
  { alvo:"2+",    nome:"Sentinelas de controle / volta", txt:"Compradas em toda ida a base. Visao e o item mais barato do jogo." },
  { alvo:"0",     nome:"Objetivos perdidos por posicao", txt:"Quantas vezes um objetivo nasceu com voce do lado errado do mapa." },
  { alvo:"≥50%",  nome:"Diferenca de ouro vs jungler inimigo @10", txt:"Mede diretamente a qualidade do seu clear e do seu contra-jungle." }
];

var FAQ = [
  { q:"Devo fazer full clear ou 3 camps e gankar?",
    a:"Depende de tres coisas: o campeao, o estado das lanes e o proximo objetivo. Campeoes de escala (Karthus, Kindred, Lillia) querem full clear. Campeoes de pico inicial (Lee Sin, Elise, Xin Zhao) querem 3 camps e pressao imediata. A regra que vale para todos: termine o clear do lado do proximo objetivo relevante." },
  { q:"Como eu rastreio o jungler inimigo sem sentinela?",
    a:"Tres fontes de informacao gratuitas: (1) qual lane empurrou primeiro no nivel 1 indica de que lado ele comecou; (2) o tempo que uma lane sua levou um gank indica onde ele estava; (3) camps inimigos que voce ve vazios ao passar contam a rota dele. Some isso ao tempo medio de clear (~3:20 para 6 camps) e voce consegue prever onde ele esta com boa margem." },
  { q:"Quando vale a pena invadir o jungle inimigo?",
    a:"Quatro condicoes. Voce precisa de pelo menos tres: o jungler inimigo esta visto do outro lado do mapa, voce tem prioridade na lane mais proxima, voce tem visao da entrada e da saida, e voce ganha o duelo caso ele apareca. Invadir sem essas condicoes e a forma mais rapida de perder o jogo em 4 minutos." },
  { q:"Meu time nao ajuda em objetivo. O que eu faco?",
    a:"Pare de pedir ajuda no momento do objetivo e comece a criar a condicao 60-90 segundos antes. Empurre as ondas proximas, limpe os camps do lado, ping o objetivo cedo. Time que esta com onda empurrada e sem perigo de morte vai aparecer. Time chamado em cima da hora, com onda em cima da torre, nunca vai." },
  { q:"Vale a pena roubar camps do jungler inimigo mesmo sem matar ele?",
    a:"Vale, e muito. Cada camp pequeno roubado tira ~85 de ouro e ~190 de XP dele e ainda quebra a rota planejada. Dois camps roubados podem atrasar um nivel inteiro. Priorize XP sobre ouro no inicio: nivel e o recurso mais valioso do jungler antes dos 10 minutos." },
  { q:"Quantos campeoes eu devo jogar para subir de elo?",
    a:"Tres, com um quarto opcional para casos especificos. O pool ideal cobre tres funcoes: um tanque de engage para comps que precisam iniciar, um duelista para punir jungle inimigo, e um escalonador para partidas longas. Mais que isso dilui a repeticao, que e exatamente o que constroi consistencia." },
  { q:"Como eu sei se meu clear esta bom?",
    a:"Cronometre em partida personalizada. Seis camps abaixo de 3:30 e um bom parametro para a maioria dos campeoes; abaixo de 3:20 e nivel alto. Mas a metrica que realmente importa e o tempo morto: some todos os segundos em que voce ficou parado sem farmar, sem andar para um objetivo e sem ganhar nada. Em nivel Challenger, esse numero fica perto de zero." },
  { q:"Os tempos de objetivo mudam de patch?",
    a:"Mudam, e com frequencia. Riot ajusta tempos de renascimento e de nascimento de objetivos epicos a cada temporada e as vezes no meio dela. Os valores desta pagina servem como referencia de estudo. Confirme sempre as notas de atualizacao do patch atual antes de montar sua rotina definitiva." }
];
