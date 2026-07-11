document.addEventListener('DOMContentLoaded', function () {

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Scroll Progress Bar ──
  var progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  window.addEventListener('scroll', function () {
    var h = document.documentElement;
    var pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progressBar.style.width = pct + '%';
  });

  // ── Custom Cursor ──
  var cursor = document.createElement('div');
  cursor.className = 'cursor-pointer';
  document.body.appendChild(cursor);
  var glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouch) {
    document.addEventListener('mousemove', function (e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      glow.classList.add('visible');
    });
    document.addEventListener('mouseleave', function () {
      glow.classList.remove('visible');
    });
    document.querySelectorAll('a, button, .btn, .chip, .filter-btn, .faq-q, .machine-card, .project-card, .division-card, .card, .fab-toggle, .fab-action').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursor.classList.add('hover'); });
      el.addEventListener('mouseleave', function () { cursor.classList.remove('hover'); });
    });
  } else {
    cursor.style.display = 'none';
    glow.style.display = 'none';
  }

  // ── Floating Action Button ──
  var fabHTML =
    '<div class="fab-container">' +
      '<button class="fab-toggle" aria-label="Contact options">' +
        '<svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>' +
      '</button>' +
      '<div class="fab-actions">' +
        '<a class="fab-action whatsapp" href="https://wa.me/917069291206" target="_blank" rel="noopener" aria-label="WhatsApp">' +
          '<svg viewBox="0 0 24 24" fill="none"><path d="M17.5 14.5c-.5.5-1.5 1.5-2.5 1.5s-2-.5-3-1.5-1.5-2-1.5-3 .5-1.5 1-2 .5-.5 0-1-.5-.5-1-.5-1 .5-2 1.5-1 2-1 3 1 3 2 4 2.5 2.5 4 3 2 1 3 1 1.5-.5 2-1" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="12" r="9" stroke="#fff" stroke-width="1.8"/></svg>' +
          '<span class="fab-tooltip">WhatsApp</span>' +
        '</a>' +
        '<a class="fab-action call" href="tel:+917069291206" aria-label="Call">' +
          '<svg viewBox="0 0 24 24" fill="none"><path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.5 21 3 14.5 3 6a2 2 0 0 1 2-2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>' +
          '<span class="fab-tooltip">Call Us</span>' +
        '</a>' +
        '<a class="fab-action email" href="mailto:abhijeetsingh5434@gmail.com" aria-label="Email">' +
          '<svg viewBox="0 0 24 24" fill="none"><path d="M4 5h16v14H4z" stroke="currentColor" stroke-width="1.8"/><path d="M4 6l8 7 8-7" stroke="currentColor" stroke-width="1.8"/></svg>' +
          '<span class="fab-tooltip">Email</span>' +
        '</a>' +
      '</div>' +
    '</div>' +
    '<div class="fab-backdrop"></div>';

  var fabContainer = document.createElement('div');
  fabContainer.innerHTML = fabHTML;
  document.body.appendChild(fabContainer);

  var fabToggle = document.querySelector('.fab-toggle');
  var fabActions = document.querySelector('.fab-actions');
  var fabBackdrop = document.querySelector('.fab-backdrop');
  if (fabToggle && fabActions && fabBackdrop) {
    function toggleFab(open) {
      fabToggle.classList.toggle('open', open);
      fabActions.classList.toggle('open', open);
      fabBackdrop.classList.toggle('open', open);
    }
    fabToggle.addEventListener('click', function () {
      toggleFab(!fabActions.classList.contains('open'));
    });
    fabBackdrop.addEventListener('click', function () {
      toggleFab(false);
    });
    document.querySelectorAll('.fab-action').forEach(function (a) {
      a.addEventListener('click', function () {
        toggleFab(false);
      });
    });
  }

  // ── Mobile nav toggle ──
  var toggle = document.querySelector('.menu-toggle');
  var navEl = document.querySelector('nav');
  if (toggle && navEl) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      navEl.classList.toggle('mobile-open');
    });
    navEl.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        navEl.classList.remove('mobile-open');
      });
    });
  }

  // ── Scroll reveal ──
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // ── Animated stat counters ──
  var statEls = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && statEls.length) {
    var counted = new WeakSet();
    var statIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !counted.has(entry.target)) {
          counted.add(entry.target);
          animateCount(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statEls.forEach(function (el) { statIo.observe(el); });
  }

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1200;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  // ── Project filter ──
  var filterBtns = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card');
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.getAttribute('data-filter');
        projectCards.forEach(function (card) {
          var cat = card.getAttribute('data-category');
          card.style.display = (filter === 'all' || filter === cat) ? '' : 'none';
        });
      });
    });
  }

  // ── FAQ accordion ──
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // ── Hero particles ──
  var hero = document.querySelector('.hero');
  if (hero) {
    var particlesContainer = document.createElement('div');
    particlesContainer.className = 'hero-particles';
    hero.appendChild(particlesContainer);
    for (var i = 0; i < 20; i++) {
      var p = document.createElement('div');
      p.className = 'hero-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (8 + Math.random() * 12) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
      particlesContainer.appendChild(p);
    }
  }

});
