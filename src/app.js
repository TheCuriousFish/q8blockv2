/* Q8Block — one deferred script, four jobs and no more:
   the countdown, the FAQ accordion, the scroll-solidified header, the mobile nav. */
(function () {
  'use strict';

  /* ── scroll-solidified header ─────────────────────────────────────────── */
  var header = document.querySelector('.site-header');
  if (header) {
    var solid = function () {
      if (window.scrollY > 24) header.classList.add('solid');
      else header.classList.remove('solid');
    };
    solid();
    window.addEventListener('scroll', solid, { passive: true });
  }

  /* ── mobile nav ───────────────────────────────────────────────────────── */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    var setOpen = function (on) {
      nav.classList.toggle('open', on);
      burger.setAttribute('aria-expanded', on ? 'true' : 'false');
      document.documentElement.style.overflow = on ? 'hidden' : '';
    };
    burger.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') || e.target.closest('.nav-close')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  /* ── FAQ accordion ────────────────────────────────────────────────────── */
  Array.prototype.forEach.call(document.querySelectorAll('.faq-q'), function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ── countdown ────────────────────────────────────────────────────────────
     Renders "DD : HH : MM : SS" in the strip and fills the four boxes on the
     offer page. When the end date is absent or already past, every element
     tagged data-countdown-part is removed and the elements tagged
     data-countdown-fallback are shown instead, so both pages still read as a
     complete band. ─────────────────────────────────────────────────────── */
  var root = document.querySelector('[data-countdown-end]');
  var pad = function (n) { return n < 10 ? '0' + n : String(n); };

  function expire() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-countdown-part]'), function (el) {
      el.remove();
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-countdown-fallback]'), function (el) {
      el.hidden = false;
    });
  }

  if (!root) {
    // nothing to do: the build shipped with no countdown at all
  } else {
    var end = Date.parse(root.getAttribute('data-countdown-end'));
    if (!end || isNaN(end)) {
      expire();
    } else {
      var inline = document.querySelector('[data-countdown]');
      var boxes = document.querySelectorAll('[data-count]');
      var tick = function () {
        var ms = end - Date.now();
        if (ms <= 0) { expire(); clearInterval(timer); return; }
        var s = Math.floor(ms / 1000);
        var d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600),
            m = Math.floor((s % 3600) / 60), sec = s % 60;
        if (inline) inline.textContent = d + ' : ' + pad(h) + ' : ' + pad(m) + ' : ' + pad(sec);
        if (boxes.length) {
          var v = { d: d, h: pad(h), m: pad(m), s: pad(sec) };
          Array.prototype.forEach.call(boxes, function (b) {
            b.textContent = v[b.getAttribute('data-count')];
          });
        }
      };
      tick();
      var timer = setInterval(tick, 1000);
    }
  }
})();
