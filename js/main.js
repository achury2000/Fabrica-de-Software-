/* ============================================================
   Fábrica de Software de Antioquia · interacción de la página
   ============================================================ */
(function () {
  'use strict';
  var D = window.SFW;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (x, a, b) { return Math.min(b, Math.max(a, x)); };
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = matchMedia('(pointer: fine)').matches;
  var MOBILE = innerWidth < 900;
  var Q = location.search;
  var html = document.documentElement;
  var CC = { desarrollo: '#7cf03a', evolucion: '#19c3d4', calidad: '#b784ff', acompanamiento: '#ffd166' };
  var ctrl = null; // controlador 3D

  /* ---------- iconos ---------- */
  var ICONS = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    pin: '<path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3"/>',
    proto: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    protoFn: '<path d="M4 4h16v12H4z"/><path d="M8 20h8M12 16v4M9 10l2 2 4-4"/>',
    web: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    refactor: '<circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="8" r="2"/><path d="M6 8v8M18 10c0 5-6 3-12 6"/>',
    migrate: '<path d="M4 7h13l-3-3M20 17H7l3 3"/>',
    docs: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    deploy: '<path d="M12 3c4 2 6 6 6 10l-3 3H9l-3-3c0-4 2-8 6-10z"/><circle cx="12" cy="10" r="1.6"/><path d="M9 19l-1 3 4-2 4 2-1-3"/>',
    maint: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
    support: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1"/><rect x="17" y="14" width="4" height="6" rx="1"/><path d="M19 20a4 4 0 0 1-4 2h-2"/>',
    advice: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    consult: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
    perf: '<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 14l4-5"/><circle cx="12" cy="14" r="1.2"/>',
    auto: '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/><path d="M9 12l2 2 4-4"/>',
    func: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12l3 3 5-6"/>',
    valid: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    value: '<circle cx="12" cy="12" r="9"/><path d="M14.5 9c-.5-1-1.5-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1 0-2-.5-2.5-1.5M12 6v1.5M12 16.5V18"/>',
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    grad: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M9 8h6"/>',
    campus: '<path d="M3 10l9-6 9 6M5 10v9M9 10v9M15 10v9M19 10v9M3 21h18"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    plan: '<path d="M9 3h6l1 2h3v16H5V5h3z"/><path d="M9 12h6M9 16h4"/>',
    design: '<path d="M4 20l4-1 11-11a2.1 2.1 0 0 0-3-3L5 16z"/>',
    test: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
    sprint: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',
    board: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16M5.5 8h1.5M11.5 8h1.5M17 8h1.5"/>',
    handshake: '<path d="M2 12l4-4 4 1 3-2 4 3 5-1M2 12l5 5 3-1 2 2 3-2 2 1 5-4"/>',
    touch: '<path d="M9 11V5a2 2 0 1 1 4 0v6l3 .5a2 2 0 0 1 2 2V17a5 5 0 0 1-5 5h-2a5 5 0 0 1-4-2l-3-4a1.6 1.6 0 0 1 2.4-2L9 15"/>'
  };
  function ic(n) { return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[n] || '') + '</svg>'; }
  $$('[data-ic]').forEach(function (el) { el.innerHTML = ic(el.getAttribute('data-ic')); });
  var norm = function (s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---------- preloader ---------- */
  var booted = false;
  function done() {
    if (booted) return; booted = true;
    html.classList.remove('loading'); html.classList.add('ready');
    var pre = $('#boot'); if (pre) { pre.classList.add('out'); setTimeout(function () { pre.remove(); }, 900); }
    if (ctrl) ctrl.ready();
    setTimeout(function () { if (ctrl) ctrl.remeasure(); }, 400);
  }
  (function boot() {
    var pre = $('#boot');
    if (RM || /nopre/.test(Q) || !pre) { done(); return; }
    /* intro 3D: logo de SENA interactivo */
    var intro = null, ui = $('#introUi');
    if (window.SFWIntro && !/nogl/.test(Q)) {
      try { intro = window.SFWIntro.start($('#introGl'), { mobile: MOBILE }); } catch (e) { intro = null; }
    }
    if (intro) {
      pre.classList.add('has-3d'); ui.hidden = false;
      var ib = $('#introBar'), go = $('#introGo'), skip = $('#introSkip'), hint = $('#introHint'), entered = false;
      function enter() {
        if (entered) return; entered = true; go.disabled = true; skip.style.visibility = 'hidden';
        intro.enter(function () { intro.dispose(); done(); });
        setTimeout(function () { if (!booted) { try { intro.dispose(); } catch (e) {} done(); } }, 3500);
      }
      (function loop() {
        if (booted) return;
        var a = intro.progress(); ib.style.transform = 'scaleX(' + a + ')';
        if (a >= 1 && go.disabled && !entered) { go.disabled = false; hint.textContent = 'Arrastra para girar el logo · toca una pieza · ¡y entra!'; go.focus({ preventScroll: true }); }
        requestAnimationFrame(loop);
      })();
      go.addEventListener('click', enter); skip.addEventListener('click', function () { entered = true; try { intro.dispose(); } catch (e) {} done(); });
      document.addEventListener('keydown', function k(e) { if (booted) { document.removeEventListener('keydown', k); return; } if (e.key === 'Enter' && !go.disabled) enter(); });
      return;
    }
    var bar = $('#bootBar'), pct = $('#bootPct'), lines = $$('#boot .l'), t0 = performance.now(), dur = 2000;
    function tick(t) {
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      bar.style.transform = 'scaleX(' + e + ')'; pct.textContent = Math.round(e * 100);
      lines.forEach(function (l, i) { if (p > i / lines.length * .85) l.classList.add('on'); });
      if (p < 1) requestAnimationFrame(tick); else setTimeout(done, 280);
    }
    requestAnimationFrame(tick); setTimeout(done, 4500);
  })();

  /* ---------- cabecera, progreso, navegación activa ---------- */
  var hdr = $('#hdr'), progress = $('#progress'), nav = $('#nav'), burger = $('#burger');
  burger.addEventListener('click', function () {
    var o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); html.classList.toggle('lock', o);
  });
  $$('#nav a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); html.classList.remove('lock'); }); });
  var secIds = ['inicio', 'nosotros', 'servicios', 'metodologia', 'calidad', 'formacion', 'trayectoria', 'contacto'];
  var secEls = secIds.map(function (id) { return document.getElementById(id); });
  var procEl = document.getElementById('procesos');
  var navLinks = $$('#nav a'), dotLinks = $$('#dots a');
  function onScroll() {
    var y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
    hdr.classList.toggle('scrolled', y > 40);
    var mid = y + innerHeight * .4, cur = 0;
    secEls.forEach(function (el, i) { if (el && el.offsetTop <= mid) cur = i; });
    if (procEl && procEl.offsetTop <= mid && mid < procEl.offsetTop + procEl.offsetHeight) cur = 3;
    var id = secIds[cur];
    navLinks.forEach(function (a) { a.classList.toggle('act', a.getAttribute('href') === '#' + id); });
    dotLinks.forEach(function (a) { a.classList.toggle('act', a.getAttribute('href') === '#' + id); });
  }

  /* ---------- títulos por palabras + reveals ---------- */
  $$('[data-split]').forEach(function (h) {
    var i = 0;
    h.innerHTML = h.textContent.trim().split(/\s+/).map(function (w) { return '<span class="w"><span style="--i:' + (i++) + '">' + esc(w) + '</span></span>'; }).join(' ');
  });
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); if (e.target.hasAttribute('data-count')) countUp(e.target); } });
  }, { threshold: .15, rootMargin: '0px 0px -6% 0px' });
  function watch(root) { $$('.rv, [data-split], [data-count]', root).forEach(function (el) { io.observe(el); }); }
  function countUp(el) {
    var to = +el.getAttribute('data-count'), t0 = performance.now(), d = 1700;
    (function f(t) { var p = clamp((t - t0) / d, 0, 1), e = 1 - Math.pow(1 - p, 4); el.textContent = Math.round(to * e).toLocaleString('es-CO'); if (p < 1) requestAnimationFrame(f); })(t0);
  }
  /* hero siempre visible tras el arranque */
  $$('#inicio .rv').forEach(function (el, i) { el.style.setProperty('--d', (500 + i * 120) + 'ms'); });
  var heroObs = new MutationObserver(function () { if (html.classList.contains('ready')) { $$('#inicio .rv').forEach(function (el) { el.classList.add('in'); }); heroObs.disconnect(); } });
  heroObs.observe(html, { attributes: true });
  watch(document);

  /* ---------- marquee ---------- */
  (function () {
    var words = ['Scrum', 'Kanban', 'TDD', 'CI/CD', 'UML', 'MVP', 'Pruebas de regresión', 'Mockups', 'Refactorización', 'Mesa de ayuda', 'Automatización', 'Despliegue', 'Mantenimiento', 'Validación'];
    var h = words.map(function (w) { return '<span>' + w + '</span>'; }).join('');
    $('#marq').innerHTML = h + h;
  })();

  /* ---------- texto tipeado ---------- */
  (function () {
    var el = $('#typed'), words = ['web', 'móviles', 'a medida', 'con calidad', 'ágiles', 'con sello SENA'], wi = 0, ci = 0, del = false;
    if (RM) { el.textContent = 'a medida'; return; }
    (function step() {
      var w = words[wi]; ci += del ? -1 : 1; el.textContent = w.slice(0, ci);
      var delay = del ? 45 : 95;
      if (!del && ci === w.length) { del = true; delay = 1700; } else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; delay = 350; }
      setTimeout(step, delay);
    })();
  })();

  /* ---------- tilt, imán, cursor, parallax ---------- */
  function bindTilt(root) {
    if (!FINE) return;
    $$('.tilt', root).forEach(function (el) {
      if (el._t) return; el._t = 1;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--ry', ((x - .5) * 12) + 'deg'); el.style.setProperty('--rx', ((.5 - y) * 10) + 'deg');
        el.style.setProperty('--mx', (x * 100) + '%'); el.style.setProperty('--my', (y * 100) + '%');
      });
      el.addEventListener('pointerleave', function () { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
    });
  }
  bindTilt(document);
  if (FINE) {
    $$('.mag').forEach(function (el) {
      el.addEventListener('pointermove', function (e) { var r = el.getBoundingClientRect(); el.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * .22) + 'px,' + ((e.clientY - r.top - r.height / 2) * .3) + 'px)'; });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
    var cur = $('#cursor'), cx = 0, cy = 0, tx = 0, ty = 0;
    addEventListener('pointermove', function (e) { tx = e.clientX; ty = e.clientY; cur.style.opacity = 1; }, { passive: true });
    (function loop() { cx += (tx - cx) * .12; cy += (ty - cy) * .12; cur.style.transform = 'translate(' + cx + 'px,' + cy + 'px)'; requestAnimationFrame(loop); })();
  }
  var bts = $$('.bt-row');
  function parallax() {
    var vh = innerHeight;
    bts.forEach(function (r) {
      var b = r.parentElement.getBoundingClientRect(), p = (b.top + b.height / 2 - vh / 2) / vh, dir = +r.getAttribute('data-bt');
      r.style.transform = 'translate3d(' + (-6 + dir * p * -22) + 'vw,0,0)';
    });
  }

  /* ---------- videos perezosos ---------- */
  var vio = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) {
        if (v.getAttribute('data-src') && !v.src) { v.src = v.getAttribute('data-src'); }
        if (!RM) { var p = v.play(); if (p && p.catch) p.catch(function () { }); }
      } else v.pause();
    });
  }, { threshold: .05 });
  $$('video').forEach(function (v) { vio.observe(v); });

  /* ---------- red de partículas 2D ---------- */
  function net(cv, count) {
    if (!cv || RM) return;
    var cx = cv.getContext('2d'), W, H, pts = [], mx = -999, my = -999, vis = true;
    function rs() { W = cv.width = cv.clientWidth; H = cv.height = cv.clientHeight; pts = []; var n = Math.round(count * W / 1400); for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4 }); }
    rs(); addEventListener('resize', rs);
    cv.parentElement.addEventListener('pointermove', function (e) { var r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
    new IntersectionObserver(function (e) { vis = e[0].isIntersecting; }).observe(cv);
    (function f() {
      requestAnimationFrame(f); if (!vis) return;
      cx.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i]; p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
        var dx = p.x - mx, dy = p.y - my, d = dx * dx + dy * dy; if (d < 14000) { p.x += dx * .006; p.y += dy * .006; }
        cx.fillStyle = 'rgba(124,240,58,.65)'; cx.fillRect(p.x, p.y, 2, 2);
        for (var j = i + 1; j < pts.length; j++) { var q = pts[j], ax = p.x - q.x, ay = p.y - q.y, dd = ax * ax + ay * ay; if (dd < 9500) { cx.strokeStyle = 'rgba(25,195,212,' + (.28 * (1 - dd / 9500)) + ')'; cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(q.x, q.y); cx.stroke(); } }
      }
    })();
  }
  net($('#netHero'), MOBILE ? 40 : 90); net($('#netContact'), MOBILE ? 30 : 70);

  /* ============================================================
     SERVICIOS
     ============================================================ */
  var catById = {}; D.cats.forEach(function (c) { catById[c.id] = c; });
  var svcByCode = {}; D.services.forEach(function (s) { svcByCode[s.code] = s; });
  var order = []; D.cats.forEach(function (c) { D.services.forEach(function (s) { if (s.cat === c.id) order.push(s); }); });
  var state = { cat: 'all', q: '' };
  var tabs = $('#catTabs'), grid = $('#svcGrid');
  tabs.innerHTML = [{ id: 'all', name: 'Todos' }].concat(D.cats).map(function (c) {
    var n = c.id === 'all' ? D.services.length : D.services.filter(function (s) { return s.cat === c.id; }).length;
    return '<button type="button" class="tab" role="tab" data-cat="' + c.id + '" aria-selected="' + (c.id === 'all') + '">' + esc(c.name) + '<span class="n">' + n + '</span></button>';
  }).join('');
  $('#legend').innerHTML = D.cats.map(function (c) { return '<li style="--c:' + CC[c.id] + '"><i></i>' + esc(c.name) + '</li>'; }).join('');
  function renderSvc() {
    var q = norm(state.q), list = order.filter(function (s) { return (state.cat === 'all' || s.cat === state.cat) && (!q || norm(s.name + ' ' + s.sum + ' ' + s.alc.join(' ')).indexOf(q) > -1); });
    grid.innerHTML = list.map(function (s, i) {
      return '<button type="button" class="card tilt rv" data-code="' + s.code + '" style="--cc:' + CC[s.cat] + ';--d:' + (i * 45) + 'ms" aria-haspopup="dialog">' +
        '<span class="c-top"><span class="c-ic">' + ic(s.icon) + '</span><span class="c-code">' + s.code + '</span></span>' +
        '<span class="c-name">' + esc(s.name) + '</span><span class="c-sum">' + esc(s.sum) + '</span>' +
        '<span class="c-more">Ver detalle ' + ic('arrow') + '</span></button>';
    }).join('');
    $('#svcEmpty').hidden = list.length > 0;
    bindTilt(grid);
    requestAnimationFrame(function () { $$('.card', grid).forEach(function (c) { c.classList.add('in'); }); });
    var c = catById[state.cat];
    $('#visTitle').textContent = c ? c.name : 'Todo el portafolio';
    $('#visDesc').textContent = c ? c.desc : 'Desarrollo, evolución, calidad y acompañamiento: todo lo que necesitas para que tu software nazca bien y siga funcionando.';
    if (ctrl) ctrl.setCat(state.cat);
  }
  tabs.addEventListener('click', function (e) {
    var b = e.target.closest('.tab'); if (!b) return;
    state.cat = b.getAttribute('data-cat');
    $$('.tab', tabs).forEach(function (t) { t.setAttribute('aria-selected', t === b); });
    renderSvc();
  });
  $('#q').addEventListener('input', function (e) { state.q = e.target.value; renderSvc(); });
  $('#svcReset').addEventListener('click', function () { state = { cat: 'all', q: '' }; $('#q').value = ''; $$('.tab', tabs).forEach(function (t, i) { t.setAttribute('aria-selected', i === 0); }); renderSvc(); });
  grid.addEventListener('pointerover', function (e) { var c = e.target.closest('.card'); if (c && ctrl) ctrl.hover(c.getAttribute('data-code')); });
  grid.addEventListener('pointerleave', function () { if (ctrl) ctrl.hover(null); });
  grid.addEventListener('focusin', function (e) { var c = e.target.closest('.card'); if (c && ctrl) ctrl.hover(c.getAttribute('data-code')); });
  grid.addEventListener('click', function (e) { var c = e.target.closest('.card'); if (c) openSvc(c.getAttribute('data-code')); });

  var dlg = $('#dlg'), dlgBody = $('#dlgBody');
  function mailto(subject, body) { return 'mailto:' + D.EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body); }
  function bannerFor(cat) { var im = catById[cat].img; return im === 'cubos' ? 'img/cubos.jpg' : 'img/' + im + '.webp'; }
  function openSvc(code) {
    var s = svcByCode[code]; if (!s) return;
    var c = catById[s.cat], cc = CC[s.cat];
    var price = D.SHOW_PRICES ? '<div class="price-box"><b>' + esc(s.price) + '</b>' + (s.note ? '<small>' + esc(s.note) + '</small>' : '') + '<small>' + esc(D.PRICE_NOTE) + '</small></div>' : '';
    dlgBody.innerHTML = '<div class="dlg-banner"><img src="' + bannerFor(s.cat) + '" alt="" style="mix-blend-mode:' + (s.cat === 'acompanamiento' ? 'normal' : 'screen') + '"></div>' +
      '<div class="dlg-in" style="--cc:' + cc + '"><span class="pill">' + s.code + ' · ' + esc(c.name) + '</span>' +
      '<h3 id="dlgTitle">' + esc(s.name) + '</h3><p>' + esc(s.sum) + '</p>' +
      '<h4>Alcance</h4><ul class="alc">' + s.alc.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul>' +
      '<h4>Modalidad</h4><div class="modo"><span>' + esc(s.mod) + '</span><span>Alcance final sujeto a evaluación</span></div>' + price +
      '<div class="dlg-actions"><a class="btn" href="' + mailto('Consulta: ' + s.name + ' · Fábrica de Software de Antioquia', 'Hola,\n\nQuisiera información sobre el servicio «' + s.name + '» (' + s.code + ').\n\nMi necesidad: \n\nNombre / organización: \n') + '">Consultar este servicio ' + ic('arrow') + '</a>' +
      '<a class="btn ghost" href="#contacto" data-svc="' + s.code + '">Ir al formulario</a></div></div>';
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    html.classList.add('lock');
  }
  function closeDlg() { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); }
  dlg.addEventListener('close', function () { html.classList.remove('lock'); });
  $('#dlgX').addEventListener('click', closeDlg);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) closeDlg(); });
  dlgBody.addEventListener('click', function (e) {
    var a = e.target.closest('[data-svc]'); if (a) { $('#fSvc').value = a.getAttribute('data-svc'); updateMail(); closeDlg(); }
  });
  renderSvc();

  /* ============================================================
     METODOLOGÍA · scroll-scrub de 120 cuadros
     ============================================================ */
  (function () {
    var pin = $('#metodologia'), cv = $('#scrub'), cx = cv.getContext('2d'), N = 120, frames = new Array(N), loaded = 0;
    var starts = [0, .2, .42, .62, .82], phW = $('#phWrap'), rail = $('#rail'), bar = $('#pinBar'), load = $('#pinLoad');
    phW.innerHTML = D.phases.map(function (p, i) { return '<div class="ph" data-i="' + i + '"><span class="num">0' + (i + 1) + '</span><h3>' + esc(p.t) + '</h3><p>' + esc(p.d) + '</p></div>'; }).join('');
    rail.innerHTML = D.phases.map(function (p, i) { return '<li data-i="' + i + '"><button type="button" aria-label="Ir a la fase ' + (i + 1) + ': ' + esc(p.t) + '"><span>' + esc(p.t) + '</span><i>' + (i + 1) + '</i></button></li>'; }).join('');
    var phs = $$('.ph', phW), rl = $$('li', rail);
    function size() { var w = Math.min(cv.clientWidth * Math.min(devicePixelRatio || 1, 1.5), 1600), h = w * cv.clientHeight / Math.max(1, cv.clientWidth); cv.width = Math.round(w); cv.height = Math.round(h); drawAt(last); }
    var last = 0;
    function draw(i) {
      var im = frames[i]; if (!im) { for (var k = i; k >= 0; k--) if (frames[k]) { im = frames[k]; break; } }
      if (!im) return; var cw = cv.width, ch = cv.height, ir = im.width / im.height, cr = cw / ch, w, h;
      if (ir > cr) { h = ch; w = h * ir; } else { w = cw; h = w / ir; }
      cx.drawImage(im, (cw - w) / 2, (ch - h) / 2, w, h);
    }
    function drawAt(i) { draw(Math.round(i)); }
    function ld(i) { return new Promise(function (res) { var im = new Image(); im.decoding = 'async'; im.onload = function () { frames[i] = im; loaded++; if (loaded === 1) { size(); } res(); }; im.onerror = res; im.src = 'frames/f' + String(i + 1).padStart(3, '0') + '.webp'; }); }
    (function seq() { var i = 0, running = 0; function next() { while (running < 6 && i < N) { running++; ld(i++).then(function () { running--; if (loaded >= N - 1) load.style.opacity = 0; next(); }); } } next(); })();
    addEventListener('resize', size);
    var cur = 0, vis = false, act = -1;
    new IntersectionObserver(function (e) { vis = e[0].isIntersecting; }, { rootMargin: '10% 0px' }).observe(pin);
    function pinP() { var r = pin.getBoundingClientRect(), tot = pin.offsetHeight - innerHeight; return clamp(-r.top / tot, 0, 1); }
    function setAct(p) {
      var a = 0; starts.forEach(function (s, i) { if (p >= s) a = i; });
      if (a === act) return; act = a;
      phs.forEach(function (el, i) { el.classList.toggle('on', i === a); }); rl.forEach(function (el, i) { el.classList.toggle('on', i === a); el.classList.toggle('done', i < a); });
    }
    (function loop() {
      requestAnimationFrame(loop); if (!vis) return;
      var p = pinP(), tg = p * (N - 1); cur += (tg - cur) * (RM ? 1 : .14);
      if (Math.abs(cur - last) > .05) { last = cur; drawAt(cur); }
      bar.style.transform = 'scaleX(' + p + ')'; setAct(p);
    })();
    rail.addEventListener('click', function (e) {
      var li = e.target.closest('li'); if (!li) return; var i = +li.getAttribute('data-i'), tot = pin.offsetHeight - innerHeight;
      scrollTo({ top: pin.offsetTop + (starts[i] + .03) * tot, behavior: RM ? 'auto' : 'smooth' });
    });
  })();

  /* ============================================================
     LABORATORIO · caza los bugs
     ============================================================ */
  (function () {
    var tabsEl = $('#labTabs'), panel = $('#labPanel');
    tabsEl.innerHTML = D.labTabs.map(function (t, i) { return '<button type="button" class="tab" role="tab" data-i="' + i + '" aria-selected="' + (i === 0) + '">' + esc(t.t) + '</button>'; }).join('');
    function showTab(i) {
      var t = D.labTabs[i]; $$('.tab', tabsEl).forEach(function (b, k) { b.setAttribute('aria-selected', k === i); });
      panel.innerHTML = '<h3>' + esc(t.t) + '</h3><p>' + esc(t.d) + '</p><button type="button" class="link" data-code="' + t.code + '">Ver el servicio ' + t.code + ' →</button>';
    }
    tabsEl.addEventListener('click', function (e) { var b = e.target.closest('.tab'); if (b) showTab(+b.getAttribute('data-i')); });
    panel.addEventListener('click', function (e) { var b = e.target.closest('[data-code]'); if (b) openSvc(b.getAttribute('data-code')); });
    showTab(0);

    var LINES = [
      'function totalCarrito(items, descuento) {',
      '  if (items.length §2§ 0) return 0;',
      '  let total = 0;',
      '  for (let i = 0; i §0§ items.length; i++) {',
      '    total += items[i].precio * items[i].cantidad;',
      '  }',
      '  total = total §1§ descuento;',
      '  return §3§;',
      '}'];
    var BUGS = [{ bad: '<=', good: '<', tip: 'recorre un elemento de más' }, { bad: '+', good: '-', tip: 'el descuento debe restarse' }, { bad: '=', good: '===', tip: 'asigna en vez de comparar' }, { bad: 'totl', good: 'total', tip: 'nombre mal escrito' }];
    var TESTS = ['recorre todos los productos', 'aplica el descuento', 'carrito vacío devuelve 0', 'retorna el total'];
    var code = $('#code'), tests = $('#tests'), scan = $('#scan'), score = $('#score'), sScore = $('#stageScore'), sMsg = $('#stageMsg'), lab = $('#calidad');
    var fixed, ran;
    function hl(t) { return esc(t).replace(/\b(function|if|for|let|return)\b/g, '<span class="kw">$1</span>').replace(/\b(totalCarrito)\b/g, '<span class="fn">$1</span>').replace(/\b(\d+)\b/g, '<span class="num">$1</span>'); }
    function build() {
      fixed = [false, false, false, false]; ran = false; lab.classList.remove('win');
      code.innerHTML = LINES.map(function (l) {
        return '<span class="row">' + l.split(/§(\d)§/).map(function (part, k) { return k % 2 ? '<button type="button" class="bug" data-i="' + part + '" title="Posible error: ' + BUGS[+part].tip + '" aria-label="Posible error: ' + BUGS[+part].tip + '. Clic para corregir">' + esc(BUGS[+part].bad) + '</button>' : hl(part); }).join('') + '</span>';
      }).join('');
      renderTests(); stat();
    }
    function renderTests() {
      tests.innerHTML = TESTS.map(function (t, i) {
        var cls = !ran ? '' : (fixed[i] ? 'pass' : 'fail'), mark = !ran ? '·' : (fixed[i] ? '✓' : '✗');
        return '<li class="' + cls + '"><i>' + mark + '</i>test ' + (i + 1) + ' · ' + t + '</li>';
      }).join('');
    }
    function stat() {
      var n = fixed.filter(Boolean).length; score.textContent = n + ' / 4'; sScore.innerHTML = n + '<i>/4</i>';
      sMsg.textContent = n === 0 ? 'El escudo espera tus correcciones' : n < 4 ? 'Bug capturado. ¡Sigue así!' : '¡Escudo activado! Todas las pruebas pasan';
      return n;
    }
    $('#runTests').addEventListener('click', function () {
      scan.classList.remove('go'); void scan.offsetWidth; scan.classList.add('go'); if (ctrl) ctrl.labRun();
      setTimeout(function () { ran = true; renderTests(); $$('.bug:not(.fixed)', code).forEach(function (b) { b.classList.add('hot'); }); }, 1000);
    });
    code.addEventListener('click', function (e) {
      var b = e.target.closest('.bug'); if (!b || b.classList.contains('fixed')) return;
      var i = +b.getAttribute('data-i'); fixed[i] = true; b.textContent = BUGS[i].good; b.classList.remove('hot'); b.classList.add('fixed'); b.removeAttribute('title');
      var n = stat(); if (ran) renderTests(); if (ctrl) ctrl.labFix(i, n);
      if (n === 4) { ran = true; renderTests(); lab.classList.add('win'); }
    });
    $('#labReset').addEventListener('click', function () { build(); if (ctrl) ctrl.labReset(); });
    build();
  })();

  /* ============================================================
     ÓRBITA · grupos de interés
     ============================================================ */
  (function () {
    var spin = $('#orbitSpin'), info = $('#orbitInfo');
    spin.innerHTML = D.audiences.map(function (a, i) {
      return '<div class="node" style="--a:' + (i * 72 - 90) + 'deg"><div class="n-in"><button type="button" data-i="' + i + '" aria-label="' + esc(a.t) + '"><span class="nb">' + ic(a.ic) + '</span><small>' + esc(a.t) + '</small></button></div></div>';
    }).join('');
    function show(i) { var a = D.audiences[i]; info.innerHTML = '<b>' + esc(a.t) + '</b><span>' + esc(a.d) + '</span>'; $$('button', spin).forEach(function (b, k) { b.classList.toggle('on', k === i); }); }
    spin.addEventListener('pointerover', function (e) { var b = e.target.closest('button'); if (b) { show(+b.getAttribute('data-i')); spin.classList.add('paused'); } });
    spin.addEventListener('pointerout', function () { spin.classList.remove('paused'); });
    spin.addEventListener('focusin', function (e) { var b = e.target.closest('button'); if (b) { show(+b.getAttribute('data-i')); spin.classList.add('paused'); } });
    spin.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) show(+b.getAttribute('data-i')); });
    show(0);
  })();

  /* ---------- programas, contacto ---------- */
  $('#prog').innerHTML = ['Producción multimedia', 'Diseño de videojuegos', 'Producción audiovisual', 'Animación digital 2D', 'Animación 3D', 'Análisis y desarrollo de software (ADSO)', 'Técnicos de programación y afines'].map(function (p) { return '<li>' + p + '</li>'; }).join('');
  var fSvc = $('#fSvc'); fSvc.innerHTML += order.map(function (s) { return '<option value="' + s.code + '">' + s.code + ' · ' + esc(s.name) + '</option>'; }).join('');
  function msgText() {
    var s = svcByCode[fSvc.value], name = $('#fName').value.trim(), m = $('#fMsg').value.trim();
    return { subject: '[' + $('#fType').value + '] ' + (s ? s.name : 'Consulta general') + ' · Fábrica de Software de Antioquia',
      body: 'Hola,\n\nTipo de interés: ' + $('#fType').value + '\n' + (s ? 'Servicio: ' + s.name + ' (' + s.code + ')\n' : '') + '\nMi necesidad:\n' + (m || '[escribe aquí]') + '\n\n' + (name ? 'Nombre / organización: ' + name + '\n' : '') + 'Gracias.' };
  }
  function updateMail() { var t = msgText(); $('#fSend').setAttribute('href', mailto(t.subject, t.body)); }
  ['fName', 'fType', 'fSvc', 'fMsg'].forEach(function (id) { $('#' + id).addEventListener('input', updateMail); $('#' + id).addEventListener('change', updateMail); });
  updateMail();
  function copy(txt, note, el) {
    function ok() { if (el) { var o = el.textContent; el.textContent = '¡Copiado!'; setTimeout(function () { el.textContent = o; }, 1600); } if (note) $('#fNote').textContent = note; }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, ok); else { var t = document.createElement('textarea'); t.value = txt; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (e) { } t.remove(); ok(); }
  }
  $('#copyMail').addEventListener('click', function () { copy(D.EMAIL, '', this); });
  $('#fCopy').addEventListener('click', function () { var t = msgText(); copy('Asunto: ' + t.subject + '\n\n' + t.body, 'Mensaje copiado. Pégalo en tu correo y envíalo a ' + D.EMAIL + '.', this); });

  /* ---------- escena 3D ---------- */
  var ids = ['inicio', 'nosotros', 'servicios', 'metodologia', 'procesos', 'calidad', 'formacion', 'trayectoria', 'contacto'];
  if (window.SFW3D && !/nogl/.test(Q)) {
    try { ctrl = window.SFW3D.start({ canvas: $('#gl'), services: D.services, cats: D.cats, ids: ids, reduced: RM, mobile: MOBILE }); } catch (e) { console.warn('WebGL no disponible', e); }
  }
  if (!ctrl) { var g = $('#gl'); if (g) g.style.display = 'none'; } else { ctrl.setCat('all'); if (booted) ctrl.ready(); }

  /* ---------- bucle de scroll ---------- */
  var tick = false;
  function sched() { if (!tick) { tick = true; requestAnimationFrame(function () { tick = false; onScroll(); parallax(); }); } }
  addEventListener('scroll', sched, { passive: true }); addEventListener('resize', sched);
  onScroll(); parallax();
  $('#year') && ($('#year').textContent = new Date().getFullYear());
})();
