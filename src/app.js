/* Q8Block — one deferred script: the FAQ accordion, the scroll-solidified header, the
   mobile nav, the §7 slideshow, the §4 slide strip and the contact page's tap-to-load map. */
/*
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

  /* ── §7 slideshow ─────────────────────────────────────────────────────────
     Plain scroll-snap plus this. Roughly three cards visible, auto-advancing.
     Swipe works because the track is a native overflow container; keyboard
     works because the track is focusable and labelled, every card is a real
     link in DOM order, and the two buttons are real buttons. It never
     auto-advances under prefers-reduced-motion, and it pauses on hover, on
     focus, on touch, when off screen and when the tab is hidden.
     It LOOPS ENDLESSLY: the card set is cloned once and the position is
     reduced by one set length at the seam, so there is no last card to stop on
     (Ahmad, 2026-09-25 — see the block comment below).
     RTL: Chrome reports scrollLeft as 0 at the start and negative toward the
     end, so `sign` flips and "advance" is always go(1) in both locales. ───── */
  var slider = document.querySelector('[data-slider]');
  var track = slider && slider.querySelector('[data-track]');
  if (slider && track) {
    var reduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    var rtl = getComputedStyle(track).direction === 'rtl';
    var sign = rtl ? -1 : 1;
    // `autoTimer`, not `timer`: every job in this file shares one function scope, so a
    // generic `timer` name could be overwritten by another block. Keep every name in this block unique.
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

    /* ── The loop is INFINITE (Ahmad, 2026-09-25: "the slideshow needs to be
       infinite") ────────────────────────────────────────────────────────────
       It did wrap before, but by smooth-scrolling the whole track back to the
       start. Measured at 1440, cursor parked away from the section: scrollLeft
       ran 0 448 896 ... 3584, sat at 3584 for a tick, then 1516, then 0 — an
       eight-card rewind the reader watches go past. That is what read as
       "it advances to the end and stops": the last card is the end of the line
       and everything after it is a retreat.

       The fix is a treadmill, not a library. The card set is cloned ONCE and
       appended, so the track holds 22 cards for 11 clients. Advancing is always
       one step forward; at the seam, scrollLeft is reduced by exactly one set
       length with the CSS smooth behaviour suppressed for that single
       assignment. At pos = loopLen the viewport shows clone 1, 2, 3, which are
       pixel-identical to cards 1, 2, 3 at pos 0, so the subtraction changes
       nothing on screen and the next step continues forward. There is no end to
       reach and no rewind to watch.

       The clones are `aria-hidden="true"` + `tabindex="-1"`, so the eleven real
       cards remain the only eleven tab stops and the only eleven the
       accessibility tree sees (the focusable count in §7 stays 14). They are
       cloned in JS, not written into the HTML, so the markup, the SEO audit's
       image count and the no-JS fallback all see eleven cards. Same eleven
       URLs, so the clones cost no extra bytes. */
    var real = Array.prototype.slice.call(track.children);
    var looping = false;
    if (real.length > 1) {
      var frag = document.createDocumentFragment();
      for (var i = 0; i < real.length; i++) {
        var clone = real[i].cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.setAttribute('tabindex', '-1');
        clone.setAttribute('data-clone', '');
        frag.appendChild(clone);
      }
      track.appendChild(frag);
      looping = true;
    }
    var loopLen = function () { return real.length * stepPx(); };

    // One scroll assignment with `scroll-behavior: smooth` suppressed, so the
    // seam is a jump and not an animation the reader can see. The read of
    // scrollLeft afterwards flushes it before the inline style comes off.
    //
    // A jump fires its own `scrollend`, and that event is NOT a settled track:
    // measured, it arrived while the smooth scroll started on the next line was
    // still in flight, so the settle handler normalised a position that was
    // mid-animation and cancelled the move. Stepping backwards off the first
    // card died exactly there — 0 -> prev -> 0 instead of 0 -> 4480. So a jump
    // marks its own scrollend to be ignored, and the mark is dropped on a timer
    // in case the assignment was a no-op and no event ever came.
    var ignoreSettle = false, ignoreTimer = null;
    var jumpTo = function (p) {
      var target = sign * Math.max(p, 0);
      if (Math.round(track.scrollLeft) === Math.round(target)) return;
      ignoreSettle = true;
      clearTimeout(ignoreTimer);
      ignoreTimer = setTimeout(function () { ignoreSettle = false; }, 400);
      var prev = track.style.scrollBehavior;
      track.style.scrollBehavior = 'auto';
      track.scrollLeft = target;
      void track.scrollLeft;
      track.style.scrollBehavior = prev;
    };
    // Called only when the track is at rest. The `while` covers a viewport
    // resize having shrunk a set length under the current position.
    var normalise = function () {
      if (!looping) return false;
      var L = loopLen();
      if (L <= 0) return false;
      var p = pos(), moved = false;
      while (p >= L - 2) { p -= L; moved = true; }
      if (moved) jumpTo(p);
      return moved;
    };
    var go = function (dir) {
      var step = stepPx();
      if (looping) {
        if (dir > 0) normalise();                    // step off the seam, not off the end
        else if (pos() <= 2) jumpTo(loopLen());      // step back off the start
        track.scrollBy({ left: sign * dir * step, behavior: behavior() });
        return;
      }
      if (dir > 0 && pos() >= maxScroll() - 2) track.scrollTo({ left: 0, behavior: behavior() });
      else if (dir < 0 && pos() <= 2) track.scrollTo({ left: sign * maxScroll(), behavior: behavior() });
      else track.scrollBy({ left: sign * dir * step, behavior: behavior() });
    };
    // A swipe, or the browser's own arrow-key scrolling of the focused track,
    // moves the position without go() being involved and can leave it inside
    // the clones. Normalise once the scroll comes to rest as well: `scrollend`
    // where Chrome has it, a short debounce where it does not. Normalising is
    // idempotent, so the scroll event our own jump fires is a no-op.
    var settleTimer = null;
    var onSettle = function () {
      if (ignoreSettle) { ignoreSettle = false; clearTimeout(ignoreTimer); return; }
      normalise();
    };
    if ('onscrollend' in window) {
      track.addEventListener('scrollend', onSettle);
    } else {
      track.addEventListener('scroll', function () {
        clearTimeout(settleTimer);
        settleTimer = setTimeout(onSettle, 180);
      }, { passive: true });
    }

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

  /* ── §4 slide strip ───────────────────────────────────────────────────────
     Forward only and endless. A transform-driven track inside an overflow
     hidden frame: no native scroll, no buttons, so there is nothing to swipe
     back. The six slides are cloned once and appended; after the step that
     lands on the first clone the track jumps, with no transition, back to the
     real first slide, which looks identical. One step every 2s. Everything
     lives in its own function so no name can collide with another block.
     Reduced motion: no clones, no timer, a static row that scrolls sideways. */
  (function strip() {
    var frame = document.querySelector('[data-ss]');
    var rail = frame && frame.querySelector('[data-ss-track]');
    if (!frame || !rail) return;
    var motion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    if (motion && motion.matches) { frame.setAttribute('tabindex', '0'); return; }
    var base = Array.prototype.slice.call(rail.children);
    var count = base.length;
    if (count < 2) return;
    var frag = document.createDocumentFragment();
    base.forEach(function (el) {
      var c = el.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      c.setAttribute('data-clone', '');
      var im = c.querySelector('img');
      if (im) im.setAttribute('alt', '');
      frag.appendChild(c);
    });
    rail.appendChild(frag);
    var flow = getComputedStyle(frame).direction === 'rtl' ? 1 : -1;
    var at = 0, ticker = null, jumpTimer = null, visible = true, hover = false, within = false;
    var stepPx = function () {
      var gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
      return base[0].offsetWidth + gap;
    };
    var place = function (animate) {
      if (!animate) rail.classList.add('nojump');
      rail.style.transform = 'translate3d(' + (flow * at * stepPx()) + 'px,0,0)';
      if (!animate) { void rail.offsetWidth; rail.classList.remove('nojump'); }
    };
    var advance = function () {
      at += 1;
      place(true);
      if (at >= count) {
        clearTimeout(jumpTimer);
        jumpTimer = setTimeout(function () { at = 0; place(false); }, 620);
      }
    };
    var halt = function () { if (ticker) { clearInterval(ticker); ticker = null; } };
    var refresh = function () {
      var go = visible && !hover && !within && !document.hidden;
      if (go && !ticker) ticker = setInterval(advance, 2000);
      else if (!go) halt();
    };
    // pause on a real pointer move, never on a bare mouseenter (build-spec §18)
    frame.addEventListener('mousemove', function () { if (!hover) { hover = true; refresh(); } });
    frame.addEventListener('mouseleave', function () { hover = false; refresh(); });
    frame.addEventListener('focusin', function () { within = true; refresh(); });
    frame.addEventListener('focusout', function () { within = false; refresh(); });
    document.addEventListener('visibilitychange', refresh);
    window.addEventListener('resize', function () { place(false); }, { passive: true });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting; refresh();
      }, { threshold: 0 }).observe(frame);
    }
    refresh();
  })();

  /* ── FAQ accordion ────────────────────────────────────────────────────── */
  Array.prototype.forEach.call(document.querySelectorAll('.faq-q'), function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });


})();
