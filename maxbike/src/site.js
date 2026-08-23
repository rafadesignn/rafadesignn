/* =============================================================
   MAX Bike — comportamento do site
   Um unico canvas WebGL atras da pagina, reaproveitado por tres
   cenas (hero, tour de engenharia e mostruario), mais o motor de
   animacoes por scroll e o roteamento de todos os CTAs para o
   WhatsApp da loja.
   ============================================================= */
(function () {
  'use strict';

  const M = window.MAXBIKE;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
  const lerp = (a, b, k) => a + (b - a) * k;
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const brl = (n) => 'R$ ' + n.toLocaleString('pt-BR');
  const BIKE_BOX = { w: 1.82, h: 1.10 };   // caixa envolvente do modelo, em metros

  /* ==================== WhatsApp ====================
     Todo botao de venda vira um link wa.me com mensagem de contexto. */
  const ZAP_ICON = '<svg class="btn__zapicon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.21.89 2.39 1.01 2.55.13.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29Z"/></svg>';

  function zapLink(msg) {
    return 'https://wa.me/' + M.WHATSAPP + '?text=' + encodeURIComponent(msg);
  }
  function wireZap(el, msg) {
    el.setAttribute('href', zapLink(msg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  }
  function bootZap() {
    $$('[data-zapicon]').forEach((s) => { s.outerHTML = ZAP_ICON; });
    $$('[data-zap]').forEach((el) => wireZap(el, el.dataset.zap));
  }

  /* ==================== logotipo ==================== */
  function bootLogo() {
    $$('[data-logo]').forEach((el) => { el.innerHTML = M.LOGO[el.dataset.logo]; });
    const fav = document.createElement('link');
    fav.rel = 'icon';
    fav.type = 'image/svg+xml';
    fav.href = 'data:image/svg+xml,' + encodeURIComponent(
      M.LOGO.mark.replace(/currentColor/g, '%23F4F5F7').replace(/var\(--max-accent, (#[0-9A-Fa-f]{6})\)/g, '$1')
        .replace('<svg ', '<svg style="background:%230B0D10" ')
    );
    document.head.appendChild(fav);
  }

  /* ==================== revelacoes por scroll ==================== */
  function bootReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    $$('.rv, .manifesto').forEach((el) => io.observe(el));
  }

  /* ==================== contadores ==================== */
  function bootCounters() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const el = e.target;
        const to = +el.dataset.count;
        const sfx = el.dataset.suffix || '';
        if (REDUCED) { el.textContent = to + sfx; return; }
        const t0 = performance.now(), dur = 1100;
        (function tick(now) {
          const k = clamp((now - t0) / dur, 0, 1);
          el.textContent = Math.round(to * easeInOut(k)) + sfx;
          if (k < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.5 });
    $$('[data-count]').forEach((el) => io.observe(el));
  }

  /* ==================== navegacao ==================== */
  function bootNav() {
    const nav = $('#nav'), burger = $('#burger');
    const onScroll = () => nav.classList.toggle('stuck', scrollY > 24);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    $$('#navlinks a').forEach((a) => a.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }));

    const float = $('#floatzap');
    const hero = $('#inicio');
    new IntersectionObserver((e) => {
      float.classList.toggle('on', !e[0].isIntersecting);
    }, { threshold: 0.15 }).observe(hero);
  }

  /* ==================== filme ==================== */
  function bootFilm() {
    const frame = $('#filmframe'), video = $('#filme-video'), ctrl = $('#filmctrl');
    video.poster = M.asset('filme-poster.jpg');
    $('source', video).src = M.asset('filme-maxbike.mp4');
    video.load();
    const PLAY = '<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M3 1.6v10.8a.7.7 0 0 0 1.07.6l8.4-5.4a.7.7 0 0 0 0-1.2L4.07 1a.7.7 0 0 0-1.07.6Z"/></svg>';
    const PAUSE = ctrl.innerHTML;

    new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { video.play().catch(() => {}); }
        else video.pause();
      });
    }, { threshold: 0.25 }).observe(video);

    ctrl.addEventListener('click', () => {
      if (video.paused) { video.play(); ctrl.innerHTML = PAUSE; }
      else { video.pause(); ctrl.innerHTML = PLAY; }
    });

    if (REDUCED) return;
    // o quadro cresce ate a largura total conforme se aproxima do centro
    addEventListener('scroll', () => {
      const r = frame.getBoundingClientRect();
      const p = clamp(1 - Math.abs(r.top + r.height / 2 - innerHeight / 2) / (innerHeight * 0.9), 0, 1);
      frame.style.setProperty('--film-scale', (0.9 + 0.1 * easeInOut(p)).toFixed(4));
      frame.style.borderRadius = (28 - 22 * p).toFixed(1) + 'px';
    }, { passive: true });
  }

  /* ==================== mostruario (dados -> DOM) ==================== */
  let atual = M.MODELOS[0];

  function bootCatalogo() {
    const picker = $('#picker'), viewer = $('#viewer'), grid = $('#grid');

    // imagens de apoio dentro do visor (fallback e transicao)
    M.MODELOS.forEach((m) => {
      const img = document.createElement('img');
      img.src = M.asset('bike-' + m.id + '.jpg');
      img.alt = m.nome + ' — vista três-quartos';
      img.loading = 'lazy';
      img.dataset.for = m.id;
      viewer.appendChild(img);
    });

    M.MODELOS.forEach((m, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', String(i === 0));
      b.innerHTML = '<span class="n">' + m.nome.replace('MAX ', '') + '</span><span class="c">' + m.linha + '</span>';
      b.addEventListener('click', () => selecionar(m));
      picker.appendChild(b);
    });

    M.MODELOS.forEach((m) => {
      const a = document.createElement('article');
      a.className = 'card rv';
      a.innerHTML =
        '<img src="' + M.asset('bike-' + m.id + '-lateral.jpg') + '" alt="' + m.nome + ' — perfil" loading="lazy">' +
        '<div class="card__body">' +
        '<div class="card__row"><h3>' + m.nome + '</h3><span class="card__price">' + brl(m.preco) + '</span></div>' +
        '<p class="caption">' + m.linha + ' · ' + m.specs[0][1] + '</p>' +
        '<a class="btn btn--zap"></a></div>';
      wireZap($('a.btn', a), 'Olá! Tenho interesse na ' + m.nome + ' (' + brl(m.preco) + '). Ela está disponível?');
      $('a.btn', a).innerHTML = ZAP_ICON + 'Falar sobre a ' + m.nome.replace('MAX ', '');
      a.addEventListener('click', (ev) => {
        if (ev.target.closest('a')) return;
        selecionar(m);
        $('#colecao').scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' });
      });
      grid.appendChild(a);
    });

    selecionar(M.MODELOS[0]);
  }

  function selecionar(m) {
    atual = m;
    $('#m-nome').textContent = m.nome;
    $('#m-resumo').textContent = m.resumo;
    $('#m-preco').textContent = brl(m.preco);
    $('#viewer-badge').textContent = m.linha;
    $('#m-specs').innerHTML = m.specs
      .map((s) => '<div>' + s[0] + '<strong>' + s[1] + '</strong></div>')
      .join('');
    wireZap($('#m-zap'), 'Olá! Quero comprar a ' + m.nome + ' (' + brl(m.preco) + '). Pode me passar as condições?');
    $('#m-zap').innerHTML = ZAP_ICON + 'Quero esta bike';
    wireZap($('#m-zap2'), 'Olá! Tenho uma dúvida sobre a ' + m.nome + '.');
    $$('#picker button').forEach((b, i) =>
      b.setAttribute('aria-selected', String(M.MODELOS[i].id === m.id)));
    $$('#viewer img').forEach((img) => img.classList.toggle('on', img.dataset.for === m.id));
    if (Stage.ready) Stage.setModel(m);
  }

  /* ==================== servicos, loja, rodape ==================== */
  function bootConteudo() {
    $('#services').innerHTML = M.SERVICOS.map((s) =>
      '<article class="rv"><span class="n">' + s.n + '</span><h3>' + s.t + '</h3>' +
      '<p class="lead" style="font-size:.97rem">' + s.d + '</p>' +
      '<a class="btn btn--ghost" data-zap="Olá! Quero falar sobre ' + s.t.toLowerCase() + ' na MAX Bike."></a></article>'
    ).join('');
    $$('#services a').forEach((a, i) => {
      wireZap(a, a.dataset.zap);
      a.innerHTML = ZAP_ICON + M.SERVICOS[i].cta;
    });

    const L = M.LOJA;
    $('#store-list').innerHTML =
      '<div><dt>Endereço</dt><dd>' + L.endereco + '</dd></div>' +
      '<div><dt>Horários</dt><dd>' + L.horario + '</dd></div>' +
      '<div><dt>Contato</dt><dd>' + L.telefone + ' · ' + L.email + '</dd></div>';
    $('#rota').href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(L.endereco);
    $('#foot-email').textContent = L.email;
    $('#foot-fone').textContent = L.telefone;
    $('#ano').textContent = new Date().getFullYear();
    $('#disclaimer').textContent =
      'Mostruário de demonstração: textos, preços, endereço e imagens são conteúdo de exemplo e devem ser substituídos pelos dados reais da loja. As bicicletas exibidas são renderizações 3D criadas para este site.';

    // mapa estilizado
    $('#map').innerHTML =
      '<svg viewBox="0 0 400 320" role="img" aria-label="Mapa estilizado da região da loja" style="width:100%;height:auto">' +
      '<rect width="400" height="320" fill="#0E1116"/>' +
      '<g stroke="rgba(255,255,255,.09)" stroke-width="1">' +
      [40, 95, 150, 205, 260, 315].map((y) => '<line x1="0" y1="' + y + '" x2="400" y2="' + y + '"/>').join('') +
      [50, 120, 190, 260, 330].map((x) => '<line x1="' + x + '" y1="0" x2="' + x + '" y2="320"/>').join('') +
      '</g>' +
      '<path d="M0 205 L120 205 L120 95 L400 95" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="7"/>' +
      '<path d="M190 0 L190 320" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="5"/>' +
      '<circle cx="190" cy="95" r="46" fill="rgba(255,74,23,.10)"/>' +
      '<circle cx="190" cy="95" r="9" fill="#FF4A17"/>' +
      '<circle cx="190" cy="95" r="17" fill="none" stroke="#FF4A17" stroke-width="2" opacity=".55"/>' +
      '<text x="205" y="132" fill="#F2F3F5" font-family="Archivo, sans-serif" font-size="15" font-weight="700">MAX Bike</text>' +
      '<text x="205" y="150" fill="rgba(255,255,255,.45)" font-family="Archivo, sans-serif" font-size="11">Pinheiros · São Paulo</text>' +
      '</svg>';
  }

  /* ==================== tour de engenharia ==================== */
  function bootTour() {
    $('#tour-progress').innerHTML = M.TOUR.map(() => '<i></i>').join('');
    $('#tour-stack').innerHTML = M.TOUR.map((t, i) =>
      '<article class="rv rv-' + (i % 3) + '">' +
      '<img src="' + M.asset(t.img) + '" alt="' + t.titulo + '" loading="lazy">' +
      '<div class="body"><p class="eyebrow">' + String(i + 1).padStart(2, '0') + ' / 04</p>' +
      '<h3>' + t.titulo + '</h3><p class="lead" style="font-size:.97rem">' + t.texto + '</p></div></article>'
    ).join('');
  }

  function mostrarParada(i) {
    const t = M.TOUR[i];
    const card = $('#tour-card');
    if (card.dataset.i === String(i)) return;
    card.dataset.i = String(i);
    card.classList.remove('on');
    setTimeout(() => {
      $('#tour-eyebrow').textContent = String(i + 1).padStart(2, '0') + ' / 04';
      $('#tour-title').textContent = t.titulo;
      $('#tour-text').textContent = t.texto;
      $('#tour-specs').innerHTML = t.specs.map((s) => '<div>' + s[0] + '<strong>' + s[1] + '</strong></div>').join('');
      card.classList.add('on');
    }, REDUCED ? 0 : 180);
    $$('#tour-progress i').forEach((el, k) => el.classList.toggle('on', k <= i));
  }

  /* Fundo de estudio: mesmo gradiente do visor, porem desenhado
     no WebGL para nao tapar o canvas. */
  function fundoEstudio(THREE) {
    const c = document.createElement('canvas');
    c.width = 64; c.height = 256;
    const x = c.getContext('2d');
    const g = x.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, '#1F252C');
    g.addColorStop(0.42, '#161A20');
    g.addColorStop(1, '#0C0F13');
    x.fillStyle = g; x.fillRect(0, 0, 64, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  /* Move camera e alvo lateralmente: o assunto anda no quadro
     sem mudar o angulo de visao. */
  function deslocar(cam, tgt, off) {
    if (!off) return;
    const dx = tgt[0] - cam[0], dz = tgt[2] - cam[2];
    const len = Math.hypot(dx, dz) || 1;
    const rx = -dz / len, rz = dx / len;   // vetor "direita" no plano do chao
    cam[0] -= rx * off; cam[2] -= rz * off;
    tgt[0] -= rx * off; tgt[2] -= rz * off;
  }

  /* ==================== palco 3D ==================== */
  const Stage = {
    ready: false,
    init() {
      const canvas = $('#stage');
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
      } catch (err) {
        document.body.classList.add('no-webgl');
        return false;
      }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(innerWidth, innerHeight, false);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.autoClear = false;

      const studio = MAXBIKE.createStudio(THREE, renderer, { background: null });
      const camera = new THREE.PerspectiveCamera(32, innerWidth / innerHeight, 0.05, 60);
      const root = new THREE.Group();
      studio.scene.add(root);

      this.renderer = renderer; this.studio = studio; this.camera = camera; this.root = root;
      this.bike = null;
      this.backdrop = fundoEstudio(THREE);
      this.cam = { pos: new THREE.Vector3(1.8, 0.8, 2.4), tgt: new THREE.Vector3(0.05, 0.52, 0), fov: 32, yaw: -0.3 };
      this.goal = { pos: this.cam.pos.clone(), tgt: this.cam.tgt.clone(), fov: 32, yaw: -0.3 };
      this.ready = true;
      this.setModel(M.MODELOS[0]);

      addEventListener('resize', () => {
        renderer.setSize(innerWidth, innerHeight, false);
        renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      }, { passive: true });
      return true;
    },

    setModel(m) {
      if (this.bike) { this.root.remove(this.bike); this.bike.userData.dispose(); }
      this.bike = MAXBIKE.createBike(THREE, {
        type: m.tipo, frameColor: m.frameColor, accentColor: m.accentColor, rimColor: m.rimColor
      });
      this.root.add(this.bike);
    },

    /* enquadramento: o 3D so pinta dentro do retangulo informado */
    setRect(rect) { this.rect = rect; },

    /* liga o fundo de estudio (usado no visor do mostruario) */
    setBackdrop(on) {
      const alvo = on ? this.backdrop : null;
      if (this.studio.scene.background !== alvo) this.studio.scene.background = alvo;
    },

    aim(pos, tgt, fov, yaw) {
      this.goal.pos.set(pos[0], pos[1], pos[2]);
      this.goal.tgt.set(tgt[0], tgt[1], tgt[2]);
      this.goal.fov = fov; this.goal.yaw = yaw;
    },

    /* Enquadra a bike inteira dentro do retangulo atual, seja ele
       largo (faixa do hero) ou quase quadrado (visor do mostruario).
       Assim o modelo nunca fica minusculo nem estourado. */
    aimFit(tgt, elev, fov, yaw, fill) {
      const box = this.rect || { w: innerWidth, h: innerHeight };
      const aspect = Math.max(box.w / box.h, 0.2);
      const vfov = (fov * Math.PI) / 180;
      const tv = Math.tan(vfov / 2);
      const th = tv * aspect;
      // distancia que satisfaz simultaneamente altura e largura da caixa
      const dist = Math.max(
        (BIKE_BOX.h / 2) / (fill * tv),
        (BIKE_BOX.w / 2) / (fill * th)
      );
      this.goal.tgt.set(tgt[0], tgt[1], tgt[2]);
      this.goal.pos.set(
        tgt[0],
        tgt[1] + Math.sin(elev) * dist,
        tgt[2] + Math.cos(elev) * dist
      );
      this.goal.fov = fov; this.goal.yaw = yaw;
    },

    frame(dt) {
      const r = this.renderer, c = this.camera;
      const k = REDUCED ? 1 : clamp(1 - Math.pow(0.001, dt), 0, 1);   // suavizacao independente de fps
      this.cam.pos.lerp(this.goal.pos, k);
      this.cam.tgt.lerp(this.goal.tgt, k);
      this.cam.fov = lerp(this.cam.fov, this.goal.fov, k);
      this.cam.yaw = lerp(this.cam.yaw, this.goal.yaw, k);

      this.root.rotation.y = this.cam.yaw;
      if (!REDUCED && this.bike) this.bike.userData.spin(dt, this.spin || 0);

      c.position.copy(this.cam.pos);
      c.lookAt(this.cam.tgt);
      c.fov = this.cam.fov;

      const box = this.rect || { x: 0, y: 0, w: innerWidth, h: innerHeight };
      c.aspect = box.w / box.h;
      c.updateProjectionMatrix();

      r.setScissorTest(false);
      r.setViewport(0, 0, innerWidth, innerHeight);
      r.clear();
      r.setViewport(box.x, innerHeight - box.y - box.h, box.w, box.h);
      r.setScissor(box.x, innerHeight - box.y - box.h, box.w, box.h);
      r.setScissorTest(true);
      r.render(this.studio.scene, c);
    }
  };

  /* ==================== orquestracao por scroll ==================== */
  function bootStage() {
    const canvas = $('#stage');
    const hero = $('#inicio');
    const tourScroll = $('#tour-scroll');
    const stackWrap = $('#tour-stack-wrap');
    const colecao = $('#colecao');
    const viewer = $('#viewer');
    const desktop = matchMedia('(min-width: 900px)');

    let modoTour = false;
    function ajustarModo() {
      modoTour = desktop.matches && Stage.ready;
      tourScroll.hidden = !modoTour;
      stackWrap.hidden = modoTour;
    }
    ajustarModo();
    desktop.addEventListener('change', ajustarModo);

    if (!Stage.ready) { viewer.classList.remove('live'); return; }

    let last = performance.now();
    function loop(now) {
      // o timestamp do rAF pode preceder o boot: sanear antes de usar
      let dt = (now - last) / 1000;
      if (!(dt > 0) || dt > 0.25) dt = 1 / 60;
      dt = Math.min(dt, 0.05);
      last = now;

      const vh = innerHeight;
      const rHero = hero.getBoundingClientRect();
      const rTour = modoTour ? tourScroll.getBoundingClientRect() : null;
      const rCol = colecao.getBoundingClientRect();

      let cena = null;

      if (rHero.bottom > vh * 0.25) {
        cena = 'hero';
        const p = clamp(-rHero.top / Math.max(rHero.height, 1), 0, 1);
        // giro lento revelando o outro lado enquanto a home rola
        // a bike ocupa exatamente o espaco reservado a ela no grid
        const rSlot = $('#herostage').getBoundingClientRect();
        Stage.setRect({ x: 0, y: Math.max(rSlot.top, 0), w: innerWidth, h: Math.max(rSlot.height, 120) });
        Stage.aimFit([0.08, 0.53, 0], 0.19, 31, lerp(-0.34, 0.42, p), lerp(0.88, 0.76, p));
        Stage.spin = 0.55;
      } else if (rTour && rTour.top < vh * 0.5 && rTour.bottom > vh * 0.5) {
        cena = 'tour';
        const total = rTour.height - vh;
        const p = clamp(-rTour.top / Math.max(total, 1), 0, 1);
        const n = M.TOUR.length;
        const f = clamp(p * n, 0, n - 0.0001);
        const i = Math.floor(f);
        const sub = easeInOut(clamp((f - i) * 1.35 - 0.18, 0, 1));
        const a = M.TOUR[i], b = M.TOUR[Math.min(i + 1, n - 1)];
        const cam = [0, 1, 2].map((k) => lerp(a.cam[k], b.cam[k], sub));
        const tgt = [0, 1, 2].map((k) => lerp(a.tgt[k], b.tgt[k], sub));
        // desloca o assunto para a direita, abrindo espaco ao cartao de texto
        deslocar(cam, tgt, lerp(a.off || 0, b.off || 0, sub));
        Stage.aim(cam, tgt, lerp(a.fov, b.fov, sub), lerp(a.yaw, b.yaw, sub));
        Stage.spin = 0.9;
        Stage.setRect(null);
        mostrarParada(i);
      } else if (rCol.top < vh * 0.72 && rCol.bottom > vh * 0.28) {
        cena = 'showcase';
        const rv = viewer.getBoundingClientRect();
        Stage.setRect({ x: rv.left, y: rv.top, w: rv.width, h: rv.height });
        Stage.aimFit([0.08, 0.52, 0], 0.16, 30, -0.34 + Math.sin(now / 4200) * 0.20, 0.86);
        Stage.spin = 0.35;
      }

      const ligado = cena !== null;
      Stage.setBackdrop(cena === 'showcase');
      canvas.classList.toggle('on', ligado);
      viewer.classList.toggle('live', cena === 'showcase');
      if (ligado) Stage.frame(dt);

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  /* ==================== inicializacao ==================== */
  function init() {
    bootLogo();
    bootZap();
    bootTour();
    bootCatalogo();
    bootConteudo();
    bootZap();          // reaplica nos elementos criados dinamicamente
    bootReveal();
    bootCounters();
    bootNav();
    bootFilm();
    Stage.init();
    bootStage();
    if (Stage.ready) selecionar(atual);
  }

  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', init);
  else init();
})();
