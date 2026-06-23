(function () {
  'use strict';

  const C = {
    ink:      '#000000',
    paper:    '#FFFFFF',
    warm:     '#FFFFFF',
    ember:    '#000000',
    ash:      '#000000',
    ashLight: '#BBBBBB',
    smoke:    '#000000',
    green:    '#000000',
  };

  /* ============================================================
     Sketchy card borders
     ============================================================ */
  function drawCard(el) {
    if (typeof rough === 'undefined') return;

    let cv = el.querySelector('.card-canvas');
    if (!cv) {
      cv = document.createElement('canvas');
      cv.className = 'card-canvas';
      el.prepend(cv);
    }

    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (!w || !h) return;

    cv.width  = w;
    cv.height = h;
    cv.style.width  = w + 'px';
    cv.style.height = h + 'px';

    const rc = rough.canvas(cv);
    const p  = 3;

    rc.rectangle(p, p, w - p * 2, h - p * 2, {
      roughness:   1.8,
      strokeWidth: 2,
      stroke:      C.ink,
      fill:        C.warm,
      fillStyle:   'solid',
    });

    el.classList.add('sketchy-ready');
  }

  function initCards() {
    if (typeof rough === 'undefined') return;
    const cards = document.querySelectorAll('.card');
    const ro = new ResizeObserver(entries => entries.forEach(e => drawCard(e.target)));
    cards.forEach(c => { drawCard(c); ro.observe(c); });
  }

  /* ============================================================
     Hero — shadow behind photo + computer illustration
     ============================================================ */
  function drawHero() {
    if (typeof rough === 'undefined') return;

    /* Shadow canvas behind photo */
    const shadow = document.querySelector('.hero-canvas-deco');
    if (shadow) {
      const wrap = shadow.closest('.hero-photo-wrap');
      const W = wrap ? wrap.offsetWidth : 260;
      const H = wrap ? wrap.offsetHeight : 300;
      shadow.width = W; shadow.height = H;
      shadow.style.width = W + 'px'; shadow.style.height = H + 'px';
      rough.canvas(shadow).rectangle(0, 0, W - 4, H - 4, {
        roughness: 2, strokeWidth: 2.5,
        stroke: C.ink, fill: C.ink, fillStyle: 'solid',
      });
    }

    /* Computer illustration */
    const cv = document.getElementById('hero-canvas');
    if (!cv) return;
    const W = 260, H = 200;
    cv.width = W; cv.height = H;
    const rc = rough.canvas(cv);
    const ctx = cv.getContext('2d');
    const b = { roughness: 1.8, stroke: C.ink };

    /* Monitor body */
    rc.rectangle(20, 10, 200, 130, { ...b, strokeWidth: 2.5, fill: C.warm, fillStyle: 'solid' });
    /* Screen */
    rc.rectangle(32, 20, 176, 108, { ...b, strokeWidth: 1.5, fill: C.paper, fillStyle: 'solid' });
    /* Code lines */
    const ln = { ...b, roughness: 1.2 };
    rc.line(44, 44,  110, 44,  { ...ln, strokeWidth: 3, stroke: C.ember });
    rc.line(44, 58,  168, 58,  { ...ln, strokeWidth: 2, stroke: C.ash });
    rc.line(44, 72,  145, 72,  { ...ln, strokeWidth: 2, stroke: C.ash });
    rc.line(44, 86,  108, 86,  { ...ln, strokeWidth: 2, stroke: C.ink });
    rc.line(44, 100, 152, 100, { ...ln, strokeWidth: 2, stroke: C.ash });
    rc.line(44, 114, 122, 114, { ...ln, strokeWidth: 2, stroke: C.ash });
    /* Stand */
    rc.line(120, 140, 120, 162, { ...b, strokeWidth: 3 });
    rc.line(88,  162, 152, 162, { ...b, strokeWidth: 3 });
    /* Sparkles */
    const sp = { roughness: 2, strokeWidth: 1.5, stroke: C.ashLight };
    rc.line(232, 20, 232, 32, sp); rc.line(226, 26, 238, 26, sp);
    rc.line(14,  155, 14,  165, sp); rc.line(9, 160, 19, 160, sp);
  }

  /* ============================================================
     Scroll fade-in
     ============================================================ */
  function initFadeIn() {
    const els = document.querySelectorAll('.section .card, .section .section-title, .soft-item');
    els.forEach(el => el.classList.add('fade-in'));

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });

    els.forEach(el => io.observe(el));
  }

  /* ============================================================
     Active nav
     ============================================================ */
  function initActiveNav() {
    const links = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(a => a.classList.remove('active'));
          const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
          if (a) a.classList.add('active');
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(s => io.observe(s));
  }

  /* ============================================================
     Mobile nav
     ============================================================ */
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links  = document.getElementById('nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  /* ============================================================
     Boot
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    initCards();
    drawHero();
    initFadeIn();
    initActiveNav();
    initMobileNav();
  });

}());
