/* Q8Block — one deferred script, seven jobs and no more:
   the countdown, the FAQ accordion, the scroll-solidified header, the mobile
   nav, the offer strip pinning under the header, the §7 slideshow, and the
   contact page's tap-to-load map.
   No library, no framework.

   Every job in this file shares one function scope, so a `var` declared in one
   block is the same binding in every other one. Two blocks both called theirs
   `timer` once and the second silently overwrote the first (build-spec §15.8).
   Keep every name in a new block unique, or give the block its own function. */
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

  /* ── the contact page's map, loaded only on the tap ───────────────────────
     Nothing from Google is requested while the page is closed: there is no
     iframe, no script and no tile in the markup. The tap builds the iframe,
     drops the placeholder and reveals the caption and the directions link.
     The shell's box is set in CSS and does not change across the swap, so the
     swap is worth zero layout shift. Names are unique to this block. */
  (function map() {
    var mapFig = document.querySelector('[data-map]');
    if (!mapFig) return;
    var mapBtn = mapFig.querySelector('[data-map-btn]');
    var mapClosed = mapFig.querySelector('[data-map-closed]');
    var mapFoot = mapFig.querySelector('[data-map-foot]');
    if (!mapBtn || !mapClosed) return;
    mapBtn.addEventListener('click', function () {
      var frame = document.createElement('iframe');
      frame.src = mapFig.getAttribute('data-src');
      frame.title = mapFig.getAttribute('data-frame-title') || '';
      frame.loading = 'lazy';
      frame.referrerPolicy = 'no-referrer-when-downgrade';
      frame.setAttribute('allowfullscreen', '');
      mapClosed.replaceWith(frame);
      if (mapFoot) mapFoot.hidden = false;
    });
  })();

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

  /* ── the offer strip pins under the header ────────────────────────────────
     The strip sits at the bottom of the first screen. Once its own top would
     pass under the fixed header it goes position:fixed and slims down, and
     stays there for the rest of the page. `.strip-slot` is given the bar's
     measured height at that moment, so the document never changes height and
     the pin costs zero layout shift. ──────────────────────────────────────── */
  var slot = document.querySelector('.strip-slot');
  var strip = document.getElementById('offer-strip');
  if (slot && strip) {
    var stuck = false, threshold = 0;
    var headerH = function () {
      var v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h'));
      return isNaN(v) ? 112 : v;
    };
    var measure = function () {
      if (stuck) return;
      threshold = slot.getBoundingClientRect().top + window.pageYOffset - headerH();
    };
    var place = function () {
      var y = window.pageYOffset;
      if (!stuck && y > threshold) {
        slot.style.height = strip.offsetHeight + 'px';
        strip.classList.add('stuck');
        stuck = true;
      } else if (stuck && y <= threshold) {
        strip.classList.remove('stuck');
        stuck = false;
        slot.style.height = '';
        measure();
      }
    };
    var release = function () {
      if (!stuck) return;
      strip.classList.remove('stuck');
      stuck = false;
      slot.style.height = '';
    };
    measure();
    place();
    window.addEventListener('scroll', place, { passive: true });
    window.addEventListener('resize', function () { release(); measure(); place(); }, { passive: true });
    // the hero is type, and `font-display: swap` moves it: re-measure after the
    // webfont lands, or the threshold is a stale number from the fallback font.
    window.addEventListener('load', function () { if (!stuck) { measure(); place(); } });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { if (!stuck) { measure(); place(); } });
    }
  }

  /* ── §7 slideshow ─────────────────────────────────────────────────────────
     Plain scroll-snap plus this. Roughly three cards visible, auto-advancing.
     Swipe works because the track is a native overflow container; keyboard
     works because the track is focusable and labelled, every card is a real
     link in DOM order, and the two buttons are real buttons. It never
     auto-advances under prefers-reduced-motion, and it pauses on hover, on
     focus, on touch, when off screen and when the tab is hidden.
     RTL: Chrome reports scrollLeft as 0 at the start and negative toward the
     end, so `sign` flips and "advance" is always go(1) in both locales. ───── */
  var slider = document.querySelector('[data-slider]');
  var track = slider && slider.querySelector('[data-track]');
  if (slider && track) {
    var reduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    var rtl = getComputedStyle(track).direction === 'rtl';
    var sign = rtl ? -1 : 1;
    // `autoTimer`, not `timer`. Every job in this file shares one function
    // scope, so a second `var timer` here is the SAME binding as the
    // countdown's below: the slideshow's stop() silently killed the countdown's
    // interval and leaked its own. Keep every name in this block unique.
    var autoTimer = null, idleTimer = null, onScreen = true;
    // Three independent reasons to pause, each with its own flag. One flag
    // could not express them: `focusout` used to set `hold = false` while the
    // pointer was still on the cards, so releasing one hold cancelled another.
    var hovering = false, focused = false, pressing = false;
    var held = function () { return hovering || focused || pressing; };

    var behavior = function () { return reduce && reduce.matches ? 'auto' : 'smooth'; };
    var stepPx = function () {
      var card = track.firstElementChild;
      if (!card) return track.clientWidth;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return Math.round(card.getBoundingClientRect().width + gap);
    };
    var maxScroll = function () { return track.scrollWidth - track.clientWidth; };
    var pos = function () { return Math.abs(track.scrollLeft); };
    var go = function (dir) {
      if (dir > 0 && pos() >= maxScroll() - 2) track.scrollTo({ left: 0, behavior: behavior() });
      else if (dir < 0 && pos() <= 2) track.scrollTo({ left: sign * maxScroll(), behavior: behavior() });
      else track.scrollBy({ left: sign * dir * stepPx(), behavior: behavior() });
    };

    var stop = function () { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } };
    var update = function () {
      var run = onScreen && !held() && !document.hidden && !(reduce && reduce.matches);
      if (run && !autoTimer) autoTimer = setInterval(function () { go(1); }, 4200);
      else if (!run) stop();
    };
    // A press releases 5s after the last pointerup, and only the press: hover
    // and focus keep their own flags and release on their own events.
    var releaseSoon = function () {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(function () { pressing = false; update(); }, 5000);
    };
    var press = function () { clearTimeout(idleTimer); pressing = true; update(); };

    /* Hover-pause fires on a real pointer MOVE over the slider, never on
       `mouseenter` alone — and this is the bug Ahmad saw ("the slideshow should
       be automatically sliding. That is not happening. It's like a showcase").
       Chrome re-evaluates the hover target after a scroll and dispatches
       pointerenter + mouseover + mouseenter, and NO mousemove, when a section
       scrolls under a stationary cursor. That is exactly how a desktop reader
       reaches §7: the pointer rests mid-screen, the 1320 x 483 band scrolls
       under it, `mouseenter` fired and the carousel was held paused for the
       whole time it was on screen. Measured: scrollLeft stayed 0 for 12s with
       the cursor parked at 720,450. `mousemove` is the discriminator — it fires
       only when the reader actually moves the mouse, which is the hover the
       pause is for. Verified event counts in build-spec §18. */
    slider.addEventListener('mousemove', function () {
      if (hovering) return;
      hovering = true; update();
    });
    slider.addEventListener('mouseleave', function () { hovering = false; update(); });
    slider.addEventListener('focusin', function () { focused = true; update(); });
    slider.addEventListener('focusout', function () { focused = false; update(); });
    track.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', releaseSoon, { passive: true });
    document.addEventListener('visibilitychange', update);

    Array.prototype.forEach.call(slider.querySelectorAll('[data-slide]'), function (b) {
      b.addEventListener('click', function () {
        press();
        go(b.getAttribute('data-slide') === 'next' ? 1 : -1);
        releaseSoon();
      });
    });

    track.addEventListener('keydown', function (e) {
      var dir = 0;
      if (e.key === 'ArrowRight') dir = rtl ? -1 : 1;
      else if (e.key === 'ArrowLeft') dir = rtl ? 1 : -1;
      if (!dir) return;
      e.preventDefault();
      press();
      go(dir);
      releaseSoon();
    });

    if ('IntersectionObserver' in window) {
      // threshold 0, never 0.2: a wide section is rarely 20% on screen at once
      // and that silently disabled autoplay on an earlier build.
      new IntersectionObserver(function (entries) {
        onScreen = entries[0].isIntersecting;
        update();
      }, { threshold: 0 }).observe(slider);
    }
    if (reduce && reduce.addEventListener) reduce.addEventListener('change', update);
    update();
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
