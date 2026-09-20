/* =========================================================================
   JUNGLE CHALLENGER · Interatividade
   Depende de dados.js (CAMPS, TIMELINE, CAMPEOES, ROADMAP, KPIS, FAQ, RUNAS)
   ========================================================================= */
(function () {
  "use strict";

  var $  = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };
  var SVG_NS = "http://www.w3.org/2000/svg";

  /* ---------------------------------------------------------------------
     1. Data Dragon: descobre a versao mais recente do jogo
     --------------------------------------------------------------------- */
  var ddVersao = DDRAGON_FALLBACK;

  function urlCampeao(chave) {
    return "https://ddragon.leagueoflegends.com/cdn/" + ddVersao + "/img/champion/" + chave + ".png";
  }
  function urlItem(id) {
    return "https://ddragon.leagueoflegends.com/cdn/" + ddVersao + "/img/item/" + id + ".png";
  }

  function carregarVersao() {
    if (!window.fetch) { return Promise.resolve(); }
    return fetch("https://ddragon.leagueoflegends.com/api/versions.json")
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (lista) {
        if (lista && lista.length) {
          ddVersao = lista[0];
          console.log("[Data Dragon] versao detectada:", ddVersao);
        }
      })
      .catch(function () {
        console.warn("[Data Dragon] usando versao de fallback:", ddVersao);
      });
  }

  /* Substitui a imagem por um bloco de texto quando o arquivo nao existe */
  function comFallback(img, texto) {
    img.addEventListener("error", function () {
      var alvo = img.parentNode;
      img.style.display = "none";
      if (alvo && !alvo.querySelector(".fallback")) {
        var d = document.createElement("div");
        d.className = "fallback";
        d.textContent = texto;
        alvo.appendChild(d);
      }
    });
  }

  /* ---------------------------------------------------------------------
     2. Mapa interativo
     --------------------------------------------------------------------- */
  function montarMapa() {
    var camada = $("#camadaCamps");
    if (!camada) { return; }

    CAMPS.forEach(function (c) {
      var g = document.createElementNS(SVG_NS, "g");
      g.setAttribute("class", "camp");
      g.setAttribute("data-id", c.id);
      g.setAttribute("tabindex", "0");
      g.setAttribute("role", "button");
      g.setAttribute("aria-label", c.nome + " — lado " + c.lado);

      var anel = document.createElementNS(SVG_NS, "circle");
      anel.setAttribute("class", "anel");
      anel.setAttribute("cx", c.x); anel.setAttribute("cy", c.y); anel.setAttribute("r", 15);
      anel.setAttribute("stroke", c.cor);

      var nucleo = document.createElementNS(SVG_NS, "circle");
      nucleo.setAttribute("class", "nucleo");
      nucleo.setAttribute("cx", c.x); nucleo.setAttribute("cy", c.y); nucleo.setAttribute("r", 8);
      nucleo.setAttribute("fill", c.cor);
      nucleo.setAttribute("fill-opacity", ".85");

      var hit = document.createElementNS(SVG_NS, "circle");
      hit.setAttribute("class", "hit");
      hit.setAttribute("cx", c.x); hit.setAttribute("cy", c.y); hit.setAttribute("r", 24);

      var rot = document.createElementNS(SVG_NS, "text");
      rot.setAttribute("x", c.x); rot.setAttribute("y", c.y + 30);
      rot.textContent = c.nome.replace(" (topo)", "").replace(" (base)", "");

      g.appendChild(anel); g.appendChild(nucleo); g.appendChild(rot); g.appendChild(hit);
      camada.appendChild(g);

      function selecionar() { mostrarCamp(c, g); }
      g.addEventListener("click", selecionar);
      g.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selecionar(); }
      });
    });
  }

  function mostrarCamp(c, g) {
    $$(".camp").forEach(function (el) { el.classList.remove("sel"); });
    g.classList.add("sel");

    $("#mapaInfo").innerHTML =
      '<h3><span class="pin" style="background:' + c.cor + '"></span>' + c.nome + '</h3>' +
      '<span class="tag t-teal">' + c.lado + '</span>' +
      '<dl class="kv">' +
        '<dt>Nasce</dt><dd>' + c.spawn + '</dd>' +
        '<dt>Renasce</dt><dd>' + c.respawn + '</dd>' +
        '<dt>Experiência</dt><dd>' + c.xp + '</dd>' +
        '<dt>Ouro</dt><dd>' + c.ouro + '</dd>' +
      '</dl>' +
      '<h4>Leitura tática</h4>' +
      '<p style="font-size:.92rem;margin:0">' + c.dica + '</p>';

    track("camp_clicado", { camp: c.nome, lado: c.lado });
  }

  /* ---------------------------------------------------------------------
     3. Linha do tempo da partida
     --------------------------------------------------------------------- */
  function montarTimeline() {
    var cont = $("#tlItens");
    if (!cont) { return; }

    TIMELINE.forEach(function (m, i) {
      var d = document.createElement("div");
      d.className = "tl-item" + (i === 0 ? " on" : "");
      d.setAttribute("tabindex", "0");
      d.setAttribute("role", "button");
      d.innerHTML = '<span class="hora">' + m.t + '</span><div class="no"></div><div class="rot">' + m.rot + '</div>';

      function abrir() {
        $$(".tl-item").forEach(function (x) { x.classList.remove("on"); });
        d.classList.add("on");
        detalheTimeline(m);
        track("timeline_marco", { marco: m.t + " " + m.rot });
      }
      d.addEventListener("click", abrir);
      d.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrir(); }
      });
      cont.appendChild(d);
    });

    detalheTimeline(TIMELINE[0]);
  }

  function detalheTimeline(m) {
    $("#tlDetalhe").innerHTML =
      '<span class="tag t-gold">' + m.t + '</span>' +
      '<h3>' + m.titulo + '</h3>' +
      '<p>' + m.txt + '</p>' +
      '<h4>O que precisa estar feito</h4>' +
      '<ul style="margin:0;padding-left:18px">' +
        m.acoes.map(function (a) { return '<li>' + a + '</li>'; }).join("") +
      '</ul>';
  }

  /* ---------------------------------------------------------------------
     4. Calculadora de renascimento
     --------------------------------------------------------------------- */
  function fmt(seg) {
    if (seg < 0) { seg = 0; }
    var m = Math.floor(seg / 60), s = seg % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  function calcular() {
    var sel    = $("#calcTipo");
    var dur    = parseInt(sel.value, 10);
    var setup  = parseInt(sel.options[sel.selectedIndex].getAttribute("data-setup"), 10);
    var min    = parseInt($("#calcMin").value, 10) || 0;
    var seg    = parseInt($("#calcSeg").value, 10) || 0;
    var morte  = min * 60 + Math.min(seg, 59);
    var volta  = morte + dur;

    $("#saidaRenasce").textContent = fmt(volta);
    $("#saidaSetup").textContent   = fmt(volta - setup);
    $("#saidaVisao").textContent   = fmt(volta - setup - 30);
    $("#saidaAviso").textContent   = fmt(volta - 30);

    track("calculadora_usada", {
      objetivo: sel.options[sel.selectedIndex].text,
      momento_morte: fmt(morte)
    });
  }

  /* ---------------------------------------------------------------------
     5. Abas de pathing
     --------------------------------------------------------------------- */
  function montarAbas() {
    $$(".aba").forEach(function (b) {
      b.addEventListener("click", function () {
        $$(".aba").forEach(function (x) { x.classList.remove("on"); });
        $$(".painel").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        var alvo = $("#" + b.getAttribute("data-painel"));
        if (alvo) { alvo.classList.add("on"); }
        track("aba_pathing", { aba: b.textContent.trim() });
      });
    });
  }

  /* ---------------------------------------------------------------------
     6. Pool de campeoes + modal de build
     --------------------------------------------------------------------- */
  function montarCampeoes() {
    var grid = $("#champGrid");
    if (!grid) { return; }

    CAMPEOES.forEach(function (c) {
      var card = document.createElement("article");
      card.className = "champ";
      card.setAttribute("data-cat", c.cat.join(" "));
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "Ver build de " + c.nome);

      var foto = document.createElement("div");
      foto.className = "foto";
      var img = document.createElement("img");
      img.src = urlCampeao(c.k);
      img.alt = c.nome;
      img.loading = "lazy";
      comFallback(img, c.nome.charAt(0));
      foto.appendChild(img);

      var dif = document.createElement("span");
      dif.className = "dif " + c.corDif;
      dif.textContent = c.dif;

      card.appendChild(dif);
      card.appendChild(foto);
      card.insertAdjacentHTML("beforeend",
        '<div class="nome">' + c.nome + '</div><div class="papel">' + c.papel + '</div>');

      function abrir() { abrirModal(c); }
      card.addEventListener("click", abrir);
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrir(); }
      });
      grid.appendChild(card);
    });

    $$(".filtro").forEach(function (b) {
      b.addEventListener("click", function () {
        $$(".filtro").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        var cat = b.getAttribute("data-cat");
        var visiveis = 0;
        $$(".champ").forEach(function (card) {
          var ok = cat === "todos" || card.getAttribute("data-cat").indexOf(cat) > -1;
          card.style.display = ok ? "" : "none";
          if (ok) { visiveis++; }
        });
        track("filtro_campeao", { categoria: b.textContent.trim(), resultados: visiveis });
      });
    });
  }

  function abrirModal(c) {
    var opgg = "https://op.gg/lol/champions/" + c.slug + "/build/jungle";

    var runasHtml = c.runa.map(function (r) {
      return '<div class="runa"><img src="' + r.img + '" alt="" loading="lazy"><span>' + r.nome + '</span></div>';
    }).join("");

    var itensHtml = c.itens.map(function (it, i) {
      return '<div class="item">' +
               '<img src="' + urlItem(it.id) + '" alt="' + it.n + '" title="' + it.n + '" loading="lazy">' +
               '<div class="ord">' + (i + 1) + 'º</div>' +
               '<div class="nm">' + it.n + '</div>' +
             '</div>';
    }).join('<span style="align-self:center;color:var(--txt-dim)">›</span>');

    $("#modal").innerHTML =
      '<div class="modal-top">' +
        '<img class="av" src="' + urlCampeao(c.k) + '" alt="' + c.nome + '">' +
        '<div><h3>' + c.nome + '</h3>' +
          '<span class="tag t-teal">' + c.papel + '</span>' +
          '<span class="tag ' + c.corDif + '">Dificuldade: ' + c.dif + '</span></div>' +
        '<button class="modal-fechar" aria-label="Fechar">✕</button>' +
      '</div>' +
      '<div class="modal-corpo">' +
        '<p>' + c.resumo + '</p>' +
        '<div class="bloco-build"><h4>Perfil de clear</h4><p style="margin:0">' + c.clear + '</p></div>' +
        '<div class="bloco-build"><h4>Runas principais (opções)</h4><div class="runas">' + runasHtml + '</div></div>' +
        '<div class="bloco-build"><h4>Ordem de itens — referência</h4><div class="itens">' + itensHtml + '</div></div>' +
        '<div class="bloco-build"><h4>Notas de jogo</h4><ul style="margin:0;padding-left:18px">' +
          c.pontos.map(function (p) { return '<li>' + p + '</li>'; }).join("") +
        '</ul></div>' +
        '<a class="opgg" href="' + opgg + '" target="_blank" rel="noopener" data-opgg="' + c.nome + '">' +
          '📊 Ver build atualizada no OP.GG</a>' +
        '<p style="font-size:.78rem;color:var(--txt-dim);margin:14px 0 0">' +
          'Itens e runas mudam a cada atualização do jogo. Confira sempre a taxa de vitória do patch atual.</p>' +
      '</div>';

    $$("#modal img").forEach(function (im) {
      im.addEventListener("error", function () { im.style.visibility = "hidden"; });
    });

    $(".modal-fechar").addEventListener("click", fecharModal);
    $('[data-opgg]').addEventListener("click", function () {
      track("clique_opgg", { campeao: c.nome, destino: opgg });
    });

    $("#modalBg").classList.add("on");
    $("#modalBg").setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    track("campeao_aberto", { campeao: c.nome, papel: c.papel, dificuldade: c.dif });
  }

  function fecharModal() {
    $("#modalBg").classList.remove("on");
    $("#modalBg").setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  /* ---------------------------------------------------------------------
     7. KPIs
     --------------------------------------------------------------------- */
  function montarKpis() {
    var g = $("#gridKpi");
    if (!g) { return; }
    g.innerHTML = KPIS.map(function (k) {
      return '<div class="kpi"><div class="alvo">' + k.alvo + '</div>' +
             '<div class="nome">' + k.nome + '</div><p>' + k.txt + '</p></div>';
    }).join("");
  }

  /* ---------------------------------------------------------------------
     8. Roadmap com progresso salvo no navegador
     --------------------------------------------------------------------- */
  var CHAVE = "jungle-challenger-progresso";

  function lerProgresso() {
    try { return JSON.parse(localStorage.getItem(CHAVE)) || {}; }
    catch (e) { return {}; }
  }
  function salvarProgresso(obj) {
    try { localStorage.setItem(CHAVE, JSON.stringify(obj)); } catch (e) { /* modo privado */ }
  }

  function montarRoadmap() {
    var cont = $("#listaFases");
    if (!cont) { return; }
    var salvo = lerProgresso();

    ROADMAP.forEach(function (f, iF) {
      var fase = document.createElement("div");
      fase.className = "fase" + (iF === 0 ? " aberta" : "");

      var itensHtml = f.itens.map(function (txt, iI) {
        var id = "f" + f.fase + "i" + iI;
        var marcado = salvo[id] ? " checked" : "";
        return '<label class="check"><input type="checkbox" data-id="' + id + '"' + marcado +
               '><span>' + txt + '</span></label>';
      }).join("");

      fase.innerHTML =
        '<div class="fase-top" role="button" tabindex="0">' +
          '<span class="numero">' + f.fase + '</span>' +
          '<div><span class="sem">' + f.semanas + '</span><h3>' + f.titulo + '</h3></div>' +
          '<span class="chev">▼</span>' +
        '</div>' +
        '<div class="fase-corpo"><div class="fase-corpo-in">' +
          '<p class="fase-mini">' + f.mini + '</p>' + itensHtml +
        '</div></div>';

      cont.appendChild(fase);

      var topo  = $(".fase-top", fase);
      var corpo = $(".fase-corpo", fase);

      function alternar() {
        var abrindo = !fase.classList.contains("aberta");
        fase.classList.toggle("aberta");
        corpo.style.maxHeight = abrindo ? corpo.scrollHeight + "px" : "0";
        if (abrindo) { track("fase_aberta", { fase: f.fase, titulo: f.titulo }); }
      }
      topo.addEventListener("click", alternar);
      topo.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); alternar(); }
      });

      if (iF === 0) {
        requestAnimationFrame(function () { corpo.style.maxHeight = corpo.scrollHeight + "px"; });
      }
    });

    $$('#listaFases input[type="checkbox"]').forEach(function (cb) {
      cb.addEventListener("change", function () {
        var p = lerProgresso();
        if (cb.checked) { p[cb.getAttribute("data-id")] = 1; }
        else { delete p[cb.getAttribute("data-id")]; }
        salvarProgresso(p);
        atualizarBarra();
        track("tarefa_marcada", {
          tarefa: cb.nextElementSibling.textContent.slice(0, 80),
          concluida: cb.checked
        });
      });
    });

    atualizarBarra();

    var limpar = $("#limparProgresso");
    if (limpar) {
      limpar.addEventListener("click", function () {
        if (!confirm("Zerar todo o progresso do roadmap salvo neste navegador?")) { return; }
        salvarProgresso({});
        $$('#listaFases input[type="checkbox"]').forEach(function (cb) { cb.checked = false; });
        atualizarBarra();
        track("progresso_zerado", {});
      });
    }
  }

  function atualizarBarra() {
    var todos = $$('#listaFases input[type="checkbox"]');
    if (!todos.length) { return; }
    var feitos = todos.filter(function (c) { return c.checked; }).length;
    var pct = Math.round(feitos / todos.length * 100);
    $("#barraProgresso").style.width = pct + "%";
    $("#pctProgresso").textContent = pct + "%";
  }

  /* ---------------------------------------------------------------------
     9. FAQ
     --------------------------------------------------------------------- */
  function montarFaq() {
    var cont = $("#listaFaq");
    if (!cont) { return; }

    FAQ.forEach(function (f) {
      var d = document.createElement("div");
      d.className = "faq";
      d.innerHTML =
        '<button class="faq-q">' + f.q + '<span class="sinal">+</span></button>' +
        '<div class="faq-a"><div class="faq-a-in">' + f.a + '</div></div>';
      cont.appendChild(d);

      var btn  = $(".faq-q", d);
      var resp = $(".faq-a", d);
      btn.addEventListener("click", function () {
        var abrindo = !d.classList.contains("aberta");
        d.classList.toggle("aberta");
        resp.style.maxHeight = abrindo ? resp.scrollHeight + "px" : "0";
        if (abrindo) { track("faq_aberta", { pergunta: f.q.slice(0, 90) }); }
      });
    });
  }

  /* ---------------------------------------------------------------------
     10. Navegacao, progresso de leitura, revelacao ao rolar
     --------------------------------------------------------------------- */
  function montarNavegacao() {
    var btn   = $("#menuBtn");
    var links = $("#navLinks");

    if (btn) {
      btn.addEventListener("click", function () {
        var aberto = links.classList.toggle("aberto");
        btn.setAttribute("aria-expanded", aberto ? "true" : "false");
        btn.textContent = aberto ? "✕" : "☰";
      });
      $$("#navLinks a").forEach(function (a) {
        a.addEventListener("click", function () {
          links.classList.remove("aberto");
          btn.textContent = "☰";
          track("navegacao_menu", { destino: a.getAttribute("href") });
        });
      });
    }

    $$('[data-cta]').forEach(function (a) {
      a.addEventListener("click", function () {
        track("clique_cta", { cta: a.getAttribute("data-cta") });
      });
    });

    $$('[data-ext]').forEach(function (a) {
      a.addEventListener("click", function () {
        track("link_externo", { destino: a.getAttribute("data-ext"), url: a.href });
      });
    });

    var voltar = $("#voltarTopo");
    if (voltar) {
      voltar.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    window.addEventListener("scroll", aoRolar, { passive: true });
    aoRolar();
  }

  var secoesVistas = {};
  var profundidades = [25, 50, 75, 100];
  var profundidadesVistas = {};

  function aoRolar() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;

    $("#progressoLeitura").style.width = pct + "%";
    $("#voltarTopo").classList.toggle("on", h.scrollTop > 700);

    /* item ativo no menu */
    var atual = "";
    $$("section[id], header[id]").forEach(function (s) {
      if (s.getBoundingClientRect().top <= 140) { atual = s.id; }
    });
    $$("#navLinks a").forEach(function (a) {
      a.classList.toggle("ativo", a.getAttribute("href") === "#" + atual);
    });

    /* evento: profundidade de rolagem */
    profundidades.forEach(function (p) {
      if (pct >= p && !profundidadesVistas[p]) {
        profundidadesVistas[p] = true;
        track("profundidade_rolagem", { percentual: p });
      }
    });
  }

  function montarRevelacao() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach(function (e) { e.classList.add("vis"); });
      return;
    }

    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("vis");
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    $$(".reveal").forEach(function (e, i) {
      e.style.transitionDelay = (i % 4) * 70 + "ms";
      obs.observe(e);
    });

    /* evento: secao efetivamente vista */
    var obsSec = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting && !secoesVistas[en.target.id]) {
          secoesVistas[en.target.id] = true;
          track("secao_vista", { secao: en.target.id });
        }
      });
    }, { threshold: 0.35 });
    $$("section[id]").forEach(function (s) { obsSec.observe(s); });
  }

  /* ---------------------------------------------------------------------
     11. Tempo de permanencia na pagina
     --------------------------------------------------------------------- */
  function montarTempoPagina() {
    var inicio = Date.now();
    var enviado = false;
    function enviar() {
      if (enviado) { return; }
      enviado = true;
      track("tempo_na_pagina", { segundos: Math.round((Date.now() - inicio) / 1000) });
    }
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") { enviar(); }
    });
    window.addEventListener("pagehide", enviar);
  }

  /* ---------------------------------------------------------------------
     12. Inicializacao
     --------------------------------------------------------------------- */
  function iniciar() {
    montarMapa();
    montarTimeline();
    montarAbas();
    montarKpis();
    montarRoadmap();
    montarFaq();
    montarNavegacao();
    montarRevelacao();
    montarTempoPagina();

    var btnCalc = $("#calcBtn");
    if (btnCalc) {
      btnCalc.addEventListener("click", calcular);
      ["#calcTipo", "#calcMin", "#calcSeg"].forEach(function (s) {
        var el = $(s);
        if (el) { el.addEventListener("change", calcular); }
      });
      calcular();
    }

    /* modal: fechar por fundo e por tecla */
    var bg = $("#modalBg");
    if (bg) {
      bg.addEventListener("click", function (e) { if (e.target === bg) { fecharModal(); } });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { fecharModal(); }
    });

    /* campeoes dependem da versao do Data Dragon */
    carregarVersao().then(montarCampeoes);

    /* mantem as alturas corretas quando a janela muda de tamanho */
    window.addEventListener("resize", function () {
      $$(".fase.aberta .fase-corpo").forEach(function (c) { c.style.maxHeight = c.scrollHeight + "px"; });
      $$(".faq.aberta .faq-a").forEach(function (c) { c.style.maxHeight = c.scrollHeight + "px"; });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
